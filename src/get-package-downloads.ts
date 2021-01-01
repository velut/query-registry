import { assertValidPackageName } from './assert-valid-package-name';
import { Cache } from './cache';
import { DownloadPeriod } from './download-period';
import { downloadPeriodToString } from './download-period-to-string';
import { queryAPI } from './query';
import {
    PackageDailyDownloads,
    PackageDownloads,
} from './registry-types/downloads';

export async function getPackageDownloads({
    name,
    period,
    api,
    cache,
}: {
    name: string;
    period: DownloadPeriod;
    api: string;
    cache: Cache;
}): Promise<PackageDownloads> {
    assertValidPackageName({ name });

    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/point/${periodString}/${name}`;
    return queryAPI({ endpoint, api, cache });
}

export async function getDailyPackageDownloads({
    name,
    period,
    api,
    cache,
}: {
    name: string;
    period: DownloadPeriod;
    api: string;
    cache: Cache;
}): Promise<PackageDailyDownloads> {
    assertValidPackageName({ name });

    const periodString = downloadPeriodToString({ period });
    const endpoint = `/downloads/range/${periodString}/${name}`;
    return queryAPI({ endpoint, api, cache });
}
