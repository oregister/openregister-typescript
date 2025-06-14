// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SearchAPI from './search';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search for companies
   */
  findCompanies(
    query: SearchFindCompaniesParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SearchFindCompaniesResponse> {
    return this._client.get('/v0/search/company', { query, ...options });
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

export interface SearchFindCompaniesResponse {
  pagination: SearchFindCompaniesResponse.Pagination;

  /**
   * List of companies matching the search criteria.
   */
  results: Array<SearchFindCompaniesResponse.Result>;
}

export namespace SearchFindCompaniesResponse {
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

    /**
     * Country where the company is registered using ISO 3166-1 alpha-2 code. Example:
     * "DE" for Germany
     */
    country?: string;
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

export interface SearchFindCompaniesParams {
  /**
   * Filter for active or inactive companies. Set to true for active companies only,
   * false for inactive only.
   */
  active?: boolean;

  /**
   * Date of incorporation of the company. Format: ISO 8601 (YYYY-MM-DD) Example:
   * "2022-01-01"
   */
  incorporation_date?: string;

  /**
   * Legal form of the company. Example: "gmbh" for "Gesellschaft mit beschränkter
   * Haftung"
   */
  legal_form?: CompanyLegalForm;

  /**
   * Page number for pagination.
   */
  page?: number;

  /**
   * Number of results per page (max 50).
   */
  per_page?: number;

  /**
   * Text search query to find companies by name. Example: "Descartes Technologies
   * UG"
   */
  query?: string;

  /**
   * Court where the company is registered. Example: "Berlin (Charlottenburg)"
   */
  register_court?: string;

  /**
   * Company register number for exact matching. Example: "230633"
   */
  register_number?: string;

  /**
   * Type of register to filter results. Example: "HRB" (Commercial Register B)
   */
  register_type?: CompanyRegisterType;
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
    type SearchFindCompaniesResponse as SearchFindCompaniesResponse,
    type SearchLookupCompanyByURLResponse as SearchLookupCompanyByURLResponse,
    type SearchFindCompaniesParams as SearchFindCompaniesParams,
    type SearchLookupCompanyByURLParams as SearchLookupCompanyByURLParams,
  };
}
