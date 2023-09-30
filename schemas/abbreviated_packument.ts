import { z } from "../deps.ts";
import { packageManifestSchema } from "./package_manifest.ts";

export const abbreviatedPackumentSchema = z.object({
  /** Full package name. */
  name: z.string(),
  /** Distribution tags to package versions. */
  "dist-tags": z.object({
    latest: z.string(),
  }).catchall(z.string()),
  /** Package versions to installation manifest. */
  versions: z.record(
    packageManifestSchema.pick({
      name: true,
      version: true,
      dist: true,
      deprecated: true,
      dependencies: true,
      devDependencies: true,
      peerDependencies: true,
      peerDependenciesMeta: true,
      optionalDependencies: true,
      bundleDependencies: true,
      bin: true,
      directories: true,
      engines: true,
      _hasShrinkwrap: true,
      cpu: true,
      os: true,
    }).extend({
      /** If `true`, the package has an install script. */
      hasInstallScript: z.boolean().optional(),
    }).passthrough(),
  ),
  /** Timestamp of when the package was last modified. */
  modified: z.string(),
}).passthrough();

/**
 * `AbbreviatedPackument` is a shortened version of a `Packument` (package document)
 * providing only the data necessary to install a package.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#getpackage}
 */
export type AbbreviatedPackument = z.infer<typeof abbreviatedPackumentSchema>;
