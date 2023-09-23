import { assertEquals, assertThrows } from "../dev_deps.ts";
import lastDay from "../fixtures/registry_downloads_daily/last_day.json" assert {
  type: "json",
};
import lastWeek from "../fixtures/registry_downloads_daily/last_week.json" assert {
  type: "json",
};
import { registryDownloadsDailySchema } from "./registry_downloads_daily.ts";

Deno.test("registryDownloadsDailySchema with correct data", () => {
  [
    lastDay,
    lastWeek,
  ].forEach((data) => {
    assertEquals(registryDownloadsDailySchema.parse(data), data);
  });
});

Deno.test("registryDownloadsDailySchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      registryDownloadsDailySchema.parse(data);
    });
  });
});
