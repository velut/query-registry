import { assertEquals, assertThrows } from "../dev_deps.ts";
import lastDay from "../fixtures/package_downloads_daily/last_day.json" assert {
  type: "json",
};
import lastMonth from "../fixtures/package_downloads_daily/last_month.json" assert {
  type: "json",
};
import { packageDownloadsDailySchema } from "./package_downloads_daily.ts";

Deno.test("packageDownloadsDailySchema with correct data", () => {
  [
    lastDay,
    lastMonth,
  ].forEach((data) => {
    assertEquals(packageDownloadsDailySchema.parse(data), data);
  });
});

Deno.test("packageDownloadsDailySchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      packageDownloadsDailySchema.parse(data);
    });
  });
});
