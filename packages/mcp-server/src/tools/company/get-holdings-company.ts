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
  httpPath: '/v1/company/{company_id}/holdings',
  operationId: 'getHoldings',
};

export const tool: Tool = {
  name: 'get_holdings_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet company holdings\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'Companies this entity owns or has invested in.\\n',\n  properties: {\n    company_id: {\n      type: 'string',\n      description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n    },\n    holdings: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          company_id: {\n            type: 'string',\n            description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n          },\n          name: {\n            type: 'string',\n            description: 'Name of the company.\\n'\n          },\n          nominal_share: {\n            type: 'number',\n            description: 'Amount of shares or capital in the company.\\nExample: 100\\n'\n          },\n          relation_type: {\n            $ref: '#/$defs/company_relation_type'\n          },\n          end: {\n            type: 'string',\n            description: 'Date when the ownership ended.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n'\n          },\n          percentage_share: {\n            type: 'number',\n            description: 'Share of the company.\\nExample: 0.5 represents 50% ownership\\n'\n          },\n          start: {\n            type: 'string',\n            description: 'Date when the ownership started.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n'\n          }\n        },\n        required: [          'company_id',\n          'name',\n          'nominal_share',\n          'relation_type'\n        ]\n      }\n    }\n  },\n  required: [    'company_id',\n    'holdings'\n  ],\n  $defs: {\n    company_relation_type: {\n      type: 'string',\n      enum: [        'shareholder',\n        'stockholder',\n        'limited_partner',\n        'general_partner'\n      ]\n    }\n  }\n}\n```",
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
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { company_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.company.getHoldings(company_id)));
};

export default { metadata, tool, handler };
