import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  keywords,
  path,
  type = "website",
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = new URL(path, siteConfig.url).toString();
  const imageUrl = new URL("/images/og-image.png", siteConfig.url).toString();
  return {
    title: { absolute: title },
    description,
    keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
        },
    openGraph: {
      type,
      locale: "en_US",
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${title} social preview` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
