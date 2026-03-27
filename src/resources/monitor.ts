// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Monitor extends APIResource {
  /**
   * Create webhook monitor item
   */
  create(body: MonitorCreateParams, options?: RequestOptions): APIPromise<MonitorCreateResponse> {
    return this._client.post('/v1/monitor', { body, ...options });
  }

  /**
   * List webhook monitor items
   */
  list(options?: RequestOptions): APIPromise<MonitorListResponse> {
    return this._client.get('/v1/monitor', options);
  }

  /**
   * Delete webhook monitor item
   */
  delete(entityID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/monitor/${entityID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface MonitorCreateResponse {
  /**
   * Whether the monitor item is disabled.
   */
  disabled: boolean;

  /**
   * For `company` this is the register ID (e.g. `DE-HRB-F1103-267645`). For `person`
   * this is the person UUID.
   */
  entity_id: string;

  /**
   * Type of the entity to monitor.
   */
  entity_type: 'company' | 'person';

  /**
   * Preferences for the entity to monitor. Use `WebhookMonitorCompanyPreference`
   * values when `entity_type` is `company`, and `WebhookMonitorPersonPreference`
   * values when `entity_type` is `person`.
   */
  preferences: Array<
    | 'basic'
    | 'representation'
    | 'financials'
    | 'documents'
    | 'ownership'
    | 'holdings'
    | 'management_positions'
  >;
}

export interface MonitorListResponse {
  /**
   * List of webhook monitor items.
   */
  items: Array<MonitorListResponse.Item>;
}

export namespace MonitorListResponse {
  export interface Item {
    /**
     * Whether the monitor item is disabled.
     */
    disabled: boolean;

    /**
     * For `company` this is the register ID (e.g. `DE-HRB-F1103-267645`). For `person`
     * this is the person UUID.
     */
    entity_id: string;

    /**
     * Type of the entity to monitor.
     */
    entity_type: 'company' | 'person';

    /**
     * Preferences for the entity to monitor. Use `WebhookMonitorCompanyPreference`
     * values when `entity_type` is `company`, and `WebhookMonitorPersonPreference`
     * values when `entity_type` is `person`.
     */
    preferences: Array<
      | 'basic'
      | 'representation'
      | 'financials'
      | 'documents'
      | 'ownership'
      | 'holdings'
      | 'management_positions'
    >;
  }
}

export interface MonitorCreateParams {
  /**
   * For `company` this is the register ID (e.g. `DE-HRB-F1103-267645`). For `person`
   * this is the person UUID.
   */
  entity_id: string;

  /**
   * Type of the entity to monitor.
   */
  entity_type: 'company' | 'person';

  /**
   * Preferences for the entity to monitor. Use `WebhookMonitorCompanyPreference`
   * values when `entity_type` is `company`, and `WebhookMonitorPersonPreference`
   * values when `entity_type` is `person`.
   */
  preferences: Array<
    | 'basic'
    | 'representation'
    | 'financials'
    | 'documents'
    | 'ownership'
    | 'holdings'
    | 'management_positions'
  >;
}

export declare namespace Monitor {
  export {
    type MonitorCreateResponse as MonitorCreateResponse,
    type MonitorListResponse as MonitorListResponse,
    type MonitorCreateParams as MonitorCreateParams,
  };
}
