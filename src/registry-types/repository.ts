/**
 * `Repository` represents a remote repository hosting
 * the source code of a package.
 *
 * @see {@link https://docs.npmjs.com/cli/v6/configuring-npm/package-json#repository}.
 */
export interface Repository {
    /** Repository type (for example, `git`) */
    readonly type?: string;

    /** Repository's URL */
    readonly url: string;

    /**
     * Specific directory in the repository containing the package
     * (for example, a directory in a monorepo)
     */
    readonly directory?: string;
}
