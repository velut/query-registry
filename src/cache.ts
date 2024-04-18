import QuickLRU from "quick-lru";

/**
Internal cache for all requests.
@see {@link https://github.com/sindresorhus/quick-lru}
@internal
*/
export const cache = new QuickLRU<string, unknown>({
	// 100 items.
	maxSize: 100,

	// 5 minutes.
	maxAge: 5 * 60 * 1000,
});
