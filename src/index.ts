/**
 * This package exports several functions to query
 * the {@link https://www.npmjs.com | npm registry}
 * (or one of its mirrors) through one of its
 * {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md | endpoints}.
 *
 * @example
 * Get the metadata for the npm registry:
 *
 * ```typescript
 * import { getRegistryMetadata } from 'query-registry';
 *
 * (async () => {
 *     const metadata = await getRegistryMetadata();
 *
 *     // Output: 'registry'
 *     console.log(metadata.db_name);
 * })();
 * ```
 *
 * @example
 * Get the latest manifest for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getPackageManifest } from 'query-registry';
 *
 * (async () => {
 *     const manifest = await getPackageManifest({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(manifest.name);
 * })();
 * ```
 *
 * @example
 * Get the abbreviated packument for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getAbbreviatedPackument } from 'query-registry';
 *
 * (async () => {
 *     const packument = await getAbbreviatedPackument({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(manifest.name);
 * })();
 * ```
 *
 * @example
 * Get the weekly downloads for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getPackageDownloads } from 'query-registry';
 *
 * (async () => {
 *     const downloads = await getPackageDownloads({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(downloads.package);
 *
 *     // Output: 'number'
 *     console.log(typeof downloads.downloads);
 * })();
 * ```
 *
 * @example
 * Get the search results for text query `query-registry` from the npm registry:
 *
 * ```typescript
 * import { searchPackages } from 'query-registry';
 *
 * (async () => {
 *     const results = await searchPackages({ query: { text: 'query-registry' } });
 *
 *     // Output: 'query-registry'
 *     console.log(results.objects[0].package.name);
 * })();
 * ```
 *
 * @example
 * Enable {@link https://www.npmjs.com/package/debug | debug messages}
 * by setting the `DEBUG` environment variable to `query-registry`
 * (available only in non production environments):
 *
 * ```bash
 * $ DEBUG="query-registry"
 * ```
 *
 * @packageDocumentation
 */

export * from './data/registries';
export * from './endpoints/get-abbreviated-packument';
export * from './endpoints/get-daily-package-downloads';
export * from './endpoints/get-daily-registry-downloads';
export * from './endpoints/get-package-downloads';
export * from './endpoints/get-package-manifest';
export * from './endpoints/get-packument';
export * from './endpoints/get-raw-abbreviated-packument';
export * from './endpoints/get-raw-package-manifest';
export * from './endpoints/get-raw-packument';
export * from './endpoints/get-registry-downloads';
export * from './endpoints/get-registry-metadata';
export * from './endpoints/search-packages';
export * from './types/abbreviated-packument';
export * from './types/bug-tracker';
export * from './types/dist-info';
export * from './types/dist-tags';
export * from './types/download-period';
export * from './types/downloads';
export * from './types/git-repository';
export * from './types/npm-operational-internal';
export * from './types/package-json';
export * from './types/package-manifest';
export * from './types/packument';
export * from './types/person';
export * from './types/raw-abbreviated-packument';
export * from './types/raw-package-manifest';
export * from './types/raw-packument';
export * from './types/registry-metadata';
export * from './types/repository';
export * from './types/search-criteria';
export * from './types/search-results';
export * from './types/versions-to-timestamps';
export * from './utils/errors';
