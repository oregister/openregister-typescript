// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Request extends APIResource {
  /**
   * Submit a Transparenzregister request for a company using its company ID. This
   * endpoint will initiate the Transparenzregister request process and return a
   * request ID for tracking.
   */
  createV1(
    params: RequestCreateV1Params | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<RequestCreateV1Response> {
    const { company_id, 'X-Credential-Label': xCredentialLabel } = params ?? {};
    return this._client.post('/v1/transparenzregister/request', {
      query: { company_id },
      ...options,
      headers: buildHeaders([
        { ...(xCredentialLabel != null ? { 'X-Credential-Label': xCredentialLabel } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get the results of a Transparenzregister request. This endpoint handles all
   * internal complexity including polling request status, selecting all available
   * documents, creating Transparenzregister baskets, and returning download URLs
   * when ready. If the request is still processing, it will return a pending status.
   */
  getV1(requestID: string, options?: RequestOptions): APIPromise<RequestGetV1Response> {
    return this._client.get(path`/v1/transparenzregister/request/${requestID}`, options);
  }
}

/**
 * Response from submitting a document request.
 */
export interface RequestCreateV1Response {
  /**
   * Request ID for tracking the document request. Example: "req_12345678"
   */
  request_id: string;
}

/**
 * Response containing document request results and download URLs. All internal
 * complexity (document IDs, baskets, polling) is handled automatically.
 */
export interface RequestGetV1Response {
  /**
   * Request ID that was used to submit the request. Example: "req_12345678"
   */
  request_id: string;

  /**
   * Status of the Transparenzregister request.
   */
  status: 'completed' | 'processing' | 'failed';

  /**
   * URLs for downloading all available documents.
   */
  download_urls?: Array<RequestGetV1Response.DownloadURL>;
}

export namespace RequestGetV1Response {
  /**
   * Download URL for a document with format information.
   */
  export interface DownloadURL {
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
}

export interface RequestCreateV1Params {
  /**
   * Query param: Unique company identifier. Required unless using
   * X-Credential-Label=test. Example: DE-HRB-F1103-267645
   */
  company_id?: string;

  /**
   * Header param: Label identifying which credentials to use. Uses 'default' if not
   * provided. Example: "client_a"
   */
  'X-Credential-Label'?: string;
}

export declare namespace Request {
  export {
    type RequestCreateV1Response as RequestCreateV1Response,
    type RequestGetV1Response as RequestGetV1Response,
    type RequestCreateV1Params as RequestCreateV1Params,
  };
}
