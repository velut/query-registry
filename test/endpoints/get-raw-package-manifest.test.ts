/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import * as path from "path";
import { setupPolly } from "setup-polly-jest";
import {
	FetchError,
	getRawPackageManifest,
	InvalidPackageNameError,
	InvalidPackageVersionError,
} from "../../src";

describe("getRawPackageManifest", () => {
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

	it("returns the manifest for `short-time-ago@latest`", async () => {
		expect.assertions(7);

		const manifest = await getRawPackageManifest({
			name: "short-time-ago",
		});
		expect(manifest).toMatchObject({
			name: "short-time-ago",
		});
		expect(manifest).toHaveProperty("_id");
		expect(manifest).toHaveProperty("version");
		expect(manifest).toHaveProperty("dist");
		expect(manifest).toHaveProperty("dist.tarball");
		expect(manifest).toHaveProperty("dist.shasum");
		expect(manifest).toHaveProperty("_npmUser");
	});

	it("returns the manifest for `short-time-ago@1.0.0`", async () => {
		expect.assertions(5);

		const manifest = await getRawPackageManifest({
			name: "short-time-ago",
			version: "1.0.0",
		});
		expect(manifest).toMatchObject({
			_id: "short-time-ago@1.0.0",
			name: "short-time-ago",
			version: "1.0.0",
		});
		expect(manifest).toHaveProperty("dist");
		expect(manifest).toHaveProperty("dist.tarball");
		expect(manifest).toHaveProperty("dist.shasum");
		expect(manifest).toHaveProperty("_npmUser");
	});

	it("throws on invalid package names", async () => {
		expect.assertions(2);

		try {
			await getRawPackageManifest({ name: "" });
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof InvalidPackageNameError).toBeTruthy();
		}
	});

	it("throws on non-existing packages", async () => {
		expect.assertions(2);

		try {
			await getRawPackageManifest({
				name: "@velut/this-package-does-not-exist",
			});
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof FetchError).toBeTruthy();
		}
	});

	it("throws on non-existing package versions", async () => {
		expect.assertions(2);

		try {
			await getRawPackageManifest({
				name: "short-time-ago",
				version: "0.0.0-invalid",
			});
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof InvalidPackageVersionError).toBeTruthy();
		}
	});
});
