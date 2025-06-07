// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'company',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/company/{company_id}/contact',
  operationId: 'getContact',
};

export const tool: Tool = {
  name: 'retrieve_contact_company',
  description: 'Get company contact information',
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { company_id, ...body } = args as any;
  return asTextContentResult(await client.company.retrieveContact(company_id));
};

export default { metadata, tool, handler };
