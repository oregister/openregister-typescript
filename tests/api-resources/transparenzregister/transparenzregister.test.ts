// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Openregister from 'openregister';

const client = new Openregister({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource transparenzregister', () => {
  // Mock server tests are disabled
  test.skip('setCredentialsV1: only required params', async () => {
    const responsePromise = client.transparenzregister.setCredentialsV1({
      password: 'password',
      username: 'username',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('setCredentialsV1: required and optional params', async () => {
    const response = await client.transparenzregister.setCredentialsV1({
      password: 'password',
      username: 'username',
      credential_label: 'credential_label',
    });
  });
});
