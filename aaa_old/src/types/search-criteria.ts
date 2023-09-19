/**
 * `SearchCriteria` represents the available search criteria.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get-v1search}
 */
export interface SearchCriteria {
    /**
     * Query text
     *
     * @remarks
     * The following special text attributes can be used to refine results:
     *
     * - `author:<name>`: show packages from the given author
     *   (for example, `author:someone`)
     *
     * - `maintainer:<name>`: show packages with the given maintainer
     *   (for example, `maintainer:someone`)
     *
     * - `keywords:<keyword list>`: show packages matching the given keyword(s);
     *   separators `,`, `+` and `,-` mean respectively `OR`, `AND` and `NOT`
     *   (for example, use `keywords:foo,bar+baz,-quux` to include keywords `foo`
     *   or `bar` and `baz` but not `quux`)
     *
     * - `not:unstable`: exclude unstable packages (version `<1.0.0`)
     *
     * - `not:insecure`: exclude insecure packages
     *
     * - `is:unstable`: include only unstable packages (version `<1.0.0`)
     *
     * - `is:insecure`: include only insecure packages
     *
     * - `boost-exact:<true/false>`: boost packages with exact name match
     *   (default: `true`)
     */
    readonly text?: string;

    /** Number of results to return (from `0` to `250`; default: `20` on the npm registry) */
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
