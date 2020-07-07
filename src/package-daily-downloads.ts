import { DailyDownloads } from './daily-downloads';

/**
 * PackageDailyDownloads contains the range download statistics for a package.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#ranges}
 */
export interface PackageDailyDownloads extends DailyDownloads {
    /** Package name */
    readonly package: string;
}
