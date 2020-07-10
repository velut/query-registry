import {
    fromDefinitelyTypedName,
    toDefinitelyTypedName,
} from './definitely-typed-name';
import { getPackument } from './get-packument';
import { log } from './log';
import { normalizeRepository } from './normalize-repository';
import { PackageManifest, PackageManifestRaw } from './package-manifest';
import { Packument } from './packument';

export async function getPackageManifest({
    name,
    version,
    registry,
    mirrors,
}: {
    name: string;
    version: string;
    registry: string;
    mirrors: string[];
}): Promise<PackageManifest> {
    const packument = await getPackument({
        name,
        registry,
        mirrors,
    });
    const rawManifest = extractPackageManifest({ packument, version });

    const {
        repository: rawRepository,
        _id: id,
        version: versionNumber,
        _npmUser: publisher,
    } = rawManifest;

    const repository = normalizeRepository({ rawRepository });

    const { versionsTimestamps } = packument;
    const createdAt = versionsTimestamps[versionNumber];

    const definitelyTypedName = await getDefinitelyTypedName({
        rawManifest,
        registry,
        mirrors,
    });
    const untypedName = fromDefinitelyTypedName({ name: rawManifest.name });

    return {
        ...rawManifest,
        repository,
        id,
        createdAt,
        publisher,
        definitelyTypedName,
        untypedName,
    };
}

async function getDefinitelyTypedName({
    rawManifest,
    registry,
    mirrors,
}: {
    rawManifest: PackageManifestRaw;
    registry: string;
    mirrors: string[];
}): Promise<string | undefined> {
    const { name, types, typings } = rawManifest;
    const definitelyTypedName = toDefinitelyTypedName({ name });
    const alreadyTyped = !!types || !!typings || name === definitelyTypedName;
    if (alreadyTyped) {
        return undefined;
    }

    let ok = false;
    try {
        const { deprecated } = await getRawPackageManifest({
            name: definitelyTypedName,
            version: 'latest',
            registry,
            mirrors,
        });
        ok = deprecated === undefined;
    } catch {}
    return ok ? definitelyTypedName : undefined;
}

export async function getRawPackageManifest({
    name,
    version,
    registry,
    mirrors,
}: {
    name: string;
    version: string;
    registry: string;
    mirrors: string[];
}): Promise<PackageManifestRaw> {
    const packument = await getPackument({
        name,
        registry,
        mirrors,
    });
    return extractPackageManifest({ packument, version });
}

function extractPackageManifest({
    packument,
    version,
}: {
    packument: Packument;
    version: string;
}): PackageManifestRaw {
    const { name, distTags, versions } = packument;
    const versionNumber = distTags[version] ?? version;
    const manifest = versions[versionNumber] as PackageManifestRaw | undefined;
    if (!manifest) {
        log('extractPackageManifest: invalid package version: %O', {
            name,
            version,
        });
        throw new Error(
            `invalid package version: (name: ${name}, version: ${version})`
        );
    }

    return manifest;
}
