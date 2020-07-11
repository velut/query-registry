/**
 * QueryParameters represents the query parameters
 * that can be used in URLs.
 */
export type QueryParameters = Record<
    string,
    string | number | ReadonlyArray<string | number>
>;
