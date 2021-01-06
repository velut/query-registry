import lru from 'tiny-lru';

const maxItems = 250;
const fiveMinutesTTL = 5 * 60 * 1000;

export const cache = lru(maxItems, fiveMinutesTTL);
