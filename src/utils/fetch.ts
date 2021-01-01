import unfetch from 'isomorphic-unfetch';
import { FetchError } from './errors';
import { log } from './log';

export async function fetch({ url }: { url: string }): Promise<any> {
    const response = await unfetch(url);
    if (!response.ok) {
        log('fetch: request failed: %O', { url, response });
        throw new FetchError(url, response);
    }

    const json = await response.json();
    return json;
}
