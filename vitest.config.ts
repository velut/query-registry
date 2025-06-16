import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		pool: "threads",
		testTimeout: 10000,
		coverage: { include: ["src/**"] },
	},
});
