// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Extract extends APIResource {
  /**
   * Submit a Transparenzregister extract request and return an extract resource with
   * processing status.
   *
   * Sandbox integration testing (recommended for all non-production testing):
   *
   * - Send `X-Credential-Name: sandbox`.
   * - Do not send `company_id` (an empty body `{}` is valid).
   * - OpenRegister uses the Transparenzregister test environment and built-in test
   *   authentication.
   * - The request is submitted with the fixed test EKRN `DE727032388716`.
   * - The response has `company_id: null`.
   *
   * Production usage:
   *
   * - Always set `X-Credential-Name` to `default` or another stored credential name.
   * - `company_id` is required and must resolve to exactly one Transparenzregister
   *   legal entity.
   */
  createV1(params: ExtractCreateV1Params, options?: RequestOptions): APIPromise<ExtractCreateV1Response> {
    const { 'X-Credential-Name': xCredentialName, ...body } = params;
    return this._client.post('/v1/transparenzregister/extracts', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(xCredentialName != null ? { 'X-Credential-Name': xCredentialName } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get the results of a Transparenzregister extract request. This endpoint handles
   * all internal complexity including polling request status, selecting all
   * available documents, creating Transparenzregister baskets, and returning
   * download URLs when ready. If the request is still processing, it will return a
   * pending status. Polling reuses the credential mode stored on the extract at
   * create time. Sandbox extracts keep using the Transparenzregister test client
   * automatically; no credential header is accepted on this endpoint.
   */
  getV1(extractID: string, options?: RequestOptions): APIPromise<TransparenzregisterExtract> {
    return this._client.get(path`/v1/transparenzregister/extracts/${extractID}`, options);
  }
}

/**
 * Download URL for a document with format information.
 */
export interface TransparenzregisterDocument {
  /**
   * Stable UUID for this document.
   */
  document_id: string;

  /**
   * Suggested filename for the download. Example: "registerauszug_company_12345.pdf"
   */
  filename: string;

  /**
   * Format of the downloadable document. Example: "xml", "pdf", "json"
   */
  format: string;

  /**
   * Download URL for the document. Example:
   * "https://api.example.com/download/abc123"
   */
  url: string;
}

/**
 * Transparenzregister extract resource including processing state, parsed report,
 * and downloadable documents.
 */
export interface TransparenzregisterExtract {
  /**
   * Stable extract identifier. Example: "tre_12345678"
   */
  id: string;

  /**
   * Status of the Transparenzregister extract.
   */
  status: 'completed' | 'processing' | 'failed';

  /**
   * Company identifier associated with this extract request. May be null when using
   * sandbox credentials.
   */
  company_id?: string | null;

  /**
   * Timestamp when extract processing completed.
   */
  completed_at?: string | null;

  /**
   * URLs for downloading available extract documents.
   */
  documents?: Array<TransparenzregisterDocument>;

  /**
   * EKRN used to request this extract.
   */
  ekrn?: string | null;

  /**
   * Transparenzregister reference number from the extract.
   */
  reference_number?: string | null;

  /**
   * Parsed Transparenzregister extract report limited to UBO-relevant fields.
   */
  report?: TransparenzregisterReport | null;

  /**
   * Timestamp when extract submission started.
   */
  submitted_at?: string;
}

export interface TransparenzregisterGroup {
  description?: string | null;

  interest_type?: string | null;

  position?: number;
}

/**
 * Parsed Transparenzregister extract report limited to UBO-relevant fields.
 */
export interface TransparenzregisterReport {
  /**
   * Extract creation date.
   */
  created_at?: string | null;

  /**
   * Reason indicating no natural person UBO could be determined.
   */
  fictional_ubo_reason?: string | null;

  groups?: Array<TransparenzregisterGroup>;

  /**
   * Type of Transparenzregister notice.
   */
  notice_type?: string | null;

  status_flags?: TransparenzregisterStatusFlags | null;

  ubos?: Array<TransparenzregisterUbo>;

  validity?: TransparenzregisterValidity | null;
}

export interface TransparenzregisterStatusFlags {
  corrected_by_reference?: string | null;

  corrected_references?: Array<string>;

  deleted?: boolean;

  deletion_date?: string | null;

  discrepancy_note?: string | null;
}

export interface TransparenzregisterUbo {
  interest?: TransparenzregisterUboInterest | null;

  natural_person?: TransparenzregisterUboNaturalPerson | null;

  position?: number;
}

export interface TransparenzregisterUboInterest {
  percentage?: number | null;

  scope?: string | null;

  type?: string | null;
}

export interface TransparenzregisterUboNaturalPerson {
  city?: string | null;

  country?: string | null;

  date_of_birth?: string | null;

  first_name?: string | null;

  full_name?: string | null;

  last_name?: string | null;

  /**
   * ISO 3166-1 alpha-2 nationality codes where available.
   */
  nationalities?: Array<string>;

  title?: string | null;
}

export interface TransparenzregisterValidity {
  from?: TransparenzregisterValidityPoint | null;

  until?: TransparenzregisterValidityPoint | null;
}

export interface TransparenzregisterValidityPoint {
  date?: string | null;

  note?: string | null;
}

/**
 * Response from creating a Transparenzregister extract. Only fields known at
 * creation time are present. Poll
 * `GET /v1/transparenzregister/extracts/{extract_id}` to retrieve report and
 * documents.
 */
export interface ExtractCreateV1Response {
  /**
   * Stable extract identifier. Use this to poll the get-extract endpoint. Example:
   * "tre_12345678"
   */
  id: string;

  /**
   * Company identifier associated with this extract request. May be null when using
   * sandbox credentials.
   */
  company_id: string | null;

  /**
   * EKRN used to request this extract.
   */
  ekrn: string | null;

  /**
   * Always `processing` on create. Poll the get-extract endpoint for terminal state.
   */
  status: 'processing';

  /**
   * Timestamp when extract submission started.
   */
  submitted_at: string;
}

export interface ExtractCreateV1Params {
  /**
   * Body param: Unique company identifier. Required unless `X-Credential-Name` is
   * set to `sandbox`. In sandbox mode this field should be omitted. Example:
   * DE-HRB-F1103-267645
   */
  company_id?: string;

  /**
   * Header param: Name identifying which credentials to use. Always send this header
   * in production (typically `default` or another stored name). Reserved values:
   *
   * - default: use persisted default credentials for the current user.
   * - sandbox: use OpenRegister's built-in Transparenzregister test client, test
   *   authentication, and fixed test EKRN. Any other value selects persisted
   *   credentials with the same name for the current user. Example: "client_a"
   */
  'X-Credential-Name'?: string;
}

export declare namespace Extract {
  export {
    type TransparenzregisterDocument as TransparenzregisterDocument,
    type TransparenzregisterExtract as TransparenzregisterExtract,
    type TransparenzregisterGroup as TransparenzregisterGroup,
    type TransparenzregisterReport as TransparenzregisterReport,
    type TransparenzregisterStatusFlags as TransparenzregisterStatusFlags,
    type TransparenzregisterUbo as TransparenzregisterUbo,
    type TransparenzregisterUboInterest as TransparenzregisterUboInterest,
    type TransparenzregisterUboNaturalPerson as TransparenzregisterUboNaturalPerson,
    type TransparenzregisterValidity as TransparenzregisterValidity,
    type TransparenzregisterValidityPoint as TransparenzregisterValidityPoint,
    type ExtractCreateV1Response as ExtractCreateV1Response,
    type ExtractCreateV1Params as ExtractCreateV1Params,
  };
}
