# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

-   None

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

[unreleased]: https://github.com/velut/node-query-registry/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/velut/node-query-registry/compare/v1.2.0...v.2.0.0
