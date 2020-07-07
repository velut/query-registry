import { Downloads } from './downloads';

/**
 * PackageDownloads contains the point (cumulative) download statistics
 * for a package.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#point-values}
 */
export interface PackageDownloads extends Downloads {
    /** Package name */
    readonly package: string;
}
