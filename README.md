# query-registry

[![Build status](https://img.shields.io/github/workflow/status/velut/node-query-registry/CI)](https://github.com/velut/node-query-registry/actions?query=workflow%3ACI)
[![Coverage](https://img.shields.io/codecov/c/gh/velut/node-query-registry)](https://codecov.io/gh/velut/node-query-registry)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/query-registry)
![Language](https://img.shields.io/github/languages/top/velut/node-query-registry)
[![Dependencies](https://img.shields.io/david/velut/node-query-registry)](https://david-dm.org/velut/node-query-registry)
[![npm bundle size](https://img.shields.io/bundlephobia/min/query-registry)](https://bundlephobia.com/result?p=query-registry)
[![npm](https://img.shields.io/npm/v/query-registry)](https://www.npmjs.com/package/query-registry)
[![License](https://img.shields.io/github/license/velut/node-query-registry)](https://github.com/velut/node-query-registry/blob/master/LICENSE)

This package exports a class, `Registry`, which provides methods to query the [npm registry](https://www.npmjs.com) or a custom npm-like registry.

## Features

-   Provides methods for common use cases:
    -   Registry metadata
    -   Packuments (package documents)
    -   Package manifests
    -   Download counts
    -   Searching packages
-   Typed response data
-   Supports mirrors and custom npm-like registries
-   Supports caching network requests
-   Well documented and tested

## Package Contents

View package contents on [unpkg](https://unpkg.com/query-registry/).

View repository on [GitHub](https://github.com/velut/node-query-registry).

## Install

Using `npm`:

```
npm i query-registry
```

Using `yarn`:

```
yarn add query-registry
```

## Usage

Create the default registry backed by npm:

```typescript
import { Registry } from 'query-registry';

const registry = new Registry();

// Output: `https://registry.npmjs.org`
console.log(registry.registry);
```

Create a custom registry:

```typescript
import { Registry } from 'query-registry';

const registry = new Registry({
    registry: 'https://registry.example.com',
    mirrors: ['https://mirror.example.com'],
    api: 'https://api.example.com',
    suggestionsAPI: 'https://suggestions.example.com',
    cache: new Map(),
});

// Output: `https://registry.example.com`
console.log(registry.registry);
```

Get the package manifest for `query-registry`'s latest version:

```typescript
import { Registry } from 'query-registry';

(async () => {
    const registry = new Registry();
    const manifest = await registry.getPackageManifest('query-registry');

    // Output: `query-registry`
    console.log(manifest.name);
})();
```

## Debug

Debug messages are available when the `DEBUG` environment variable is set to `query-registry`:

```bash
DEBUG="query-registry"
```

Test debug messages are available when the `DEBUG` environment variable is set to `query-registry:test`.

For more information, see the [debug package](https://www.npmjs.com/package/debug).

## License

MIT License

Copyright (c) 2020 Edoardo Scibona

See LICENSE file.
