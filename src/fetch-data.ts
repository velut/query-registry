import type z from "zod";
import { cache } from "./cache";

export async function fetchData<T extends z.ZodType>(
  schema: T,
  url: string,
  headers?: Record<string, string>,
): Promise<z.infer<T>> {
  const cacheKey = JSON.stringify({ url, headers });
  const cachedJson = cache.get(cacheKey);
  if (cachedJson) return schema.parse(cachedJson);
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`fetchData: ${response.status} ${response.statusText} for ${url}`);
  }
  const json = (await response.json()) as unknown;
  cache.set(cacheKey, json);
  return schema.parse(json);
}
