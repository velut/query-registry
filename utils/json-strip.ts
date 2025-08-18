import * as z from "zod";

const Literal = z.union([
	// Truncate strings and numbers to save space in the cached test data.
	z.string().transform(() => ""),
	z.number().transform(() => 0),
	z.boolean(),
	z.null(),
]);

type Literal = z.infer<typeof Literal>;

export type JsonStrip = Literal | { [key: string]: JsonStrip } | JsonStrip[];

export const JsonStrip: z.ZodType<JsonStrip> = z.lazy(() =>
	z.union([Literal, z.array(JsonStrip), z.record(z.string(), JsonStrip)]),
);
