// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'openregister-mcp/filtering';
import { Metadata, asTextContentResult } from 'openregister-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
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
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet company contact information\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    source_url: {\n      type: 'string',\n      description: 'Where the contact information was found.\\nExample: \"https://openregister.de\"\\n'\n    },\n    email: {\n      type: 'string',\n      description: 'Company contact email address.\\nExample: \"founders@openregister.de\"\\n'\n    },\n    phone: {\n      type: 'string',\n      description: 'Company phone number.\\nExample: \"+49 030 12345678\"\\n'\n    },\n    vat_id: {\n      type: 'string',\n      description: 'Value Added Tax identification number. (Umsatzsteuer-Identifikationsnummer)\\nExample: \"DE370146530\"\\n'\n    }\n  },\n  required: [    'source_url'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      company_id: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['company_id'],
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const { company_id, ...body } = args as any;
  return asTextContentResult(await maybeFilter(args, await client.company.retrieveContact(company_id)));
};

export default { metadata, tool, handler };
