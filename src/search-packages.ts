import { Cache } from './cache';
import { queryRegistry } from './query';
import { QueryParameters } from './query-parameters';
import { SearchOptions } from './registry-types/search-options';
import { SearchResults } from './registry-types/search-results';

export async function searchPackages({
    searchOptions,
    registry,
    mirrors,
    cache,
}: {
    searchOptions: SearchOptions;
    registry: string;
    mirrors: string[];
    cache: Cache;
}): Promise<SearchResults> {
    const endpoint = '/-/v1/search';
    const query = getQueryParameters({ searchOptions });
    return queryRegistry({ endpoint, query, registry, mirrors, cache });
}

function getQueryParameters({
    searchOptions,
}: {
    searchOptions: SearchOptions;
}): QueryParameters {
    return Object.fromEntries(
        Object.entries(searchOptions).filter(([, value]) => value !== undefined)
    ) as QueryParameters;
}
