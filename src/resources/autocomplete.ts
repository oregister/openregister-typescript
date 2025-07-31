// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SearchAPI from './search';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Autocomplete extends APIResource {
  /**
   * Autocomplete company search
   */
  autocompleteCompaniesV1(
    query: AutocompleteAutocompleteCompaniesV1Params,
    options?: RequestOptions,
  ): APIPromise<AutocompleteAutocompleteCompaniesV1Response> {
    return this._client.get('/v1/autocomplete/company', { query, ...options });
  }
}

export interface AutocompleteAutocompleteCompaniesV1Response {
  /**
   * List of companies matching the search criteria.
   */
  results?: Array<AutocompleteAutocompleteCompaniesV1Response.Result>;
}

export namespace AutocompleteAutocompleteCompaniesV1Response {
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

export interface AutocompleteAutocompleteCompaniesV1Params {
  /**
   * Text search query to find companies by name. Example: "Descartes Technologies
   * UG"
   */
  query: string;
}

export declare namespace Autocomplete {
  export {
    type AutocompleteAutocompleteCompaniesV1Response as AutocompleteAutocompleteCompaniesV1Response,
    type AutocompleteAutocompleteCompaniesV1Params as AutocompleteAutocompleteCompaniesV1Params,
  };
}
