import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getPackageDownloads } from "./get-package-downloads";

const { loadIntoCache, updateFromCache } = testDb("get-package-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getPackageDownloads", async () => {
	await expect(getPackageDownloads("react", "last-day")).resolves.toBeDefined();
	await expect(getPackageDownloads("react", "last-week")).resolves.toBeDefined();
	await expect(getPackageDownloads("react", "last-month")).resolves.toBeDefined();
	await expect(getPackageDownloads("react", "last-year")).resolves.toBeDefined();
	await expect(getPackageDownloads("@types/node", "last-day")).resolves.toBeDefined();
	await expect(getPackageDownloads("@types/node", "last-week")).resolves.toBeDefined();
	await expect(getPackageDownloads("@types/node", "last-month")).resolves.toBeDefined();
	await expect(getPackageDownloads("@types/node", "last-year")).resolves.toBeDefined();
});
