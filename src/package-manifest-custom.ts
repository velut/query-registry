import { Person } from './person';

/**
 * PackageManifestCustom contains custom attributes
 * added by this library to package manifests.
 */
export interface PackageManifestCustom {
    /** Package version ID (e.g., `foo@1.0.0`, `@foo/bar@1.0.0`) */
    readonly id: string;

    /** Publishing timestamp */
    readonly createdAt: string;

    /** User who published this package version */
    readonly publisher: Person;

    /** Name of the corresponding DefinitelyTyped package */
    readonly definitelyTypedName?: string;

    /** Name of the corresponding untyped package (w.r.t. DefinitelyTyped) */
    readonly untypedName?: string;
}
