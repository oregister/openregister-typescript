# Changelog

## 2.2.0 (2025-11-13)

Full Changelog: [v2.1.1...v2.2.0](https://github.com/oregister/openregister-typescript/compare/v2.1.1...v2.2.0)

### Features

* **api:** manual updates ([0198594](https://github.com/oregister/openregister-typescript/commit/0198594bfca95f8b94a161052f7fb3fa9590fb23))
* **api:** manual updates ([a0cd98a](https://github.com/oregister/openregister-typescript/commit/a0cd98a47ff023d689408522ef40e9f8d62fad8d))
* **mcp:** enable optional code execution tool on http mcp servers ([b86f593](https://github.com/oregister/openregister-typescript/commit/b86f5938a4ad8c0b1eb5f68b2a9445b7149abbd7))


### Bug Fixes

* **mcpb:** pin @anthropic-ai/mcpb version ([5abf65d](https://github.com/oregister/openregister-typescript/commit/5abf65dc9d4c4ac8f9fa58b0f6b3299a6273f54d))
* **mcp:** return tool execution error on jq failure ([309f1f9](https://github.com/oregister/openregister-typescript/commit/309f1f9854a8acf1f5324ca6bc608edb6b9acd3d))


### Chores

* extract some types in mcp docs ([adc4bec](https://github.com/oregister/openregister-typescript/commit/adc4bec96aaad5917fcf9af46cd96faeb9e2d3d8))
* **internal:** codegen related update ([02bd315](https://github.com/oregister/openregister-typescript/commit/02bd3158be74768cafecb2078bf009197f3b9efb))
* **internal:** codegen related update ([e5f793a](https://github.com/oregister/openregister-typescript/commit/e5f793a8cbecc267f43de3e2c9c205b16a00b74d))
* **internal:** grammar fix (it's -&gt; its) ([9c9fd17](https://github.com/oregister/openregister-typescript/commit/9c9fd17a3a134be71591db383d136b490930485d))
* **internal:** use npm pack for build uploads ([1c0873b](https://github.com/oregister/openregister-typescript/commit/1c0873b828aa234fc77689b15da2b795d1e31773))
* mcp code tool explicit error message when missing a run function ([82b8c9a](https://github.com/oregister/openregister-typescript/commit/82b8c9af6b74a7c2729400021fd106c96436d9e8))
* **mcp-server:** update kv namespace ([e69972c](https://github.com/oregister/openregister-typescript/commit/e69972cf54e06439cee23db481f8a8f722dae2a2))
* **mcp:** add friendlier MCP code tool errors on incorrect method invocations ([3e7912f](https://github.com/oregister/openregister-typescript/commit/3e7912fdeb8f5cca4fa29196392edf8be9b8145e))
* **mcp:** add line numbers to code tool errors ([a06c6cf](https://github.com/oregister/openregister-typescript/commit/a06c6cfe4744f0d74b30912f60ddc04cdf28f51b))
* **mcp:** clarify http auth error ([77b1f1c](https://github.com/oregister/openregister-typescript/commit/77b1f1c2399b39c50abf5bb15f701fba405bf0c8))
* **mcp:** upgrade jq-web ([05b4683](https://github.com/oregister/openregister-typescript/commit/05b4683d7e31c31f6a9bef149086f07bb0200dc4))
* use structured error when code execution tool errors ([ce5f024](https://github.com/oregister/openregister-typescript/commit/ce5f024b6795ca476146c5238f0e12f4dff3e30f))


### Documentation

* **mcp:** add a README button for one-click add to Cursor ([1bedd1c](https://github.com/oregister/openregister-typescript/commit/1bedd1c288564b4ff6ff836024f3191cbe3fedb4))
* **mcp:** add a README link to add server to VS Code or Claude Code ([42455e1](https://github.com/oregister/openregister-typescript/commit/42455e1ef3d247961ad6ce6a33128278dca8569d))

## 2.1.1 (2025-10-04)

Full Changelog: [v2.1.0...v2.1.1](https://github.com/oregister/openregister-typescript/compare/v2.1.0...v2.1.1)

### Chores

* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([0ea8fe5](https://github.com/oregister/openregister-typescript/commit/0ea8fe5cdda98f53f927f0eeb334505a6dc5a9a5))

## 2.1.0 (2025-10-02)

Full Changelog: [v2.0.3...v2.1.0](https://github.com/oregister/openregister-typescript/compare/v2.0.3...v2.1.0)

### Features

* **api:** add contact information ([7ac0cda](https://github.com/oregister/openregister-typescript/commit/7ac0cda5eb17e57ba3411002911e64aec322f6ea))
* **mcp:** add docs search tool ([90500c7](https://github.com/oregister/openregister-typescript/commit/90500c7e030c25f52c2c21148fffd5ca2e6d9aa3))
* **mcp:** add option for including docs tools ([e757f00](https://github.com/oregister/openregister-typescript/commit/e757f009fd2dff01f2d0d8f2bd98872d14d18ad4))
* **mcp:** enable experimental docs search tool ([30eb841](https://github.com/oregister/openregister-typescript/commit/30eb8415a13f7452f27a20366a074cbe2ee30746))


### Bug Fixes

* **api:** merged reports ([41f77a3](https://github.com/oregister/openregister-typescript/commit/41f77a37380effe6e802ff52f013a4e2808f4a42))
* **ci:** set permissions for DXT publish action ([74e2e61](https://github.com/oregister/openregister-typescript/commit/74e2e6194e1cfba96bd2a2aa56bae4263ccb2dc9))
* **mcp:** fix cli argument parsing logic ([3d58949](https://github.com/oregister/openregister-typescript/commit/3d589499429e110203e748358ea29d12963af257))
* **mcp:** resolve a linting issue in server code ([92db3ab](https://github.com/oregister/openregister-typescript/commit/92db3ab49b2b80228c1ae67091b099c39ad3b895))


### Performance Improvements

* faster formatting ([8a10f3b](https://github.com/oregister/openregister-typescript/commit/8a10f3b5c53bcc51f8d923be91503143b21f1013))


### Chores

* **codegen:** internal codegen update ([06e7d9f](https://github.com/oregister/openregister-typescript/commit/06e7d9f5cc7ead87802ff5850760b7e578109a2a))
* do not install brew dependencies in ./scripts/bootstrap by default ([f5df0b6](https://github.com/oregister/openregister-typescript/commit/f5df0b6fdf0d30b3ce23c36935a53fe5a544eae6))
* **internal:** codegen related update ([3bff97f](https://github.com/oregister/openregister-typescript/commit/3bff97fa43c9f9854e1be72a25cd04dec39efa08))
* **internal:** fix incremental formatting in some cases ([446fe71](https://github.com/oregister/openregister-typescript/commit/446fe719ec6fb8a02555dcbc671b6d134a2f3ab7))
* **internal:** gitignore .mcpb files ([dd2ceef](https://github.com/oregister/openregister-typescript/commit/dd2ceef3fb5bfeb13f7fe8ec3341b2487c6a0418))
* **internal:** ignore .eslintcache ([480d0a6](https://github.com/oregister/openregister-typescript/commit/480d0a6678ef26549b6dbbbb3ae2d90b5a55088b))
* **internal:** remove .eslintcache ([82174d6](https://github.com/oregister/openregister-typescript/commit/82174d6d76cd705c1a41fc7ca20a89b7fbd6aeba))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([d731547](https://github.com/oregister/openregister-typescript/commit/d7315477f9f402f477ab74c3849d86f913a4e537))
* **mcp:** allow pointing `docs_search` tool at other URLs ([42a5191](https://github.com/oregister/openregister-typescript/commit/42a5191966d815d595714fdddd413062c0e196bf))
* **mcp:** rename dxt to mcpb ([4305112](https://github.com/oregister/openregister-typescript/commit/43051128ead28faf9428885b8d9db3a93a2c9856))
* update lockfile ([5562e83](https://github.com/oregister/openregister-typescript/commit/5562e83b8c5e657859f8aa3b19cbc97fc417569a))

## 2.0.3 (2025-09-16)

Full Changelog: [v2.0.2...v2.0.3](https://github.com/oregister/openregister-typescript/compare/v2.0.2...v2.0.3)

### Features

* **mcp:** allow setting logging level ([be014b8](https://github.com/oregister/openregister-typescript/commit/be014b8af37aaa67542ca826feb8460a2e3cfc64))
* **mcp:** expose client options in `streamableHTTPApp` ([1c537a0](https://github.com/oregister/openregister-typescript/commit/1c537a079cb27697c1d44478935bf5365e38f229))


### Bug Fixes

* coerce nullable values to undefined ([0a367fd](https://github.com/oregister/openregister-typescript/commit/0a367fd92cf7427fcf67b2cd79e14f4bf3212f9a))
* **mcp:** fix query options parsing ([e81dc13](https://github.com/oregister/openregister-typescript/commit/e81dc13097cc45bad0e3ef7ee2850b674b9cd5ac))
* **mcp:** fix uploading dxt release assets ([24b0463](https://github.com/oregister/openregister-typescript/commit/24b0463847a39035ff2bfbd15d50f3d9bb4480cb))


### Chores

* ci build action ([acbe229](https://github.com/oregister/openregister-typescript/commit/acbe2292b4b10bbbfcb400815a86c07a0a0cfd6f))
* **internal:** codegen related update ([977902c](https://github.com/oregister/openregister-typescript/commit/977902ce76a9b522a30f2596e9fbf30163e1173a))
* **internal:** codegen related update ([501ed74](https://github.com/oregister/openregister-typescript/commit/501ed7439d19717c5afb62bf4d3a67938ac05354))
* **internal:** codegen related update ([746601f](https://github.com/oregister/openregister-typescript/commit/746601f641a2c8d065ce5d410fc103913557422d))
* **mcp:** upload dxt as release asset ([9325300](https://github.com/oregister/openregister-typescript/commit/93253008539c29f3eba02b331f862378a9f89841))

## 2.0.2 (2025-08-29)

Full Changelog: [v2.0.1...v2.0.2](https://github.com/oregister/openregister-typescript/compare/v2.0.1...v2.0.2)

### Features

* **api:** update via SDK Studio ([ef2324e](https://github.com/oregister/openregister-typescript/commit/ef2324eeeb8e3ef5509175707d60427aa68b90df))


### Chores

* **internal:** update global Error reference ([fb9e105](https://github.com/oregister/openregister-typescript/commit/fb9e1059c12296b7d5757219f54779d6fdb4ee89))

## 2.0.1 (2025-08-27)

Full Changelog: [v2.0.0...v2.0.1](https://github.com/oregister/openregister-typescript/compare/v2.0.0...v2.0.1)

### Features

* **api:** update via SDK Studio ([ee4952a](https://github.com/oregister/openregister-typescript/commit/ee4952a7d2314dccc091e35c92863f4235384543))

## 2.0.0 (2025-08-27)

Full Changelog: [v1.9.0...v2.0.0](https://github.com/oregister/openregister-typescript/compare/v1.9.0...v2.0.0)

### Features

* **api:** update via SDK Studio ([ee991a2](https://github.com/oregister/openregister-typescript/commit/ee991a2ddf5f6132b3735f41010feeb93b34fe71))
* **api:** update via SDK Studio ([f9faede](https://github.com/oregister/openregister-typescript/commit/f9faede00549d9a2ef2e072d33624f44f59a3318))
* **api:** update via SDK Studio ([1a6ceee](https://github.com/oregister/openregister-typescript/commit/1a6ceeeaf367a4d5c07dab5151293ff58905aa7f))
* **api:** update via SDK Studio ([5cdfc27](https://github.com/oregister/openregister-typescript/commit/5cdfc278a0a0ccb850ed8bfa9166dcca31b34e70))
* **api:** update via SDK Studio ([99676a1](https://github.com/oregister/openregister-typescript/commit/99676a17379b91c1f8080cbb22a76734d33023f3))
* **api:** update via SDK Studio ([04da899](https://github.com/oregister/openregister-typescript/commit/04da899c1617c6be3583eb75833de33d727402b1))
* **api:** update via SDK Studio ([6b67168](https://github.com/oregister/openregister-typescript/commit/6b67168cd215e6b6ab4a6e33104e44749c04683c))
* **mcp:** add client infer to cloudflare oauth screen ([fb2a011](https://github.com/oregister/openregister-typescript/commit/fb2a011d5603135a39924d265b1f0eeb7e8cf564))
* **mcp:** add code execution tool ([2db007e](https://github.com/oregister/openregister-typescript/commit/2db007e2ffcb865e30d764043191e90f5a48abc6))
* **mcp:** add option to infer mcp client ([b80633f](https://github.com/oregister/openregister-typescript/commit/b80633ff49d040c09fe419bbf55f466087b799b9))
* **mcp:** parse query string as mcp client options in mcp server ([a3d8f87](https://github.com/oregister/openregister-typescript/commit/a3d8f870c793eb16d2db78be6e17744d7fca89a1))


### Chores

* add package to package.json ([c369003](https://github.com/oregister/openregister-typescript/commit/c369003518dd04fb4122509bf7dca4d405ebdacf))
* **client:** qualify global Blob ([56c1027](https://github.com/oregister/openregister-typescript/commit/56c1027c2149c62d3d04607547d76d0e709eb0f4))
* **deps:** update dependency @types/node to v20.17.58 ([95eab2e](https://github.com/oregister/openregister-typescript/commit/95eab2e8806534e33a0f43d2cf66afc5dabbd364))
* **internal:** codegen related update ([82df2b9](https://github.com/oregister/openregister-typescript/commit/82df2b93967fb7681bb75ec84a3c7dfca00906b9))
* **internal:** codegen related update ([5b1baa2](https://github.com/oregister/openregister-typescript/commit/5b1baa2061ee3b6edfa580b038d1179254610f0a))
* **internal:** codegen related update ([efaea89](https://github.com/oregister/openregister-typescript/commit/efaea894ace2e21f380d3c2b140b015531128d20))
* **internal:** formatting change ([2894108](https://github.com/oregister/openregister-typescript/commit/289410845d32e6e42d4339482e1e93bed71cd0d6))
* **internal:** make mcp-server publishing public by defaut ([54c2c42](https://github.com/oregister/openregister-typescript/commit/54c2c420b451f9572e5c823945e099846a4825fc))
* **internal:** refactor array check ([c4e32cb](https://github.com/oregister/openregister-typescript/commit/c4e32cbbead86dfae78b6dbf7fcd36c4e572f01a))
* **internal:** update comment in script ([38234da](https://github.com/oregister/openregister-typescript/commit/38234da488664bcbbd6f27d054d69fd5bb9bde8f))
* **mcp:** add cors to oauth metadata route ([535619a](https://github.com/oregister/openregister-typescript/commit/535619a8704fa21f565c7c5d1de297052dcc841e))
* **mcp:** document remote server in README.md ([9484ef4](https://github.com/oregister/openregister-typescript/commit/9484ef4e4c1335c3713bb6e860e8436669f19d73))
* **mcp:** minor cleanup of types and package.json ([eb819b4](https://github.com/oregister/openregister-typescript/commit/eb819b4f2f696d93636660f6f9587b29298ad19e))
* **mcp:** update package.json ([0bde86b](https://github.com/oregister/openregister-typescript/commit/0bde86bc3af21ebb85638b43ad5e2a6b43b78b82))
* **mcp:** update README ([c251cce](https://github.com/oregister/openregister-typescript/commit/c251cce574b7d65545a54cfe0e8a5380c34b3f3e))
* **mcp:** update types ([47100a3](https://github.com/oregister/openregister-typescript/commit/47100a3479cd4e698d71e7d597933271c8bf7511))
* update @stainless-api/prism-cli to v5.15.0 ([382b6f5](https://github.com/oregister/openregister-typescript/commit/382b6f5d760c69a2339328fbe6e39826e1dfbe03))
* update CI script ([857cbc7](https://github.com/oregister/openregister-typescript/commit/857cbc75bdc4af72877262191b402bbd0f1f8f05))

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
