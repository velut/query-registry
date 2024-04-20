import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import fs from "node:fs/promises";
import { cache } from "../src/cache";
import { JsonStrip } from "../utils/json-strip";

export const testDb = (name: string) => {
	return {
		loadIntoCache: async () => {
			cache.clear();
			if (process.env.UPDATE_TEST_DB !== "true") {
				const buf = await fs.readFile(`./data/${name}.db.gz`);
				const data = JSON.parse(strFromU8(decompressSync(buf))) as [string, unknown][];
				if (data.length > 0) {
					cache.resize(data.length);
					for (const [key, value] of data) {
						cache.set(key, value);
					}
				}
			}
		},
		updateFromCache: async () => {
			if (process.env.UPDATE_TEST_DB === "true" && cache.size > 0) {
				const entries = [...cache.entriesAscending()].map(([key, value]) => [
					key,
					JsonStrip.parse(value),
				]);
				const data = compressSync(strToU8(JSON.stringify(entries)));
				await fs.writeFile(`./data/${name}.db.gz`, data);
			}
			cache.clear();
		},
	};
};
