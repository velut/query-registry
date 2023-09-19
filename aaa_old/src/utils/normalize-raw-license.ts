export function normalizeRawLicense({
    rawLicense,
}: {
    rawLicense?: any;
}): string | undefined {
    if (!rawLicense) {
        return undefined;
    }

    if (typeof rawLicense !== 'string') {
        return undefined;
    }

    return rawLicense;
}
