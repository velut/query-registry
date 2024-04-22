/**
`query-registry` is an API wrapper for the {@link https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md | npm registry API}.

@example
Get the metadata about the npm registry itself, if available:

```typescript
import { getRegistryMetadata } from "query-registry";

const metadata = await getRegistryMetadata();
```

@example
Get the public signing keys for the npm registry:

```typescript
import { getRegistrySigningKeys } from "query-registry";

const { keys } = await getRegistrySigningKeys();
```

@example
Get the abbreviated packument containing only the necessary data to install the `react` package:

```typescript
import { getAbbreviatedPackument } from "query-registry";

const abbrPackument = await getAbbreviatedPackument("react");
```

@example
Get the full packument containing all the data available about the `react` package:

```typescript
import { getPackument } from "query-registry";

const packument = await getPackument("react");
```

@example
Get the manifest containing the original `package.json` data plus additional registry metadata for the `latest` version of the `react` package:

```typescript
import { getPackageManifest } from "query-registry";

const manifest = await getPackageManifest("react");
```

@example
Get the manifest for `react@18.2.0` (semver version):

```typescript
import { getPackageManifest } from "query-registry";

const manifest = await getPackageManifest("react", "18.2.0");
```

@example
Get the manifest for `react@next` (distribution tag):

```typescript
import { getPackageManifest } from "query-registry";

const manifest = await getPackageManifest("react", "next");
```

@example
Search packages related to `react` (e.g., `react`, `react-dom`, ...):

```typescript
import { searchPackages } from "query-registry";

const results = await searchPackages({ text: "react" });
```

@example
Get the total number of downloads for package `react` for the last month:

```typescript
import { getPackageDownloads } from "query-registry";

const { downloads } = await getPackageDownloads("react", "last-month");
```

There are also these other download counts functions available: `getBulkDailyPackageDownloads`, `getBulkPackageDownloads`, `getDailyPackageDownloads`, `getDailyRegistryDownloads` and `getPackageVersionsDownloads`.

@example
Clear the internal cache.

```typescript
import { cache } from "query-registry";

cache.clear();
```

See the {@link https://www.npmjs.com/package/quick-lru | quick-lru} package for the cache API.

@packageDocumentation
*/

export { PackageJson } from "zod-package-json";
export { cache } from "./cache";
export { DownloadPeriod } from "./download-period";
export { AbbreviatedPackument, getAbbreviatedPackument } from "./get-abbreviated-packument";
export {
	BulkDailyPackageDownloads,
	getBulkDailyPackageDownloads,
} from "./get-bulk-daily-package-downloads";
export { BulkPackageDownloads, getBulkPackageDownloads } from "./get-bulk-package-downloads";
export { DailyPackageDownloads, getDailyPackageDownloads } from "./get-daily-package-downloads";
export { DailyRegistryDownloads, getDailyRegistryDownloads } from "./get-daily-registry-downloads";
export { PackageDownloads, getPackageDownloads } from "./get-package-downloads";
export { PackageManifest, getPackageManifest } from "./get-package-manifest";
export {
	PackageVersionsDownloads,
	getPackageVersionsDownloads,
} from "./get-package-versions-downloads";
export { Packument, getPackument } from "./get-packument";
export { RegistryDownloads, getRegistryDownloads } from "./get-registry-downloads";
export { RegistryMetadata, getRegistryMetadata } from "./get-registry-metadata";
export { RegistrySigningKeys, getRegistrySigningKeys } from "./get-registry-signing-keys";
export { npmRegistryDownloadsApiUrl, npmRegistryUrl } from "./npm-registry";
export { SearchCriteria, SearchResults, searchPackages } from "./search-packages";
