import { assertValidPackageName } from './assert-valid-package-name';
import { DownloadPeriod } from './download-period';
import { downloadPeriodToString } from './download-period-to-string';
import { PackageDailyDownloads, PackageDownloads } from './downloads';
import { queryAPI } from './queryAPI';

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
    return queryAPI({ endpoint, api });
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
    return queryAPI({ endpoint, api });
}
