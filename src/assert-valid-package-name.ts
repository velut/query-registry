import validatePackageName from 'validate-npm-package-name';
import { log } from './log';

export function assertValidPackageName({ name }: { name: string }): void {
    const valid = validatePackageName(name).validForNewPackages;
    if (!valid) {
        log('assertValidPackageName: invalid package name: %s', name);
        throw new Error(`invalid package name: ${name}`);
    }
}
