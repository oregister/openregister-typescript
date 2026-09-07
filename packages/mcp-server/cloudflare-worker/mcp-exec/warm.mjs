// Build-time only. Runs one execute call so Deno writes its V8 code cache
// (notably the 9 MB TypeScript bundle) into DENO_DIR inside the image; the
// first call after a container start otherwise pays ~2s compiling it.
import Openregister from 'openregister';
import { codeTool } from 'openregister-mcp/code-tool';
import { configureLogger } from 'openregister-mcp/logger';

configureLogger({ level: 'warn', pretty: false });
const tool = codeTool({ blockedMethods: undefined, codeExecutionMode: 'local' });
const client = new Openregister({ apiKey: 'warm' });
const out = await tool.handler({
  reqContext: { client },
  args: { code: 'async function run(client) { return 1 }' },
});
if (out.isError) {
  console.error(out.content);
  process.exit(1);
}
