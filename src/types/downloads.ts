/**
 * PackageDownloads contains the number of downloads for a package
 * in a given time period.
 *
 * @see {@link Downloads}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export interface PackageDownloads extends Downloads {
    /** Package name */
    readonly package: string;
}

/**
 * Downloads contains the number of downloads in a given time period.
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

/**
 * PackageDailyDownloads contains the number of downloads for a package
 * for each day in a given time period.
 *
 * @see {@link DailyDownloads}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export interface PackageDailyDownloads extends DailyDownloads {
    /** Package name */
    readonly package: string;
}

/**
 * DailyDownloads contains the number of downloads
 * for each day in a given time period.
 *
 * @see {@link DownloadsPerDay}
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
 * DownloadsPerDay contains the number of downloads in a given day.
 */
export interface DownloadsPerDay {
    /** Total number of downloads in the day */
    readonly downloads: number;

    /** Day date */
    readonly day: string;
}
