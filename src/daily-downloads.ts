/**
 * DailyDownloads contains the range download statistics.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export interface DailyDownloads {
    /** Download counts per day */
    readonly downloads: DownloadsPerDay[];

    /** Start day date (inclusive) */
    readonly start: string;

    /** End day date (inclusive) */
    readonly end: string;
}

/**
 * DownloadsPerDay lists the number of downloads in a given day.
 */
export interface DownloadsPerDay {
    /** Total number of downloads in the day */
    readonly downloads: number;

    /** Day date */
    readonly day: string;
}
