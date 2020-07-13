import { DistTags } from './dist-tags';
import { PackageJSON } from './package-json';
import { PackageManifestRaw } from './package-manifest';
import { TimestampsByVersion } from './timestamps-by-version';

/**
 * A Packument contains all the metadata associated to a package.
 *
 * @see {@link PackageJSON}
 * @see {@link PackumentRaw}
 * @see {@link PackumentCustom}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#package | npm registry API}
 */
export interface Packument extends PackumentRaw, PackumentCustom {}

/**
 * PackumentRaw contains packument metadata as returned by the registry.
 *
 * @see {@link PackageJSON}
 */
export interface PackumentRaw extends PackageJSON {
    /** Unique package name (e.g., `foo`, `@foo/bar`) */
    readonly _id: string;

    /** Latest revision ID in CouchDB */
    readonly _rev: string;

    /**
     * Distribution tags
     * @see {@link DistTags}
     */
    readonly 'dist-tags': DistTags;

    /**
     * Package publishing timestamps by version number
     * @see {@link TimestampsByVersion}
     */
    readonly time: TimestampsByVersion;

    /** Names of the npm users who starred the package */
    readonly users?: Record<string, boolean>;

    /**
     * Package manifests by version number
     * @see {@link PackageManifestRaw}
     */
    readonly versions: Record<string, PackageManifestRaw>;
}

/**
 * PackumentCustom contains custom attributes
 * added by this library to a packument.
 */
export interface PackumentCustom {
    /** Unique package name (e.g., `foo`, `@foo/bar`) */
    readonly id: string;

    /**
     * Distribution tags
     * @see {@link DistTags}
     */
    readonly distTags: DistTags;

    /** Version number to publishing timestamps */
    readonly versionsTimestamps: Record<string, string>;
}
