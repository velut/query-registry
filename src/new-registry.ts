import { log } from './log';
import { Registry } from './registry';

/**
 * RegistryOptions lists the options to create a registry.
 */
export interface RegistryOptions {
    /** Registry's URL */
    readonly registry?: string;

    /** Registry mirrors' URLs */
    readonly mirrors?: string[];

    /** Registry's API URL */
    readonly api?: string;

    /** Search suggestions API URL */
    readonly suggestionsAPI?: string;
}

/**
 * newRegistry returns a new {@link Registry} instance
 * created using to the given {@link RegistryOptions} or the default ones.
 *
 * @param url - the registry's URL (default: `https://registry.npmjs.org`)
 * @param mirrors - the registry mirrors' URLs (default: `https://registry.npmjs.cf` and `https://registry.yarnpkg.com`)
 * @param api - the registry's API URL (default: `https://api.npmjs.org`)
 * @param suggestionsAPI - the registry's suggestions API URL (default: `https://www.npmjs.com/search/suggestions`)
 */
export function newRegistry({
    registry = 'https://registry.npmjs.org',
    mirrors = ['https://registry.npmjs.cf', 'https://registry.yarnpkg.com'],
    api = 'https://api.npmjs.org',
    suggestionsAPI = 'https://www.npmjs.com/search/suggestions',
}: RegistryOptions): Registry {
    log('creating new Registry with options: %O', {
        registry,
        mirrors,
        api,
        suggestionsAPI,
    });
    return new Registry(registry, mirrors, api);
}
