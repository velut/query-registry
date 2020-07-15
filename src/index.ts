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

export * from './bug-tracker';
export * from './cache';
export * from './dist-info';
export * from './dist-tags';
export * from './download-period';
export * from './downloads';
export * from './npm-operational-internal';
export * from './package-json';
export * from './package-links';
export * from './package-manifest';
export * from './package-search-result';
export * from './packument';
export * from './person';
export * from './query-parameters';
export * from './registry';
export * from './registry-metadata';
export * from './repository';
export * from './search-options';
export * from './search-results';
export * from './timestamps-by-version';
