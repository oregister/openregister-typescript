// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Usage extends APIResource {
  /**
   * Retrieve public API credit usage
   */
  getUsageV1(options?: RequestOptions): APIPromise<UsageGetUsageV1Response> {
    return this._client.get('/v1/credits', options);
  }
}

export interface UsageGetUsageV1Response {
  included_credits: number;

  /**
   * Credits above the included allowance.
   */
  overage_credits: number;

  paid: boolean;

  period: UsageGetUsageV1Response.Period;

  /**
   * Never negative; zero once usage exceeds included credits.
   */
  remaining_credits: number;

  used_credits: number;
}

export namespace UsageGetUsageV1Response {
  export interface Period {
    reset_at: string;

    /**
     * billing_cycle for paid plans; rolling_30_days for the free plan, where the
     * window starts with the first request.
     */
    type: 'billing_cycle' | 'rolling_30_days';
  }
}

export declare namespace Usage {
  export { type UsageGetUsageV1Response as UsageGetUsageV1Response };
}
