import { compressSync, decompressSync, strFromU8, strToU8 } from "fflate";
import fs from "node:fs/promises";
import { cache } from "../src/cache";
import { JsonStrip } from "./json-strip";

export function testData(name: string) {
	const filename = `./data/test/${name}.json.gz`;
	return {
		loadIntoCache: async () => {
			cache.clear();

			// Skip loading cached data if we want to update data.
			if (process.env.UPDATE_TEST_DATA === "true") return;

			const buf = await fs.readFile(filename);
			const data = JSON.parse(strFromU8(decompressSync(buf))) as [string, unknown][];
			if (!data.length) return;
			cache.resize(data.length);
			for (const [key, value] of data) {
				cache.set(key, value);
			}
		},
		updateFromCache: async () => {
			if (process.env.UPDATE_TEST_DATA === "true" && cache.size > 0) {
				const entries = [...cache.entriesAscending()].map(([key, value]) => [
					key,
					JsonStrip.parse(value),
				]);
				const data = compressSync(strToU8(JSON.stringify(entries)));
				await fs.writeFile(filename, data);
			}
			cache.clear();
		},
	};
}
