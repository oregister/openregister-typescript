// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CompanyAPI from './company';
import * as SearchAPI from './search';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Company extends APIResource {
  /**
   * Get company contact information
   */
  getContactV0(companyID: string, options?: RequestOptions): APIPromise<CompanyGetContactV0Response> {
    return this._client.get(path`/v0/company/${companyID}/contact`, options);
  }

  /**
   * Get detailed company information
   */
  getDetailsV1(
    companyID: string,
    query: CompanyGetDetailsV1Params | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CompanyGetDetailsV1Response> {
    return this._client.get(path`/v1/company/${companyID}`, { query, ...options });
  }

  /**
   * Get financial reports
   */
  getFinancialsV1(companyID: string, options?: RequestOptions): APIPromise<CompanyGetFinancialsV1Response> {
    return this._client.get(path`/v1/company/${companyID}/financials`, options);
  }

  /**
   * Get company holdings
   */
  getHoldingsV1(companyID: string, options?: RequestOptions): APIPromise<CompanyGetHoldingsV1Response> {
    return this._client.get(path`/v1/company/${companyID}/holdings`, options);
  }

  /**
   * Get company owners
   */
  getOwnersV1(
    companyID: string,
    query: CompanyGetOwnersV1Params | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CompanyGetOwnersV1Response> {
    return this._client.get(path`/v1/company/${companyID}/owners`, { query, ...options });
  }

  /**
   * Get company end owners
   */
  getUbosV1(companyID: string, options?: RequestOptions): APIPromise<CompanyGetUbosV1Response> {
    return this._client.get(path`/v1/company/${companyID}/ubo`, options);
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

export type CompanyRelationType = 'shareholder' | 'stockholder' | 'limited_partner' | 'general_partner';

export type EntityType = 'natural_person' | 'legal_person';

/**
 * Report row with values from multiple report periods
 */
export interface MergedReportRow {
  children: Array<MergedReportRow>;

  formatted_name: string;

  name: string;

  /**
   * Report end date to value mapping (ISO date string as key)
   */
  values: { [key: string]: number };
}

/**
 * Report table with data merged across multiple report periods
 */
export interface MergedReportTable {
  rows: Array<MergedReportRow>;
}

export interface ReportRow {
  children: Array<ReportRow>;

  current_value: number | null;

  formatted_name: string;

  name: string;

  previous_value: number | null;
}

export interface ReportTable {
  rows: Array<ReportRow>;
}

export interface CompanyGetContactV0Response {
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

export interface CompanyGetDetailsV1Response {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  id: string;

  /**
   * Current registered address of the company.
   */
  address: CompanyAddress;

  /**
   * Historical addresses. Shows how the company address changed over time.
   */
  addresses: Array<CompanyAddress>;

  /**
   * Current registered capital of the company.
   */
  capital: CompanyCapital | null;

  /**
   * Historical capital changes. Shows how the company capital changed over time.
   */
  capitals: Array<CompanyCapital | null>;

  /**
   * Contact information of the company.
   */
  contact: CompanyGetDetailsV1Response.Contact | null;

  /**
   * Available official documents related to the company.
   */
  documents: Array<CompanyGetDetailsV1Response.Document>;

  /**
   * Date when the company was officially registered. Format: ISO 8601 (YYYY-MM-DD)
   * Example: "2022-01-01"
   */
  incorporated_at: string;

  /**
   * Key company indicators like net income, employee count, revenue, etc..
   */
  indicators: Array<CompanyGetDetailsV1Response.Indicator>;

  /**
   * Industry codes of the company.
   */
  industry_codes: CompanyGetDetailsV1Response.IndustryCodes;

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
   * Historical company names. Shows how the company name changed over time.
   */
  names: Array<CompanyName>;

  /**
   * Current official business purpose of the company.
   */
  purpose: CompanyPurpose | null;

  /**
   * Historical business purposes. Shows how the company purpose changed over time.
   */
  purposes: Array<CompanyPurpose | null>;

  /**
   * Current registration information of the company.
   */
  register: CompanyRegister;

  /**
   * Historical registration changes. Shows how registration details changed over
   * time.
   */
  registers: Array<CompanyRegister>;

  /**
   * List of individuals or entities authorized to represent the company. Includes
   * directors, officers, and authorized signatories.
   */
  representation: Array<CompanyGetDetailsV1Response.Representation>;

  /**
   * Sources of the company data.
   */
  sources: Array<CompanyGetDetailsV1Response.Source>;

  /**
   * Current status of the company:
   *
   * - active: Operating normally
   * - inactive: No longer operating
   * - liquidation: In the process of being dissolved
   */
  status: 'active' | 'inactive' | 'liquidation';

  /**
   * Date when the company was officially terminated (if applicable). Format: ISO
   * 8601 (YYYY-MM-DD) Example: "2022-01-01"
   */
  terminated_at: string | null;
}

export namespace CompanyGetDetailsV1Response {
  /**
   * Contact information of the company.
   */
  export interface Contact {
    social_media: Contact.SocialMedia;

    website_url: string;

    email?: string;

    phone?: string;

    vat_id?: string;
  }

  export namespace Contact {
    export interface SocialMedia {
      facebook?: string;

      github?: string;

      instagram?: string;

      linkedin?: string;

      tiktok?: string;

      twitter?: string;

      xing?: string;

      youtube?: string;
    }
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
   * The indicators of the company for a given year. Values of the indicator are
   * given in the smallest currency unit (cents). Example: 2099 represents €20.99 for
   * monetary values For non-monetary values (e.g., employees), the actual number.
   */
  export interface Indicator {
    /**
     * The balance sheet total of that year (in cents).
     */
    balance_sheet_total: number | null;

    /**
     * The capital reserves of that year (in cents).
     */
    capital_reserves: number | null;

    /**
     * The cash of that year (in cents).
     */
    cash: number | null;

    /**
     * Date to which this financial indicators apply. Format: ISO 8601 (YYYY-MM-DD)
     * Example: "2022-01-01"
     */
    date: string;

    /**
     * The number of employees of that year.
     */
    employees: number | null;

    /**
     * The equity of that year (in cents).
     */
    equity: number | null;

    /**
     * The liabilities of that year (in cents).
     */
    liabilities: number | null;

    /**
     * The materials of that year (in cents).
     */
    materials: number | null;

    /**
     * The net income of that year (in cents).
     */
    net_income: number | null;

    /**
     * The pension provisions of that year (in cents).
     */
    pension_provisions: number | null;

    /**
     * The real estate of that year (in cents).
     */
    real_estate: number | null;

    /**
     * The report id (source) of the indicators.
     */
    report_id: string;

    /**
     * The revenue of that year (in cents).
     */
    revenue: number | null;

    /**
     * The salaries of that year (in cents).
     */
    salaries: number | null;

    /**
     * The taxes of that year (in cents).
     */
    taxes: number | null;
  }

  /**
   * Industry codes of the company.
   */
  export interface IndustryCodes {
    WZ2025: Array<IndustryCodes.Wz2025>;
  }

  export namespace IndustryCodes {
    /**
     * Industry codes from WZ 2025.
     */
    export interface Wz2025 {
      code: string;
    }
  }

  export interface Representation {
    /**
     * Unique identifier for the representative. For companies: Format matches
     * company_id pattern For individuals: UUID Example: "DE-HRB-F1103-267645" or UUID
     * May be null for certain representatives.
     */
    id: string | null;

    /**
     * Date when this representative role ended (if applicable). Format: ISO 8601
     * (YYYY-MM-DD) Example: "2022-01-01"
     */
    end_date: string | null;

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

    legal_person?: Representation.LegalPerson | null;

    natural_person?: Representation.NaturalPerson | null;
  }

  export namespace Representation {
    export interface LegalPerson {
      city: string | null;

      /**
       * Country where the representative is located, in ISO 3166-1 alpha-2 format.
       * Example: "DE" for Germany
       */
      country: string;

      name: string;
    }

    export interface NaturalPerson {
      /**
       * City where the representative is located. Example: "Berlin"
       */
      city: string | null;

      /**
       * Date of birth of the representative. May still be null for natural persons if it
       * is not available. Format: ISO 8601 (YYYY-MM-DD) Example: "1990-01-01"
       */
      date_of_birth: string | null;

      /**
       * First name of the representative. Example: "Max"
       */
      first_name: string | null;

      /**
       * Last name of the representative. Example: "Mustermann"
       */
      last_name: string | null;
    }
  }

  export interface Source {
    /**
     * Url of the source document. In the form of a presigned url accessible for 30
     * minutes.
     */
    document_url: string;
  }
}

export interface CompanyGetFinancialsV1Response {
  /**
   * All report periods merged into a single view
   */
  merged: CompanyGetFinancialsV1Response.Merged | null;

  reports: Array<CompanyGetFinancialsV1Response.Report>;
}

export namespace CompanyGetFinancialsV1Response {
  /**
   * All report periods merged into a single view
   */
  export interface Merged {
    /**
     * Report table with data merged across multiple report periods
     */
    aktiva: CompanyAPI.MergedReportTable;

    /**
     * Report table with data merged across multiple report periods
     */
    passiva: CompanyAPI.MergedReportTable;

    /**
     * Report table with data merged across multiple report periods
     */
    guv?: CompanyAPI.MergedReportTable;
  }

  export interface Report {
    aktiva: CompanyAPI.ReportTable;

    /**
     * Whether the report is a consolidated report or not.
     */
    consolidated: boolean;

    passiva: CompanyAPI.ReportTable;

    report_end_date: string;

    /**
     * Unique identifier for the financial report. Example:
     * f47ac10b-58cc-4372-a567-0e02b2c3d479
     */
    report_id: string;

    report_start_date: string | null;

    guv?: CompanyAPI.ReportTable | null;
  }
}

/**
 * Companies this entity owns or has invested in.
 */
export interface CompanyGetHoldingsV1Response {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  holdings: Array<CompanyGetHoldingsV1Response.Holding>;
}

export namespace CompanyGetHoldingsV1Response {
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

export interface CompanyGetOwnersV1Response {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  owners: Array<CompanyGetOwnersV1Response.Owner>;

  /**
   * Sources of the company owners data.
   */
  sources: Array<CompanyGetOwnersV1Response.Source>;
}

export namespace CompanyGetOwnersV1Response {
  export interface Owner {
    /**
     * Unique identifier for the shareholder. For companies: Format matches company_id
     * pattern For individuals: UUID Example: "DE-HRB-F1103-267645" or UUID May be null
     * for certain shareholders.
     */
    id: string | null;

    /**
     * Details about the legal person.
     */
    legal_person: Owner.LegalPerson | null;

    /**
     * The name of the shareholder. E.g. "Max Mustermann" or "Max Mustermann GmbH"
     */
    name: string;

    /**
     * Details about the natural person.
     */
    natural_person: Owner.NaturalPerson | null;

    /**
     * Nominal value of shares in Euro. Example: 100
     */
    nominal_share: number;

    /**
     * Percentage of company ownership. Example: 5.36 represents 5.36% ownership
     */
    percentage_share: number | null;

    /**
     * Type of relationship between the entity and the company.
     */
    relation_type: CompanyAPI.CompanyRelationType;

    /**
     * Date when the relation started. Only available for some types of owners. Format:
     * ISO 8601 (YYYY-MM-DD) Example: "2022-01-01"
     */
    start: string | null;

    /**
     * The type of shareholder.
     */
    type: CompanyAPI.EntityType;
  }

  export namespace Owner {
    /**
     * Details about the legal person.
     */
    export interface LegalPerson {
      city: string | null;

      /**
       * Country where the owner is located, in ISO 3166-1 alpha-2 format. Example: "DE"
       * for Germany
       */
      country: string;

      name: string;
    }

    /**
     * Details about the natural person.
     */
    export interface NaturalPerson {
      city: string;

      country: string;

      date_of_birth: string | null;

      first_name: string;

      full_name: string;

      last_name: string;
    }
  }

  export interface Source {
    /**
     * Url of the source document. In the form of a presigned url accessible for 30
     * minutes.
     */
    document_url: string;
  }
}

export interface CompanyGetUbosV1Response {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  ubos: Array<CompanyGetUbosV1Response.Ubo>;
}

export namespace CompanyGetUbosV1Response {
  export interface Ubo {
    /**
     * Unique identifier for the shareholder. For individuals: UUID For companies:
     * Format matches company_id pattern Example: "DE-HRB-F1103-267645" or UUID May be
     * null for certain shareholders.
     */
    id: string | null;

    legal_person: Ubo.LegalPerson | null;

    /**
     * Maximum percentage of company ownership. Example: 5.36 represents maximum of
     * 5.36% ownership There is no exact percentage share for owners that hold a stake
     * as or through a limited partner. For these owners, we can only show the maximum
     * percentage share they could have based on their deposit as a limited partner. Is
     * null for all owners that have an exact percentage share or owners that hold a
     * stake as or through a personal liable director.
     */
    max_percentage_share: number | null;

    /**
     * The name of the shareholder. E.g. "Max Mustermann"
     */
    name: string;

    natural_person: Ubo.NaturalPerson | null;

    /**
     * Percentage of company ownership. Example: 5.36 represents 5.36% ownership Is
     * null for all owners that hold a stake as or through a personal liable directors
     * or limited partner.
     */
    percentage_share: number | null;
  }

  export namespace Ubo {
    export interface LegalPerson {
      city: string | null;

      /**
       * Country where the owner is located, in ISO 3166-1 alpha-2 format. Example: "DE"
       * for Germany
       */
      country: string;

      name: string;
    }

    export interface NaturalPerson {
      city: string;

      country: string;

      date_of_birth: string | null;

      first_name: string;

      full_name: string;

      last_name: string;
    }
  }
}

export interface CompanyGetDetailsV1Params {
  /**
   * Setting this to true will return the company without sources.
   */
  export?: boolean;

  /**
   * Get the most up-to-date company information directly from the Handelsregister.
   * When set to true, we fetch the latest data in real-time from the official German
   * commercial register, ensuring you receive the most current company details.
   * Note: Real-time requests take longer but guarantee the freshest data available.
   */
  realtime?: boolean;
}

export interface CompanyGetOwnersV1Params {
  /**
   * Setting this to true will return the owners of the company if they exist but
   * will skip processing the documents in case they weren't processed yet.
   */
  export?: boolean;

  /**
   * Get the most up-to-date company information directly from the Handelsregister.
   * When set to true, we fetch the latest data in real-time from the official German
   * commercial register, ensuring you receive the most current company details.
   * Note: Real-time requests take longer but guarantee the freshest data available.
   */
  realtime?: boolean;
}

export declare namespace Company {
  export {
    type CompanyAddress as CompanyAddress,
    type CompanyCapital as CompanyCapital,
    type CompanyName as CompanyName,
    type CompanyPurpose as CompanyPurpose,
    type CompanyRegister as CompanyRegister,
    type CompanyRelationType as CompanyRelationType,
    type EntityType as EntityType,
    type MergedReportRow as MergedReportRow,
    type MergedReportTable as MergedReportTable,
    type ReportRow as ReportRow,
    type ReportTable as ReportTable,
    type CompanyGetContactV0Response as CompanyGetContactV0Response,
    type CompanyGetDetailsV1Response as CompanyGetDetailsV1Response,
    type CompanyGetFinancialsV1Response as CompanyGetFinancialsV1Response,
    type CompanyGetHoldingsV1Response as CompanyGetHoldingsV1Response,
    type CompanyGetOwnersV1Response as CompanyGetOwnersV1Response,
    type CompanyGetUbosV1Response as CompanyGetUbosV1Response,
    type CompanyGetDetailsV1Params as CompanyGetDetailsV1Params,
    type CompanyGetOwnersV1Params as CompanyGetOwnersV1Params,
  };
}
