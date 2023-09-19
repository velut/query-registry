/**
 * `PackageDownloads` lists the number of downloads for a package
 * in a given time period.
 *
 * @see {@link RegistryDownloads}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export interface PackageDownloads extends RegistryDownloads {
    /** Package name */
    readonly package: string;
}

/**
 * `RegistryDownloads` lists the number of downloads for the registry
 *  in a given time period.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export interface RegistryDownloads {
    /** Total number of downloads */
    readonly downloads: number;

    /** Date of the first day (inclusive) */
    readonly start: string;

    /** Date of the last day (inclusive) */
    readonly end: string;
}

/**
 * `DailyPackageDownloads` lists the number of downloads for a package
 * for each day in a given time period.
 *
 * @see {@link DailyRegistryDownloads}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export interface DailyPackageDownloads extends DailyRegistryDownloads {
    /** Package name */
    readonly package: string;
}

/**
 * `DailyRegistryDownloads` lists the number of downloads for the registry
 * for each day in a given time period.
 *
 * @see {@link DownloadsPerDay}
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export interface DailyRegistryDownloads {
    /** Download counts per day */
    readonly downloads: DownloadsPerDay[];

    /** Date of the first day (inclusive) */
    readonly start: string;

    /** Date of the last day (inclusive) */
    readonly end: string;
}

/**
 * `DownloadsPerDay` lists the number of downloads in a given day.
 */
export interface DownloadsPerDay {
    /** Total number of downloads in the day */
    readonly downloads: number;

    /** Day date */
    readonly day: string;
}
