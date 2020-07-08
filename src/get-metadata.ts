import { queryRegistry } from './query-registry';
import { RegistryMetadata } from './registry-metadata';

export async function getMetadata({
    registry,
    mirrors,
}: {
    registry: string;
    mirrors: string[];
}): Promise<RegistryMetadata> {
    const endpoint = '/';
    return queryRegistry({ endpoint, registry, mirrors });
}
