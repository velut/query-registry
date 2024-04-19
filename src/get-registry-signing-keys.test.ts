import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getRegistrySigningKeys } from "./get-registry-signing-keys";

const { loadIntoCache, updateFromCache } = testDb("get-registry-signing-keys");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getRegistrySigningKeys", async () => {
	await expect(getRegistrySigningKeys()).resolves.toBeDefined();
});
