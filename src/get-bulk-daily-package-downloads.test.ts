import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getBulkDailyPackageDownloads } from "./get-bulk-daily-package-downloads";

const { loadIntoCache, updateFromCache } = testDb("get-bulk-daily-package-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getBulkDailyPackageDownloads", async () => {
	await expect(getBulkDailyPackageDownloads(["npm", "react"], "last-week")).resolves.toBeDefined();
	await expect(getBulkDailyPackageDownloads(["npm", "react"], "last-month")).resolves.toBeDefined();
	await expect(getBulkDailyPackageDownloads(["npm", "react"], "last-year")).resolves.toBeDefined();

	// Non existing package.
	await expect(
		getBulkDailyPackageDownloads(["npm", "radial-guts-fool-bullseye-hypnotist"], "last-week"),
	).resolves.toBeDefined();

	// Scoped package names are not supported by the npm registry.
	await expect(getBulkDailyPackageDownloads(["npm", "@types/node"], "last-week")).rejects.toThrow();
});
