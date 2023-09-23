import { z } from "../deps.ts";
import { packageDownloadsTotalSchema } from "./package_downloads_total.ts";

export const packageDownloadsTotalBulkSchema = z.record(
  packageDownloadsTotalSchema,
);

/**
 * `PackageDownloadsTotalBulk` contains the total number of downloads
 * from the registry for a set of packages for a given period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#bulk-queries}
 */
export type PackageDownloadsTotalBulk = z.infer<
  typeof packageDownloadsTotalBulkSchema
>;
