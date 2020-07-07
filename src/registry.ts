import urlJoin from 'proper-url-join';
import { assertValidPackageName } from './assert-valid-package-name';
import { fetchJSON } from './fetch-json';
import { Packument, PackumentRaw } from './packument';
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
        private readonly registry: string,
        private readonly mirrors: string[]
    ) {}

    /**
     * getMetadata returns the {@link RegistryMetadata}.
     */
    async getMetadata(): Promise<RegistryMetadata> {
        const endpoint = '/';
        return this.queryRegistry({ endpoint });
    }

    /**
     * getPackument returns the {@link Packument} containing package metadata.
     *
     * @param name - the package's name
     */
    async getPackument({ name }: { name: string }): Promise<Packument> {
        const rawPackument = await this.getRawPackument({ name });
        const {
            _id: id,
            'dist-tags': distTags,
            time: { created: _, modified: __, ...versionsTimestamps },
        } = rawPackument;
        return { ...rawPackument, id, distTags, versionsTimestamps };
    }

    /**
     * getRawPackument returns the {@link PackumentRaw}
     * containing raw package metadata.
     *
     * @param name - the package's name
     */
    async getRawPackument({ name }: { name: string }): Promise<PackumentRaw> {
        assertValidPackageName({ name });
        const endpoint = `/${name}`;
        return this.queryRegistry({ endpoint });
    }

    /**
     * queryRegistry queries the registry at the given endpoint.
     *
     * @param endpoint - the endpoint to query
     */
    async queryRegistry<T>({ endpoint }: { endpoint: string }): Promise<T> {
        const { registry, mirrors } = this;
        const urls = [registry, ...mirrors].map((host) =>
            urlJoin(host, endpoint)
        );
        return fetchJSON({ urls });
    }
}
