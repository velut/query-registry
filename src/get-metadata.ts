import { Cache } from './cache';
import { queryRegistry } from './query-registry';
import { RegistryMetadata } from './registry-metadata';

export async function getMetadata({
    registry,
    mirrors,
    cache,
}: {
    registry: string;
    mirrors: string[];
    cache: Cache;
}): Promise<RegistryMetadata> {
    const endpoint = '/';
    return queryRegistry({ endpoint, registry, mirrors, cache });
}
