import { z } from "../deps.ts";

export const packumentDistTagsSchema = z.object({
  latest: z.string(),
}).catchall(z.string());

/**
 * `PackumentDistTags` provides a mapping of distribution tags (e.g., `latest`, `beta`)
 * to their respective package versions (e.g., `1.0.0`, `2.0.0-beta`).
 */
export type PackumentDistTags = z.infer<typeof packumentDistTagsSchema>;
