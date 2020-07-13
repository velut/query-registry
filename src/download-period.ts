/**
 * DownloadPeriod represents a time period
 * for which downloads should be counted.
 *
 * @remarks
 * The following time periods are supported:
 *
 * - a {@link DefaultDownloadPeriod} (e.g., `last-week`)
 *
 * - a single day date (e.g., `new Date('2020-01-01')`)
 *
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
 *
 * @example
 * ```typescript
 * {
 *     start: new Date('2019-01-01'),
 *     end: new Date('2020-01-01'),
 * }
 * ```
 */
export interface DateRange {
    /** Start day date (inclusive) */
    readonly start: Date;

    /** End day date (inclusive) */
    readonly end: Date;
}
