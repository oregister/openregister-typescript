// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CompanyAPI from './company';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Person extends APIResource {
  /**
   * Get detailed person information
   */
  getDetailsV1(personID: string, options?: RequestOptions): APIPromise<PersonGetDetailsV1Response> {
    return this._client.get(path`/v1/person/${personID}`, options);
  }

  /**
   * Get person holdings
   */
  getHoldingsV1(personID: string, options?: RequestOptions): APIPromise<PersonGetHoldingsV1Response> {
    return this._client.get(path`/v1/person/${personID}/holdings`, options);
  }
}

export interface PersonGetDetailsV1Response {
  /**
   * Unique person identifier. Example: cc78ab54-d958-49b8-bae7-2f6c0c308837
   */
  id: string;

  /**
   * Age of the person.
   */
  age: number | null;

  /**
   * City of the person.
   */
  city: string;

  /**
   * Date of birth of the person. Format: ISO 8601 (YYYY-MM-DD) Example: "1990-01-01"
   */
  date_of_birth: string | null;

  /**
   * First name of the person.
   */
  first_name: string;

  /**
   * Last name of the person.
   */
  last_name: string;

  /**
   * Management positions of the person.
   */
  management_positions: Array<PersonGetDetailsV1Response.ManagementPosition>;
}

export namespace PersonGetDetailsV1Response {
  /**
   * All current and past management positions of the person.
   */
  export interface ManagementPosition {
    /**
     * Name of the company. Example: "Descartes Technologies GmbH"
     */
    company_name: string;

    /**
     * Register ID of the company. Example: DE-HRB-F1103-267645
     */
    register_id: string;

    /**
     * Role of the person in the company. Example: "DIRECTOR"
     */
    role: string;

    /**
     * Date when the person started the management position. Format: ISO 8601
     * (YYYY-MM-DD) Example: "2022-01-01"
     */
    start_date: string;

    /**
     * Date when the person ended the management position. Format: ISO 8601
     * (YYYY-MM-DD) Example: "2023-01-01"
     */
    end_date?: string;
  }
}

/**
 * Companies this entity owns or has invested in.
 */
export interface PersonGetHoldingsV1Response {
  /**
   * Shareholder and limited partner positions of the person.
   */
  holdings: Array<PersonGetHoldingsV1Response.Holding>;

  /**
   * Unique person identifier. Example: cc78ab54-d958-49b8-bae7-2f6c0c308837
   */
  person_id: string;
}

export namespace PersonGetHoldingsV1Response {
  export interface Holding {
    /**
     * Unique company identifier. Example: DE-HRB-F1103-267645
     */
    company_id: string;

    /**
     * Date when the ownership ended. Format: ISO 8601 (YYYY-MM-DD) Example:
     * "2022-01-01"
     */
    end: string | null;

    /**
     * Name of the company.
     */
    name: string;

    /**
     * Amount of shares or capital in the company. Example: 100
     */
    nominal_share: number;

    /**
     * Share of the company. Example: 0.5 represents 50% ownership
     */
    percentage_share: number | null;

    /**
     * Type of relationship between the entity and the company.
     */
    relation_type: CompanyAPI.CompanyRelationType;

    /**
     * Date when the ownership started. Format: ISO 8601 (YYYY-MM-DD) Example:
     * "2022-01-01"
     */
    start: string | null;
  }
}

export declare namespace Person {
  export {
    type PersonGetDetailsV1Response as PersonGetDetailsV1Response,
    type PersonGetHoldingsV1Response as PersonGetHoldingsV1Response,
  };
}
