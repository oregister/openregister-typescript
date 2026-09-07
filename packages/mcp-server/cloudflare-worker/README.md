# Remote MCP Server on Cloudflare with Stainless

Remote MCP servers require OAuth, so this flow implements a local version of the OAuth redirects, but instead accepts the
API token and any other client configuration options that you'd need to instantiate your TypeScript client.

## Usage

The recommended way to use this project is to use the below "deploy to cloudflare" button to use this repo as a template for generating a server.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/oregister/openregister-typescript/tree/main/packages/mcp-server/cloudflare-worker)

## Develop locally

```bash
# install dependencies
npm install

# run locally
npm run dev
```

You should be able to open [`http://localhost:8787/`](http://localhost:8787/) in your browser

## Connect the MCP inspector to your server

To explore your new MCP api, you can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector).

- Start it with `npx @modelcontextprotocol/inspector`
- [Within the inspector](http://localhost:5173), switch the Transport Type to `SSE` and enter `http://localhost:8787/sse` as the URL of the MCP server to connect to, and click "Connect"
- You will navigate to a (mock) user/password login screen. Input any email and pass to login.
- You should be redirected back to the MCP Inspector and you can now list and call any defined tools!

## Connect Claude Desktop to your local MCP server

The MCP inspector is great, but we really want to connect this to Claude! Follow [Anthropic's Quickstart](https://modelcontextprotocol.io/quickstart/user) and within Claude Desktop go to Settings > Developer > Edit Config to find your configuration file.

Open the file in your text editor and replace it with this configuration:

```json
{
  "mcpServers": {
    "openregister_api": {
      "command": "npx",
      "args": ["mcp-remote", "http://localhost:8787/sse"]
    }
  }
}
```

This will run a local proxy and let Claude talk to your MCP server over HTTP

When you open Claude a browser window should open and allow you to login. You should see the tools available in the bottom right. Given the right prompt Claude should ask to call the tool.

## Code execution

The `execute` tool runs agent code in a Deno sandbox. The Worker runtime cannot spawn
Deno and the Stainless-hosted sandbox has been turned off, so the sandbox runs in a
[Cloudflare Container](https://developers.cloudflare.com/containers/) built from
`./mcp-exec/Dockerfile` and deployed together with the Worker by `wrangler deploy`
(Workers Paid plan required). `src/code-tool-proxy.ts` reroutes the package's
`CODE_MODE_ENDPOINT_URL` fetch to the container binding; nothing is sent to Stainless.

Latency: one call costs about 1.5s of single-core CPU (Deno spawn, TypeScript check,
run), so the container runs on a full vCPU and the image pre-warms Deno's code cache.
Reusing Deno processes per API key would remove the spawn cost if more is needed.

`mcp-exec` pins `openregister-mcp`; bump it in `mcp-exec/package.json` when the
package is released so the sandbox SDK matches the published one.

## Deploy to Cloudflare

If you want to manually deploy this server (e.g. without the "deploy to cloudflare" button)

1. `npx wrangler@latest kv namespace create remote-mcp-server-oauth-kv`
2. Follow the guidance to add the kv namespace ID to `wrangler.jsonc`
3. `npm run deploy`

## Call your newly deployed remote MCP server from a remote MCP client

Just like you did above in "Develop locally", run the MCP inspector:

`npx @modelcontextprotocol/inspector@latest`

Then enter the `workers.dev` URL (ex: `worker-name.account-name.workers.dev/sse`) of your Worker in the inspector as the URL of the MCP server to connect to, and click "Connect".

You've now connected to your MCP server from a remote MCP client.

## Connect Claude Desktop to your remote MCP server

Update the Claude configuration file to point to your `workers.dev` URL (ex: `worker-name.account-name.workers.dev/sse`) and restart Claude

```json
{
  "mcpServers": {
    "openregister_api": {
      "command": "npx",
      "args": ["mcp-remote", "https://worker-name.account-name.workers.dev/sse"]
    }
  }
}
```

## Debugging

Should anything go wrong it can be helpful to restart Claude, or to try connecting directly to your
MCP server on the command line with the following command.

```bash
npx mcp-remote http://localhost:8787/sse
```

In some rare cases it may help to clear the files added to `~/.mcp-auth`

```bash
rm -rf ~/.mcp-auth
```
