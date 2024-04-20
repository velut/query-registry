import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getPackageVersionsDownloads } from "./get-package-versions-downloads";

const { loadIntoCache, updateFromCache } = testDb("get-package-versions-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getPackageVersionsDownloads", async () => {
	await expect(getPackageVersionsDownloads("react")).resolves.toBeDefined();
	await expect(getPackageVersionsDownloads("@types/node")).resolves.toBeDefined();
});
