// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/document/{document_id}',
  operationId: 'getDocument',
};

export const tool: Tool = {
  name: 'retrieve_document',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet document information\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string',\n      description: 'The unique identifier for the document. E.g. \"f47ac10b-58cc-4372-a567-0e02b2c3d479\"'\n    },\n    date: {\n      type: 'string',\n      description: 'The date of the document. E.g. \"2022-01-01\"'\n    },\n    name: {\n      type: 'string',\n      description: 'The name of the document. E.g. \"Musterprotokoll vom 01.01.2022\"'\n    },\n    type: {\n      type: 'string',\n      description: 'The type of document.',\n      enum: [        'articles_of_association',\n        'sample_protocol',\n        'shareholder_list'\n      ]\n    },\n    url: {\n      type: 'string',\n      description: 'The URL of the document. It can be downloaded from there. Only valid for 15 minutes after the request.'\n    }\n  },\n  required: [    'id',\n    'date',\n    'name',\n    'type',\n    'url'\n  ]\n}\n```",
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
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.document.retrieve(document_id)));
};

export default { metadata, tool, handler };
