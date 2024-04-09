import { z } from "zod";

/**
Zod schema for the issue tracker for a package.
*/
export const bugsSchema = z
	.object({
		url: z.string(),
		email: z.string(),
	})
	.passthrough()
	.partial();

/**
`Bugs` describes the issue tracker for a package.

@see {@link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#bugs}
*/
export type Bugs = z.infer<typeof bugsSchema>;
