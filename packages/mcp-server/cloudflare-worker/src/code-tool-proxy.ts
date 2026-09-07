import { getRandom } from '@cloudflare/containers';
import type { McpExecContainer } from './index';

// openregister-mcp's `execute` tool POSTs code to CODE_MODE_ENDPOINT_URL with
// global fetch. Workers cannot spawn the Deno sandbox and Stainless's hosted
// sandbox is gone, so the URL (set in wrangler.jsonc `vars`) points at this
// sentinel host and fetch is rerouted to the mcp-exec container binding.
export const CODE_TOOL_HOST = 'mcp-exec.internal';

const CONTAINER_INSTANCES = 3;

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
    return container.fetch(new Request(input, init));
  }) as typeof fetch;
}
