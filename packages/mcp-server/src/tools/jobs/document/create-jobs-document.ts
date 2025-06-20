// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import type { Metadata } from '../../';
import Openregister from 'openregister';

export const metadata: Metadata = {
  resource: 'jobs.document',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/v0/jobs/document',
  operationId: 'createDocumentJob',
};

export const tool: Tool = {
  name: 'create_jobs_document',
  description: 'Create a document job',
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
        description: 'Unique company identifier.\nExample: DE-HRB-F1103-267645\n',
      },
      document_category: {
        type: 'string',
        enum: [
          'current_printout',
          'chronological_printout',
          'historical_printout',
          'structured_information',
          'shareholder_list',
          'articles_of_association',
        ],
      },
    },
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.jobs.document.create(body));
};

export default { metadata, tool, handler };
