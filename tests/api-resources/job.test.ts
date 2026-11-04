// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Openregister from 'openregister';

const client = new Openregister({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource job', () => {
  // Mock server tests are disabled
  test.skip('createV1: only required params', async () => {
    const responsePromise = client.job.createV1({ company_id: 'company_id', type: 'company' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createV1: required and optional params', async () => {
    const response = await client.job.createV1({
      company_id: 'company_id',
      type: 'company',
      document_category: 'current_printout',
    });
  });

  // Mock server tests are disabled
  test.skip('getV1', async () => {
    const responsePromise = client.job.getV1('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
