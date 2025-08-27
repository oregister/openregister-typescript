// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Document extends APIResource {
  /**
   * Get document information
   */
  documentCached(documentID: string, options?: RequestOptions): APIPromise<DocumentDocumentCachedResponse> {
    return this._client.get(path`/v1/document/${documentID}`, options);
  }

  /**
   * Fetch a document in realtime.
   */
  fetch(query: DocumentFetchParams, options?: RequestOptions): APIPromise<DocumentFetchResponse> {
    return this._client.get('/v1/document', { query, ...options });
  }
}

export interface DocumentDocumentCachedResponse {
  /**
   * The unique identifier for the document. E.g.
   * "f47ac10b-58cc-4372-a567-0e02b2c3d479"
   */
  id: string;

  /**
   * The date of the document. E.g. "2022-01-01"
   */
  date: string;

  /**
   * The name of the document. E.g. "Musterprotokoll vom 01.01.2022"
   */
  name: string;

  /**
   * The type of document.
   */
  type: 'articles_of_association' | 'sample_protocol' | 'shareholder_list';

  /**
   * The URL of the document. It can be downloaded from there. Only valid for 15
   * minutes after the request.
   */
  url: string;
}

export interface DocumentFetchResponse {
  category:
    | 'current_printout'
    | 'chronological_printout'
    | 'historical_printout'
    | 'structured_information'
    | 'shareholder_list'
    | 'articles_of_association';

  file_date: string | null;

  file_name: string | null;

  url: string;
}

export interface DocumentFetchParams {
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
    type DocumentDocumentCachedResponse as DocumentDocumentCachedResponse,
    type DocumentFetchResponse as DocumentFetchResponse,
    type DocumentFetchParams as DocumentFetchParams,
  };
}
