import { RegistryMetadata } from '../types/registry-metadata';
import { fetchFromRegistry } from '../utils/fetch-from-registry';

/**
 * `getRegistryMetadata` returns the metadata describing the registry itself.
 *
 * @param registry - URL of the registry (default: npm registry)
 * @param cached - accept cached responses (default: `true`)
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
 * Get the metadata for a custom registry:
 *
 * ```typescript
 * import { getRegistryMetadata } from 'query-registry';
 *
 * (async () => {
 *     const metadata = await getRegistryMetadata({ registry: 'https://example.com' });
 * })();
 * ```
 *
 * @see {@link RegistryMetadata}
 * @see {@link npmRegistry}
 */
export async function getRegistryMetadata({
    registry,
    cached,
}: {
    registry?: string;
    cached?: boolean;
} = {}): Promise<RegistryMetadata> {
    const endpoint = '/';
    return fetchFromRegistry({ registry, mirrors: [], endpoint, cached });
}
