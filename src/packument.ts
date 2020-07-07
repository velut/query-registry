import { DistTags } from './dist-tags';
import { PackageJSON } from './package-json';
import { PackageManifest } from './package-manifest';
import { TimestampsByVersion } from './timestamps-by-version';

/**
 * A Packument contains all the metadata associated to a package.
 *
 * @see {@link PackageJSON}
 * @see {@link PackumentRaw}
 * @see {@link PackumentCustom}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#package | npm registry api}
 */
export interface Packument extends PackumentRaw, PackumentCustom {}

/**
 * PackumentRaw contains packument metadata as returned by the registry.
 */
export interface PackumentRaw extends PackageJSON {
    /** Unique package name (e.g., `foo`, `@foo/bar`) */
    readonly _id: string;

    /** Latest revision ID in CouchDB */
    readonly _rev: string;

    /** Distribution tags */
    readonly 'dist-tags': DistTags;

    /** Package publishing timestamps by version number */
    readonly time: TimestampsByVersion;

    /** Names of the npm users who starred the package */
    readonly users?: Record<string, boolean>;

    /** Package manifests by version number */
    readonly versions: Record<string, PackageManifest>;
}

/**
 * PackumentCustom contains custom attributes
 * added by this library to a packument.
 */
export interface PackumentCustom {
    /** Unique package name (e.g., `foo`, `@foo/bar`) */
    readonly id: string;

    /** Distribution tags */
    readonly distTags: DistTags;

    /** Version number to publishing timestamps */
    readonly versionsTimestamps: Record<string, string>;
}
