/**
 * `RegistryMetadata` contains information about the registry itself.
 *
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#registry}
 * @see {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md#get}
 * @see {@link RegistryMetadataOther}
 * @see {@link RegistryMetadataSizes}
 */
export interface RegistryMetadata {
    /** Database name, usually `registry` */
    readonly db_name: string;
    readonly doc_count: number;
    readonly doc_del_count: number;
    readonly update_seq: number;
    readonly purge_seq: number;
    readonly compact_running: boolean;
    readonly disk_size: number;
    readonly data_size: number;
    readonly instance_start_time: string;
    readonly disk_format_version: number;
    readonly committed_update_seq: number;
    readonly compacted_seq: number;
    readonly uuid: string;
    readonly other: RegistryMetadataOther;
    readonly sizes: RegistryMetadataSizes;
}

export interface RegistryMetadataOther {
    readonly data_size: number;
}

export interface RegistryMetadataSizes {
    readonly file: number;
    readonly active: number;
    readonly external: number;
}
