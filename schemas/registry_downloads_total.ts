import { z } from "../deps.ts";

export const registryDownloadsTotalSchema = z.object({
  /** Total number of downloads. */
  downloads: z.number(),
  /** Download period start date (inclusive). */
  start: z.string(),
  /** Download period end date (inclusive). */
  end: z.string(),
});

/**
 * `RegistryDownloadsTotal` contains the total number of downloads from the registry for a given period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export type RegistryDownloadsTotal = z.infer<
  typeof registryDownloadsTotalSchema
>;
