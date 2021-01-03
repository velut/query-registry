/**
 * `VersionsToTimestamps` maps version numbers to their publishing timestamps.
 */
export interface VersionsToTimestamps {
    /** Package creation time */
    readonly created: string;

    /** Last package update time */
    readonly modified: string;

    /** Mapping of version numbers to publishing timestamps */
    readonly [key: string]: string;
}
