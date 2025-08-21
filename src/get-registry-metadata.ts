import * as z from "zod";
import { fetchData } from "./fetch-data";
import { npmRegistryUrl } from "./npm-registry";

export const RegistryMetadata = z.object({
	/** Database name, usually `registry` */
	db_name: z.string().optional(),
	doc_count: z.number().optional(),
	doc_del_count: z.number().optional(),
	update_seq: z.number().optional(),
	purge_seq: z.number().optional(),
	compact_running: z.boolean().optional(),
	disk_size: z.number().optional(),
	data_size: z.number().optional(),
	instance_start_time: z.string().optional(),
	disk_format_version: z.number().optional(),
	committed_update_seq: z.number().optional(),
	compacted_seq: z.number().optional(),
	uuid: z.string().optional(),
	other: z.object({ data_size: z.number().optional() }).optional(),
	sizes: z
		.object({
			file: z.number().optional(),
			active: z.number().optional(),
			external: z.number().optional(),
		})
		.optional(),
});

/**
`RegistryMetadata` describes the metadata describing the registry itself.
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#registry}
@see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get}
@see {@link https://docs.couchdb.org/en/stable/api/database/common.html}
*/
export type RegistryMetadata = z.infer<typeof RegistryMetadata>;

/**
`getRegistryMetadata` returns the metadata describing the registry itself.

@param registry - URL of the registry (default: npm registry)

@see {@link RegistryMetadata}
*/
export async function getRegistryMetadata(registry = npmRegistryUrl): Promise<RegistryMetadata> {
	return await fetchData(RegistryMetadata, registry);
}
