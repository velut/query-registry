import { DistInfo } from './dist-info';
import { NpmOperationalInternal } from './npm-operational-internal';
import { PackageJSON } from './package-json';
import { PackageManifestCustom } from './package-manifest-custom';
import { Person } from './person';

/**
 * PackageManifest contains the metadata for a specific version of a package.
 */
export interface PackageManifest extends PackageJSON, PackageManifestCustom {
    /** Package version ID (e.g., `foo@1.0.0`, `@foo/bar@1.0.0`) */
    readonly _id: string;

    /** Registry metadata */
    readonly dist: DistInfo;

    /** Commit hash at publishing time */
    readonly gitHead?: string;

    /** User who published this package version */
    readonly _npmUser: Person;

    /** Node version used when publishing */
    readonly _nodeVersion?: string;

    /** npm version used when publishing */
    readonly _npmVersion?: string;

    /** Internal npm data */
    readonly _npmOperationalInternal?: NpmOperationalInternal;

    /** True if the package has a shrinkwrap file */
    readonly _hasShrinkwrap?: boolean;
}
