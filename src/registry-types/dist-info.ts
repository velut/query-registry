/**
 * `DistInfo` contains data describing the distributed package.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#dist}
 */
export interface DistInfo {
    /** Tarball URL */
    readonly tarball: string;

    /** SHA1 sum of the tarball */
    readonly shasum: string;

    /** Usually, SHA512 sum of the tarball preceded by `sha512-` */
    readonly integrity?: string;

    /** Number of files in the tarball */
    readonly fileCount?: number;

    /** Total size in bytes of the unpacked files in the tarball */
    readonly unpackedSize?: number;

    /** npm PGP signature */
    readonly 'npm-signature'?: string;
}
