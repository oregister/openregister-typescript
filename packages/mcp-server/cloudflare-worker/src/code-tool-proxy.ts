import { getRandom } from '@cloudflare/containers';
import type { McpExecContainer } from './index';

// openregister-mcp's `execute` tool POSTs code to CODE_MODE_ENDPOINT_URL with
// global fetch. Workers cannot spawn the Deno sandbox and Stainless's hosted
// sandbox is gone, so the URL (set in wrangler.jsonc `vars`) points at this
// sentinel host and fetch is rerouted to the mcp-exec container binding.
export const CODE_TOOL_HOST = 'mcp-exec.internal';

const CONTAINER_INSTANCES = 3;

// Claude drops a tool call after 240s; answering before that hands the model
// an error it can act on instead of a dead call.
const EXEC_TIMEOUT_MS = 200_000;

function timeoutResponse(): Response {
  return Response.json({
    is_error: true,
    result: `code execution timed out after ${EXEC_TIMEOUT_MS / 1000}s; use API filters to narrow the query or split it into smaller steps`,
    log_lines: [],
    err_lines: [],
  });
}

let installed = false;

export function installCodeToolProxy(binding: DurableObjectNamespace<McpExecContainer>) {
  if (installed) return;
  installed = true;

  const upstream = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url =
      typeof input === 'string' ? input
      : input instanceof URL ? input.href
      : input.url;
    if (new URL(url).host !== CODE_TOOL_HOST) {
      return upstream(input, init);
    }
    const container = await getRandom(binding, CONTAINER_INSTANCES);
    let timer: ReturnType<typeof setTimeout> | undefined;
    const timeout = new Promise<Response>((resolve) => {
      timer = setTimeout(() => resolve(timeoutResponse()), EXEC_TIMEOUT_MS);
    });
    try {
      return await Promise.race([container.fetch(new Request(input, init)), timeout]);
    } finally {
      if (timer !== undefined) {
        clearTimeout(timer);
      }
    }
  }) as typeof fetch;
}
