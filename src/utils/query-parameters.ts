/**
 * `QueryParameters` represents the query parameters usable in URLs.
 */
export type QueryParameters = Record<
    string,
    string | number | ReadonlyArray<string | number>
>;
