import { getRawPackageManifest } from '../endpoints/get-raw-package-manifest';
import { RawPackageManifest } from '../types/raw-package-manifest';

export async function getDefinitelyTypedName({
    rawPackageManifest,
    registry,
    mirrors,
    cached,
}: {
    rawPackageManifest: RawPackageManifest;
    registry?: string;
    mirrors?: string[];
    cached?: boolean;
}): Promise<string | undefined> {
    const { name, types, typings } = rawPackageManifest;
    const definitelyTypedName = toDefinitelyTypedName({ name });
    const alreadyTyped = name === definitelyTypedName || !!types || !!typings;
    if (alreadyTyped) {
        return undefined;
    }

    let ok = false;
    try {
        const { deprecated } = await getRawPackageManifest({
            name: definitelyTypedName,
            registry,
            mirrors,
            cached,
        });
        ok = deprecated === undefined;
    } catch {}
    return ok ? definitelyTypedName : undefined;
}

/**
 * `toDefinitelyTypedName` returns the name of the corresponding
 * DefinitelyTyped package (for example,
 * `foo` => `@types/foo`,
 * `@bar/baz` => `@types/bar__baz`).
 */
function toDefinitelyTypedName({ name }: { name: string }): string {
    return name.startsWith('@types/')
        ? name
        : `@types/${name.replace('@', '').replace('/', '__')}`;
}
