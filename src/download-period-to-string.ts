// import { DownloadPeriod } from './download-period';

// export function downloadPeriodToString({
//     period,
// }: {
//     period: DownloadPeriod;
// }): string {
//     if (typeof period === 'string') {
//         return period;
//     }

//     if (period instanceof Date) {
//         return getDay(period);
//     }

//     const { start, end } = period;
//     return `${getDay(start)}:${getDay(end)}`;
// }

// function getDay(date: Date): string {
//     return date.toISOString().split('T')[0];
// }
