import * as z from "zod";

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
      // Make `type` optional for query-registry for compatibility
      // with packages like `tinacms`.
      // See https://github.com/velut/query-registry/issues/546.
      //
      // Keep it required in zod-package-json because the npm docs
      // always show both `type` and `url` in the examples.
      /** Repository type (e.g., `git`). */
      type: z.optional(z.string()),

      /** Machine-readable repository URL (e.g., `https://github.com/user/repo.git`). */
      url: z.string(),

      /** Directory in a monorepo where the package's source code is located. */
      directory: z.optional(z.string()),
    }),
  ]),
);
