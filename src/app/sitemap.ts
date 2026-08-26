import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCollection, getFishContent, regularFish } from "@/lib/content";
import { staticSitemapEntries } from "@/seo/tdk";
import type { CollectionKey } from "@/types/content";

const detailCollections: CollectionKey[] = ["guides", "quests", "bosses", "islands", "weapons", "items", "bait", "npcs"];
const prefixes: Record<CollectionKey, string> = {
  guides: "/guides",
  quests: "/quests",
  bosses: "/bosses",
  islands: "/islands",
  weapons: "/wiki/weapons",
  items: "/wiki/items",
  bait: "/wiki/bait",
  npcs: "/wiki/npcs",
  updates: "/updates",
};

function url(path: string) {
  return new URL(path, siteConfig.url).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticSitemapEntries.map((entry) => ({
    url: url(entry.path),
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.path === "/updates/" ? "weekly" : "monthly",
    priority: entry.path === "/" ? 1 : entry.path.startsWith("/legal/") ? 0.3 : 0.7,
  }));

  const fishPages: MetadataRoute.Sitemap = regularFish.map((entry) => ({
    url: url(`/fish/${entry.slug}/`),
    lastModified: new Date(getFishContent(entry).updated ?? "2026-08-24"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const detailPages: MetadataRoute.Sitemap = detailCollections.flatMap((collection) =>
    getCollection(collection).map((entry) => ({
      url: url(`${prefixes[collection]}/${entry.slug}/`),
      lastModified: new Date(entry.updated ?? "2026-08-24"),
      changeFrequency: "monthly" as const,
      priority: entry.featured ? 0.8 : 0.6,
    })),
  );

  return [...staticPages, ...fishPages, ...detailPages];
}
