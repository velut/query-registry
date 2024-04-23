import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getDailyPackageDownloads } from "./get-daily-package-downloads";

const { loadIntoCache, updateFromCache } = testData("get-daily-package-downloads");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getDailyPackageDownloads", async () => {
	await expect(getDailyPackageDownloads("react", "last-day")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("react", "last-week")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("react", "last-month")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("react", "last-year")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("@types/node", "last-day")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("@types/node", "last-week")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("@types/node", "last-month")).resolves.toBeDefined();
	await expect(getDailyPackageDownloads("@types/node", "last-year")).resolves.toBeDefined();
});
