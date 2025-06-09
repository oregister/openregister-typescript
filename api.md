# Search

Types:

- <code><a href="./src/resources/search.ts">CompanyLegalForm</a></code>
- <code><a href="./src/resources/search.ts">CompanyRegisterType</a></code>
- <code><a href="./src/resources/search.ts">SearchFindCompaniesResponse</a></code>
- <code><a href="./src/resources/search.ts">SearchLookupCompanyByURLResponse</a></code>

Methods:

- <code title="get /v0/search/company">client.search.<a href="./src/resources/search.ts">findCompanies</a>({ ...params }) -> SearchFindCompaniesResponse</code>
- <code title="get /v0/search/lookup">client.search.<a href="./src/resources/search.ts">lookupCompanyByURL</a>({ ...params }) -> SearchLookupCompanyByURLResponse</code>

# Company

Types:

- <code><a href="./src/resources/company.ts">CompanyAddress</a></code>
- <code><a href="./src/resources/company.ts">CompanyCapital</a></code>
- <code><a href="./src/resources/company.ts">CompanyName</a></code>
- <code><a href="./src/resources/company.ts">CompanyPurpose</a></code>
- <code><a href="./src/resources/company.ts">CompanyRegister</a></code>
- <code><a href="./src/resources/company.ts">EntityType</a></code>
- <code><a href="./src/resources/company.ts">CompanyRetrieveResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyListShareholdersResponse</a></code>
- <code><a href="./src/resources/company.ts">CompanyRetrieveContactResponse</a></code>

Methods:

- <code title="get /v0/company/{company_id}">client.company.<a href="./src/resources/company.ts">retrieve</a>(companyID, { ...params }) -> CompanyRetrieveResponse</code>
- <code title="get /v0/company/{company_id}/shareholders">client.company.<a href="./src/resources/company.ts">listShareholders</a>(companyID) -> CompanyListShareholdersResponse</code>
- <code title="get /v0/company/{company_id}/contact">client.company.<a href="./src/resources/company.ts">retrieveContact</a>(companyID) -> CompanyRetrieveContactResponse</code>

# Document

Methods:

- <code title="get /v0/document/{document_id}">client.document.<a href="./src/resources/document.ts">retrieve</a>(documentID) -> Response</code>
