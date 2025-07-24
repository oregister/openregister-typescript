// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'jobs.document',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/jobs/document/{id}',
  operationId: 'getDocumentJobStatus',
};

export const tool: Tool = {
  name: 'retrieve_jobs_document',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet document job status\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    status: {\n      type: 'string',\n      enum: [        'pending',\n        'completed',\n        'failed'\n      ]\n    },\n    date: {\n      type: 'string',\n      description: 'Date when the job was created.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n'\n    },\n    url: {\n      type: 'string'\n    }\n  },\n  required: [    'status'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.jobs.document.retrieve(id)));
};

export default { metadata, tool, handler };
