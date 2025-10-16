// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SearchAPI from './search';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Autocomplete company search
   */
  autocompleteCompaniesV1(
    query: SearchAutocompleteCompaniesV1Params,
    options?: RequestOptions,
  ): APIPromise<SearchAutocompleteCompaniesV1Response> {
    return this._client.get('/v1/autocomplete/company', { query, ...options });
  }

  /**
   * Search for companies
   */
  findCompaniesV1(body: SearchFindCompaniesV1Params, options?: RequestOptions): APIPromise<CompanySearch> {
    return this._client.post('/v1/search/company', { body, ...options });
  }

  /**
   * Search for people
   */
  findPersonV1(
    body: SearchFindPersonV1Params,
    options?: RequestOptions,
  ): APIPromise<SearchFindPersonV1Response> {
    return this._client.post('/v1/search/person', { body, ...options });
  }

  /**
   * Find company by website URL
   */
  lookupCompanyByURL(
    query: SearchLookupCompanyByURLParams,
    options?: RequestOptions,
  ): APIPromise<SearchLookupCompanyByURLResponse> {
    return this._client.get('/v0/search/lookup', { query, ...options });
  }
}

/**
 * Legal form of the company. Common German legal forms:
 *
 * - gmbh: Gesellschaft mit beschränkter Haftung (Limited Liability Company)
 * - ag: Aktiengesellschaft (Stock Corporation)
 * - ug: Unternehmergesellschaft (Entrepreneurial Company with limited liability)
 * - ohg: Offene Handelsgesellschaft (General Partnership)
 * - kg: Kommanditgesellschaft (Limited Partnership)
 * - ev: Eingetragener Verein (Registered Association)
 */
export type CompanyLegalForm =
  | 'ag'
  | 'eg'
  | 'ek'
  | 'ev'
  | 'ewiv'
  | 'foreign'
  | 'gbr'
  | 'ggmbh'
  | 'gmbh'
  | 'kg'
  | 'kgaa'
  | 'unknown'
  | 'llp'
  | 'municipal'
  | 'ohg'
  | 'se'
  | 'ug';

/**
 * Type of company register where the entity is recorded. Common types:
 *
 * - HRB: Commercial Register B (limited liability companies, stock corporations)
 * - HRA: Commercial Register A (partnerships, sole proprietorships)
 * - PR: Partnership Register
 * - GnR: Cooperative Register
 * - VR: Association Register
 */
export type CompanyRegisterType = 'HRB' | 'HRA' | 'PR' | 'GnR' | 'VR';

export interface CompanySearch {
  pagination: CompanySearch.Pagination;

  /**
   * List of companies matching the search criteria.
   */
  results: Array<CompanySearch.Result>;
}

export namespace CompanySearch {
  export interface Pagination {
    /**
     * Current page number.
     */
    page: number;

    /**
     * Number of results per page.
     */
    per_page: number;

    /**
     * Total number of pages.
     */
    total_pages: number;

    /**
     * Total number of results.
     */
    total_results: number;
  }

  export interface Result {
    /**
     * Company status - true if active, false if inactive.
     */
    active: boolean;

    /**
     * Unique company identifier. Example: DE-HRB-F1103-267645
     */
    company_id: string;

    /**
     * Country where the company is registered using ISO 3166-1 alpha-2 code. Example:
     * "DE" for Germany
     */
    country: string | null;

    /**
     * Legal form of the company. Example: "gmbh" for Gesellschaft mit beschränkter
     * Haftung
     */
    legal_form: SearchAPI.CompanyLegalForm;

    /**
     * Official registered company name. Example: "Max Mustermann GmbH"
     */
    name: string;

    /**
     * Court where the company is registered. Example: "Berlin (Charlottenburg)"
     */
    register_court: string;

    /**
     * Registration number in the company register. Example: "230633"
     */
    register_number: string;

    /**
     * Type of company register. Example: "HRB" for Commercial Register B
     */
    register_type: SearchAPI.CompanyRegisterType;
  }
}

export interface SearchAutocompleteCompaniesV1Response {
  /**
   * List of companies matching the search criteria.
   */
  results: Array<SearchAutocompleteCompaniesV1Response.Result>;
}

export namespace SearchAutocompleteCompaniesV1Response {
  export interface Result {
    /**
     * Company status - true if active, false if inactive.
     */
    active: boolean;

    /**
     * Unique company identifier. Example: DE-HRB-F1103-267645
     */
    company_id: string;

    /**
     * Country where the company is registered using ISO 3166-1 alpha-2 code. Example:
     * "DE" for Germany
     */
    country: string | null;

    /**
     * Legal form of the company. Example: "gmbh" for Gesellschaft mit beschränkter
     * Haftung
     */
    legal_form: SearchAPI.CompanyLegalForm;

    /**
     * Official registered company name. Example: "Max Mustermann GmbH"
     */
    name: string;

    /**
     * Court where the company is registered. Example: "Berlin (Charlottenburg)"
     */
    register_court: string;

    /**
     * Registration number in the company register. Example: "230633"
     */
    register_number: string;

    /**
     * Type of company register. Example: "HRB" for Commercial Register B
     */
    register_type: SearchAPI.CompanyRegisterType;
  }
}

export interface SearchFindPersonV1Response {
  pagination: SearchFindPersonV1Response.Pagination;

