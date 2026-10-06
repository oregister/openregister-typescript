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
import { DOCS_SEARCH_INPUT_SCHEMA, installDocsSearch } from './docs-search';

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

// Server instructions carry the same note, but some clients drop them; tool
// descriptions always arrive. It leads because some clients truncate them.
const MONEY_UNITS =
  'Financial figures (indicators and report rows from `client.company.getFinancialsV1`, plus `indicators` on `getDetailsV1`) are integers in euro cents: divide by 100. E.g. revenue 1234567890 = EUR 12,345,678.90. Share capital is not in cents; it is a decimal amount with its own currency field.';

const TOOL_PRESENTATION: Record<
  string,
  { title: string; describe?: (original: string) => string; inputSchema?: Tool['inputSchema'] }
> = {
  execute: {
    title: 'Query the OpenRegister API',
    describe: (original) =>
      `${MONEY_UNITS}\n\n${original}\n\nThe client is the OpenRegister TypeScript SDK; API reference: https://docs.openregister.de. Methods that create or delete data (monitors, Transparenzregister credentials and extracts) are blocked, so this tool only reads.`,
  },
  search_docs: {
    title: 'Search OpenRegister API documentation',
    describe: () =>
      `Search the OpenRegister documentation and SDK. Returns up to 3 SDK methods to call from execute and up to 3 docs sections, each with a short excerpt. For a method's parameters and response fields, or a section's full text, call again with \`read\` set to a method name or docs path from the results.`,
    inputSchema: DOCS_SEARCH_INPUT_SCHEMA,
  },
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
      inputSchema: presentation.inputSchema ?? tool.inputSchema,
      annotations: {
        ...tool.annotations,
        title: presentation.title,
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        // Both tools only reach first-party OpenRegister services.
        openWorldHint: false,
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
      installDocsSearch();

      const clientConfig = this.props.clientConfig;
      // Spread first: a client may narrow the allowed set, never widen it.
      const mcpOptions: McpOptions = {
        ...clientConfig,
        codeExecutionMode: clientConfig?.codeExecutionMode ?? 'stainless-sandbox',
        docsSearchMode: clientConfig?.docsSearchMode ?? 'local',
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
  // Each refresh rotates the refresh token and only the previous one stays
  // valid, so clients refreshing in parallel can end up holding a revoked
  // token and must sign in again. Long-lived access tokens make refreshes,
  // and with them that race, rare. The token only wraps the user's API key.
  accessTokenTTL: 30 * 24 * 60 * 60,
  refreshTokenTTL: 365 * 24 * 60 * 60,
});
