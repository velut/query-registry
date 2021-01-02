import { DistInfo } from './dist-info';
import { NpmOperationalInternal } from './npm-operational-internal';
import { PackageJSON } from './package-json';
import { Person } from './person';

/**
 * `RawPackageManifest` represents the manifest, as returned by the registry,
 * describing a specific version of a package.
 *
 * @remarks
 * For some packages, especially legacy ones,
 * the properties may be mistyped due to incorrect data present on the registry.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#getpackageversion}
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-version-object}
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#full-metadata-format}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#version}
 * @see {@link PackageJSON}
 */
export interface RawPackageManifest extends PackageJSON {
    /** Package version ID (for example, `foo@1.0.0` or `@bar/baz@1.0.0`) */
    readonly _id: string;

    /** Package name */
    readonly name: string;

    /** Package version number */
    readonly version: string;

    /**
     * Distribution data from the registry
     *
     * @see {@link DistInfo}
     */
    readonly dist: DistInfo;

    /** Commit hash corresponding to the published version */
    readonly gitHead?: string;

    /**
     * User who published this package version
     *
     * @see {@link Person}
     */
    readonly _npmUser: Person;

    /** Node version used when publishing */
    readonly _nodeVersion?: string;

    /** npm version used when publishing */
    readonly _npmVersion?: string;

    /**
     * Internal npm data
     *
     * @see {@link NpmOperationalInternal}
     */
    readonly _npmOperationalInternal?: NpmOperationalInternal;

    /** True if the package has a shrinkwrap file */
    readonly _hasShrinkwrap?: boolean;
}
