// Stand-in for the Stainless-hosted code-tool endpoint, which was turned off.
// The Worker cannot spawn the Deno sandbox, so it forwards `execute` calls here
// through the container binding. Same request/response shape as the Stainless
// endpoint, so the generated worker code stays untouched; execution reuses the
// package's own local Deno path (--code-execution-mode=local).
import http from 'node:http';
import Openregister from 'openregister';
import { codeTool } from 'openregister-mcp/code-tool';
import { configureLogger, getLogger } from 'openregister-mcp/logger';

configureLogger({ level: process.env.LOG_LEVEL ?? 'info', pretty: false });
const logger = getLogger();

const port = Number(process.env.PORT ?? 3000);
const maxBodyBytes = 1 << 20;

const tool = codeTool({ blockedMethods: undefined, codeExecutionMode: 'local' });

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBodyBytes) {
        reject(new Error('request body too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', reject);
  });

const json = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
};

const workerOutput = (isError, result) => ({ is_error: isError, result, log_lines: [], err_lines: [] });

const parseClientEnvs = (header) => {
  if (typeof header !== 'string') return {};
  try {
    const parsed = JSON.parse(header);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
};

const handle = async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'GET' && url.pathname === '/health') {
    return json(res, 200, { ok: true });
  }
  if (req.method !== 'POST' || url.pathname !== '/code-tool') {
    return json(res, 404, { error: 'not found' });
  }

  const started = Date.now();
  try {
    const { code } = JSON.parse(await readBody(req));
    if (typeof code !== 'string') {
      return json(res, 400, workerOutput(true, 'code must be a string'));
    }
    const envs = parseClientEnvs(req.headers['x-stainless-mcp-client-envs']);
    if (!envs.OPENREGISTER_API_KEY) {
      return json(res, 400, workerOutput(true, 'missing OPENREGISTER_API_KEY in client envs'));
    }
    const client = new Openregister({
      apiKey: envs.OPENREGISTER_API_KEY,
      ...(envs.OPENREGISTER_BASE_URL && { baseURL: envs.OPENREGISTER_BASE_URL }),
    });

    const out = await tool.handler({ reqContext: { client }, args: { code } });
    const text = out.content.map((block) => block.text).join('\n');
    logger.info({ durationMs: Date.now() - started, isError: !!out.isError }, 'code tool call');
    return json(res, 200, workerOutput(!!out.isError, text));
  } catch (err) {
    logger.error({ err, durationMs: Date.now() - started }, 'code tool call failed');
    return json(res, 500, workerOutput(true, err instanceof Error ? err.message : String(err)));
  }
};

const server = http.createServer((req, res) => {
  handle(req, res).catch((err) => {
    logger.error({ err }, 'unhandled request error');
    if (!res.headersSent) json(res, 500, workerOutput(true, 'internal error'));
  });
});
server.requestTimeout = 600_000;
server.listen(port, () => logger.info({ port }, 'mcp-exec listening'));

const shutdown = (signal) => {
  logger.info({ signal }, 'shutting down');
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 10_000).unref();
};
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
