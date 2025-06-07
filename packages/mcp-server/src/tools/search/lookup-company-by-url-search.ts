// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
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
  description: 'Find company by website URL',
  inputSchema: {
    type: 'object',
    properties: {
      url: {
        type: 'string',
        description: 'Website URL to search for.\nExample: "https://openregister.de"\n',
      },
    },
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.search.lookupCompanyByURL(body));
};

export default { metadata, tool, handler };
