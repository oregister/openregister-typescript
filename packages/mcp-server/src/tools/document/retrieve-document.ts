// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asBinaryContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'document',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/v0/document/{document_id}',
  operationId: 'getDocument',
};

export const tool: Tool = {
  name: 'retrieve_document',
  description: 'Get document information',
  inputSchema: {
    type: 'object',
    properties: {
      document_id: {
        type: 'string',
      },
    },
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { document_id, ...body } = args as any;
  return asBinaryContentResult(await client.document.retrieve(document_id));
};

export default { metadata, tool, handler };
