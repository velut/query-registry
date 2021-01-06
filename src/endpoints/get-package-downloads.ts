import { DownloadPeriod } from '../types/download-period';
import { PackageDownloads } from '../types/downloads';
import { assertValidPackageName } from '../utils/assert-valid-package-name';
import { fetchDownloadsFromRegistry } from '../utils/fetch-downloads-from-registry';
import { normalizeRawDownloadPeriod } from '../utils/normalize-download-period';

/**
 * `getPackageDownloads` returns the number of downloads for a package
 * in a given time period.
 *
 * @param name - package name
 * @param period - time period in which downloads happened (default: `last-week`)
 * @param registryDownloadsAPI - URL of the registry's downloads API (default: npm registry)
 * @param cached - accept cached responses (default: `true`)
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
 * Get the monthly downloads for package `query-registry` from the npm registry:
 *
 * ```typescript
 * import { getPackageDownloads } from 'query-registry';
 *
 * (async () => {
 *     const downloads = await getPackageDownloads({ name: 'query-registry', period: 'last-month' });
 *
 *     // Output: 'query-registry'
 *     console.log(downloads.package);
 *
 *     // Output: 'number'
 *     console.log(typeof downloads.downloads);
 * })();
 * ```
 *
 * @see {@link PackageDownloads}
 * @see {@link DownloadPeriod}
 * @see {@link npmRegistryDownloadsAPI}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export async function getPackageDownloads({
    name,
    period: rawDownloadPeriod,
    registryDownloadsAPI,
    cached,
}: {
    name: string;
    period?: DownloadPeriod;
    registryDownloadsAPI?: string;
    cached?: boolean;
}): Promise<PackageDownloads> {
    assertValidPackageName({ name });

    const period = normalizeRawDownloadPeriod({ rawDownloadPeriod });
    const endpoint = `/downloads/point/${period}/${name}`;
    return fetchDownloadsFromRegistry({
        endpoint,
        registryDownloadsAPI,
        cached,
    });
}
