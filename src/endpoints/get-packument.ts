import { Packument } from '../types/packument';
import { normalizeRawPackument } from '../utils/normalize-raw-packument';
import { getRawPackument } from './get-raw-packument';

/**
 * `getPackument` returns the packument (package document) containing
 * all the metadata about a package present on the registry.
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
 * import { getPackument } from 'query-registry';
 *
 * (async () => {
 *     const packument = await getPackument({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(packument.name);
 * })();
 * ```
 *
 * @see {@link Packument}
 * @see {@link RawPackument}
 * @see {@link npmRegistry}
 * @see {@link npmRegistryMirrors}
 */
export async function getPackument({
    name,
    registry,
    mirrors,
    cached,
}: {
    name: string;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<Packument> {
    const rawPackument = await getRawPackument({
        name,
        registry,
        mirrors,
        cached,
    });
    return normalizeRawPackument({ rawPackument });
}
