import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import {
    FetchError,
    getPackageDownloads,
    InvalidPackageNameError,
} from '../../src';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('getPackageDownloads', () => {
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

    it('returns the weekly downloads for `short-time-ago`', async () => {
        expect.assertions(7);

        const downloads = await getPackageDownloads({ name: 'short-time-ago' });
        expect(downloads).toHaveProperty('package', 'short-time-ago');
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('returns the monthly downloads for `short-time-ago`', async () => {
        expect.assertions(7);

        const downloads = await getPackageDownloads({
            name: 'short-time-ago',
            period: 'last-month',
        });
        expect(downloads).toHaveProperty('package', 'short-time-ago');
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('returns the downloads on a given day for `short-time-ago`', async () => {
        expect.assertions(7);

        const downloads = await getPackageDownloads({
            name: 'short-time-ago',
            period: new Date('2021-01-01'),
        });
        expect(downloads).toHaveProperty('package', 'short-time-ago');
        expect(downloads).toHaveProperty('downloads');
        expect(typeof downloads.downloads).toEqual('number');
        expect(downloads).toHaveProperty('start');
        expect(downloads).toHaveProperty('end');
        expect(typeof downloads.start).toEqual('string');
        expect(typeof downloads.end).toEqual('string');
    });

    it('returns the downloads for a given time period for `short-time-ago`', async () => {
        expect.assertions(7);

        const downloads = await getPackageDownloads({
            name: 'short-time-ago',
            period: {
                start: new Date('2021-01-01'),
                end: new Date('2021-01-02'),
            },
        });
        expect(downloads).toHaveProperty('package', 'short-time-ago');
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
            await getPackageDownloads({
                name: 'short-time-ago',
                registryDownloadsAPI: 'https://example.com',
            });
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    it('throws on invalid package names', async () => {
        expect.assertions(2);

        try {
            await getPackageDownloads({ name: '' });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof InvalidPackageNameError).toBeTruthy();
        }
    });

    it('throws on non-existing packages', async () => {
        expect.assertions(2);

        try {
            await getPackageDownloads({
                name: '@velut/this-package-does-not-exist',
            });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof FetchError).toBeTruthy();
        }
    });
});
