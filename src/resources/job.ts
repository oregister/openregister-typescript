// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CompanyAPI from './company';
import * as InsolvencyAPI from './insolvency';
import * as SearchAPI from './search';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class JobResource extends APIResource {
  /**
   * Start a realtime request without waiting for it. The request returns at once
   * with a pending job. Use this instead of `realtime=true` when your client cannot
   * keep a request open for the minutes the Handelsregister may take.
   *
   * Job types:
   *
   * - `company`: refreshes the company from the Handelsregister, like
   *   `GET /v1/company/{company_id}?realtime=true`.
   * - `owners`: refreshes the company's owners, like
   *   `GET /v1/company/{company_id}/owners?realtime=true`.
   * - `document`: fetches one document, like `GET /v1/document`. Requires
   *   `document_category`.
   *
   * Follow a job either way, or both:
   *
   * - Poll `GET /v1/jobs/{job_id}` until `status` is `completed` or `failed`. A
   *   completed job carries its result in `results`: the document for a `document`
   *   job, the company or its owners for a `company` or `owners` job.
   * - Configure a webhook endpoint: when the job finishes, OpenRegister sends a
   *   `job.completed` or `job.failed` webhook to it. The job can be polled all the
   *   same.
   *
   * Jobs are available on paid plans. A completed job costs what the same request
   * with `realtime=true` costs: 20 credits for `company` and `owners`, 10 for
   * `document`. Failed jobs and polling are free.
   */
  createV1(body: JobCreateV1Params, options?: RequestOptions): APIPromise<Job> {
    return this._client.post('/v1/jobs', { body, ...options });
  }

  /**
   * Get a job's status and, once it completed, its result in `results`. Polling is
   * free.
   *
   * - `document` jobs return `results.document` with a download URL, presigned again
   *   on every read.
   * - `company` jobs return `results.company`, the same as
   *   `GET /v1/company/{company_id}`.
   * - `owners` jobs return `results.owners`, the same as
   *   `GET /v1/company/{company_id}/owners`.
   *
   * Results are returned for 12 hours after the job finished (`expires_at`); after
   * that, `results` is null and the regular endpoints serve the data.
   */
  getV1(jobID: string, options?: RequestOptions): APIPromise<Job> {
    return this._client.get(path`/v1/jobs/${jobID}`, options);
  }
}

export interface Job {
  /**
   * Unique job identifier. Example: f47ac10b-58cc-4372-a567-0e02b2c3d479
   */
  id: string;

  /**
   * Company the job refreshes. For `company` and `owners` jobs this is the company's
   * latest register ID, which differs from the requested one when the company moved
   * to another register. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  created_at: string;

  document_category: JobDocumentCategory | null;

  /**
   * Until when a completed job returns `results`, 12 hours after it finished.
   */
  expires_at: string | null;

  finished_at: string | null;

  /**
   * Why a failed job failed:
   *
   * - `not_available`: the register holds no such document for this company.
   * - `timeout`: the Handelsregister did not answer in time; try again later.
   * - `internal_error`: any other failure.
   */
  reason: 'not_available' | 'timeout' | 'internal_error' | null;

  /**
   * The result of a completed job. Only the field of the job's type is set.
   */
  results: Job.Results | null;

  status: 'pending' | 'completed' | 'failed';

  type: JobType;
}

export namespace Job {
  /**
   * The result of a completed job. Only the field of the job's type is set.
   */
  export interface Results {
    /**
     * The refreshed company of a `company` job.
     */
    company: Results.Company | null;

    /**
     * The fetched document of a `document` job.
     */
    document: Results.Document | null;

    /**
     * The refreshed owners of an `owners` job.
     */
    owners: Results.Owners | null;
  }

  export namespace Results {
    /**
     * The refreshed company of a `company` job.
     */
    export interface Company {
      /**
       * Unique company identifier. Example: DE-HRB-F1103-267645
       */
      id: string;

      /**
       * Companies that were merged into this company (Verschmelzung durch Aufnahme, as
       * the acquiring entity).
       */
      acquisitions: Array<Company.Acquisition>;

      /**
       * Current registered address of the company.
       */
      address: CompanyAPI.CompanyAddress;

      /**
       * Historical addresses. Shows how the company address changed over time.
       */
      addresses: Array<CompanyAPI.CompanyAddress>;

      /**
       * Spin-offs (Ausgliederung, § 123 Abs. 3 UmwG) in which this company transferred
       * assets to another company as the transferring entity.
       */
      asset_spin_offs: Array<Company.AssetSpinOff>;

