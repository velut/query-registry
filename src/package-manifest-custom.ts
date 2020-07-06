/**
 * PackageManifestCustom contains custom attributes
 * added by this library to package manifests.
 */
export interface PackageManifestCustom {
    /** Publishing timestamp */
    readonly createdAt: string;

    /** Name of the corresponding DefinitelyTyped package */
    readonly definitelyTypedName?: string;

    /** Name of the corresponding untyped package (w.r.t. DefinitelyTyped) */
    readonly untypedName?: string;
}
