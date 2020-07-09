/**
 * DownloadPeriod represents a time period
 * for which downloads should be counted.
 *
 * @remarks
 * The following time periods are supported:
 * - {@link DefaultDownloadPeriod} (e.g., `last-week`)
 * - a single day date
 * - a {@link DateRange}
 *
 * @see {@link DefaultDownloadPeriod}
 * @see {@link DateRange}
 */
export type DownloadPeriod = DefaultDownloadPeriod | Date | DateRange;

/**
 * DefaultDownloadPeriod represents the default time periods
 * supported by a registry.
 */
export type DefaultDownloadPeriod =
    | 'last-day'
    | 'last-week'
    | 'last-month'
    | 'last-year';

/**
 * DateRange represents an inclusive time range.
 */
export interface DateRange {
    /** Start day date (inclusive) */
    readonly start: Date;

    /** End day date (inclusive) */
    readonly end: Date;
}
