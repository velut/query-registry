import { afterAll, beforeAll, expect, test } from "vitest";
import { testData } from "../utils/test-data";
import { getPackument } from "./get-packument";

const { loadIntoCache, updateFromCache } = testData("get-packument");

beforeAll(async () => {
	await loadIntoCache();
});

afterAll(async () => {
	await updateFromCache();
});

test("getPackument", async () => {
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
		"mongoose",
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
		"zod-package-json",
		"zod",
	]) {
		await expect(getPackument(pkg)).resolves.toBeDefined();
	}
});
