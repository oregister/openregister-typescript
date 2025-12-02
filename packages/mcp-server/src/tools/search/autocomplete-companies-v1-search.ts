// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'search',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/autocomplete/company',
  operationId: 'autocompleteCompany',
};

export const tool: Tool = {
  name: 'autocomplete_companies_v1_search',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAutocomplete company search\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/search_autocomplete_companies_v1_response',\n  $defs: {\n    search_autocomplete_companies_v1_response: {\n      type: 'object',\n      properties: {\n        results: {\n          type: 'array',\n          description: 'List of companies matching the search criteria.\\n',\n          items: {\n            type: 'object',\n            properties: {\n              active: {\n                type: 'boolean',\n                description: 'Company status - true if active, false if inactive.\\n'\n              },\n              company_id: {\n                type: 'string',\n                description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n              },\n              country: {\n                type: 'string',\n                description: 'Country where the company is registered using ISO 3166-1 alpha-2 code.\\nExample: \"DE\" for Germany\\n'\n              },\n              legal_form: {\n                $ref: '#/$defs/company_legal_form'\n              },\n              name: {\n                type: 'string',\n                description: 'Official registered company name.\\nExample: \"Max Mustermann GmbH\"\\n'\n              },\n              register_court: {\n                type: 'string',\n                description: 'Court where the company is registered.\\nExample: \"Berlin (Charlottenburg)\"\\n'\n              },\n              register_number: {\n                type: 'string',\n                description: 'Registration number in the company register.\\nExample: \"230633\"\\n'\n              },\n              register_type: {\n                $ref: '#/$defs/company_register_type'\n              }\n            },\n            required: [              'active',\n              'company_id',\n              'country',\n              'legal_form',\n              'name',\n              'register_court',\n              'register_number',\n              'register_type'\n            ]\n          }\n        }\n      },\n      required: [        'results'\n      ]\n    },\n    company_legal_form: {\n      type: 'string',\n      description: 'Legal form of the company.\\nCommon German legal forms:\\n- gmbh: Gesellschaft mit beschränkter Haftung (Limited Liability Company)\\n- ag: Aktiengesellschaft (Stock Corporation)\\n- ug: Unternehmergesellschaft (Entrepreneurial Company with limited liability)\\n- ohg: Offene Handelsgesellschaft (General Partnership)\\n- kg: Kommanditgesellschaft (Limited Partnership)\\n- ev: Eingetragener Verein (Registered Association)',\n      enum: [        'ag',\n        'eg',\n        'ek',\n        'ev',\n        'ewiv',\n        'foreign',\n        'gbr',\n        'ggmbh',\n        'gmbh',\n        'kg',\n        'kgaa',\n        'unknown',\n        'llp',\n        'municipal',\n        'ohg',\n        'se',\n        'ug'\n      ]\n    },\n    company_register_type: {\n      type: 'string',\n      description: 'Type of company register where the entity is recorded.\\nCommon types:\\n- HRB: Commercial Register B (limited liability companies, stock corporations)\\n- HRA: Commercial Register A (partnerships, sole proprietorships)\\n- PR: Partnership Register\\n- GnR: Cooperative Register\\n- VR: Association Register',\n      enum: [        'HRB',\n        'HRA',\n        'PR',\n        'GnR',\n        'VR'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Text search query to find companies by name.\nExample: "Descartes Technologies UG"\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['query'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.search.autocompleteCompaniesV1(body)),
    );
  } catch (error) {
    if (error instanceof Openregister.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
