import { BugTracker } from './bug-tracker';
import { Person } from './person';
import { Repository } from './repository';

/**
 * `PackageJSON` contains the package metadata
 * usually found in `package.json` files.
 *
 * @remarks
 * For some packages, especially legacy ones,
 * the properties may be mistyped due to incorrect data present on the registry.
 *
 * @see {@link https://docs.npmjs.com/cli/v6/configuring-npm/package-json}
 */
export interface PackageJSON {
    /** Package name */
    readonly name: string;

    /** Package version number */
    readonly version: string;

    /** Package description */
    readonly description?: string;

    /** Homepage URL */
    readonly homepage?: string;

    /** SPDX license identifier */
    readonly license?: string;

    /** Text of the license */
    readonly licenseText?: string;

    /** Keywords describing the package */
    readonly keywords?: string[];

    /**
     * Author of the package
     *
     * @see {@link Person}
     */
    readonly author?: Person;

    /**
     * Maintainers of the package
     *
     * @see {@link Person}
     */
    readonly maintainers?: Person[];

    /**
     * Contributors to the package
     *
     * @see {@link Person}
     */
    readonly contributors?: Person[];

    /**
     * Repository containing the package's source
     *
     * @see {@link Repository}
     */
    readonly repository?: string | Repository;

    /**
     * Bug tracker
     *
     * @see {@link BugTracker}
     */
    readonly bugs?: BugTracker;

    /** Runtime dependencies */
    readonly dependencies?: Record<string, string>;

    /** Development dependencies */
    readonly devDependencies?: Record<string, string>;

    /** Peer dependencies */
    readonly peerDependencies?: Record<string, string>;

    /** Optional dependencies */
    readonly optionalDependencies?: Record<string, string>;

    /** Bundled dependencies */
    readonly bundleDependencies?: string[];

    /** Bundled dependencies (alias) */
    readonly bundledDependencies?: string[];

    /** Main source file */
    readonly source?: string;

    /** Main file (Node) */
    readonly main?: string;

    /** Main file (Browser) */
    readonly browser?: string;

    /** Main file (Modules) */
    readonly module?: string;

    /** Type declarations file */
    readonly types?: string;

    /** Type declarations file (alias) */
    readonly typings?: string;

    /**
     * Export map
     *
     * @see {@link https://nodejs.org/api/packages.html#packages_subpath_exports}
     */
    readonly exports?: string | Record<string, unknown>;

    /** File patterns included in the package */
    readonly files?: string[];

    /** Executable files */
    readonly bin?: string | Record<string, string>;

    /** Man pages */
    readonly man?: string | string[];

    /** Directories describing the package's structure */
    readonly directories?: Record<string, string>;

    /** npm scripts */
    readonly scripts?: Record<string, string>;

    /** npm config */
    readonly config?: Record<string, string>;

    /** Node compatibility */
    readonly engines?: Record<string, string>;

    /** OS compatibility */
    readonly os?: string[];

    /** CPU compatibility */
    readonly cpu?: string[];

    /** Prevent publishing */
    readonly private?: boolean;

    /** Publishing configuration */
    readonly publishConfig?: Record<string, string>;

    /** Deprecation message */
    readonly deprecated?: string;

    /** README contents */
    readonly readme?: string;

    /** Name of the README file */
    readonly readmeFilename?: string;

    /** Other fields */
    readonly [key: string]: unknown;
}
