import { assertValidPackageName } from './assert-valid-package-name';
import { Cache } from './cache';
import { normalizeRepository } from './normalize-repository';
import { queryRegistry } from './query';
import { Packument, PackumentRaw } from './registry-types/packument';

export async function getPackument({
    name,
    registry,
    mirrors,
    cache,
}: {
    name: string;
    registry: string;
    mirrors: string[];
    cache: Cache;
}): Promise<Packument> {
    const rawPackument = await getRawPackument({
        name,
        registry,
        mirrors,
        cache,
    });

    const {
        repository: rawRepository,
        _id: id,
        'dist-tags': distTags,
        time: { created: _, modified: __, ...versionsTimestamps },
    } = rawPackument;

    const repository = normalizeRepository({ rawRepository });

    return { ...rawPackument, repository, id, distTags, versionsTimestamps };
}

export async function getRawPackument({
    name,
    registry,
    mirrors,
    cache,
}: {
    name: string;
    registry: string;
    mirrors: string[];
    cache: Cache;
}): Promise<PackumentRaw> {
    assertValidPackageName({ name });

    const endpoint = `/${name}`;
    return queryRegistry({ endpoint, registry, mirrors, cache });
}
