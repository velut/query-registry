import { BaseError } from 'make-error';

/**
 * FetchError represents an error that happened when fetching a URL.
 */
export class FetchError extends BaseError {
    constructor(
        /** URL originally fetched */
        readonly url: string,

        /** Response received */
        readonly response: Response
    ) {
        super(`fetch: request failed with status: ${response.statusText}`);
    }
}
