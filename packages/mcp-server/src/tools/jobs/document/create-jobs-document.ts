// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nCreate a document job\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string',\n      description: 'Unique job identifier.\\nExample: f47ac10b-58cc-4372-a567-0e02b2c3d479\\n'\n    }\n  },\n  required: [    'id'\n  ]\n}\n```",
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['company_id', 'document_category'],
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await maybeFilter(args, await client.jobs.document.create(body)));
};

export default { metadata, tool, handler };
