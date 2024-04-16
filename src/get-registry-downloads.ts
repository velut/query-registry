import urlJoin from "url-join";
import { z } from "zod";
import { DownloadPeriod } from "./download-period";
import { fetchData } from "./fetch-data";
import { npmRegistryDownloadsApiUrl } from "./npm-registry";

export const RegistryDownloads = z.object({
	/** Total number of downloads. */
	downloads: z.number(),

	/** Date of the first day (inclusive) in the format `YYYY-MM-DD`. */
	start: z.string(),

	/** Date of the last day (inclusive) in the format `YYYY-MM-DD`. */
	end: z.string(),
});

/**
`RegistryDownloads` describes the total number of downloads
for all packages in the registry in a given time period.
@see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
*/
export type RegistryDownloads = z.infer<typeof RegistryDownloads>;

/**
`getRegistryDownloads` returns the total number of downloads
for all packages in the registry in the given time period.

@param period - {@link DownloadPeriod | time period} in which downloads happened; the npm registry limits data to the last 18 months
@param registry - URL of the registry downloads API (default: npm registry downloads API)

@see {@link RegistryDownloads}
*/
export const getRegistryDownloads = async (
	period: DownloadPeriod,
	registry = npmRegistryDownloadsApiUrl,
): Promise<RegistryDownloads> =>
	fetchData(RegistryDownloads, urlJoin(registry, `/downloads/point/${period}`));
