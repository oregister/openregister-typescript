// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'search',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v1/search/company',
  operationId: 'companyFilterSearch',
};

export const tool: Tool = {
  name: 'find_companies_v1_search',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch for companies\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    pagination: {\n      type: 'object',\n      properties: {\n        page: {\n          type: 'integer',\n          description: 'Current page number.'\n        },\n        per_page: {\n          type: 'integer',\n          description: 'Number of results per page.'\n        },\n        total_pages: {\n          type: 'integer',\n          description: 'Total number of pages.'\n        },\n        total_results: {\n          type: 'integer',\n          description: 'Total number of results.'\n        }\n      },\n      required: [        'page',\n        'per_page',\n        'total_pages',\n        'total_results'\n      ]\n    },\n    results: {\n      type: 'array',\n      description: 'List of companies matching the search criteria.\\n',\n      items: {\n        type: 'object',\n        properties: {\n          active: {\n            type: 'boolean',\n            description: 'Company status - true if active, false if inactive.\\n'\n          },\n          company_id: {\n            type: 'string',\n            description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n          },\n          legal_form: {\n            $ref: '#/$defs/company_legal_form'\n          },\n          name: {\n            type: 'string',\n            description: 'Official registered company name.\\nExample: \"Max Mustermann GmbH\"\\n'\n          },\n          register_court: {\n            type: 'string',\n            description: 'Court where the company is registered.\\nExample: \"Berlin (Charlottenburg)\"\\n'\n          },\n          register_number: {\n            type: 'string',\n            description: 'Registration number in the company register.\\nExample: \"230633\"\\n'\n          },\n          register_type: {\n            $ref: '#/$defs/company_register_type'\n          },\n          country: {\n            type: 'string',\n            description: 'Country where the company is registered using ISO 3166-1 alpha-2 code.\\nExample: \"DE\" for Germany\\n'\n          }\n        },\n        required: [          'active',\n          'company_id',\n          'legal_form',\n          'name',\n          'register_court',\n          'register_number',\n          'register_type'\n        ]\n      }\n    }\n  },\n  required: [    'pagination',\n    'results'\n  ],\n  $defs: {\n    company_legal_form: {\n      type: 'string',\n      description: 'Legal form of the company.\\nCommon German legal forms:\\n- gmbh: Gesellschaft mit beschränkter Haftung (Limited Liability Company)\\n- ag: Aktiengesellschaft (Stock Corporation)\\n- ug: Unternehmergesellschaft (Entrepreneurial Company with limited liability)\\n- ohg: Offene Handelsgesellschaft (General Partnership)\\n- kg: Kommanditgesellschaft (Limited Partnership)\\n- ev: Eingetragener Verein (Registered Association)',\n      enum: [        'ag',\n        'eg',\n        'ek',\n        'ev',\n        'ewiv',\n        'foreign',\n        'gbr',\n        'ggmbh',\n        'gmbh',\n        'kg',\n        'kgaa',\n        'unknown',\n        'llp',\n        'municipal',\n        'ohg',\n        'se',\n        'ug'\n      ]\n    },\n    company_register_type: {\n      type: 'string',\n      description: 'Type of company register where the entity is recorded.\\nCommon types:\\n- HRB: Commercial Register B (limited liability companies, stock corporations)\\n- HRA: Commercial Register A (partnerships, sole proprietorships)\\n- PR: Partnership Register\\n- GnR: Cooperative Register\\n- VR: Association Register',\n      enum: [        'HRB',\n        'HRA',\n        'PR',\n        'GnR',\n        'VR'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      filters: {
        type: 'array',
        description: 'Filters to filter companies.\n',
        items: {
          type: 'object',
          description:
            'Filter by field. The properties values, value, keywords and min/max are mutually exclusive.\nDates must be in the format YYYY-MM-DD.\n',
          properties: {
            field: {
              type: 'string',
              description: 'Field to filter on.',
              enum: [
                'status',
                'legal_form',
                'register_number',
                'register_court',
                'register_type',
                'city',
                'active',
                'incorporated_at',
                'zip',
                'address',
                'balance_sheet_total',
                'revenue',
                'cash',
                'employees',
                'equity',
                'real_estate',
                'materials',
                'pension_provisions',
                'salaries',
                'taxes',
                'liabilities',
                'capital_reserves',
                'net_income',
                'industry_codes',
                'capital_amount',
                'capital_currency',
              ],
            },
            keywords: {
              type: 'array',
              description: 'Keywords to filter on.\n',
              items: {
                type: 'string',
              },
            },
            max: {
              type: 'string',
              description: 'Maximum value to filter on.\n',
            },
            min: {
              type: 'string',
              description: 'Minimum value to filter on.\n',
            },
            value: {
              type: 'string',
              description: 'Value to filter on.\n',
            },
            values: {
              type: 'array',
              description: 'Values to filter on.\n',
              items: {
                type: 'string',
              },
            },
          },
        },
      },
      location: {
        type: 'object',
        description: 'Location to filter companies.\n',
        properties: {
          latitude: {
            type: 'number',
            description: 'Latitude to filter on.\n',
          },
          longitude: {
            type: 'number',
            description: 'Longitude to filter on.\n',
          },
          radius: {
            type: 'number',
            description: 'Radius in kilometers to filter on.\nExample: 10\n',
          },
        },
        required: ['latitude', 'longitude'],
      },
      pagination: {
        type: 'object',
        description: 'Pagination parameters.\n',
        properties: {
          page: {
            type: 'integer',
            description: 'Page number to return.\n',
          },
          per_page: {
            type: 'integer',
            description: 'Number of results per page.\n',
          },
        },
      },
      query: {
        type: 'object',
        description: 'Search query to filter companies.\n',
        properties: {
          value: {
            type: 'string',
            description: 'Search query to filter companies.\n',
          },
        },
        required: ['value'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.search.findCompaniesV1(body)));
};

export default { metadata, tool, handler };
