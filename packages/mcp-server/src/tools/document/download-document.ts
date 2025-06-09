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
  httpPath: '/v0/document/{document_id}/download',
  operationId: 'downloadDocument',
};

export const tool: Tool = {
  name: 'download_document',
  description: 'Download document',
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
  return asBinaryContentResult(await client.document.download(document_id));
};

export default { metadata, tool, handler };
