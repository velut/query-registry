import { Cache } from './cache';
import { DownloadPeriod } from './download-period';
import { downloadPeriodToString } from './download-period-to-string';
import { DailyDownloads, Downloads } from './downloads';
import { queryAPI } from './query';

export async function getRegistryDownloads({
    period,
    api,
    cache,
}: {
    period: DownloadPeriod;
    api: string;
    cache: Cache;
}): Promise<Downloads> {
    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/point/${periodString}`;
    return queryAPI({ endpoint, api, cache });
}

export async function getDailyRegistryDownloads({
    period,
    api,
    cache,
}: {
    period: DownloadPeriod;
    api: string;
    cache: Cache;
}): Promise<DailyDownloads> {
    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/range/${periodString}`;
    return queryAPI({ endpoint, api, cache });
}
