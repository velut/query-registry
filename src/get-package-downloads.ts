import urlJoin from 'proper-url-join';
import { assertValidPackageName } from './assert-valid-package-name';
import { DownloadPeriod } from './download-period';
import { downloadPeriodToString } from './download-period-to-string';
import { PackageDailyDownloads, PackageDownloads } from './downloads';
import { fetchJSON } from './fetch-json';

export async function getPackageDownloads({
    name,
    period,
    api,
}: {
    name: string;
    period: DownloadPeriod;
    api: string;
}): Promise<PackageDownloads> {
    assertValidPackageName({ name });

    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/point/${periodString}/${name}`;
    const url = urlJoin(api, endpoint);
    return fetchJSON(url);
}

export async function getDailyPackageDownloads({
    name,
    period,
    api,
}: {
    name: string;
    period: DownloadPeriod;
    api: string;
}): Promise<PackageDailyDownloads> {
    assertValidPackageName({ name });

    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/range/${periodString}/${name}`;
    const url = urlJoin(api, endpoint);
    return fetchJSON(url);
}
