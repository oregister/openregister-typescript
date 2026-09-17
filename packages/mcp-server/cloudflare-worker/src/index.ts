import { makeOAuthConsent } from './app';
// `agents` and `@modelcontextprotocol/sdk` versions must stay in sync with the
// pins/overrides in package.json. `agents` declares an exact pin on
// `@modelcontextprotocol/sdk`; if our resolved version drifts, npm installs a
// second copy under `agents/node_modules/`, and `initMcpServer`'s runtime
// `instanceof McpServer` check fails because the two `McpServer` classes are
// distinct constructors.
import { McpAgent } from 'agents/mcp';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ListToolsRequestSchema, type Tool } from '@modelcontextprotocol/sdk/types.js';
import OAuthProvider from '@cloudflare/workers-oauth-provider';
import { Container } from '@cloudflare/containers';
import { ClientOptions } from 'openregister';
import { VERSION as SDK_VERSION } from 'openregister/version';
import { McpOptions } from 'openregister-mcp/options';
import { initMcpServer, newMcpServer, selectTools } from 'openregister-mcp/server';
import { configureLogger } from 'openregister-mcp/logger';
import { installCodeToolProxy } from './code-tool-proxy';

type MCPProps = {
  clientProps: ClientOptions;
  clientConfig: McpOptions;
};

/**
 * The information displayed on the OAuth consent screen
 */
const serverConfig: ServerConfig = {
  orgName: 'OpenRegister',
  instructionsUrl: 'https://openregister.de/keys',
  logoUrl: 'https://docs.openregister.de/logo-original.png',
  clientProperties: [
    {
      key: 'apiKey',
      label: 'API Key',
      description:
        'API Key Authentication\nProvide your API key as a Bearer token in the Authorization header.\n',
      required: true,
      default: undefined,
      placeholder: 'My API Key',
      type: 'password',
    },
  ],
};

// Only GETs and the search endpoints (POST bodies, but reads) are callable
// from `execute`; anything else the SDK gains stays out until listed here, so
// the tool stays read-only and can be annotated as such.
const READ_ONLY_CODE_OPTIONS = {
  codeAllowHttpGets: true,
  codeAllowedMethods: ['^search\\.'],
} satisfies Partial<McpOptions>;

const TOOL_PRESENTATION: Record<string, { title: string; describe?: (original: string) => string }> = {
  execute: {
    title: 'Query the OpenRegister API',
    describe: (original) =>
      `${original}\n\nThe client is the OpenRegister TypeScript SDK; API reference: https://docs.openregister.de. Methods that create or delete data (monitors, Transparenzregister credentials and extracts) are blocked, so this tool only reads.`,
  },
  search_docs: { title: 'Search OpenRegister API documentation' },
};

// The generated package ships tools without a title or annotations; both
// only read, and the connector directory requires every tool to say so.
function presentTools(options: McpOptions): Tool[] {
  return selectTools(options).map(({ tool }) => {
    const presentation = TOOL_PRESENTATION[tool.name];
    if (!presentation) {
      return tool;
    }
    return {
      ...tool,
      title: presentation.title,
      description: presentation.describe?.(tool.description ?? '') ?? tool.description,
      annotations: {
        ...tool.annotations,
        title: presentation.title,
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
      },
    };
  });
}

// `newMcpServer` fetches MCP server instructions from the Stainless API. In a
// Durable Object, that fetch happens inside `blockConcurrencyWhile`; if it
// hangs the DO is reset, and if it rejects the same thing happens. Race
// against a short timeout and catch any rejection so any failure mode lands
// on a fallback server constructed without instructions (the `initialize`
// response simply omits the `instructions` field, which is spec-allowed).
const INSTRUCTIONS_FETCH_TIMEOUT_MS = 5000;

function fallbackMcpServer(): McpServer {
  return new McpServer(
    { name: 'openregister_api', version: SDK_VERSION },
    { capabilities: { tools: {}, logging: {} } },
  );
}

async function buildMcpServer(stainlessApiKey?: string): Promise<McpServer> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const fetched = newMcpServer({ stainlessApiKey });
    const timeout = new Promise<null>((resolve) => {
      timeoutId = setTimeout(() => resolve(null), INSTRUCTIONS_FETCH_TIMEOUT_MS);
    });

    const result = await Promise.race([fetched, timeout]);

    if (result != null) {
      return result;
    }
  } catch (error) {
    console.error('Failed to build MCP server from upstream instructions; using fallback', error);
  } finally {
    if (timeoutId != null) {
      clearTimeout(timeoutId);
    }
  }

  return fallbackMcpServer();
}

// Runs the Deno sandbox for the `execute` tool; see ./mcp-exec and code-tool-proxy.ts.
export class McpExecContainer extends Container<Env> {
  defaultPort = 3000;
  sleepAfter = '15m';
}

export class MyMCP extends McpAgent<Env, unknown, MCPProps> {
  #resolveServer!: (server: McpServer) => void;
  #rejectServer!: (error: unknown) => void;
  server: Promise<McpServer> = new Promise<McpServer>((resolve, reject) => {
    this.#resolveServer = resolve;
    this.#rejectServer = reject;
  });

  async init() {
    try {
      if (this.props == null) {
        throw new Error('MCP props are not initialized');
      }

      configureLogger({ level: 'info', pretty: false });
      installCodeToolProxy(this.env.MCP_EXEC);

      const clientConfig = this.props.clientConfig;
      // Spread first: a client may narrow the allowed set, never widen it.
      const mcpOptions: McpOptions = {
        ...clientConfig,
        codeExecutionMode: clientConfig?.codeExecutionMode ?? 'stainless-sandbox',
        ...READ_ONLY_CODE_OPTIONS,
      };

      const server = await buildMcpServer(mcpOptions.stainlessApiKey);

      await initMcpServer({
        server,
        clientOptions: this.props.clientProps,
        mcpOptions,
      });

      const tools = presentTools(mcpOptions);
      server.server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

      this.#resolveServer(server);
    } catch (error) {
      this.#rejectServer(error);
      throw error;
    }
  }
}

export type ServerConfig = {
  /**
   * The name of the company/project
   */
  orgName: string;

  /**
   * An optional company logo image
   */
  logoUrl?: string;

  /**
   * An optional URL with instructions for users to get an API key
   */
  instructionsUrl?: string;

  /**
   * Properties collected to initialize the client
   */
  clientProperties: ClientProperty[];
};

export type ClientProperty = {
  key: string;
  label: string;
  description?: string;
  required: boolean;
  default?: unknown;
  placeholder?: string;
  type: 'string' | 'number' | 'password' | 'select';
  options?: { label: string; value: string }[];
};

// Export the OAuth handler as the default
export default new OAuthProvider({
  apiHandlers: {
    '/sse': MyMCP.serveSSE('/sse'), // legacy SSE
    '/mcp': MyMCP.serve('/mcp'), // Streaming HTTP
  },
  defaultHandler: makeOAuthConsent(serverConfig),
  authorizeEndpoint: '/authorize',
  tokenEndpoint: '/token',
  // Registration stays for clients without CIMD; clients that support CIMD
  // (Claude among them) skip it, so the KV client store no longer grows per connection.
  clientRegistrationEndpoint: '/register',
  clientIdMetadataDocumentEnabled: true,
});
