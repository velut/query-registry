import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { cache } from "../src/cache";
import { JsonStrip } from "../utils/json-strip";

export const testDb = (name: string) => {
	const db = new Low<[string, unknown][]>(new JSONFile(`data/${name}.db.json`), []);
	return {
		loadIntoCache: async () => {
			await db.read();
			cache.clear();
			if (process.env.UPDATE_TEST_DB !== "true" && db.data.length > 0) {
				cache.resize(db.data.length);
				for (const [key, value] of db.data) {
					cache.set(key, value);
				}
			}
		},
		updateFromCache: async () => {
			if (process.env.UPDATE_TEST_DB === "true" && cache.size > 0) {
				db.data = [...cache.entriesAscending()].map(([key, value]) => [
					key,
					JsonStrip.parse(value),
				]);
				await db.write();
			}
			cache.clear();
		},
	};
};
