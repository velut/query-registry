import { z } from "../deps.ts";

export const packageDownloadsVersionsSchema = z.object({
  /** Total number of downloads by package version. */
  downloads: z.record(z.number()),
  /** Package name. */
  package: z.string(),
});

/**
 * `PackageDownloadsVersions` contains the total number of downloads
 * from the registry for each version of a package for the previous seven days.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#per-version-download-counts}
 */
export type PackageDownloadsVersions = z.infer<
  typeof packageDownloadsVersionsSchema
>;
