import unfetch from 'isomorphic-unfetch';
import { cache } from './cache';
import { FetchError } from './errors';
import { log } from './log';

export async function fetch({
    url,
    cached = true,
}: {
    url: string;
    cached?: boolean;
}): Promise<any> {
    const cachedJSON = cache.get(url);
    if (cached && cachedJSON) {
        log('fetch: returning cached response: %O', { url, cachedJSON });
        return cachedJSON;
    }

    const response = await unfetch(url);
    if (!response.ok) {
        log('fetch: request failed: %O', {
            url,
            status: response.statusText,
            response,
        });
        throw new FetchError(url, response);
    }

    const json = await response.json();
    if (cached) {
        cache.set(url, json);
    }

    log('fetch: returning fresh response: %O', { url, json });
    return json;
}
