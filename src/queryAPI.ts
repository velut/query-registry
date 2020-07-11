import urlJoin from 'proper-url-join';
import { Cache } from './cache';
import { fetchJSON } from './fetch-json';
import { QueryParameters } from './query-parameters';

export function queryAPI<T>({
    endpoint,
    query,
    api,
    cache,
}: {
    endpoint: string;
    query?: QueryParameters;
    api: string;
    cache: Cache;
}): Promise<T> {
    const urls = [urlJoin(api, endpoint, { query })];
    return fetchJSON({ urls, cache });
}
