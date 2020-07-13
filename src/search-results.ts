import { PackageSearchResult } from './package-search-result';

/**
 * SearchResults contains the results returned by the registry for a query.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search}
 */
export interface SearchResults {
    /**
     * List of search results
     * @see {@link SearchResult}
     */
    readonly objects: SearchResult[];

    /**
     * Total number of search results corresponding to a query;
     * may be higher than the number of `objects`
     */
    readonly total: number;

    /** Date at which the search happened */
    readonly time: string;
}

/**
 * SearchResult contains a single package result and its search score.
 */
export interface SearchResult {
    /**
     * Abbreviated package metadata
     * @see {@link PackageSearchResult}
     */
    readonly package: PackageSearchResult;

    /**
     * Search score final and detailed values
     * @see {@link SearchScore}
     */
    readonly score: SearchScore;

    /** Search score value; may be different from `score.final` */
    readonly searchScore: number;

    /**
     * Flag attributes
     * @see {@link PackageFlags}
     */
    readonly flags?: PackageFlags;
}

/**
 * SearchScore contains the final and detailed search score values.
 */
export interface SearchScore {
    /** Final search score value, computed from the detailed scores */
    readonly final: number;

    /**
     * Detailed search score values
     * @see {@link SearchScoreDetail}
     */
    readonly detail: SearchScoreDetail;
}

/**
 * SearchScoreDetail contains the search score values for the
 * quality, popularity and maintenance categories.
 */
export interface SearchScoreDetail {
    /** Package quality score value */
    readonly quality: number;

    /** Package popularity score value */
    readonly popularity: number;

    /** Package maintenance score value */
    readonly maintenance: number;
}

/**
 * PackageFlags contains flag attributes categorizing the package.
 */
export interface PackageFlags {
    /** If true, package version is `<1.0.0` */
    readonly unstable: boolean;

    /** If true, package is insecure or has vulnerable dependencies */
    readonly insecure: boolean;
}
