import { assertEquals, assertThrows } from "../dev_deps.ts";
import lastDay from "../fixtures/package_downloads_total/last_day.json" assert {
  type: "json",
};
import lastMonth from "../fixtures/package_downloads_total/last_month.json" assert {
  type: "json",
};
import lastWeek from "../fixtures/package_downloads_total/last_week.json" assert {
  type: "json",
};
import { packageDownloadsTotalSchema } from "./package_downloads_total.ts";

Deno.test("packageDownloadsTotalSchema with correct data", () => {
  [
    lastDay,
    lastMonth,
    lastWeek,
  ].forEach((data) => {
    assertEquals(packageDownloadsTotalSchema.parse(data), data);
  });
});

Deno.test("packageDownloadsTotalSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      packageDownloadsTotalSchema.parse(data);
    });
  });
});
