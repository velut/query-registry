import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getBulkPackageDownloads } from "./get-bulk-package-downloads";

const { loadIntoCache, updateFromCache } = testDb("get-bulk-package-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getBulkPackageDownloads", async () => {
	await expect(getBulkPackageDownloads(["npm", "react"], "last-week")).resolves.toBeDefined();
	await expect(getBulkPackageDownloads(["npm", "react"], "last-month")).resolves.toBeDefined();
	await expect(getBulkPackageDownloads(["npm", "react"], "last-year")).resolves.toBeDefined();

	// Non existing package.
	await expect(
		getBulkPackageDownloads(["npm", "radial-guts-fool-bullseye-hypnotist"], "last-week"),
	).resolves.toBeDefined();

	// Scoped package names are not supported by the npm registry.
	await expect(getBulkPackageDownloads(["npm", "@types/node"], "last-week")).rejects.toThrow();
});
