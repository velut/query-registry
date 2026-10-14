import { expect, test, vi } from "vitest";
import * as z from "zod";
import { cache } from "./cache";
import { fetchData } from "./fetch-data";

const fetch = vi.fn();

vi.stubGlobal("fetch", fetch);

test("fetchData", async () => {
  fetch.mockResolvedValueOnce({ ok: true, json: () => ({ foo: "bar" }) });
  expect(await fetchData(z.object({ foo: z.string() }), "https://example.com"))
    .toMatchInlineSnapshot(`
		{
		  "foo": "bar",
		}
	`);
});

test("fetchData throws on HTTP errors without caching the response", async () => {
  const url = "https://example.com/missing";
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    statusText: "Not Found",
    json: () => ({ error: "Not found" }),
  });
  await expect(fetchData(z.object({ foo: z.string() }), url)).rejects.toThrow(
    "fetchData: 404 Not Found for https://example.com/missing",
  );
  expect(cache.has(JSON.stringify({ url }))).toBe(false);
});
