// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DocumentAPI from './document';
import { Document, DocumentCreateParams, DocumentCreateResponse, DocumentRetrieveResponse } from './document';

export class Jobs extends APIResource {
  document: DocumentAPI.Document = new DocumentAPI.Document(this._client);
}

Jobs.Document = Document;

export declare namespace Jobs {
  export {
    Document as Document,
    type DocumentCreateResponse as DocumentCreateResponse,
    type DocumentRetrieveResponse as DocumentRetrieveResponse,
    type DocumentCreateParams as DocumentCreateParams,
  };
}
