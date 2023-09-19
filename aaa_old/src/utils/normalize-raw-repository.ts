import urlJoin from 'url-join';
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
    const { url, directory } = rawRepository;

    const parsedUrl = parseGitURL({ url });
    if (!parsedUrl) {
        return undefined;
    }

    return {
        type: 'git',
        url: parsedUrl,
        directory,
    };
}

function parseGitURL({ url }: { url: string }): string | undefined {
    const urlWithProtocol = url.includes(':')
        ? // A normal URL or a shortcut like `github:user/repository`
          url
        : // The short form github shortcut `user/repository`
        url.includes('/')
        ? `github:${url}`
        : // Not a URL
          '';
    try {
        const { protocol, hostname, pathname } = new URL(urlWithProtocol);
        const cleanPathname = pathname.replace(/\.git$/, '');
        if (protocol === 'github:' || hostname === 'github.com') {
            return urlJoin('https://github.com', cleanPathname);
        }
        if (protocol === 'gist:' || hostname === 'gist.github.com') {
            return urlJoin('https://gist.github.com', cleanPathname);
        }
        if (protocol === 'bitbucket:' || hostname === 'bitbucket.org') {
            return urlJoin('https://bitbucket.org', cleanPathname);
        }
        if (protocol === 'gitlab:' || hostname === 'gitlab.com') {
            return urlJoin('https://gitlab.com', cleanPathname);
        }
        return urlWithProtocol;
    } catch {
        return undefined;
    }
}
