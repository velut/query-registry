import urlJoin from 'proper-url-join';
import { DownloadPeriod } from './download-period';
import { downloadPeriodToString } from './download-period-to-string';
import { DailyDownloads, Downloads } from './downloads';
import { fetchJSON } from './fetch-json';

export async function getRegistryDownloads({
    period,
    api,
}: {
    period: DownloadPeriod;
    api: string;
}): Promise<Downloads> {
    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/point/${periodString}`;
    const url = urlJoin(api, endpoint);
    return fetchJSON(url);
}

export async function getDailyRegistryDownloads({
    period,
    api,
}: {
    period: DownloadPeriod;
    api: string;
}): Promise<DailyDownloads> {
    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/range/${periodString}`;
    const url = urlJoin(api, endpoint);
    return fetchJSON(url);
}
