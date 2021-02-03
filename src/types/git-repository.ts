/**
 * `GitRepository` represents a git repository hosting
 * the source code of a package.
 *
 * @see {@link Repository}
 */
export interface GitRepository {
    /** Repository type, always `git` */
    readonly type: 'git';

    /** Repository URL */
    readonly url: string;

    /**
     * Specific directory in the repository
     * (for example, a directory in a monorepo)
     */
    readonly directory?: string;
}
