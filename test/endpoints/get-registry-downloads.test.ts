import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import { getRegistryDownloads } from '../../src';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('getRegistryDownloads', () => {
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

    it('returns the weekly downloads for the npm registry', async () => {
        expect.assertions(6);

        const downloads = await getRegistryDownloads();
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('returns the monthly downloads for the npm registry', async () => {
        expect.assertions(6);

        const downloads = await getRegistryDownloads({
            period: 'last-month',
        });
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('returns the downloads on a given day for the npm registry', async () => {
        expect.assertions(6);

        const downloads = await getRegistryDownloads({
            period: new Date('2021-01-01'),
        });
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('returns the downloads for a given time period for the npm registry', async () => {
        expect.assertions(6);

        const downloads = await getRegistryDownloads({
            period: {
                start: new Date('2021-01-01'),
                end: new Date('2021-01-02'),
            },
        });
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('supports a custom registry downloads API', async () => {
        expect.assertions(1);

        try {
            await getRegistryDownloads({
                registryDownloadsAPI: 'https://example.com',
            });
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});
