import { SearchCriteria } from '../types/search-criteria';

export function normalizeRawSearchCriteria({
    rawSearchCriteria,
}: {
    rawSearchCriteria: SearchCriteria;
}): string {
    // Convert SearchCriteria to a URL query string
    return Object.entries(rawSearchCriteria)
        .filter(([, value]) => ['string', 'number'].includes(typeof value))
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
}
