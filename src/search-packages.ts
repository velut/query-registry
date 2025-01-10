import queryString from "query-string";
import urlJoin from "url-join";
import { z } from "zod";
import { PackageJson } from "zod-package-json";
import { fetchData } from "./fetch-data";
import { npmRegistryUrl } from "./npm-registry";

export const SearchCriteria = z.object({
	/**
	Query text (Required).

	@remarks
	The following special text attributes can be used to refine results:
	 - `author:<name>`: show packages from the given author (e.g., `author:someone`)
   - `maintainer:<name>`: show packages with the given maintainer (e.g., `maintainer:someone`)
	 - `keywords:<keyword list>`: show packages matching the given keyword(s);
   separators `,`, `+` and `,-` act respectively as `OR`, `AND` and `NOT`
   (e.g., use `keywords:foo,bar+baz,-quux` to include keywords `foo` OR (`bar` AND `baz`) but NOT `quux`)
	 - `not:unstable`: exclude unstable packages (semver version `<1.0.0`)
	 - `not:insecure`: exclude insecure packages
	 - `is:unstable`: include only unstable packages (semver version `<1.0.0`)
	 - `is:insecure`: include only insecure packages
	 - `boost-exact:<true/false>`: boost packages with exact name match (default: `true`)
	*/
	text: z.string(),

	/** Number of results to return (the npm registry accepts a maximum of `250` with a default of `20`). */
	size: z.number().optional(),

	/** Return results from this offset. */
	from: z.number().optional(),

	/** Package quality weight (from `0.0` to `1.0`). */
	quality: z.number().optional(),

	/** Package popularity weight (from `0.0` to `1.0`). */
	popularity: z.number().optional(),

	/** Package maintenance weight (from `0.0` to `1.0`). */
	maintenance: z.number().optional(),
});

/**
`SearchCriteria` describes the available search criteria for searching packages.
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search}
*/
export type SearchCriteria = z.infer<typeof SearchCriteria>;

const SearchResult = z.object({
	/** Package metadata. */
	package: PackageJson.pick({
		name: true,
		version: true,
		description: true,
		keywords: true,
	}).extend({
		/**
		Timestamp of when the `latest` version of the package was published
		in ISO 8601 format (e.g., `2021-11-23T19:12:24.006Z`).
		*/
		date: z.string(),

		/** User who published the `latest` version of the package. */
		publisher: z
			.object({
				username: z.string(),
				email: z.string(),
			})
			.optional(),

		/** Maintainers of the `latest` version of the package. */
		maintainers: z.array(
			z.object({
				username: z.string(),
				email: z.string(),
			}),
		),

		/** Links to resources associated to the package. */
		links: z.object({
			/** Page for the package on npmjs.com. */
			npm: z.string().optional(),

			/** Homepage for the package. */
			homepage: z.string().optional(),

			/** Repository for the package. */
			repository: z.string().optional(),

			/** Issue tracker for the package. */
			bugs: z.string().optional(),
		}),
	}),

	/** Final and detailed search score values. */
	score: z.object({
		/** Final search score value (from `0.0` to `1.0`), computed from the detailed scores. */
		final: z.number(),

		/** Detailed search score values. */
		detail: z.object({
			/** Quality search score value (from `0.0` to `1.0`). */
			quality: z.number(),

			/** Popularity search score value (from `0.0` to `1.0`). */
			popularity: z.number(),

			/** Maintenance search score value (from `0.0` to `1.0`). */
			maintenance: z.number(),
		}),
	}),

	/** Search score value; may be different from `score.final`. */
	searchScore: z.number(),

	/** Download counts for the package. */
	downloads: z.object({
		monthly: z.number(),
		weekly: z.number(),
	}),

	/** Number of dependents for the package. */
	dependents: z.number(),

	/** Time at which the metadata was updated. */
	updated: z.string(),

	/** Flag attributes for the package. */
	flags: z.object({
		/** True if the package is insecure or has vulnerable dependencies. */
		insecure: z.coerce.boolean(),

		/** True if the package semver version number is `<1.0.0`. */
		unstable: z.coerce.boolean().optional(),
	}),

	/** SPDX license expression. */
	license: z.string().optional(),
});

export const SearchResults = z.object({
	objects: z.array(SearchResult),

	/**
	Total number of corresponding search results available;
	may be higher than the number of `objects` returned.
	*/
	total: z.number(),

	/** Date at which the search happened. */
	time: z.string(),
});

/**
`SearchResults` describes the results returned by the registry for a search query.
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search}
*/
export type SearchResults = z.infer<typeof SearchResults>;

/**
`searchPackages` returns the packages corresponding to a given query.

@param criteria - one or more search criteria
@param registry - URL of the registry (default: npm registry)

@see {@link SearchCriteria}
@see {@link SearchResults}
*/
export const searchPackages = async (
	criteria: SearchCriteria,
	registry = npmRegistryUrl,
): Promise<SearchResults> =>
	fetchData(SearchResults, urlJoin(registry, "-/v1/search", `?${queryString.stringify(criteria)}`));
