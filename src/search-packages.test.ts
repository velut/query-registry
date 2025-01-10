import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { searchPackages } from "./search-packages";

const { loadIntoCache, updateFromCache } = testData("search-packages");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("searchPackages", async () => {
	// Text is required.
	await expect(searchPackages({ text: "" })).rejects.toThrow();

	await expect(searchPackages({ text: "react" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "react", size: 0 })).resolves.toBeDefined();
	await expect(searchPackages({ text: "react", size: 1 })).resolves.toBeDefined();

	await expect(searchPackages({ text: "git" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "http" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "lodash" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "node" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "npm" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "unlicensed" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "vite" })).resolves.toBeDefined();
	await expect(searchPackages({ text: "vue" })).resolves.toBeDefined();

	await expect(searchPackages({ text: "some text" })).resolves.toBeDefined();

	// Random string.
	await expect(searchPackages({ text: "9954797682" })).resolves.toBeDefined();
});
