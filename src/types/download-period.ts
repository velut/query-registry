/**
 * `DownloadPeriod` represents a time period
 * for which downloads should be counted.
 *
 * @remarks
 * The following time periods are supported:
 *
 * - a {@link DefaultDownloadPeriod} (for example, `last-week`)
 *
 * - a date for a single day (for example, `new Date('2020-01-01')`)
 *
 * - a {@link DateRange}
 *
 * @see {@link DefaultDownloadPeriod}
 * @see {@link DateRange}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date}
 */
export type DownloadPeriod = DefaultDownloadPeriod | Date | DateRange;

/**
 * `DefaultDownloadPeriod` represents the default time periods
 * supported by the npm registry.
 */
export type DefaultDownloadPeriod =
    | 'last-day'
    | 'last-week'
    | 'last-month'
    | 'last-year';

/**
 * `DateRange` represents a time period between two days
 * where the `start` and `end` dates are inclusive.
 *
 * @example
 * ```typescript
 * const dateRange = {
 *     start: new Date('2019-01-01'),
 *     end: new Date('2020-01-01'),
 * };
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date}
 */
export interface DateRange {
    /** Date of the first day (inclusive) */
    readonly start: Date;

    /** Date of the last day (inclusive) */
    readonly end: Date;
}
