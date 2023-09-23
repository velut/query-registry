import { z } from "../deps.ts";

export const registryDownloadsDailySchema = z.object({
  /** List of daily number of downloads. */
  downloads: z.array(
    z.object({
      /** Total number of downloads in a day. */
      downloads: z.number(),
      /** Day in which the downloads happened. */
      day: z.string(),
    }),
  ),
  /** Download period start date (inclusive). */
  start: z.string(),
  /** Download period end date (inclusive). */
  end: z.string(),
});

/**
 * `RegistryDownloadsDaily` contains the daily number of downloads from the registry for a given period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export type RegistryDownloadsDaily = z.infer<
  typeof registryDownloadsDailySchema
>;
