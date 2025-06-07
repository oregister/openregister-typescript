// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Openregister from 'openregister';

const client = new Openregister({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource search', () => {
  // skipped: tests are disabled for the time being
  test.skip('findCompanies', async () => {
    const responsePromise = client.search.findCompanies();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // skipped: tests are disabled for the time being
  test.skip('findCompanies: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.search.findCompanies(
        {
          active: true,
          legal_form: 'ag',
          query: 'query',
          register_court: 'register_court',
          register_number: 'register_number',
          register_type: 'HRB',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Openregister.NotFoundError);
  });

  // skipped: tests are disabled for the time being
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

  // skipped: tests are disabled for the time being
  test.skip('lookupCompanyByURL: required and optional params', async () => {
    const response = await client.search.lookupCompanyByURL({ url: 'https://example.com' });
  });
});
