import { Cache } from './cache';
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
import { getPackageSuggestions } from './get-package-suggestions';
import { getPackument, getRawPackument } from './get-packument';
import {
    getDailyRegistryDownloads,
    getRegistryDownloads,
} from './get-registry-downloads';
import { log } from './log';
import { PackageManifest, PackageManifestRaw } from './package-manifest';
import { PackageSearchResult } from './package-search-result';
import { Packument, PackumentRaw } from './packument';
import { queryAPI, queryRegistry } from './query';
import { QueryParameters } from './query-parameters';
import { RegistryMetadata } from './registry-metadata';
import { SearchOptions } from './search-options';
import { searchPackages } from './search-packages';
import { SearchResults } from './search-results';

/**
 * RegistryConfig lists the options available to create a {@link Registry}.
 *
 * @remarks
 * The properties of RegistryConfig are also properties of the {@link Registry}.
 */
export interface RegistryConfig {
    /** Registry's URL */
    readonly registry?: string;

    /** Registry mirrors' URLs */
    readonly mirrors?: string[];

    /** Registry's API URL */
    readonly api?: string;

    /** Registry's Suggestions API URL */
    readonly suggestionsAPI?: string;

    /** {@link Cache} for network requests */
    readonly cache?: Cache;
}

/**
 * Registry interface merges with the Registry class declaration
 * to provide the properties from {@link RegistryConfig} as required.
 */
export interface Registry extends Required<RegistryConfig> {}

/**
 * Registry represents an npm-like registry that can be queried for data.
 *
 * @see {@link https://github.com/npm/registry}
 */
export class Registry {
    /**
     * Create a new {@link Registry} instance.
     *
     * @param registry - the registry's URL
     * (default: `https://registry.npmjs.org`)
     *
     * @param mirrors - the registry mirrors' URLs
     * (default: `https://registry.npmjs.cf` and
     * `https://registry.yarnpkg.com`)
     *
     * @param api - the registry's API URL
     * (default: `https://api.npmjs.org`)
     *
     * @param suggestionsAPI - the registry's suggestions API URL
     * (default: `https://www.npmjs.com`)
     *
     * @param cache - the {@link Cache} used for network requests
     * (default: in-memory cache provided by `Map`)
     *
     * @see {@link RegistryConfig}
     */
    constructor({
        registry = 'https://registry.npmjs.org',
        mirrors = ['https://registry.npmjs.cf', 'https://registry.yarnpkg.com'],
        api = 'https://api.npmjs.org',
        suggestionsAPI = 'https://www.npmjs.com',
        cache = new Map(),
    }: RegistryConfig = {}) {
        Object.assign(this, { registry, mirrors, api, suggestionsAPI, cache });
        log('Registry: created new Registry: %O', { ...this });
    }

    /**
     * getMetadata returns the {@link RegistryMetadata}.
     */
    async getMetadata(): Promise<RegistryMetadata> {
        return getMetadata({ ...this });
    }

    /**
     * getPackageManifest returns a {@link PackageManifest} containing
     * the metadata associated to a package's version.
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
     * the raw metadata associated to a package's version.
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
     * getPackument returns a {@link Packument} containing
     * all the metadata for a package.
     *
     * @param name - the package's name
     */
    async getPackument(name: string): Promise<Packument> {
        return getPackument({ ...this, name });
    }

    /**
     * getRawPackument returns a {@link PackumentRaw}
     * containing all the raw metadata for a package.
     *
     * @param name - the package's name
     */
    async getRawPackument(name: string): Promise<PackumentRaw> {
        return getRawPackument({ ...this, name });
    }

    /**
     * getPackageDownloads returns a {@link PackageDownloads} containing
     * the number of downloads for a package in a given
     * {@link DownloadPeriod | time period}.
     *
     * @param name - the package's name
     * @param period - the time period to examine (default: `last-week`)
     */
    async getPackageDownloads(
        name: string,
        period: DownloadPeriod = 'last-week'
    ): Promise<PackageDownloads> {
        return getPackageDownloads({ ...this, name, period });
    }

    /**
     * getDailyPackageDownloads returns a {@link PackageDailyDownloads}
     * containing the number of downloads for a package
     * for each day in a given {@link DownloadPeriod | time period}.
     *
     * @param name - the package's name
     * @param period - the time period to examine (default: `last-week`)
     */
    async getDailyPackageDownloads(
        name: string,
        period: DownloadPeriod = 'last-week'
    ): Promise<PackageDailyDownloads> {
        return getDailyPackageDownloads({ ...this, name, period });
    }

    /**
     * getRegistryDownloads returns a {@link Downloads} containing
     * the number of downloads for all packages in a given
     * {@link DownloadPeriod | time period}.
     *
     * @param period - the time period to examine (default: `last-week`)
     */
    async getRegistryDownloads(
        period: DownloadPeriod = 'last-week'
    ): Promise<Downloads> {
        return getRegistryDownloads({ ...this, period });
    }

    /**
     * getDailyRegistryDownloads returns a {@link DailyDownloads}
     * containing the number of downloads for all packages
     * for each day in a given {@link DownloadPeriod | time period}.
     *
     * @param period - the time period to examine (default: `last-week`)
     */
    async getDailyRegistryDownloads(
        period: DownloadPeriod = 'last-week'
    ): Promise<DailyDownloads> {
        return getDailyRegistryDownloads({ ...this, period });
    }

    /**
     * getPackageSuggestions returns a list of {@link PackageSearchResult}
     * containing suggested packages that match the given query.
     *
     * @param query - the text query
     */
    async getPackageSuggestions(query: string): Promise<PackageSearchResult[]> {
        return getPackageSuggestions({ ...this, query });
    }

    /**
     * searchPackages returns the {@link SearchResults}
     * that describe the packages that match the given {@link SearchOptions}.
     *
     * @param searchOptions - the search options
     */
    async searchPackages(searchOptions: SearchOptions): Promise<SearchResults> {
        return searchPackages({ ...this, searchOptions });
    }

    /**
     * queryRegistry queries the {@link RegistryConfig.registry | registry}
     * or its {@link RegistryConfig.mirrors | mirrors} at the given endpoint
     * with the given {@link QueryParameters} and returns an object
     * parsed from JSON.
     *
     * @param endpoint - the endpoint to query
     * @param query - the query parameters (optional)
     */
    async queryRegistry<T>(
        endpoint: string,
        query?: QueryParameters
    ): Promise<T> {
        return queryRegistry({ ...this, endpoint, query });
    }

    /**
     * queryAPI queries the {@link RegistryConfig.api | registry's API}
     * at the given endpoint with the given {@link QueryParameters}
     * and returns an object parsed from JSON.
     *
     * @param endpoint - the endpoint to query
     * @param query - the query parameters (optional)
     */
    async queryAPI<T>(endpoint: string, query?: QueryParameters): Promise<T> {
        return queryAPI({ ...this, endpoint, query });
    }
}
