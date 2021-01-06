import { DownloadPeriod } from '../types/download-period';
import { DailyPackageDownloads } from '../types/downloads';
import { assertValidPackageName } from '../utils/assert-valid-package-name';
import { fetchDownloadsFromRegistry } from '../utils/fetch-downloads-from-registry';
import { normalizeRawDownloadPeriod } from '../utils/normalize-download-period';

/**
 * `getDailyPackageDownloads` returns the number of downloads for a package
 * for each day in a given time period.
 *
 * @param name - package name
 * @param period - time period in which downloads happened (default: `last-week`)
 * @param registryDownloadsAPI - URL of the registry's downloads API (default: npm registry)
 * @param cached - accept cached responses (default: `true`)
 *
 * @example
 * Get the day by day weekly downloads for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getDailyPackageDownloads } from 'query-registry';
 *
 * (async () => {
 *     const downloads = await getDailyPackageDownloads({ name: 'query-registry' });
 *
 *     // Output: 'query-registry'
 *     console.log(downloads.package);
 *
 *     // Output: 'number'
 *     console.log(typeof downloads.downloads[0].downloads);
 * })();
 * ```
 *
 * @example
 * Get the day by day monthly downloads for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getDailyPackageDownloads } from 'query-registry';
 *
 * (async () => {
 *     const downloads = await getDailyPackageDownloads({ name: 'query-registry', period: 'last-month' });
 *
 *     // Output: 'query-registry'
 *     console.log(downloads.package);
 *
 *     // Output: 'number'
 *     console.log(typeof downloads.downloads[0].downloads);
 * })();
 * ```
 *
 * @see {@link DailyPackageDownloads}
 * @see {@link DownloadPeriod}
 * @see {@link npmRegistryDownloadsAPI}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export async function getDailyPackageDownloads({
    name,
    period: rawDownloadPeriod,
    registryDownloadsAPI,
    cached,
}: {
    name: string;
    period?: DownloadPeriod;
    registryDownloadsAPI?: string;
    cached?: boolean;
}): Promise<DailyPackageDownloads> {
    assertValidPackageName({ name });

    const period = normalizeRawDownloadPeriod({ rawDownloadPeriod });
    const endpoint = `/downloads/range/${period}/${name}`;
    return fetchDownloadsFromRegistry({
        endpoint,
        registryDownloadsAPI,
        cached,
    });
}
