import { RawPackageManifest } from '../types/raw-package-manifest';
import { RawPackument } from '../types/raw-packument';
import { InvalidPackageVersionError } from './errors';
import { log } from './log';

export function extractRawPackageManifest({
    rawPackument,
    version = 'latest',
}: {
    rawPackument: RawPackument;
    version?: string;
}): RawPackageManifest {
    const { name, 'dist-tags': distTags, versions } = rawPackument;
    const versionNumber = distTags[version] ?? version;
    const manifest = versions[versionNumber];
    if (!manifest) {
        log('getPackageManifest: invalid package version: %O', {
            name,
            version,
        });
        throw new InvalidPackageVersionError(
            `invalid package version: '${name}@${version}'`
        );
    }

    return manifest;
}
