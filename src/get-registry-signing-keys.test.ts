import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getRegistrySigningKeys } from "./get-registry-signing-keys";

const { loadIntoCache, updateFromCache } = testData("get-registry-signing-keys");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getRegistrySigningKeys", async () => {
	await expect(getRegistrySigningKeys()).resolves.toBeDefined();
});
