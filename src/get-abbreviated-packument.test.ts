import { expect, test } from "vitest";
import { getAbbreviatedPackument } from "./get-abbreviated-packument";

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
