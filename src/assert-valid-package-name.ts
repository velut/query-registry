import validatePackageName from 'validate-npm-package-name';
import { InvalidPackageNameError } from './errors';
import { log } from './log';

export function assertValidPackageName({ name }: { name: string }): void {
    const valid = validatePackageName(name).validForNewPackages;
    if (!valid) {
        log('assertValidPackageName: invalid package name: %s', name);
        throw new InvalidPackageNameError(`invalid package name: ${name}`);
    }
}
