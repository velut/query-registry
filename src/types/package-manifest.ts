import { GitRepository } from './git-repository';
import { Person } from './person';
import { RawPackageManifest } from './raw-package-manifest';

/**
 * `PackageManifest` represents the manifest describing a specific version
 *  of a package.
 *
 * @remarks
 * For some packages, especially legacy ones,
 * the properties may be mistyped due to incorrect data present on the registry.
 *
 * @see {@link RawPackageManifest}
 */
export interface PackageManifest extends RawPackageManifest {
    /** Package version ID (for example, `foo@1.0.0` or `@bar/baz@1.0.0`) */
    readonly id: string;

    /** Publishing timestamp */
    readonly createdAt: string;

    /**
     * User who published this version of the package
     *
     * @see {@link Person}
     */
    readonly publisher: Person;

    /** Normalized license */
    readonly license?: string;

    /** Normalized git repository */
    readonly gitRepository?: GitRepository;

    /** Name of the corresponding DefinitelyTyped package, if any */
    readonly definitelyTypedName?: string;

    /** Name of the corresponding untyped package (w.r.t. DefinitelyTyped) */
    readonly untypedName?: string;
}
