import validatePackageName from 'validate-npm-package-name';
import { InvalidPackageNameError } from './errors';
import { log } from './log';

export function assertValidPackageName({ name }: { name: string }): void {
    const { validForOldPackages, validForNewPackages } =
        validatePackageName(name);
    const valid = validForOldPackages || validForNewPackages;
    if (!valid) {
        log('assertValidPackageName: invalid package name: %O', { name });
        throw new InvalidPackageNameError(`invalid package name: '${name}'`);
    }
}
