/**
 * Repository represents the remote repository hosting a package's source code.
 *
 * @see {@link https://docs.npmjs.com/files/package.json#repository | npm documentation}.
 */
export interface Repository {
    /** Repository type (e.g., `git`) */
    readonly type: string;

    /** Repository URL */
    readonly url: string;

    /** Directory in the repository (e.g., in a monorepo) */
    readonly directory?: string;
}
