import urlJoin from 'proper-url-join';
import { Cache } from './cache';
import { fetchJSON } from './fetch-json';
import { PackageSearchResult } from './registry-types/package-search-result';

export async function getPackageSuggestions({
    query,
    suggestionsAPI,
    cache,
}: {
    query: string;
    suggestionsAPI: string;
    cache: Cache;
}): Promise<PackageSearchResult[]> {
    const endpoint = '/search/suggestions';
    const urls = [urlJoin(suggestionsAPI, endpoint, { query: { q: query } })];
    return fetchJSON({ urls, cache });
}
