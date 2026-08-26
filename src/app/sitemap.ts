import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCollection, getFishContent, regularFish } from "@/lib/content";
import { collectionEntryHref, detailCollectionKeys } from "@/lib/contentRoutes";
import { staticSitemapEntries } from "@/seo/tdk";

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
    url: url(`/creatures/${entry.slug}/`),
    lastModified: new Date(getFishContent(entry).updated ?? "2026-08-24"),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const detailPages: MetadataRoute.Sitemap = detailCollectionKeys.flatMap((collection) =>
    getCollection(collection).map((entry) => ({
      url: url(collectionEntryHref(collection, entry.slug)),
      lastModified: new Date(entry.updated ?? "2026-08-24"),
      changeFrequency: "monthly" as const,
      priority: entry.featured ? 0.8 : 0.6,
    })),
  );

  return [...staticPages, ...fishPages, ...detailPages];
}
