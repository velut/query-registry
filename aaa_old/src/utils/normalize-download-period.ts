import { DownloadPeriod } from '../types/download-period';

export function normalizeRawDownloadPeriod({
    rawDownloadPeriod = 'last-week',
}: {
    rawDownloadPeriod?: DownloadPeriod;
}): string {
    if (typeof rawDownloadPeriod === 'string') {
        return rawDownloadPeriod;
    }

    if (rawDownloadPeriod instanceof Date) {
        return getDay(rawDownloadPeriod);
    }

    const { start, end } = rawDownloadPeriod;
    return `${getDay(start)}:${getDay(end)}`;
}

function getDay(date: Date): string {
    return date.toISOString().split('T')[0]!;
}
