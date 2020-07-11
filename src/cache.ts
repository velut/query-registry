import * as CacheableRequest from 'cacheable-request';

/**
 * Cache used for network requests.
 *
 * @see {@link https://github.com/sindresorhus/got#cache-1}
 * @see {@link https://github.com/lukechilds/cacheable-request}
 * @see {@link https://github.com/lukechilds/keyv}
 */
export type Cache = string | CacheableRequest.StorageAdapter | false;
