import unfetch from 'isomorphic-unfetch';
import lru from 'tiny-lru';
import { FetchError } from './errors';
import { log } from './log';

const maxItems = 250;
const fiveMinutesTTL = 5 * 60 * 1000;
const cache = lru(maxItems, fiveMinutesTTL);

export async function fetch({
    url,
    cached = true,
}: {
    url: string;
    cached?: boolean;
}): Promise<any> {
    if (cached && cache.has(url)) {
        const cachedJSON = cache.get(url);
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
