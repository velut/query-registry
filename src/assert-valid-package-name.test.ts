import { expect, test } from "vitest";
import { assertValidPackageName } from "./assert-valid-package-name";

test("assertValidPackageName", () => {
	expect(() => assertValidPackageName("")).toThrow();
	expect(() => assertValidPackageName("foo")).not.toThrow();
	expect(() => assertValidPackageName("@foo/bar")).not.toThrow();
});
