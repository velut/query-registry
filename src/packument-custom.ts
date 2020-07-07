import { DistTags } from './dist-tags';

/**
 * PackumentCustom contains custom attributes
 * added by this library to packuments.
 */
export interface PackumentCustom {
    /** Unique package name (e.g., `foo`, `@foo/bar`) */
    readonly id: string;

    /** Distribution tags */
    readonly distTags: DistTags;

    /** Version number to publishing timestamps */
    readonly versionsTimestamps: Record<string, string>;
}
