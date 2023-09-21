import { assertEquals, assertThrows } from "../dev_deps.ts";
import cfRegistryMetadata from "../fixtures/registry_metadata/cf.json" assert {
  type: "json",
};
import npmRegistryMetadata from "../fixtures/registry_metadata/npm.json" assert {
  type: "json",
};
import skimdbRegistryMetadata from "../fixtures/registry_metadata/skimdb.json" assert {
  type: "json",
};
import yarnRegistryMetadata from "../fixtures/registry_metadata/yarn.json" assert {
  type: "json",
};
import { registryMetadataSchema } from "./registry_metadata.ts";

Deno.test("registryMetadataSchema with correct data", () => {
  [
    cfRegistryMetadata,
    npmRegistryMetadata,
    skimdbRegistryMetadata,
    yarnRegistryMetadata,
  ].forEach((data) => {
    assertEquals(registryMetadataSchema.parse(data), data);
  });
});

Deno.test("registryMetadataSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      registryMetadataSchema.parse(data);
    });
  });
});
