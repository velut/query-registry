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

export * from './cache';
export * from './data/registries';
export * from './download-period';
export * from './endpoints/get-package-manifest';
export * from './endpoints/get-packument';
export * from './endpoints/get-raw-package-manifest';
export * from './endpoints/get-raw-packument';
export * from './endpoints/get-registry-metadata';
export * from './query-parameters';
export * from './registry';
export * from './registry-types/bug-tracker';
export * from './registry-types/dist-info';
export * from './registry-types/dist-tags';
export * from './registry-types/downloads';
export * from './registry-types/git-repository';
export * from './registry-types/npm-operational-internal';
export * from './registry-types/package-json';
export * from './registry-types/package-links';
export * from './registry-types/package-manifest';
export * from './registry-types/package-search-result';
export * from './registry-types/packument';
export * from './registry-types/person';
export * from './registry-types/raw-package-manifest';
export * from './registry-types/raw-packument';
export * from './registry-types/registry-metadata';
export * from './registry-types/repository';
export * from './registry-types/search-options';
export * from './registry-types/search-results';
export * from './registry-types/versions-to-timestamps';
export * from './utils/errors';
