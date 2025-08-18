import * as z from "zod";

export const DownloadPeriod = z.union([
	z.literal("last-day"),
	z.literal("last-week"),
	z.literal("last-month"),
	z.literal("last-year"),
	z.string().regex(/^\d{4}-\d{2}-\d{2}(:\d{4}-\d{2}-\d{2})?$/),
]);

/**
`DownloadPeriod` represents a time period for which downloads should be counted.

The following time periods are supported by npm:
- `last-day` - Last day available, not necessarily yesterday.
- `last-week` - Last seven days available.
- `last-month` - Last 30 days available.
- `last-year` - Last 365 days available.
- `YYYY-MM-DD` - Date in the format `YYYY-MM-DD`.
- `YYYY-MM-DD:YYYY-MM-DD` - Inclusive date range in the format `YYYY-MM-DD:YYYY-MM-DD`.

@see {@link https://github.com/npm/registry/blob/master/docs/download-counts.md}
 */
export type DownloadPeriod =
	/** Last day available, not necessarily yesterday. */
	| "last-day"
	/** Last seven days available. */
	| "last-week"
	/** Last 30 days available. */
	| "last-month"
	/** Last 365 days available. */
	| "last-year"
	/** Date in the format `YYYY-MM-DD`. */
	| `${number}-${number}-${number}`
	/** Inclusive date range in the format `YYYY-MM-DD:YYYY-MM-DD`. */
	| `${number}-${number}-${number}:${number}-${number}-${number}`;
