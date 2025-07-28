# Search

Types:

- <code><a href="./src/resources/search.ts">CompanyLegalForm</a></code>
- <code><a href="./src/resources/search.ts">CompanyRegisterType</a></code>
- <code><a href="./src/resources/search.ts">CompanySearch</a></code>
- <code><a href="./src/resources/search.ts">SearchLookupCompanyByNameResponse</a></code>
- <code><a href="./src/resources/search.ts">SearchLookupCompanyByURLResponse</a></code>

Methods:

- <code title="get /v0/search/company">client.search.<a href="./src/resources/search.ts">findCompaniesV0</a>({ ...params }) -> CompanySearch</code>
- <code title="post /v1/search/company">client.search.<a href="./src/resources/search.ts">findCompaniesV1</a>({ ...params }) -> CompanySearch</code>
- <code title="get /v1/autocomplete/company">client.search.<a href="./src/resources/search.ts">lookupCompanyByName</a>({ ...params }) -> unknown</code>
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
- <code><a href="./src/resources/company.ts">CompanyGetHoldingsResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetOwnersResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyListShareholdersResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyRetrieveContactResponse</a></code>

Methods:

- <code title="get /v0/company/{company_id}">client.company.<a href="./src/resources/company.ts">retrieve</a>(companyID, { ...params }) -> CompanyRetrieveResponse</code>
- <code title="get /v1/company/{company_id}/holdings">client.company.<a href="./src/resources/company.ts">getHoldings</a>(companyID) -> CompanyGetHoldingsResponse</code>
- <code title="get /v1/company/{company_id}/owners">client.company.<a href="./src/resources/company.ts">getOwners</a>(companyID) -> CompanyGetOwnersResponse</code>
- <code title="get /v0/company/{company_id}/shareholders">client.company.<a href="./src/resources/company.ts">listShareholders</a>(companyID) -> CompanyListShareholdersResponse</code>
- <code title="get /v0/company/{company_id}/contact">client.company.<a href="./src/resources/company.ts">retrieveContact</a>(companyID) -> CompanyRetrieveContactResponse</code>

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
