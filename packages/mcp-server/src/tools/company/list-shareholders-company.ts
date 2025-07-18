// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'company',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/company/{company_id}/shareholders',
  operationId: 'getShareholders',
};

export const tool: Tool = {
  name: 'list_shareholders_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet company shareholders\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    date: {\n      type: 'string',\n      description: 'Date when this shareholder information became effective.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n'\n    },\n    document_id: {\n      type: 'string',\n      description: 'Unique identifier for the document this was taken from.\\nExample: \"f47ac10b-58cc-4372-a567-0e02b2c3d479\"\\n'\n    },\n    shareholders: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          country: {\n            type: 'string',\n            description: 'Country where the shareholder is located, in ISO 3166-1 alpha-2 format.\\nExample: \"DE\" for Germany\\n'\n          },\n          name: {\n            type: 'string',\n            description: 'The name of the shareholder. E.g. \"Max Mustermann\" or \"Max Mustermann GmbH\"'\n          },\n          nominal_share: {\n            type: 'integer',\n            description: 'Nominal value of shares in Euro.\\nExample: 100\\n'\n          },\n          percentage_share: {\n            type: 'number',\n            description: 'Percentage of company ownership.\\nExample: 5.36 represents 5.36% ownership\\n'\n          },\n          type: {\n            $ref: '#/$defs/entity_type'\n          },\n          id: {\n            type: 'string',\n            description: 'Unique identifier for the shareholder.\\nFor companies: Format matches company_id pattern\\nFor individuals: UUID\\nExample: \"DE-HRB-F1103-267645\" or UUID\\nMay be null for certain shareholders.\\n'\n          }\n        },\n        required: [          'country',\n          'name',\n          'nominal_share',\n          'percentage_share',\n          'type'\n        ]\n      }\n    }\n  },\n  required: [    'date',\n    'document_id',\n    'shareholders'\n  ],\n  $defs: {\n    entity_type: {\n      type: 'string',\n      enum: [        'natural_person',\n        'legal_person'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['company_id'],
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { company_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.company.listShareholders(company_id)));
};

export default { metadata, tool, handler };
