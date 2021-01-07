import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import { fetchFromRegistry } from '../../src/utils/fetch-from-registry';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('fetchFromRegistry', () => {
    setupPolly({
        adapters: ['node-http'],
        persister: 'fs',
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
            endpoint: '/',
            registry: '',
            mirrors: ['https://registry.npmjs.cf'],
        });
        expect(json).toHaveProperty('db_name', 'registry');
    });

    it('throws if data cannot be retrieved', async () => {
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
