import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { afterAll, beforeAll } from "vitest";
import { z } from "zod";
import { cache } from "./src/index";

const Literal = z.union([
	// Truncate strings and numbers to save space in the test DB.
	z.string().transform(() => ""),
	z.number().transform(() => 0),
	z.boolean(),
	z.null(),
]);
type Literal = z.infer<typeof Literal>;
type Json = Literal | { [key: string]: Json } | Json[];
const Json: z.ZodType<Json> = z.lazy(() => z.union([Literal, z.array(Json), z.record(Json)]));

const testDb = new Low<[string, unknown][]>(new JSONFile("db.test.json"), []);
await testDb.read();

beforeAll(async () => {
	cache.clear();
	if (process.env.UPDATE_TEST_DB !== "true" && testDb.data.length > 0) {
		cache.resize(testDb.data.length);
		for (const [key, value] of testDb.data) {
			cache.set(key, value);
		}
	}
});

afterAll(async () => {
	if (process.env.UPDATE_TEST_DB === "true" && cache.size > 0) {
		testDb.data = [...cache.entriesAscending()].map(([key, value]) => [key, Json.parse(value)]);
		await testDb.write();
	}
	cache.clear();
});