      /**
       * Current registered capital of the company.
       */
      capital: CompanyAPI.CompanyCapital | null;

      /**
       * Historical capital changes. Shows how the company capital changed over time.
       */
      capitals: Array<CompanyAPI.CompanyCapital>;

      /**
       * Contact information of the company.
       */
      contact: Company.Contact | null;

      /**
       * Available official documents related to the company.
       */
      documents: Array<CompanyAPI.CompanyDocument>;

      /**
       * Modelled revenue, EBITDA and employees for companies that do not report them.
       * One estimate per metric, for the latest fiscal year.
       */
      estimates: Company.Estimates;

      /**
       * Date when the company was officially registered. Format: ISO 8601 (YYYY-MM-DD)
       * Example: "2022-01-01"
       */
      incorporated_at: string;

      /**
       * Key company indicators like net income, employee count, revenue, etc..
       */
      indicators: Array<Company.Indicator>;

      /**
       * Industry codes of the company, classified from its current purpose
       * (Unternehmensgegenstand). Empty when the purpose has not been classified or
       * describes no codable activity.
       */
      industry_codes: Company.IndustryCodes;

      /**
       * Legal form of the company. Example: "gmbh" for Gesellschaft mit beschränkter
       * Haftung
       */
      legal_form: SearchAPI.CompanyLegalForm;

      /**
       * If the company ceased to exist through a merger (Verschmelzung), the company it
       * was merged into.
       */
      merged_into: Company.MergedInto | null;

      /**
       * Current official name of the company.
       */
      name: CompanyAPI.CompanyName;

      /**
       * Historical company names. Shows how the company name changed over time.
       */
      names: Array<CompanyAPI.CompanyName>;

      /**
       * Date of the notarized company agreement (Gesellschaftsvertrag or Satzung).
       * Format: ISO 8601 (YYYY-MM-DD) Example: "2021-12-21"
       */
      notarized_at: string | null;

      /**
       * The company's current profit and loss transfer agreement
       * (Gewinnabführungsvertrag), if one exists. The referenced company is the parent
       * receiving this company's profit (Organträger). Null if the company has no active
       * agreement.
       */
      profit_transfer_agreement: Company.ProfitTransferAgreement | null;

      /**
       * Current official business purpose of the company.
       */
      purpose: CompanyAPI.CompanyPurpose | null;

      /**
       * Historical business purposes. Shows how the company purpose changed over time.
       */
      purposes: Array<CompanyAPI.CompanyPurpose>;

      /**
       * Current registration information of the company.
       */
      register: CompanyAPI.CompanyRegister;

      /**
       * Historical registration changes. Shows how registration details changed over
       * time.
       */
      registers: Array<CompanyAPI.CompanyRegister>;

      /**
       * List of individuals or entities authorized to represent the company. Includes
       * directors, officers, and authorized signatories.
       */
      representation: Array<Company.Representation>;

      /**
       * The company's current general representation rule (allgemeine
       * Vertretungsregelung), as published in the register. Example: "Ist nur ein
       * Geschäftsführer bestellt, so vertritt er die Gesellschaft allein. Sind mehrere
       * Geschäftsführer bestellt, so wird die Gesellschaft durch zwei Geschäftsführer
       * oder durch einen Geschäftsführer gemeinsam mit einem Prokuristen vertreten."
       */
      representation_rule: string | null;

      /**
       * Sources of the company data.
       */
      sources: Array<CompanyAPI.Source>;

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
       * 8601 (YYYY-MM-DD) Example: "2024-01-01"
       */
      terminated_at: string | null;

      /**
       * Insolvency proceedings of the company, if any. Contains basic information per
       * proceeding; use the insolvency endpoint to retrieve all events of a proceeding.
       */
      insolvencies?: Array<Company.Insolvency>;

      /**
       * Legal Entity Identifier (LEI), if available.
       */
      lei?: string;
    }

    export namespace Company {
      export interface Acquisition {
        /**
         * Date the underlying contract (Verschmelzungsvertrag) was concluded, as cited in
         * the register entry. Null when the register text does not cite a contract date.
         * Entries sharing an agreement_date belong to the same transaction. Format: ISO
         * 8601 (YYYY-MM-DD)
         */
        agreement_date: string | null;

        /**
         * Unique company identifier of the company that was merged into this company.
         * Example: DE-HRB-F1103-267645
         */
        company_id: string;

        /**
         * Current name of the company that was merged into this company.
         */
        name: string;

