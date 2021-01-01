import urlJoin from 'proper-url-join';
import { npmRegistry, npmRegistryMirrors } from '../data/registries';
import { FetchError } from './errors';
import { fetch } from './fetch';
import { log } from './log';

export async function fetchFromRegistry<T>({
    registry = npmRegistry,
    mirrors = npmRegistryMirrors,
    endpoint,
}: {
    registry?: string;
    mirrors?: readonly string[];
    endpoint: string;
}): Promise<T> {
    let firstError: FetchError | undefined;
    const urls = [registry, ...mirrors].map((host) => urlJoin(host, endpoint));

    for (const url of urls) {
        try {
            const json = await fetch({ url });
            return json as T;
        } catch (err) {
            firstError = firstError ?? err;
        }
    }

    log('fetchFromRegistry: cannot retrieve data from registry: %O', {
        registry,
        mirrors,
        endpoint,
    });
    throw firstError;
}
