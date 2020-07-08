import gitUrlParse from 'git-url-parse';
import HostedGitInfo from 'hosted-git-info';
import { Repository } from './repository';

export function normalizeRepository({
    rawRepository,
}: {
    rawRepository?: Repository;
}): Repository | undefined {
    if (!rawRepository) {
        return undefined;
    }

    const { type } = rawRepository;
    if (type.toLowerCase() !== 'git') {
        return rawRepository;
    }

    const r1 = getRepository(rawRepository);
    if (r1) {
        return r1;
    }

    const r2 = getRepositoryWorkaround(rawRepository);
    if (r2) {
        return r2;
    }

    return rawRepository;
}

function getRepository({
    type,
    url,
    directory,
}: Repository): Repository | undefined {
    const info = getHostedGitInfo({ url });
    if (!info) {
        return undefined;
    }

    return { type, url: info.browse(), directory };
}

function getHostedGitInfo({ url }: { url: string }): HostedGitInfo | undefined {
    return HostedGitInfo.fromUrl(url, { noGitPlus: true });
}

/**
 * getRepositoryWorkaround should be used for repository URLs
 * currently not supported by the `hosted-git-info` package.
 * See https://github.com/npm/hosted-git-info/issues/57.
 */
function getRepositoryWorkaround({
    type,
    url,
    directory,
}: Repository): Repository | undefined {
    const info = parseGitURL({ url });
    if (!info) {
        return undefined;
    }

    const { source: host, full_name: repositoryID, filepath } = info;

    // `github.com` => `github`
    const hostName = host.split('.')[0];

    // `github:user/repo`
    const shortcut = `${hostName}:${repositoryID}`;

    // Either the specified directory or the parsed one
    const dir = directory ?? filepath;

    return getRepository({ type, url: shortcut, directory: dir });
}

/** Package `git-url-parse` parses only valid URLs and throws otherwise */
function parseGitURL({ url }: { url: string }): gitUrlParse.GitUrl | undefined {
    let info;
    try {
        info = gitUrlParse(url);
    } catch {}
    return info;
}
