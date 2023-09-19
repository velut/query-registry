import { DistTags } from './dist-tags';
import { RawAbbreviatedPackument } from './raw-abbreviated-packument';

/**
 * `AbbreviatedPackument` represents a packument (package document)
 * containing only the metadata necessary to install a package.
 *
 * @see {@link RawAbbreviatedPackument}
 */
export interface AbbreviatedPackument extends RawAbbreviatedPackument {
    /** Unique package name (for example, `foo` or `@bar/baz`) */
    readonly id: string;

    /**
     * Timestamp of when the package was last modified
     * in ISO 8601 format (for example, `2021-11-23T19:12:24.006Z`);
     * (alias to `modified`)
     */
    readonly modifiedAt: string;

    /**
     * Mapping of distribution tags to version numbers
     * (alias to `dist-tags`)
     *
     * @see {@link DistTags}
     */
    readonly distTags: DistTags;
}
