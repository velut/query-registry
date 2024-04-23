import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getPackageVersionsDownloads } from "./get-package-versions-downloads";

const { loadIntoCache, updateFromCache } = testData("get-package-versions-downloads");

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
