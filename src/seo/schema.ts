import { siteConfig } from "@/config/site";
import type { ContentEntry, FaqItem } from "@/types/content";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL("/images/brand/how-to-fish-game-mark.png", siteConfig.url).toString(),
    description: "Independent fan-made How to Fish guide site for fish, quests, bosses, islands and equipment.",
  };
}

type PageSchemaInput = { name?: string; title?: string; description: string; path: string };

export function webPageSchema({ name, title, description, path }: PageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name ?? title,
    description,
    url: new URL(path, siteConfig.url).toString(),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };
}

export function collectionPageSchema({ name, title, description, path }: PageSchemaInput) {
  return {
    ...webPageSchema({ name, title, description, path }),
    "@type": "CollectionPage",
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, siteConfig.url).toString(),
    })),
  };
}

export function articleSchema(entry: ContentEntry, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.name,
    description: entry.description,
    image: new URL(entry.image, siteConfig.url).toString(),
    dateModified: entry.updated,
    mainEntityOfPage: new URL(path, siteConfig.url).toString(),
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: new URL("/images/brand/how-to-fish-game-mark.png", siteConfig.url).toString() },
    },
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
