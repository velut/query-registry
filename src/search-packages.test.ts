import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { searchPackages } from "./search-packages";

const { loadIntoCache, updateFromCache } = testDb("search-packages");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("searchPackages", async () => {
	await expect(searchPackages({})).resolves.toBeDefined();
	await expect(searchPackages({ text: "react" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "react", size: 0 })).resolves.toBeDefined();
	await expect(searchPackages({ text: "react", size: 1 })).resolves.toBeDefined();
	await expect(searchPackages({ text: "npm" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "lodash" })).resolves.toBeDefined();
});
