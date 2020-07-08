import { getMetadata } from './get-metadata';
import {
    getPackageManifest,
    getRawPackageManifest,
} from './get-package-manifest';
import { getPackument, getRawPackument } from './get-packument';
import { PackageManifest, PackageManifestRaw } from './package-manifest';
import { Packument, PackumentRaw } from './packument';
import { queryRegistry } from './query-registry';
import { RegistryMetadata } from './registry-metadata';

/**
 * Registry represents an npm-like registry that can be queried for data.
 *
 * @remarks
 * To create a new Registry instance, prefer using {@link newRegistry}.
 */
export class Registry {
    /**
     * Prefer using {@link newRegistry} instead of constructor.
     *
     * @internal
     */
    constructor(
        /** Registry's URL */
        readonly registry: string,

        /** Registry mirrors' URLs */
        readonly mirrors: string[]
    ) {}

    /**
     * getMetadata returns the {@link RegistryMetadata}.
     */
    async getMetadata(): Promise<RegistryMetadata> {
        return getMetadata({ ...this });
    }

    /**
     * getPackageManifest returns a {@link PackageManifest} containing
     * metadata associated to a package's version.
     *
     * @param name - the package's name
     * @param version - the package's version (default: `latest`)
     */
    async getPackageManifest({
        name,
        version = 'latest',
    }: {
        name: string;
        version?: string;
    }): Promise<PackageManifest> {
        return getPackageManifest({ ...this, name, version });
    }

    /**
     * getRawPackageManifest returns a {@link PackageManifestRaw} containing
     * raw metadata associated to a package's version.
     *
     * @param name - the package's name
     * @param version - the package's version (default: `latest`)
     */
    async getRawPackageManifest({
        name,
        version = 'latest',
    }: {
        name: string;
        version?: string;
    }): Promise<PackageManifestRaw> {
        return getRawPackageManifest({ ...this, name, version });
    }

    /**
     * getPackument returns a {@link Packument} containing package metadata.
     *
     * @param name - the package's name
     */
    async getPackument({ name }: { name: string }): Promise<Packument> {
        return getPackument({ ...this, name });
    }

    /**
     * getRawPackument returns a {@link PackumentRaw}
     * containing raw package metadata.
     *
     * @param name - the package's name
     */
    async getRawPackument({ name }: { name: string }): Promise<PackumentRaw> {
        return getRawPackument({ ...this, name });
    }

    /**
     * queryRegistry queries the registry at the given endpoint.
     *
     * @param endpoint - the endpoint to query
     */
    async queryRegistry<T>({ endpoint }: { endpoint: string }): Promise<T> {
        return queryRegistry({ ...this, endpoint });
    }
}
