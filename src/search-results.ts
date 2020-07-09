import { PackageSearchResult } from './package-search-result';

/**
 * SearchResults contains the results returned by the registry for a query.
 */
export interface SearchResults {
    /** List of search results */
    readonly objects: SearchResult[];

    /**
     * Total number of search results corresponding to a query.
     * May be much higher than the number of objects returned.
     */
    readonly total: number;

    /** Date at which the search happened */
    readonly time: string;
}

/**
 * SearchResult contains a single package result and its search score.
 */
export interface SearchResult {
    /** Abbreviated package metadata */
    readonly package: PackageSearchResult;

    /** Search score final and detailed values */
    readonly score: SearchScore;

    /** Search score value; may be different from `score.final` */
    readonly searchScore: number;

    /** Flag attributes */
    readonly flags?: PackageFlags;
}

/**
 * SearchScore contains the final and detailed search score values.
 */
export interface SearchScore {
    /** Final search score value, computed from the detailed scores */
    readonly final: number;

    /** Detailed search score values */
    readonly detail: SearchScoreDetail;
}

/**
 * SearchScoreDetail contains the search score values for the
 * quality, popularity and maintenance categories.
 */
export interface SearchScoreDetail {
    /** Quality score value */
    readonly quality: number;

    /** Popularity score value */
    readonly popularity: number;

    /** Maintenance score value */
    readonly maintenance: number;
}

/**
 * PackageFlags contains flag attributes categorizing the package.
 */
export interface PackageFlags {
    /** If true, package version is < 1.0.0 */
    readonly unstable: boolean;

    /** If true, package is insecure or has vulnerable dependencies */
    readonly insecure: boolean;
}
