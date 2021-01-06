import { RawPackument } from '../types/raw-packument';
import { assertValidPackageName } from '../utils/assert-valid-package-name';
import { fetchFromRegistry } from '../utils/fetch-from-registry';

/**
 * `getRawPackument` returns the packument (package document) containing
 * all the metadata about a package present on the registry.
 *
 * Note: the packument is returned as retrieved from the registry.
 *
 * @param name - package name
 * @param registry - URL of the registry (default: npm registry)
 * @param mirrors - URLs of the registry mirrors (default: npm registry mirrors)
 * @param cached - accept cached responses (default: `true`)
 *
 * @example
 * Get the packument for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getRawPackument } from 'query-registry';
 *
 * (async () => {
 *     const packument = await getRawPackument({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(packument.name);
 * })();
 * ```
 *
 * @see {@link RawPackument}
 * @see {@link npmRegistry}
 * @see {@link npmRegistryMirrors}
 */
export async function getRawPackument({
    name,
    registry,
    mirrors,
    cached,
}: {
    name: string;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<RawPackument> {
    assertValidPackageName({ name });

    const endpoint = `/${name}`;
    return fetchFromRegistry({ endpoint, registry, mirrors, cached });
}
