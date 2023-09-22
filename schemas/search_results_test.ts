import { assertEquals, assertThrows } from "../dev_deps.ts";
import noResults from "../fixtures/search_results/no_results.json" assert {
  type: "json",
};
import react from "../fixtures/search_results/react.json" assert {
  type: "json",
};
import withFlags from "../fixtures/search_results/with_flags.json" assert {
  type: "json",
};
import { searchResultsSchema } from "./search_results.ts";

Deno.test("searchResultsSchema with correct data", () => {
  [
    noResults,
    withFlags,
    react,
  ].forEach((data) => {
    assertEquals(searchResultsSchema.parse(data), data);
  });
});

Deno.test("searchResultsSchema with wrong data", () => {
  [null, "", [], {}, { foo: "bar" }].forEach((data) => {
    assertThrows(() => {
      searchResultsSchema.parse(data);
    });
  });
});
