import urlJoin from 'proper-url-join';
import { fetchJSON } from './fetch-json';
import { QueryParameters } from './query-parameters';

export function queryAPI<T>({
    endpoint,
    query,
    api,
}: {
    endpoint: string;
    query?: QueryParameters;
    api: string;
}): Promise<T> {
    const url = urlJoin(api, endpoint, { query });
    return fetchJSON(url);
}
