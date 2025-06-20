// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'jobs.document',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/jobs/document/{id}',
  operationId: 'getDocumentJobStatus',
};

export const tool: Tool = {
  name: 'retrieve_jobs_document',
  description: 'Get document job status',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.jobs.document.retrieve(id));
};

export default { metadata, tool, handler };
