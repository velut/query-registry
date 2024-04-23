import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getDailyRegistryDownloads } from "./get-daily-registry-downloads";

const { loadIntoCache, updateFromCache } = testData("get-daily-registry-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getDailyRegistryDownloads", async () => {
	await expect(getDailyRegistryDownloads("last-day")).resolves.toBeDefined();
	await expect(getDailyRegistryDownloads("last-week")).resolves.toBeDefined();
	await expect(getDailyRegistryDownloads("last-month")).resolves.toBeDefined();
	await expect(getDailyRegistryDownloads("last-year")).resolves.toBeDefined();
});
