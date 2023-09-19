import { AbbreviatedPackument } from '../types/abbreviated-packument';
import { RawAbbreviatedPackument } from '../types/raw-abbreviated-packument';

export function normalizeRawAbbreviatedPackument({
    rawAbbreviatedPackument,
}: {
    rawAbbreviatedPackument: RawAbbreviatedPackument;
}): AbbreviatedPackument {
    const {
        'dist-tags': distTags,
        name: id,
        modified: modifiedAt,
    } = rawAbbreviatedPackument;
    return {
        ...rawAbbreviatedPackument,
        id,
        distTags,
        modifiedAt,
    };
}
