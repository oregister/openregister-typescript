import { McpOptions } from './options';

export type SdkMethod = {
  clientCallName: string;
  fullyQualifiedName: string;
  httpMethod?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'query';
  httpPath?: string;
};

export const sdkMethods: SdkMethod[] = [
  {
    clientCallName: 'client.search.autocompleteCompaniesV1',
    fullyQualifiedName: 'search.autocompleteCompaniesV1',
    httpMethod: 'get',
    httpPath: '/v1/autocomplete/company',
  },
  {
    clientCallName: 'client.search.findCompaniesV1',
    fullyQualifiedName: 'search.findCompaniesV1',
    httpMethod: 'post',
    httpPath: '/v1/search/company',
  },
  {
    clientCallName: 'client.search.findPersonV1',
    fullyQualifiedName: 'search.findPersonV1',
    httpMethod: 'post',
    httpPath: '/v1/search/person',
  },
  {
    clientCallName: 'client.search.lookupCompanyByURL',
    fullyQualifiedName: 'search.lookupCompanyByURL',
    httpMethod: 'get',
    httpPath: '/v0/search/lookup',
  },
  {
    clientCallName: 'client.company.getContactV0',
    fullyQualifiedName: 'company.getContactV0',
    httpMethod: 'get',
    httpPath: '/v0/company/{company_id}/contact',
  },
  {
    clientCallName: 'client.company.getDetailsV1',
    fullyQualifiedName: 'company.getDetailsV1',
    httpMethod: 'get',
    httpPath: '/v1/company/{company_id}',
  },
  {
    clientCallName: 'client.company.getFinancialsV1',
    fullyQualifiedName: 'company.getFinancialsV1',
    httpMethod: 'get',
    httpPath: '/v1/company/{company_id}/financials',
  },
  {
    clientCallName: 'client.company.getHoldingsV1',
    fullyQualifiedName: 'company.getHoldingsV1',
    httpMethod: 'get',
    httpPath: '/v1/company/{company_id}/holdings',
  },
  {
    clientCallName: 'client.company.getOwnersV1',
    fullyQualifiedName: 'company.getOwnersV1',
    httpMethod: 'get',
    httpPath: '/v1/company/{company_id}/owners',
  },
  {
    clientCallName: 'client.company.getUbosV1',
    fullyQualifiedName: 'company.getUbosV1',
    httpMethod: 'get',
    httpPath: '/v1/company/{company_id}/ubo',
  },
  {
    clientCallName: 'client.document.getCachedV1',
    fullyQualifiedName: 'document.getCachedV1',
    httpMethod: 'get',
    httpPath: '/v1/document/{document_id}',
  },
  {
    clientCallName: 'client.document.getRealtimeV1',
    fullyQualifiedName: 'document.getRealtimeV1',
    httpMethod: 'get',
    httpPath: '/v1/document',
  },
  {
    clientCallName: 'client.person.getDetailsV1',
    fullyQualifiedName: 'person.getDetailsV1',
    httpMethod: 'get',
    httpPath: '/v1/person/{person_id}',
  },
  {
    clientCallName: 'client.person.getHoldingsV1',
    fullyQualifiedName: 'person.getHoldingsV1',
    httpMethod: 'get',
    httpPath: '/v1/person/{person_id}/holdings',
  },
];

function allowedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  if (!options) {
    return undefined;
  }

  let allowedMethods: SdkMethod[];

  if (options.codeAllowHttpGets || options.codeAllowedMethods) {
    // Start with nothing allowed and then add into it from options
    let allowedMethodsSet = new Set<SdkMethod>();

    if (options.codeAllowHttpGets) {
      // Add all methods that map to an HTTP GET
      sdkMethods
        .filter((method) => method.httpMethod === 'get')
        .forEach((method) => allowedMethodsSet.add(method));
    }

    if (options.codeAllowedMethods) {
      // Add all methods that match any of the allowed regexps
      const allowedRegexps = options.codeAllowedMethods.map((pattern) => {
        try {
          return new RegExp(pattern);
        } catch (e) {
          throw new Error(
            `Invalid regex pattern for allowed method: "${pattern}": ${e instanceof Error ? e.message : e}`,
          );
        }
      });

      sdkMethods
        .filter((method) => allowedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)))
        .forEach((method) => allowedMethodsSet.add(method));
    }

    allowedMethods = Array.from(allowedMethodsSet);
  } else {
    // Start with everything allowed
    allowedMethods = [...sdkMethods];
  }

  if (options.codeBlockedMethods) {
    // Filter down based on blocked regexps
    const blockedRegexps = options.codeBlockedMethods.map((pattern) => {
      try {
        return new RegExp(pattern);
      } catch (e) {
        throw new Error(
          `Invalid regex pattern for blocked method: "${pattern}": ${e instanceof Error ? e.message : e}`,
        );
      }
    });

    allowedMethods = allowedMethods.filter(
      (method) => !blockedRegexps.some((regexp) => regexp.test(method.fullyQualifiedName)),
    );
  }

  return allowedMethods;
}

export function blockedMethodsForCodeTool(options: McpOptions | undefined): SdkMethod[] | undefined {
  const allowedMethods = allowedMethodsForCodeTool(options);
  if (!allowedMethods) {
    return undefined;
  }

  const allowedSet = new Set(allowedMethods.map((method) => method.fullyQualifiedName));

  // Return any methods that are not explicitly allowed
  return sdkMethods.filter((method) => !allowedSet.has(method.fullyQualifiedName));
}
