import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getRegistryMetadata } from "./get-registry-metadata";

const { loadIntoCache, updateFromCache } = testDb("get-registry-metadata");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getRegistryMetadata", async () => {
	await expect(getRegistryMetadata()).resolves.toBeDefined();
});
