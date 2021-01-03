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
});
