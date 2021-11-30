# query-registry

[![Build status](https://img.shields.io/github/workflow/status/velut/node-query-registry/CI)](https://github.com/velut/node-query-registry/actions?query=workflow%3ACI)
[![Coverage](https://img.shields.io/codecov/c/gh/velut/node-query-registry)](https://codecov.io/gh/velut/node-query-registry)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/query-registry)
![Language](https://img.shields.io/github/languages/top/velut/node-query-registry)
[![npm bundle size](https://img.shields.io/bundlephobia/min/query-registry)](https://bundlephobia.com/result?p=query-registry)
[![npm](https://img.shields.io/npm/v/query-registry)](https://www.npmjs.com/package/query-registry)
[![License](https://img.shields.io/github/license/velut/node-query-registry)](https://github.com/velut/node-query-registry/blob/main/LICENSE)

This package exports several functions to query the [npm registry](https://www.npmjs.com) (or one of its mirrors) through one of its [endpoints](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md).

## Features

-   Provides functions to:
    -   Get registry metadata
    -   Get packuments (package documents) and their abbreviated form
    -   Get package manifests
    -   Get download counts (packages and registry)
    -   Search packages
-   Usable in the browser
-   Fully typed API and response data
-   Supports mirrors of the npm registry
-   Supports caching network requests
-   Well documented and tested

## API & Package Info

-   [**Explore the API on jsDocs.io**](https://www.jsdocs.io/package/query-registry)
-   View package contents on [**unpkg**](https://unpkg.com/query-registry/)
-   View repository on [**GitHub**](https://github.com/velut/node-query-registry)
-   Read the changelog on [**GitHub**](https://github.com/velut/node-query-registry/blob/main/CHANGELOG.md)

## Install

Using `npm`:

```
npm i query-registry
```

Using `yarn`:

```
yarn add query-registry
```

## Usage Examples

Get the metadata for the npm registry:

```typescript
import { getRegistryMetadata } from 'query-registry';

(async () => {
    const metadata = await getRegistryMetadata();

    // Output: 'registry'
    console.log(metadata.db_name);
})();
```

Get the latest manifest for package `query-registry` from the npm registry:

```typescript
import { getPackageManifest } from 'query-registry';

(async () => {
    const manifest = await getPackageManifest({ name: 'query-registry' });

    // Output: 'query-registry'
    console.log(manifest.name);
})();
```

Get the abbreviated packument for package `query-registry` from the npm registry:

```typescript
import { getAbbreviatedPackument } from 'query-registry';

(async () => {
    const packument = await getAbbreviatedPackument({ name: 'query-registry' });

    // Output: 'query-registry'
    console.log(packument.name);
})();
```

Get the weekly downloads for package `query-registry` from the npm registry:

```typescript
import { getPackageDownloads } from 'query-registry';

(async () => {
    const downloads = await getPackageDownloads({ name: 'query-registry' });

    // Output: 'query-registry'
    console.log(downloads.package);

    // Output: 'number'
    console.log(typeof downloads.downloads);
})();
```

Get the search results for text query `query-registry` from the npm registry:

```typescript
import { searchPackages } from 'query-registry';

(async () => {
    const results = await searchPackages({
        query: { text: 'query-registry' },
    });

    // Output: 'query-registry'
    console.log(results.objects[0].package.name);
})();
```

## Debug

Debug messages are available in non production environments when the `DEBUG` environment variable is set to `query-registry`:

```bash
DEBUG="query-registry"
```

For more information, see the [debug package](https://www.npmjs.com/package/debug).

## License

MIT License

Copyright (c) 2021 Edoardo Scibona

See LICENSE file.
