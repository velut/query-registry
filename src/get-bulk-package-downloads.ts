import urlJoin from "url-join";
import * as z from "zod";
import { assertValidPackageName } from "./assert-valid-package-name";
import type { DownloadPeriod } from "./download-period";
import { fetchData } from "./fetch-data";
import { PackageDownloads } from "./get-package-downloads";
import { npmRegistryDownloadsApiUrl } from "./npm-registry";

export const BulkPackageDownloads = z.record(z.string(), z.union([z.null(), PackageDownloads]));

/**
`BulkPackageDownloads` describes the total number of downloads for some packages in a given time period.
@see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries}
*/
export type BulkPackageDownloads = z.infer<typeof BulkPackageDownloads>;

/**
`getBulkPackageDownloads` returns the total number of downloads for
the given packages in the given time period.

@param names - list of package names; the npm registry does not support scoped packages and handles a maximum of 128 packages at a time
@param period - {@link DownloadPeriod | time period} in which downloads happened; the npm registry limits bulk data to the last 365 days
@param registry - URL of the registry downloads API (default: npm registry downloads API)

@see {@link BulkPackageDownloads}
*/
export const getBulkPackageDownloads = async (
	names: [string, string, ...string[]],
	period: DownloadPeriod,
	registry = npmRegistryDownloadsApiUrl,
): Promise<BulkPackageDownloads> => {
	for (const name of names) {
		assertValidPackageName(name);
	}
	return fetchData(
		BulkPackageDownloads,
		urlJoin(registry, `/downloads/point/${period}/${names.join(",")}`),
	);
};
