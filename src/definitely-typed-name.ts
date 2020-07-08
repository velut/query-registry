const typesScope = '@types/';

/**
 * toDefinitelyTypedName returns the name of the corresponding
 * DefinitelyTyped package (e.g., `foo` => `@types/foo`,
 * `@foo/bar` => `@types/foo__bar`).
 *
 * @param name - the name of a package
 */
export function toDefinitelyTypedName({ name }: { name: string }): string {
    return name.startsWith(typesScope)
        ? name
        : `${typesScope}${name.replace('@', '').replace('/', '__')}`;
}

/**
 * fromDefinitelyTypedName returns the name of the normal package
 * corresponding to a DefinitelyTyped package.
 *
 * @param name - the name of a DefinitelyTyped package
 */
export function fromDefinitelyTypedName({
    name,
}: {
    name: string;
}): string | undefined {
    if (!name.startsWith(typesScope)) {
        return undefined;
    }

    const [scopeOrName, scopedName] = name
        .replace(typesScope, '')
        .split('__') as [string, string | undefined];

    return scopedName ? `@${scopeOrName}/${scopedName}` : scopeOrName;
}
