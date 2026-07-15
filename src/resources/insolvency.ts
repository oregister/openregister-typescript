// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Insolvency extends APIResource {
  /**
   * Get detailed insolvency proceeding information
   */
  getDetailsV1(insolvencyID: string, options?: RequestOptions): APIPromise<InsolvencyGetDetailsV1Response> {
    return this._client.get(path`/v1/insolvency/${insolvencyID}`, options);
  }
}

/**
 * Kind of administration ordered for the proceeding.
 */
export type InsolvencyAdministrationKind =
  | 'external_administration'
  | 'self_administration'
  | 'protective_shield';

/**
 * Kind of debtor the proceeding concerns.
 *
 * - legal_person: legal entities (companies, associations, etc.)
 * - natural_person: private individuals
 */
export type InsolvencyDebtorKind = 'legal_person' | 'natural_person';

/**
 * Kind of insolvency proceeding.
 */
export type InsolvencyProceedingKind = 'regular_insolvency' | 'consumer_insolvency';

/**
 * Current status of the insolvency proceeding.
 */
export type InsolvencyStatus =
  | 'preliminary'
  | 'opened'
  | 'rejected_no_assets'
  | 'mass_insufficient'
  | 'plan_supervised'
  | 'lifted'
  | 'discontinued'
  | 'discharge_pending'
  | 'discharge_granted'
  | 'discharge_denied'
  | 'discharge_revoked'
  | 'unknown';

/**
 * An insolvency proceeding with all of its published events.
 */
export interface InsolvencyGetDetailsV1Response {
  /**
   * Unique identifier of the insolvency proceeding.
   */
  id: string;

  /**
   * Case number of the proceeding at the court. Example: "36d IN 3382/25"
   */
  case_number: string;

  /**
   * Unique company identifier of the debtor, if the debtor is a registered company.
   * Example: DE-HRB-F1103-267645
   */
  company_id: string | null;

  /**
   * Insolvency court handling the proceeding.
   */
  court: string;

  /**
   * Current status of the insolvency proceeding.
   */
  current_status: InsolvencyStatus;

  /**
   * Name of the debtor as published by the court.
   */
  debtor_name: string;

  /**
   * All published events of the proceeding, ordered by date.
   */
  events: Array<InsolvencyGetDetailsV1Response.Event>;

  /**
   * Grounds for the insolvency (e.g. Zahlungsunfähigkeit, Überschuldung).
   */
  insolvency_grounds: Array<string>;

  /**
   * Kind of administration ordered for the proceeding.
   */
  administration_kind?: InsolvencyAdministrationKind | null;

  /**
   * Address of the insolvency administrator.
   */
  administrator_address?: string | null;

  /**
   * Name of the insolvency administrator.
   */
  administrator_name?: string | null;

  /**
   * Deadline for creditors to file their claims.
   */
  claims_filing_deadline?: string | null;

  /**
   * Date the proceeding was closed.
   */
  closed_at?: string | null;

  /**
   * Kind of debtor the proceeding concerns.
   *
   * - legal_person: legal entities (companies, associations, etc.)
   * - natural_person: private individuals
   */
  debtor_kind?: InsolvencyDebtorKind | null;

  /**
   * Legal form of the debtor as published by the court.
   */
  debtor_legal_form?: string | null;

  /**
   * Amount available for distribution, in euros.
   */
  distribution_available?: number | null;

  /**
   * Total registered claims in the distribution, in euros.
   */
  distribution_claims_total?: number | null;

  /**
   * Publication date of the first known event of the proceeding.
   */
  first_event_at?: string | null;

  /**
   * Publication date of the most recent known event of the proceeding.
   */
  last_event_at?: string | null;

  /**
   * Date the proceeding was opened.
   */
  opened_at?: string | null;

  /**
   * Kind of insolvency proceeding.
   */
  proceeding_kind?: InsolvencyProceedingKind | null;
}

export namespace InsolvencyGetDetailsV1Response {
  /**
   * A single published event of an insolvency proceeding, derived from an official
   * court publication.
   */
  export interface Event {
    /**
     * Unique identifier of the event.
     */
    id: string;

    /**
     * Structured details extracted from the publication, where available.
     */
    details: Event.Details;

    /**
     * Lifecycle event type of the insolvency proceeding.
     */
    event_type:
      | 'preliminary_measures'
      | 'preliminary_measures_lifted'
      | 'proceedings_opened'
      | 'rejected_insufficient_assets'
      | 'in_proceeding_decision'
      | 'mass_insufficiency_notified'
      | 'distribution_announced'
      | 'distribution_record_filed'
      | 'final_distribution_announced'
      | 'proceedings_lifted'
      | 'proceedings_discontinued'
      | 'proceedings_terminated'
      | 'post_termination_decision'
      | 'subsequent_distribution_ordered'
      | 'discharge_pending'
      | 'discharge_granted'
      | 'discharge_denied'
      | 'discharge_revoked'
      | 'plan_confirmed'
      | 'plan_supervision_ordered'
      | 'plan_supervision_terminated'
      | 'other';

    /**
     * Date the event was published by the court.
     */
    published_at: string;

    /**
     * Category of the official publication the event was derived from.
     */
    report_type:
      | 'security_measures'
      | 'rejection_for_insufficiency_of_assets'
      | 'openings'
      | 'decisions_in_proceedings'
      | 'misc'
      | 'decisions_after_termination'
      | 'distribution_lists'
      | 'decisions_in_discharge_proceedings'
      | 'supervised_insolvency_plans';

    /**
     * Short summary of the publication.
     */
    summary: string;

    /**
     * Date of the court decision, if published.
     */
    decision_date?: string | null;

    /**
     * Date the decision takes effect, if published.
     */
    effective_at?: string | null;
  }

  export namespace Event {
    /**
     * Structured details extracted from the publication, where available.
     */
    export interface Details {
      insolvency_grounds: Array<string>;

      meetings: Array<Details.Meeting>;

      administrator_address?: string | null;

      administrator_name?: string | null;

      claims_filing_deadline?: string | null;

      closed_at?: string | null;

      discharge_granted?: boolean | null;

      distribution_available?: string | null;

      distribution_claims_total?: string | null;
    }

    export namespace Details {
      /**
       * A creditor meeting or hearing announced in the publication.
       */
      export interface Meeting {
        kind: string;

        at?: string | null;

        location?: string | null;
      }
    }
  }
}

export declare namespace Insolvency {
  export {
    type InsolvencyAdministrationKind as InsolvencyAdministrationKind,
    type InsolvencyDebtorKind as InsolvencyDebtorKind,
    type InsolvencyProceedingKind as InsolvencyProceedingKind,
    type InsolvencyStatus as InsolvencyStatus,
    type InsolvencyGetDetailsV1Response as InsolvencyGetDetailsV1Response,
  };
}
