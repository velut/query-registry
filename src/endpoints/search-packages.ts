import { SearchCriteria } from '../types/search-criteria';
import { SearchResults } from '../types/search-results';
import { fetchFromRegistry } from '../utils/fetch-from-registry';
import { normalizeRawSearchCriteria } from '../utils/normalize-raw-search-criteria';

/**
 * `searchPackages` returns the packages corresponding to a given query.
 *
 * @param query - one or more search criteria
 * @param registry - URL of the registry (default: npm registry)
 * @param mirrors - URLs of the registry mirrors (default: npm registry mirrors)
 * @param cached - accept cached responses (default: `true`)
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
 * @see {@link SearchResults}
 * @see {@link SearchCriteria}
 * @see {@link npmRegistry}
 * @see {@link npmRegistryMirrors}
 */
export async function searchPackages({
    query: rawSearchCriteria,
    registry,
    mirrors,
    cached,
}: {
    query: SearchCriteria;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<SearchResults> {
    const endpoint = '/-/v1/search';
    const query = normalizeRawSearchCriteria({ rawSearchCriteria });
    return fetchFromRegistry({ endpoint, query, registry, mirrors, cached });
}
