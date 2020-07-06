/**
 * DistTags maps distribution tags to version numbers.
 */
export interface DistTags {
    /** Latest version number */
    readonly latest: string;

    /** Custom distribution tags to version numbers */
    [key: string]: string;
}
