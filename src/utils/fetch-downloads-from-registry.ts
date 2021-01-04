import { npmRegistryDownloadsAPI } from '../data/registries';
import { fetchFromRegistry } from './fetch-from-registry';

export async function fetchDownloadsFromRegistry<T>({
    endpoint,
    registryDownloadsAPI = npmRegistryDownloadsAPI,
}: {
    endpoint: string;
    registryDownloadsAPI?: string;
}): Promise<T> {
    return fetchFromRegistry({
        endpoint,
        registry: registryDownloadsAPI,
        mirrors: [],
    });
}
