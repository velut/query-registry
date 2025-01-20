# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- None

## [4.0.0] - 2025-01-20

### Changed

- **BREAKING CHANGE**: Updated the `SearchCriteria` and `SearchResult` types used with the `searchPackages()` function to align with the latest npm registry requirements and responses
- Upgraded dependencies

## [3.0.1] - 2024-06-12

### Changed

- Type of `sideEffects` changed from `boolean | undefined` to `boolean | string[] | undefined` (See https://github.com/velut/zod-package-json/issues/5) (Thanks @Sec-ant)
- Upgraded dependencies

## [3.0.0] - 2024-04-23

Version 3 is a complete rewrite of query-registry.

This package is now a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) and uses the [fetch global function](https://developer.mozilla.org/en-US/docs/Web/API/fetch) to perform network requests.

Additionally, every response returned by the registry is now validated against its expected schema. This means that data can now be safely accessed according to the corresponding TypeScript type definition. Unexpected data will reject with an error; in this case open an issue to propose changes to the schemas.

### Added

These are the current package's exports:

- **Variables**:
  - cache
  - npmRegistryDownloadsApiUrl
  - npmRegistryUrl
- **Functions**:
  - getAbbreviatedPackument()
  - getBulkDailyPackageDownloads()
  - getBulkPackageDownloads()
  - getDailyPackageDownloads()
  - getDailyRegistryDownloads()
  - getPackageDownloads()
  - getPackageManifest()
  - getPackageVersionsDownloads()
  - getPackument()
  - getRegistryDownloads()
  - getRegistryMetadata()
  - getRegistrySigningKeys()
  - searchPackages()
- **Zod schemas / TypeScript types**:
  - AbbreviatedPackument
  - BulkDailyPackageDownloads
  - BulkPackageDownloads
  - DailyPackageDownloads
  - DailyRegistryDownloads
  - DownloadPeriod
  - PackageDownloads
  - PackageJson
  - PackageManifest
  - PackageVersionsDownloads
  - Packument
  - RegistryDownloads
  - RegistryMetadata
  - RegistrySigningKeys
  - SearchCriteria
  - SearchResults

### Changed

- **BREAKING CHANGE**: This package is now a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
- **BREAKING CHANGE**: Require Node.js 20 (latest LTS).
- **BREAKING CHANGE**: Use `fetch` for network requests.

## [2.6.0] - 2022-08-13

### Added

- Added custom normalization for git urls; the normalized values for the `gitRepository` property may change with respect to previous releases.

### Changed

- Updated dependencies and dev dependencies.

### Removed

- Removed dependency on `git-url-parse`.

## [2.5.0] - 2022-05-28

### Changed

- Fixed ESM export declarations in `package.json` (Thanks @mt-empty).
- Updated dependencies and dev dependencies.

## [2.4.0] - 2022-05-11

### Changed

- Preserve subdomains in git repository URLs (`https://git.example.com/user/repo`) (Thanks @tomdyqin).
- Updated dependencies and dev dependencies.

## [2.3.0] - 2022-04-27

### Changed

- Preserve pathnames in registry URLs (`https://example.com/my/npm/registry`) (Thanks @tomdyqin).
- Updated dependencies and dev dependencies.

## [2.2.0] - 2021-12-01

### Added

- [Abbreviated packuments](https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md#abbreviated-metadata-format) (`application/vnd.npm.install-v1+json`) can now be retrieved using `getAbbreviatedPackument()` or `getRawAbbreviatedPackument()`.

### Changed

- Responses are now cached based on headers and URL.
- Updated docs.
- Updated dependencies and dev dependencies.
- Moved `debug` package to dev dependencies.

## [2.0.0] - 2021-03-09

### Added

- **BREAKING CHANGE**: Added export map to `package.json`.
- Export named functions to query the npm registry:
  - getDailyPackageDownloads()
  - getDailyRegistryDownloads()
  - getPackageDownloads()
  - getPackageManifest()
  - getPackument()
  - getRawPackageManifest()
  - getRawPackument()
  - getRegistryDownloads()
  - getRegistryMetadata()
  - searchPackages()
- This package can now be used in a browser environment.

### Changed

- Updated typing of registry responses.
- Updated normalization of custom properties on `Packument` and `PackageManifest` interfaces.
- Updated and reduced number of dependencies.

### Removed

- **BREAKING CHANGE**: Removed `Registry` class; use the exported functions instead.

[unreleased]: https://github.com/velut/query-registry/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/velut/query-registry/compare/v3.0.1...v4.0.0
[3.0.1]: https://github.com/velut/query-registry/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/velut/query-registry/compare/v2.6.0...v3.0.0
[2.6.0]: https://github.com/velut/query-registry/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/velut/query-registry/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/velut/query-registry/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/velut/query-registry/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/velut/query-registry/compare/v2.0.0...v2.2.0
[2.0.0]: https://github.com/velut/query-registry/compare/v1.2.0...v2.0.0
