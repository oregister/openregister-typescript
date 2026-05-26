# OpenRegister MCP Server

Access German company data from official registries — directly inside your AI assistant or application.

**Server URL:** `{{cloudflareWorkerUrl}}`

---

## Use in AI Assistants

Connect OpenRegister to your AI assistant with a single URL — no terminal or configuration files needed.

### Claude.ai

The easiest way to connect. Claude.ai supports MCP servers natively through its Integrations settings.

1. Open [Claude.ai](https://claude.ai) and go to **Settings → Integrations**
2. Click **+ Add** or **+ Add Custom Integration**
3. Enter the MCP server URL: `{{cloudflareWorkerUrl}}`
4. Follow the authorization flow to connect your API key

### ChatGPT

ChatGPT supports MCP servers via its Connectors feature (requires Developer Mode).

1. Open [ChatGPT](https://chatgpt.com) and go to **Settings → Advanced**
2. Enable **Developer Mode**
3. Go to **Settings → Connectors** and click **+ Add Custom Connector**
4. Enter the MCP server URL: `{{cloudflareWorkerHttpUrl}}`
5. Follow the authorization flow to connect your API key

---

## Use in Developer Tools

Connect OpenRegister to your coding assistant by editing a config file. Requires [Node.js 18+](https://nodejs.org) and uses [mcp-remote](https://www.npmjs.com/package/mcp-remote) to bridge local clients to the remote server.

### Claude Desktop

Edit your Claude Desktop configuration file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "openregister": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "{{cloudflareWorkerUrl}}"]
    }
  }
}
```

Restart Claude Desktop. Look for the hammer icon (🔨) in the toolbar to confirm the connection.

### Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "openregister": {
      "command": "npx",
      "args": ["-y", "mcp-remote@latest", "{{cloudflareWorkerUrl}}"]
    }
  }
}
```

Restart Cursor to activate the connection.

---

## Build with It

Use the OpenRegister MCP server as a tool source in your own AI agents and pipelines.

### OpenAI Agents SDK (Python)

```python
from agents import Agent, Runner
from agents.mcp import MCPServerStreamableHttp

async def main():
    async with MCPServerStreamableHttp(
        url="{{cloudflareWorkerHttpUrl}}",
        headers={"Authorization": "Bearer YOUR_API_KEY"},
    ) as mcp_server:
        agent = Agent(
            name="company-researcher",
            instructions="Use OpenRegister tools to look up German company data.",
            mcp_servers=[mcp_server],
        )
        result = await Runner.run(agent, "Find information about Volkswagen AG")
        print(result.final_output)
```

### Vercel AI SDK (TypeScript)

```typescript
import { createOpenAI } from '@ai-sdk/openai';
import { experimental_createMCPClient, generateText } from 'ai';

const mcpClient = await experimental_createMCPClient({
  transport: {
    type: 'sse',
    url: '{{cloudflareWorkerUrl}}',
    headers: { Authorization: 'Bearer YOUR_API_KEY' },
  },
});

const tools = await mcpClient.tools();

const { text } = await generateText({
  model: createOpenAI({ apiKey: process.env.OPENAI_API_KEY })('gpt-4o'),
  tools,
  prompt: 'Find information about Volkswagen AG',
});

await mcpClient.close();
```

### Any MCP-compatible client

Both transport formats are supported:

| Transport       | Endpoint                      | Best for                                  |
| --------------- | ----------------------------- | ----------------------------------------- |
| SSE (legacy)    | `{{cloudflareWorkerUrl}}`     | Claude Desktop, Cursor, mcp-remote        |
| Streamable HTTP | `{{cloudflareWorkerHttpUrl}}` | ChatGPT, OpenAI Agents SDK, newer clients |

---

## Troubleshooting

If you encounter issues connecting:

1. Ensure you have **Node.js 18 or higher** installed
2. Clear the MCP auth cache: `rm -rf ~/.mcp-auth`
3. Restart your MCP client application
4. Check client logs for error messages

Get your API key at [openregister.de/keys](https://openregister.de/keys).

## Learn More

- [OpenRegister API Docs](https://docs.openregister.de)
- [MCP Integration Guide](https://docs.openregister.de/integration/mcp)
- [MCP Introduction](https://modelcontextprotocol.io/introduction)
- [mcp-remote package](https://www.npmjs.com/package/mcp-remote)
