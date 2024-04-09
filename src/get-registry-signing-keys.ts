import urlJoin from "url-join";
import { z } from "zod";
import { fetchData } from "./fetch-data";
import { npmRegistryUrl } from "./npm-registry";

/**
Zod schema for the registry signing keys.
*/
export const registrySigningKeysSchema = z
	.object({
		keys: z.array(
			z
				.object({
					/**
          String in the simplified extended ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ` or `null`.
          */
					expires: z.string().nullable(),

					/** SHA256 fingerprint of the public key. */
					keyid: z.string(),

					/** Key type; only `ecdsa-sha2-nistp256` is currently supported by the npm CLI. */
					keytype: z.string(),

					/** Key scheme; only `ecdsa-sha2-nistp256` is currently supported by the npm CLI. */
					scheme: z.string(),

					/** Public key encoded in base64. */
					key: z.string(),
				})
				.passthrough(),
		),
	})
	.passthrough();

/**
`RegistrySigningKeys` describes the signing keys used by the registry.

@see {@link https://docs.npmjs.com/about-registry-signatures}
*/
export type RegistrySigningKeys = z.infer<typeof registrySigningKeysSchema>;

/**
`getRegistrySigningKeys` returns the public signing keys used by the registry.

@param registry - URL of the registry (default: npm registry)
*/
export const getRegistrySigningKeys = async (
	registry = npmRegistryUrl,
): Promise<RegistrySigningKeys> =>
	fetchData(registrySigningKeysSchema, urlJoin(registry, "-/npm/v1/keys"));
