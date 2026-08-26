import type { Metadata } from "next";
import { collectionConfig } from "@/config/collections";
import { getEntry } from "@/lib/content";
import { collectionEntryHref } from "@/lib/contentRoutes";
import { createMetadata } from "@/seo/metadata";
import { getDetailTdk, pageTdk } from "@/seo/tdk";
import type { CollectionKey } from "@/types/content";

const collectionTdkKeys: Record<CollectionKey, keyof typeof pageTdk> = {
  guides: "guides",
  quests: "quests",
  bosses: "bosses",
  islands: "islands",
  weapons: "weapons",
  bait: "bait",
  npcs: "npcs",
  updates: "updates",
};

export function collectionMetadata(collection: CollectionKey): Metadata {
  return createMetadata(pageTdk[collectionTdkKeys[collection]]);
}

export function entryMetadata(collection: CollectionKey, slug: string): Metadata {
  const entry = getEntry(collection, slug);
  const config = collectionConfig[collection];
  if (!entry) return createMetadata({ title: "Page not found", description: "This guide is not available.", path: config.href, noIndex: true });
  const path = collectionEntryHref(collection, entry.slug);
  return createMetadata({ ...getDetailTdk(collection, entry, path), type: "article" });
}
