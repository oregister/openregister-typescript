// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RequestAPI from './request';
import { Request, RequestCreateV1Params, RequestCreateV1Response, RequestGetV1Response } from './request';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Transparenzregister extends APIResource {
  request: RequestAPI.Request = new RequestAPI.Request(this._client);

  /**
   * Store username and password credentials for accessing the Transparenzregister
   * API. These credentials will be used for subsequent requests to retrieve company
   * documents.
   */
  setCredentialsV1(
    body: TransparenzregisterSetCredentialsV1Params,
    options?: RequestOptions,
  ): APIPromise<void> {
    return this._client.post('/v1/transparenzregister/credentials', {
      body,
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface TransparenzregisterSetCredentialsV1Params {
  /**
   * Password for Transparenzregister API access.
   */
  password: string;

  /**
   * Username for Transparenzregister API access. Example:
   * "testnutzer-eis@transparenzregister.de"
   */
  username: string;

  /**
   * Label to identify this set of credentials. Allows storing multiple
   * Transparenzregister credentials per user (e.g., for different accounts or
   * clients). Defaults to 'default' if not provided. Example: "client_a"
   */
  credential_label?: string;
}

Transparenzregister.Request = Request;

export declare namespace Transparenzregister {
  export { type TransparenzregisterSetCredentialsV1Params as TransparenzregisterSetCredentialsV1Params };

  export {
    Request as Request,
    type RequestCreateV1Response as RequestCreateV1Response,
    type RequestGetV1Response as RequestGetV1Response,
    type RequestCreateV1Params as RequestCreateV1Params,
  };
}
