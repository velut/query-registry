import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getRegistryDownloads } from "./get-registry-downloads";

const { loadIntoCache, updateFromCache } = testDb("get-registry-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getRegistryDownloads", async () => {
	await expect(getRegistryDownloads("last-day")).resolves.toBeDefined();
	await expect(getRegistryDownloads("last-week")).resolves.toBeDefined();
	await expect(getRegistryDownloads("last-month")).resolves.toBeDefined();
	await expect(getRegistryDownloads("last-year")).resolves.toBeDefined();
});
