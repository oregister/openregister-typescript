// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'person',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/person/{person_id}',
  operationId: 'getPerson',
};

export const tool: Tool = {
  name: 'retrieve_person',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet detailed person information\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string',\n      description: 'Unique person identifier.\\nExample: cc78ab54-d958-49b8-bae7-2f6c0c308837\\n'\n    },\n    age: {\n      type: 'integer',\n      description: 'Age of the person.\\n'\n    },\n    city: {\n      type: 'string',\n      description: 'City of the person.\\n'\n    },\n    date_of_birth: {\n      type: 'string',\n      description: 'Date of birth of the person.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"1990-01-01\"\\n',\n      format: 'date-time'\n    },\n    first_name: {\n      type: 'string',\n      description: 'First name of the person.\\n'\n    },\n    last_name: {\n      type: 'string',\n      description: 'Last name of the person.\\n'\n    },\n    management_positions: {\n      type: 'array',\n      description: 'Management positions of the person.\\n',\n      items: {\n        type: 'object',\n        description: 'All current and past management positions of the person.\\n',\n        properties: {\n          company_name: {\n            type: 'string',\n            description: 'Name of the company.\\nExample: \"Descartes Technologies GmbH\"\\n'\n          },\n          register_id: {\n            type: 'string',\n            description: 'Register ID of the company.\\nExample: DE-HRB-F1103-267645\\n'\n          },\n          role: {\n            type: 'string',\n            description: 'Role of the person in the company.\\nExample: \"DIRECTOR\"\\n'\n          },\n          end_date: {\n            type: 'string',\n            description: 'Date when the person ended the management position.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2023-01-01\"\\n',\n            format: 'date-time'\n          },\n          start_date: {\n            type: 'string',\n            description: 'Date when the person started the management position.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"2022-01-01\"\\n',\n            format: 'date-time'\n          }\n        },\n        required: [          'company_name',\n          'register_id',\n          'role'\n        ]\n      }\n    }\n  },\n  required: [    'id',\n    'age',\n    'city',\n    'date_of_birth',\n    'first_name',\n    'last_name',\n    'management_positions'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      person_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['person_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { person_id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.person.retrieve(person_id)));
};

export default { metadata, tool, handler };
