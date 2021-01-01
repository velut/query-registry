import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import {
    FetchError,
    getRawPackument,
    InvalidPackageNameError,
} from '../../src';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('getRawPackument', () => {
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

    it('returns the packument for `short-time-ago`', async () => {
        expect.assertions(6);

        const packument = await getRawPackument({ name: 'short-time-ago' });
        expect(packument).toMatchObject({
            _id: 'short-time-ago',
            name: 'short-time-ago',
        });
        expect(packument).toHaveProperty('_rev');
        expect(packument).toHaveProperty('dist-tags');
        expect(packument).toHaveProperty('dist-tags.latest');
        expect(packument).toHaveProperty('time');
        expect(packument).toHaveProperty('versions');
    });

    it('throws on invalid package names', async () => {
        expect.assertions(2);

        try {
            await getRawPackument({ name: '' });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof InvalidPackageNameError).toBeTruthy();
        }
    });

    it('throws on non-existing packages', async () => {
        expect.assertions(2);

        try {
            await getRawPackument({
                name: '@velut/this-package-does-not-exist',
            });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof FetchError).toBeTruthy();
        }
    });
});
