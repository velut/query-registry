import { $ } from "bun";

await $`UPDATE_TEST_DATA=true vitest run --bail 1 --test-timeout=60000`;
