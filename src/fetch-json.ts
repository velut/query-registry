import got from 'got';
import { log } from './log';

export async function fetchJSON<T>({ urls }: { urls: string[] }): Promise<T> {
    let error;

    for (const url of urls) {
        try {
            const data = (await got(url).json()) as T;
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
