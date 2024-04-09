import { z } from "zod";
import { fetchData } from "./fetch-data";
import { npmRegistryUrl } from "./npm-registry";

/**
Zod schema for the registry metadata.
*/
export const registryMetadataSchema = z
	.object({
		/** Database name, usually `registry` */
		db_name: z.string(),
		doc_count: z.number(),
		doc_del_count: z.number(),
		update_seq: z.number(),
		purge_seq: z.number(),
		compact_running: z.boolean(),
		disk_size: z.number(),
		data_size: z.number(),
		instance_start_time: z.string(),
		disk_format_version: z.number(),
		committed_update_seq: z.number(),
		compacted_seq: z.number(),
		uuid: z.string(),
		other: z
			.object({
				data_size: z.number(),
			})
			.passthrough()
			.partial(),
		sizes: z
			.object({
				file: z.number(),
				active: z.number(),
				external: z.number(),
			})
			.passthrough()
			.partial(),
	})
	.passthrough()
	.partial();

/**
`RegistryMetadata` describes the metadata describing the registry itself.

@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#registry}
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get}
*/
export type RegistryMetadata = z.infer<typeof registryMetadataSchema>;

/**
`getRegistryMetadata` returns the metadata describing the registry itself.

@param registry - URL of the registry (default: npm registry)
*/
export const getRegistryMetadata = async (registry = npmRegistryUrl): Promise<RegistryMetadata> =>
	fetchData(registryMetadataSchema, registry);
