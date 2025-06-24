// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CompanyAPI from './company';
import * as SearchAPI from './search';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Company extends APIResource {
  /**
   * Get detailed company information
   */
  retrieve(
    companyID: string,
    query: CompanyRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CompanyRetrieveResponse> {
    return this._client.get(path`/v0/company/${companyID}`, { query, ...options });
  }

  /**
   * Get company shareholders
   */
  listShareholders(companyID: string, options?: RequestOptions): APIPromise<CompanyListShareholdersResponse> {
    return this._client.get(path`/v0/company/${companyID}/shareholders`, options);
  }

  /**
   * Get company contact information
   */
  retrieveContact(companyID: string, options?: RequestOptions): APIPromise<CompanyRetrieveContactResponse> {
    return this._client.get(path`/v0/company/${companyID}/contact`, options);
  }
}

export interface CompanyAddress {
  /**
   * City or locality name. Example: "Berlin"
   */
  city: string;

  /**
   * Country name. Example: "Germany"
   */
  country: string;

  /**
   * Complete address formatted as a single string. Example: "Musterstraße 1, 10117
   * Berlin, Germany"
   */
  formatted_value: string;

  /**
   * Date when this address became effective. Format: ISO 8601 (YYYY-MM-DD) Example:
   * "2022-01-01"
   */
  start_date: string;

  /**
   * Additional address information such as c/o or attention line. Example: "c/o Max
   * Mustermann"
   */
  extra?: string;

  /**
   * Postal or ZIP code. Example: "10117"
   */
  postal_code?: string;

  /**
   * Street name and number. Example: "Musterstraße 1"
   */
  street?: string;
}

export interface CompanyCapital {
  /**
   * Capital amount as a decimal number. Example: 100000.00 represents 100,000.00
   * monetary units
   */
  amount: number;

  /**
   * Currency code for the capital amount. Example: "EUR" for Euro
   */
  currency: 'EUR' | 'DEM' | 'USD';

  /**
   * Date when this capital amount became effective. Format: ISO 8601 (YYYY-MM-DD)
   * Example: "2023-01-01"
   */
  start_date: string;
}

export interface CompanyName {
  /**
   * Legal form of the company at this point in time. Example: "gmbh" for
   * Gesellschaft mit beschränkter Haftung
   */
  legal_form: SearchAPI.CompanyLegalForm;

  /**
   * Official company name including any legal form designations. Example: "Descartes
   * Technologies UG (haftungsbeschränkt)"
   */
  name: string;

  /**
   * Date when this name became effective. Format: ISO 8601 (YYYY-MM-DD) Example:
   * "2022-01-01"
   */
  start_date: string;
}

export interface CompanyPurpose {
  /**
   * Official description of the company's business activities and objectives. This
   * is the registered purpose as stated in official documents.
   */
  purpose: string;

  /**
   * Date when this purpose became effective. Format: ISO 8601 (YYYY-MM-DD) Example:
   * "2022-01-01"
   */
  start_date: string;
}

export interface CompanyRegister {
  /**
   * Court where the company is registered. Example: "Berlin (Charlottenburg)"
   */
  register_court: string;

  /**
   * Registration number in the company register. Example: "230633"
   */
  register_number: string;

  /**
   * Type of register where the company is recorded. Example: "HRB" (Commercial
   * Register B)
   */
  register_type: SearchAPI.CompanyRegisterType;

  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id?: string;

  /**
   * Date when this registration information became effective. Format: ISO 8601
   * (YYYY-MM-DD) Example: "2022-01-01"
   */
  start_date?: string;
}

export type EntityType = 'natural_person' | 'legal_person';

export interface CompanyRetrieveResponse {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  id: string;

  /**
   * Current registered address of the company.
   */
  address: CompanyAddress;

  /**
   * Date when the company was officially registered. Format: ISO 8601 (YYYY-MM-DD)
   * Example: "2022-01-01"
   */
  incorporated_at: string;

  /**
   * Legal form of the company. Example: "gmbh" for Gesellschaft mit beschränkter
   * Haftung
   */
  legal_form: SearchAPI.CompanyLegalForm;

  /**
   * Current official name of the company.
   */
  name: CompanyName;

  /**
   * Current registration information of the company.
   */
  register: CompanyRegister;

  /**
   * List of individuals or entities authorized to represent the company. Includes
   * directors, officers, and authorized signatories.
   */
  representation: Array<CompanyRetrieveResponse.Representation>;

  /**
   * Current status of the company:
   *
   * - active: Operating normally
   * - inactive: No longer operating
   * - liquidation: In the process of being dissolved
   */
  status: 'active' | 'inactive' | 'liquidation';

  /**
   * Historical addresses, only included when history=true. Shows how the company
   * address changed over time.
   */
  addresses?: Array<CompanyAddress>;

  /**
   * Current registered capital of the company.
   */
  capital?: CompanyCapital;

  /**
   * Historical capital changes, only included when history=true. Shows how the
   * company capital changed over time.
   */
  capitals?: Array<CompanyCapital>;

  /**
   * Available official documents related to the company, only included when
   * documents=true.
   */
  documents?: Array<CompanyRetrieveResponse.Document>;

  /**
   * Financial reports and key financial indicators, only included when
   * financials=true.
   */
  financials?: CompanyRetrieveResponse.Financials;

  /**
   * Historical company names, only included when history=true. Shows how the company
   * name changed over time.
   */
  names?: Array<CompanyName>;

  /**
   * Current official business purpose of the company.
   */
  purpose?: CompanyPurpose;

  /**
   * Historical business purposes, only included when history=true. Shows how the
   * company purpose changed over time.
   */
  purposes?: Array<CompanyPurpose>;

  /**
   * Historical registration changes, only included when history=true. Shows how
   * registration details changed over time.
   */
  registers?: Array<CompanyRegister>;

  /**
   * Date when the company was officially terminated (if applicable). Format: ISO
   * 8601 (YYYY-MM-DD) Example: "2022-01-01"
   */
  terminated_at?: string;
}

export namespace CompanyRetrieveResponse {
  export interface Representation {
    /**
     * City where the representative is located. Example: "Berlin"
     */
    city: string;

    /**
     * Country where the representative is located, in ISO 3166-1 alpha-2 format.
     * Example: "DE" for Germany
     */
    country: string;

    /**
     * The name of the representative. E.g. "Max Mustermann" or "Max Mustermann GmbH"
     */
    name: string;

    /**
     * The role of the representation. E.g. "DIRECTOR"
     */
    role:
      | 'DIRECTOR'
      | 'PROKURA'
      | 'SHAREHOLDER'
      | 'OWNER'
      | 'PARTNER'
      | 'PERSONAL_LIABLE_DIRECTOR'
      | 'LIQUIDATOR'
      | 'OTHER';

    /**
     * Date when this representative role became effective. Format: ISO 8601
     * (YYYY-MM-DD) Example: "2022-01-01"
     */
    start_date: string;

    /**
     * Whether the representation is a natural person or a legal entity.
     */
    type: CompanyAPI.EntityType;

    /**
     * Unique identifier for the representative. For companies: Format matches
     * company_id pattern For individuals: UUID Example: "DE-HRB-F1103-267645" or UUID
     * May be null for certain representatives.
     */
    id?: string;

    /**
     * Date of birth of the representative. Only provided for type=natural_person. May
     * still be null for natural persons if it is not available. Format: ISO 8601
     * (YYYY-MM-DD) Example: "1990-01-01"
     */
    date_of_birth?: string;

    /**
     * Date when this representative role ended (if applicable). Format: ISO 8601
     * (YYYY-MM-DD) Example: "2022-01-01"
     */
    end_date?: string;

    /**
     * First name of the representative. Only provided for type=natural_person.
     * Example: "Max"
     */
    first_name?: string;

    /**
     * Last name of the representative. Only provided for type=natural_person. Example:
     * "Mustermann"
     */
    last_name?: string;
  }

  export interface Document {
    /**
     * Unique identifier for the document. Example:
     * "f47ac10b-58cc-4372-a567-0e02b2c3d479"
     */
    id: string;

    /**
     * Document publication or filing date. Format: ISO 8601 (YYYY-MM-DD) Example:
     * "2022-01-01"
     */
    date: string;

    /**
     * Whether this is the latest version of the document_type.
     */
    latest: boolean;

    /**
     * Categorization of the document:
     *
     * - articles_of_association: Company statutes/bylaws
     * - sample_protocol: Standard founding protocol
     * - shareholder_list: List of company shareholders
     */
    type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list';
  }

  /**
   * Financial reports and key financial indicators, only included when
   * financials=true.
   */
  export interface Financials {
    /**
     * Key financial metrics extracted from the reports. Includes balance sheet totals,
     * revenue, and other important figures.
     */
    indicators: Array<Financials.Indicator>;

    /**
     * The financial reports of the company.
     */
    reports: Array<Financials.Report>;
  }

  export namespace Financials {
    export interface Indicator {
      /**
       * Date to which this financial indicator applies. Format: ISO 8601 (YYYY-MM-DD)
       * Example: "2022-01-01"
       */
      date: string;

      /**
       * The identifier for the financial report this indicator originates from. E.g.
       * "f47ac10b-58cc-4372-a567-0e02b2c3d479"
       */
      report_id: string;

      /**
       * The type of indicator.
       */
      type:
        | 'balance_sheet_total'
        | 'net_income'
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
        | 'capital_reserves';

      /**
       * Value of the indicator in the smallest currency unit (cents). Example: 2099
       * represents €20.99 for monetary values For non-monetary values (e.g., employees),
       * the actual number.
       */
      value: number;
    }

    export interface Report {
      /**
       * The unique identifier for the financial report. E.g.
       * "f47ac10b-58cc-4372-a567-0e02b2c3d479"
       */
      id: string;

      /**
       * The name of the financial report. E.g. "Jahresabschluss 2022"
       */
      name: string;

      /**
       * The date when the financial report was published. E.g. "2022-01-01"
       */
      published_at: string;
    }
  }
}

export interface CompanyListShareholdersResponse {
  /**
   * Date when this shareholder information became effective. Format: ISO 8601
   * (YYYY-MM-DD) Example: "2022-01-01"
   */
  date: string;

  /**
   * Unique identifier for the document this was taken from. Example:
   * "f47ac10b-58cc-4372-a567-0e02b2c3d479"
   */
  document_id: string;

  shareholders: Array<CompanyListShareholdersResponse.Shareholder>;
}

export namespace CompanyListShareholdersResponse {
  export interface Shareholder {
    /**
     * Country where the shareholder is located, in ISO 3166-1 alpha-2 format. Example:
     * "DE" for Germany
     */
    country: string;

    /**
     * The name of the shareholder. E.g. "Max Mustermann" or "Max Mustermann GmbH"
     */
    name: string;

    /**
     * Nominal value of shares in Euro. Example: 100
     */
    nominal_share: number;

    /**
     * Percentage of company ownership. Example: 5.36 represents 5.36% ownership
     */
    percentage_share: number;

    /**
     * The type of shareholder.
     */
    type: CompanyAPI.EntityType;

    /**
     * Unique identifier for the shareholder. For companies: Format matches company_id
     * pattern For individuals: UUID Example: "DE-HRB-F1103-267645" or UUID May be null
     * for certain shareholders.
     */
    id?: string;
  }
}

export interface CompanyRetrieveContactResponse {
  /**
   * Where the contact information was found. Example: "https://openregister.de"
   */
  source_url: string;

  /**
   * Company contact email address. Example: "founders@openregister.de"
   */
  email?: string;

  /**
   * Company phone number. Example: "+49 030 12345678"
   */
  phone?: string;

  /**
   * Value Added Tax identification number. (Umsatzsteuer-Identifikationsnummer)
   * Example: "DE370146530"
   */
  vat_id?: string;
}

export interface CompanyRetrieveParams {
  /**
   * Include document metadata when set to true. Lists available official documents
   * related to the company.
   */
  documents?: boolean;

  /**
   * Include financial data when set to true. Provides access to financial reports
   * and key financial indicators.
   */
  financials?: boolean;

  /**
   * Include historical company data when set to true. This returns past names,
   * addresses, and other changed information.
   */
  history?: boolean;
}

export declare namespace Company {
  export {
    type CompanyAddress as CompanyAddress,
    type CompanyCapital as CompanyCapital,
    type CompanyName as CompanyName,
    type CompanyPurpose as CompanyPurpose,
    type CompanyRegister as CompanyRegister,
    type EntityType as EntityType,
    type CompanyRetrieveResponse as CompanyRetrieveResponse,
    type CompanyListShareholdersResponse as CompanyListShareholdersResponse,
    type CompanyRetrieveContactResponse as CompanyRetrieveContactResponse,
    type CompanyRetrieveParams as CompanyRetrieveParams,
  };
}
