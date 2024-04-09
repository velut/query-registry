import { z } from "zod";

export const fetchData = async <T extends z.ZodTypeAny>(
	url: string,
	schema: T,
): Promise<z.TypeOf<T>> => {
	const response = await fetch(url);
	const json = await response.json();
	return schema.parse(json) as z.infer<T>;
};
