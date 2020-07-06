import { DistTags } from './dist-tags';
import { PackageJSON } from './package-json';
import { PackageManifest } from './package-manifest';
import { PackumentCustom } from './packument-custom';
import { TimestampsByVersion } from './timestamps-by-version';

/**
 * A Packument contains all the metadata associated to a package.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#package | npm registry api}.
 */
export interface Packument extends PackageJSON, PackumentCustom {
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
