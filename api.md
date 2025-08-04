# Search

Types:

- <code><a href="./src/resources/search.ts">CompanyLegalForm</a></code>
- <code><a href="./src/resources/search.ts">CompanyRegisterType</a></code>
- <code><a href="./src/resources/search.ts">CompanySearch</a></code>
- <code><a href="./src/resources/search.ts">SearchAutocompleteCompaniesV1Response</a></code>
- <code><a href="./src/resources/search.ts">SearchFindPersonResponse</a></code>
- <code><a href="./src/resources/search.ts">SearchLookupCompanyByURLResponse</a></code>

Methods:

- <code title="get /v1/autocomplete/company">client.search.<a href="./src/resources/search.ts">autocompleteCompaniesV1</a>({ ...params }) -> SearchAutocompleteCompaniesV1Response</code>
- <code title="get /v0/search/company">client.search.<a href="./src/resources/search.ts">findCompaniesV0</a>({ ...params }) -> CompanySearch</code>
- <code title="post /v1/search/company">client.search.<a href="./src/resources/search.ts">findCompaniesV1</a>({ ...params }) -> CompanySearch</code>
- <code title="post /v1/search/person">client.search.<a href="./src/resources/search.ts">findPerson</a>({ ...params }) -> SearchFindPersonResponse</code>
- <code title="get /v0/search/lookup">client.search.<a href="./src/resources/search.ts">lookupCompanyByURL</a>({ ...params }) -> SearchLookupCompanyByURLResponse</code>

# Company

Types:

- <code><a href="./src/resources/company.ts">CompanyAddress</a></code>
- <code><a href="./src/resources/company.ts">CompanyCapital</a></code>
- <code><a href="./src/resources/company.ts">CompanyName</a></code>
- <code><a href="./src/resources/company.ts">CompanyPurpose</a></code>
- <code><a href="./src/resources/company.ts">CompanyRegister</a></code>
- <code><a href="./src/resources/company.ts">CompanyRelationType</a></code>
- <code><a href="./src/resources/company.ts">EntityType</a></code>
- <code><a href="./src/resources/company.ts">CompanyRetrieveResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetHoldingsV1Response</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetOwnersV1Response</a></code>
- <code><a href="./src/resources/company.ts">CompanyListShareholdersResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyRetrieveContactResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyRetrieveFinancialsResponse</a></code>

Methods:

- <code title="get /v0/company/{company_id}">client.company.<a href="./src/resources/company.ts">retrieve</a>(companyID, { ...params }) -> CompanyRetrieveResponse</code>
- <code title="get /v1/company/{company_id}/holdings">client.company.<a href="./src/resources/company.ts">getHoldingsV1</a>(companyID) -> CompanyGetHoldingsV1Response</code>
- <code title="get /v1/company/{company_id}/owners">client.company.<a href="./src/resources/company.ts">getOwnersV1</a>(companyID) -> CompanyGetOwnersV1Response</code>
- <code title="get /v0/company/{company_id}/shareholders">client.company.<a href="./src/resources/company.ts">listShareholders</a>(companyID) -> CompanyListShareholdersResponse</code>
- <code title="get /v0/company/{company_id}/contact">client.company.<a href="./src/resources/company.ts">retrieveContact</a>(companyID) -> CompanyRetrieveContactResponse</code>
- <code title="get /v1/company/{company_id}/financials">client.company.<a href="./src/resources/company.ts">retrieveFinancials</a>(companyID) -> CompanyRetrieveFinancialsResponse</code>

# Document

Types:

- <code><a href="./src/resources/document.ts">DocumentRetrieveResponse</a></code>

Methods:

- <code title="get /v0/document/{document_id}">client.document.<a href="./src/resources/document.ts">retrieve</a>(documentID) -> DocumentRetrieveResponse</code>
- <code title="get /v0/document/{document_id}/download">client.document.<a href="./src/resources/document.ts">download</a>(documentID) -> Response</code>

# Jobs

## Document

Types:

- <code><a href="./src/resources/jobs/document.ts">DocumentCreateResponse</a></code>
- <code><a href="./src/resources/jobs/document.ts">DocumentRetrieveResponse</a></code>

Methods:

- <code title="post /v0/jobs/document">client.jobs.document.<a href="./src/resources/jobs/document.ts">create</a>({ ...params }) -> DocumentCreateResponse</code>
- <code title="get /v0/jobs/document/{id}">client.jobs.document.<a href="./src/resources/jobs/document.ts">retrieve</a>(id) -> DocumentRetrieveResponse</code>
