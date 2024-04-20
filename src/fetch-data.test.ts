import { expect, test, vi } from "vitest";
import { z } from "zod";
import { fetchData } from "./fetch-data";

const fetch = vi.fn();

vi.stubGlobal("fetch", fetch);

test("fetchData", async () => {
	fetch.mockResolvedValueOnce({ json: () => ({ foo: "bar" }) });
	expect(await fetchData(z.object({ foo: z.string() }), "https://example.com"))
		.toMatchInlineSnapshot(`
		{
		  "foo": "bar",
		}
	`);
});
