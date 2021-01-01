import { DistInfo } from './dist-info';
import { NpmOperationalInternal } from './npm-operational-internal';
import { PackageJSON } from './package-json';
import { Person } from './person';

/**
 * PackageManifest contains the metadata for a specific version of a package.
 *
 * @see {@link PackageJSON}
 * @see {@link PackageManifestRaw}
 * @see {@link PackageManifestCustom}
 */
export interface PackageManifest
    extends PackageManifestRaw,
        PackageManifestCustom {}

/**
 * PackageManifestRaw contains manifest metadata as returned by the registry.
 *
 * @see {@link PackageJSON}
 */
export interface PackageManifestRaw extends PackageJSON {
    /** Package version ID (e.g., `foo@1.0.0`, `@foo/bar@1.0.0`) */
    readonly _id: string;

    /**
     * Registry metadata
     * @see {@link DistInfo}
     */
    readonly dist: DistInfo;

    /** Commit hash at publishing time */
    readonly gitHead?: string;

    /**
     * User who published this package version
     * @see {@link Person}
     */
    readonly _npmUser: Person;

    /** Node version used when publishing */
    readonly _nodeVersion?: string;

    /** npm version used when publishing */
    readonly _npmVersion?: string;

    /**
     * Internal npm data
     * @see {@link NpmOperationalInternal}
     */
    readonly _npmOperationalInternal?: NpmOperationalInternal;

    /** True if the package has a shrinkwrap file */
    readonly _hasShrinkwrap?: boolean;
}

/**
 * PackageManifestCustom contains custom attributes
 * added by this library to package manifests.
 */
export interface PackageManifestCustom {
    /** Package version ID (e.g., `foo@1.0.0`, `@foo/bar@1.0.0`) */
    readonly id: string;

    /** Publishing timestamp */
    readonly createdAt: string;

    /**
     * User who published this package version
     * @see {@link Person}
     */
    readonly publisher: Person;

    /** Name of the corresponding DefinitelyTyped package */
    readonly definitelyTypedName?: string;

    /** Name of the corresponding untyped package (w.r.t. DefinitelyTyped) */
    readonly untypedName?: string;
}
