import makeError from 'make-error';

/**
 * InvalidPackageNameError is thrown when a package's name is not valid
 * according to the npm registry naming rules for newer package names.
 *
 * The `instanceof` operator can be used to check for this error.
 *
 * @see {@link https://www.npmjs.com/package/validate-npm-package-name}
 */
export const InvalidPackageNameError = makeError('InvalidPackageNameError');

/**
 * InvalidPackageVersionError is thrown when a package's version does not exist.
 *
 * The `instanceof` operator can be used to check for this error.
 */
export const InvalidPackageVersionError = makeError(
    'InvalidPackageVersionError'
);
