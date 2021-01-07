import urlJoin from 'proper-url-join';
import { npmRegistry, npmRegistryMirrors } from '../data/registries';
import { FetchError } from './errors';
import { fetch } from './fetch';
import { log } from './log';
import { QueryParameters } from './query-parameters';

export async function fetchFromRegistry<T>({
    endpoint,
    query,
    registry = npmRegistry,
    mirrors = npmRegistryMirrors,
    cached,
}: {
    endpoint: string;
    query?: QueryParameters;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<T> {
    let firstError: FetchError | undefined;
    const urls = [registry, ...mirrors].map((host) =>
        urlJoin(host, endpoint, { query })
    );

    for (const url of urls) {
        try {
            const json = await fetch({ url, cached });
            return json as T;
        } catch (err) {
            // Do not search for a resource on mirrors
            // if it's not available on the main registry
            if (err instanceof FetchError && err.response.status === 404) {
                log('fetchFromRegistry: resource unavailable: %O', {
                    endpoint,
                    query,
                    registry,
                    mirrors,
                });
                throw err;
            }

            firstError = firstError ?? err;
        }
    }

    log(
        'fetchFromRegistry: cannot retrieve data from registry or mirrors: %O',
        {
            endpoint,
            query,
            registry,
            mirrors,
        }
    );
    throw firstError;
}
