import { PackageManifest } from '../types/package-manifest';
import { RawPackageManifest } from '../types/raw-package-manifest';
import { RawPackument } from '../types/raw-packument';
import { getDefinitelyTypedName } from './get-definitely-typed-name';
import { getUntypedName } from './get-untyped-name';
import { normalizeRawLicense } from './normalize-raw-license';
import { normalizeRawRepository } from './normalize-raw-repository';

export async function normalizeRawPackageManifest({
    rawPackageManifest,
    rawPackument,
    registry,
    mirrors,
    cached,
}: {
    rawPackageManifest: RawPackageManifest;
    rawPackument: RawPackument;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<PackageManifest> {
    const {
        _id: id,
        name,
        version: versionNumber,
        license: rawLicense,
        repository: rawRepository,
        _npmUser: publisher,
    } = rawPackageManifest;
    const createdAt = rawPackument.time[versionNumber]!;
    const license = normalizeRawLicense({ rawLicense });
    const gitRepository = normalizeRawRepository({ rawRepository });
    const definitelyTypedName = await getDefinitelyTypedName({
        rawPackageManifest,
        registry,
        mirrors,
        cached,
    });
    const untypedName = getUntypedName({ name });

    return {
        ...rawPackageManifest,
        id,
        createdAt,
        publisher,
        license,
        gitRepository,
        definitelyTypedName,
        untypedName,
    };
}
