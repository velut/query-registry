/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import * as path from "path";
import { setupPolly } from "setup-polly-jest";
import { FetchError, getPackument, InvalidPackageNameError } from "../../src";

describe("getPackument", () => {
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
		expect.assertions(9);

		const packument = await getPackument({ name: "short-time-ago" });
		expect(packument).toMatchObject({
			_id: "short-time-ago",
			id: "short-time-ago",
			name: "short-time-ago",
		});
		expect(packument).toHaveProperty("_rev");
		expect(packument).toHaveProperty("dist-tags");
		expect(packument).toHaveProperty("dist-tags.latest");
		expect(packument).toHaveProperty("distTags");
		expect(packument).toHaveProperty("distTags.latest");
		expect(packument).toHaveProperty("time");
		expect(packument).toHaveProperty("versions");
		expect(packument).toHaveProperty("versionsToTimestamps");
	});

	it("throws on invalid package names", async () => {
		expect.assertions(2);

		try {
			await getPackument({ name: "" });
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof InvalidPackageNameError).toBeTruthy();
		}
	});

	it("throws on non-existing packages", async () => {
		expect.assertions(2);

		try {
			await getPackument({
				name: "@velut/this-package-does-not-exist",
			});
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof FetchError).toBeTruthy();
		}
	});
});
