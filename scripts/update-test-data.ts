import { $ } from "bun";

await $`UPDATE_TEST_DATA=true vitest run --test-timeout=0 --hook-timeout=0`;
