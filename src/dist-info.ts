/**
 * DistInfo contains information about the package
 * as distributed through the registry.
 */
export interface DistInfo {
    /** Tarball URL */
    readonly tarball: string;

    /** SHA1 sum of the tarball */
    readonly shasum: string;

    /** SHA512 sum of the tarball */
    readonly integrity?: string;

    /** Number of files in the package */
    readonly fileCount?: number;

    /** Total package size in bytes */
    readonly unpackedSize?: number;

    /** npm PGP signature */
    readonly 'npm-signature'?: string;
}
