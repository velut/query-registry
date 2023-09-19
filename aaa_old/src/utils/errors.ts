import makeError, { BaseError } from 'make-error';

/**
 * `FetchError` represents an error that happened when fetching a URL.
 *
 * The `instanceof` operator can be used to check for this error.
 */
export class FetchError extends BaseError {
    constructor(
        /** URL originally fetched */
        readonly url: string,

        /** Response received */
        readonly response: Response
    ) {
        super(
            `fetch: request to ${url} failed with status ${response.statusText}`
        );
    }
}

/**
 * `InvalidPackageNameError` is thrown when the name of a package
 * is not valid according to the npm registry naming rules.
 *
 * The `instanceof` operator can be used to check for this error.
 *
 * @see {@link https://www.npmjs.com/package/validate-npm-package-name}
 */
export const InvalidPackageNameError = makeError('InvalidPackageNameError');

/**
 * `InvalidPackageVersionError` is thrown when a package's version does not exist.
 *
 * The `instanceof` operator can be used to check for this error.
 */
export const InvalidPackageVersionError = makeError(
    'InvalidPackageVersionError'
);
