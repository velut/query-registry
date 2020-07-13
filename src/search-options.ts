/**
 * SearchOptions lists the available search criteria.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search}
 */
export interface SearchOptions {
    /**
     * Query text
     *
     * @remarks
     * The following special attributes can be used to refine results:
     *
     * - `author:<name>` show packages from the given author
     *    (e.g., `author:someone`)
     *
     * - `maintainer:<name>` show packages with the given maintainer
     *    (e.g., `author:someone`)
     *
     * - `keywords:<keyword list>` show packages matching the given keyword(s);
     *    separators `,`, `+` and `,-` mean respectively `OR`, `AND` and `NOT`
     *    (e.g., `keywords:foo,bar+baz,-quux`)
     *
     * - `not:unstable` exclude unstable (version `<1.0.0`) packages
     *
     * - `not:insecure` exclude insecure packages
     *
     * - `is:unstable` include only unstable (version `<1.0.0`) packages
     *
     * - `is:insecure` include only insecure packages
     *
     * - `boost-exact:<true/false>` boost packages with exact name match
     *    (default: `true`)
     */
    readonly text?: string;

    /** Number of results to return (from `0` to `250`; default: `20`) */
    readonly size?: number;

    /** Return results from this offset */
    readonly from?: number;

    /** Package quality influence on results (from `0.0` to `1.0`) */
    readonly quality?: number;

    /** Package popularity influence on results (from `0.0` to `1.0`) */
    readonly popularity?: number;

    /** Package maintenance influence on results (from `0.0` to `1.0`) */
    readonly maintenance?: number;
}
