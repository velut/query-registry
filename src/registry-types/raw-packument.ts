import { DistTags } from './dist-tags';
import { PackageJSON } from './package-json';
import { RawPackageManifest } from './raw-package-manifest';
import { VersionsToTimestamps } from './versions-to-timestamps';

/**
 * `RawPackument` represents a packument (package document), as returned
 * from the registry, containing all the data about a package .
 *
 * @remarks
 * For some packages, especially legacy ones,
 * the properties may be mistyped due to incorrect data present on the registry.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#getpackage}
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#package}
 * @see {@link HoistedPackageJSON}
 */
export interface RawPackument extends HoistedPackageJSON {
    /** Unique package name (for example, `foo` or `@bar/baz`) */
    readonly _id: string;

    /** Latest revision ID in CouchDB */
    readonly _rev: string;

    /** Package name */
    readonly name: string;

    /**
     * Mapping of distribution tags to version numbers
     *
     * @see {@link DistTags}
     */
    readonly 'dist-tags': DistTags;

    /**
     * Mapping of version numbers to publishing timestamps
     *
     * @see {@link VersionsToTimestamps}
     */
    readonly time: VersionsToTimestamps;

    /**
     * Mapping of version numbers to package manifests
     *
     * @see {@link RawPackageManifest}
     */
    readonly versions: Record<string, RawPackageManifest>;

    /** Names of the npm users who starred the package */
    readonly users?: Record<string, boolean>;
}

/**
 * `HoistedPackageJSON` contains the data hoisted
 * from the latest package version into the packument.
 *
 * @remarks
 * For some packages, especially legacy ones,
 * the properties may be mistyped due to incorrect data present on the registry.
 *
 * @see {@link PackageJSON}
 * @see {@link RawPackument}
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format}
 */
export type HoistedPackageJSON = Pick<
    PackageJSON,
    | 'author'
    | 'bugs'
    | 'contributors'
    | 'description'
    | 'homepage'
    | 'keywords'
    | 'license'
    | 'maintainers'
    | 'readme'
    | 'readmeFilename'
    | 'repository'
>;
