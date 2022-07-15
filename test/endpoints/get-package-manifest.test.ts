/** @jest-environment setup-polly-jest/jest-environment-node */
// See https://netflix.github.io/pollyjs/#/test-frameworks/jest-jasmine?id=supported-test-runners

import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import FSPersister from '@pollyjs/persister-fs';
import * as path from 'path';
import { setupPolly } from 'setup-polly-jest';
import {
    FetchError,
    getPackageManifest,
    InvalidPackageNameError,
    InvalidPackageVersionError,
} from '../../src';

describe('getPackageManifest', () => {
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

    it('returns the manifest for `short-time-ago@latest`', async () => {
        expect.assertions(8);

        const manifest = await getPackageManifest({
            name: 'short-time-ago',
        });
        expect(manifest).toMatchObject({
            name: 'short-time-ago',
        });
        expect(manifest).toHaveProperty('_id');
        expect(manifest).toHaveProperty('version');
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `short-time-ago@1.0.0`', async () => {
        expect.assertions(8);

        const manifest = await getPackageManifest({
            name: 'short-time-ago',
            version: '1.0.0',
        });
        expect(manifest).toMatchObject({
            _id: 'short-time-ago@1.0.0',
            id: 'short-time-ago@1.0.0',
            name: 'short-time-ago',
            version: '1.0.0',
            createdAt: '2020-06-25T18:31:41.554Z',
            license: 'MIT',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/velut/node-short-time-ago',
                directory: undefined,
            },
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('_npmUser.name', 'velut');
        expect(manifest).toHaveProperty('publisher');
        expect(manifest).toHaveProperty('publisher.name', 'velut');
    });

    it('returns the manifest for `chalk@4.1.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: 'chalk',
            version: '4.1.0',
        });
        expect(manifest).toMatchObject({
            _id: 'chalk@4.1.0',
            id: 'chalk@4.1.0',
            name: 'chalk',
            version: '4.1.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/chalk/chalk',
                directory: undefined,
            },
            definitelyTypedName: undefined,
            untypedName: undefined,
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `xmldoc@1.1.2`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: 'xmldoc',
            version: '1.1.2',
        });
        expect(manifest).toMatchObject({
            _id: 'xmldoc@1.1.2',
            id: 'xmldoc@1.1.2',
            name: 'xmldoc',
            version: '1.1.2',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/nfarina/xmldoc',
                directory: undefined,
            },
            definitelyTypedName: '@types/xmldoc',
            untypedName: undefined,
            license: undefined,
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `ui-devtools@0.0.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: 'ui-devtools',
            version: '0.0.0',
        });
        expect(manifest).toMatchObject({
            _id: 'ui-devtools@0.0.0',
            id: 'ui-devtools@0.0.0',
            name: 'ui-devtools',
            version: '0.0.0',
            gitRepository: undefined,
            definitelyTypedName: undefined,
            untypedName: undefined,
            license: undefined,
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `pug@3.0.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: 'pug',
            version: '3.0.0',
        });
        expect(manifest).toMatchObject({
            _id: 'pug@3.0.0',
            id: 'pug@3.0.0',
            name: 'pug',
            version: '3.0.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/pugjs/pug/tree/master/packages/pug',
                directory: undefined,
            },
            definitelyTypedName: '@types/pug',
            untypedName: undefined,
            license: 'MIT',
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `Base64@1.1.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: 'Base64',
            version: '1.1.0',
        });
        expect(manifest).toMatchObject({
            _id: 'Base64@1.1.0',
            id: 'Base64@1.1.0',
            name: 'Base64',
            version: '1.1.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/davidchambers/Base64.js',
                directory: undefined,
            },
            definitelyTypedName: undefined,
            untypedName: undefined,
            license: '(Apache-2.0 OR WTFPL)',
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `react@17.0.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: 'react',
            version: '17.0.0',
        });
        expect(manifest).toMatchObject({
            _id: 'react@17.0.0',
            id: 'react@17.0.0',
            name: 'react',
            version: '17.0.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/facebook/react',
                directory: 'packages/react',
            },
            definitelyTypedName: '@types/react',
            untypedName: undefined,
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `@types/react@17.0.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: '@types/react',
            version: '17.0.0',
        });
        expect(manifest).toMatchObject({
            _id: '@types/react@17.0.0',
            id: '@types/react@17.0.0',
            name: '@types/react',
            version: '17.0.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/DefinitelyTyped/DefinitelyTyped',
                directory: 'types/react',
            },
            definitelyTypedName: undefined,
            untypedName: 'react',
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `@types/pollyjs__core@4.3.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: '@types/pollyjs__core',
            version: '4.3.0',
        });
        expect(manifest).toMatchObject({
            _id: '@types/pollyjs__core@4.3.0',
            id: '@types/pollyjs__core@4.3.0',
            name: '@types/pollyjs__core',
            version: '4.3.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/DefinitelyTyped/DefinitelyTyped',
                directory: 'types/pollyjs__core',
            },
            definitelyTypedName: undefined,
            untypedName: '@pollyjs/core',
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('returns the manifest for `@types/jest-diff@24.3.0`', async () => {
        expect.assertions(6);

        const manifest = await getPackageManifest({
            name: '@types/jest-diff',
            version: '24.3.0',
        });
        expect(manifest).toMatchObject({
            _id: '@types/jest-diff@24.3.0',
            id: '@types/jest-diff@24.3.0',
            name: '@types/jest-diff',
            version: '24.3.0',
            gitRepository: {
                type: 'git',
                url: 'https://github.com/facebook/jest/tree/master/packages/jest-diff',
                directory: undefined,
            },
            definitelyTypedName: undefined,
            untypedName: 'jest-diff',
        });
        expect(manifest).toHaveProperty('dist');
        expect(manifest).toHaveProperty('dist.tarball');
        expect(manifest).toHaveProperty('dist.shasum');
        expect(manifest).toHaveProperty('_npmUser');
        expect(manifest).toHaveProperty('publisher');
    });

    it('throws on invalid package names', async () => {
        expect.assertions(2);

        try {
            await getPackageManifest({ name: '' });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof InvalidPackageNameError).toBeTruthy();
        }
    });

    it('throws on non-existing packages', async () => {
        expect.assertions(2);

        try {
            await getPackageManifest({
                name: '@velut/this-package-does-not-exist',
            });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof FetchError).toBeTruthy();
        }
    });

    it('throws on non-existing package versions', async () => {
        expect.assertions(2);

        try {
            await getPackageManifest({
                name: 'short-time-ago',
                version: '0.0.0-invalid',
            });
        } catch (err) {
            expect(err).toBeDefined();
            expect(err instanceof InvalidPackageVersionError).toBeTruthy();
        }
    });
});
