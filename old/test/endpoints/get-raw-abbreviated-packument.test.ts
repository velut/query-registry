/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import * as path from "path";
import { setupPolly } from "setup-polly-jest";
import {
	FetchError,
	getRawAbbreviatedPackument,
	InvalidPackageNameError,
} from "../../src/index.old";

describe("getRawAbbreviatedPackument", () => {
	setupPolly({
		adapters: [NodeHttpAdapter],
		persister: FSPersister,
		persisterOptions: {
			fs: {
				recordingsDir: path.resolve(__dirname, "../../__recordings__"),
			},
		},
		recordFailedRequests: true,
	});

	it("returns the packument for `short-time-ago`", async () => {
		expect.assertions(5);

		const packument = await getRawAbbreviatedPackument({
			name: "short-time-ago",
		});
		expect(packument).toMatchObject({
			name: "short-time-ago",
		});
		expect(packument).toHaveProperty("dist-tags");
		expect(packument).toHaveProperty("dist-tags.latest");
		expect(packument).toHaveProperty("modified");
		expect(packument).toHaveProperty("versions");
	});

	it("returns the uncached packument for `short-time-ago`", async () => {
		expect.assertions(5);

		const packument = await getRawAbbreviatedPackument({
			name: "short-time-ago",
			cached: false,
		});
		expect(packument).toMatchObject({
			name: "short-time-ago",
		});
		expect(packument).toHaveProperty("dist-tags");
		expect(packument).toHaveProperty("dist-tags.latest");
		expect(packument).toHaveProperty("modified");
		expect(packument).toHaveProperty("versions");
	});

	it("throws on invalid package names", async () => {
		expect.assertions(2);

		try {
			await getRawAbbreviatedPackument({ name: "" });
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof InvalidPackageNameError).toBeTruthy();
		}
	});

	it("throws on non-existing packages", async () => {
		expect.assertions(2);

		try {
			await getRawAbbreviatedPackument({
				name: "@velut/this-package-does-not-exist",
			});
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof FetchError).toBeTruthy();
		}
	});
});
