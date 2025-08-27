// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Openregister from 'openregister';

const client = new Openregister({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // Prism tests are disabled
  test.skip('autocompleteCompaniesV1: only required params', async () => {
    const responsePromise = client.search.autocompleteCompaniesV1({ query: 'query' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('autocompleteCompaniesV1: required and optional params', async () => {
    const response = await client.search.autocompleteCompaniesV1({ query: 'query' });
  });

  // Prism tests are disabled
  test.skip('findCompaniesV0', async () => {
    const responsePromise = client.search.findCompaniesV0();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('findCompaniesV0: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.search.findCompaniesV0(
        {
          active: true,
          incorporation_date: 'incorporation_date',
          legal_form: 'ag',
          page: 0,
          per_page: 0,
          query: 'query',
          register_court: 'register_court',
          register_number: 'register_number',
          register_type: 'HRB',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Openregister.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('findCompaniesV1', async () => {
    const responsePromise = client.search.findCompaniesV1({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('findPersonV1', async () => {
    const responsePromise = client.search.findPersonV1({});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('lookupCompanyByURL: only required params', async () => {
    const responsePromise = client.search.lookupCompanyByURL({ url: 'https://example.com' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('lookupCompanyByURL: required and optional params', async () => {
    const response = await client.search.lookupCompanyByURL({ url: 'https://example.com' });
  });
});