        /**
         * Date the merger was registered. Format: ISO 8601 (YYYY-MM-DD)
         */
        registration_date: string;
      }

      export interface AssetSpinOff {
        /**
         * Date the underlying contract (Ausgliederungsvertrag) was concluded, as cited in
         * the register entry. Null when the register text does not cite a contract date.
         * Entries sharing an agreement_date belong to the same transaction. Format: ISO
         * 8601 (YYYY-MM-DD)
         */
        agreement_date: string | null;

        /**
         * Unique company identifier of the company that received the assets. Example:
         * DE-HRB-F1103-267645
         */
        company_id: string;

        /**
         * Current name of the company that received the assets.
         */
        name: string;

        /**
         * Date the spin-off was registered. Format: ISO 8601 (YYYY-MM-DD)
         */
        registration_date: string;
      }

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

      /**
       * Modelled revenue, EBITDA and employees for companies that do not report them.
       * One estimate per metric, for the latest fiscal year.
       */
      export interface Estimates {
        /**
         * A modelled value for one fiscal year. min and max are not hard limits: the true
         * value lies between them with 80% probability.
         */
        ebitda: Estimates.Ebitda | null;

        /**
         * A modelled value for one fiscal year. min and max are not hard limits: the true
         * value lies between them with 80% probability.
         */
        employees: Estimates.Employees | null;

        /**
         * A modelled value for one fiscal year. min and max are not hard limits: the true
         * value lies between them with 80% probability.
         */
        revenue: Estimates.Revenue | null;
      }

      export namespace Estimates {
        /**
         * A modelled value for one fiscal year. min and max are not hard limits: the true
         * value lies between them with 80% probability.
         */
        export interface Ebitda {
          /**
           * How narrow the 80% range is, the same tiers the search filters
           * estimated\_\*\_confidence use. Revenue and employees are judged by the ratio of
           * max to min, EBITDA by the range relative to the latest reported balance sheet
           * total (low when there is none).
           */
          confidence: 'high' | 'medium' | 'low';

          /**
           * End of the fiscal year the estimate applies to, matching the company's reporting
           * year end. Format: ISO 8601 (YYYY-MM-DD) Example: "2024-12-31"
           */
          date: string;

          /**
           * Upper end of the 80% range.
           */
          max: number;

          /**
           * Lower end of the 80% range.
           */
          min: number;

          /**
           * The estimated figure, the middle of the modelled range.
           */
          value: number;
        }

        /**
         * A modelled value for one fiscal year. min and max are not hard limits: the true
         * value lies between them with 80% probability.
         */
        export interface Employees {
          /**
           * How narrow the 80% range is, the same tiers the search filters
           * estimated\_\*\_confidence use. Revenue and employees are judged by the ratio of
           * max to min, EBITDA by the range relative to the latest reported balance sheet
           * total (low when there is none).
           */
          confidence: 'high' | 'medium' | 'low';

          /**
           * End of the fiscal year the estimate applies to, matching the company's reporting
           * year end. Format: ISO 8601 (YYYY-MM-DD) Example: "2024-12-31"
           */
          date: string;

          /**
           * Upper end of the 80% range.
           */
          max: number;

          /**
           * Lower end of the 80% range.
           */
          min: number;

          /**
           * The estimated figure, the middle of the modelled range.
           */
          value: number;
        }

        /**
         * A modelled value for one fiscal year. min and max are not hard limits: the true
         * value lies between them with 80% probability.
         */
        export interface Revenue {
          /**
           * How narrow the 80% range is, the same tiers the search filters
           * estimated\_\*\_confidence use. Revenue and employees are judged by the ratio of
           * max to min, EBITDA by the range relative to the latest reported balance sheet
           * total (low when there is none).
           */
          confidence: 'high' | 'medium' | 'low';

          /**
           * End of the fiscal year the estimate applies to, matching the company's reporting
           * year end. Format: ISO 8601 (YYYY-MM-DD) Example: "2024-12-31"
           */
          date: string;

          /**
           * Upper end of the 80% range.
           */
          max: number;

          /**
           * Lower end of the 80% range.
           */
          min: number;

          /**
           * The estimated figure, the middle of the modelled range.
           */
          value: number;
        }
      }

      /**
       * A focused subset of the key company indicators for a given year. Values of the
       * indicator are given in the smallest currency unit (cents). Example: 2099
       * represents €20.99 for monetary values. For non-monetary values (e.g.,
       * employees), the actual number.
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
         * A short fiscal year (Rumpfgeschäftsjahr), shorter than twelve months
         */
        short_year: boolean;

