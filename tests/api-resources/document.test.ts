// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Openregister from 'openregister';

const client = new Openregister({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource document', () => {
  // Prism tests are disabled
  test.skip('getCachedV1', async () => {
    const responsePromise = client.document.getCachedV1('document_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getRealtimeV1: only required params', async () => {
    const responsePromise = client.document.getRealtimeV1({
      company_id: 'company_id',
      document_category: 'current_printout',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getRealtimeV1: required and optional params', async () => {
    const response = await client.document.getRealtimeV1({
      company_id: 'company_id',
      document_category: 'current_printout',
    });
  });
});
