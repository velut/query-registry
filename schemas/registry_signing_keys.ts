import { z } from "../deps.ts";

export const registrySigningKeysSchema = z.object({
  /** List of keys. */
  keys: z.array(
    z.object({
      /** Timestamp of when the key expires. */
      expires: z.union([z.string(), z.null()]),
      /** SHA256 fingerprint of the public key. */
      keyid: z.string(),
      /** Key type (for example, `ecdsa-sha2-nistp256`). */
      keytype: z.string(),
      /** Key scheme (for example, `ecdsa-sha2-nistp256`). */
      scheme: z.string(),
      /** Public key encoded in base64. */
      key: z.string(),
    }),
  ),
}).passthrough();

/**
 * `RegistrySigningKeys` contains the singing keys used by the registry.
 *
 * @see {@link https://docs.npmjs.com/about-registry-signatures}
 */
export type RegistrySigningKeys = z.infer<typeof registrySigningKeysSchema>;
