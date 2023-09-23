import { z } from "../deps.ts";
import { packageDownloadsDailySchema } from "./package_downloads_daily.ts";

export const packageDownloadsDailyBulkSchema = z.record(
  packageDownloadsDailySchema,
);

/**
 * `PackageDownloadsDailyBulk` contains the daily number of downloads
 * from the registry for a set of packages for a given period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries}
 */
export type PackageDownloadsDailyBulk = z.infer<
  typeof packageDownloadsDailyBulkSchema
>;
