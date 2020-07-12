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

        it('returns the PackageManifest', async () => {
            expect.assertions(3);

            const registry = new Registry();
            const manifest = await registry.getPackageManifest('react');
            expect(manifest).toHaveProperty('id');
            expect(manifest).toHaveProperty('name', 'react');
            expect(manifest).toHaveProperty('createdAt');
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

        it('returns the PackageManifestRaw', async () => {
            expect.assertions(2);

            const registry = new Registry();
            const manifest = await registry.getRawPackageManifest('react');
            expect(manifest).toHaveProperty('_id');
            expect(manifest).toHaveProperty('name', 'react');
        });
    });
});
