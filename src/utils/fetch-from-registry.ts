import { npmRegistry, npmRegistryMirrors } from '../data/registries';
import { FetchError } from './errors';
import { fetch } from './fetch';
import { log } from './log';

export async function fetchFromRegistry<T>({
    endpoint,
    query,
    registry = npmRegistry,
    mirrors = npmRegistryMirrors,
    cached,
}: {
    endpoint: string;
    query?: string;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<T> {
    const urls = [registry, ...mirrors].map((host) => {
        const url = new URL(endpoint, host);
        url.search = query ?? '';
        return url.href;
    });

    let lastError: FetchError | undefined;
    for (const url of urls) {
        try {
            const json = await fetch({ url, cached });
            return json as T;
        } catch (err) {
            // Keep last fetch error
            lastError = err as any;
        }
    }

    log(
        'fetchFromRegistry: cannot retrieve data from registry or mirrors: %O',
        {
            endpoint,
            query,
            registry,
            mirrors,
            lastError,
        }
    );
    throw lastError;
}
