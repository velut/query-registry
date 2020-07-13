/**
 * Repository represents the remote repository hosting a package's source code.
 *
 * @see {@link https://docs.npmjs.com/files/package.json#repository | npm documentation}.
 */
export interface Repository {
    /** Repository type (e.g., `git`) */
    readonly type: string;

    /** Repository's URL */
    readonly url: string;

    /**
     * Specific directory in the repository
     * (e.g., a directory in a monorepo)
     */
    readonly directory?: string;
}