        /**
         * The taxes of that year (in cents).
         */
        taxes: number | null;
      }

      /**
       * Industry codes of the company, classified from its current purpose
       * (Unternehmensgegenstand). Empty when the purpose has not been classified or
       * describes no codable activity.
       */
      export interface IndustryCodes {
        WZ2025: Array<IndustryCodes.Wz2025>;
      }

      export namespace IndustryCodes {
        /**
         * A WZ 2025 class (Klasse) the company is active in, with the subclasses
         * (Unterklassen) behind it. The class of the company's main activity comes first.
         */
        export interface Wz2025 {
          /**
           * WZ 2025 class. Example: "64.19"
           */
          code: string;

          /**
           * Official German title of the class. Example: "Kreditinstitute, ohne
           * Spezialkreditinstitute"
           */
          label_de: string;

          /**
           * Whether the company's main activity falls in this class. True for at most one
           * class. The main activity is classified from the purpose, not recorded in the
           * register.
           */
          primary: boolean;

          /**
           * The WZ 2025 subclasses within this class, the main activity first.
           */
          subclasses: Array<Wz2025.Subclass>;
        }

        export namespace Wz2025 {
          /**
           * A WZ 2025 subclass (Unterklasse).
           */
          export interface Subclass {
            /**
             * WZ 2025 subclass. Example: "64.19.1"
             */
            code: string;

            /**
             * Official German title of the subclass. Example: "Kreditbanken einschließlich
             * Zweigstellen ausländischer Banken"
             */
            label_de: string;

            /**
             * Whether this is the company's main activity. True for at most one subclass. The
             * main activity is classified from the purpose, not recorded in the register.
             */
            primary: boolean;
          }
        }
      }

      /**
       * If the company ceased to exist through a merger (Verschmelzung), the company it
       * was merged into.
       */
      export interface MergedInto {
        /**
         * Date the underlying contract (Verschmelzungsvertrag) was concluded, as cited in
         * the register entry. Null when the register text does not cite a contract date.
         * Entries sharing an agreement_date belong to the same transaction. Format: ISO
         * 8601 (YYYY-MM-DD)
         */
        agreement_date: string | null;

        /**
         * Unique company identifier of the company this company was merged into. Example:
         * DE-HRB-F1103-267645
         */
        company_id: string;

        /**
         * Current name of the company this company was merged into.
         */
        name: string;

        /**
         * Date the merger was registered. Format: ISO 8601 (YYYY-MM-DD)
         */
        registration_date: string;
      }

      /**
       * The company's current profit and loss transfer agreement
       * (Gewinnabführungsvertrag), if one exists. The referenced company is the parent
       * receiving this company's profit (Organträger). Null if the company has no active
       * agreement.
       */
      export interface ProfitTransferAgreement {
        /**
         * Date the underlying contract (Gewinnabführungsvertrag) was concluded, as cited
         * in the register entry. Null when the register text does not cite a contract
         * date. Entries sharing an agreement_date belong to the same transaction. Format:
         * ISO 8601 (YYYY-MM-DD)
         */
        agreement_date: string | null;

        /**
         * Unique company identifier of the parent company receiving this company's profit
         * (Organträger). Example: DE-HRB-F1103-267645
         */
        company_id: string;

        /**
         * Current name of the parent company.
         */
        name: string;

        /**
         * Date the agreement was registered. Format: ISO 8601 (YYYY-MM-DD)
         */
        registration_date: string;
      }

      export interface Representation {
        /**
         * Unique identifier for the representative. For companies: Format matches
         * company_id pattern For individuals: UUID Example: "DE-HRB-F1103-267645" or UUID
         * May be null for certain representatives.
         */
        id: string | null;

        /**
         * The representative's current individual representation authority (individuelle
         * Vertretungsbefugnis), as published in the register. Null if no special authority
         * is recorded. Example: "einzelvertretungsberechtigt mit der Befugnis, im Namen
         * der Gesellschaft mit sich im eigenen Namen Rechtsgeschäfte abzuschließen"
         */
        authority: string | null;

        /**
         * Structured facts read from `authority`. Null when none are stated.
         */
        authority_detail: Representation.AuthorityDetail | null;

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
         * Coarse role bucket. Stable set of values, safe to switch on exhaustively. Use
         * `role_detail` for the precise register role. E.g. "DIRECTOR"
         */
        role: CompanyAPI.RepresentationRole;

