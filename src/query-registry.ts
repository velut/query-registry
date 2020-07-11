import urlJoin from 'proper-url-join';
import { fetchJSON } from './fetch-json';
import { QueryParameters } from './query-parameters';

export function queryRegistry<T>({
    endpoint,
    query,
    registry,
    mirrors,
}: {
    endpoint: string;
    query?: QueryParameters;
    registry: string;
    mirrors: string[];
}): Promise<T> {
    const urls = [registry, ...mirrors].map((host) =>
        urlJoin(host, endpoint, { query })
    );
    return fetchJSON(...urls);
}
