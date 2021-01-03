/**
 * `DistTags` maps distribution tags to version numbers.
 */
export interface DistTags {
    /** Latest version number */
    readonly latest: string;

    /** Mapping of distribution tags to version numbers */
    readonly [key: string]: string;
}
