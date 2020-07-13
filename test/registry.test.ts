import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import { Polly } from '@pollyjs/core';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import { Registry, RegistryConfig } from '../src';
import { expectRejection } from './test-helpers';

Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe('Registry', () => {
    setupPolly({
        adapters: ['node-http'],
        persister: 'fs',
        persisterOptions: {
            fs: {
                recordingsDir: path.resolve(__dirname, '../__recordings__'),
            },
        },
        recordFailedRequests: true,
    });

    describe('constructor', () => {
        it('creates a new Registry with the default configuration', () => {
            expect(new Registry()).toBeDefined();
            expect(new Registry({})).toBeDefined();
        });

        it('creates a new Registry with a custom configuration', () => {
            expect(
                new Registry({
                    registry: 'https://registry.example.com',
                    mirrors: ['https://mirror.example.com'],
                    api: 'https://api.example.com',
                    suggestionsAPI: 'https://suggestions.example.com',
                    cache: false,
                })
            ).toBeDefined();
        });

        it('creates a new Registry matching the given configuration', () => {
            const config: RegistryConfig = {
                registry: 'https://registry.example.com',
                mirrors: ['https://mirror.example.com'],
                api: 'https://api.example.com',
                suggestionsAPI: 'https://suggestions.example.com',
                cache: false,
            };

            const registry = new Registry(config);
            expect({ ...registry }).toStrictEqual(config);
        });
    });

    describe('getMetadata', () => {
        it("returns the registry's metadata", async () => {
            expect.assertions(1);

            const registry = new Registry();
            const metadata = await registry.getMetadata();
            expect(metadata).toHaveProperty('db_name', 'registry');
        });
    });

    describe('getPackageManifest', () => {
        it('rejects if the package name is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getPackageManifest('');
            });
        });

        it('rejects if the package name is not found', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getPackageManifest('@velut/does-not-exist');
            });
        });

        it('rejects if the package version is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getPackageManifest('react', 'invalid');
            });
        });

        it('returns the PackageManifest (react@16.13.1)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest(
                'react',
                '16.13.1'
            );
            expect(manifest).toMatchObject({
                id: 'react@16.13.1',
                name: 'react',
                createdAt: '2020-03-19T19:53:13.309Z',
                definitelyTypedName: '@types/react',
                untypedName: undefined,
                repository: {
                    type: 'git',
                    url: 'https://github.com/facebook/react',
                    directory: 'packages/react',
                },
            });
        });

        it('returns the PackageManifest (@types/react@16.9.43)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest(
                '@types/react',
                '16.9.43'
            );
            expect(manifest).toMatchObject({
                id: '@types/react@16.9.43',
                name: '@types/react',
                createdAt: '2020-07-11T19:18:20.533Z',
                definitelyTypedName: undefined,
                untypedName: 'react',
                repository: {
                    type: 'git',
                    url: 'https://github.com/DefinitelyTyped/DefinitelyTyped',
                    directory: 'types/react',
                },
            });
        });

        it('returns the PackageManifest (@types/pollyjs__core@4.3.0)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest(
                '@types/pollyjs__core',
                '4.3.0'
            );
            expect(manifest).toMatchObject({
                id: '@types/pollyjs__core@4.3.0',
                name: '@types/pollyjs__core',
                createdAt: '2020-05-26T21:56:47.346Z',
                definitelyTypedName: undefined,
                untypedName: '@pollyjs/core',
                repository: {
                    type: 'git',
                    url: 'https://github.com/DefinitelyTyped/DefinitelyTyped',
                    directory: 'types/pollyjs__core',
                },
            });
        });

        it('returns the PackageManifest (pug@3.0.0)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest('pug', '3.0.0');
            expect(manifest).toMatchObject({
                id: 'pug@3.0.0',
                name: 'pug',
                createdAt: '2020-05-25T12:19:58.278Z',
                definitelyTypedName: '@types/pug',
                repository: {
                    type: 'git',
                    url: 'https://github.com/pugjs/pug',
                    directory: 'packages/pug',
                },
            });
        });

        it('returns the PackageManifest (short-time-ago@0.1.0)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest(
                'short-time-ago',
                '0.1.0'
            );
            expect(manifest).toMatchObject({
                id: 'short-time-ago@0.1.0',
                name: 'short-time-ago',
                repository: undefined,
            });
        });

        it('returns the PackageManifest (jest-nock@0.1.7)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest(
                'jest-nock',
                '0.1.7'
            );
            expect(manifest).toMatchObject({
                id: 'jest-nock@0.1.7',
                name: 'jest-nock',
                definitelyTypedName: undefined,
            });
        });
    });

    describe('getRawPackageManifest', () => {
        it('rejects if the package name is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getRawPackageManifest('');
            });
        });

        it('rejects if the package name is not found', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getRawPackageManifest('@velut/does-not-exist');
            });
        });

        it('rejects if the package version is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getRawPackageManifest('react', 'invalid');
            });
        });

        it('returns the PackageManifest (pug@3.0.0)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const manifest = await registry.getRawPackageManifest(
                'pug',
                '3.0.0'
            );
            expect(manifest).toMatchObject({
                _id: 'pug@3.0.0',
                name: 'pug',
                repository: {
                    type: 'git',
                    url:
                        'https://github.com/pugjs/pug/tree/master/packages/pug',
                },
            });
        });
    });

    describe('getPackument', () => {
        it('rejects if the package name is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getPackument('');
            });
        });

        it('returns the Packument (short-time-ago)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const packument = await registry.getPackument('short-time-ago');
            expect(packument).toMatchObject({
                id: 'short-time-ago',
                name: 'short-time-ago',
                repository: {
                    type: 'git',
                    url: 'https://github.com/velut/node-short-time-ago',
                },
            });
        });
    });

    describe('getRawPackument', () => {
        it('rejects if the package name is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getRawPackument('');
            });
        });

        it('returns the PackumentRaw (short-time-ago)', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const packument = await registry.getRawPackument('short-time-ago');
            expect(packument).toMatchObject({
                _id: 'short-time-ago',
                name: 'short-time-ago',
                repository: {
                    type: 'git',
                    url: 'https://github.com/velut/node-short-time-ago',
                },
            });
        });
    });

    describe('getPackageDownloads', () => {
        it('rejects if the package name is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getPackageDownloads('');
            });
        });

        it('returns the PackageDownloads in the default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getPackageDownloads(
                'short-time-ago'
            );
            expect(downloads).toMatchObject({ package: 'short-time-ago' });
        });

        it('returns the PackageDownloads in a registry-default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getPackageDownloads(
                'short-time-ago',
                'last-month'
            );
            expect(downloads).toMatchObject({ package: 'short-time-ago' });
        });

        it('returns the PackageDownloads in a custom day date', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getPackageDownloads(
                'short-time-ago',
                new Date('2020-01-01')
            );
            expect(downloads).toMatchObject({
                package: 'short-time-ago',
                downloads: 0,
                start: '2020-01-01',
                end: '2020-01-01',
            });
        });

        it('returns the PackageDownloads in a custom date range', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getPackageDownloads(
                'short-time-ago',
                { start: new Date('2020-01-01'), end: new Date('2020-02-02') }
            );
            expect(downloads).toMatchObject({
                package: 'short-time-ago',
                downloads: 0,
                start: '2020-01-01',
                end: '2020-02-02',
            });
        });
    });

    describe('getDailyPackageDownloads', () => {
        it('rejects if the package name is invalid', async () => {
            expect.assertions(1);

            const registry = new Registry();
            await expectRejection(async () => {
                await registry.getDailyPackageDownloads('');
            });
        });

        it('returns the PackageDailyDownloads in the default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getDailyPackageDownloads(
                'short-time-ago'
            );
            expect(downloads).toMatchObject({ package: 'short-time-ago' });
        });

        it('returns the PackageDailyDownloads in a registry-default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getDailyPackageDownloads(
                'short-time-ago',
                'last-month'
            );
            expect(downloads).toMatchObject({ package: 'short-time-ago' });
        });
    });

    describe('getRegistryDownloads', () => {
        it('returns the Downloads in the default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getRegistryDownloads();
            expect(downloads).toHaveProperty('downloads');
        });

        it('returns the Downloads in a registry-default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getRegistryDownloads('last-month');
            expect(downloads).toHaveProperty('downloads');
        });
    });

    describe('getDailyRegistryDownloads', () => {
        it('returns the Downloads in the default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getDailyRegistryDownloads();
            expect(downloads).toHaveProperty('downloads');
        });

        it('returns the Downloads in a registry-default time period', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const downloads = await registry.getDailyRegistryDownloads(
                'last-month'
            );
            expect(downloads).toHaveProperty('downloads');
        });
    });

    describe('getPackageSuggestions', () => {
        it('returns a list of PackageSearchResult', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const suggestions = await registry.getPackageSuggestions('koa');
            expect(suggestions).toHaveLength(10);
        });
    });

    describe('searchPackages', () => {
        it('returns the SearchResults for an empty query', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const results = await registry.searchPackages({});
            expect(results).toMatchObject({
                objects: [],
                total: 0,
            });
        });

        it('returns the SearchResults for a text query', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const results = await registry.searchPackages({ text: 'koa' });
            expect(results).toMatchObject({
                total: 5137,
            });
        });
    });

    describe('queryRegistry', () => {
        it('queries the registry at the given endpoint', async () => {
            expect.assertions(1);

            const registry = new Registry();
            const response = await registry.queryRegistry('/');
            expect(response).toHaveProperty('db_name', 'registry');
        });
    });

    describe('queryAPI', () => {
        it("queries the registry's API at the given endpoint", async () => {
            expect.assertions(1);

            const registry = new Registry();
            const response = await registry.queryAPI(
                '/downloads/point/last-week'
            );
            expect(response).toHaveProperty('downloads');
        });
    });
});
