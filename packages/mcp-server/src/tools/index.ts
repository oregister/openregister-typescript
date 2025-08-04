// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import autocomplete_companies_v1_search from './search/autocomplete-companies-v1-search';
import find_companies_v0_search from './search/find-companies-v0-search';
import find_companies_v1_search from './search/find-companies-v1-search';
import find_person_search from './search/find-person-search';
import lookup_company_by_url_search from './search/lookup-company-by-url-search';
import retrieve_company from './company/retrieve-company';
import get_holdings_v1_company from './company/get-holdings-v1-company';
import get_owners_v1_company from './company/get-owners-v1-company';
import list_shareholders_company from './company/list-shareholders-company';
import retrieve_contact_company from './company/retrieve-contact-company';
import retrieve_financials_company from './company/retrieve-financials-company';
import retrieve_document from './document/retrieve-document';
import download_document from './document/download-document';
import create_jobs_document from './jobs/document/create-jobs-document';
import retrieve_jobs_document from './jobs/document/retrieve-jobs-document';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(autocomplete_companies_v1_search);
addEndpoint(find_companies_v0_search);
addEndpoint(find_companies_v1_search);
addEndpoint(find_person_search);
addEndpoint(lookup_company_by_url_search);
addEndpoint(retrieve_company);
addEndpoint(get_holdings_v1_company);
addEndpoint(get_owners_v1_company);
addEndpoint(list_shareholders_company);
addEndpoint(retrieve_contact_company);
addEndpoint(retrieve_financials_company);
addEndpoint(retrieve_document);
addEndpoint(download_document);
addEndpoint(create_jobs_document);
addEndpoint(retrieve_jobs_document);

export type Filter = {
  type: 'resource' | 'operation' | 'tag' | 'tool';
  op: 'include' | 'exclude';
  value: string;
};

export function query(filters: Filter[], endpoints: Endpoint[]): Endpoint[] {
  const allExcludes = filters.length > 0 && filters.every((filter) => filter.op === 'exclude');
  const unmatchedFilters = new Set(filters);

  const filtered = endpoints.filter((endpoint: Endpoint) => {
    let included = false || allExcludes;

    for (const filter of filters) {
      if (match(filter, endpoint)) {
        unmatchedFilters.delete(filter);
        included = filter.op === 'include';
      }
    }

    return included;
  });

  // Check if any filters didn't match
  const unmatched = Array.from(unmatchedFilters).filter((f) => f.type === 'tool' || f.type === 'resource');
  if (unmatched.length > 0) {
    throw new Error(
      `The following filters did not match any endpoints: ${unmatched
        .map((f) => `${f.type}=${f.value}`)
        .join(', ')}`,
    );
  }

  return filtered;
}

function match({ type, value }: Filter, endpoint: Endpoint): boolean {
  switch (type) {
    case 'resource': {
      const regexStr = '^' + normalizeResource(value).replace(/\*/g, '.*') + '$';
      const regex = new RegExp(regexStr);
      return regex.test(normalizeResource(endpoint.metadata.resource));
    }
    case 'operation':
      return endpoint.metadata.operation === value;
    case 'tag':
      return endpoint.metadata.tags.includes(value);
    case 'tool':
      return endpoint.tool.name === value;
  }
}

function normalizeResource(resource: string): string {
  return resource.toLowerCase().replace(/[^a-z.*\-_]*/g, '');
}
