// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as RequestAPI from './request';
import { Request } from './request';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';

export class Transparenzregister extends APIResource {
  request: RequestAPI.Request = new RequestAPI.Request(this._client);

  /**
   * Store username and password credentials for accessing the Transparenzregister
   * API. These credentials will be used for subsequent requests to retrieve company
   * documents. Credential names are user-scoped; the reserved name `sandbox` cannot
   * be used. Credentials are validated against Transparenzregister before they are
   * persisted.
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
   * Username for Transparenzregister API access. Example: "compliance@example.com"
   */
  username: string;

  /**
   * Name to identify this set of credentials. Allows storing multiple
   * Transparenzregister credentials per user (e.g., for different accounts or
   * clients). Defaults to 'default' if not provided. Cannot be `sandbox` because
   * that name is reserved for test-mode extracts. Example: "client_a"
   */
  name?: string;
}

Transparenzregister.Request = Request;

export declare namespace Transparenzregister {
  export { type TransparenzregisterSetCredentialsV1Params as TransparenzregisterSetCredentialsV1Params };

  export { Request as Request };
}
