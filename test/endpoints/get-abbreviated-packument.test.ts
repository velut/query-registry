/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import * as path from "path";
import { setupPolly } from "setup-polly-jest";
import {
	FetchError,
	getAbbreviatedPackument,
	getPackument,
	InvalidPackageNameError,
} from "../../src/index.old";

describe("getAbbreviatedPackument", () => {
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
		expect.assertions(8);

		const packument = await getAbbreviatedPackument({
			name: "short-time-ago",
		});
		expect(packument).toMatchObject({
			id: "short-time-ago",
			name: "short-time-ago",
		});
		expect(packument).toHaveProperty("dist-tags");
		expect(packument).toHaveProperty("dist-tags.latest");
		expect(packument).toHaveProperty("distTags");
		expect(packument).toHaveProperty("distTags.latest");
		expect(packument).toHaveProperty("modified");
		expect(packument).toHaveProperty("modifiedAt");
		expect(packument).toHaveProperty("versions");
	});

	it("throws on invalid package names", async () => {
		expect.assertions(2);

		try {
			await getAbbreviatedPackument({ name: "" });
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof InvalidPackageNameError).toBeTruthy();
		}
	});

	it("throws on non-existing packages", async () => {
		expect.assertions(2);

		try {
			await getAbbreviatedPackument({
				name: "@velut/this-package-does-not-exist",
			});
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof FetchError).toBeTruthy();
		}
	});

	it("does not conflict with getPackument on cached responses", async () => {
		expect.assertions(12);

		// Retrieve fresh packuments
		await getPackument({ name: "short-time-ago" });
		await getAbbreviatedPackument({ name: "short-time-ago" });

		// Retrieve cached packuments
		const cachedPackument = await getPackument({
			name: "short-time-ago",
		});
		const cachedAbbreviatedPackument = await getAbbreviatedPackument({
			name: "short-time-ago",
		});

		expect(cachedPackument).toMatchSnapshot();
		expect(cachedPackument).toHaveProperty("_id");
		expect(cachedPackument).toHaveProperty("_rev");
		expect(cachedPackument).toHaveProperty("time");
		expect(cachedPackument).not.toHaveProperty("modified");
		expect(cachedPackument).not.toHaveProperty("modifiedAt");

		expect(cachedAbbreviatedPackument).toMatchSnapshot();
		expect(cachedAbbreviatedPackument).not.toHaveProperty("_id");
		expect(cachedAbbreviatedPackument).not.toHaveProperty("_rev");
		expect(cachedAbbreviatedPackument).not.toHaveProperty("time");
		expect(cachedAbbreviatedPackument).toHaveProperty("modified");
		expect(cachedAbbreviatedPackument).toHaveProperty("modifiedAt");
	});
});
