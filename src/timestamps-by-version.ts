/**
 * TimestampsByVersion maps version numbers to their publishing timestamps
 * and also includes the `created` and `modified` keys.
 */
export interface TimestampsByVersion {
    /** Package creation time */
    readonly created: string;

    /** Last updated time */
    readonly modified: string;

    /** Version numbers to publishing timestamps */
    readonly [key: string]: string;
}
