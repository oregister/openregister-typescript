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
  httpPath: '/v1/company/{company_id}/owners',
  operationId: 'getOwners',
};

export const tool: Tool = {
  name: 'get_owners_v1_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet company owners\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/company_get_owners_v1_response',\n  $defs: {\n    company_get_owners_v1_response: {\n      type: 'object',\n      properties: {\n        company_id: {\n          type: 'string',\n          description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n        },\n        owners: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the shareholder.\\nFor companies: Format matches company_id pattern\\nFor individuals: UUID\\nExample: \"DE-HRB-F1103-267645\" or UUID\\nMay be null for certain shareholders.\\n'\n              },\n              legal_person: {\n                type: 'object',\n                description: 'Details about the legal person.\\n',\n                properties: {\n                  city: {\n                    type: 'string'\n                  },\n                  country: {\n                    type: 'string',\n                    description: 'Country where the owner is located, in ISO 3166-1 alpha-2 format.\\nExample: \"DE\" for Germany\\n'\n                  },\n                  name: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'city',\n                  'country',\n                  'name'\n                ]\n              },\n              name: {\n                type: 'string',\n                description: 'The name of the shareholder. E.g. \"Max Mustermann\" or \"Max Mustermann GmbH\"'\n              },\n              natural_person: {\n                type: 'object',\n                description: 'Details about the natural person.\\n',\n                properties: {\n                  city: {\n                    type: 'string'\n                  },\n                  country: {\n                    type: 'string'\n                  },\n                  date_of_birth: {\n                    type: 'string'\n                  },\n                  first_name: {\n                    type: 'string'\n                  },\n                  full_name: {\n                    type: 'string'\n                  },\n                  last_name: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'city',\n                  'country',\n                  'date_of_birth',\n                  'first_name',\n                  'full_name',\n                  'last_name'\n                ]\n              },\n              nominal_share: {\n                type: 'number',\n                description: 'Nominal value of shares in Euro.\\nExample: 100\\n'\n              },\n              percentage_share: {\n                type: 'number',\n                description: 'Percentage of company ownership.\\nExample: 5.36 represents 5.36% ownership\\n'\n              },\n              relation_type: {\n                $ref: '#/$defs/company_relation_type'\n              },\n              start: {\n                type: 'string',\n                description: 'Date when the relation started. Only available for some types of owners.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n'\n              },\n              type: {\n                $ref: '#/$defs/entity_type'\n              }\n            },\n            required: [              'id',\n              'legal_person',\n              'name',\n              'natural_person',\n              'nominal_share',\n              'percentage_share',\n              'relation_type',\n              'start',\n              'type'\n            ]\n          }\n        },\n        sources: {\n          type: 'array',\n          description: 'Sources of the company owners data.\\n',\n          items: {\n            type: 'object',\n            properties: {\n              document_url: {\n                type: 'string',\n                description: 'Url of the source document. In the form of a presigned url accessible for 30 minutes.\\n'\n              }\n            },\n            required: [              'document_url'\n            ]\n          }\n        }\n      },\n      required: [        'company_id',\n        'owners',\n        'sources'\n      ]\n    },\n    company_relation_type: {\n      type: 'string',\n      enum: [        'shareholder',\n        'stockholder',\n        'limited_partner',\n        'general_partner'\n      ]\n    },\n    entity_type: {\n      type: 'string',\n      enum: [        'natural_person',\n        'legal_person'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      export: {
        type: 'boolean',
        description:
          "Setting this to true will return the owners of the company if they exist\nbut will skip processing the documents in case they weren't processed yet.\n",
      },
      realtime: {
        type: 'boolean',
        description:
          'Get the most up-to-date company information directly from the Handelsregister.\nWhen set to true, we fetch the latest data in real-time from the official German commercial register, ensuring you receive the most current company details.\nNote: Real-time requests take longer but guarantee the freshest data available.\n',
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
    return asTextContentResult(
      await maybeFilter(jq_filter, await client.company.getOwnersV1(company_id, body)),
    );
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
