# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

-   None

## [2.5.0] - 2022-05-28

### Added

-   N/A

### Changed

-   Fixed ESM export declarations in `package.json` (Thanks @mt-empty)
-   Updated dependencies and dev dependencies

### Removed

-   N/A

## [2.4.0] - 2022-05-11

### Added

-   N/A

### Changed

-   Preserve subdomains in git repository URLs (`https://git.example.com/user/repo`) (Thanks @tomdyqin)
-   Updated dependencies and dev dependencies

### Removed

-   N/A

## [2.3.0] - 2022-04-27

### Added

-   N/A

### Changed

-   Preserve pathnames in registry URLs (`https://example.com/my/npm/registry`) (Thanks @tomdyqin)
-   Updated dependencies and dev dependencies

### Removed

-   N/A

## [2.2.0] - 2021-12-01

### Added

-   [Abbreviated packuments](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format) (`application/vnd.npm.install-v1+json`) can now be retrieved using `getAbbreviatedPackument()` or `getRawAbbreviatedPackument()`

### Changed

-   Responses are now cached based on headers and URL
-   Updated docs
-   Updated dependencies and dev dependencies
-   Moved `debug` package to dev dependencies

### Removed

-   N/A

## [2.0.0] - 2021-03-09

### Added

-   Export named functions to query the npm registry
    -   getDailyPackageDownloads()
    -   getDailyRegistryDownloads()
    -   getPackageDownloads()
    -   getPackageManifest()
    -   getPackument()
    -   getRawPackageManifest()
    -   getRawPackument()
    -   getRegistryDownloads()
    -   getRegistryMetadata()
    -   searchPackages()
-   This package can now be used in a browser environment
-   BREAKING CHANGE: Added export map to `package.json`

### Changed

-   Updated typing of registry responses
-   Updated normalization of custom properties on `Packument` and `PackageManifest` interfaces
-   Updated and reduced number of dependencies

### Removed

-   BREAKING CHANGE: Removed `Registry` class; use the exported functions instead

[unreleased]: https://github.com/velut/node-query-registry/compare/v2.5.0...HEAD
[2.0.0]: https://github.com/velut/node-query-registry/compare/v1.2.0...v2.0.0
[2.2.0]: https://github.com/velut/node-query-registry/compare/v2.0.0...v2.2.0
[2.3.0]: https://github.com/velut/node-query-registry/compare/v2.2.0...v2.3.0
[2.4.0]: https://github.com/velut/node-query-registry/compare/v2.3.0...v2.4.0
[2.5.0]: https://github.com/velut/node-query-registry/compare/v2.4.0...v2.5.0
