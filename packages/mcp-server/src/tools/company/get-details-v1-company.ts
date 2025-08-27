// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'company',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v1/company/{company_id}',
  operationId: 'getCompanyV1',
};

export const tool: Tool = {
  name: 'get_details_v1_company',
  description: 'Get detailed company information',
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      realtime: {
        type: 'boolean',
        description:
          'Get the most up-to-date company information directly from the Handelsregister.\nWhen set to true, we fetch the latest data in real-time from the official German commercial register,\nensuring you receive the most current company details.\nNote: Real-time requests take longer but guarantee the freshest data available.\n',
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
  return asTextContentResult(await client.company.getDetailsV1(company_id, body));
};

export default { metadata, tool, handler };
