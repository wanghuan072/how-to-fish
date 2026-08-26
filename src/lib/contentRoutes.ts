import { collectionConfig } from "@/config/collections";
import type { CollectionKey } from "@/types/content";

export const detailCollectionKeys = [
  "guides",
  "quests",
  "bosses",
  "islands",
  "weapons",
  "bait",
  "npcs",
] as const satisfies readonly CollectionKey[];

export type DetailCollectionKey = (typeof detailCollectionKeys)[number];

export function hasDetailRoute(collection: CollectionKey): collection is DetailCollectionKey {
  return collection !== "updates";
}

export function collectionEntryHref(collection: CollectionKey, slug: string) {
  if (!hasDetailRoute(collection)) return `${collectionConfig[collection].href}#${slug}`;
  return `${collectionConfig[collection].detailPrefix}/${slug}/`;
}
