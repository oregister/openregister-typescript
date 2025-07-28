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
  httpPath: '/v1/company/{company_id}/owners',
  operationId: 'getOwners',
};

export const tool: Tool = {
  name: 'get_owners_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet company owners\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    company_id: {\n      type: 'string',\n      description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n    },\n    owners: {\n      type: 'array',\n      items: {\n        type: 'object',\n        properties: {\n          name: {\n            type: 'string',\n            description: 'The name of the shareholder. E.g. \"Max Mustermann\" or \"Max Mustermann GmbH\"'\n          },\n          nominal_share: {\n            type: 'number',\n            description: 'Nominal value of shares in Euro.\\nExample: 100\\n'\n          },\n          relation_type: {\n            $ref: '#/$defs/company_relation_type'\n          },\n          type: {\n            $ref: '#/$defs/entity_type'\n          },\n          id: {\n            type: 'string',\n            description: 'Unique identifier for the shareholder.\\nFor companies: Format matches company_id pattern\\nFor individuals: UUID\\nExample: \"DE-HRB-F1103-267645\" or UUID\\nMay be null for certain shareholders.\\n'\n          },\n          legal_person: {\n            type: 'object',\n            description: 'Details about the legal person.\\n',\n            properties: {\n              country: {\n                type: 'string',\n                description: 'Country where the owner is located, in ISO 3166-1 alpha-2 format.\\nExample: \"DE\" for Germany\\n'\n              },\n              name: {\n                type: 'string'\n              },\n              city: {\n                type: 'string'\n              }\n            },\n            required: [              'country',\n              'name'\n            ]\n          },\n          natural_person: {\n            type: 'object',\n            description: 'Details about the natural person.\\n',\n            properties: {\n              city: {\n                type: 'string'\n              },\n              country: {\n                type: 'string'\n              },\n              first_name: {\n                type: 'string'\n              },\n              full_name: {\n                type: 'string'\n              },\n              last_name: {\n                type: 'string'\n              },\n              date_of_birth: {\n                type: 'string'\n              }\n            },\n            required: [              'city',\n              'country',\n              'first_name',\n              'full_name',\n              'last_name'\n            ]\n          },\n          percentage_share: {\n            type: 'number',\n            description: 'Percentage of company ownership.\\nExample: 5.36 represents 5.36% ownership\\n'\n          },\n          start: {\n            type: 'string',\n            description: 'Date when the relation started. Only available for some types of owners.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n'\n          }\n        },\n        required: [          'name',\n          'nominal_share',\n          'relation_type',\n          'type'\n        ]\n      }\n    }\n  },\n  required: [    'company_id',\n    'owners'\n  ],\n  $defs: {\n    company_relation_type: {\n      type: 'string',\n      enum: [        'shareholder',\n        'stockholder',\n        'limited_partner',\n        'general_partner'\n      ]\n    },\n    entity_type: {\n      type: 'string',\n      enum: [        'natural_person',\n        'legal_person'\n      ]\n    }\n  }\n}\n```",
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
  return asTextContentResult(await maybeFilter(args, await client.company.getOwners(company_id)));
};

export default { metadata, tool, handler };
