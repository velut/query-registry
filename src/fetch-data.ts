import { z } from "zod";

export const fetchData = async <T extends z.ZodTypeAny>(
	schema: T,
	url: string,
	headers?: Record<string, string>,
): Promise<z.TypeOf<T>> => {
	const response = await fetch(url, { headers });
	const json = await response.json();
	return schema.parse(json) as z.infer<T>;
};
