// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'company',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/company/{company_id}',
  operationId: 'getCompany',
};

export const tool: Tool = {
  name: 'retrieve_company',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet detailed company information",
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      documents: {
        type: 'boolean',
        description:
          'Include document metadata when set to true.\nLists available official documents related to the company.\n',
      },
      financials: {
        type: 'boolean',
        description:
          'Include financial data when set to true.\nProvides access to financial reports and key financial indicators.\n',
      },
      history: {
        type: 'boolean',
        description:
          'Include historical company data when set to true.\nThis returns past names, addresses, and other changed information.\n',
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
  return asTextContentResult(await client.company.retrieve(company_id, body));
};

export default { metadata, tool, handler };
