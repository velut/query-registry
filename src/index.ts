/**
 * This package exports a class, {@link Registry}, which provides methods
 * to query the {@link https://www.npmjs.com | npm registry}
 * or a custom npm-like registry.
 *
 * @example
 * Create the default registry backed by npm:
 *
 * ```typescript
 * import { Registry } from 'query-registry';
 *
 * const registry = new Registry();
 *
 * // Output: `https://registry.npmjs.org`
 * console.log(registry.registry);
 * ```
 *
 * @example
 * Create a custom registry:
 *
 * ```typescript
 * import { Registry } from 'query-registry';
 *
 * const registry = new Registry({
 *     registry: 'https://registry.example.com',
 *     mirrors: ['https://mirror.example.com'],
 *     api: 'https://api.example.com',
 *     suggestionsAPI: 'https://suggestions.example.com',
 *     cache: new Map(),
 * });
 *
 * // Output: `https://registry.example.com`
 * console.log(registry.registry);
 * ```
 *
 * @example
 * Get the package manifest for `query-registry`'s latest version:
 *
 * ```typescript
 * import { Registry } from 'query-registry';
 *
 * (async () => {
 *     const registry = new Registry();
 *     const manifest = await registry.getPackageManifest('query-registry');
 *
 *     // Output: `query-registry`
 *     console.log(manifest.name);
 * })();
 * ```
 *
 * @example
 * Enable {@link https://www.npmjs.com/package/debug | debug messages}
 * by setting the `DEBUG` environment variable to `query-registry`:
 *
 * ```bash
 * $ DEBUG="query-registry"
 * ```
 *
 * @packageDocumentation
 */

export * from './data/registries';
export * from './endpoints/get-daily-package-downloads';
export * from './endpoints/get-package-downloads';
export * from './endpoints/get-package-manifest';
export * from './endpoints/get-packument';
export * from './endpoints/get-raw-package-manifest';
export * from './endpoints/get-raw-packument';
export * from './endpoints/get-registry-metadata';
export * from './types/bug-tracker';
export * from './types/dist-info';
export * from './types/dist-tags';
export * from './types/download-period';
export * from './types/downloads';
export * from './types/git-repository';
export * from './types/npm-operational-internal';
export * from './types/package-json';
export * from './types/package-links';
export * from './types/package-manifest';
export * from './types/package-search-result';
export * from './types/packument';
export * from './types/person';
export * from './types/raw-package-manifest';
export * from './types/raw-packument';
export * from './types/registry-metadata';
export * from './types/repository';
export * from './types/search-options';
export * from './types/search-results';
export * from './types/versions-to-timestamps';
export * from './utils/errors';
