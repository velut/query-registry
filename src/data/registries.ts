/**
 * npm registry
 *
 * @see {@link https://registry.npmjs.org}
 */
export const npmRegistry = 'https://registry.npmjs.org';

/**
 * npm registry mirror by Cloudflare
 *
 * @remarks
 * This registry has CORS enabled and can be used to retrieve
 * package manifests and packuments in the browser.
 *
 * @see {@link https://npmjs.cf}
 * @see {@link https://registry.npmjs.cf}
 */
export const cloudflareRegistry = 'https://registry.npmjs.cf';

/**
 * npm registry mirror by Yarn
 *
 * @see {@link https://registry.yarnpkg.com}
 */
export const yarnRegistry = 'https://registry.yarnpkg.com';

/**
 * Mirrors of the npm registry.
 *
 * @see {@link cloudflareRegistry}
 * @see {@link yarnRegistry}
 */
export const npmRegistryMirrors = [cloudflareRegistry, yarnRegistry];

/**
 * Downloads API for the npm registry
 *
 * @see {@link https://api.npmjs.org}
 */
export const npmRegistryDownloadsAPI = 'https://api.npmjs.org';
