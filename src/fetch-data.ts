import type z from "zod";
import { cache } from "./cache";

export const fetchData = async <T extends z.ZodType>(
	schema: T,
	url: string,
	headers?: Record<string, string>,
): Promise<z.infer<T>> => {
	const cacheKey = JSON.stringify({ url, headers });
	const cachedJson = cache.get(cacheKey);
	if (cachedJson) return schema.parse(cachedJson);
	const response = await fetch(url, { headers });
	const json = (await response.json()) as unknown;
	cache.set(cacheKey, json);
	return schema.parse(json);
};
