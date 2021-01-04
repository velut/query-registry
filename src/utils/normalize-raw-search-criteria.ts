import { SearchCriteria } from '../types/search-criteria';
import { QueryParameters } from './query-parameters';

export function normalizeRawSearchCriteria({
    rawSearchCriteria,
}: {
    rawSearchCriteria: SearchCriteria;
}): QueryParameters {
    return Object.fromEntries(
        Object.entries(rawSearchCriteria).filter(
            ([, value]) => value !== undefined
        )
    );
}
