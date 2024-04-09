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
*/
export type Person = z.infer<typeof personSchema>;
