import { z } from "zod";

/**
Zod schema for a person (e.g., a package's author).
*/
export const personSchema = z
	.object({
		name: z.string(),
		email: z.string().optional(),
		url: z.string().optional(),
	})
	.passthrough();

/**
`Person` describes a person involved with a package (e.g., a package's author).

@see {@link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#people-fields-author-contributors}
*/
export type Person = z.infer<typeof personSchema>;
