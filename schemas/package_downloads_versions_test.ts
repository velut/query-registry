import { assertEquals, assertThrows } from "../dev_deps.ts";
import fastify from "../fixtures/package_downloads_versions/fastify.json" assert {
  type: "json",
};
import slackClient from "../fixtures/package_downloads_versions/slack__client.json" assert {
  type: "json",
};
import { packageDownloadsVersionsSchema } from "./package_downloads_versions.ts";

Deno.test("packageDownloadsVersionsSchema with correct data", () => {
  [
    fastify,
    slackClient,
  ].forEach((data) => {
    assertEquals(packageDownloadsVersionsSchema.parse(data), data);
  });
});

Deno.test("packageDownloadsVersionsSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      packageDownloadsVersionsSchema.parse(data);
    });
  });
});
