import { QueryParameters } from './query-parameters';
import { queryRegistry } from './query-registry';
import { SearchOptions } from './search-options';
import { SearchResults } from './search-results';

export async function searchPackages({
    searchOptions,
    registry,
    mirrors,
}: {
    searchOptions: SearchOptions;
    registry: string;
    mirrors: string[];
}): Promise<SearchResults> {
    const endpoint = '/-/v1/search';
    const query = getQueryParameters({ searchOptions });
    return queryRegistry({ endpoint, query, registry, mirrors });
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
