import { RawPackageManifest } from '../types/raw-package-manifest';
import { extractRawPackageManifest } from '../utils/extract-package-manifest';
import { getRawPackument } from './get-raw-packument';

/**
 * `getRawPackageManifest` returns the manifest describing
 * a specific version of a package.
 *
 * Note: the manifest is returned as retrieved from the registry.
 *
 * @param name - package name
 * @param version - package version (default: `latest`)
 * @param registry - URL of the registry (default: npm registry)
 * @param mirrors - URLs of the registry mirrors (default: npm registry mirrors)
 * @param cached - accept cached responses (default: `true`)
 *
 * @example
 * Get the latest manifest for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getRawPackageManifest } from 'query-registry';
 *
 * (async () => {
 *     const manifest = await getRawPackageManifest({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(manifest.name);
 * })();
 * ```
 *
 * @example
 * Get the manifest for package `query-registry@1.0.0` from the npm registry:
 *
 * ```typescript
 * import { getRawPackageManifest } from 'query-registry';
 *
 * (async () => {
 *     const manifest = await getRawPackageManifest({ name: 'query-registry', version: '1.0.0' });
 *
 *     // Output: 'query-registry'
 *     console.log(manifest.name);
 *
 *     // Output: '1.0.0'
 *     console.log(manifest.version);
 * })();
 * ```
 *
 * @see {@link RawPackageManifest}
 * @see {@link npmRegistry}
 * @see {@link npmRegistryMirrors}
 */
export async function getRawPackageManifest({
    name,
    version,
    registry,
    mirrors,
    cached,
}: {
    name: string;
    version?: string;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<RawPackageManifest> {
    const rawPackument = await getRawPackument({
        name,
        registry,
        mirrors,
        cached,
    });

    return extractRawPackageManifest({ rawPackument, version });
}
