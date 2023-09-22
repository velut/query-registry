import { z } from "../deps.ts";

export const searchResultsSchema = z.object({
  /** List of search results. */
  objects: z.array(z.object({
    /** Package metadata. */
    package: z.object({
      /** Full package name. */
      name: z.string(),
      /** Package scope (without `@`) or `unscoped` for bare packages. */
      scope: z.string(),
      /** Latest package version. */
      version: z.string(),
      /** Description for the package. */
      description: z.string().optional(),
      /** Keywords for the package. */
      keywords: z.array(z.string()).optional(),
      /** Publishing timestamp for the latest version. */
      date: z.string(),
      /** Links to pages related to the package. */
      links: z
        .object({
          /** Package page on https://www.npmjs.com. */
          npm: z.string().catch(""),
          /** Package homepage. */
          homepage: z.string().optional(),
          /** Package repository page. */
          repository: z.string().optional(),
          /** Package bug tracker page. */
          bugs: z.string().optional(),
        })
        .catchall(z.string()),
      /** User who published the package. */
      publisher: z.object({
        username: z.string(),
        email: z.string(),
      }),
      /** User who created the package. */
      author: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        url: z.string().optional(),
        username: z.string().optional(),
      }).optional(),
      /** Users who maintain the package. */
      maintainers: z.array(
        z.object({
          username: z.string(),
          email: z.string(),
        }),
      ),
    }),
    /** Final and detailed search score values. */
    score: z.object({
      /** Final search score value. */
      final: z.number(),
      /** Detailed search score values. */
      detail: z.object({
        /** Score value for package quality. */
        quality: z.number(),
        /** Score value for package popularity. */
        popularity: z.number(),
        /** Score value for package maintenance. */
        maintenance: z.number(),
      }),
    }),
    /** Search score value. */
    searchScore: z.number(),
    /** Flag attributes for a package. */
    flags: z.object({
      /** If `true`, package version is `<1.0.0`. */
      unstable: z.boolean().optional(),
      /** If `true`, package is insecure or has vulnerable dependencies. */
      insecure: z.boolean().optional(),
    }).optional(),
  })),
  /** Number of all the packages in the registry that match the search query. */
  total: z.number(),
  /** Date at which the search was performed. */
  time: z.string(),
});

/**
 * `SearchResults` contains the results returned by the registry for a search query.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search}
 */
export type SearchResults = z.infer<typeof searchResultsSchema>;
