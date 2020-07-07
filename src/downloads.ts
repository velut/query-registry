/**
 * Downloads contains the point (cumulative) download statistics.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export interface Downloads {
    /** Total number of downloads */
    readonly downloads: number;

    /** Start day date (inclusive) */
    readonly start: string;

    /** End day date (inclusive) */
    readonly end: string;
}
