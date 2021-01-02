import { RawPackageManifest } from '../registry-types/raw-package-manifest';
import { InvalidPackageVersionError } from '../utils/errors';
import { log } from '../utils/log';
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
 * @see {@link RawPackageManifest}
 * @see {@link npmRegistry}
 * @see {@link npmRegistryMirrors}
 */
export async function getRawPackageManifest({
    name,
    version = 'latest',
    registry,
    mirrors,
}: {
    name: string;
    version?: string;
    registry?: string;
    mirrors?: readonly string[];
}): Promise<RawPackageManifest> {
    const { 'dist-tags': distTags, versions } = await getRawPackument({
        name,
        registry,
        mirrors,
    });

    const versionNumber = distTags[version] ?? version;
    const manifest = versions[versionNumber] as RawPackageManifest | undefined;
    if (!manifest) {
        log('getRawPackageManifest: invalid package version: %O', {
            name,
            version,
        });
        throw new InvalidPackageVersionError(
            `invalid package version: ${name}@${version}`
        );
    }

    return manifest;
}
