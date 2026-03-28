// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'autocomplete_companies_v1',
    endpoint: '/v1/autocomplete/company',
    httpMethod: 'get',
    summary: 'Autocomplete company search',
    description: 'Autocomplete company search',
    stainlessPath: '(resource) search > (method) autocomplete_companies_v1',
    qualified: 'client.search.autocompleteCompaniesV1',
    params: ['query: string;'],
    response:
      '{ results: { active: boolean; company_id: string; country: string; legal_form: company_legal_form; name: string; register_court: string; register_number: string; register_type: company_register_type; }[]; }',
    markdown:
      "## autocomplete_companies_v1\n\n`client.search.autocompleteCompaniesV1(query: string): { results: company_search_response_item[]; }`\n\n**get** `/v1/autocomplete/company`\n\nAutocomplete company search\n\n### Parameters\n\n- `query: string`\n  Text search query to find companies by name.\nExample: \"Descartes Technologies UG\"\n\n\n### Returns\n\n- `{ results: { active: boolean; company_id: string; country: string; legal_form: company_legal_form; name: string; register_court: string; register_number: string; register_type: company_register_type; }[]; }`\n\n  - `results: { active: boolean; company_id: string; country: string; legal_form: string; name: string; register_court: string; register_number: string; register_type: 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR'; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.search.autocompleteCompaniesV1({ query: 'query' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'find_companies_v1',
    endpoint: '/v1/search/company',
    httpMethod: 'post',
    summary: 'Search for companies',
    description: 'Search for companies',
    stainlessPath: '(resource) search > (method) find_companies_v1',
    qualified: 'client.search.findCompaniesV1',
    params: [
      'filters?: { keywords?: string[]; max?: string; min?: string; value?: string; values?: string[]; }[];',
      'location?: { latitude: number; longitude: number; radius?: number; };',
      'pagination?: { page?: number; per_page?: number; };',
      'query?: { value: string; };',
    ],
    response:
      '{ pagination: { page: number; per_page: number; total_pages: number; total_results: number; }; results: { active: boolean; company_id: string; country: string; legal_form: company_legal_form; name: string; register_court: string; register_number: string; register_type: company_register_type; }[]; }',
    markdown:
      "## find_companies_v1\n\n`client.search.findCompaniesV1(filters?: { keywords?: string[]; max?: string; min?: string; value?: string; values?: string[]; }[], location?: { latitude: number; longitude: number; radius?: number; }, pagination?: { page?: number; per_page?: number; }, query?: { value: string; }): { pagination: pagination; results: company_search_response_item[]; }`\n\n**post** `/v1/search/company`\n\nSearch for companies\n\n### Parameters\n\n- `filters?: { keywords?: string[]; max?: string; min?: string; value?: string; values?: string[]; }[]`\n  Filters to filter companies.\n\n\n- `location?: { latitude: number; longitude: number; radius?: number; }`\n  Location to filter companies.\n\n  - `latitude: number`\n    Latitude to filter on.\n\n  - `longitude: number`\n    Longitude to filter on.\n\n  - `radius?: number`\n    Radius in kilometers to filter on.\nExample: 10\n\n\n- `pagination?: { page?: number; per_page?: number; }`\n  Pagination parameters.\n\n  - `page?: number`\n    Page number to return.\n\n  - `per_page?: number`\n    Number of results per page.\n\n\n- `query?: { value: string; }`\n  Search query to filter companies.\n\n  - `value: string`\n    Search query to filter companies.\n\n\n### Returns\n\n- `{ pagination: { page: number; per_page: number; total_pages: number; total_results: number; }; results: { active: boolean; company_id: string; country: string; legal_form: company_legal_form; name: string; register_court: string; register_number: string; register_type: company_register_type; }[]; }`\n\n  - `pagination: { page: number; per_page: number; total_pages: number; total_results: number; }`\n  - `results: { active: boolean; company_id: string; country: string; legal_form: string; name: string; register_court: string; register_number: string; register_type: 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR'; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst companySearch = await client.search.findCompaniesV1();\n\nconsole.log(companySearch);\n```",
  },
  {
    name: 'find_person_v1',
    endpoint: '/v1/search/person',
    httpMethod: 'post',
    summary: 'Search for people',
    description: 'Search for people',
    stainlessPath: '(resource) search > (method) find_person_v1',
    qualified: 'client.search.findPersonV1',
    params: [
      'filters?: { keywords?: string[]; max?: string; min?: string; value?: string; values?: string[]; }[];',
      'pagination?: { page?: number; per_page?: number; };',
      'query?: { value: string; };',
    ],
    response:
      '{ pagination: { page: number; per_page: number; total_pages: number; total_results: number; }; results: { id: string; active: boolean; city: string; date_of_birth: string; name: string; }[]; }',
    markdown:
      "## find_person_v1\n\n`client.search.findPersonV1(filters?: { keywords?: string[]; max?: string; min?: string; value?: string; values?: string[]; }[], pagination?: { page?: number; per_page?: number; }, query?: { value: string; }): { pagination: pagination; results: object[]; }`\n\n**post** `/v1/search/person`\n\nSearch for people\n\n### Parameters\n\n- `filters?: { keywords?: string[]; max?: string; min?: string; value?: string; values?: string[]; }[]`\n  Filters to filter people.\n\n\n- `pagination?: { page?: number; per_page?: number; }`\n  Pagination parameters.\n\n  - `page?: number`\n    Page number to return.\n\n  - `per_page?: number`\n    Number of results per page.\n\n\n- `query?: { value: string; }`\n  Search query to filter people.\n\n  - `value: string`\n    Search query to filter people.\n\n\n### Returns\n\n- `{ pagination: { page: number; per_page: number; total_pages: number; total_results: number; }; results: { id: string; active: boolean; city: string; date_of_birth: string; name: string; }[]; }`\n\n  - `pagination: { page: number; per_page: number; total_pages: number; total_results: number; }`\n  - `results: { id: string; active: boolean; city: string; date_of_birth: string; name: string; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.search.findPersonV1();\n\nconsole.log(response);\n```",
  },
  {
    name: 'lookup_company_by_url',
    endpoint: '/v0/search/lookup',
    httpMethod: 'get',
    summary: 'Find company by website URL',
    description: 'Find company by website URL',
    stainlessPath: '(resource) search > (method) lookup_company_by_url',
    qualified: 'client.search.lookupCompanyByURL',
    params: ['url: string;'],
    response: '{ company_id: string; email?: string; phone?: string; vat_id?: string; }',
    markdown:
      "## lookup_company_by_url\n\n`client.search.lookupCompanyByURL(url: string): { company_id: string; email?: string; phone?: string; vat_id?: string; }`\n\n**get** `/v0/search/lookup`\n\nFind company by website URL\n\n### Parameters\n\n- `url: string`\n  Website URL to search for.\nExample: \"https://openregister.de\"\n\n\n### Returns\n\n- `{ company_id: string; email?: string; phone?: string; vat_id?: string; }`\n\n  - `company_id: string`\n  - `email?: string`\n  - `phone?: string`\n  - `vat_id?: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.search.lookupCompanyByURL({ url: 'https://example.com' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_contact_v0',
    endpoint: '/v0/company/{company_id}/contact',
    httpMethod: 'get',
    summary: 'Get company contact information',
    description: 'Get company contact information',
    stainlessPath: '(resource) company > (method) get_contact_v0',
    qualified: 'client.company.getContactV0',
    params: ['company_id: string;'],
    response: '{ source_url: string; email?: string; phone?: string; vat_id?: string; }',
    markdown:
      "## get_contact_v0\n\n`client.company.getContactV0(company_id: string): { source_url: string; email?: string; phone?: string; vat_id?: string; }`\n\n**get** `/v0/company/{company_id}/contact`\n\nGet company contact information\n\n### Parameters\n\n- `company_id: string`\n\n### Returns\n\n- `{ source_url: string; email?: string; phone?: string; vat_id?: string; }`\n\n  - `source_url: string`\n  - `email?: string`\n  - `phone?: string`\n  - `vat_id?: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getContactV0('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_details_v1',
    endpoint: '/v1/company/{company_id}',
    httpMethod: 'get',
    summary: 'Get detailed company information',
    description: 'Get detailed company information',
    stainlessPath: '(resource) company > (method) get_details_v1',
    qualified: 'client.company.getDetailsV1',
    params: ['company_id: string;', 'export?: boolean;', 'realtime?: boolean;'],
    response:
      "{ id: string; address: object; addresses: object[]; capital: object; capitals: object[]; contact: { social_media: object; website_url: string; email?: string; phone?: string; vat_id?: string; }; documents: object[]; incorporated_at: string; indicators: { balance_sheet_total: number; capital_reserves: number; cash: number; date: string; employees: number; equity: number; liabilities: number; materials: number; net_income: number; pension_provisions: number; real_estate: number; report_id: string; revenue: number; salaries: number; taxes: number; }[]; industry_codes: { WZ2025: object[]; }; legal_form: string; name: object; names: object[]; purpose: object; purposes: object[]; register: object; registers: object[]; representation: { id: string; end_date: string; name: string; role: representation_role; start_date: string; type: entity_type; legal_person?: object; natural_person?: object; }[]; sources: object[]; status: 'active' | 'inactive' | 'liquidation'; terminated_at: string; }",
    markdown:
      "## get_details_v1\n\n`client.company.getDetailsV1(company_id: string, export?: boolean, realtime?: boolean): { id: string; address: company_address; addresses: company_address[]; capital: company_capital; capitals: company_capital[]; contact: object; documents: company_document[]; incorporated_at: string; indicators: object[]; industry_codes: object; legal_form: company_legal_form; name: company_name; names: company_name[]; purpose: company_purpose; purposes: company_purpose[]; register: company_register; registers: company_register[]; representation: object[]; sources: source[]; status: 'active' | 'inactive' | 'liquidation'; terminated_at: string; }`\n\n**get** `/v1/company/{company_id}`\n\nGet detailed company information\n\n### Parameters\n\n- `company_id: string`\n\n- `export?: boolean`\n  Setting this to true will return the company without sources.\n\n\n- `realtime?: boolean`\n  Get the most up-to-date company information directly from the Handelsregister.\nWhen set to true, we fetch the latest data in real-time from the official German commercial register, ensuring you receive the most current company details.\nNote: Real-time requests take longer but guarantee the freshest data available.\n\n\n### Returns\n\n- `{ id: string; address: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }; addresses: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }[]; capital: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }; capitals: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }[]; contact: { social_media: { facebook?: string; github?: string; instagram?: string; linkedin?: string; tiktok?: string; twitter?: string; xing?: string; youtube?: string; }; website_url: string; email?: string; phone?: string; vat_id?: string; }; documents: { id: string; date: string; latest: boolean; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; }[]; incorporated_at: string; indicators: { balance_sheet_total: number; capital_reserves: number; cash: number; date: string; employees: number; equity: number; liabilities: number; materials: number; net_income: number; pension_provisions: number; real_estate: number; report_id: string; revenue: number; salaries: number; taxes: number; }[]; industry_codes: { WZ2025: { code: string; }[]; }; legal_form: string; name: { legal_form: company_legal_form; name: string; start_date: string; }; names: { legal_form: company_legal_form; name: string; start_date: string; }[]; purpose: { purpose: string; start_date: string; }; purposes: { purpose: string; start_date: string; }[]; register: { register_court: string; register_number: string; register_type: company_register_type; company_id?: string; start_date?: string; }; registers: { register_court: string; register_number: string; register_type: company_register_type; company_id?: string; start_date?: string; }[]; representation: { id: string; end_date: string; name: string; role: string; start_date: string; type: 'natural_person' | 'legal_person'; legal_person?: { city: string; country: string; name: string; }; natural_person?: { city: string; date_of_birth: string; first_name: string; last_name: string; }; }[]; sources: { document_url: string; }[]; status: 'active' | 'inactive' | 'liquidation'; terminated_at: string; }`\n\n  - `id: string`\n  - `address: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }`\n  - `addresses: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }[]`\n  - `capital: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }`\n  - `capitals: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }[]`\n  - `contact: { social_media: { facebook?: string; github?: string; instagram?: string; linkedin?: string; tiktok?: string; twitter?: string; xing?: string; youtube?: string; }; website_url: string; email?: string; phone?: string; vat_id?: string; }`\n  - `documents: { id: string; date: string; latest: boolean; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; }[]`\n  - `incorporated_at: string`\n  - `indicators: { balance_sheet_total: number; capital_reserves: number; cash: number; date: string; employees: number; equity: number; liabilities: number; materials: number; net_income: number; pension_provisions: number; real_estate: number; report_id: string; revenue: number; salaries: number; taxes: number; }[]`\n  - `industry_codes: { WZ2025: { code: string; }[]; }`\n  - `legal_form: string`\n  - `name: { legal_form: string; name: string; start_date: string; }`\n  - `names: { legal_form: string; name: string; start_date: string; }[]`\n  - `purpose: { purpose: string; start_date: string; }`\n  - `purposes: { purpose: string; start_date: string; }[]`\n  - `register: { register_court: string; register_number: string; register_type: 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR'; company_id?: string; start_date?: string; }`\n  - `registers: { register_court: string; register_number: string; register_type: 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR'; company_id?: string; start_date?: string; }[]`\n  - `representation: { id: string; end_date: string; name: string; role: string; start_date: string; type: 'natural_person' | 'legal_person'; legal_person?: { city: string; country: string; name: string; }; natural_person?: { city: string; date_of_birth: string; first_name: string; last_name: string; }; }[]`\n  - `sources: { document_url: string; }[]`\n  - `status: 'active' | 'inactive' | 'liquidation'`\n  - `terminated_at: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getDetailsV1('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_financials_v1',
    endpoint: '/v1/company/{company_id}/financials',
    httpMethod: 'get',
    summary: 'Get financial reports',
    description: 'Get financial reports',
    stainlessPath: '(resource) company > (method) get_financials_v1',
    qualified: 'client.company.getFinancialsV1',
    params: ['company_id: string;'],
    response:
      '{ merged: { aktiva: object; passiva: object; guv?: object; }; reports: { aktiva: object; consolidated: boolean; passiva: object; report_end_date: string; report_id: string; report_start_date: string; guv?: object; }[]; }',
    markdown:
      "## get_financials_v1\n\n`client.company.getFinancialsV1(company_id: string): { merged: object; reports: object[]; }`\n\n**get** `/v1/company/{company_id}/financials`\n\nGet financial reports\n\n### Parameters\n\n- `company_id: string`\n\n### Returns\n\n- `{ merged: { aktiva: object; passiva: object; guv?: object; }; reports: { aktiva: object; consolidated: boolean; passiva: object; report_end_date: string; report_id: string; report_start_date: string; guv?: object; }[]; }`\n\n  - `merged: { aktiva: { rows: object[]; }; passiva: { rows: object[]; }; guv?: { rows: object[]; }; }`\n  - `reports: { aktiva: { rows: object[]; }; consolidated: boolean; passiva: { rows: object[]; }; report_end_date: string; report_id: string; report_start_date: string; guv?: { rows: object[]; }; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getFinancialsV1('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_historical_owners_v1',
    endpoint: '/v1/company/{company_id}/owners/historical',
    httpMethod: 'get',
    summary: 'Get historical owner changes',
    description: 'Get historical owner changes',
    stainlessPath: '(resource) company > (method) get_historical_owners_v1',
    qualified: 'client.company.getHistoricalOwnersV1',
    params: ['company_id: string;'],
    response:
      "{ owners: { id: string; entity_type: string; first_appearance: string; name: string; ownership_history: { document_date: string; document_id: string; nominal_shares: number; percentage_shares: number; }[]; status: 'active' | 'removed'; country?: string; last_appearance?: string; }[]; }",
    markdown:
      "## get_historical_owners_v1\n\n`client.company.getHistoricalOwnersV1(company_id: string): { owners: object[]; }`\n\n**get** `/v1/company/{company_id}/owners/historical`\n\nGet historical owner changes\n\n### Parameters\n\n- `company_id: string`\n\n### Returns\n\n- `{ owners: { id: string; entity_type: string; first_appearance: string; name: string; ownership_history: { document_date: string; document_id: string; nominal_shares: number; percentage_shares: number; }[]; status: 'active' | 'removed'; country?: string; last_appearance?: string; }[]; }`\n\n  - `owners: { id: string; entity_type: string; first_appearance: string; name: string; ownership_history: { document_date: string; document_id: string; nominal_shares: number; percentage_shares: number; }[]; status: 'active' | 'removed'; country?: string; last_appearance?: string; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getHistoricalOwnersV1('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_holdings_v1',
    endpoint: '/v1/company/{company_id}/holdings',
    httpMethod: 'get',
    summary: 'Get company holdings',
    description: 'Get company holdings',
    stainlessPath: '(resource) company > (method) get_holdings_v1',
    qualified: 'client.company.getHoldingsV1',
    params: ['company_id: string;'],
    response:
      "{ company_id: string; holdings: { company_id: string; end: string; name: string; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; }[]; }",
    markdown:
      "## get_holdings_v1\n\n`client.company.getHoldingsV1(company_id: string): { company_id: string; holdings: object[]; }`\n\n**get** `/v1/company/{company_id}/holdings`\n\nGet company holdings\n\n### Parameters\n\n- `company_id: string`\n\n### Returns\n\n- `{ company_id: string; holdings: { company_id: string; end: string; name: string; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; }[]; }`\n  Companies this entity owns or has invested in.\n\n\n  - `company_id: string`\n  - `holdings: { company_id: string; end: string; name: string; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getHoldingsV1('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_owners_v1',
    endpoint: '/v1/company/{company_id}/owners',
    httpMethod: 'get',
    summary: 'Get company owners',
    description: 'Get company owners',
    stainlessPath: '(resource) company > (method) get_owners_v1',
    qualified: 'client.company.getOwnersV1',
    params: ['company_id: string;', 'export?: boolean;', 'realtime?: boolean;'],
    response:
      "{ company_id: string; owners: { id: string; legal_person: object; name: string; natural_person: object; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; type: 'natural_person' | 'legal_person'; }[]; sources: { document_url: string; }[]; }",
    markdown:
      "## get_owners_v1\n\n`client.company.getOwnersV1(company_id: string, export?: boolean, realtime?: boolean): { company_id: string; owners: object[]; sources: source[]; }`\n\n**get** `/v1/company/{company_id}/owners`\n\nGet company owners\n\n### Parameters\n\n- `company_id: string`\n\n- `export?: boolean`\n  Setting this to true will return the owners of the company if they exist\nbut will skip processing the documents in case they weren't processed yet.\n\n\n- `realtime?: boolean`\n  Get the most up-to-date company information directly from the Handelsregister.\nWhen set to true, we fetch the latest data in real-time from the official German commercial register, ensuring you receive the most current company details.\nNote: Real-time requests take longer but guarantee the freshest data available.\n\n\n### Returns\n\n- `{ company_id: string; owners: { id: string; legal_person: object; name: string; natural_person: object; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; type: 'natural_person' | 'legal_person'; }[]; sources: { document_url: string; }[]; }`\n\n  - `company_id: string`\n  - `owners: { id: string; legal_person: { city: string; country: string; name: string; }; name: string; natural_person: { city: string; country: string; date_of_birth: string; first_name: string; full_name: string; last_name: string; }; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; type: 'natural_person' | 'legal_person'; }[]`\n  - `sources: { document_url: string; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getOwnersV1('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_ubos_v1',
    endpoint: '/v1/company/{company_id}/ubo',
    httpMethod: 'get',
    summary: 'Get company end owners',
    description: 'Get company end owners',
    stainlessPath: '(resource) company > (method) get_ubos_v1',
    qualified: 'client.company.getUbosV1',
    params: ['company_id: string;'],
    response:
      '{ company_id: string; ubos: { id: string; legal_person: object; max_percentage_share: number; name: string; natural_person: object; percentage_share: number; }[]; }',
    markdown:
      "## get_ubos_v1\n\n`client.company.getUbosV1(company_id: string): { company_id: string; ubos: object[]; }`\n\n**get** `/v1/company/{company_id}/ubo`\n\nGet company end owners\n\n### Parameters\n\n- `company_id: string`\n\n### Returns\n\n- `{ company_id: string; ubos: { id: string; legal_person: object; max_percentage_share: number; name: string; natural_person: object; percentage_share: number; }[]; }`\n\n  - `company_id: string`\n  - `ubos: { id: string; legal_person: { city: string; country: string; name: string; }; max_percentage_share: number; name: string; natural_person: { city: string; country: string; date_of_birth: string; first_name: string; full_name: string; last_name: string; }; percentage_share: number; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getUbosV1('company_id');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_cached_v1',
    endpoint: '/v1/document/{document_id}',
    httpMethod: 'get',
    summary: 'Get document information',
    description: 'Get document information',
    stainlessPath: '(resource) document > (method) get_cached_v1',
    qualified: 'client.document.getCachedV1',
    params: ['document_id: string;'],
    response:
      "{ id: string; date: string; name: string; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; url: string; }",
    markdown:
      "## get_cached_v1\n\n`client.document.getCachedV1(document_id: string): { id: string; date: string; name: string; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; url: string; }`\n\n**get** `/v1/document/{document_id}`\n\nGet document information\n\n### Parameters\n\n- `document_id: string`\n\n### Returns\n\n- `{ id: string; date: string; name: string; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; url: string; }`\n\n  - `id: string`\n  - `date: string`\n  - `name: string`\n  - `type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst document = await client.document.getCachedV1('document_id');\n\nconsole.log(document);\n```",
  },
  {
    name: 'get_realtime_v1',
    endpoint: '/v1/document',
    httpMethod: 'get',
    summary: 'Fetch a document in realtime.',
    description: 'Fetch a document in realtime.',
    stainlessPath: '(resource) document > (method) get_realtime_v1',
    qualified: 'client.document.getRealtimeV1',
    params: ['company_id: string;', 'document_category: string;'],
    response: '{ category: string; file_date: string; file_name: string; url: string; }',
    markdown:
      "## get_realtime_v1\n\n`client.document.getRealtimeV1(company_id: string, document_category: string): { category: string; file_date: string; file_name: string; url: string; }`\n\n**get** `/v1/document`\n\nFetch a document in realtime.\n\n### Parameters\n\n- `company_id: string`\n\n- `document_category: string`\n\n### Returns\n\n- `{ category: string; file_date: string; file_name: string; url: string; }`\n\n  - `category: string`\n  - `file_date: string`\n  - `file_name: string`\n  - `url: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.document.getRealtimeV1({ company_id: 'company_id', document_category: 'current_printout' });\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_details_v1',
    endpoint: '/v1/person/{person_id}',
    httpMethod: 'get',
    summary: 'Get detailed person information',
    description: 'Get detailed person information',
    stainlessPath: '(resource) person > (method) get_details_v1',
    qualified: 'client.person.getDetailsV1',
    params: ['person_id: string;'],
    response:
      '{ id: string; age: number; city: string; date_of_birth: string; first_name: string; last_name: string; management_positions: { company_name: string; register_id: string; role: string; start_date: string; end_date?: string; }[]; }',
    markdown:
      "## get_details_v1\n\n`client.person.getDetailsV1(person_id: string): { id: string; age: number; city: string; date_of_birth: string; first_name: string; last_name: string; management_positions: object[]; }`\n\n**get** `/v1/person/{person_id}`\n\nGet detailed person information\n\n### Parameters\n\n- `person_id: string`\n\n### Returns\n\n- `{ id: string; age: number; city: string; date_of_birth: string; first_name: string; last_name: string; management_positions: { company_name: string; register_id: string; role: string; start_date: string; end_date?: string; }[]; }`\n\n  - `id: string`\n  - `age: number`\n  - `city: string`\n  - `date_of_birth: string`\n  - `first_name: string`\n  - `last_name: string`\n  - `management_positions: { company_name: string; register_id: string; role: string; start_date: string; end_date?: string; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.person.getDetailsV1('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'get_holdings_v1',
    endpoint: '/v1/person/{person_id}/holdings',
    httpMethod: 'get',
    summary: 'Get person holdings',
    description: 'Get person holdings',
    stainlessPath: '(resource) person > (method) get_holdings_v1',
    qualified: 'client.person.getHoldingsV1',
    params: ['person_id: string;'],
    response:
      "{ holdings: { company_id: string; end: string; name: string; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; }[]; person_id: string; }",
    markdown:
      "## get_holdings_v1\n\n`client.person.getHoldingsV1(person_id: string): { holdings: object[]; person_id: string; }`\n\n**get** `/v1/person/{person_id}/holdings`\n\nGet person holdings\n\n### Parameters\n\n- `person_id: string`\n\n### Returns\n\n- `{ holdings: { company_id: string; end: string; name: string; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; }[]; person_id: string; }`\n  Companies this entity owns or has invested in.\n\n\n  - `holdings: { company_id: string; end: string; name: string; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; }[]`\n  - `person_id: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.person.getHoldingsV1('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/monitor',
    httpMethod: 'post',
    summary: 'Create webhook monitor item',
    description: 'Create webhook monitor item',
    stainlessPath: '(resource) monitor > (method) create',
    qualified: 'client.monitor.create',
    params: ['entity_id: string;', "entity_type: 'company' | 'person';", 'preferences: string[];'],
    response:
      "{ disabled: boolean; entity_id: string; entity_type: 'company' | 'person'; preferences: string[]; }",
    markdown:
      "## create\n\n`client.monitor.create(entity_id: string, entity_type: 'company' | 'person', preferences: string[]): { disabled: boolean; entity_id: string; entity_type: 'company' | 'person'; preferences: string[]; }`\n\n**post** `/v1/monitor`\n\nCreate webhook monitor item\n\n### Parameters\n\n- `entity_id: string`\n  For `company` this is the register ID (e.g. `DE-HRB-F1103-267645`).\nFor `person` this is the person UUID.\n\n\n- `entity_type: 'company' | 'person'`\n  Type of the entity to monitor.\n\n- `preferences: string[]`\n  Preferences for the entity to monitor.\nUse `WebhookMonitorCompanyPreference` values when `entity_type` is `company`,\nand `WebhookMonitorPersonPreference` values when `entity_type` is `person`.\n\n\n### Returns\n\n- `{ disabled: boolean; entity_id: string; entity_type: 'company' | 'person'; preferences: string[]; }`\n\n  - `disabled: boolean`\n  - `entity_id: string`\n  - `entity_type: 'company' | 'person'`\n  - `preferences: string[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst monitor = await client.monitor.create({\n  entity_id: 'entity_id',\n  entity_type: 'company',\n  preferences: ['basic'],\n});\n\nconsole.log(monitor);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/monitor',
    httpMethod: 'get',
    summary: 'List webhook monitor items',
    description: 'List webhook monitor items',
    stainlessPath: '(resource) monitor > (method) list',
    qualified: 'client.monitor.list',
    response:
      "{ items: { disabled: boolean; entity_id: string; entity_type: 'company' | 'person'; preferences: string[]; }[]; }",
    markdown:
      "## list\n\n`client.monitor.list(): { items: object[]; }`\n\n**get** `/v1/monitor`\n\nList webhook monitor items\n\n### Returns\n\n- `{ items: { disabled: boolean; entity_id: string; entity_type: 'company' | 'person'; preferences: string[]; }[]; }`\n\n  - `items: { disabled: boolean; entity_id: string; entity_type: 'company' | 'person'; preferences: string[]; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst monitors = await client.monitor.list();\n\nconsole.log(monitors);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/monitor/{entity_id}',
    httpMethod: 'delete',
    summary: 'Delete webhook monitor item',
    description: 'Delete webhook monitor item',
    stainlessPath: '(resource) monitor > (method) delete',
    qualified: 'client.monitor.delete',
    params: ['entity_id: string;'],
    markdown:
      "## delete\n\n`client.monitor.delete(entity_id: string): void`\n\n**delete** `/v1/monitor/{entity_id}`\n\nDelete webhook monitor item\n\n### Parameters\n\n- `entity_id: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nawait client.monitor.delete('entity_id')\n```",
  },
];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
    boost: {
      name: 3,
      endpoint: 2,
      summary: 2,
      qualified: 2,
      content: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  // Note: Language is accepted for interface consistency with remote search, but currently has no
  // effect since this local search only supports TypeScript docs.
  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex.search(query).map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          fullResults.push({
            method: m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          this.indexProse(content, file.name);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}
