import { notFound } from "next/navigation";
import tackleJson from "@/data/tackle.json";
import { ArticleDetailPage } from "@/page/detail/ArticleDetailPage";
import { defaultCatchPools, baitGameData } from "@/data/baitGameData";
import { getCollection, getFishImage, getFishImageAlt, isBossCreature, fish } from "@/lib/content";
import type { ContentEntry } from "@/types/content";
import type { RelationGroup } from "@/lib/contentRelations";

type RodEntry = { slug: string; name: string; stage: string; description: string; image: string; imageAlt: string; fishSlugs: string[] };
const rods = tackleJson as RodEntry[];

export function getRod(slug: string) {
  return rods.find((rod) => rod.slug === slug);
}

export function RodDetailPage({ slug }: { slug: string }) {
  const rod = getRod(slug);
  if (!rod) notFound();
  const defaultPool = defaultCatchPools.find((pool) => pool.rod === rod.name);
  const compatibleBait = baitGameData.filter((entry) => entry.rod === rod.name);
  const targets = rod.fishSlugs.map((fishSlug) => fish.find((entry) => entry.slug === fishSlug)).filter((entry): entry is (typeof fish)[number] => Boolean(entry));
  const baitEntries = compatibleBait.map((item) => getCollection("bait").find((entry) => entry.slug === item.slug)).filter((entry): entry is ContentEntry => Boolean(entry));
  const entry: ContentEntry = {
    slug: rod.slug,
    name: `${rod.name}: Uses, Bait & Catch Pools`,
    eyebrow: "Fishing rod reference",
    description: `${rod.description} Use this page to check its no-bait catch pool, compatible equippable bait and lure entries, and linked creatures.`,
    image: rod.image,
    imageAlt: rod.imageAlt,
    updated: "2026-08-27",
    tags: [rod.stage, `${compatibleBait.length} compatible bait and lures`],
    sections: [
      {
        heading: "What this rod is for",
        paragraphs: [rod.description],
        bullets: [
          `Available: ${rod.stage}.`,
          `Compatible equippable items: ${compatibleBait.length}.`,
          `Documented creature and encounter targets: ${targets.length}.`,
        ],
      },
      ...(defaultPool ? [{
        heading: "Default rod catches (no bait equipped)",
        paragraphs: [`Equip ${rod.name}, leave the bait slot empty and cast on the matching island to use the ${defaultPool.name}. The game then selects from this default catch table; it does not consume a Bait or Lure, and there is no inventory item named “Free Lure.”`],
        bullets: defaultPool.catchables.map((catchable) => `${catchable.name}: ${catchable.poolShare.toFixed(catchable.poolShare % 1 ? 1 : 0)}% of this no-bait pool.`),
      }] : []),
      {
        heading: "Compatible bait and lures",
        paragraphs: [`Equip one of these ${compatibleBait.length} items to use its separate catch pool. Open an item page for its price, exact pool share, bait-loss field and quest links.`],
        bullets: compatibleBait.map((item) => `${item.sourceName}: ${item.acquisition === "Shop" ? `$${item.price?.toLocaleString("en-US")} shop item` : "quest-supplied item"}; ${item.catchables.length} target${item.catchables.length === 1 ? "" : "s"}.`),
      },
    ],
  };
  const relationGroups: RelationGroup[] = [
    {
      id: "compatible-bait-and-lures",
      title: "Compatible bait and lures",
      description: "Equippable items that use this rod. Open an item for its parameters and full target pool.",
      items: baitEntries.map((item) => ({ title: item.name, href: `/wiki/bait-and-lures/${item.slug}/`, meta: item.eyebrow ?? "Bait / lure", description: item.description, image: item.image, imageAlt: item.imageAlt })),
    },
    {
      id: "linked-creatures",
      title: "Linked creatures and encounters",
      description: "All documented creatures, mini-bosses and bosses that use this rod through a default or equipped catch method.",
      items: targets.map((item) => ({ title: item.name, href: isBossCreature(item) ? `/bosses/${item.slug}/` : `/creatures/${item.slug}/`, meta: `${item.islandName} · ${item.category}`, description: item.lure, image: getFishImage(item), imageAlt: getFishImageAlt(item) })),
    },
  ];
  return <ArticleDetailPage entry={entry} collection="bait" path={`/wiki/bait-and-lures/rods/${rod.slug}/`} breadcrumbs={[{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki/" }, { name: "Bait, Lures & Rods", href: "/wiki/bait-and-lures/" }, { name: rod.name, href: `/wiki/bait-and-lures/rods/${rod.slug}/` }]} facts={[{ label: "Available", value: rod.stage }, { label: "No-bait pool", value: defaultPool ? defaultPool.name : "None confirmed" }, { label: "Compatible items", value: String(compatibleBait.length) }, { label: "Linked targets", value: String(targets.length) }]} relationGroups={relationGroups} />;
}