  /**
   * List of people matching the search criteria.
   */
  results: Array<SearchFindPersonV1Response.Result>;
}

export namespace SearchFindPersonV1Response {
  export interface Pagination {
    /**
     * Current page number.
     */
    page: number;

    /**
     * Number of results per page.
     */
    per_page: number;

    /**
     * Total number of pages.
     */
    total_pages: number;

    /**
     * Total number of results.
     */
    total_results: number;
  }

  export interface Result {
    /**
     * Unique person identifier. Example: 1234-5678-9012-345678901234
     */
    id: string;

    /**
     * Person status - true if active, false if inactive.
     */
    active: boolean;

    /**
     * City of the person. Example: "Berlin"
     */
    city: string | null;

    /**
     * Date of birth of the person. Format: ISO 8601 (YYYY-MM-DD) Example: "1990-01-01"
     */
    date_of_birth: string;

    /**
     * Name of the person. Example: "Max Mustermann"
     */
    name: string;
  }
}

export interface SearchLookupCompanyByURLResponse {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  /**
   * Email address of the company. Example: "info@maxmustermann.de"
   */
  email?: string;

  /**
   * Phone number of the company. Example: "+49 123 456 789"
   */
  phone?: string;

  /**
   * Value Added Tax identification number. Example: "DE123456789"
   */
  vat_id?: string;
}

export interface SearchAutocompleteCompaniesV1Params {
  /**
   * Text search query to find companies by name. Example: "Descartes Technologies
   * UG"
   */
  query: string;
}

export interface SearchFindCompaniesV1Params {
  /**
   * Filters to filter companies.
   */
  filters?: Array<SearchFindCompaniesV1Params.Filter>;

  /**
   * Location to filter companies.
   */
  location?: SearchFindCompaniesV1Params.Location;

  /**
   * Pagination parameters.
   */
  pagination?: SearchFindCompaniesV1Params.Pagination;

  /**
   * Search query to filter companies.
   */
  query?: SearchFindCompaniesV1Params.Query;
}

export namespace SearchFindCompaniesV1Params {
  export interface Filter {
    field:
      | 'status'
      | 'legal_form'
      | 'register_number'
      | 'register_court'
      | 'register_type'
      | 'city'
      | 'active'
      | 'incorporated_at'
      | 'zip'
      | 'address'
      | 'balance_sheet_total'
      | 'revenue'
      | 'cash'
      | 'employees'
      | 'equity'
      | 'real_estate'
      | 'materials'
      | 'pension_provisions'
      | 'salaries'
      | 'taxes'
      | 'liabilities'
      | 'capital_reserves'
      | 'net_income'
      | 'industry_codes'
      | 'capital_amount'
      | 'capital_currency';

    keywords?: Array<string>;

    max?: string;

    min?: string;

    value?: string;

    values?: Array<string>;
  }

  /**
   * Location to filter companies.
   */
  export interface Location {
    /**
     * Latitude to filter on.
     */
    latitude: number;

    /**
     * Longitude to filter on.
     */
    longitude: number;

    /**
     * Radius in kilometers to filter on. Example: 10
     */
    radius?: number;
  }

  /**
   * Pagination parameters.
   */
  export interface Pagination {
    /**
     * Page number to return.
     */
    page?: number;

    /**
     * Number of results per page.
     */
    per_page?: number;
  }

  /**
   * Search query to filter companies.
   */
  export interface Query {
    /**
     * Search query to filter companies.
     */
    value: string;
  }
}

export interface SearchFindPersonV1Params {
  /**
   * Filters to filter people.
   */
  filters?: Array<SearchFindPersonV1Params.Filter>;

  /**
   * Pagination parameters.
   */
  pagination?: SearchFindPersonV1Params.Pagination;

  /**
   * Search query to filter people.
   */
  query?: SearchFindPersonV1Params.Query;
}

export namespace SearchFindPersonV1Params {
  export interface Filter {
    field: 'date_of_birth' | 'city' | 'active';

    keywords?: Array<string>;

    max?: string;

    min?: string;

    value?: string;

    values?: Array<string>;
  }

  /**
   * Pagination parameters.
   */
  export interface Pagination {
    /**
     * Page number to return.
     */
    page?: number;

    /**
     * Number of results per page.
     */
    per_page?: number;
  }

  /**
   * Search query to filter people.
   */
  export interface Query {
    /**
     * Search query to filter people.
     */
    value: string;
  }
}

export interface SearchLookupCompanyByURLParams {
  /**
   * Website URL to search for. Example: "https://openregister.de"
   */
  url: string;
}

export declare namespace Search {
  export {
    type CompanyLegalForm as CompanyLegalForm,
    type CompanyRegisterType as CompanyRegisterType,
    type CompanySearch as CompanySearch,
    type SearchAutocompleteCompaniesV1Response as SearchAutocompleteCompaniesV1Response,
    type SearchFindPersonV1Response as SearchFindPersonV1Response,
    type SearchLookupCompanyByURLResponse as SearchLookupCompanyByURLResponse,
    type SearchAutocompleteCompaniesV1Params as SearchAutocompleteCompaniesV1Params,
    type SearchFindCompaniesV1Params as SearchFindCompaniesV1Params,
    type SearchFindPersonV1Params as SearchFindPersonV1Params,
    type SearchLookupCompanyByURLParams as SearchLookupCompanyByURLParams,
  };
}
