import unfetch from 'isomorphic-unfetch';
import lru from 'tiny-lru';
import { FetchError } from './errors';
import { log } from './log';

const maxItems = 250;
const fiveMinutesTTL = 5 * 60 * 1000;
const cache = lru(maxItems, fiveMinutesTTL);

export async function fetch({
    url,
    headers,
    cached = true,
}: {
    url: string;
    headers?: Record<string, string>;
    cached?: boolean;
}): Promise<any> {
    const cachedJSON = cache.get(url);
    if (cached && cachedJSON) {
        log('fetch: returning cached response: %O', { url, cachedJSON });
        return cachedJSON;
    }

    const response = await unfetch(url, { headers });
    if (!response.ok) {
        log('fetch: request failed: %O', {
            url,
            headers,
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
