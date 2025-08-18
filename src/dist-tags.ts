import * as z from "zod";

/**
`DistTags` describes the mapping of distribution tags to semver version numbers
(e.g., `{ "latest": "1.0.0" }`).
*/
export const DistTags = z
	.object({
		/** Latest semver version number. */
		latest: z.string(),

		// The following tags have no special meaning for the npm registry
		// but they are commonly used by packages.
		next: z.string().optional(),
		alpha: z.string().optional(),
		beta: z.string().optional(),
		rc: z.string().optional(),
		canary: z.string().optional(),
		dev: z.string().optional(),
	})
	.catchall(z.string());
