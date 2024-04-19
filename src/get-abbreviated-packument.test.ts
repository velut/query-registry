import { afterAll, beforeAll, expect, test } from "vitest";
import { testDb } from "../utils/test-db";
import { getAbbreviatedPackument } from "./get-abbreviated-packument";

const { loadIntoCache, updateFromCache } = testDb("get-abbreviated-packument");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getAbbreviatedPackument", async () => {
	for (const pkg of [
		"@types/node",
		"axios",
		"chalk",
		"commander",
		"eslint",
		"express",
		"inquirer",
		"lodash",
		"npm",
		"prettier",
		"react-dom",
		"react",
		"tslib",
		"typescript",
		"vue",
	]) {
		await expect(getAbbreviatedPackument(pkg)).resolves.toBeDefined();
	}
});
