// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Document extends APIResource {
  /**
   * Get document information
   */
  retrieve(documentID: string, options?: RequestOptions): APIPromise<DocumentRetrieveResponse> {
    return this._client.get(path`/v0/document/${documentID}`, options);
  }
}

export interface DocumentRetrieveResponse {
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

export declare namespace Document {
  export { type DocumentRetrieveResponse as DocumentRetrieveResponse };
}
