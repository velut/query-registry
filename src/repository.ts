import * as z from "zod";
import { PackageJson } from "zod-package-json";

/**
Repository for the package's source code.

@remarks
In some packages (like `tinacms@3.15.2`) the `type` property of the repository
object is missing.
*/
export const Repository = z.optional(
  z.union([
    z.string(),
    z.object({
      ...PackageJson.shape.repository.unwrap().options[1].shape,

      // Make `type` optional for query-registry for compatibility
      // with packages like `tinacms`.
      // See https://github.com/velut/query-registry/issues/546.
      //
      // Keep it required in zod-package-json because the npm docs
      // always show both `type` and `url` in the examples.

      /** Repository type (e.g., `git`). */
      type: PackageJson.shape.repository.unwrap().options[1].shape.type.optional(),
    }),
  ]),
);
