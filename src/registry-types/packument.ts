import { DistTags } from './dist-tags';
import { GitRepository } from './git-repository';
import { RawPackument } from './raw-packument';

/**
 * `Packument` represents a packument (package document)
 * containing all the data about a package.
 *
 * @remarks
 * For some packages, especially legacy ones,
 * the properties may be mistyped due to incorrect data present on the registry.
 *
 * @see {@link RawPackument}
 */
export interface Packument extends RawPackument {
    /**
     * Unique package name (for example, `foo` or `@bar/baz`;
     * alias to `_id`)
     */
    readonly id: string;

    /**
     * Mapping of distribution tags to version numbers
     * (alias to `dist-tags`)
     *
     * @see {@link DistTags}
     */
    readonly distTags: DistTags;

    /**
     * Mapping of version numbers to publishing timestamps
     * without the `created` or `modified` properties
     * present in the `time` property
     *
     * @see {@link VersionsToTimestamps}
     */
    readonly versionsToTimestamps: Record<string, string>;

    /** Normalized license */
    readonly license?: string;

    /** Normalized git repository */
    readonly gitRepository?: GitRepository;
}
