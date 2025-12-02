// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'company',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/company/{company_id}/ubo',
  operationId: 'getUBO',
};

export const tool: Tool = {
  name: 'get_ubos_v1_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet company end owners\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/company_get_ubos_v1_response',\n  $defs: {\n    company_get_ubos_v1_response: {\n      type: 'object',\n      properties: {\n        company_id: {\n          type: 'string',\n          description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n        },\n        ubos: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the shareholder.\\nFor individuals: UUID\\nFor companies: Format matches company_id pattern\\nExample: \"DE-HRB-F1103-267645\" or UUID\\nMay be null for certain shareholders.\\n'\n              },\n              legal_person: {\n                type: 'object',\n                properties: {\n                  city: {\n                    type: 'string'\n                  },\n                  country: {\n                    type: 'string',\n                    description: 'Country where the owner is located, in ISO 3166-1 alpha-2 format.\\nExample: \"DE\" for Germany\\n'\n                  },\n                  name: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'city',\n                  'country',\n                  'name'\n                ]\n              },\n              max_percentage_share: {\n                type: 'number',\n                description: 'Maximum percentage of company ownership.\\nExample: 5.36 represents maximum of 5.36% ownership\\nThere is no exact percentage share for owners that hold a stake as or through a limited partner.\\nFor these owners, we can only show the maximum percentage share they could have based on their deposit as a limited partner.\\nIs null for all owners that have an exact percentage share or owners that hold a stake as or through a personal liable director.\\n'\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the shareholder. E.g. \"Max Mustermann\"'\n              },\n              natural_person: {\n                type: 'object',\n                properties: {\n                  city: {\n                    type: 'string'\n                  },\n                  country: {\n                    type: 'string'\n                  },\n                  date_of_birth: {\n                    type: 'string'\n                  },\n                  first_name: {\n                    type: 'string'\n                  },\n                  full_name: {\n                    type: 'string'\n                  },\n                  last_name: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'city',\n                  'country',\n                  'date_of_birth',\n                  'first_name',\n                  'full_name',\n                  'last_name'\n                ]\n              },\n              percentage_share: {\n                type: 'number',\n                description: 'Percentage of company ownership.\\nExample: 5.36 represents 5.36% ownership\\nIs null for all owners that hold a stake as or through a personal liable directors or limited partner.\\n'\n              }\n            },\n            required: [              'id',\n              'legal_person',\n              'max_percentage_share',\n              'name',\n              'natural_person',\n              'percentage_share'\n            ]\n          }\n        }\n      },\n      required: [        'company_id',\n        'ubos'\n      ]\n    }\n  }\n}\n```",
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.company.getUbosV1(company_id)));
  } catch (error) {
    if (error instanceof Openregister.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
