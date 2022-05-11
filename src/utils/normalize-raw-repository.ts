import gitUrlParse from 'git-url-parse';
import { GitRepository } from '../types/git-repository';
import { Repository } from '../types/repository';

export function normalizeRawRepository({
    rawRepository,
}: {
    rawRepository?: any;
}): GitRepository | undefined {
    if (isRepository(rawRepository)) {
        return normalizeRepository({ rawRepository });
    }

    if (typeof rawRepository === 'string') {
        return normalizeRepository({
            rawRepository: { url: rawRepository },
        });
    }

    return undefined;
}

function isRepository(rawRepository: any): rawRepository is Repository {
    return (
        rawRepository &&
        typeof rawRepository === 'object' &&
        typeof rawRepository['url'] === 'string' &&
        ['string', 'undefined'].includes(typeof rawRepository['type']) &&
        ['string', 'undefined'].includes(typeof rawRepository['directory'])
    );
}

function normalizeRepository({
    rawRepository,
}: {
    rawRepository: Repository;
}): GitRepository | undefined {
    const { url, directory: repositoryDir } = rawRepository;

    const info = parseGitURL({ url });
    if (!info) {
        return undefined;
    }

    const { resource, full_name: repositoryID, filepath } = info;

    // Add domain to sources derived from npm-style shortcuts
    const host = resource
        .replace(/^$/, 'github.com')
        .replace(/^github$/, 'github.com')
        .replace(/^gitlab$/, 'gitlab.com')
        .replace(/^bitbucket$/, 'bitbucket.org');

    const parsedDir = filepath !== '' ? filepath : undefined;

    return {
        type: 'git',
        url: `https://${host}/${repositoryID}`,
        directory: repositoryDir ?? parsedDir,
    };
}

function parseGitURL({ url }: { url: string }): gitUrlParse.GitUrl | undefined {
    let info;
    try {
        info = gitUrlParse(url);
    } catch {}
    return info;
}
