import { Packument } from '../types/packument';
import { RawPackument } from '../types/raw-packument';
import { normalizeRawLicense } from './normalize-raw-license';
import { normalizeRawRepository } from './normalize-raw-repository';

export function normalizeRawPackument({
    rawPackument,
}: {
    rawPackument: RawPackument;
}): Packument {
    const {
        _id: id,
        'dist-tags': distTags,
        time,
        license: rawLicense,
        repository: rawRepository,
    } = rawPackument;
    const license = normalizeRawLicense({ rawLicense });
    const gitRepository = normalizeRawRepository({ rawRepository });
    const versionsToTimestamps = Object.fromEntries(
        Object.entries(time).filter(([key]) => {
            return !['created', 'modified'].includes(key);
        })
    );

    return {
        ...rawPackument,
        id,
        distTags,
        versionsToTimestamps,
        license,
        gitRepository,
    };
}
