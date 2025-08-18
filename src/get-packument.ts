import urlJoin from "url-join";
import * as z from "zod";
import { PackageJson } from "zod-package-json";
import { assertValidPackageName } from "./assert-valid-package-name";
import { DistTags } from "./dist-tags";
import { fetchData } from "./fetch-data";
import { PackageManifest } from "./get-package-manifest";
import { npmRegistryUrl } from "./npm-registry";

const Time = z
	.object({
		/** Timestamp of when the package was created in ISO 8601 format (e.g., `2021-11-23T19:12:24.006Z`). */
		created: z.string(),

		/** Timestamp of when the package was last modified in ISO 8601 format (e.g., `2021-11-23T19:12:24.006Z`). */
		modified: z.string(),
	})
	.catchall(z.string());

export const Packument = PackageJson.pick({
	author: true,
	bugs: true,
	contributors: true,
	description: true,
	homepage: true,
	keywords: true,
	license: true,
	maintainers: true,
	repository: true,
}).extend({
	/** Package name used as the ID in CouchDB. */
	_id: z.string(),

	/** Package name. */
	name: z.string(),

	/** Mapping of distribution tags to semver version numbers e.g., `{ "latest": "1.0.0" }`). */
	"dist-tags": DistTags,

	/**
	Mapping of semver version numbers to timestamps in ISO 8601 format representing
	the publishing time (e.g., `{ "1.0.0": "2021-11-23T19:12:24.006Z" }`).
	Also includes the timestamps of when the package was `created` and last `modified`.
	*/
	time: Time,

	/**
	Mapping of semver version numbers to package manifests.
	@see {@link PackageManifest}
	*/
	versions: z.record(z.string(), PackageManifest),

	/** Revision ID of the document in CouchDB. */
	_rev: z.coerce.string().optional(),

	/** Mapping of npm usernames of users who starred the package to `true`. */
	users: z.record(z.string(), z.boolean()).optional(),

	/** Text extracted from the README file. */
	readme: z.string().optional(),

	/** Name of the README file. */
	readmeFilename: z.string().optional(),
});

/**
`Packument` (package document) describes the full metadata available about a package.
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#getpackage}
@see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format}
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#package}
*/
export type Packument = z.infer<typeof Packument>;

/**
`getPackument` returns the full packument (package document)
containing all the metadata available about a package.

@remarks
To get only the metadata needed to install a package (abbreviated packument)
see {@link getAbbreviatedPackument}.

@param name - package name
@param registry - URL of the registry (default: npm registry)

@see {@link Packument}
*/
export const getPackument = async (name: string, registry = npmRegistryUrl): Promise<Packument> => {
	assertValidPackageName(name);
	return fetchData(Packument, urlJoin(registry, name));
};
