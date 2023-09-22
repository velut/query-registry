import { assertEquals, assertThrows } from "../dev_deps.ts";
import lastDay from "../fixtures/registry_downloads_total/last_day.json" assert {
  type: "json",
};
import specificDay from "../fixtures/registry_downloads_total/specific_day.json" assert {
  type: "json",
};
import specificMonth from "../fixtures/registry_downloads_total/specific_month.json" assert {
  type: "json",
};
import { registryDownloadsTotalSchema } from "./registry_downloads_total.ts";

Deno.test("registryDownloadsTotalSchema with correct data", () => {
  [
    lastDay,
    specificDay,
    specificMonth,
  ].forEach((data) => {
    assertEquals(registryDownloadsTotalSchema.parse(data), data);
  });
});

Deno.test("registryDownloadsTotalSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      registryDownloadsTotalSchema.parse(data);
    });
  });
});
