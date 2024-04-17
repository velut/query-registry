import QuickLRU from "quick-lru";
import { z } from "zod";

const cache = new QuickLRU({
	// 100 items.
	maxSize: 100,

	// 5 minutes.
	maxAge: 5 * 60 * 1000,
});

export const fetchData = async <T extends z.ZodTypeAny>(
	schema: T,
	url: string,
	headers?: Record<string, string>,
): Promise<z.TypeOf<T>> => {
	const cacheKey = JSON.stringify({ url, headers });
	const cachedJson = cache.get(cacheKey);
	if (cachedJson) {
		return schema.parse(cachedJson) as z.infer<T>;
	}
	const response = await fetch(url, { headers });
	const json = (await response.json()) as unknown;
	cache.set(cacheKey, json);
	return schema.parse(json) as z.infer<T>;
};
