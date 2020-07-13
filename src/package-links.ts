/**
 * PackageLinks contains a collection of useful links.
 */
export interface PackageLinks {
    readonly npm?: string;
    readonly homepage?: string;
    readonly repository?: string;
    readonly bugs?: string;
    readonly [key: string]: string | undefined;
}
