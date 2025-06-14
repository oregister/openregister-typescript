// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Openregister } from '../client';

export abstract class APIResource {
  protected _client: Openregister;

  constructor(client: Openregister) {
    this._client = client;
  }
}
