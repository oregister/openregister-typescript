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
  name: 'get_financials_v1_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet financial reports\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    merged: {\n      type: 'object',\n      description: 'All report periods merged into a single view',\n      properties: {\n        aktiva: {\n          type: 'object',\n          description: 'Report table with data merged across multiple report periods',\n          properties: {\n            rows: {\n              type: 'array',\n              items: {\n                type: 'object',\n                description: 'Report row with values from multiple report periods',\n                properties: {\n                  children: {\n                    type: 'array',\n                    items: {\n                      type: 'object',\n                      additionalProperties: true\n                    }\n                  },\n                  formatted_name: {\n                    type: 'string'\n                  },\n                  name: {\n                    type: 'string'\n                  },\n                  values: {\n                    type: 'object',\n                    description: 'Report end date to value mapping (ISO date string as key)',\n                    additionalProperties: true\n                  }\n                },\n                required: [                  'children',\n                  'formatted_name',\n                  'name',\n                  'values'\n                ]\n              }\n            }\n          },\n          required: [            'rows'\n          ]\n        },\n        passiva: {\n          type: 'object',\n          description: 'Report table with data merged across multiple report periods',\n          properties: {\n            rows: {\n              type: 'array',\n              items: {\n                type: 'object',\n                description: 'Report row with values from multiple report periods',\n                properties: {\n                  children: {\n                    type: 'array',\n                    items: {\n                      type: 'object',\n                      additionalProperties: true\n                    }\n                  },\n                  formatted_name: {\n                    type: 'string'\n                  },\n                  name: {\n                    type: 'string'\n                  },\n                  values: {\n                    type: 'object',\n                    description: 'Report end date to value mapping (ISO date string as key)',\n                    additionalProperties: true\n                  }\n                },\n                required: [                  'children',\n                  'formatted_name',\n                  'name',\n                  'values'\n                ]\n              }\n            }\n          },\n          required: [            'rows'\n          ]\n        },\n        guv: {\n          type: 'object',\n          description: 'Report table with data merged across multiple report periods',\n          properties: {\n            rows: {\n              type: 'array',\n              items: {\n                type: 'object',\n                description: 'Report row with values from multiple report periods',\n                properties: {\n                  children: {\n                    type: 'array',\n                    items: {\n                      type: 'object',\n                      additionalProperties: true\n                    }\n                  },\n                  formatted_name: {\n                    type: 'string'\n                  },\n                  name: {\n                    type: 'string'\n                  },\n                  values: {\n                    type: 'object',\n                    description: 'Report end date to value mapping (ISO date string as key)',\n                    additionalProperties: true\n                  }\n                },\n                required: [                  'children',\n                  'formatted_name',\n                  'name',\n                  'values'\n                ]\n              }\n            }\n          },\n          required: [            'rows'\n          ]\n        }\n      },\n      required: [        'aktiva',\n        'passiva'\n      ]\n    },\n    reports: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          aktiva: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  $ref: '#/$defs/report_row'\n                }\n              }\n            },\n            required: [              'rows'\n            ]\n          },\n          consolidated: {\n            type: 'boolean',\n            description: 'Whether the report is a consolidated report or not.\\n'\n          },\n          passiva: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  $ref: '#/$defs/report_row'\n                }\n              }\n            },\n            required: [              'rows'\n            ]\n          },\n          report_end_date: {\n            type: 'string'\n          },\n          report_id: {\n            type: 'string',\n            description: 'Unique identifier for the financial report.\\nExample: f47ac10b-58cc-4372-a567-0e02b2c3d479\\n'\n          },\n          report_start_date: {\n            type: 'string'\n          },\n          guv: {\n            type: 'object',\n            properties: {\n              rows: {\n                type: 'array',\n                items: {\n                  $ref: '#/$defs/report_row'\n                }\n              }\n            },\n            required: [              'rows'\n            ]\n          }\n        },\n        required: [          'aktiva',\n          'consolidated',\n          'passiva',\n          'report_end_date',\n          'report_id',\n          'report_start_date'\n        ]\n      }\n    }\n  },\n  required: [    'merged',\n    'reports'\n  ],\n  $defs: {\n    report_row: {\n      type: 'object',\n      properties: {\n        children: {\n          type: 'array',\n          items: {\n            $ref: '#/$defs/report_row'\n          }\n        },\n        current_value: {\n          type: 'integer'\n        },\n        formatted_name: {\n          type: 'string'\n        },\n        name: {\n          type: 'string'\n        },\n        previous_value: {\n          type: 'integer'\n        }\n      },\n      required: [        'children',\n        'current_value',\n        'formatted_name',\n        'name',\n        'previous_value'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.company.getFinancialsV1(company_id)));
};

export default { metadata, tool, handler };
