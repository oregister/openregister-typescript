// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, Endpoint, HandlerFunction } from './types';

export { Metadata, Endpoint, HandlerFunction };

import autocomplete_companies_v1_search from './search/autocomplete-companies-v1-search';
import find_companies_v1_search from './search/find-companies-v1-search';
import find_person_v1_search from './search/find-person-v1-search';
import lookup_company_by_url_search from './search/lookup-company-by-url-search';
import get_contact_v0_company from './company/get-contact-v0-company';
import get_details_v1_company from './company/get-details-v1-company';
import get_financials_v1_company from './company/get-financials-v1-company';
import get_holdings_v1_company from './company/get-holdings-v1-company';
import get_owners_v1_company from './company/get-owners-v1-company';
import get_cached_v1_document from './document/get-cached-v1-document';
import get_realtime_v1_document from './document/get-realtime-v1-document';
import get_details_v1_person from './person/get-details-v1-person';
import get_holdings_v1_person from './person/get-holdings-v1-person';

export const endpoints: Endpoint[] = [];

function addEndpoint(endpoint: Endpoint) {
  endpoints.push(endpoint);
}

addEndpoint(autocomplete_companies_v1_search);
addEndpoint(find_companies_v1_search);
addEndpoint(find_person_v1_search);
addEndpoint(lookup_company_by_url_search);
addEndpoint(get_contact_v0_company);
addEndpoint(get_details_v1_company);
addEndpoint(get_financials_v1_company);
addEndpoint(get_holdings_v1_company);
addEndpoint(get_owners_v1_company);
addEndpoint(get_cached_v1_document);
addEndpoint(get_realtime_v1_document);
addEndpoint(get_details_v1_person);
addEndpoint(get_holdings_v1_person);

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
