/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import * as path from "path";
import { setupPolly } from "setup-polly-jest";
import { getRegistryMetadata, yarnRegistry } from "../../src/index.old";

describe("getRegistryMetadata", () => {
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

	it("returns metadata for the npm registry", async () => {
		expect.assertions(19);

		const metadata = await getRegistryMetadata();
		expect(metadata).toHaveProperty("db_name", "registry");
		expect(metadata).toHaveProperty("doc_count");
		expect(metadata).toHaveProperty("doc_del_count");
		expect(metadata).toHaveProperty("update_seq");
		expect(metadata).toHaveProperty("purge_seq");
		expect(metadata).toHaveProperty("compact_running");
		expect(metadata).toHaveProperty("disk_size");
		expect(metadata).toHaveProperty("data_size");
		expect(metadata).toHaveProperty("instance_start_time");
		expect(metadata).toHaveProperty("disk_format_version");
		expect(metadata).toHaveProperty("committed_update_seq");
		expect(metadata).toHaveProperty("compacted_seq");
		expect(metadata).toHaveProperty("uuid");
		expect(metadata).toHaveProperty("other");
		expect(metadata).toHaveProperty("other.data_size");
		expect(metadata).toHaveProperty("sizes");
		expect(metadata).toHaveProperty("sizes.file");
		expect(metadata).toHaveProperty("sizes.active");
		expect(metadata).toHaveProperty("sizes.external");
	});

	it("returns metadata for the Yarn registry", async () => {
		expect.assertions(19);

		const metadata = await getRegistryMetadata({
			registry: yarnRegistry,
		});
		expect(metadata).toHaveProperty("db_name", "registry");
		expect(metadata).toHaveProperty("doc_count");
		expect(metadata).toHaveProperty("doc_del_count");
		expect(metadata).toHaveProperty("update_seq");
		expect(metadata).toHaveProperty("purge_seq");
		expect(metadata).toHaveProperty("compact_running");
		expect(metadata).toHaveProperty("disk_size");
		expect(metadata).toHaveProperty("data_size");
		expect(metadata).toHaveProperty("instance_start_time");
		expect(metadata).toHaveProperty("disk_format_version");
		expect(metadata).toHaveProperty("committed_update_seq");
		expect(metadata).toHaveProperty("compacted_seq");
		expect(metadata).toHaveProperty("uuid");
		expect(metadata).toHaveProperty("other");
		expect(metadata).toHaveProperty("other.data_size");
		expect(metadata).toHaveProperty("sizes");
		expect(metadata).toHaveProperty("sizes.file");
		expect(metadata).toHaveProperty("sizes.active");
		expect(metadata).toHaveProperty("sizes.external");
	});
});
