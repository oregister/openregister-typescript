// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'search',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/search/lookup',
  operationId: 'lookupCompanyWebsite',
};

export const tool: Tool = {
  name: 'lookup_company_by_url_search',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nFind company by website URL\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    company_id: {\n      type: 'string',\n      description: 'Unique company identifier.\\nExample: DE-HRB-F1103-267645\\n'\n    },\n    email: {\n      type: 'string',\n      description: 'Email address of the company.\\nExample: \"info@maxmustermann.de\"\\n'\n    },\n    phone: {\n      type: 'string',\n      description: 'Phone number of the company.\\nExample: \"+49 123 456 789\"\\n'\n    },\n    vat_id: {\n      type: 'string',\n      description: 'Value Added Tax identification number.\\nExample: \"DE123456789\"\\n'\n    }\n  },\n  required: [    'company_id'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'Website URL to search for.\nExample: "https://openregister.de"\n',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['url'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.search.lookupCompanyByURL(body)));
};

export default { metadata, tool, handler };
