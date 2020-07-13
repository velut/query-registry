import got from 'got';
import { Cache } from './cache';
import { log } from './log';

const headers = {
    'user-agent':
        'query-registry (https://github.com/velut/node-query-registry)',
};

export async function fetchJSON<T>({
    urls,
    cache,
}: {
    urls: string[];
    cache: Cache;
}): Promise<T> {
    let error;

    for (const url of urls) {
        try {
            const data = (await got(url, { headers, cache }).json()) as T;
            log('fetchJSON: got data: %O', { url, data });
            return data;
        } catch (err) {
            // Keep first error to throw later
            error = error ?? err;

            // Log current error
            log('fetchJSON: got error: %O', { url, error: err });
        }
    }

    log('fetchJSON: cannot retrieve data from registry or mirrors');
    throw error;
}
