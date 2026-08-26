import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/page/detail/ArticleDetailPage";
import { collectionConfig } from "@/config/collections";
import { getCollection, getEntry, getFish } from "@/lib/content";
import { getRelationGroups } from "@/lib/contentRelations";
import { contentDisplayName } from "@/lib/contentNaming";
import { islandProgression, itemRoutes, itemSections, weaponProgression, weaponSections } from "@/lib/gameplayData";
import { getBaitGameData } from "@/data/baitGameData";
import type { CollectionKey, IslandEntry } from "@/types/content";

const islandReach: Record<string, { paragraph: string; bullets: string[] }> = {
  lighthouse: { paragraph: "Lighthouse is the starting area and does not require a Radar coordinate.", bullets: ["Finish the opening creature loop around the Lighthouse.", "Complete Who Stole My Beer? for the boat key.", "Buy the $10 Radar before following later island markers."] },
  "island-2-forest": { paragraph: "Forest Island is the green Radar marker northwest of the Lighthouse.", bullets: ["Complete the Lighthouse Spider Crab hand-in.", "Take the boat key and buy the Radar.", "Follow the green marker to the wooded island."] },
  "island-3-desert": { paragraph: "Desert Island appears as the yellow Radar marker after the Forest story hand-in.", bullets: ["Defeat Giant Piranha with Leech Bait.", "Return its named trophy to the lady by the forest lake.", "Follow the new yellow Radar marker."] },
  "island-4-rocks": { paragraph: "Rocks Island is the red Radar marker unlocked by the Pufferfish route.", bullets: ["Trade Needlefish for the Carrot and defeat Pufferfish.", "Return the Pufferfish fin to the Desert Tourist.", "Follow the red Radar marker to Island 4."] },
  "island-5-volcano": { paragraph: "Volcano Island is the final pink Radar marker in the five-island route.", bullets: ["Defeat Tuna and use its body to trigger Albatross.", "Return the Albatross head to the Rocks Shop NPC.", "Follow the pink Radar marker to the final island."] },
};

function detailFacts(collection: CollectionKey, entry: NonNullable<ReturnType<typeof getEntry>>) {
  const tags = entry.tags ?? [];
  if (collection === "islands") {
    const island = entry as IslandEntry;
    const progression = islandProgression[entry.slug];
    return [
      { label: "Story stage", value: `${island.number} of 5` },
      { label: "Radar marker", value: progression?.marker ?? "Story route" },
      { label: "Encounters", value: island.bossNames.join(", ") },
      { label: "Available weapons", value: `${progression?.weapons.length ?? 0} at this stage` },
    ];
  }
  if (collection === "bosses") {
    const creature = getFish(entry.slug);
    return [
      { label: "Island", value: creature?.islandName ?? tags[1] ?? "Check the route below" },
      { label: "Rod", value: creature?.rod ?? "Story encounter" },
      { label: "Bait / trigger", value: creature?.lure ?? tags[0] ?? "Check the route below" },
      { label: "Raw value", value: creature?.baseValue !== undefined ? `${creature.baseValue.toLocaleString("en-US")} coins` : "No fixed value shown" },
    ];
  }
  if (collection === "quests") return [
    { label: "Quest stage", value: entry.eyebrow ?? "Quest" },
    { label: "Key target", value: tags[0] ?? "See checklist" },
    { label: "Outcome", value: tags[1] ?? "Quest progress" },
    { label: "Flow", value: "Accept · collect · defeat · return" },
  ];
  if (collection === "weapons") {
    const weapon = weaponProgression[entry.slug];
    return [
      { label: "Available at", value: weapon?.availableAt ?? "Check the route below" },
      { label: "Price", value: weapon?.price ?? "No price shown" },
      { label: "Damage", value: weapon?.damage ?? "Version dependent" },
      { label: "Combat role", value: weapon?.role ?? tags[0] ?? "Weapon" },
    ];
  }
  if (collection === "bait") {
    const bait = getBaitGameData(entry.slug);
    if (!bait) return [
      { label: "Record type", value: "Encounter trigger" },
      { label: "Equippable", value: "No" },
      { label: "Target", value: tags[0] ?? "See route" },
      { label: "Handling", value: "Keep the defeated body" },
    ];
    return [
      { label: "Item type", value: bait.bossBait ? "Boss lure" : bait.kind },
      { label: "Price", value: bait.price === null ? "Quest supplied" : `$${bait.price.toLocaleString("en-US")}` },
      { label: "Bite time", value: `${bait.catchTimeSeconds.min}–${bait.catchTimeSeconds.max} seconds` },
      { label: "Bait loss", value: `${bait.lostOnBaitChance}%` },
    ];
  }
  if (collection === "npcs") return [
    { label: "Location", value: tags[0] ?? entry.eyebrow ?? "Check the route below" },
    { label: "Quest role", value: tags[1] ?? "Quest giver" },
    { label: "Role", value: "Quest and progression NPC" },
    { label: "Dialogue flow", value: "Accept · return · speak again" },
  ];
  if (collection === "items") {
    const item = itemRoutes[entry.slug];
    return [
      { label: "Item type", value: entry.eyebrow ?? "Game item" },
      { label: "Found at", value: item?.foundAt ?? tags[0] ?? "Check the route below" },
      { label: "Primary use", value: item?.function ?? tags[1] ?? "Progression" },
      { label: "Handling", value: item?.handling ?? "See item route" },
    ];
  }
  return [
    { label: "Category", value: entry.eyebrow ?? collection },
    { label: "Topic", value: tags[0] ?? "Gameplay" },
    { label: "Route", value: tags[1] ?? "Main use" },
    { label: "Best for", value: "Planning the next objective" },
  ];
}

