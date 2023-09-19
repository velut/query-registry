/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import { searchPackages } from '../../src';

describe('searchPackages', () => {
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

    it('returns the results for an empty query', async () => {
        expect.assertions(3);

        const results = await searchPackages({ query: {} });
        expect(results).toMatchObject({
            objects: [],
            total: 0,
        });
        expect(results).toHaveProperty('time');
        expect(typeof results.time).toEqual('string');
    });

    it('returns the results for text query `short-time-ago`', async () => {
        expect.assertions(6);

        const results = await searchPackages({
            query: { text: 'short-time-ago' },
        });
        expect(results).toHaveProperty('objects');
        expect(results.objects[0]!.package.name).toEqual('short-time-ago');
        expect(results).toHaveProperty('total');
        expect(typeof results.total).toEqual('number');
        expect(results).toHaveProperty('time');
        expect(typeof results.time).toEqual('string');
    });
});
