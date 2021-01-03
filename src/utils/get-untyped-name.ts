/**
 * `getUntypedName` returns the name of the normal package
 * corresponding to a DefinitelyTyped package.
 */
export function getUntypedName({ name }: { name: string }): string | undefined {
    if (!name.startsWith('@types/')) {
        return undefined;
    }

    // ['foo', undefined] or ['@bar', 'baz']
    const [scopeOrName, scopedName] = name.replace('@types/', '').split('__');

    return scopedName ? `@${scopeOrName}/${scopedName}` : scopeOrName;
}
