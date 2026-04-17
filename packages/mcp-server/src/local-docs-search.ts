// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

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
  perLanguage?: Record<string, PerLanguageData>;
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
    perLanguage: {
      cli: {
        method: 'search find_companies_v1',
        example: "openregister search find-companies-v1 \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Search.FindCompaniesV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tcompanySearch, err := client.Search.FindCompaniesV1(context.TODO(), openregister.SearchFindCompaniesV1Params{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", companySearch.Pagination)\n}\n',
      },
      http: {
        example:
          "curl https://api.openregister.de/v1/search/company \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OPENREGISTER_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'search().findCompaniesV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.search.CompanySearch;\nimport com.openregister.api.models.search.SearchFindCompaniesV1Params;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanySearch companySearch = client.search().findCompaniesV1();\n    }\n}',
      },
      python: {
        method: 'search.find_companies_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\ncompany_search = client.search.find_companies_v1()\nprint(company_search.pagination)',
      },
      typescript: {
        method: 'client.search.findCompaniesV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst companySearch = await client.search.findCompaniesV1();\n\nconsole.log(companySearch.pagination);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'search lookup_company_by_url',
        example:
          "openregister search lookup-company-by-url \\\n  --api-key 'My API Key' \\\n  --url https://example.com",
      },
      go: {
        method: 'client.Search.LookupCompanyByURL',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Search.LookupCompanyByURL(context.TODO(), openregister.SearchLookupCompanyByURLParams{\n\t\tURL: "https://example.com",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.CompanyID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v0/search/lookup \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'search().lookupCompanyByUrl',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.search.SearchLookupCompanyByUrlParams;\nimport com.openregister.api.models.search.SearchLookupCompanyByUrlResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        SearchLookupCompanyByUrlParams params = SearchLookupCompanyByUrlParams.builder()\n            .url("https://example.com")\n            .build();\n        SearchLookupCompanyByUrlResponse response = client.search().lookupCompanyByUrl(params);\n    }\n}',
      },
      python: {
        method: 'search.lookup_company_by_url',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search.lookup_company_by_url(\n    url="https://example.com",\n)\nprint(response.company_id)',
      },
      typescript: {
        method: 'client.search.lookupCompanyByURL',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.lookupCompanyByURL({ url: 'https://example.com' });\n\nconsole.log(response.company_id);",
      },
    },
  },
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
    perLanguage: {
      cli: {
        method: 'search autocomplete_companies_v1',
        example:
          "openregister search autocomplete-companies-v1 \\\n  --api-key 'My API Key' \\\n  --query query",
      },
      go: {
        method: 'client.Search.AutocompleteCompaniesV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Search.AutocompleteCompaniesV1(context.TODO(), openregister.SearchAutocompleteCompaniesV1Params{\n\t\tQuery: "query",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Results)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/autocomplete/company \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'search().autocompleteCompaniesV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.search.SearchAutocompleteCompaniesV1Params;\nimport com.openregister.api.models.search.SearchAutocompleteCompaniesV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        SearchAutocompleteCompaniesV1Params params = SearchAutocompleteCompaniesV1Params.builder()\n            .query("query")\n            .build();\n        SearchAutocompleteCompaniesV1Response response = client.search().autocompleteCompaniesV1(params);\n    }\n}',
      },
      python: {
        method: 'search.autocomplete_companies_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search.autocomplete_companies_v1(\n    query="query",\n)\nprint(response.results)',
      },
      typescript: {
        method: 'client.search.autocompleteCompaniesV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.autocompleteCompaniesV1({ query: 'query' });\n\nconsole.log(response.results);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'search find_person_v1',
        example: "openregister search find-person-v1 \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Search.FindPersonV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Search.FindPersonV1(context.TODO(), openregister.SearchFindPersonV1Params{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Pagination)\n}\n',
      },
      http: {
        example:
          "curl https://api.openregister.de/v1/search/person \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OPENREGISTER_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'search().findPersonV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.search.SearchFindPersonV1Params;\nimport com.openregister.api.models.search.SearchFindPersonV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        SearchFindPersonV1Response response = client.search().findPersonV1();\n    }\n}',
      },
      python: {
        method: 'search.find_person_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.search.find_person_v1()\nprint(response.pagination)',
      },
      typescript: {
        method: 'client.search.findPersonV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.search.findPersonV1();\n\nconsole.log(response.pagination);",
      },
    },
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
      "{ id: string; address: object; addresses: object[]; capital: object; capitals: object[]; contact: { social_media: object; website_url: string; email?: string; phone?: string; vat_id?: string; }; documents: object[]; incorporated_at: string; indicators: { balance_sheet_total: number; capital_reserves: number; cash: number; date: string; employees: number; equity: number; liabilities: number; materials: number; net_income: number; pension_provisions: number; real_estate: number; report_id: string; revenue: number; salaries: number; taxes: number; }[]; industry_codes: { WZ2025: object[]; }; legal_form: string; name: object; names: object[]; notarized_at: string; purpose: object; purposes: object[]; register: object; registers: object[]; representation: { id: string; end_date: string; name: string; role: representation_role; start_date: string; type: entity_type; legal_person?: object; natural_person?: object; }[]; sources: object[]; status: 'active' | 'inactive' | 'liquidation'; terminated_at: string; lei?: string; }",
    markdown:
      "## get_details_v1\n\n`client.company.getDetailsV1(company_id: string, export?: boolean, realtime?: boolean): { id: string; address: company_address; addresses: company_address[]; capital: company_capital; capitals: company_capital[]; contact: object; documents: company_document[]; incorporated_at: string; indicators: object[]; industry_codes: object; legal_form: company_legal_form; name: company_name; names: company_name[]; notarized_at: string; purpose: company_purpose; purposes: company_purpose[]; register: company_register; registers: company_register[]; representation: object[]; sources: source[]; status: 'active' | 'inactive' | 'liquidation'; terminated_at: string; lei?: string; }`\n\n**get** `/v1/company/{company_id}`\n\nGet detailed company information\n\n### Parameters\n\n- `company_id: string`\n\n- `export?: boolean`\n  Setting this to true will return the company without sources.\n\n\n- `realtime?: boolean`\n  Get the most up-to-date company information directly from the Handelsregister.\nWhen set to true, we fetch the latest data in real-time from the official German commercial register, ensuring you receive the most current company details.\nNote: Real-time requests take longer but guarantee the freshest data available.\n\n\n### Returns\n\n- `{ id: string; address: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }; addresses: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }[]; capital: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }; capitals: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }[]; contact: { social_media: { facebook?: string; github?: string; instagram?: string; linkedin?: string; tiktok?: string; twitter?: string; xing?: string; youtube?: string; }; website_url: string; email?: string; phone?: string; vat_id?: string; }; documents: { id: string; date: string; latest: boolean; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; }[]; incorporated_at: string; indicators: { balance_sheet_total: number; capital_reserves: number; cash: number; date: string; employees: number; equity: number; liabilities: number; materials: number; net_income: number; pension_provisions: number; real_estate: number; report_id: string; revenue: number; salaries: number; taxes: number; }[]; industry_codes: { WZ2025: { code: string; }[]; }; legal_form: string; name: { legal_form: company_legal_form; name: string; start_date: string; }; names: { legal_form: company_legal_form; name: string; start_date: string; }[]; notarized_at: string; purpose: { purpose: string; start_date: string; }; purposes: { purpose: string; start_date: string; }[]; register: { register_court: string; register_number: string; register_type: company_register_type; company_id?: string; start_date?: string; }; registers: { register_court: string; register_number: string; register_type: company_register_type; company_id?: string; start_date?: string; }[]; representation: { id: string; end_date: string; name: string; role: string; start_date: string; type: 'natural_person' | 'legal_person'; legal_person?: { city: string; country: string; name: string; }; natural_person?: { city: string; date_of_birth: string; first_name: string; last_name: string; }; }[]; sources: { document_url: string; }[]; status: 'active' | 'inactive' | 'liquidation'; terminated_at: string; lei?: string; }`\n\n  - `id: string`\n  - `address: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }`\n  - `addresses: { city: string; country: string; formatted_value: string; start_date: string; extra?: string; postal_code?: string; street?: string; }[]`\n  - `capital: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }`\n  - `capitals: { amount: number; currency: 'EUR' | 'DEM' | 'USD'; start_date: string; }[]`\n  - `contact: { social_media: { facebook?: string; github?: string; instagram?: string; linkedin?: string; tiktok?: string; twitter?: string; xing?: string; youtube?: string; }; website_url: string; email?: string; phone?: string; vat_id?: string; }`\n  - `documents: { id: string; date: string; latest: boolean; type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list'; }[]`\n  - `incorporated_at: string`\n  - `indicators: { balance_sheet_total: number; capital_reserves: number; cash: number; date: string; employees: number; equity: number; liabilities: number; materials: number; net_income: number; pension_provisions: number; real_estate: number; report_id: string; revenue: number; salaries: number; taxes: number; }[]`\n  - `industry_codes: { WZ2025: { code: string; }[]; }`\n  - `legal_form: string`\n  - `name: { legal_form: string; name: string; start_date: string; }`\n  - `names: { legal_form: string; name: string; start_date: string; }[]`\n  - `notarized_at: string`\n  - `purpose: { purpose: string; start_date: string; }`\n  - `purposes: { purpose: string; start_date: string; }[]`\n  - `register: { register_court: string; register_number: string; register_type: 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR'; company_id?: string; start_date?: string; }`\n  - `registers: { register_court: string; register_number: string; register_type: 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR'; company_id?: string; start_date?: string; }[]`\n  - `representation: { id: string; end_date: string; name: string; role: string; start_date: string; type: 'natural_person' | 'legal_person'; legal_person?: { city: string; country: string; name: string; }; natural_person?: { city: string; date_of_birth: string; first_name: string; last_name: string; }; }[]`\n  - `sources: { document_url: string; }[]`\n  - `status: 'active' | 'inactive' | 'liquidation'`\n  - `terminated_at: string`\n  - `lei?: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getDetailsV1('company_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'company get_details_v1',
        example:
          "openregister company get-details-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetDetailsV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetDetailsV1(\n\t\tcontext.TODO(),\n\t\t"company_id",\n\t\topenregister.CompanyGetDetailsV1Params{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/company/$COMPANY_ID \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getDetailsV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetDetailsV1Response response = client.company().getDetailsV1("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_details_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_details_v1(\n    company_id="company_id",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.company.getDetailsV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getDetailsV1('company_id');\n\nconsole.log(response.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'company get_contact_v0',
        example:
          "openregister company get-contact-v0 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetContactV0',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetContactV0(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.VatID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v0/company/$COMPANY_ID/contact \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getContactV0',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetContactV0Params;\nimport com.openregister.api.models.company.CompanyGetContactV0Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetContactV0Response response = client.company().getContactV0("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_contact_v0',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_contact_v0(\n    "company_id",\n)\nprint(response.vat_id)',
      },
      typescript: {
        method: 'client.company.getContactV0',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getContactV0('company_id');\n\nconsole.log(response.vat_id);",
      },
    },
  },
  {
    name: 'get_owners_v1',
    endpoint: '/v1/company/{company_id}/owners',
    httpMethod: 'get',
    summary: 'Get company owners',
    description: 'Get company owners',
    stainlessPath: '(resource) company > (method) get_owners_v1',
    qualified: 'client.company.getOwnersV1',
    params: ['company_id: string;', 'best_available?: boolean;', 'export?: boolean;', 'realtime?: boolean;'],
    response:
      "{ best_available: boolean; company_id: string; owners: { id: string; legal_person: object; name: string; natural_person: object; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; type: 'natural_person' | 'legal_person'; }[]; sources: { document_url: string; }[]; }",
    markdown:
      "## get_owners_v1\n\n`client.company.getOwnersV1(company_id: string, best_available?: boolean, export?: boolean, realtime?: boolean): { best_available: boolean; company_id: string; owners: object[]; sources: source[]; }`\n\n**get** `/v1/company/{company_id}/owners`\n\nGet company owners\n\n### Parameters\n\n- `company_id: string`\n\n- `best_available?: boolean`\n  When set to true, returns the best available owner data for AG and SE companies.\nThis data is extracted from Handelsregister documents and may not reflect the most current ownership state, as these\ndocument types are not filed on every ownership change.\nRequests for AG/SE companies without this flag return 404.\nNote: realtime and best_available cannot be used together at the moment.\n\n\n- `export?: boolean`\n  Setting this to true will return the owners of the company if they exist\nbut will skip processing the documents in case they weren't processed yet.\n\n\n- `realtime?: boolean`\n  Get the most up-to-date company information directly from the Handelsregister.\nWhen set to true, we fetch the latest data in real-time from the official German commercial register, ensuring you receive the most current company details.\nNote: Real-time requests take longer but guarantee the freshest data available.\n\n\n### Returns\n\n- `{ best_available: boolean; company_id: string; owners: { id: string; legal_person: object; name: string; natural_person: object; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; type: 'natural_person' | 'legal_person'; }[]; sources: { document_url: string; }[]; }`\n\n  - `best_available: boolean`\n  - `company_id: string`\n  - `owners: { id: string; legal_person: { city: string; country: string; name: string; }; name: string; natural_person: { city: string; country: string; date_of_birth: string; first_name: string; full_name: string; last_name: string; }; nominal_share: number; percentage_share: number; relation_type: 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner'; start: string; type: 'natural_person' | 'legal_person'; }[]`\n  - `sources: { document_url: string; }[]`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.company.getOwnersV1('company_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'company get_owners_v1',
        example:
          "openregister company get-owners-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetOwnersV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetOwnersV1(\n\t\tcontext.TODO(),\n\t\t"company_id",\n\t\topenregister.CompanyGetOwnersV1Params{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.CompanyID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/company/$COMPANY_ID/owners \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getOwnersV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetOwnersV1Params;\nimport com.openregister.api.models.company.CompanyGetOwnersV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetOwnersV1Response response = client.company().getOwnersV1("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_owners_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_owners_v1(\n    company_id="company_id",\n)\nprint(response.company_id)',
      },
      typescript: {
        method: 'client.company.getOwnersV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getOwnersV1('company_id');\n\nconsole.log(response.company_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'company get_historical_owners_v1',
        example:
          "openregister company get-historical-owners-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetHistoricalOwnersV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetHistoricalOwnersV1(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Owners)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/company/$COMPANY_ID/owners/historical \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getHistoricalOwnersV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetHistoricalOwnersV1Params;\nimport com.openregister.api.models.company.CompanyGetHistoricalOwnersV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetHistoricalOwnersV1Response response = client.company().getHistoricalOwnersV1("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_historical_owners_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_historical_owners_v1(\n    "company_id",\n)\nprint(response.owners)',
      },
      typescript: {
        method: 'client.company.getHistoricalOwnersV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getHistoricalOwnersV1('company_id');\n\nconsole.log(response.owners);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'company get_holdings_v1',
        example:
          "openregister company get-holdings-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetHoldingsV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetHoldingsV1(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.CompanyID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/company/$COMPANY_ID/holdings \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getHoldingsV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetHoldingsV1Params;\nimport com.openregister.api.models.company.CompanyGetHoldingsV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetHoldingsV1Response response = client.company().getHoldingsV1("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_holdings_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_holdings_v1(\n    "company_id",\n)\nprint(response.company_id)',
      },
      typescript: {
        method: 'client.company.getHoldingsV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getHoldingsV1('company_id');\n\nconsole.log(response.company_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'company get_financials_v1',
        example:
          "openregister company get-financials-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetFinancialsV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetFinancialsV1(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Merged)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/company/$COMPANY_ID/financials \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getFinancialsV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetFinancialsV1Params;\nimport com.openregister.api.models.company.CompanyGetFinancialsV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetFinancialsV1Response response = client.company().getFinancialsV1("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_financials_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_financials_v1(\n    "company_id",\n)\nprint(response.merged)',
      },
      typescript: {
        method: 'client.company.getFinancialsV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getFinancialsV1('company_id');\n\nconsole.log(response.merged);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'company get_ubos_v1',
        example:
          "openregister company get-ubos-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id",
      },
      go: {
        method: 'client.Company.GetUbosV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Company.GetUbosV1(context.TODO(), "company_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.CompanyID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/company/$COMPANY_ID/ubo \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'company().getUbosV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetUbosV1Params;\nimport com.openregister.api.models.company.CompanyGetUbosV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        CompanyGetUbosV1Response response = client.company().getUbosV1("company_id");\n    }\n}',
      },
      python: {
        method: 'company.get_ubos_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.company.get_ubos_v1(\n    "company_id",\n)\nprint(response.company_id)',
      },
      typescript: {
        method: 'client.company.getUbosV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getUbosV1('company_id');\n\nconsole.log(response.company_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'document get_cached_v1',
        example:
          "openregister document get-cached-v1 \\\n  --api-key 'My API Key' \\\n  --document-id document_id",
      },
      go: {
        method: 'client.Document.GetCachedV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tdocument, err := client.Document.GetCachedV1(context.TODO(), "document_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", document.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/document/$DOCUMENT_ID \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'document().getCachedV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.document.Document;\nimport com.openregister.api.models.document.DocumentGetCachedV1Params;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        Document document = client.document().getCachedV1("document_id");\n    }\n}',
      },
      python: {
        method: 'document.get_cached_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\ndocument = client.document.get_cached_v1(\n    "document_id",\n)\nprint(document.id)',
      },
      typescript: {
        method: 'client.document.getCachedV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst document = await client.document.getCachedV1('document_id');\n\nconsole.log(document.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'document get_realtime_v1',
        example:
          "openregister document get-realtime-v1 \\\n  --api-key 'My API Key' \\\n  --company-id company_id \\\n  --document-category current_printout",
      },
      go: {
        method: 'client.Document.GetRealtimeV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Document.GetRealtimeV1(context.TODO(), openregister.DocumentGetRealtimeV1Params{\n\t\tCompanyID:        "company_id",\n\t\tDocumentCategory: openregister.DocumentGetRealtimeV1ParamsDocumentCategoryCurrentPrintout,\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.Category)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/document \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'document().getRealtimeV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.document.DocumentGetRealtimeV1Params;\nimport com.openregister.api.models.document.DocumentGetRealtimeV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        DocumentGetRealtimeV1Params params = DocumentGetRealtimeV1Params.builder()\n            .companyId("company_id")\n            .documentCategory(DocumentGetRealtimeV1Params.DocumentCategory.CURRENT_PRINTOUT)\n            .build();\n        DocumentGetRealtimeV1Response response = client.document().getRealtimeV1(params);\n    }\n}',
      },
      python: {
        method: 'document.get_realtime_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.document.get_realtime_v1(\n    company_id="company_id",\n    document_category="current_printout",\n)\nprint(response.category)',
      },
      typescript: {
        method: 'client.document.getRealtimeV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.document.getRealtimeV1({\n  company_id: 'company_id',\n  document_category: 'current_printout',\n});\n\nconsole.log(response.category);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'person get_details_v1',
        example:
          "openregister person get-details-v1 \\\n  --api-key 'My API Key' \\\n  --person-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      go: {
        method: 'client.Person.GetDetailsV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Person.GetDetailsV1(context.TODO(), "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/person/$PERSON_ID \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'person().getDetailsV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.person.PersonGetDetailsV1Params;\nimport com.openregister.api.models.person.PersonGetDetailsV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        PersonGetDetailsV1Response response = client.person().getDetailsV1("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e");\n    }\n}',
      },
      python: {
        method: 'person.get_details_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.person.get_details_v1(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.person.getDetailsV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.person.getDetailsV1('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'person get_holdings_v1',
        example:
          "openregister person get-holdings-v1 \\\n  --api-key 'My API Key' \\\n  --person-id 182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      },
      go: {
        method: 'client.Person.GetHoldingsV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Person.GetHoldingsV1(context.TODO(), "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.PersonID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/person/$PERSON_ID/holdings \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'person().getHoldingsV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.person.PersonGetHoldingsV1Params;\nimport com.openregister.api.models.person.PersonGetHoldingsV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        PersonGetHoldingsV1Response response = client.person().getHoldingsV1("182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e");\n    }\n}',
      },
      python: {
        method: 'person.get_holdings_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.person.get_holdings_v1(\n    "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",\n)\nprint(response.person_id)',
      },
      typescript: {
        method: 'client.person.getHoldingsV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.person.getHoldingsV1('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response.person_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'monitor create',
        example:
          "openregister monitor create \\\n  --api-key 'My API Key' \\\n  --entity-id entity_id \\\n  --entity-type company \\\n  --preference basic",
      },
      go: {
        method: 'client.Monitor.New',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmonitor, err := client.Monitor.New(context.TODO(), openregister.MonitorNewParams{\n\t\tEntityID:    "entity_id",\n\t\tEntityType:  openregister.MonitorNewParamsEntityTypeCompany,\n\t\tPreferences: []string{"basic"},\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", monitor.EntityID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/monitor \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY" \\\n    -d \'{\n          "entity_id": "entity_id",\n          "entity_type": "company",\n          "preferences": [\n            "basic"\n          ]\n        }\'',
      },
      java: {
        method: 'monitor().create',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.monitor.MonitorCreateParams;\nimport com.openregister.api.models.monitor.MonitorCreateResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        MonitorCreateParams params = MonitorCreateParams.builder()\n            .entityId("entity_id")\n            .entityType(MonitorCreateParams.EntityType.COMPANY)\n            .addPreference(MonitorCreateParams.Preference.BASIC)\n            .build();\n        MonitorCreateResponse monitor = client.monitor().create(params);\n    }\n}',
      },
      python: {
        method: 'monitor.create',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nmonitor = client.monitor.create(\n    entity_id="entity_id",\n    entity_type="company",\n    preferences=["basic"],\n)\nprint(monitor.entity_id)',
      },
      typescript: {
        method: 'client.monitor.create',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst monitor = await client.monitor.create({\n  entity_id: 'entity_id',\n  entity_type: 'company',\n  preferences: ['basic'],\n});\n\nconsole.log(monitor.entity_id);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'monitor list',
        example: "openregister monitor list \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Monitor.List',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tmonitors, err := client.Monitor.List(context.TODO())\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", monitors.Items)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/monitor \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'monitor().list',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.monitor.MonitorListParams;\nimport com.openregister.api.models.monitor.MonitorListResponse;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        MonitorListResponse monitors = client.monitor().list();\n    }\n}',
      },
      python: {
        method: 'monitor.list',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nmonitors = client.monitor.list()\nprint(monitors.items)',
      },
      typescript: {
        method: 'client.monitor.list',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst monitors = await client.monitor.list();\n\nconsole.log(monitors.items);",
      },
    },
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
    perLanguage: {
      cli: {
        method: 'monitor delete',
        example: "openregister monitor delete \\\n  --api-key 'My API Key' \\\n  --entity-id entity_id",
      },
      go: {
        method: 'client.Monitor.Delete',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Monitor.Delete(context.TODO(), "entity_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/monitor/$ENTITY_ID \\\n    -X DELETE \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'monitor().delete',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.monitor.MonitorDeleteParams;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        client.monitor().delete("entity_id");\n    }\n}',
      },
      python: {
        method: 'monitor.delete',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nclient.monitor.delete(\n    "entity_id",\n)',
      },
      typescript: {
        method: 'client.monitor.delete',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.monitor.delete('entity_id');",
      },
    },
  },
  {
    name: 'set_credentials_v1',
    endpoint: '/v1/transparenzregister/credentials',
    httpMethod: 'post',
    summary: 'Store Transparenzregister credentials',
    description:
      'Store username and password credentials for accessing the Transparenzregister API.\nThese credentials will be used for subsequent requests to retrieve company documents.\nCredential names are user-scoped; the reserved name `sandbox` cannot be used.\nCredentials are validated against Transparenzregister before they are persisted.\n',
    stainlessPath: '(resource) transparenzregister > (method) set_credentials_v1',
    qualified: 'client.transparenzregister.setCredentialsV1',
    params: ['password: string;', 'username: string;', 'name?: string;'],
    markdown:
      "## set_credentials_v1\n\n`client.transparenzregister.setCredentialsV1(password: string, username: string, name?: string): void`\n\n**post** `/v1/transparenzregister/credentials`\n\nStore username and password credentials for accessing the Transparenzregister API.\nThese credentials will be used for subsequent requests to retrieve company documents.\nCredential names are user-scoped; the reserved name `sandbox` cannot be used.\nCredentials are validated against Transparenzregister before they are persisted.\n\n\n### Parameters\n\n- `password: string`\n  Password for Transparenzregister API access.\n\n\n- `username: string`\n  Username for Transparenzregister API access.\nExample: \"compliance@example.com\"\n\n\n- `name?: string`\n  Name to identify this set of credentials. Allows storing multiple\nTransparenzregister credentials per user (e.g., for different accounts\nor clients). Defaults to 'default' if not provided.\nCannot be `sandbox` because that name is reserved for test-mode extracts.\nExample: \"client_a\"\n\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nawait client.transparenzregister.setCredentialsV1({ password: 'password', username: 'username' })\n```",
    perLanguage: {
      cli: {
        method: 'transparenzregister set_credentials_v1',
        example:
          "openregister transparenzregister set-credentials-v1 \\\n  --api-key 'My API Key' \\\n  --password password \\\n  --username username",
      },
      go: {
        method: 'client.Transparenzregister.SetCredentialsV1',
        example:
          'package main\n\nimport (\n\t"context"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\terr := client.Transparenzregister.SetCredentialsV1(context.TODO(), openregister.TransparenzregisterSetCredentialsV1Params{\n\t\tPassword: "password",\n\t\tUsername: "username",\n\t})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/transparenzregister/credentials \\\n    -H \'Content-Type: application/json\' \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY" \\\n    -d \'{\n          "password": "password",\n          "username": "username"\n        }\'',
      },
      java: {
        method: 'transparenzregister().setCredentialsV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.transparenzregister.TransparenzregisterSetCredentialsV1Params;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        TransparenzregisterSetCredentialsV1Params params = TransparenzregisterSetCredentialsV1Params.builder()\n            .password("password")\n            .username("username")\n            .build();\n        client.transparenzregister().setCredentialsV1(params);\n    }\n}',
      },
      python: {
        method: 'transparenzregister.set_credentials_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nclient.transparenzregister.set_credentials_v1(\n    password="password",\n    username="username",\n)',
      },
      typescript: {
        method: 'client.transparenzregister.setCredentialsV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nawait client.transparenzregister.setCredentialsV1({ password: 'password', username: 'username' });",
      },
    },
  },
  {
    name: 'create_v1',
    endpoint: '/v1/transparenzregister/extracts',
    httpMethod: 'post',
    summary: 'Submit Transparenzregister extract request',
    description:
      'Submit a Transparenzregister extract request and return an extract resource with processing status.\n\nSandbox integration testing (recommended for all non-production testing):\n- Send `X-Credential-Name: sandbox`.\n- Do not send `company_id` (an empty body `{}` is valid).\n- OpenRegister uses the Transparenzregister test environment and built-in test authentication.\n- The request is submitted with the fixed test EKRN `DE727032388716`.\n- The response has `company_id: null`.\n\nProduction usage:\n- Omit `X-Credential-Name` or use `default` / another stored credential name.\n- `company_id` is required and must resolve to exactly one Transparenzregister legal entity.\n',
    stainlessPath: '(resource) transparenzregister.extract > (method) create_v1',
    qualified: 'client.transparenzregister.extract.createV1',
    params: ['company_id?: string;', 'X-Credential-Name?: string;'],
    response:
      "{ id: string; status: 'completed' | 'processing' | 'failed'; company_id?: string; completed_at?: string; documents?: { document_id: string; filename: string; format: string; url: string; }[]; ekrn?: string; reference_number?: string; report?: { created_at?: string; fictional_ubo_reason?: string; groups?: { description?: string; interest_type?: string; position?: number; }[]; notice_type?: string; status_flags?: { corrected_by_reference?: string; corrected_references?: string[]; deleted?: boolean; deletion_date?: string; discrepancy_note?: string; }; ubos?: { interest?: object; natural_person?: object; position?: number; }[]; validity?: { from?: object; until?: object; }; }; submitted_at?: string; }",
    markdown:
      "## create_v1\n\n`client.transparenzregister.extract.createV1(company_id?: string, X-Credential-Name?: string): { id: string; status: 'completed' | 'processing' | 'failed'; company_id?: string; completed_at?: string; documents?: object[]; ekrn?: string; reference_number?: string; report?: object; submitted_at?: string; }`\n\n**post** `/v1/transparenzregister/extracts`\n\nSubmit a Transparenzregister extract request and return an extract resource with processing status.\n\nSandbox integration testing (recommended for all non-production testing):\n- Send `X-Credential-Name: sandbox`.\n- Do not send `company_id` (an empty body `{}` is valid).\n- OpenRegister uses the Transparenzregister test environment and built-in test authentication.\n- The request is submitted with the fixed test EKRN `DE727032388716`.\n- The response has `company_id: null`.\n\nProduction usage:\n- Omit `X-Credential-Name` or use `default` / another stored credential name.\n- `company_id` is required and must resolve to exactly one Transparenzregister legal entity.\n\n\n### Parameters\n\n- `company_id?: string`\n  Unique company identifier.\nRequired unless `X-Credential-Name` is set to `sandbox`.\nIn sandbox mode this field should be omitted.\nExample: DE-HRB-F1103-267645\n\n\n- `X-Credential-Name?: string`\n\n### Returns\n\n- `{ id: string; status: 'completed' | 'processing' | 'failed'; company_id?: string; completed_at?: string; documents?: { document_id: string; filename: string; format: string; url: string; }[]; ekrn?: string; reference_number?: string; report?: { created_at?: string; fictional_ubo_reason?: string; groups?: { description?: string; interest_type?: string; position?: number; }[]; notice_type?: string; status_flags?: { corrected_by_reference?: string; corrected_references?: string[]; deleted?: boolean; deletion_date?: string; discrepancy_note?: string; }; ubos?: { interest?: object; natural_person?: object; position?: number; }[]; validity?: { from?: object; until?: object; }; }; submitted_at?: string; }`\n  Transparenzregister extract resource including processing state, parsed report, and downloadable documents.\n\n\n  - `id: string`\n  - `status: 'completed' | 'processing' | 'failed'`\n  - `company_id?: string`\n  - `completed_at?: string`\n  - `documents?: { document_id: string; filename: string; format: string; url: string; }[]`\n  - `ekrn?: string`\n  - `reference_number?: string`\n  - `report?: { created_at?: string; fictional_ubo_reason?: string; groups?: { description?: string; interest_type?: string; position?: number; }[]; notice_type?: string; status_flags?: { corrected_by_reference?: string; corrected_references?: string[]; deleted?: boolean; deletion_date?: string; discrepancy_note?: string; }; ubos?: { interest?: { percentage?: number; scope?: string; type?: string; }; natural_person?: { city?: string; country?: string; date_of_birth?: string; first_name?: string; full_name?: string; last_name?: string; nationalities?: string[]; title?: string; }; position?: number; }[]; validity?: { from?: { date?: string; note?: string; }; until?: { date?: string; note?: string; }; }; }`\n  - `submitted_at?: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.transparenzregister.extract.createV1();\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'extract create_v1',
        example: "openregister transparenzregister:extract create-v1 \\\n  --api-key 'My API Key'",
      },
      go: {
        method: 'client.Transparenzregister.Extract.NewV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Transparenzregister.Extract.NewV1(context.TODO(), openregister.TransparenzregisterExtractNewV1Params{})\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          "curl https://api.openregister.de/v1/transparenzregister/extracts \\\n    -H 'Content-Type: application/json' \\\n    -H \"Authorization: Bearer $OPENREGISTER_API_KEY\" \\\n    -d '{}'",
      },
      java: {
        method: 'transparenzregister().extract().createV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.transparenzregister.extract.ExtractCreateV1Params;\nimport com.openregister.api.models.transparenzregister.extract.ExtractCreateV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        ExtractCreateV1Response response = client.transparenzregister().extract().createV1();\n    }\n}',
      },
      python: {
        method: 'transparenzregister.extract.create_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.transparenzregister.extract.create_v1()\nprint(response.id)',
      },
      typescript: {
        method: 'client.transparenzregister.extract.createV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.transparenzregister.extract.createV1();\n\nconsole.log(response.id);",
      },
    },
  },
  {
    name: 'get_v1',
    endpoint: '/v1/transparenzregister/extracts/{extract_id}',
    httpMethod: 'get',
    summary: 'Get Transparenzregister extract',
    description:
      'Get the results of a Transparenzregister extract request. This endpoint handles all internal complexity including\npolling request status, selecting all available documents, creating Transparenzregister baskets, and\nreturning download URLs when ready. If the request is still processing, it will return a pending status.\nPolling reuses the credential mode stored on the extract at create time. Sandbox extracts keep using the\nTransparenzregister test client automatically; no credential header is accepted on this endpoint.\n',
    stainlessPath: '(resource) transparenzregister.extract > (method) get_v1',
    qualified: 'client.transparenzregister.extract.getV1',
    params: ['extract_id: string;'],
    response:
      "{ id: string; status: 'completed' | 'processing' | 'failed'; company_id?: string; completed_at?: string; documents?: { document_id: string; filename: string; format: string; url: string; }[]; ekrn?: string; reference_number?: string; report?: { created_at?: string; fictional_ubo_reason?: string; groups?: { description?: string; interest_type?: string; position?: number; }[]; notice_type?: string; status_flags?: { corrected_by_reference?: string; corrected_references?: string[]; deleted?: boolean; deletion_date?: string; discrepancy_note?: string; }; ubos?: { interest?: object; natural_person?: object; position?: number; }[]; validity?: { from?: object; until?: object; }; }; submitted_at?: string; }",
    markdown:
      "## get_v1\n\n`client.transparenzregister.extract.getV1(extract_id: string): { id: string; status: 'completed' | 'processing' | 'failed'; company_id?: string; completed_at?: string; documents?: object[]; ekrn?: string; reference_number?: string; report?: object; submitted_at?: string; }`\n\n**get** `/v1/transparenzregister/extracts/{extract_id}`\n\nGet the results of a Transparenzregister extract request. This endpoint handles all internal complexity including\npolling request status, selecting all available documents, creating Transparenzregister baskets, and\nreturning download URLs when ready. If the request is still processing, it will return a pending status.\nPolling reuses the credential mode stored on the extract at create time. Sandbox extracts keep using the\nTransparenzregister test client automatically; no credential header is accepted on this endpoint.\n\n\n### Parameters\n\n- `extract_id: string`\n\n### Returns\n\n- `{ id: string; status: 'completed' | 'processing' | 'failed'; company_id?: string; completed_at?: string; documents?: { document_id: string; filename: string; format: string; url: string; }[]; ekrn?: string; reference_number?: string; report?: { created_at?: string; fictional_ubo_reason?: string; groups?: { description?: string; interest_type?: string; position?: number; }[]; notice_type?: string; status_flags?: { corrected_by_reference?: string; corrected_references?: string[]; deleted?: boolean; deletion_date?: string; discrepancy_note?: string; }; ubos?: { interest?: object; natural_person?: object; position?: number; }[]; validity?: { from?: object; until?: object; }; }; submitted_at?: string; }`\n  Transparenzregister extract resource including processing state, parsed report, and downloadable documents.\n\n\n  - `id: string`\n  - `status: 'completed' | 'processing' | 'failed'`\n  - `company_id?: string`\n  - `completed_at?: string`\n  - `documents?: { document_id: string; filename: string; format: string; url: string; }[]`\n  - `ekrn?: string`\n  - `reference_number?: string`\n  - `report?: { created_at?: string; fictional_ubo_reason?: string; groups?: { description?: string; interest_type?: string; position?: number; }[]; notice_type?: string; status_flags?: { corrected_by_reference?: string; corrected_references?: string[]; deleted?: boolean; deletion_date?: string; discrepancy_note?: string; }; ubos?: { interest?: { percentage?: number; scope?: string; type?: string; }; natural_person?: { city?: string; country?: string; date_of_birth?: string; first_name?: string; full_name?: string; last_name?: string; nationalities?: string[]; title?: string; }; position?: number; }[]; validity?: { from?: { date?: string; note?: string; }; until?: { date?: string; note?: string; }; }; }`\n  - `submitted_at?: string`\n\n### Example\n\n```typescript\nimport Openregister from 'openregister';\n\nconst client = new Openregister();\n\nconst response = await client.transparenzregister.extract.getV1('extract_id');\n\nconsole.log(response);\n```",
    perLanguage: {
      cli: {
        method: 'extract get_v1',
        example:
          "openregister transparenzregister:extract get-v1 \\\n  --api-key 'My API Key' \\\n  --extract-id extract_id",
      },
      go: {
        method: 'client.Transparenzregister.Extract.GetV1',
        example:
          'package main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"),\n\t)\n\tresponse, err := client.Transparenzregister.Extract.GetV1(context.TODO(), "extract_id")\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n',
      },
      http: {
        example:
          'curl https://api.openregister.de/v1/transparenzregister/extracts/$EXTRACT_ID \\\n    -H "Authorization: Bearer $OPENREGISTER_API_KEY"',
      },
      java: {
        method: 'transparenzregister().extract().getV1',
        example:
          'package com.openregister.api.example;\n\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.transparenzregister.extract.ExtractGetV1Params;\nimport com.openregister.api.models.transparenzregister.extract.ExtractGetV1Response;\n\npublic final class Main {\n    private Main() {}\n\n    public static void main(String[] args) {\n        OpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\n        ExtractGetV1Response response = client.transparenzregister().extract().getV1("extract_id");\n    }\n}',
      },
      python: {
        method: 'transparenzregister.extract.get_v1',
        example:
          'import os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\nresponse = client.transparenzregister.extract.get_v1(\n    "extract_id",\n)\nprint(response.id)',
      },
      typescript: {
        method: 'client.transparenzregister.extract.getV1',
        example:
          "import Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.transparenzregister.extract.getV1('extract_id');\n\nconsole.log(response.id);",
      },
    },
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [
  {
    language: 'python',
    content:
      '# Openregister Python API library\n\n<!-- prettier-ignore -->\n[![PyPI version](https://img.shields.io/pypi/v/openregister-sdk.svg?label=pypi%20(stable))](https://pypi.org/project/openregister-sdk/)\n\nThe Openregister Python library provides convenient access to the Openregister REST API from any Python 3.9+\napplication. The library includes type definitions for all request params and response fields,\nand offers both synchronous and asynchronous clients powered by [httpx](https://github.com/encode/httpx).\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Openregister MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=openregister-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm9wZW5yZWdpc3Rlci1tY3AiXSwiZW52Ijp7Ik9QRU5SRUdJU1RFUl9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22openregister-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22openregister-mcp%22%5D%2C%22env%22%3A%7B%22OPENREGISTER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Documentation\n\n The full API of this library can be found in [api.md](api.md).\n\n## Installation\n\n```sh\n# install from PyPI\npip install openregister-sdk\n```\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```python\nimport os\nfrom openregister import Openregister\n\nclient = Openregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\n\nresponse = client.company.get_details_v1(\n    company_id="DE-HRB-F1103-267645",\n)\nprint(response.id)\n```\n\nWhile you can provide an `api_key` keyword argument,\nwe recommend using [python-dotenv](https://pypi.org/project/python-dotenv/)\nto add `OPENREGISTER_API_KEY="My API Key"` to your `.env` file\nso that your API Key is not stored in source control.\n\n## Async usage\n\nSimply import `AsyncOpenregister` instead of `Openregister` and use `await` with each API call:\n\n```python\nimport os\nimport asyncio\nfrom openregister import AsyncOpenregister\n\nclient = AsyncOpenregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n)\n\nasync def main() -> None:\n  response = await client.company.get_details_v1(\n      company_id="DE-HRB-F1103-267645",\n  )\n  print(response.id)\n\nasyncio.run(main())\n```\n\nFunctionality between the synchronous and asynchronous clients is otherwise identical.\n\n### With aiohttp\n\nBy default, the async client uses `httpx` for HTTP requests. However, for improved concurrency performance you may also use `aiohttp` as the HTTP backend.\n\nYou can enable this by installing `aiohttp`:\n\n```sh\n# install from PyPI\npip install openregister-sdk[aiohttp]\n```\n\nThen you can enable it by instantiating the client with `http_client=DefaultAioHttpClient()`:\n\n```python\nimport os\nimport asyncio\nfrom openregister import DefaultAioHttpClient\nfrom openregister import AsyncOpenregister\n\nasync def main() -> None:\n  async with AsyncOpenregister(\n    api_key=os.environ.get("OPENREGISTER_API_KEY"),  # This is the default and can be omitted\n    http_client=DefaultAioHttpClient(),\n) as client:\n    response = await client.company.get_details_v1(\n        company_id="DE-HRB-F1103-267645",\n    )\n    print(response.id)\n\nasyncio.run(main())\n```\n\n\n\n## Using types\n\nNested request parameters are [TypedDicts](https://docs.python.org/3/library/typing.html#typing.TypedDict). Responses are [Pydantic models](https://docs.pydantic.dev) which also provide helper methods for things like:\n\n- Serializing back into JSON, `model.to_json()`\n- Converting to a dictionary, `model.to_dict()`\n\nTyped requests and responses provide autocomplete and documentation within your editor. If you would like to see type errors in VS Code to help catch bugs earlier, set `python.analysis.typeCheckingMode` to `basic`.\n\n\n\n## Nested params\n\nNested parameters are dictionaries, typed using `TypedDict`, for example:\n\n```python\nfrom openregister import Openregister\n\nclient = Openregister()\n\ncompany_search = client.search.find_companies_v1(\n    location={\n        "latitude": 0,\n        "longitude": 0,\n    },\n)\nprint(company_search.location)\n```\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API (for example, due to network connection problems or a timeout), a subclass of `openregister.APIConnectionError` is raised.\n\nWhen the API returns a non-success status code (that is, 4xx or 5xx\nresponse), a subclass of `openregister.APIStatusError` is raised, containing `status_code` and `response` properties.\n\nAll errors inherit from `openregister.APIError`.\n\n```python\nimport openregister\nfrom openregister import Openregister\n\nclient = Openregister()\n\ntry:\n    client.company.get_details_v1(\n        company_id="DE-HRB-F1103-267645",\n    )\nexcept openregister.APIConnectionError as e:\n    print("The server could not be reached")\n    print(e.__cause__) # an underlying Exception, likely raised within httpx.\nexcept openregister.RateLimitError as e:\n    print("A 429 status code was received; we should back off a bit.")\nexcept openregister.APIStatusError as e:\n    print("Another non-200-range status code was received")\n    print(e.status_code)\n    print(e.response)\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors are automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors are all retried by default.\n\nYou can use the `max_retries` option to configure or disable retry settings:\n\n```python\nfrom openregister import Openregister\n\n# Configure the default for all requests:\nclient = Openregister(\n    # default is 2\n    max_retries=0,\n)\n\n# Or, configure per-request:\nclient.with_options(max_retries = 5).company.get_details_v1(\n    company_id="DE-HRB-F1103-267645",\n)\n```\n\n### Timeouts\n\nBy default requests time out after 3 minutes. You can configure this with a `timeout` option,\nwhich accepts a float or an [`httpx.Timeout`](https://www.python-httpx.org/advanced/timeouts/#fine-tuning-the-configuration) object:\n\n```python\nfrom openregister import Openregister\n\n# Configure the default for all requests:\nclient = Openregister(\n    # 20 seconds (default is 3 minutes)\n    timeout=20.0,\n)\n\n# More granular control:\nclient = Openregister(\n    timeout=httpx.Timeout(60.0, read=5.0, write=10.0, connect=2.0),\n)\n\n# Override per-request:\nclient.with_options(timeout = 5.0).company.get_details_v1(\n    company_id="DE-HRB-F1103-267645",\n)\n```\n\nOn timeout, an `APITimeoutError` is thrown.\n\nNote that requests that time out are [retried twice by default](#retries).\n\n\n\n## Advanced\n\n### Logging\n\nWe use the standard library [`logging`](https://docs.python.org/3/library/logging.html) module.\n\nYou can enable logging by setting the environment variable `OPENREGISTER_LOG` to `info`.\n\n```shell\n$ export OPENREGISTER_LOG=info\n```\n\nOr to `debug` for more verbose logging.\n\n### How to tell whether `None` means `null` or missing\n\nIn an API response, a field may be explicitly `null`, or missing entirely; in either case, its value is `None` in this library. You can differentiate the two cases with `.model_fields_set`:\n\n```py\nif response.my_field is None:\n  if \'my_field\' not in response.model_fields_set:\n    print(\'Got json like {}, without a "my_field" key present at all.\')\n  else:\n    print(\'Got json like {"my_field": null}.\')\n```\n\n### Accessing raw response data (e.g. headers)\n\nThe "raw" Response object can be accessed by prefixing `.with_raw_response.` to any HTTP method call, e.g.,\n\n```py\nfrom openregister import Openregister\n\nclient = Openregister()\nresponse = client.company.with_raw_response.get_details_v1(\n    company_id="DE-HRB-F1103-267645",\n)\nprint(response.headers.get(\'X-My-Header\'))\n\ncompany = response.parse()  # get the object that `company.get_details_v1()` would have returned\nprint(company.id)\n```\n\nThese methods return an [`APIResponse`](https://github.com/oregister/openregister-python/tree/main/src/openregister/_response.py) object.\n\nThe async client returns an [`AsyncAPIResponse`](https://github.com/oregister/openregister-python/tree/main/src/openregister/_response.py) with the same structure, the only difference being `await`able methods for reading the response content.\n\n#### `.with_streaming_response`\n\nThe above interface eagerly reads the full response body when you make the request, which may not always be what you want.\n\nTo stream the response body, use `.with_streaming_response` instead, which requires a context manager and only reads the response body once you call `.read()`, `.text()`, `.json()`, `.iter_bytes()`, `.iter_text()`, `.iter_lines()` or `.parse()`. In the async client, these are async methods.\n\n```python\nwith client.company.with_streaming_response.get_details_v1(\n    company_id="DE-HRB-F1103-267645",\n) as response :\n    print(response.headers.get(\'X-My-Header\'))\n\n    for line in response.iter_lines():\n      print(line)\n```\n\nThe context manager is required so that the response will reliably be closed.\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API.\n\nIf you need to access undocumented endpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can make requests using `client.get`, `client.post`, and other\nhttp verbs. Options on the client will be respected (such as retries) when making this request.\n\n```py\nimport httpx\n\nresponse = client.post(\n    "/foo",\n    cast_to=httpx.Response,\n    body={"my_param": True},\n)\n\nprint(response.headers.get("x-foo"))\n```\n\n#### Undocumented request params\n\nIf you want to explicitly send an extra param, you can do so with the `extra_query`, `extra_body`, and `extra_headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you can access the extra fields like `response.unknown_prop`. You\ncan also get all the extra fields on the Pydantic model as a dict with\n[`response.model_extra`](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_extra).\n\n### Configuring the HTTP client\n\nYou can directly override the [httpx client](https://www.python-httpx.org/api/#client) to customize it for your use case, including:\n\n- Support for [proxies](https://www.python-httpx.org/advanced/proxies/)\n- Custom [transports](https://www.python-httpx.org/advanced/transports/)\n- Additional [advanced](https://www.python-httpx.org/advanced/clients/) functionality\n\n```python\nimport httpx\nfrom openregister import Openregister, DefaultHttpxClient\n\nclient = Openregister(\n    # Or use the `OPENREGISTER_BASE_URL` env var\n    base_url="http://my.test.server.example.com:8083",\n    http_client=DefaultHttpxClient(proxy="http://my.test.proxy.example.com", transport=httpx.HTTPTransport(local_address="0.0.0.0")),\n)\n```\n\nYou can also customize the client on a per-request basis by using `with_options()`:\n\n```python\nclient.with_options(http_client=DefaultHttpxClient(...))\n```\n\n### Managing HTTP resources\n\nBy default the library closes underlying HTTP connections whenever the client is [garbage collected](https://docs.python.org/3/reference/datamodel.html#object.__del__). You can manually close the client using the `.close()` method if desired, or with a context manager that closes when exiting.\n\n```py\nfrom openregister import Openregister\n\nwith Openregister() as client:\n  # make requests here\n  ...\n\n# HTTP client is now closed\n```\n\n## Versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/oregister/openregister-python/issues) with questions, bugs, or suggestions.\n\n### Determining the installed version\n\nIf you\'ve upgraded to the latest version but aren\'t seeing any new features you were expecting then your python environment is likely still using an older version.\n\nYou can determine the version that is being used at runtime with:\n\n```py\nimport openregister\nprint(openregister.__version__)\n```\n\n## Requirements\n\nPython 3.9 or higher.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'go',
    content:
      '# Openregister Go API Library\n\n<a href="https://pkg.go.dev/github.com/oregister/openregister-go"><img src="https://pkg.go.dev/badge/github.com/oregister/openregister-go.svg" alt="Go Reference"></a>\n\nThe Openregister Go library provides convenient access to the [Openregister REST API](docs.openregister.de)\nfrom applications written in Go.\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Openregister MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=openregister-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm9wZW5yZWdpc3Rlci1tY3AiXSwiZW52Ijp7Ik9QRU5SRUdJU1RFUl9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22openregister-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22openregister-mcp%22%5D%2C%22env%22%3A%7B%22OPENREGISTER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n<!-- x-release-please-start-version -->\n\n```go\nimport (\n\t"github.com/oregister/openregister-go" // imported as SDK_PackageName\n)\n```\n\n<!-- x-release-please-end -->\n\nOr to pin the version:\n\n<!-- x-release-please-start-version -->\n\n```sh\ngo get -u \'github.com/oregister/openregister-go@v0.0.1\'\n```\n\n<!-- x-release-please-end -->\n\n## Requirements\n\nThis library requires Go 1.22+.\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n```go\npackage main\n\nimport (\n\t"context"\n\t"fmt"\n\n\t"github.com/oregister/openregister-go"\n\t"github.com/oregister/openregister-go/option"\n)\n\nfunc main() {\n\tclient := openregister.NewClient(\n\t\toption.WithAPIKey("My API Key"), // defaults to os.LookupEnv("OPENREGISTER_API_KEY")\n\t)\n\tresponse, err := client.Company.GetDetailsV1(\n\t\tcontext.TODO(),\n\t\t"DE-HRB-F1103-267645",\n\t\topenregister.CompanyGetDetailsV1Params{},\n\t)\n\tif err != nil {\n\t\tpanic(err.Error())\n\t}\n\tfmt.Printf("%+v\\n", response.ID)\n}\n\n```\n\n### Request fields\n\nAll request parameters are wrapped in a generic `Field` type,\nwhich we use to distinguish zero values from null or omitted fields.\n\nThis prevents accidentally sending a zero value if you forget a required parameter,\nand enables explicitly sending `null`, `false`, `\'\'`, or `0` on optional parameters.\nAny field not specified is not sent.\n\nTo construct fields with values, use the helpers `String()`, `Int()`, `Float()`, or most commonly, the generic `F[T]()`.\nTo send a null, use `Null[T]()`, and to send a nonconforming value, use `Raw[T](any)`. For example:\n\n```go\nparams := FooParams{\n\tName: SDK_PackageName.F("hello"),\n\n\t// Explicitly send `"description": null`\n\tDescription: SDK_PackageName.Null[string](),\n\n\tPoint: SDK_PackageName.F(SDK_PackageName.Point{\n\t\tX: SDK_PackageName.Int(0),\n\t\tY: SDK_PackageName.Int(1),\n\n\t\t// In cases where the API specifies a given type,\n\t\t// but you want to send something else, use `Raw`:\n\t\tZ: SDK_PackageName.Raw[int64](0.01), // sends a float\n\t}),\n}\n```\n\n### Response objects\n\nAll fields in response structs are value types (not pointers or wrappers).\n\nIf a given field is `null`, not present, or invalid, the corresponding field\nwill simply be its zero value.\n\nAll response structs also include a special `JSON` field, containing more detailed\ninformation about each property, which you can use like so:\n\n```go\nif res.Name == "" {\n\t// true if `"name"` is either not present or explicitly null\n\tres.JSON.Name.IsNull()\n\n\t// true if the `"name"` key was not present in the response JSON at all\n\tres.JSON.Name.IsMissing()\n\n\t// When the API returns data that cannot be coerced to the expected type:\n\tif res.JSON.Name.IsInvalid() {\n\t\traw := res.JSON.Name.Raw()\n\n\t\tlegacyName := struct{\n\t\t\tFirst string `json:"first"`\n\t\t\tLast  string `json:"last"`\n\t\t}{}\n\t\tjson.Unmarshal([]byte(raw), &legacyName)\n\t\tname = legacyName.First + " " + legacyName.Last\n\t}\n}\n```\n\nThese `.JSON` structs also include an `Extras` map containing\nany properties in the json response that were not specified\nin the struct. This can be useful for API features not yet\npresent in the SDK.\n\n```go\nbody := res.JSON.ExtraFields["my_unexpected_field"].Raw()\n```\n\n### RequestOptions\n\nThis library uses the functional options pattern. Functions defined in the\n`SDK_PackageOptionName` package return a `RequestOption`, which is a closure that mutates a\n`RequestConfig`. These options can be supplied to the client or at individual\nrequests. For example:\n\n```go\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\t// Adds a header to every request made by the client\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "custom_header_info"),\n)\n\nclient.Company.GetDetailsV1(context.TODO(), ...,\n\t// Override the header\n\tSDK_PackageOptionName.WithHeader("X-Some-Header", "some_other_custom_header_info"),\n\t// Add an undocumented field to the request body, using sjson syntax\n\tSDK_PackageOptionName.WithJSONSet("some.json.path", map[string]string{"my": "object"}),\n)\n```\n\nSee the [full list of request options](https://pkg.go.dev/github.com/oregister/openregister-go/SDK_PackageOptionName).\n\n### Pagination\n\nThis library provides some conveniences for working with paginated list endpoints.\n\nYou can use `.ListAutoPaging()` methods to iterate through items across all pages:\n\n\n\nOr you can use simple `.List()` methods to fetch a single page and receive a standard response object\nwith additional helper methods like `.GetNextPage()`, e.g.:\n\n\n\n### Errors\n\nWhen the API returns a non-success status code, we return an error with type\n`*SDK_PackageName.Error`. This contains the `StatusCode`, `*http.Request`, and\n`*http.Response` values of the request, as well as the JSON of the error body\n(much like other response objects in the SDK).\n\nTo handle errors, we recommend that you use the `errors.As` pattern:\n\n```go\n_, err := client.Company.GetDetailsV1(\n\tcontext.TODO(),\n\t"DE-HRB-F1103-267645",\n\topenregister.CompanyGetDetailsV1Params{},\n)\nif err != nil {\n\tvar apierr *openregister.Error\n\tif errors.As(err, &apierr) {\n\t\tprintln(string(apierr.DumpRequest(true)))  // Prints the serialized HTTP request\n\t\tprintln(string(apierr.DumpResponse(true))) // Prints the serialized HTTP response\n\t}\n\tpanic(err.Error()) // GET "/v1/company/{company_id}": 400 Bad Request { ... }\n}\n```\n\nWhen other errors occur, they are returned unwrapped; for example,\nif HTTP transport fails, you might receive `*url.Error` wrapping `*net.OpError`.\n\n### Timeouts\n\nRequests do not time out by default; use context to configure a timeout for a request lifecycle.\n\nNote that if a request is [retried](#retries), the context timeout does not start over.\nTo set a per-retry timeout, use `SDK_PackageOptionName.WithRequestTimeout()`.\n\n```go\n// This sets the timeout for the request, including all the retries.\nctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)\ndefer cancel()\nclient.Company.GetDetailsV1(\n\tctx,\n\t"DE-HRB-F1103-267645",\n\topenregister.CompanyGetDetailsV1Params{},\n\t// This sets the per-retry timeout\n\toption.WithRequestTimeout(20*time.Second),\n)\n```\n\n### File uploads\n\nRequest parameters that correspond to file uploads in multipart requests are typed as\n`param.Field[io.Reader]`. The contents of the `io.Reader` will by default be sent as a multipart form\npart with the file name of "anonymous_file" and content-type of "application/octet-stream".\n\nThe file name and content-type can be customized by implementing `Name() string` or `ContentType()\nstring` on the run-time type of `io.Reader`. Note that `os.File` implements `Name() string`, so a\nfile returned by `os.Open` will be sent with the file name on disk.\n\nWe also provide a helper `SDK_PackageName.FileParam(reader io.Reader, filename string, contentType string)`\nwhich can be used to wrap any `io.Reader` with the appropriate file name and content type.\n\n\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nWe retry by default all connection errors, 408 Request Timeout, 409 Conflict, 429 Rate Limit,\nand >=500 Internal errors.\n\nYou can use the `WithMaxRetries` option to configure or disable this:\n\n```go\n// Configure the default for all requests:\nclient := openregister.NewClient(\n\toption.WithMaxRetries(0), // default is 2\n)\n\n// Override per-request:\nclient.Company.GetDetailsV1(\n\tcontext.TODO(),\n\t"DE-HRB-F1103-267645",\n\topenregister.CompanyGetDetailsV1Params{},\n\toption.WithMaxRetries(5),\n)\n```\n\n\n### Accessing raw response data (e.g. response headers)\n\nYou can access the raw HTTP response data by using the `option.WithResponseInto()` request option. This is useful when\nyou need to examine response headers, status codes, or other details.\n\n```go\n// Create a variable to store the HTTP response\nvar response *http.Response\nresponse, err := client.Company.GetDetailsV1(\n\tcontext.TODO(),\n\t"DE-HRB-F1103-267645",\n\topenregister.CompanyGetDetailsV1Params{},\n\toption.WithResponseInto(&response),\n)\nif err != nil {\n\t// handle error\n}\nfmt.Printf("%+v\\n", response)\n\nfmt.Printf("Status Code: %d\\n", response.StatusCode)\nfmt.Printf("Headers: %+#v\\n", response.Header)\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.Get`, `client.Post`, and other HTTP verbs.\n`RequestOptions` on the client, such as retries, will be respected when making these requests.\n\n```go\nvar (\n    // params can be an io.Reader, a []byte, an encoding/json serializable object,\n    // or a "…Params" struct defined in this library.\n    params map[string]interface{}\n\n    // result can be an []byte, *http.Response, a encoding/json deserializable object,\n    // or a model defined in this library.\n    result *http.Response\n)\nerr := client.Post(context.Background(), "/unspecified", params, &result)\nif err != nil {\n    …\n}\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use either the `SDK_PackageOptionName.WithQuerySet()`\nor the `SDK_PackageOptionName.WithJSONSet()` methods.\n\n```go\nparams := FooNewParams{\n    ID:   SDK_PackageName.F("id_xxxx"),\n    Data: SDK_PackageName.F(FooNewParamsData{\n        FirstName: SDK_PackageName.F("John"),\n    }),\n}\nclient.Foo.New(context.Background(), params, SDK_PackageOptionName.WithJSONSet("data.last_name", "Doe"))\n```\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may either access the raw JSON of the response as a string\nwith `result.JSON.RawJSON()`, or get the raw JSON of a particular field on the result with\n`result.JSON.Foo.Raw()`.\n\nAny fields that are not present on the response struct will be saved and can be accessed by `result.JSON.ExtraFields()` which returns the extra fields as a `map[string]Field`.\n\n### Middleware\n\nWe provide `SDK_PackageOptionName.WithMiddleware` which applies the given\nmiddleware to requests.\n\n```go\nfunc Logger(req *http.Request, next SDK_PackageOptionName.MiddlewareNext) (res *http.Response, err error) {\n\t// Before the request\n\tstart := time.Now()\n\tLogReq(req)\n\n\t// Forward the request to the next handler\n\tres, err = next(req)\n\n\t// Handle stuff after the request\n\tend := time.Now()\n\tLogRes(res, err, start - end)\n\n    return res, err\n}\n\nclient := SDK_PackageName.SDK_ClientInitializerName(\n\tSDK_PackageOptionName.WithMiddleware(Logger),\n)\n```\n\nWhen multiple middlewares are provided as variadic arguments, the middlewares\nare applied left to right. If `SDK_PackageOptionName.WithMiddleware` is given\nmultiple times, for example first in the client then the method, the\nmiddleware in the client will run first and the middleware given in the method\nwill run next.\n\nYou may also replace the default `http.Client` with\n`SDK_PackageOptionName.WithHTTPClient(client)`. Only one http client is\naccepted (this overwrites any previous client) and receives requests after any\nmiddleware has been applied.\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/oregister/openregister-go/issues) with questions, bugs, or suggestions.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n',
  },
  {
    language: 'typescript',
    content:
      "# Openregister TypeScript API Library\n\n[![NPM version](https://img.shields.io/npm/v/openregister.svg?label=npm%20(stable))](https://npmjs.org/package/openregister) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/openregister)\n\nThis library provides convenient access to the Openregister REST API from server-side TypeScript or JavaScript.\n\n\n\nThe full API of this library can be found in [api.md](api.md).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Openregister MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=openregister-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm9wZW5yZWdpc3Rlci1tY3AiXSwiZW52Ijp7Ik9QRU5SRUdJU1RFUl9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22openregister-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22openregister-mcp%22%5D%2C%22env%22%3A%7B%22OPENREGISTER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\n## Installation\n\n```sh\nnpm install openregister\n```\n\n\n\n## Usage\n\nThe full API of this library can be found in [api.md](api.md).\n\n<!-- prettier-ignore -->\n```js\nimport Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response = await client.company.getDetailsV1('DE-HRB-F1103-267645');\n\nconsole.log(response.id);\n```\n\n\n\n### Request & Response types\n\nThis library includes TypeScript definitions for all request params and response fields. You may import and use them like so:\n\n<!-- prettier-ignore -->\n```ts\nimport Openregister from 'openregister';\n\nconst client = new Openregister({\n  apiKey: process.env['OPENREGISTER_API_KEY'], // This is the default and can be omitted\n});\n\nconst response: Openregister.CompanyGetDetailsV1Response = await client.company.getDetailsV1(\n  'DE-HRB-F1103-267645',\n);\n```\n\nDocumentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.\n\n\n\n\n\n## Handling errors\n\nWhen the library is unable to connect to the API,\nor if the API returns a non-success status code (i.e., 4xx or 5xx response),\na subclass of `APIError` will be thrown:\n\n<!-- prettier-ignore -->\n```ts\nconst response = await client.company.getDetailsV1('DE-HRB-F1103-267645').catch(async (err) => {\n  if (err instanceof Openregister.APIError) {\n    console.log(err.status); // 400\n    console.log(err.name); // BadRequestError\n    console.log(err.headers); // {server: 'nginx', ...}\n  } else {\n    throw err;\n  }\n});\n```\n\nError codes are as follows:\n\n| Status Code | Error Type                 |\n| ----------- | -------------------------- |\n| 400         | `BadRequestError`          |\n| 401         | `AuthenticationError`      |\n| 403         | `PermissionDeniedError`    |\n| 404         | `NotFoundError`            |\n| 422         | `UnprocessableEntityError` |\n| 429         | `RateLimitError`           |\n| >=500       | `InternalServerError`      |\n| N/A         | `APIConnectionError`       |\n\n### Retries\n\nCertain errors will be automatically retried 2 times by default, with a short exponential backoff.\nConnection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,\n429 Rate Limit, and >=500 Internal errors will all be retried by default.\n\nYou can use the `maxRetries` option to configure or disable this:\n\n<!-- prettier-ignore -->\n```js\n// Configure the default for all requests:\nconst client = new Openregister({\n  maxRetries: 0, // default is 2\n});\n\n// Or, configure per-request:\nawait client.company.getDetailsV1('DE-HRB-F1103-267645', {\n  maxRetries: 5,\n});\n```\n\n### Timeouts\n\nRequests time out after 3 minutes by default. You can configure this with a `timeout` option:\n\n<!-- prettier-ignore -->\n```ts\n// Configure the default for all requests:\nconst client = new Openregister({\n  timeout: 20 * 1000, // 20 seconds (default is 3 minutes)\n});\n\n// Override per-request:\nawait client.company.getDetailsV1('DE-HRB-F1103-267645', {\n  timeout: 5 * 1000,\n});\n```\n\nOn timeout, an `APIConnectionTimeoutError` is thrown.\n\nNote that requests which time out will be [retried twice by default](#retries).\n\n\n\n\n\n## Advanced Usage\n\n### Accessing raw Response data (e.g., headers)\n\nThe \"raw\" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.\nThis method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.\n\nYou can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.\nUnlike `.asResponse()` this method consumes the body, returning once it is parsed.\n\n<!-- prettier-ignore -->\n```ts\nconst client = new Openregister();\n\nconst response = await client.company.getDetailsV1('DE-HRB-F1103-267645').asResponse();\nconsole.log(response.headers.get('X-My-Header'));\nconsole.log(response.statusText); // access the underlying Response object\n\nconst { data: response, response: raw } = await client.company\n  .getDetailsV1('DE-HRB-F1103-267645')\n  .withResponse();\nconsole.log(raw.headers.get('X-My-Header'));\nconsole.log(response.id);\n```\n\n### Logging\n\n> [!IMPORTANT]\n> All log messages are intended for debugging only. The format and content of log messages\n> may change between releases.\n\n#### Log levels\n\nThe log level can be configured in two ways:\n\n1. Via the `OPENREGISTER_LOG` environment variable\n2. Using the `logLevel` client option (overrides the environment variable if set)\n\n```ts\nimport Openregister from 'openregister';\n\nconst client = new Openregister({\n  logLevel: 'debug', // Show all log messages\n});\n```\n\nAvailable log levels, from most to least verbose:\n\n- `'debug'` - Show debug messages, info, warnings, and errors\n- `'info'` - Show info messages, warnings, and errors\n- `'warn'` - Show warnings and errors (default)\n- `'error'` - Show only errors\n- `'off'` - Disable all logging\n\nAt the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.\nSome authentication-related headers are redacted, but sensitive data in request and response bodies\nmay still be visible.\n\n#### Custom logger\n\nBy default, this library logs to `globalThis.console`. You can also provide a custom logger.\nMost logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.\n\nWhen providing a custom logger, the `logLevel` option still controls which messages are emitted, messages\nbelow the configured level will not be sent to your logger.\n\n```ts\nimport Openregister from 'openregister';\nimport pino from 'pino';\n\nconst logger = pino();\n\nconst client = new Openregister({\n  logger: logger.child({ name: 'Openregister' }),\n  logLevel: 'debug', // Send all messages to pino, allowing it to filter\n});\n```\n\n### Making custom/undocumented requests\n\nThis library is typed for convenient access to the documented API. If you need to access undocumented\nendpoints, params, or response properties, the library can still be used.\n\n#### Undocumented endpoints\n\nTo make requests to undocumented endpoints, you can use `client.get`, `client.post`, and other HTTP verbs.\nOptions on the client, such as retries, will be respected when making these requests.\n\n```ts\nawait client.post('/some/path', {\n  body: { some_prop: 'foo' },\n  query: { some_query_arg: 'bar' },\n});\n```\n\n#### Undocumented request params\n\nTo make requests using undocumented parameters, you may use `// @ts-expect-error` on the undocumented\nparameter. This library doesn't validate at runtime that the request matches the type, so any extra values you\nsend will be sent as-is.\n\n```ts\nclient.company.getDetailsV1({\n  // ...\n  // @ts-expect-error baz is not yet public\n  baz: 'undocumented option',\n});\n```\n\nFor requests with the `GET` verb, any extra params will be in the query, all other requests will send the\nextra param in the body.\n\nIf you want to explicitly send an extra argument, you can do so with the `query`, `body`, and `headers` request\noptions.\n\n#### Undocumented response properties\n\nTo access undocumented response properties, you may access the response object with `// @ts-expect-error` on\nthe response object, or cast the response object to the requisite type. Like the request params, we do not\nvalidate or strip extra properties from the response from the API.\n\n### Customizing the fetch client\n\nBy default, this library expects a global `fetch` function is defined.\n\nIf you want to use a different `fetch` function, you can either polyfill the global:\n\n```ts\nimport fetch from 'my-fetch';\n\nglobalThis.fetch = fetch;\n```\n\nOr pass it to the client:\n\n```ts\nimport Openregister from 'openregister';\nimport fetch from 'my-fetch';\n\nconst client = new Openregister({ fetch });\n```\n\n### Fetch options\n\nIf you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)\n\n```ts\nimport Openregister from 'openregister';\n\nconst client = new Openregister({\n  fetchOptions: {\n    // `RequestInit` options\n  },\n});\n```\n\n#### Configuring proxies\n\nTo modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy\noptions to requests:\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg\" align=\"top\" width=\"18\" height=\"21\"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>\n\n```ts\nimport Openregister from 'openregister';\nimport * as undici from 'undici';\n\nconst proxyAgent = new undici.ProxyAgent('http://localhost:8888');\nconst client = new Openregister({\n  fetchOptions: {\n    dispatcher: proxyAgent,\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg\" align=\"top\" width=\"18\" height=\"21\"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>\n\n```ts\nimport Openregister from 'openregister';\n\nconst client = new Openregister({\n  fetchOptions: {\n    proxy: 'http://localhost:8888',\n  },\n});\n```\n\n<img src=\"https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg\" align=\"top\" width=\"18\" height=\"21\"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>\n\n```ts\nimport Openregister from 'npm:openregister';\n\nconst httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });\nconst client = new Openregister({\n  fetchOptions: {\n    client: httpClient,\n  },\n});\n```\n\n## Frequently Asked Questions\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes that only affect static types, without breaking runtime behavior.\n2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n3. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/oregister/openregister-typescript/issues) with questions, bugs, or suggestions.\n\n## Requirements\n\nTypeScript >= 4.9 is supported.\n\nThe following runtimes are supported:\n\n- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)\n- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.\n- Deno v1.28.0 or higher.\n- Bun 1.0 or later.\n- Cloudflare Workers.\n- Vercel Edge Runtime.\n- Jest 28 or greater with the `\"node\"` environment (`\"jsdom\"` is not supported at this time).\n- Nitro v2.6 or greater.\n\nNote that React Native is not supported at this time.\n\nIf you are interested in other runtime environments, please open or upvote an issue on GitHub.\n\n## Contributing\n\nSee [the contributing documentation](./CONTRIBUTING.md).\n",
  },
  {
    language: 'java',
    content:
      '# Openregister Java API Library\n\n\n[![Maven Central](https://img.shields.io/maven-central/v/com.openregister.api/openregister-java)](https://central.sonatype.com/artifact/com.openregister.api/openregister-java/0.0.1)\n[![javadoc](https://javadoc.io/badge2/com.openregister.api/openregister-java/0.0.1/javadoc.svg)](https://javadoc.io/doc/com.openregister.api/openregister-java/0.0.1)\n\n\nThe Openregister Java SDK provides convenient access to the [Openregister REST API](docs.openregister.de)   from applications written in Java.\n\n\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n## MCP Server\n\nUse the Openregister MCP Server to enable AI assistants to interact with this API, allowing them to explore endpoints, make test requests, and use documentation to help integrate this SDK into your application.\n\n[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=openregister-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIm9wZW5yZWdpc3Rlci1tY3AiXSwiZW52Ijp7Ik9QRU5SRUdJU1RFUl9BUElfS0VZIjoiTXkgQVBJIEtleSJ9fQ)\n[![Install in VS Code](https://img.shields.io/badge/_-Add_to_VS_Code-blue?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0MCA0MCI+PHBhdGggZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzAuMjM1IDM5Ljg4NGEyLjQ5MSAyLjQ5MSAwIDAgMS0xLjc4MS0uNzNMMTIuNyAyNC43OGwtMy40NiAyLjYyNC0zLjQwNiAyLjU4MmExLjY2NSAxLjY2NSAwIDAgMS0xLjA4Mi4zMzggMS42NjQgMS42NjQgMCAwIDEtMS4wNDYtLjQzMWwtMi4yLTJhMS42NjYgMS42NjYgMCAwIDEgMC0yLjQ2M0w3LjQ1OCAyMCA0LjY3IDE3LjQ1MyAxLjUwNyAxNC41N2ExLjY2NSAxLjY2NSAwIDAgMSAwLTIuNDYzbDIuMi0yYTEuNjY1IDEuNjY1IDAgMCAxIDIuMTMtLjA5N2w2Ljg2MyA1LjIwOUwyOC40NTIuODQ0YTIuNDg4IDIuNDg4IDAgMCAxIDEuODQxLS43MjljLjM1MS4wMDkuNjk5LjA5MSAxLjAxOS4yNDVsOC4yMzYgMy45NjFhMi41IDIuNSAwIDAgMSAxLjQxNSAyLjI1M3YuMDk5LS4wNDVWMzMuMzd2LS4wNDUuMDk1YTIuNTAxIDIuNTAxIDAgMCAxLTEuNDE2IDIuMjU3bC04LjIzNSAzLjk2MWEyLjQ5MiAyLjQ5MiAwIDAgMS0xLjA3Ny4yNDZabS43MTYtMjguOTQ3LTExLjk0OCA5LjA2MiAxMS45NTIgOS4wNjUtLjAwNC0xOC4xMjdaIi8+PC9zdmc+)](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22openregister-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22openregister-mcp%22%5D%2C%22env%22%3A%7B%22OPENREGISTER_API_KEY%22%3A%22My%20API%20Key%22%7D%7D)\n\n> Note: You may need to set environment variables in your MCP client.\n\nJavadocs are available on [javadoc.io](https://javadoc.io/doc/com.openregister.api/openregister-java/0.0.1).\n\n## Installation\n\n### Gradle\n\n~~~kotlin\nimplementation("com.openregister.api:openregister-java:0.0.1")\n~~~\n\n### Maven\n\n~~~xml\n<dependency>\n  <groupId>com.openregister.api</groupId>\n  <artifactId>openregister-java</artifactId>\n  <version>0.0.1</version>\n</dependency>\n~~~\n\n## Requirements\n\nThis library requires Java 8 or later.\n\n## Usage\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\n// Configures using the `openregister.apiKey` and `openregister.baseUrl` system properties\n// Or configures using the `OPENREGISTER_API_KEY` and `OPENREGISTER_BASE_URL` environment variables\nOpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\nCompanyGetDetailsV1Response response = client.company().getDetailsV1("DE-HRB-F1103-267645");\n```\n\n## Client configuration\n\nConfigure the client using system properties or environment variables:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\n\n// Configures using the `openregister.apiKey` and `openregister.baseUrl` system properties\n// Or configures using the `OPENREGISTER_API_KEY` and `OPENREGISTER_BASE_URL` environment variables\nOpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n```\n\nOr manually:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .apiKey("My API Key")\n    .build();\n```\n\nOr using a combination of the two approaches:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    // Configures using the `openregister.apiKey` and `openregister.baseUrl` system properties\n    // Or configures using the `OPENREGISTER_API_KEY` and `OPENREGISTER_BASE_URL` environment variables\n    .fromEnv()\n    .apiKey("My API Key")\n    .build();\n```\n\nSee this table for the available options:\n\n| Setter    | System property        | Environment variable    | Required | Default value                   |\n| --------- | ---------------------- | ----------------------- | -------- | ------------------------------- |\n| `apiKey`  | `openregister.apiKey`  | `OPENREGISTER_API_KEY`  | true     | -                               |\n| `baseUrl` | `openregister.baseUrl` | `OPENREGISTER_BASE_URL` | true     | `"https://api.openregister.de"` |\n\nSystem properties take precedence over environment variables.\n\n> [!TIP]\n> Don\'t create more than one client in the same application. Each client has a connection pool and\n> thread pools, which are more efficient to share between requests.\n\n### Modifying configuration\n\nTo temporarily use a modified client configuration, while reusing the same connection and thread       pools, call `withOptions()` on any client or service:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\n\nOpenregisterClient clientWithOptions = client.withOptions(optionsBuilder -> {\n    optionsBuilder.baseUrl("https://example.com");\n    optionsBuilder.maxRetries(42);\n});\n```\n\nThe `withOptions()` method does not affect the original client or service.\n\n## Requests and responses\n\nTo send a request to the Openregister API, build an instance of some `Params` class and pass it to the     corresponding client method. When the response is received, it will be deserialized into an instance of     a Java class.\n\nFor example, `client.company().getDetailsV1(...)` should be called with an instance of `CompanyGetDetailsV1Params`, and it     will return an instance of `CompanyGetDetailsV1Response`.\n\n## Immutability\n\nEach class in the SDK has an associated   [builder](https://blogs.oracle.com/javamagazine/post/exploring-joshua-blochs-builder-design-pattern-in-java)   or factory method for constructing it.\n\nEach class is [immutable](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html)   once constructed. If the class has an associated builder, then it has a `toBuilder()` method, which can   be used to convert it back to a builder for making a modified copy.\n\nBecause each class is immutable, builder modification will _never_ affect already built class instances.\n\n## Asynchronous execution\n\nThe default client is synchronous. To switch to asynchronous execution, call the `async()` method:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `openregister.apiKey` and `openregister.baseUrl` system properties\n// Or configures using the `OPENREGISTER_API_KEY` and `OPENREGISTER_BASE_URL` environment variables\nOpenregisterClient client = OpenregisterOkHttpClient.fromEnv();\n\nCompletableFuture<CompanyGetDetailsV1Response> response = client.async().company().getDetailsV1("DE-HRB-F1103-267645");\n```\n\nOr create an asynchronous client from the beginning:\n\n```java\nimport com.openregister.api.client.OpenregisterClientAsync;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClientAsync;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\nimport java.util.concurrent.CompletableFuture;\n\n// Configures using the `openregister.apiKey` and `openregister.baseUrl` system properties\n// Or configures using the `OPENREGISTER_API_KEY` and `OPENREGISTER_BASE_URL` environment variables\nOpenregisterClientAsync client = OpenregisterOkHttpClientAsync.fromEnv();\n\nCompletableFuture<CompanyGetDetailsV1Response> response = client.company().getDetailsV1("DE-HRB-F1103-267645");\n```\n\nThe asynchronous client supports the same options as the synchronous one, except most methods return `CompletableFuture`s.\n\n\n\n\n\n\n\n## Raw responses\n\nThe SDK defines methods that deserialize responses into instances of Java classes.       However, these methods don\'t provide access to the response headers, status code, or the raw response       body.\n\nTo access this data, prefix any HTTP method call on a client or service with `withRawResponse()`:\n\n```java\nimport com.openregister.api.core.http.Headers;\nimport com.openregister.api.core.http.HttpResponseFor;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\nHttpResponseFor<CompanyGetDetailsV1Response> response = client.company().withRawResponse().getDetailsV1("DE-HRB-F1103-267645");\n\nint statusCode = response.statusCode();\nHeaders headers = response.headers();\n```\n\nYou can still deserialize the response into an instance of a Java class if needed:\n\n```java\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\nCompanyGetDetailsV1Response parsedResponse = response.parse();\n```\n\n## Error handling\n\nThe SDK throws custom unchecked exception types:\n\n- [`OpenregisterServiceException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/OpenregisterServiceException.kt): Base class for HTTP errors. See this table for which exception       subclass is thrown for each HTTP status code:\n\n  | Status | Exception                                          |\n  | ------ | -------------------------------------------------- |\n  | 400    | [`BadRequestException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/BadRequestException.kt)           |\n  | 401    | [`UnauthorizedException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/UnauthorizedException.kt)         |\n  | 403    | [`PermissionDeniedException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/PermissionDeniedException.kt)     |\n  | 404    | [`NotFoundException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/NotFoundException.kt)             |\n  | 422    | [`UnprocessableEntityException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/UnprocessableEntityException.kt)  |\n  | 429    | [`RateLimitException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/RateLimitException.kt)            |\n  | 5xx    | [`InternalServerException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/InternalServerException.kt)       |\n  | others | [`UnexpectedStatusCodeException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/UnexpectedStatusCodeException.kt) |\n\n- [`OpenregisterIoException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/OpenregisterIoException.kt): I/O networking errors.\n\n- [`OpenregisterRetryableException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/OpenregisterRetryableException.kt): Generic error indicating a failure that could be retried by the client.\n\n- [`OpenregisterInvalidDataException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/OpenregisterInvalidDataException.kt): Failure to interpret successfully parsed data. For example,       when accessing a property that\'s supposed to be required, but the API unexpectedly omitted it from the       response.\n\n- [`OpenregisterException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/OpenregisterException.kt): Base class for all exceptions. Most errors will result in one of the       previously mentioned ones, but completely generic errors may be thrown using the base class.\n\n\n\n## Logging\n\nThe SDK uses the standard   [OkHttp logging interceptor](https://github.com/square/okhttp/tree/master/okhttp-logging-interceptor).\n\nEnable logging by setting the `OPENREGISTER_LOG` environment variable to   `info`:\n\n```sh\nexport OPENREGISTER_LOG=info\n```\n\nOr to `debug` for more verbose logging:\n\n```sh\nexport OPENREGISTER_LOG=debug\n```\n\n## ProGuard and R8\n\nAlthough the SDK uses reflection, it is still usable with     [ProGuard](https://github.com/Guardsquare/proguard) and     [R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization) because     `openregister-java-core` is published with a     [configuration file](openregister-java-core/src/main/resources/META-INF/proguard/openregister-java-core.pro) containing     [keep rules](https://www.guardsquare.com/manual/configuration/usage).\n\nProGuard and R8 should automatically detect and use the published rules, but you can also manually copy     the keep rules if necessary.\n\n\n\n\n\n## Jackson\n\nThe SDK depends on [Jackson](https://github.com/FasterXML/jackson) for JSON     serialization/deserialization. It is compatible with version 2.13.4 or higher,     but depends on version 2.18.2 by default.\n\nThe SDK throws an exception if it detects an incompatible Jackson version at runtime (e.g. if the     default version was overridden in your Maven or Gradle config).\n\nIf the SDK threw an exception, but you\'re _certain_ the version is compatible, then disable the version     check using the `checkJacksonVersionCompatibility` on [`OpenregisterOkHttpClient`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClient.kt) or     [`OpenregisterOkHttpClientAsync`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClientAsync.kt).\n\n> [!CAUTION]\n> We make no guarantee that the SDK works correctly when the Jackson version check is disabled.\n\nAlso note that there are bugs in older Jackson versions that can affect the SDK. We don\'t work around all     Jackson bugs ([example](https://github.com/FasterXML/jackson-databind/issues/3240)) and expect users to     upgrade Jackson for those instead.\n\n## Network options\n\n### Retries\n\nThe SDK automatically retries 2 times by default, with a short exponential backoff between requests.\n\nOnly the following error types are retried:\n- Connection errors (for example, due to a network connectivity problem)\n- 408 Request Timeout\n- 409 Conflict\n- 429 Rate Limit\n- 5xx Internal\n\nThe API may also explicitly instruct the SDK to retry or not retry a request.\n\nTo set a custom number of retries, configure the client using the `maxRetries` method:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .fromEnv()\n    .maxRetries(4)\n    .build();\n```\n\n### Timeouts\n\nRequests time out after 3 minutes by default.\n\nTo set a custom timeout, configure the method call using the `timeout` method:\n\n```java\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\nCompanyGetDetailsV1Response response = client.company().getDetailsV1(RequestOptions.builder().timeout(Duration.ofSeconds(30)).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport java.time.Duration;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .fromEnv()\n    .timeout(Duration.ofSeconds(30))\n    .build();\n```\n\n### Proxies\n\nTo route requests through a proxy, configure the client using the `proxy` method:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport java.net.InetSocketAddress;\nimport java.net.Proxy;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .fromEnv()\n    .proxy(new Proxy(\n      Proxy.Type.HTTP, new InetSocketAddress(\n        "https://example.com", 8080\n      )\n    ))\n    .build();\n```\n\n### Connection pooling\n\nTo customize the underlying OkHttp connection pool, configure the client using the   `maxIdleConnections` and `keepAliveDuration` methods:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\nimport java.time.Duration;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .fromEnv()\n    // If `maxIdleConnections` is set, then `keepAliveDuration` must be set, and vice versa.\n    .maxIdleConnections(10)\n    .keepAliveDuration(Duration.ofMinutes(2))\n    .build();\n```\n\nIf both options are unset, OkHttp\'s default connection pool settings are used.\n\n### HTTPS\n\n> [!NOTE]\n> Most applications should not call these methods, and instead use the system defaults. The defaults include\n> special optimizations that can be lost if the implementations are modified.\n\nTo configure how HTTPS connections are secured, configure the client using the `sslSocketFactory`,   `trustManager`, and `hostnameVerifier` methods:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .fromEnv()\n    // If `sslSocketFactory` is set, then `trustManager` must be set, and vice versa.\n    .sslSocketFactory(yourSSLSocketFactory)\n    .trustManager(yourTrustManager)\n    .hostnameVerifier(yourHostnameVerifier)\n    .build();\n```\n\n\n\n### Custom HTTP client\n\nThe SDK consists of three artifacts:\n- `openregister-java-core`\n  - Contains core SDK logic\n  - Does not depend on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`OpenregisterClient`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClient.kt), [`OpenregisterClientAsync`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientAsync.kt),             [`OpenregisterClientImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientImpl.kt), and [`OpenregisterClientAsyncImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientAsyncImpl.kt), all of which can             work with any HTTP client\n- `openregister-java-client-okhttp`\n  - Depends on [OkHttp](https://square.github.io/okhttp)\n  - Exposes [`OpenregisterOkHttpClient`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClient.kt) and [`OpenregisterOkHttpClientAsync`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClientAsync.kt), which             provide a way to construct [`OpenregisterClientImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientImpl.kt) and             [`OpenregisterClientAsyncImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientAsyncImpl.kt), respectively, using OkHttp\n- `openregister-java`\n  - Depends on and exposes the APIs of both `openregister-java-core` and `openregister-java-client-okhttp`\n  - Does not have its own logic\n\nThis structure allows replacing the SDK\'s default HTTP client without pulling in unnecessary dependencies.\n\n#### Customized [`OkHttpClient`](https://square.github.io/okhttp/3.x/okhttp/okhttp3/OkHttpClient.html)\n\n> [!TIP]\n> Try the available [network options](#network-options) before replacing the default client.\n\nTo use a customized `OkHttpClient`:\n\n1. Replace your [`openregister-java` dependency](#installation) with `openregister-java-core`\n2. Copy `openregister-java-client-okhttp`\'s [`OkHttpClient`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OkHttpClient.kt) class into your code and        customize it\n3. Construct [`OpenregisterClientImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientImpl.kt) or [`OpenregisterClientAsyncImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientAsyncImpl.kt), similarly to        [`OpenregisterOkHttpClient`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClient.kt) or [`OpenregisterOkHttpClientAsync`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClientAsync.kt), using your        customized client\n\n### Completely custom HTTP client\n\nTo use a completely custom HTTP client:\n\n1. Replace your [`openregister-java` dependency](#installation) with `openregister-java-core`\n2. Write a class that implements the [`HttpClient`](openregister-java-core/src/main/kotlin/com/openregister/api/core/http/HttpClient.kt) interface\n3. Construct [`OpenregisterClientImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientImpl.kt) or [`OpenregisterClientAsyncImpl`](openregister-java-core/src/main/kotlin/com/openregister/api/client/OpenregisterClientAsyncImpl.kt), similarly to        [`OpenregisterOkHttpClient`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClient.kt) or [`OpenregisterOkHttpClientAsync`](openregister-java-client-okhttp/src/main/kotlin/com/openregister/api/client/okhttp/OpenregisterOkHttpClientAsync.kt), using your new        client class\n\n## Undocumented API functionality\n\nThe SDK is typed for convenient usage of the documented API. However, it also supports working with undocumented or not yet supported parts of the API.\n\n### Parameters\n\nTo set undocumented parameters, call the `putAdditionalHeader`, `putAdditionalQueryParam`, or       `putAdditionalBodyProperty` methods on any `Params` class:\n\n```java\nimport com.openregister.api.core.JsonValue;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\n\nCompanyGetDetailsV1Params params = CompanyGetDetailsV1Params.builder()\n    .putAdditionalHeader("Secret-Header", "42")\n    .putAdditionalQueryParam("secret_query_param", "42")\n    .putAdditionalBodyProperty("secretProperty", JsonValue.from("42"))\n    .build();\n```\n\nThese can be accessed on the built object later using the `_additionalHeaders()`,       `_additionalQueryParams()`, and `_additionalBodyProperties()` methods.\n\nTo set undocumented parameters on _nested_ headers, query params, or body classes, call the         `putAdditionalProperty` method on the nested class:\n\n```java\nimport com.openregister.api.core.JsonValue;\nimport com.openregister.api.models.search.SearchFindCompaniesV1Params;\n\nSearchFindCompaniesV1Params params = SearchFindCompaniesV1Params.builder()\n    .location(SearchFindCompaniesV1Params.Location.builder()\n        .putAdditionalProperty("secretProperty", JsonValue.from("42"))\n        .build())\n    .build();\n```\n\nThese properties can be accessed on the nested built object later using the         `_additionalProperties()` method.\n\nTo set a documented parameter or property to an undocumented or not yet supported _value_, pass a       [`JsonValue`](openregister-java-core/src/main/kotlin/com/openregister/api/core/Values.kt) object to its setter:\n\n```java\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\n\nCompanyGetDetailsV1Params params = CompanyGetDetailsV1Params.builder().build();\n```\n\nThe most straightforward way to create a [`JsonValue`](openregister-java-core/src/main/kotlin/com/openregister/api/core/Values.kt) is using its       `from(...)` method:\n\n```java\nimport com.openregister.api.core.JsonValue;\nimport java.util.List;\nimport java.util.Map;\n\n// Create primitive JSON values\nJsonValue nullValue = JsonValue.from(null);\nJsonValue booleanValue = JsonValue.from(true);\nJsonValue numberValue = JsonValue.from(42);\nJsonValue stringValue = JsonValue.from("Hello World!");\n\n// Create a JSON array value equivalent to `["Hello", "World"]`\nJsonValue arrayValue = JsonValue.from(List.of(\n  "Hello", "World"\n));\n\n// Create a JSON object value equivalent to `{ "a": 1, "b": 2 }`\nJsonValue objectValue = JsonValue.from(Map.of(\n  "a", 1,\n  "b", 2\n));\n\n// Create an arbitrarily nested JSON equivalent to:\n// {\n//   "a": [1, 2],\n//   "b": [3, 4]\n// }\nJsonValue complexValue = JsonValue.from(Map.of(\n  "a", List.of(\n    1, 2\n  ),\n  "b", List.of(\n    3, 4\n  )\n));\n```\n\nNormally a `Builder` class\'s `build` method will throw         [`IllegalStateException`](https://docs.oracle.com/javase/8/docs/api/java/lang/IllegalStateException.html)         if any required parameter or property is unset.\n\nTo forcibly omit a required parameter or property, pass [`JsonMissing`](openregister-java-core/src/main/kotlin/com/openregister/api/core/Values.kt):\n\n```java\nimport com.openregister.api.core.JsonMissing;\nimport com.openregister.api.models.company.CompanyGetDetailsV1Params;\n\nCompanyGetDetailsV1Params params = CompanyGetDetailsV1Params.builder()\n    .companyId(JsonMissing.of())\n    .build();\n```\n\n### Response properties\n\nTo access undocumented response properties, call the `_additionalProperties()` method:\n\n```java\nimport com.openregister.api.core.JsonValue;\nimport java.util.Map;\n\nMap<String, JsonValue> additionalProperties = client.company().getDetailsV1(params)._additionalProperties();\nJsonValue secretPropertyValue = additionalProperties.get("secretProperty");\n\nString result = secretPropertyValue.accept(new JsonValue.Visitor<>() {\n    @Override\n    public String visitNull() {\n        return "It\'s null!";\n    }\n\n    @Override\n    public String visitBoolean(boolean value) {\n        return "It\'s a boolean!";\n    }\n\n    @Override\n    public String visitNumber(Number value) {\n        return "It\'s a number!";\n    }\n\n    // Other methods include `visitMissing`, `visitString`, `visitArray`, and `visitObject`\n    // The default implementation of each unimplemented method delegates to `visitDefault`, which throws by default, but can also be overridden\n});\n```\n\nTo access a property\'s raw JSON value, which may be undocumented, call its `_` prefixed method:\n\n```java\nimport com.openregister.api.core.JsonField;\nimport java.util.Optional;\n\nJsonField<Object> field = client.company().getDetailsV1(params)._field();\n\nif (field.isMissing()) {\n  // The property is absent from the JSON response\n} else if (field.isNull()) {\n  // The property was set to literal null\n} else {\n  // Check if value was provided as a string\n  // Other methods include `asNumber()`, `asBoolean()`, etc.\n  Optional<String> jsonString = field.asString();\n\n  // Try to deserialize into a custom type\n  MyClass myObject = field.asUnknown().orElseThrow().convert(MyClass.class);\n}\n```\n\n### Response validation\n\nIn rare cases, the API may return a response that doesn\'t match the expected type. For example, the SDK     may expect a property to contain a `String`, but the API could return something else.\n\nBy default, the SDK will not throw an exception in this case. It will throw     [`OpenregisterInvalidDataException`](openregister-java-core/src/main/kotlin/com/openregister/api/errors/OpenregisterInvalidDataException.kt) only if you directly access the property.\n\nIf you would prefer to check that the response is completely well-typed upfront, then either call     `validate()`:\n\n```java\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\nCompanyGetDetailsV1Response response = client.company().getDetailsV1(params).validate();\n```\n\nOr configure the method call to validate the response using the `responseValidation` method:\n\n```java\nimport com.openregister.api.models.company.CompanyGetDetailsV1Response;\n\nCompanyGetDetailsV1Response response = client.company().getDetailsV1(RequestOptions.builder().responseValidation(true).build());\n```\n\nOr configure the default for all method calls at the client level:\n\n```java\nimport com.openregister.api.client.OpenregisterClient;\nimport com.openregister.api.client.okhttp.OpenregisterOkHttpClient;\n\nOpenregisterClient client = OpenregisterOkHttpClient.builder()\n    .fromEnv()\n    .responseValidation(true)\n    .build();\n```\n\n## FAQ\n\n### Why don\'t you use plain `enum` classes?\n\nJava `enum` classes are not trivially   [forwards compatible](https://www.stainless.com/blog/making-java-enums-forwards-compatible). Using them in   the SDK could cause runtime exceptions if the API is updated to respond with a new enum value.\n\n### Why do you represent fields using `JsonField<T>` instead of just plain `T`?\n\nUsing `JsonField<T>` enables a few features:\n\n- Allowing usage of [undocumented API functionality](#undocumented-api-functionality)\n- Lazily [validating the API response against the expected shape](#response-validation)\n- Representing absent vs explicitly null values\n\n### Why don\'t you use [`data` classes](https://kotlinlang.org/docs/data-classes.html)?\n\nIt is not [backwards compatible to add new fields to a data class](https://kotlinlang.org/docs/api-guidelines-backward-compatibility.html#avoid-using-data-classes-in-your-api)   and we don\'t want to introduce a breaking change every time we add a field to a class.\n\n### Why don\'t you use checked exceptions?\n\nChecked exceptions are widely considered a mistake in the Java programming language. In fact, they were   omitted from Kotlin for this reason.\n\nChecked exceptions:\n\n- Are verbose to handle\n- Encourage error handling at the wrong level of abstraction, where nothing can be done about the error\n- Are tedious to propagate due to the [function coloring problem](https://journal.stuffwithstuff.com/2015/02/01/what-color-is-your-function)\n- Don\'t play well with lambdas (also due to the function coloring problem)\n\n## Semantic versioning\n\nThis package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:\n\n1. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_\n2. Changes that we do not expect to impact the vast majority of users in practice.\n\nWe take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.\n\nWe are keen for your feedback; please open an [issue](https://www.github.com/stainless-sdks/openregister-java/issues) with questions, bugs, or suggestions.\n',
  },
  {
    language: 'cli',
    content:
      "# Openregister CLI\n\nThe official CLI for the [Openregister REST API](docs.openregister.de).\n\nIt is generated with [Stainless](https://www.stainless.com/).\n\n<!-- x-release-please-start-version -->\n\n## Installation\n\n### Installing with Go\n\nTo test or install the CLI locally, you need [Go](https://go.dev/doc/install) version 1.22 or later installed.\n\n~~~sh\ngo install 'github.com/oregister/openregister-cli/cmd/openregister@latest'\n~~~\n\nOnce you have run `go install`, the binary is placed in your Go bin directory:\n\n- **Default location**: `$HOME/go/bin` (or `$GOPATH/bin` if GOPATH is set)\n- **Check your path**: Run `go env GOPATH` to see the base directory\n\nIf commands aren't found after installation, add the Go bin directory to your PATH:\n\n~~~sh\n# Add to your shell profile (.zshrc, .bashrc, etc.)\nexport PATH=\"$PATH:$(go env GOPATH)/bin\"\n~~~\n\n<!-- x-release-please-end -->\n\n### Running Locally\n\nAfter cloning the git repository for this project, you can use the\n`scripts/run` script to run the tool locally:\n\n~~~sh\n./scripts/run args...\n~~~\n\n## Usage\n\nThe CLI follows a resource-based command structure:\n\n~~~sh\nopenregister [resource] <command> [flags...]\n~~~\n\n~~~sh\nopenregister company get-details-v1 \\\n  --api-key 'My API Key' \\\n  --company-id DE-HRB-F1103-267645\n~~~\n\nFor details about specific commands, use the `--help` flag.\n\n### Environment variables\n\n| Environment variable   | Description                                                                                 | Required |\n| ---------------------- | ------------------------------------------------------------------------------------------- | -------- |\n| `OPENREGISTER_API_KEY` | API Key Authentication\nProvide your API key as a Bearer token in the Authorization header.\n | yes      |\n\n### Global flags\n\n- `--api-key` - API Key Authentication\nProvide your API key as a Bearer token in the Authorization header.\n (can also be set with `OPENREGISTER_API_KEY` env var)\n- `--help` - Show command line usage\n- `--debug` - Enable debug logging (includes HTTP request/response details)\n- `--version`, `-v` - Show the CLI version\n- `--base-url` - Use a custom API backend URL\n- `--format` - Change the output format (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--format-error` - Change the output format for errors (`auto`, `explore`, `json`, `jsonl`, `pretty`, `raw`, `yaml`)\n- `--transform` - Transform the data output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n- `--transform-error` - Transform the error output using [GJSON syntax](https://github.com/tidwall/gjson/blob/master/SYNTAX.md)\n\n### Passing files as arguments\n\nTo pass files to your API, you can use the `@myfile.ext` syntax:\n\n~~~bash\nopenregister <command> --arg @abe.jpg\n~~~\n\nFiles can also be passed inside JSON or YAML blobs:\n\n~~~bash\nopenregister <command> --arg '{image: \"@abe.jpg\"}'\n# Equivalent:\nopenregister <command> <<YAML\narg:\n  image: \"@abe.jpg\"\nYAML\n~~~\n\nIf you need to pass a string literal that begins with an `@` sign, you can\nescape the `@` sign to avoid accidentally passing a file.\n\n~~~bash\nopenregister <command> --username '\\@abe'\n~~~\n\n#### Explicit encoding\n\nFor JSON endpoints, the CLI tool does filetype sniffing to determine whether the\nfile contents should be sent as a string literal (for plain text files) or as a\nbase64-encoded string literal (for binary files). If you need to explicitly send\nthe file as either plain text or base64-encoded data, you can use\n`@file://myfile.txt` (for string encoding) or `@data://myfile.dat` (for\nbase64-encoding). Note that absolute paths will begin with `@file://` or\n`@data://`, followed by a third `/` (for example, `@file:///tmp/file.txt`).\n\n~~~bash\nopenregister <command> --arg @data://file.txt\n~~~\n\n## Linking different Go SDK versions\n\nYou can link the CLI against a different version of the Openregister Go SDK\nfor development purposes using the `./scripts/link` script.\n\nTo link to a specific version from a repository (version can be a branch,\ngit tag, or commit hash):\n\n~~~bash\n./scripts/link github.com/org/repo@version\n~~~\n\nTo link to a local copy of the SDK:\n\n~~~bash\n./scripts/link ../path/to/openregister-go\n~~~\n\nIf you run the link script without any arguments, it will default to `../openregister-go`.\n",
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
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
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
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
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
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
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
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
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

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
