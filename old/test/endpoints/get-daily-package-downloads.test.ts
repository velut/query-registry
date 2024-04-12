/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import * as path from "path";
import { setupPolly } from "setup-polly-jest";
import { FetchError, getDailyPackageDownloads, InvalidPackageNameError } from "../../src/index.old";

describe("getDailyPackageDownloads", () => {
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

	it("returns the weekly downloads for `short-time-ago`", async () => {
		expect.assertions(8);

		const downloads = await getDailyPackageDownloads({
			name: "short-time-ago",
		});
		expect(downloads).toHaveProperty("package", "short-time-ago");
		expect(downloads).toHaveProperty("downloads");
		expect(typeof downloads.downloads[0]!.downloads).toEqual("number");
		expect(typeof downloads.downloads[0]!.day).toEqual("string");
		expect(downloads).toHaveProperty("start");
		expect(downloads).toHaveProperty("end");
		expect(typeof downloads.start).toEqual("string");
		expect(typeof downloads.end).toEqual("string");
	});

	it("returns the monthly downloads for `short-time-ago`", async () => {
		expect.assertions(8);

		const downloads = await getDailyPackageDownloads({
			name: "short-time-ago",
			period: "last-month",
		});
		expect(downloads).toHaveProperty("package", "short-time-ago");
		expect(downloads).toHaveProperty("downloads");
		expect(typeof downloads.downloads[0]!.downloads).toEqual("number");
		expect(typeof downloads.downloads[0]!.day).toEqual("string");
		expect(downloads).toHaveProperty("start");
		expect(downloads).toHaveProperty("end");
		expect(typeof downloads.start).toEqual("string");
		expect(typeof downloads.end).toEqual("string");
	});

	it("returns the downloads on a given day for `short-time-ago`", async () => {
		expect.assertions(8);

		const downloads = await getDailyPackageDownloads({
			name: "short-time-ago",
			period: new Date("2021-01-01"),
		});
		expect(downloads).toHaveProperty("package", "short-time-ago");
		expect(downloads).toHaveProperty("downloads");
		expect(typeof downloads.downloads[0]!.downloads).toEqual("number");
		expect(typeof downloads.downloads[0]!.day).toEqual("string");
		expect(downloads).toHaveProperty("start");
		expect(downloads).toHaveProperty("end");
		expect(typeof downloads.start).toEqual("string");
		expect(typeof downloads.end).toEqual("string");
	});

	it("returns the downloads for a given time period for `short-time-ago`", async () => {
		expect.assertions(8);

		const downloads = await getDailyPackageDownloads({
			name: "short-time-ago",
			period: {
				start: new Date("2021-01-01"),
				end: new Date("2021-01-02"),
			},
		});
		expect(downloads).toHaveProperty("package", "short-time-ago");
		expect(downloads).toHaveProperty("downloads");
		expect(typeof downloads.downloads[0]!.downloads).toEqual("number");
		expect(typeof downloads.downloads[0]!.day).toEqual("string");
		expect(downloads).toHaveProperty("start");
		expect(downloads).toHaveProperty("end");
		expect(typeof downloads.start).toEqual("string");
		expect(typeof downloads.end).toEqual("string");
	});

	it("supports a custom registry downloads API", async () => {
		expect.assertions(1);

		try {
			await getDailyPackageDownloads({
				name: "short-time-ago",
				registryDownloadsAPI: "https://example.com",
			});
		} catch (err) {
			expect(err).toBeDefined();
		}
	});

	it("throws on invalid package names", async () => {
		expect.assertions(2);

		try {
			await getDailyPackageDownloads({ name: "" });
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof InvalidPackageNameError).toBeTruthy();
		}
	});

	it("throws on non-existing packages", async () => {
		expect.assertions(2);

		try {
			await getDailyPackageDownloads({
				name: "@velut/this-package-does-not-exist",
			});
		} catch (err) {
			expect(err).toBeDefined();
			expect(err instanceof FetchError).toBeTruthy();
		}
	});
});
