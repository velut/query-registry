export function normalizeRawLicense({
    rawLicense,
}: {
    rawLicense?: any;
}): string | undefined {
    if (typeof rawLicense !== 'string') {
        return undefined;
    }

    if (!rawLicense) {
        return undefined;
    }

    return rawLicense;
}
