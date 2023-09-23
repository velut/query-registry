import { assertEquals, assertThrows } from "../dev_deps.ts";
import lastDay from "../fixtures/package_downloads_total_bulk/last_day.json" assert {
  type: "json",
};
import lastWeek from "../fixtures/package_downloads_total_bulk/last_week.json" assert {
  type: "json",
};
import { packageDownloadsTotalBulkSchema } from "./package_downloads_total_bulk.ts";

Deno.test("packageDownloadsTotalBulkSchema with correct data", () => {
  [
    lastDay,
    lastWeek,
  ].forEach((data) => {
    assertEquals(packageDownloadsTotalBulkSchema.parse(data), data);
  });
});

Deno.test("packageDownloadsTotalBulkSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      packageDownloadsTotalBulkSchema.parse(data);
    });
  });
});
