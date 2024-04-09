import { z } from "zod";

/**
Zod schema for the mapping of distribution tags to semver version numbers.
*/
export const distTagsSchema = z
	.object({
		latest: z.string(),
	})
	.catchall(z.string());

/**
`DistTags` describes the mapping of distribution tags to semver version numbers
(e.g., `{ "latest": "1.0.0" }`).
*/
export type DistTags = z.infer<typeof distTagsSchema>;
