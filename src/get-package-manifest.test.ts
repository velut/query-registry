import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getPackageManifest } from "./get-package-manifest";

const { loadIntoCache, updateFromCache } = testData("get-package-manifest");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getPackageManifest", async () => {
	// Default to `latest` version.
	await expect(getPackageManifest("@types/node")).resolves.toBeDefined();
	await expect(getPackageManifest("lodash")).resolves.toBeDefined();
	await expect(getPackageManifest("npm")).resolves.toBeDefined();
	await expect(getPackageManifest("react")).resolves.toBeDefined();

	// Specific semver version.
	await expect(getPackageManifest("lodash", "0.1.0")).resolves.toBeDefined();
	await expect(getPackageManifest("@types/node", "20.12.7")).resolves.toBeDefined();
	await expect(getPackageManifest("npm", "10.5.2")).resolves.toBeDefined();
	await expect(getPackageManifest("react", "18.2.0")).resolves.toBeDefined();
});
