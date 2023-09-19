import { z } from "../deps.ts";

export const registryMetadataSchema = z.object({
  db_name: z.string(),
  engine: z.string(),
  doc_count: z.number(),
  doc_del_count: z.number(),
  update_seq: z.number(),
  purge_seq: z.number(),
  compact_running: z.boolean(),
  sizes: z.object({
    active: z.number(),
    external: z.number(),
    file: z.number(),
  }),
  disk_size: z.number(),
  data_size: z.number(),
  other: z.object({
    data_size: z.number(),
  }),
  instance_start_time: z.string(),
  disk_format_version: z.number(),
  committed_update_seq: z.number(),
  compacted_seq: z.number(),
  uuid: z.string(),
});

/**
 * `RegistryMetadata` contains information about the registry itself.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#registry}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get}
 * @see {@link https://docs.couchdb.org/en/stable/api/database/common.html}
 */
export type RegistryMetadata = z.infer<typeof registryMetadataSchema>;
