import urlJoin from 'proper-url-join';
import { fetchJSON } from './fetch-json';
import { PackageSearchResult } from './package-search-result';

export async function getPackageSuggestions({
    query,
    suggestionsAPI,
}: {
    query: string;
    suggestionsAPI: string;
}): Promise<PackageSearchResult[]> {
    const endpoint = '/search/suggestions';
    const url = urlJoin(suggestionsAPI, endpoint, { query: { q: query } });
    return fetchJSON(url);
}
