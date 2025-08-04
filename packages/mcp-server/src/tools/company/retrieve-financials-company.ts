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
  httpPath: '/v1/company/{company_id}/financials',
  operationId: 'getFinancialReports',
};

export const tool: Tool = {
  name: 'retrieve_financials_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet financial reports\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    reports: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          aktiva: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  properties: {\n                    children: {\n                      type: 'array',\n                      items: {\n                        type: 'object'\n                      }\n                    },\n                    formatted_name: {\n                      type: 'string'\n                    },\n                    name: {\n                      type: 'string'\n                    },\n                    current_value: {\n                      type: 'integer'\n                    },\n                    previous_value: {\n                      type: 'integer'\n                    }\n                  },\n                  required: [                    'children',\n                    'formatted_name',\n                    'name'\n                  ]\n                }\n              }\n            },\n            required: [              'rows'\n            ]\n          },\n          consolidated: {\n            type: 'boolean'\n          },\n          passiva: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  properties: {\n                    children: {\n                      type: 'array',\n                      items: {\n                        type: 'object'\n                      }\n                    },\n                    formatted_name: {\n                      type: 'string'\n                    },\n                    name: {\n                      type: 'string'\n                    },\n                    current_value: {\n                      type: 'integer'\n                    },\n                    previous_value: {\n                      type: 'integer'\n                    }\n                  },\n                  required: [                    'children',\n                    'formatted_name',\n                    'name'\n                  ]\n                }\n              }\n            },\n            required: [              'rows'\n            ]\n          },\n          report_end_date: {\n            type: 'string',\n            format: 'date-time'\n          },\n          report_id: {\n            type: 'string'\n          },\n          guv: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  type: 'object',\n                  properties: {\n                    children: {\n                      type: 'array',\n                      items: {\n                        type: 'object'\n                      }\n                    },\n                    formatted_name: {\n                      type: 'string'\n                    },\n                    name: {\n                      type: 'string'\n                    },\n                    current_value: {\n                      type: 'integer'\n                    },\n                    previous_value: {\n                      type: 'integer'\n                    }\n                  },\n                  required: [                    'children',\n                    'formatted_name',\n                    'name'\n                  ]\n                }\n              }\n            },\n            required: [              'rows'\n            ]\n          },\n          report_start_date: {\n            type: 'string',\n            format: 'date-time'\n          }\n        },\n        required: [          'aktiva',\n          'consolidated',\n          'passiva',\n          'report_end_date',\n          'report_id'\n        ]\n      }\n    }\n  },\n  required: [    'reports'\n  ]\n}\n```",
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
  const { company_id, jq_filter, ...body } = args as any;
  return asTextContentResult(
    await maybeFilter(jq_filter, await client.company.retrieveFinancials(company_id)),
  );
};

export default { metadata, tool, handler };
