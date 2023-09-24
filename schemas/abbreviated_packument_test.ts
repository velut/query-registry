import { assertEquals, assertThrows } from "../dev_deps.ts";
import queryRegistry from "../fixtures/abbreviated_packument/query_registry.json" assert {
  type: "json",
};
import tsx from "../fixtures/abbreviated_packument/tsx.json" assert {
  type: "json",
};
import { abbreviatedPackumentSchema } from "./abbreviated_packument.ts";

Deno.test("abbreviatedPackumentSchema with correct data", () => {
  [
    queryRegistry,
    tsx,
  ].forEach((data) => {
    assertEquals(abbreviatedPackumentSchema.parse(data), data);
  });
});

Deno.test("abbreviatedPackumentSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      abbreviatedPackumentSchema.parse(data);
    });
  });
});
