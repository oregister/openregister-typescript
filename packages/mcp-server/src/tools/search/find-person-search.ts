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
  httpPath: '/v1/search/person',
  operationId: 'personFilterSearch',
};

export const tool: Tool = {
  name: 'find_person_search',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSearch for people\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    pagination: {\n      type: 'object',\n      properties: {\n        page: {\n          type: 'integer',\n          description: 'Current page number.'\n        },\n        per_page: {\n          type: 'integer',\n          description: 'Number of results per page.'\n        },\n        total_pages: {\n          type: 'integer',\n          description: 'Total number of pages.'\n        },\n        total_results: {\n          type: 'integer',\n          description: 'Total number of results.'\n        }\n      },\n      required: [        'page',\n        'per_page',\n        'total_pages',\n        'total_results'\n      ]\n    },\n    results: {\n      type: 'array',\n      description: 'List of people matching the search criteria.\\n',\n      items: {\n        type: 'object',\n        properties: {\n          id: {\n            type: 'string',\n            description: 'Unique person identifier.\\nExample: 1234-5678-9012-345678901234\\n'\n          },\n          active: {\n            type: 'boolean',\n            description: 'Person status - true if active, false if inactive.\\n'\n          },\n          city: {\n            type: 'string',\n            description: 'City of the person.\\nExample: \"Berlin\"\\n'\n          },\n          date_of_birth: {\n            type: 'string',\n            description: 'Date of birth of the person.\\nFormat: ISO 8601 (YYYY-MM-DD)\\nExample: \"1990-01-01\"\\n'\n          },\n          name: {\n            type: 'string',\n            description: 'Name of the person.\\nExample: \"Max Mustermann\"\\n'\n          }\n        },\n        required: [          'id',\n          'active',\n          'city',\n          'date_of_birth',\n          'name'\n        ]\n      }\n    }\n  },\n  required: [    'pagination',\n    'results'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      filters: {
        type: 'array',
        description: 'Filters to filter people.\n',
        items: {
          type: 'object',
          properties: {
            field: {
              type: 'string',
              enum: ['date_of_birth', 'city', 'active'],
            },
            keywords: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            max: {
              type: 'string',
            },
            min: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
            values: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
          required: ['field'],
        },
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
        description: 'Search query to filter people.\n',
        properties: {
          value: {
            type: 'string',
            description: 'Search query to filter people.\n',
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
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.search.findPerson(body)));
};

export default { metadata, tool, handler };
