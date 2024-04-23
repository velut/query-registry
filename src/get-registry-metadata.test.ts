import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getRegistryMetadata } from "./get-registry-metadata";

const { loadIntoCache, updateFromCache } = testData("get-registry-metadata");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getRegistryMetadata", async () => {
	await expect(getRegistryMetadata()).resolves.toBeDefined();
});
