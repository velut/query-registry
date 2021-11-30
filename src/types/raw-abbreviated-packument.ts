import { DistTags } from './dist-tags';
import { RawPackageManifest } from './raw-package-manifest';

/**
 * `RawAbbreviatedPackument` represents an abbreviated packument (package document),
 * as returned from the registry, containing only the metadata necessary to install a package.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format}
 */
export interface RawAbbreviatedPackument {
    /** Package name */
    readonly name: string;

    /**
     * Timestamp of when the package was last modified
     * in ISO 8601 format (for example, `2021-11-23T19:12:24.006Z`)
     */
    readonly modified: string;

    /**
     * Mapping of distribution tags to version numbers
     *
     * @see {@link DistTags}
     */
    readonly 'dist-tags': DistTags;

    /**
     * Mapping of version numbers to package manifests
     *
     * @see {@link RawPackageManifest}
     */
    readonly versions: Record<
        string,
        Pick<
            RawPackageManifest,
            | 'name'
            | 'version'
            | 'dist'
            | 'deprecated'
            | 'dependencies'
            | 'optionalDependencies'
            | 'devDependencies'
            | 'bundleDependencies'
            | 'peerDependencies'
            | 'bin'
            | 'directories'
            | 'engines'
            | '_hasShrinkwrap'
        >
    >;
}
