import { z } from "zod";

const Literal = z.union([
	// Truncate strings and numbers to save space in the test DB
	// but preserve the `type` property literal values.
	z.string().transform((val) => (["module", "commonjs"].includes(val) ? val : "")),
	z.number().transform(() => 0),
	z.boolean(),
	z.null(),
]);

type Literal = z.infer<typeof Literal>;

export type JsonStrip = Literal | { [key: string]: JsonStrip } | JsonStrip[];

export const JsonStrip: z.ZodType<JsonStrip> = z.lazy(() =>
	z.union([Literal, z.array(JsonStrip), z.record(JsonStrip)]),
);
