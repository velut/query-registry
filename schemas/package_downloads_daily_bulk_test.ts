import { assertEquals, assertThrows } from "../dev_deps.ts";
import lastDay from "../fixtures/package_downloads_daily_bulk/last_day.json" assert {
  type: "json",
};
import lastWeek from "../fixtures/package_downloads_daily_bulk/last_week.json" assert {
  type: "json",
};
import { packageDownloadsDailyBulkSchema } from "./package_downloads_daily_bulk.ts";

Deno.test("packageDownloadsDailyBulkSchema with correct data", () => {
  [
    lastDay,
    lastWeek,
  ].forEach((data) => {
    assertEquals(packageDownloadsDailyBulkSchema.parse(data), data);
  });
});

Deno.test("packageDownloadsDailyBulkSchema with wrong data", () => {
  [null, "", [], { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      packageDownloadsDailyBulkSchema.parse(data);
    });
  });
});
