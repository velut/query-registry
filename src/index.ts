/**
TODO:
@packageDocumentation
*/

export { bugsSchema, type Bugs } from "./bugs";
export { distSchema, type Dist } from "./dist";
export { distTagsSchema, type DistTags } from "./dist-tags";
export { fundingSchema, type Funding } from "./funding";
export {
	getRegistryMetadata,
	registryMetadataSchema,
	type RegistryMetadata,
} from "./get-registry-metadata";
export {
	getRegistrySigningKeys,
	registrySigningKeysSchema,
	type RegistrySigningKeys,
} from "./get-registry-signing-keys";
export { npmRegistryDownloadsApiUrl, npmRegistryUrl } from "./npm-registry";
export { packageManifestSchema, type PackageManifest } from "./package-manifest";
export { personSchema, type Person } from "./person";
export { repositorySchema, type Repository } from "./repository";