        /**
         * The precise role as recorded in the register, plus ready-to-display titles. A
         * Vorstand and a Geschäftsführer both have role "DIRECTOR" but differ here.
         */
        role_detail: Representation.RoleDetail;

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
        /**
         * Structured facts read from `authority`. Null when none are stated.
         */
        export interface AuthorityDetail {
          /**
           * Fully exempt from self-dealing restrictions (in Germany § 181 BGB). Null when
           * not stated or only partly exempt.
           */
          self_dealing_allowed: boolean | null;

          /**
           * SOLE may represent alone, JOINT only together with others, NONE is excluded from
           * representation, GENERAL follows the general representation rule.
           */
          type: 'SOLE' | 'JOINT' | 'NONE' | 'GENERAL' | null;
        }

        /**
         * The precise role as recorded in the register, plus ready-to-display titles. A
         * Vorstand and a Geschäftsführer both have role "DIRECTOR" but differ here.
         */
        export interface RoleDetail {
          /**
           * The precise role as recorded in the register. Example: "EXECUTIVE" for a
           * Vorstand, "DIRECTOR" for a Geschäftsführer — both have role "DIRECTOR".
           */
          code:
            | 'DIRECTOR'
            | 'EMERGENCY_DIRECTOR'
            | 'EXECUTIVE'
            | 'CHAIRMAN'
            | 'DEPUTY_CHAIRMAN'
            | 'BOARD'
            | 'PRESIDENT_BOARD'
            | 'VICE_PRESIDENT_BOARD'
            | 'PRESIDENT'
            | 'MEMBER'
            | 'NON_EXECUTIVE_DIRECTOR'
            | 'BOARD_SECRETARY'
            | 'BOARD_TREASURER'
            | 'BOARD_SPORTS'
            | 'BOARD_OTHER'
            | 'REPRESENTATIVE'
            | 'SECONDARY_REPRESENTATIVE'
            | 'COURT_ORDERED_REPRESENTATIVE'
            | 'PROKURA'
            | 'PROKURA_SINGLE'
            | 'PROKURA_JOINT'
            | 'LIQUIDATOR'
            | 'INSOLVENCY_DIRECTOR'
            | 'PRELIMINARY_INSOLVENCY_DIRECTOR'
            | 'OWNER'
            | 'SHAREHOLDER'
            | 'PARTNER'
            | 'PERSONAL_LIABLE_DIRECTOR'
            | 'LIMITED_PARTNER'
            | 'OTHER';

          /**
           * German title, gender-neutral, as shown on openregister.de. Example: "Vorstand"
           */
          label_de: string;

          /**
           * Abbreviated German title, for dense layouts such as tables. Example: "Vst."
           */
          label_de_short: string;

          /**
           * English title. A translation for display, not a legal term — the German title is
           * the one the register uses. Example: "Executive Board Member"
           */
          label_en: string;

          /**
           * Abbreviated English title, for dense layouts such as tables. Example: "Exec.
           * Board"
           */
          label_en_short: string;
        }

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

          /**
           * Academic or professional title of the representative. Example: "Dr."
           */
          title?: string | null;
        }
      }

      /**
       * Basic information about an insolvency proceeding of the company. Use the
       * insolvency endpoint to retrieve all events of the proceeding.
       */
      export interface Insolvency {
        /**
         * Unique identifier of the insolvency proceeding.
         */
        id: string;

        /**
         * Case number of the proceeding at the court. Example: "36d IN 3382/25"
         */
        case_number: string;

        /**
         * Insolvency court handling the proceeding.
         */
        court: string;

        /**
         * Current status of the insolvency proceeding.
         */
        current_status: InsolvencyAPI.InsolvencyStatus;

        /**
         * Kind of administration ordered for the proceeding.
         */
        administration_kind?: InsolvencyAPI.InsolvencyAdministrationKind | null;

        /**
         * Date the proceeding was closed. Format: ISO 8601 (YYYY-MM-DD)
         */
        closed_at?: string | null;

        /**
         * Date the proceeding was opened. Format: ISO 8601 (YYYY-MM-DD)
         */
        opened_at?: string | null;

