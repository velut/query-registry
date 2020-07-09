import { DownloadPeriod } from './download-period';
import {
    DailyDownloads,
    Downloads,
    PackageDailyDownloads,
    PackageDownloads,
} from './downloads';
import { getMetadata } from './get-metadata';
import {
    getDailyPackageDownloads,
    getPackageDownloads,
} from './get-package-downloads';
import {
    getPackageManifest,
    getRawPackageManifest,
} from './get-package-manifest';
import { getPackument, getRawPackument } from './get-packument';
import {
    getDailyRegistryDownloads,
    getRegistryDownloads,
} from './get-registry-downloads';
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
        readonly mirrors: string[],

        /** Registry's API URL */
        readonly api: string
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
    async getPackageManifest(
        name: string,
        version: string = 'latest'
    ): Promise<PackageManifest> {
        return getPackageManifest({ ...this, name, version });
    }

    /**
     * getRawPackageManifest returns a {@link PackageManifestRaw} containing
     * raw metadata associated to a package's version.
     *
     * @param name - the package's name
     * @param version - the package's version (default: `latest`)
     */
    async getRawPackageManifest(
        name: string,
        version: string = 'latest'
    ): Promise<PackageManifestRaw> {
        return getRawPackageManifest({ ...this, name, version });
    }

    /**
     * getPackument returns a {@link Packument} containing package metadata.
     *
     * @param name - the package's name
     */
    async getPackument(name: string): Promise<Packument> {
        return getPackument({ ...this, name });
    }

    /**
     * getRawPackument returns a {@link PackumentRaw}
     * containing raw package metadata.
     *
     * @param name - the package's name
     */
    async getRawPackument(name: string): Promise<PackumentRaw> {
        return getRawPackument({ ...this, name });
    }

    /**
     * getPackageDownloads returns the number of downloads for a package
     * in a given time period.
     *
     * @param name - the package's name
     * @param period - the time period for which downloads should be counted
     */
    async getPackageDownloads(
        name: string,
        period: DownloadPeriod
    ): Promise<PackageDownloads> {
        return getPackageDownloads({ ...this, name, period });
    }

    /**
     * getDailyPackageDownloads returns the number of downloads for a package
     * for each day in a given time period.
     *
     * @param name - the package's name
     * @param period - the time period for which downloads should be counted
     */
    async getDailyPackageDownloads({
        name,
        period,
    }: {
        name: string;
        period: DownloadPeriod;
    }): Promise<PackageDailyDownloads> {
        return getDailyPackageDownloads({ ...this, name, period });
    }

    /**
     * getRegistryDownloads returns the number of downloads for all packages
     * in a given time period.
     *
     * @param period - the time period for which downloads should be counted
     */
    async getRegistryDownloads(period: DownloadPeriod): Promise<Downloads> {
        return getRegistryDownloads({ ...this, period });
    }

    /**
     * getDailyRegistryDownloads returns the number of downloads
     * for all packages for each day in a given time period.
     *
     * @param period - the time period for which downloads should be counted
     */
    async getDailyRegistryDownloads(
        period: DownloadPeriod
    ): Promise<DailyDownloads> {
        return getDailyRegistryDownloads({ ...this, period });
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
