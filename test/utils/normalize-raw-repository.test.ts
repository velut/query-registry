import { GitRepository } from '../../src';
import { normalizeRawRepository } from '../../src/utils/normalize-raw-repository';

describe('normalizeRawRepository', () => {
    it('returns undefined for invalid repositories', () => {
        expect(normalizeRawRepository({ rawRepository: '' })).toBeUndefined();
    });

    it('prefers the specified directory to the one in the URL', () => {
        const gitRepository = normalizeRawRepository({
            rawRepository: {
                type: 'git',
                url: 'https://github.com/user/repo/tree/main/second-dir',
                directory: 'first-dir',
            },
        });
        expect((gitRepository as GitRepository).directory).toEqual('first-dir');
    });

    it('supports npm-style shortcuts', () => {
        expect(
            normalizeRawRepository({
                rawRepository: 'user/repo',
            })
        ).toStrictEqual({
            type: 'git',
            url: 'https://github.com/user/repo',
            directory: undefined,
        });

        expect(
            normalizeRawRepository({
                rawRepository: 'github:user/repo',
            })
        ).toStrictEqual({
            type: 'git',
            url: 'https://github.com/user/repo',
            directory: undefined,
        });

        expect(
            normalizeRawRepository({
                rawRepository: 'gitlab:user/repo',
            })
        ).toStrictEqual({
            type: 'git',
            url: 'https://gitlab.com/user/repo',
            directory: undefined,
        });

        expect(
            normalizeRawRepository({
                rawRepository: 'bitbucket:user/repo',
            })
        ).toStrictEqual({
            type: 'git',
            url: 'https://bitbucket.org/user/repo',
            directory: undefined,
        });
    });

    it('keeps the repository subdomain', () => {
        const gitRepository = normalizeRawRepository({
            rawRepository: {
                type: 'git',
                url: 'https://git.example.com/user/repo',
            },
        });
        expect(gitRepository).toMatchObject({
            type: 'git',
            url: 'https://git.example.com/user/repo',
        });
    });
});
