import urlJoin from "url-join";
import { z } from "zod";
import { assertValidPackageName } from "./assert-valid-package-name";
import { DownloadPeriod } from "./download-period";
import { fetchData } from "./fetch-data";
import { DailyPackageDownloads } from "./get-daily-package-downloads";
import { npmRegistryDownloadsApiUrl } from "./npm-registry";

export const BulkDailyPackageDownloads = z.record(z.union([z.null(), DailyPackageDownloads]));

/**
`BulkDailyPackageDownloads` describes the total number of downloads for each day
for some packages in a given time period.
@see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries}
*/
export type BulkDailyPackageDownloads = z.infer<typeof BulkDailyPackageDownloads>;

/**
`getBulkDailyPackageDownloads` returns the total number of downloads for each day
for some packages in the given time period.

@param names - list of package names; the npm registry does not support scoped packages and handles a maximum of 128 packages at a time
@param period - {@link DownloadPeriod | time period} in which downloads happened; the npm registry limits bulk data to the last 365 days
@param registry - URL of the registry downloads API (default: npm registry downloads API)

@see {@link BulkDailyPackageDownloads}
*/
export const getBulkDailyPackageDownloads = async (
	names: [string, string, ...string[]],
	period: DownloadPeriod,
	registry = npmRegistryDownloadsApiUrl,
): Promise<BulkDailyPackageDownloads> => {
	for (const name of names) {
		assertValidPackageName(name);
	}
	return fetchData(
		BulkDailyPackageDownloads,
		urlJoin(registry, `/downloads/range/${period}/${names.join(",")}`),
	);
};
