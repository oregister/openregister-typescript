// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CompanyAPI from './company';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class JobResource extends APIResource {
  /**
   * Start a realtime request without waiting for it. The request returns at once
   * with a pending job. Use this instead of `realtime=true` when your client cannot
   * keep a request open for the minutes the Handelsregister may take.
   *
   * Job types:
   *
   * - `company`: refreshes the company from the Handelsregister, like
   *   `GET /v1/company/{company_id}?realtime=true`.
   * - `owners`: refreshes the company's owners, like
   *   `GET /v1/company/{company_id}/owners?realtime=true`.
   * - `document`: fetches one document, like `GET /v1/document`. Requires
   *   `document_category`.
   *
   * Follow a job either way, or both:
   *
   * - Poll `GET /v1/jobs/{job_id}` until `status` is `completed` or `failed`. A
   *   completed job carries its result in `results`: the document for a `document`
   *   job, the company or its owners for a `company` or `owners` job.
   * - Configure a webhook endpoint: when the job finishes, OpenRegister sends a
   *   `job.completed` or `job.failed` webhook to it. The job can be polled all the
   *   same.
   *
   * Jobs are available on paid plans. A completed job costs what the same request
   * with `realtime=true` costs: 20 credits for `company` and `owners`, 10 for
   * `document`. Failed jobs and polling are free.
   */
  createV1(body: JobCreateV1Params, options?: RequestOptions): APIPromise<Job> {
    return this._client.post('/v1/jobs', { body, ...options });
  }

  /**
   * Get a job's status and, once it completed, its result in `results`. Polling is
   * free.
   *
   * - `document` jobs return `results.document` with a download URL, presigned again
   *   on every read.
   * - `company` jobs return `results.company`, the same as
   *   `GET /v1/company/{company_id}`.
   * - `owners` jobs return `results.owners`, the same as
   *   `GET /v1/company/{company_id}/owners`.
   *
   * Results are returned for 12 hours after the job finished (`expires_at`); after
   * that, `results` is null and the regular endpoints serve the data.
   */
  getV1(jobID: string, options?: RequestOptions): APIPromise<Job> {
    return this._client.get(path`/v1/jobs/${jobID}`, options);
  }
}

export interface Job {
  /**
   * Unique job identifier. Example: f47ac10b-58cc-4372-a567-0e02b2c3d479
   */
  id: string;

  /**
   * Company the job refreshes. For `company` and `owners` jobs this is the company's
   * latest register ID, which differs from the requested one when the company moved
   * to another register. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  created_at: string;

  document_category: JobDocumentCategory | null;

  /**
   * Until when a completed job returns `results`, 12 hours after it finished.
   */
  expires_at: string | null;

  finished_at: string | null;

  /**
   * Why a failed job failed:
   *
   * - `not_available`: the register holds no such document for this company.
   * - `timeout`: the Handelsregister did not answer in time; try again later.
   * - `internal_error`: any other failure.
   */
  reason: 'not_available' | 'timeout' | 'internal_error' | null;

  /**
   * The result of a completed job. Only the field of the job's type is set.
   */
  results: Job.Results | null;

  status: 'pending' | 'completed' | 'failed';

  type: JobType;
}

export namespace Job {
  /**
   * The result of a completed job. Only the field of the job's type is set.
   */
  export interface Results {
    /**
     * The refreshed company of a `company` job.
     */
    company: CompanyAPI.CompanyV1 | null;

    /**
     * The fetched document of a `document` job.
     */
    document: Results.Document | null;

    /**
     * The refreshed owners of an `owners` job.
     */
    owners: CompanyAPI.CompanyOwners | null;
  }

  export namespace Results {
    /**
     * The fetched document of a `document` job.
     */
    export interface Document {
      file_date: string | null;

      file_name: string | null;

      /**
       * Download URL of the document. It expires; read the job again for a new one.
       */
      url: string;
    }
  }
}

export type JobDocumentCategory =
  | 'current_printout'
  | 'chronological_printout'
  | 'historical_printout'
  | 'structured_information'
  | 'shareholder_list'
  | 'articles_of_association';

export type JobType = 'company' | 'owners' | 'document';

export interface JobCreateV1Params {
  /**
   * Unique company identifier. Example: DE-HRB-F1103-267645
   */
  company_id: string;

  type: JobType;

  document_category?: JobDocumentCategory;
}

export declare namespace JobResource {
  export {
    type Job as Job,
    type JobDocumentCategory as JobDocumentCategory,
    type JobType as JobType,
    type JobCreateV1Params as JobCreateV1Params,
  };
}
