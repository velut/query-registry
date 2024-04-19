import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		testTimeout: 10000,
		coverage: { include: ["src/**"] },
		exclude: [...configDefaults.exclude, "old"],
	},
});
