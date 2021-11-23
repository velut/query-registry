/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import { FetchError } from '../../src/utils/errors';
import { fetchFromRegistry } from '../../src/utils/fetch-from-registry';

describe('fetchFromRegistry', () => {
    setupPolly({
        adapters: [NodeHttpAdapter],
        persister: FSPersister,
        persisterOptions: {
            fs: {
                recordingsDir: path.resolve(__dirname, '../../__recordings__'),
            },
        },
        recordFailedRequests: true,
    });

    it('fetches from mirrors if the main registry is not available', async () => {
        expect.assertions(1);

        const json = await fetchFromRegistry({
            endpoint: '/short-time-ago',
            registry: 'https://example.com',
            mirrors: ['https://registry.npmjs.cf'],
        });
        expect(json).toHaveProperty('_id', 'short-time-ago');
    });

    it('throws if data cannot be retrieved', async () => {
        expect.assertions(2);

        try {
            await fetchFromRegistry({
                endpoint: '/short-time-ago',
                registry: 'https://example.com',
                mirrors: [],
            });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof FetchError).toBeTruthy();
        }
    });

    it('throws if registry URLs are invalid', async () => {
        expect.assertions(1);

        try {
            await fetchFromRegistry({
                endpoint: '/',
                registry: '',
                mirrors: [''],
            });
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});
