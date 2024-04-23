import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getAbbreviatedPackument } from "./get-abbreviated-packument";

const { loadIntoCache, updateFromCache } = testData("get-abbreviated-packument");

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
		"canvas",
		"chalk",
		"commander",
		"debug",
		"eslint",
		"express",
		"fs-extra",
		"inquirer",
		"lodash",
		"npm",
		"picocolors",
		"prettier",
		"react-dom",
		"react",
		"semver",
		"temp",
		"tslib",
		"typescript",
		"vite",
		"vitest",
		"vue",
		"webpack",
		"zod",
	]) {
		await expect(getAbbreviatedPackument(pkg)).resolves.toBeDefined();
	}
});
