import urlJoin from "url-join";
import { z } from "zod";
import { assertValidPackageName } from "./assert-valid-package-name";
import { distTagsSchema } from "./dist-tags";
import { fetchData } from "./fetch-data";
import { npmRegistryUrl } from "./npm-registry";
import { packageManifestSchema } from "./package-manifest";

/**
Zod schema for the abbreviated packument.
*/
export const abbreviatedPackumentSchema = z
	.object({
		/** Package name. */
		name: z.string(),

		/**
	 	Timestamp of when the package was last modified in ISO 8601 format (e.g., `2021-11-23T19:12:24.006Z`).
	 	*/
		modified: z.string(),

		/**
	 	Mapping of distribution tags to semver version numbers (e.g., `{ "latest": "1.0.0" }`).
	 	*/
		"dist-tags": distTagsSchema,

		/**
	 	Mapping of semver version numbers to their metadata for installing a package version.
	 	*/
		versions: z.record(
			z.string(),
			packageManifestSchema.pick({
				// Required.
				name: true,
				version: true,
				dist: true,

				// Optional.
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
				_hasShrinkwrap: true,
				hasInstallScript: true,
				cpu: true,
				os: true,
			}),
		),
	})
	.passthrough()
	.transform((data) => ({
		...data,

		/** Alias for `dist-tags`. */
		distTags: data["dist-tags"],
	}));

/**
`AbbreviatedPackument` describes the minimal metadata needed for installing a package.

@see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format}
*/
export type AbbreviatedPackument = z.infer<typeof abbreviatedPackumentSchema>;

/**
`getAbbreviatedPackument` returns the abbreviated packument (package document)
containing only the metadata necessary to install a package.

@remarks
To get all the metadata (full packument) about a package see {@link getPackument}.

@param name - package name
@param registry - URL of the registry (default: npm registry)
*/
export const getAbbreviatedPackument = async (
	name: string,
	registry = npmRegistryUrl,
): Promise<AbbreviatedPackument> => {
	assertValidPackageName(name);
	return fetchData(abbreviatedPackumentSchema, urlJoin(registry, name), {
		Accept: "application/vnd.npm.install-v1+json",
	});
};
