// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Document extends APIResource {
  /**
   * Create a document job
   */
  create(body: DocumentCreateParams, options?: RequestOptions): APIPromise<DocumentCreateResponse> {
    return this._client.post('/v0/jobs/document', { body, ...options });
  }

  /**
   * Get document job status
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<DocumentRetrieveResponse> {
    return this._client.get(path`/v0/jobs/document/${id}`, options);
  }
}

export interface DocumentCreateResponse {
  /**
   * Unique job identifier. Example: f47ac10b-58cc-4372-a567-0e02b2c3d479
   */
  id: string;
}

export interface DocumentRetrieveResponse {
  status: 'pending' | 'completed' | 'failed';

  url?: string;
}

export interface DocumentCreateParams {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  document_category:
    | 'current_printout'
    | 'chronological_printout'
    | 'historical_printout'
    | 'structured_information'
    | 'shareholder_list'
    | 'articles_of_association';
}

export declare namespace Document {
  export {
    type DocumentCreateResponse as DocumentCreateResponse,
    type DocumentRetrieveResponse as DocumentRetrieveResponse,
    type DocumentCreateParams as DocumentCreateParams,
  };
}
