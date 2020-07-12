import { normalizeRepository } from '../src/normalize-repository';

describe('normalizeRepository', () => {
    it('returns the raw non-git repository', () => {
        const rawRepository = {
            type: 'other',
            url: 'https://example.com',
        };
        expect(normalizeRepository({ rawRepository })).toStrictEqual(
            rawRepository
        );
    });

    it('returns the raw git repository with invalid url', () => {
        const rawRepository = {
            type: 'git',
            url: ' ',
        };
        expect(normalizeRepository({ rawRepository })).toStrictEqual(
            rawRepository
        );
    });

    it('returns the normalized git repository using the specified directory', () => {
        const rawRepository = {
            type: 'git',
            url: 'https://github.com/user/repo/tree/master/packages/package',
            directory: 'packages/other',
        };
        expect(normalizeRepository({ rawRepository })).toStrictEqual({
            type: 'git',
            url: 'https://github.com/user/repo',
            directory: 'packages/other',
        });
    });
});