export function CollectionDetailPage({ collection, slug }: { collection: CollectionKey; slug: string }) {
  const entry = getEntry(collection, slug);
  if (!entry) notFound();
  const config = collectionConfig[collection];
  const prefixIsWiki = config.href.startsWith("/wiki/");
  const relationGroups = getRelationGroups(collection, entry);
  const progression = collection === "islands" ? islandProgression[entry.slug] : undefined;
  const baitData = collection === "bait" ? getBaitGameData(entry.slug) : undefined;
  const displayEntry = collection === "islands" && progression
    ? { ...entry, sections: [
        { heading: entry.slug === "lighthouse" ? "How to start here" : "How to reach this island", paragraphs: [progression.unlockRequirement], bullets: islandReach[entry.slug]?.bullets ?? [] },
        ...entry.sections,
        ...(progression.next ? [{ heading: `How to unlock ${progression.next.name}`, paragraphs: [progression.nextUnlockRequirement ?? progression.unlockRequirement], bullets: progression.steps }] : []),
      ] }
    : collection === "weapons"
      ? { ...entry, sections: [...weaponSections(entry.slug), ...entry.sections] }
      : collection === "items"
        ? { ...entry, sections: [...itemSections(entry.slug), ...entry.sections] }
        : collection === "quests"
          ? { ...entry, sections: [{ heading: "Quest brief", paragraphs: [entry.description] }, ...entry.sections] }
        : collection === "npcs"
          ? { ...entry, sections: [
              ...entry.sections.map((section, index) => index === 0 && entry.slug !== "melvin" ? { ...section, heading: "Quest chain" } : section),
              { heading: "NPC overview", paragraphs: [entry.description] },
            ] }
          : collection === "bait" && baitData
            ? { ...entry, sections: [
                {
                  heading: "Gameplay parameters",
                  paragraphs: ["Pool share compares the targets available from this bait. It does not mean the creature has the same catch chance with another bait or on another island."],
                  bullets: [
                    `Rod: ${baitData.requireReeling ? "Fishing Rod" : "Crab Fishing Rod"}`,
                    `Bite window: ${baitData.catchTimeSeconds.min}–${baitData.catchTimeSeconds.max} seconds`,
                    `Loss chance on bite: ${baitData.lostOnBaitChance}%`,
                    `Reeling required: ${baitData.requireReeling ? "Yes" : "No"}`,
                    baitData.acquisition === "Shop"
                      ? `Shop availability: ${baitData.shopIslandSlugs.map((islandSlug) => (getEntry("islands", islandSlug) as IslandEntry | undefined)?.label ?? islandSlug).join(", ")}`
                      : "Acquisition: complete the linked island bait quest",
                  ],
                },
                {
                  heading: "Catch pool weights",
                  paragraphs: [`This bait can hook ${baitData.catchables.length} target${baitData.catchables.length === 1 ? "" : "s"}. The percentages below add up to the full catch pool for this bait.`],
                  bullets: baitData.catchables.map((catchable) => `${catchable.name}: weight ${catchable.weight}; ${catchable.poolShare.toFixed(catchable.poolShare % 1 ? 2 : 0)}% pool share.`),
                },
                ...entry.sections,
              ] }
          : entry;
  const relationshipDriven = relationGroups.length > 0;
  const related = getCollection(collection)
    .filter((candidate) => candidate.slug !== slug)
    .slice(0, 3)
    .map((candidate) => ({
      title: candidate.name,
      href: `${config.detailPrefix}/${candidate.slug}/`,
      meta: candidate.tags?.[0] ?? "Guide",
      description: candidate.description,
      image: candidate.image,
      imageAlt: candidate.imageAlt,
    }));
  return (
    <ArticleDetailPage
      entry={displayEntry}
      collection={collection}
      path={`${config.detailPrefix}/${entry.slug}/`}
      breadcrumbs={[
        { name: "Home", href: "/" },
        ...(prefixIsWiki ? [{ name: "Wiki", href: "/wiki/" }] : []),
        { name: config.breadcrumb, href: config.href },
        { name: contentDisplayName(collection, entry), href: `${config.detailPrefix}/${entry.slug}/` },
      ]}
      facts={detailFacts(collection, entry)}
      relationGroups={relationGroups}
      related={relationshipDriven ? [] : related}
    />
  );
}
