# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   Separate functions to query the npm registry

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

-   Now the package can be used in a browser environment

-   BREAKING CHANGE: Added export map to `package.json`

### Changed

-   Updated response types
-   Updated normalization of custom properties on `Packument` and `PackageManifest`

### Removed

-   BREAKING CHANGE: Removed `Registry` class; use exported functions instead

[unreleased]: https://github.com/velut/node-query-registry/compare/v1.2.0...HEAD
