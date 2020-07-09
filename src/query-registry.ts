import urlJoin from 'proper-url-join';
import { fetchJSON } from './fetch-json';

export function queryRegistry<T>({
    endpoint,
    registry,
    mirrors,
}: {
    endpoint: string;
    registry: string;
    mirrors: string[];
}): Promise<T> {
    const urls = [registry, ...mirrors].map((host) => urlJoin(host, endpoint));
    return fetchJSON(...urls);
}