        /**
         * Kind of insolvency proceeding.
         */
        proceeding_kind?: InsolvencyAPI.InsolvencyProceedingKind | null;
      }
    }

    /**
     * The fetched document of a `document` job.
     */
    export interface Document {
      file_date: string | null;

      file_name: string | null;

      /**
       * Download URL of the document. It expires; read the job again for a new one.
       */
      url: string;
    }

    /**
     * The refreshed owners of an `owners` job.
     */
    export interface Owners {
      /**
       * When true, the returned owner data is the best available but may not reflect the
       * most current ownership state. This applies to AG and SE companies where
       * ownership data is sourced from Handelsregister decision and articles of
       * association documents, which are not filed on every ownership change.
       */
      best_available: boolean;

      /**
       * Unique company identifier. Example: DE-HRB-F1103-267645
       */
      company_id: string;

      owners: Array<Owners.Owner>;

      /**
       * Sources of the company owners data.
       */
      sources: Array<CompanyAPI.Source>;
    }

    export namespace Owners {
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
        legal_person: CompanyAPI.CompanyOwnerLegalPerson | null;

        /**
         * The name of the shareholder. E.g. "Max Mustermann" or "Max Mustermann GmbH"
         */
        name: string;

        /**
         * Details about the natural person.
         */
        natural_person: CompanyAPI.CompanyOwnerNaturalPerson | null;

        /**
         * Nominal value of shares in Euro. Example: 100
         */
        nominal_share: number;

        /**
         * Percentage of company ownership. Example: 5.36 represents 5.36% ownership
         */
        percentage_share: number | null;

        /**
         * Type of relationship between the entity and the company. Use `role_detail` for
         * the precise register role.
         */
        relation_type: CompanyAPI.CompanyRelationType;

        /**
         * The precise role as recorded in the register, plus ready-to-display titles. A
         * Kommanditist and a Gesellschafter both appear here with their register-level
         * role, while `relation_type` only carries the coarse bucket.
         */
        role_detail: Owner.RoleDetail;

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
         * The precise role as recorded in the register, plus ready-to-display titles. A
         * Kommanditist and a Gesellschafter both appear here with their register-level
         * role, while `relation_type` only carries the coarse bucket.
         */
        export interface RoleDetail {
          /**
           * The precise role as recorded in the register. Example: "EXECUTIVE" for a
           * Vorstand, "DIRECTOR" for a Geschäftsführer — both have role "DIRECTOR".
           */
          code:
            | 'DIRECTOR'
            | 'EMERGENCY_DIRECTOR'
            | 'EXECUTIVE'
            | 'CHAIRMAN'
            | 'DEPUTY_CHAIRMAN'
            | 'BOARD'
            | 'PRESIDENT_BOARD'
            | 'VICE_PRESIDENT_BOARD'
            | 'PRESIDENT'
            | 'MEMBER'
            | 'NON_EXECUTIVE_DIRECTOR'
            | 'BOARD_SECRETARY'
            | 'BOARD_TREASURER'
            | 'BOARD_SPORTS'
            | 'BOARD_OTHER'
            | 'REPRESENTATIVE'
            | 'SECONDARY_REPRESENTATIVE'
            | 'COURT_ORDERED_REPRESENTATIVE'
            | 'PROKURA'
            | 'PROKURA_SINGLE'
            | 'PROKURA_JOINT'
            | 'LIQUIDATOR'
            | 'INSOLVENCY_DIRECTOR'
            | 'PRELIMINARY_INSOLVENCY_DIRECTOR'
            | 'OWNER'
            | 'SHAREHOLDER'
            | 'PARTNER'
            | 'PERSONAL_LIABLE_DIRECTOR'
            | 'LIMITED_PARTNER'
            | 'OTHER';

          /**
           * German title, gender-neutral, as shown on openregister.de. Example: "Vorstand"
           */
          label_de: string;

          /**
           * Abbreviated German title, for dense layouts such as tables. Example: "Vst."
           */
          label_de_short: string;

          /**
           * English title. A translation for display, not a legal term — the German title is
           * the one the register uses. Example: "Executive Board Member"
           */
          label_en: string;

          /**
           * Abbreviated English title, for dense layouts such as tables. Example: "Exec.
           * Board"
           */
          label_en_short: string;
        }
      }
    }
  }
}

export type JobDocumentCategory =
  | 'current_printout'
  | 'chronological_printout'
  | 'historical_printout'
  | 'structured_information'
  | 'shareholder_list'
  | 'articles_of_association';

export type JobType = 'company' | 'owners' | 'document';

export interface JobCreateV1Params {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  type: JobType;

  document_category?: JobDocumentCategory;
}

export declare namespace JobResource {
  export {
    type Job as Job,
    type JobDocumentCategory as JobDocumentCategory,
    type JobType as JobType,
    type JobCreateV1Params as JobCreateV1Params,
  };
}
