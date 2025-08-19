import urlJoin from "url-join";
import * as z from "zod";
import type { DownloadPeriod } from "./download-period";
import { fetchData } from "./fetch-data";
import { npmRegistryDownloadsApiUrl } from "./npm-registry";

export const DailyRegistryDownloads = z.object({
	/** Date of the first day (inclusive) in the format `YYYY-MM-DD`. */
	start: z.string(),

	/** Date of the last day (inclusive) in the format `YYYY-MM-DD`. */
	end: z.string(),

	/** Download counts for each day. */
	downloads: z.array(
		z.object({
			/** Total number of downloads for the day. */
			downloads: z.number(),

			/** Date of the day in the format `YYYY-MM-DD`. */
			day: z.string(),
		}),
	),
});

/**
`DailyRegistryDownloads` describes the total number of downloads for each day
for all packages in the registry in a given time period.
@see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
*/
export type DailyRegistryDownloads = z.infer<typeof DailyRegistryDownloads>;

/**
`getDailyRegistryDownloads` returns the total number of downloads for each day
for all packages in the registry in the given time period.

@param period - {@link DownloadPeriod | time period} in which downloads happened; the npm registry limits data to the last 18 months
@param registry - URL of the registry downloads API (default: npm registry downloads API)

@see {@link DailyRegistryDownloads}
*/
export const getDailyRegistryDownloads = async (
	period: DownloadPeriod,
	registry = npmRegistryDownloadsApiUrl,
): Promise<DailyRegistryDownloads> => {
	return await fetchData(DailyRegistryDownloads, urlJoin(registry, `/downloads/range/${period}`));
};
