import { z } from "zod";

/**
`DistTags` describes the mapping of distribution tags to semver version numbers
(e.g., `{ "latest": "1.0.0" }`).
*/
export const DistTags = z
	.object({
		latest: z.string(),
	})
	.catchall(z.string());
