// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asBinaryContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/document/{document_id}/download',
  operationId: 'downloadDocument',
};

export const tool: Tool = {
  name: 'download_document',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDownload document\n\n# Response Schema\n```json\n{\n  type: 'string'\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['document_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return asBinaryContentResult(await client.document.download(document_id));
};

export default { metadata, tool, handler };
