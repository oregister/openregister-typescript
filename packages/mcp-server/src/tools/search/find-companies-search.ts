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
  httpPath: '/v0/search/company',
  operationId: 'companySearch',
};

export const tool: Tool = {
  name: 'find_companies_search',
  description: 'Search for companies',
  inputSchema: {
    type: 'object',
    properties: {
      active: {
        type: 'boolean',
        description:
          'Filter for active or inactive companies.\nSet to true for active companies only, false for inactive only.\n',
      },
      legal_form: {
        $ref: '#/$defs/company_legal_form',
      },
      query: {
        type: 'string',
        description: 'Text search query to find companies by name.\nExample: "Descartes Technologies UG"\n',
      },
      register_court: {
        type: 'string',
        description: 'Court where the company is registered.\nExample: "Berlin (Charlottenburg)"\n',
      },
      register_number: {
        type: 'string',
        description: 'Company register number for exact matching.\nExample: "230633"\n',
      },
      register_type: {
        $ref: '#/$defs/company_register_type',
      },
    },
    $defs: {
      company_legal_form: {
        type: 'string',
        description:
          'Legal form of the company.\nCommon German legal forms:\n- gmbh: Gesellschaft mit beschränkter Haftung (Limited Liability Company)\n- ag: Aktiengesellschaft (Stock Corporation)\n- ug: Unternehmergesellschaft (Entrepreneurial Company with limited liability)\n- ohg: Offene Handelsgesellschaft (General Partnership)\n- kg: Kommanditgesellschaft (Limited Partnership)\n- ev: Eingetragener Verein (Registered Association)',
        enum: [
          'ag',
          'eg',
          'ek',
          'ev',
          'ewiv',
          'foreign',
          'gbr',
          'ggmbh',
          'gmbh',
          'kg',
          'kgaa',
          'unknown',
          'llp',
          'municipal',
          'ohg',
          'se',
          'ug',
        ],
      },
      company_register_type: {
        type: 'string',
        description:
          'Type of company register where the entity is recorded.\nCommon types:\n- HRB: Commercial Register B (limited liability companies, stock corporations)\n- HRA: Commercial Register A (partnerships, sole proprietorships)\n- PR: Partnership Register\n- GnR: Cooperative Register\n- VR: Association Register',
        enum: ['HRB', 'HRA', 'PR', 'GnR', 'VR'],
      },
    },
  },
};

export const handler = async (client: Openregister, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  return asTextContentResult(await client.search.findCompanies(body));
};

export default { metadata, tool, handler };
