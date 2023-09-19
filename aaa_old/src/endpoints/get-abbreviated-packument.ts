import { AbbreviatedPackument } from '../types/abbreviated-packument';
import { normalizeRawAbbreviatedPackument } from '../utils/normalize-raw-abbreviated-packument';
import { getRawAbbreviatedPackument } from './get-raw-abbreviated-packument';

/**
 * `getAbbreviatedPackument` returns the abbreviated packument (package document)
 * containing only the metadata necessary to install a package present on the registry.
 *
 * @remarks
 * To get all the metadata (full packument) about a package see {@link getPackument}.
 *
 * @param name - package name
 * @param registry - URL of the registry (default: npm registry)
 * @param mirrors - URLs of the registry mirrors (default: npm registry mirrors)
 * @param cached - accept cached responses (default: `true`)
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
 *     console.log(packument.name);
 * })();
 * ```
 *
 * @see {@link AbbreviatedPackument}
 * @see {@link RawAbbreviatedPackument}
 * @see {@link npmRegistry}
 * @see {@link npmRegistryMirrors}
 */
export async function getAbbreviatedPackument({
    name,
    registry,
    mirrors,
    cached,
}: {
    name: string;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<AbbreviatedPackument> {
    const rawAbbreviatedPackument = await getRawAbbreviatedPackument({
        name,
        registry,
        mirrors,
        cached,
    });
    return normalizeRawAbbreviatedPackument({ rawAbbreviatedPackument });
}
