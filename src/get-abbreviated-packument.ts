import urlJoin from "url-join";
import { z } from "zod";
import { assertValidPackageName } from "./assert-valid-package-name";
import { DistTags } from "./dist-tags";
import { fetchData } from "./fetch-data";
import { PackageManifest } from "./get-package-manifest";
import { npmRegistryUrl } from "./npm-registry";

export const AbbreviatedPackument = z.object({
	/** Package name. */
	name: z.string(),

	/** Timestamp of when the package was last modified in ISO 8601 format (e.g., `2021-11-23T19:12:24.006Z`). */
	modified: z.string(),

	/** Mapping of distribution tags to semver version numbers e.g., `{ "latest": "1.0.0" }`). */
	"dist-tags": DistTags,

	/** Mapping of semver version numbers to the required metadata for installing a package version. */
	versions: z.record(
		z.string(),
		PackageManifest.pick({
			name: true,
			version: true,
			dist: true,
			deprecated: true,
			dependencies: true,
			optionalDependencies: true,
			devDependencies: true,
			bundleDependencies: true,
			peerDependencies: true,
			peerDependenciesMeta: true,
			bin: true,
			directories: true,
			engines: true,
			cpu: true,
			os: true,
			_hasShrinkwrap: true,
		}).extend({
			/** True if the package contains an `install` script. */
			hasInstallScript: z.boolean().optional(),
		}),
	),
});

/**
`AbbreviatedPackument` (package document) describes the minimal metadata needed for installing a package.
@see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format}
*/
export type AbbreviatedPackument = z.infer<typeof AbbreviatedPackument>;

/**
`getAbbreviatedPackument` returns the abbreviated packument (package document)
containing only the metadata necessary to install a package.

@remarks
To get all the metadata (full packument) about a package see {@link getPackument}.

@param name - package name
@param registry - URL of the registry (default: npm registry)

@see {@link AbbreviatedPackument}
*/
export const getAbbreviatedPackument = async (
	name: string,
	registry = npmRegistryUrl,
): Promise<AbbreviatedPackument> => {
	assertValidPackageName(name);
	return fetchData(AbbreviatedPackument, urlJoin(registry, name), {
		Accept: "application/vnd.npm.install-v1+json",
	});
};
