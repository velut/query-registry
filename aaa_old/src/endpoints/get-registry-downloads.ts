import { DownloadPeriod } from '../types/download-period';
import { RegistryDownloads } from '../types/downloads';
import { fetchDownloadsFromRegistry } from '../utils/fetch-downloads-from-registry';
import { normalizeRawDownloadPeriod } from '../utils/normalize-download-period';

/**
 * `getRegistryDownloads` returns the number of downloads for all registry packages
 * in a given time period.
 *
 * @param period - time period in which downloads happened (default: `last-week`)
 * @param registryDownloadsAPI - URL of the registry's downloads API (default: npm registry)
 * @param cached - accept cached responses (default: `true`)
 *
 * @example
 * Get the weekly downloads for the npm registry:
 *
 * ```typescript
 * import { getRegistryDownloads } from 'query-registry';
 *
 * (async () => {
 *     const downloads = await getRegistryDownloads();
 *
 *     // Output: 'number'
 *     console.log(typeof downloads.downloads);
 * })();
 * ```
 *
 * @example
 * Get the monthly downloads for the npm registry:
 *
 * ```typescript
 * import { getRegistryDownloads } from 'query-registry';
 *
 * (async () => {
 *     const downloads = await getRegistryDownloads({ period: 'last-month' });
 *
 *     // Output: 'number'
 *     console.log(typeof downloads.downloads);
 * })();
 * ```
 *
 * @see {@link RegistryDownloads}
 * @see {@link DownloadPeriod}
 * @see {@link npmRegistryDownloadsAPI}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export async function getRegistryDownloads({
    period: rawDownloadPeriod,
    registryDownloadsAPI,
    cached,
}: {
    period?: DownloadPeriod;
    registryDownloadsAPI?: string;
    cached?: boolean;
} = {}): Promise<RegistryDownloads> {
    const period = normalizeRawDownloadPeriod({ rawDownloadPeriod });
    const endpoint = `/downloads/point/${period}`;
    return fetchDownloadsFromRegistry({
        endpoint,
        registryDownloadsAPI,
        cached,
    });
}
