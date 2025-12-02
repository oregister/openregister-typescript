// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/document',
  operationId: 'getRealtimeDocument',
};

export const tool: Tool = {
  name: 'get_realtime_v1_document',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFetch a document in realtime.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/document_get_realtime_v1_response',\n  $defs: {\n    document_get_realtime_v1_response: {\n      type: 'object',\n      properties: {\n        category: {\n          type: 'string',\n          enum: [            'current_printout',\n            'chronological_printout',\n            'historical_printout',\n            'structured_information',\n            'shareholder_list',\n            'articles_of_association'\n          ]\n        },\n        file_date: {\n          type: 'string'\n        },\n        file_name: {\n          type: 'string'\n        },\n        url: {\n          type: 'string'\n        }\n      },\n      required: [        'category',\n        'file_date',\n        'file_name',\n        'url'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      document_category: {
        type: 'string',
        enum: [
          'current_printout',
          'chronological_printout',
          'historical_printout',
          'structured_information',
          'shareholder_list',
          'articles_of_association',
        ],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['company_id', 'document_category'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.document.getRealtimeV1(body)));
  } catch (error) {
    if (error instanceof Openregister.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
