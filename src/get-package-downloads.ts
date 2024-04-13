import urlJoin from "url-join";
import { z } from "zod";
import { assertValidPackageName } from "./assert-valid-package-name";
import { DownloadPeriod } from "./download-period";
import { fetchData } from "./fetch-data";
import { RegistryDownloads } from "./get-registry-downloads";
import { npmRegistryDownloadsApiUrl } from "./npm-registry";

export const PackageDownloads = RegistryDownloads.extend({
	/** Package name. */
	package: z.string(),
});

/**
`PackageDownloads` describes the total number of downloads for a package in a given time period.
@see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
*/
export type PackageDownloads = z.infer<typeof PackageDownloads>;

/**
`getPackageDownloads` returns the total number of downloads for a package in the given time period.

@param name - package name
@param period - {@link DownloadPeriod | time period} in which downloads happened; the npm registry limits data to the last 18 months
@param registry - URL of the registry downloads API (default: npm registry downloads API)

@see {@link PackageDownloads}
*/
export const getPackageDownloads = async (
	name: string,
	period: DownloadPeriod,
	registry = npmRegistryDownloadsApiUrl,
): Promise<PackageDownloads> => {
	assertValidPackageName(name);
	return fetchData(PackageDownloads, urlJoin(registry, `/downloads/point/${period}/${name}`));
};
