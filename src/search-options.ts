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
     * - `author:<name>` show packages from the given author
     * - `maintainer:<name>` show packages with the given maintainer
     * - `keywords:<keyword list>` show packages matching the given keywords
     *    where the separator `,` means `OR`, `+` means `AND`
     *    and `,-` means `NOT`
     * - `not:unstable` exclude unstable (`<1.0.0`) packages
     * - `not:insecure` exclude insecure packages
     * - `is:unstable` include only unstable (`<1.0.0`) packages
     * - `is:insecure` include only insecure packages
     * - `boost-exact:<true/false>` boost packages with exact name match
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
