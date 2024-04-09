import { z } from "zod";

/**
Zod schema for a package's funding.
*/
export const fundingSchema = z.union([
	z.string(),
	z
		.object({
			type: z.string(),
			url: z.string(),
		})
		.partial(),
	z.array(
		z.union([
			z.string(),
			z
				.object({
					type: z.string(),
					url: z.string(),
				})
				.partial(),
		]),
	),
]);

/**
`Funding` describes the options for funding a package.

@see {@link https://docs.npmjs.com/cli/v10/configuring-npm/package-json#funding}
*/
export type Funding = z.infer<typeof fundingSchema>;
