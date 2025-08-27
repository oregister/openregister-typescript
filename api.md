# Search

Types:

- <code><a href="./src/resources/search.ts">CompanyLegalForm</a></code>
- <code><a href="./src/resources/search.ts">CompanyRegisterType</a></code>
- <code><a href="./src/resources/search.ts">CompanySearch</a></code>
- <code><a href="./src/resources/search.ts">SearchAutocompleteCompaniesV1Response</a></code>
- <code><a href="./src/resources/search.ts">SearchFindPersonV1Response</a></code>
- <code><a href="./src/resources/search.ts">SearchLookupCompanyByURLResponse</a></code>

Methods:

- <code title="get /v1/autocomplete/company">client.search.<a href="./src/resources/search.ts">autocompleteCompaniesV1</a>({ ...params }) -> SearchAutocompleteCompaniesV1Response</code>
- <code title="get /v0/search/company">client.search.<a href="./src/resources/search.ts">findCompaniesV0</a>({ ...params }) -> CompanySearch</code>
- <code title="post /v1/search/company">client.search.<a href="./src/resources/search.ts">findCompaniesV1</a>({ ...params }) -> CompanySearch</code>
- <code title="post /v1/search/person">client.search.<a href="./src/resources/search.ts">findPersonV1</a>({ ...params }) -> SearchFindPersonV1Response</code>
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
- <code><a href="./src/resources/company.ts">ReportRow</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetContactV0Response</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetDetailsV1Response</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetFinancialsV1Response</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetHoldingsV1Response</a></code>
- <code><a href="./src/resources/company.ts">CompanyGetOwnersV1Response</a></code>

Methods:

- <code title="get /v0/company/{company_id}/contact">client.company.<a href="./src/resources/company.ts">getContactV0</a>(companyID) -> CompanyGetContactV0Response</code>
- <code title="get /v1/company/{company_id}">client.company.<a href="./src/resources/company.ts">getDetailsV1</a>(companyID, { ...params }) -> CompanyGetDetailsV1Response</code>
- <code title="get /v1/company/{company_id}/financials">client.company.<a href="./src/resources/company.ts">getFinancialsV1</a>(companyID) -> CompanyGetFinancialsV1Response</code>
- <code title="get /v1/company/{company_id}/holdings">client.company.<a href="./src/resources/company.ts">getHoldingsV1</a>(companyID) -> CompanyGetHoldingsV1Response</code>
- <code title="get /v1/company/{company_id}/owners">client.company.<a href="./src/resources/company.ts">getOwnersV1</a>(companyID, { ...params }) -> CompanyGetOwnersV1Response</code>

# Document

Types:

- <code><a href="./src/resources/document.ts">DocumentGetCachedV1Response</a></code>
- <code><a href="./src/resources/document.ts">DocumentGetRealtimeV1Response</a></code>

Methods:

- <code title="get /v1/document/{document_id}">client.document.<a href="./src/resources/document.ts">getCachedV1</a>(documentID) -> DocumentGetCachedV1Response</code>
- <code title="get /v1/document">client.document.<a href="./src/resources/document.ts">getRealtimeV1</a>({ ...params }) -> DocumentGetRealtimeV1Response</code>

# Person

Types:

- <code><a href="./src/resources/person.ts">PersonGetDetailsV1Response</a></code>
- <code><a href="./src/resources/person.ts">PersonGetHoldingsV1Response</a></code>

Methods:

- <code title="get /v1/person/{person_id}">client.person.<a href="./src/resources/person.ts">getDetailsV1</a>(personID) -> PersonGetDetailsV1Response</code>
- <code title="get /v1/person/{person_id}/holdings">client.person.<a href="./src/resources/person.ts">getHoldingsV1</a>(personID) -> PersonGetHoldingsV1Response</code>
