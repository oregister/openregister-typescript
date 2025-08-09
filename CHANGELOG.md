# Changelog

## 1.9.1 (2025-08-09)

Full Changelog: [v1.9.0...v1.9.1](https://github.com/oregister/openregister-typescript/compare/v1.9.0...v1.9.1)

### Chores

* **internal:** update comment in script ([38234da](https://github.com/oregister/openregister-typescript/commit/38234da488664bcbbd6f27d054d69fd5bb9bde8f))
* update @stainless-api/prism-cli to v5.15.0 ([382b6f5](https://github.com/oregister/openregister-typescript/commit/382b6f5d760c69a2339328fbe6e39826e1dfbe03))

## 1.9.0 (2025-08-07)

Full Changelog: [v1.8.0...v1.9.0](https://github.com/oregister/openregister-typescript/compare/v1.8.0...v1.9.0)

### Features

* **api:** update via SDK Studio ([76c6b18](https://github.com/oregister/openregister-typescript/commit/76c6b18f0ebe29189826218051af8881857e2c4b))
* **api:** update via SDK Studio ([10aaaef](https://github.com/oregister/openregister-typescript/commit/10aaaef793bb88faace794510fb02d8d75715d32))
* **api:** update via SDK Studio ([b4561c7](https://github.com/oregister/openregister-typescript/commit/b4561c776a4f314e2d62c7c795dd20393d3627ad))
* **api:** update via SDK Studio ([774d6d4](https://github.com/oregister/openregister-typescript/commit/774d6d477d67254489872ce2e2f024e412e3e5ef))
* **api:** update via SDK Studio ([f1d09ec](https://github.com/oregister/openregister-typescript/commit/f1d09ecc19f2e50afec9b7e400a4dbd783188459))
* **api:** update via SDK Studio ([570ec98](https://github.com/oregister/openregister-typescript/commit/570ec9862f8de0236fd19db853c326cbce3049aa))
* **api:** update via SDK Studio ([aca1dc2](https://github.com/oregister/openregister-typescript/commit/aca1dc2d29608a4dc9171f5ca96e9f0ce1415bb4))
* **api:** update via SDK Studio ([b09d4df](https://github.com/oregister/openregister-typescript/commit/b09d4dfda513b0ffba44c9b3ccf885f2649e22e2))
* **api:** update via SDK Studio ([7abd12a](https://github.com/oregister/openregister-typescript/commit/7abd12a9fb30c4e95a451d00f6a53fddf1bf6fdf))
* **api:** update via SDK Studio ([c3c29fe](https://github.com/oregister/openregister-typescript/commit/c3c29fe0ede1ff7ea9d0091728509a7afab3ef22))
* **api:** update via SDK Studio ([69e4a5d](https://github.com/oregister/openregister-typescript/commit/69e4a5d40fd846be1314fa327dc0eb39c0b0bf8f))
* **api:** update via SDK Studio ([a180a03](https://github.com/oregister/openregister-typescript/commit/a180a03c4225fa0dc723db40e9102266cf91ab56))
* **api:** update via SDK Studio ([9170927](https://github.com/oregister/openregister-typescript/commit/9170927a1f841d8bd40049412f19cf6ab202dd6d))
* **api:** update via SDK Studio ([b6a4f8d](https://github.com/oregister/openregister-typescript/commit/b6a4f8d0ee9c55cc5dc73988f5ea891cd9ee1e53))
* **api:** update via SDK Studio ([b51c305](https://github.com/oregister/openregister-typescript/commit/b51c305a109c4d44f124c7057c662585a9b965df))
* **api:** update via SDK Studio ([a8721c5](https://github.com/oregister/openregister-typescript/commit/a8721c50a6d0f882d5249c9316109521f527bbd9))
* **api:** update via SDK Studio ([ff631ee](https://github.com/oregister/openregister-typescript/commit/ff631eeceec21e27e86e19ff9a3c8001d3bcc263))
* **api:** update via SDK Studio ([d9e7740](https://github.com/oregister/openregister-typescript/commit/d9e774036849dcd0f9d6e0522439ed387fa02051))
* **api:** update via SDK Studio ([850bde2](https://github.com/oregister/openregister-typescript/commit/850bde249472c849722bd85b53a34df7a5d82708))
* **mcp:** add logging when environment variable is set ([2e56aa4](https://github.com/oregister/openregister-typescript/commit/2e56aa4ed5a70b0d9476f41f16b205266ac84048))
* **mcp:** add unix socket option for remote MCP ([774d179](https://github.com/oregister/openregister-typescript/commit/774d1799692a849fe0b3396bce619cbb35e1f233))
* **mcp:** remote server with passthru auth ([3d49b95](https://github.com/oregister/openregister-typescript/commit/3d49b95340e58b0477b6948c1aa8583978666b5f))
* **mcp:** support filtering tool results by a jq expression ([083f79a](https://github.com/oregister/openregister-typescript/commit/083f79a8def32fca56171883fe8efa35a692f7b1))


### Bug Fixes

* **mcp:** avoid sending `jq_filter` to base API ([4d9ed3c](https://github.com/oregister/openregister-typescript/commit/4d9ed3c84097e7fd50274993e26176d8e51ade02))
* **mcp:** define `.well-known/oauth-protected-resource` ([4b77e10](https://github.com/oregister/openregister-typescript/commit/4b77e10c89f8ac59302868d4c37240b81f9b11cd))
* **mcp:** fix bug in header handling ([50831f0](https://github.com/oregister/openregister-typescript/commit/50831f04eb472069a1fe89c84a08b4ffc463e22f))
* **mcp:** fix tool description of jq_filter ([f0ac7a9](https://github.com/oregister/openregister-typescript/commit/f0ac7a95431b17c61d84556559e3c37757da12ce))
* **mcp:** include required section for top-level properties and support naming transformations ([a510a76](https://github.com/oregister/openregister-typescript/commit/a510a76ed7e84518ea3dd172f7e281503b0e832d))
* **mcp:** relax input type for asTextContextResult ([db46ba5](https://github.com/oregister/openregister-typescript/commit/db46ba5dc177712efe2231753580948bc7e7b7b6))
* **mcp:** reverse validJson capability option and limit scope ([828de30](https://github.com/oregister/openregister-typescript/commit/828de30db1addbbbdc27acd6a9f248616b285c9d))
* **mcp:** support jq filtering on cloudflare workers ([e6fdffd](https://github.com/oregister/openregister-typescript/commit/e6fdffd33ca1191a29e415aeeda14f813acc98af))


### Chores

* add docs to RequestOptions type ([52c30c2](https://github.com/oregister/openregister-typescript/commit/52c30c26a15ed3a215a4e0bbd3c881c1f73ac0c9))
* **ci:** only run for pushes and fork pull requests ([ab5fd77](https://github.com/oregister/openregister-typescript/commit/ab5fd772aa6dcdb830cceb3a29fcd811fb3f0484))
* **client:** improve path param validation ([9e2ca93](https://github.com/oregister/openregister-typescript/commit/9e2ca93e79055e79402c7730c58ba5f94b07d1be))
* **internal:** codegen related update ([d470a85](https://github.com/oregister/openregister-typescript/commit/d470a8566cd61d43431eaaf36451ef7c5cab5e62))
* **internal:** move publish config ([b284902](https://github.com/oregister/openregister-typescript/commit/b2849021a60dde914a1d0bf4dc2a01d794204e32))
* **internal:** remove redundant imports config ([0c442ca](https://github.com/oregister/openregister-typescript/commit/0c442caaa83f51fcd4ff66d8a8f398a667277f93))
* make some internal functions async ([8c8b0ee](https://github.com/oregister/openregister-typescript/commit/8c8b0eeee1614523f9335806ace59c84bf4490f5))
* **mcp:** formatting ([6287af9](https://github.com/oregister/openregister-typescript/commit/6287af9cc9ebfa00a5d36099221e7797c505bc68))
* **mcp:** refactor streamable http transport ([93714f4](https://github.com/oregister/openregister-typescript/commit/93714f48b9992c4b07962ab284c6f448d3096bac))
* **mcp:** rework imports in tools ([99b85fe](https://github.com/oregister/openregister-typescript/commit/99b85fe2c414f1a95756e467dbaab8a68b53ced0))
* **ts:** reorder package.json imports ([c42ba35](https://github.com/oregister/openregister-typescript/commit/c42ba35d19d7e9aca3af2e8112718072604699cc))


### Documentation

* **mcp:** correct instructions for adding to claude web ([c2a89a5](https://github.com/oregister/openregister-typescript/commit/c2a89a5f3011c3e6c65bf2a145faf8e739940fd2))

## 1.8.0 (2025-06-27)

Full Changelog: [v1.7.0...v1.8.0](https://github.com/oregister/openregister-typescript/compare/v1.7.0...v1.8.0)

### Features

* **api:** update via SDK Studio ([e1e62d0](https://github.com/oregister/openregister-typescript/commit/e1e62d063a217ee3c82920f2bb39a1c45c252d32))


### Bug Fixes

* **ci:** release-doctor — report correct token name ([fb86de8](https://github.com/oregister/openregister-typescript/commit/fb86de85cb9d52d48c95381e8878f74d3ef5c07d))
* **client:** get fetchOptions type more reliably ([9c5dc3f](https://github.com/oregister/openregister-typescript/commit/9c5dc3f6f901fc6f3b8ac5b1344827812da1cd5d))

## 1.7.0 (2025-06-24)

Full Changelog: [v1.6.0...v1.7.0](https://github.com/oregister/openregister-typescript/compare/v1.6.0...v1.7.0)

### Features

* **api:** update via SDK Studio ([f7b9022](https://github.com/oregister/openregister-typescript/commit/f7b9022e3b43dabb44dfcb7a44e4bce6fca2ebfb))

## 1.6.0 (2025-06-24)

Full Changelog: [v1.5.0...v1.6.0](https://github.com/oregister/openregister-typescript/compare/v1.5.0...v1.6.0)

### Features

* **api:** update via SDK Studio ([f63dbdd](https://github.com/oregister/openregister-typescript/commit/f63dbdd92394ea08c6a59e97d44d207b13199d97))
* **api:** update via SDK Studio ([1c3e15a](https://github.com/oregister/openregister-typescript/commit/1c3e15a54f3d8f459a8c19685fa888740778aab2))
* **api:** update via SDK Studio ([47326b2](https://github.com/oregister/openregister-typescript/commit/47326b2ba3391a2ddb11c9ddc4cffcd2f4f14db3))


### Bug Fixes

* **client:** explicitly copy fetch in withOptions ([781f4d9](https://github.com/oregister/openregister-typescript/commit/781f4d9fad178eb6123150610ba35fdf25112c8e))

## 1.5.0 (2025-06-20)

Full Changelog: [v1.4.0...v1.5.0](https://github.com/oregister/openregister-typescript/compare/v1.4.0...v1.5.0)

### Features

* **api:** update via SDK Studio ([ef1795e](https://github.com/oregister/openregister-typescript/commit/ef1795e0c329785c66a6ccb3dd248f09f8b7e7ff))

## 1.4.0 (2025-06-20)

Full Changelog: [v1.3.0...v1.4.0](https://github.com/oregister/openregister-typescript/compare/v1.3.0...v1.4.0)

### Features

* **api:** update via SDK Studio ([901c0bd](https://github.com/oregister/openregister-typescript/commit/901c0bda9dfa69a989203d5039c233f3527fc600))
* **api:** update via SDK Studio ([4eed147](https://github.com/oregister/openregister-typescript/commit/4eed147cdf6dc20104c6c99a2af15d20a0d42ae7))
* **client:** add support for endpoint-specific base URLs ([3b0052b](https://github.com/oregister/openregister-typescript/commit/3b0052bf1d83e44c1e05591b3d32f59fc8b41975))
* **mcp:** set X-Stainless-MCP header ([cdbd6e9](https://github.com/oregister/openregister-typescript/commit/cdbd6e9861550daa773bd60cf28b2dc2179eabb4))


### Bug Fixes

* publish script — handle NPM errors correctly ([06ae629](https://github.com/oregister/openregister-typescript/commit/06ae629f0513cc7e703e7b30fd81690bfacc309e))


### Chores

* **ci:** enable for pull requests ([bc346b5](https://github.com/oregister/openregister-typescript/commit/bc346b553b4705a03634979b7a5ab783ee8b9ffa))
* **client:** refactor imports ([4e428cc](https://github.com/oregister/openregister-typescript/commit/4e428cc653713940bcb288c4f80eb0b01a2b5fb5))
* **internal:** add pure annotations, make base APIResource abstract ([08648d0](https://github.com/oregister/openregister-typescript/commit/08648d025d850a373159c09eaa95f81a346917bf))
* **mcp:** provides high-level initMcpServer function and exports known clients ([99c8045](https://github.com/oregister/openregister-typescript/commit/99c8045c4704f24fdf2a7b6c66a21494fccb284a))
* **readme:** update badges ([6d35489](https://github.com/oregister/openregister-typescript/commit/6d354898df0737e4bd1cfff88045cd926180c8de))
* **readme:** use better example snippet for undocumented params ([1611472](https://github.com/oregister/openregister-typescript/commit/16114721c2d399884a28db7ad903ab9378155306))

## 1.3.0 (2025-06-09)

Full Changelog: [v1.2.0...v1.3.0](https://github.com/oregister/openregister-typescript/compare/v1.2.0...v1.3.0)

### Features

* **api:** update via SDK Studio ([cf90037](https://github.com/oregister/openregister-typescript/commit/cf90037eecca0f00b233eb85009eca13dee6db8e))
* **api:** update via SDK Studio ([a631078](https://github.com/oregister/openregister-typescript/commit/a631078e76132069b46cba7cc629d87e2d564fd2))
* **api:** update via SDK Studio ([58c38ad](https://github.com/oregister/openregister-typescript/commit/58c38ad5132cd37d99aae06659f8f5168b75788c))

## 1.2.0 (2025-06-09)

Full Changelog: [v1.1.0...v1.2.0](https://github.com/oregister/openregister-typescript/compare/v1.1.0...v1.2.0)

### Features

* **api:** update via SDK Studio ([ace9c47](https://github.com/oregister/openregister-typescript/commit/ace9c47a03a2d414947b37824b15d2ab8a454292))

## 1.1.0 (2025-06-07)

Full Changelog: [v1.0.0...v1.1.0](https://github.com/oregister/openregister-typescript/compare/v1.0.0...v1.1.0)

### Features

* **api:** update via SDK Studio ([7d6243f](https://github.com/oregister/openregister-typescript/commit/7d6243fc32244cc2e8e9ba0219d2030f7c520d3c))

## 1.0.0 (2025-06-07)

Full Changelog: [v0.0.1-alpha.0...v1.0.0](https://github.com/oregister/openregister-typescript/compare/v0.0.1-alpha.0...v1.0.0)

### Features

* **api:** update via SDK Studio ([2d94b4d](https://github.com/oregister/openregister-typescript/commit/2d94b4d5eec1c20368ce20b7d3498046cede61ee))
* **api:** update via SDK Studio ([ccf0623](https://github.com/oregister/openregister-typescript/commit/ccf06230ff784493a95c96595b517a5ba18bd458))


### Chores

* configure new SDK language ([99d3179](https://github.com/oregister/openregister-typescript/commit/99d3179032265b56f022bd4c18e92d1c8c5c027f))
* update SDK settings ([1e8be8f](https://github.com/oregister/openregister-typescript/commit/1e8be8fab2e135e6cddd8e21a4d48554843e1586))
