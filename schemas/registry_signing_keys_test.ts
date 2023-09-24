import { assertEquals, assertThrows } from "../dev_deps.ts";
import npm from "../fixtures/registry_signing_keys/npm.json" assert {
  type: "json",
};
import { registrySigningKeysSchema } from "./registry_signing_keys.ts";

Deno.test("registrySigningKeysSchema with correct data", () => {
  [
    npm,
  ].forEach((data) => {
    assertEquals(registrySigningKeysSchema.parse(data), data);
  });
});

Deno.test("registrySigningKeysSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      registrySigningKeysSchema.parse(data);
    });
  });
});
