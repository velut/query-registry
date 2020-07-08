import { assertValidPackageName } from './assert-valid-package-name';
import { normalizeRepository } from './normalize-repository';
import { Packument, PackumentRaw } from './packument';
import { queryRegistry } from './query-registry';

export async function getPackument({
    name,
    registry,
    mirrors,
}: {
    name: string;
    registry: string;
    mirrors: string[];
}): Promise<Packument> {
    const rawPackument = await getRawPackument({ name, registry, mirrors });

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
}: {
    name: string;
    registry: string;
    mirrors: string[];
}): Promise<PackumentRaw> {
    assertValidPackageName({ name });

    const endpoint = `/${name}`;
    return queryRegistry({ endpoint, registry, mirrors });
}
