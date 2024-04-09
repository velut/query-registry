import { z } from "zod";

/**
Zod schema for the repository for a package.
*/
export const repositorySchema = z.object({
	/** Machine-readable repository URL (e.g., `https://github.com/user/repo.git`). */
	url: z.string(),

	/** Repository type (e.g., `git`). */
	type: z.string().optional(),

	/** Directory in a monorepo where the package's source code is located. */
	directory: z.string().optional(),
});

/**
`Repository` describes the repository for a package.

@see {@link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository}
*/
export type Repository = z.infer<typeof repositorySchema>;
