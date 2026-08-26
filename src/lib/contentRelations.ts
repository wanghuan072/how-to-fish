import { achievements, fish, getCollection, getFishImage, getFishImageAlt, isBossCreature } from "@/lib/content";
import { islandProgression } from "@/lib/gameplayData";
import type { CollectionKey, ContentEntry } from "@/types/content";

export type RelationItem = {
  title: string;
  href: string;
  meta: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

export type RelationGroup = {
  id: string;
  title: string;
  description: string;
  items: RelationItem[];
};

type RelationSpec = {
  creatures?: string[];
  items?: string[];
  bait?: string[];
  npcs?: string[];
  quests?: string[];
  bosses?: string[];
  islands?: string[];
  weapons?: string[];
  rods?: string[];
  achievements?: string[];
  rewards?: Array<{ title: string; description: string }>;
};

export const questRelations: Record<string, RelationSpec> = {
  "who-stole-my-beer": {
    creatures: ["spider-crab"],
    items: ["beer-can", "radar"],
    bait: ["empty-beer-can"],
    npcs: ["lighthouse-keeper"],
    achievements: ["Who stole my beer"],
    rewards: [{ title: "Boat key and Radar access", description: "The Lighthouse return hand-in unlocks the boat route; the Radar is then bought for $10." }],
  },
  dinnertime: {
    creatures: ["giant-piranha"],
    items: ["modified-leech"],
    bait: ["modified-leech"],
    npcs: ["forest-lake-lady"],
    achievements: ["Dinnertime"],
    rewards: [{ title: "Desert Island coordinates", description: "Return the Giant Piranha trophy to advance the Radar route to Island 3." }],
  },
  vacation: {
    creatures: ["needlefish", "pufferfish"],
    items: ["carrot"],
    bait: ["standard-lure", "carrot"],
    npcs: ["desert-tourist"],
    achievements: ["Vacation"],
    rewards: [{ title: "Rocks Island coordinates", description: "Return the Pufferfish fin to reveal the red Island 4 marker." }],
  },
  grillmaster: {
    creatures: ["blue-shark"],
    bait: ["standard-boss-lure"],
    npcs: ["grillmaster"],
    achievements: ["Grillmaster", "Yummy in my tummy"],
    rewards: [{ title: "Grill unlocked", description: "Deliver Blue Shark to start the grill; cooked catches can gain value before they burn." }],
  },
  "terrorizing-bird": {
    creatures: ["tuna", "albatross"],
    bait: ["professional-boss-lure"],
    npcs: ["rocks-shop-npc"],
    achievements: ["Terrorizing bird"],
    rewards: [{ title: "Volcano Island coordinates", description: "Keep the Tuna, use it to draw the Albatross, then return the bird's head." }],
  },
  "deadliest-catch": {
    creatures: ["bowhead-whale", "mutated-bowhead-whale"],
    items: ["fish-bucket"],
    bait: ["fish-bucket"],
    achievements: ["Deadliest catch", "We are so back", "Handyman", "Bean"],
    rewards: [{ title: "Story completion", description: "The Bowhead-to-mutated-whale chain completes the five-island launch route." }],
  },
};

export const bossRelations: Record<string, RelationSpec> = {
  "spider-crab": { items: ["beer-can"], bait: ["empty-beer-can"], quests: ["who-stole-my-beer"], achievements: ["Who stole my beer"], rewards: [{ title: "Spider Crab quest result", description: "Keep the named quest result and return it to the Lighthouse Keeper for the boat key." }] },
  sunfish: { bait: ["beginner-boss-lure"], achievements: ["Competitive eating", "Collector"], rewards: [{ title: "Optional encyclopedia entry", description: "Sunfish counts toward the creature collection but does not drop an item needed to unlock another island." }] },
  "old-pike": { bait: ["beginner-boss-lure"], achievements: ["Collector"], rewards: [{ title: "Optional encyclopedia entry", description: "The Old Pike counts toward the creature collection but does not drop an item needed to unlock another island." }] },
  "giant-piranha": { items: ["modified-leech"], bait: ["modified-leech"], quests: ["dinnertime"], achievements: ["Dinnertime"], rewards: [{ title: "Giant Piranha trophy", description: "Return the named trophy to the lady by the lake for Desert Island coordinates." }] },
  pufferfish: { items: ["carrot"], bait: ["carrot"], quests: ["vacation"], achievements: ["Vacation"], rewards: [{ title: "Pufferfish fin", description: "Return the fin to the Desert Tourist to reveal Rocks Island." }] },
  "blue-shark": { bait: ["standard-boss-lure"], quests: ["grillmaster"], achievements: ["Grillmaster"], rewards: [{ title: "Blue Shark body", description: "Take the defeated shark to the Grillmaster to unlock cooking." }] },
  tuna: { bait: ["professional-boss-lure"], quests: ["terrorizing-bird"], achievements: ["Terrorizing bird"], rewards: [{ title: "Defeated Tuna", description: "Keep the body intact and place it on land to trigger Albatross." }] },
  albatross: { quests: ["terrorizing-bird"], achievements: ["Terrorizing bird"], rewards: [{ title: "Albatross head", description: "Return the head to the Rocks Shop NPC for Volcano Island coordinates." }] },
  "goblin-shark": { bait: ["scientific-boss-lure"], achievements: ["Collector"], rewards: [{ title: "Optional encyclopedia entry", description: "Goblin Shark counts toward the creature collection but is not part of the story route." }] },
  "bowhead-whale": { items: ["fish-bucket"], bait: ["fish-bucket"], quests: ["deadliest-catch"], achievements: ["Deadliest catch"], rewards: [{ title: "Defeated Bowhead Whale", description: "Keep the body intact and carry it into the Volcano final trigger." }] },
  "mutated-bowhead-whale": { quests: ["deadliest-catch"], achievements: ["We are so back", "Handyman", "Bean"], rewards: [{ title: "Story completion", description: "Defeating the mutated phase completes the five-island route and opens cleanup play." }] },
};

const islandRelations: Record<string, RelationSpec> = {
  lighthouse: {
    npcs: ["lighthouse-keeper", "melvin"],
    items: ["beer-can", "radar", "boat-engine"],
    quests: ["who-stole-my-beer"],
    weapons: ["brass-knuckles", "knife"],
    achievements: ["Getting started", "Who stole my beer", "Getting an upgrade"],
  },
  "island-2-forest": {
    npcs: ["forest-lake-lady"],
    items: ["modified-leech"],
    quests: ["dinnertime"],
    weapons: ["pistol", "shotgun", "dynamite"],
    achievements: ["Dinnertime", "Let me go"],
  },
  "island-3-desert": {
    npcs: ["desert-tourist", "grillmaster"],
    items: ["carrot"],
    quests: ["vacation", "grillmaster"],
    weapons: ["smg"],
    achievements: ["Vacation", "Grillmaster", "Yummy in my tummy", "GOLD GOLD GOLD"],
  },
  "island-4-rocks": {
    npcs: ["rocks-shop-npc"],
    bait: ["professional-lure", "professional-boss-lure"],
    quests: ["terrorizing-bird"],
    weapons: ["sniper-rifle"],
    achievements: ["Terrorizing bird"],
  },
  "island-5-volcano": {
    items: ["fish-bucket"],
    bait: ["scientific-lure", "scientific-boss-lure", "fish-bucket"],
    quests: ["deadliest-catch"],
    weapons: ["assault-rifle"],
    achievements: ["Deadliest catch", "We are so back", "Handyman", "Bean"],
  },
};

const weaponRelations: Record<string, RelationSpec> = {
  pistol: { islands: ["island-2-forest"], achievements: ["Getting started", "Noob"] },
  shotgun: { islands: ["island-2-forest"], bosses: ["old-pike", "giant-piranha", "tuna"] },
  "sniper-rifle": { islands: ["island-4-rocks"], bosses: ["albatross"], achievements: ["360 no scope", "Impressive"] },
  "assault-rifle": { islands: ["island-5-volcano"], bosses: ["bowhead-whale", "mutated-bowhead-whale"] },
  dynamite: { islands: ["island-2-forest"], achievements: ["I'm the bird now", "Everyone's dream"] },
  "brass-knuckles": { islands: ["lighthouse"], achievements: ["Noob"] },
  knife: { islands: ["lighthouse"], achievements: ["Noob"] },
  smg: { islands: ["island-3-desert"], bosses: ["blue-shark", "albatross"] },
};

const itemRelations: Record<string, RelationSpec> = {
  radar: { islands: ["lighthouse", "island-2-forest", "island-3-desert", "island-4-rocks", "island-5-volcano"], quests: ["who-stole-my-beer"] },
  "beer-can": { creatures: ["spider-crab"], bait: ["empty-beer-can"], npcs: ["lighthouse-keeper"], quests: ["who-stole-my-beer"], bosses: ["spider-crab"], islands: ["lighthouse"], achievements: ["Who stole my beer"], rods: ["crab-fishing-rod"] },
  "modified-leech": { creatures: ["giant-piranha"], bait: ["modified-leech"], npcs: ["forest-lake-lady"], quests: ["dinnertime"], bosses: ["giant-piranha"], islands: ["island-2-forest"], achievements: ["Dinnertime"], rods: ["fishing-rod"] },
  carrot: { creatures: ["needlefish", "pufferfish"], bait: ["standard-lure", "carrot"], npcs: ["desert-tourist"], quests: ["vacation"], bosses: ["pufferfish"], islands: ["island-3-desert"], achievements: ["Vacation"], rods: ["fishing-rod"] },
  "fish-bucket": { creatures: ["bowhead-whale", "mutated-bowhead-whale"], bait: ["fish-bucket"], quests: ["deadliest-catch"], bosses: ["bowhead-whale", "mutated-bowhead-whale"], islands: ["island-5-volcano"], achievements: ["Deadliest catch", "We are so back"], rods: ["fishing-rod"] },
  "boat-engine": { islands: ["lighthouse", "island-2-forest", "island-3-desert", "island-4-rocks", "island-5-volcano"], achievements: ["Getting an upgrade", "I am speed"] },
};

const npcRelations: Record<string, RelationSpec> = {
  "lighthouse-keeper": { creatures: ["spider-crab"], items: ["beer-can", "radar"], bait: ["empty-beer-can"], quests: ["who-stole-my-beer"], bosses: ["spider-crab"], islands: ["lighthouse"], achievements: ["Who stole my beer"] },
  melvin: { islands: ["lighthouse"] },
  "forest-lake-lady": { creatures: ["giant-piranha"], items: ["modified-leech"], bait: ["modified-leech"], quests: ["dinnertime"], bosses: ["giant-piranha"], islands: ["island-2-forest"], achievements: ["Dinnertime"] },
  "desert-tourist": { creatures: ["needlefish", "pufferfish"], items: ["carrot"], bait: ["standard-lure", "carrot"], quests: ["vacation"], bosses: ["pufferfish"], islands: ["island-3-desert"], achievements: ["Vacation"] },
  grillmaster: { creatures: ["blue-shark"], bait: ["standard-boss-lure"], quests: ["grillmaster"], bosses: ["blue-shark"], islands: ["island-3-desert"], achievements: ["Grillmaster", "Yummy in my tummy"] },
  "rocks-shop-npc": { creatures: ["tuna", "albatross"], bait: ["professional-boss-lure"], quests: ["terrorizing-bird"], bosses: ["tuna", "albatross"], islands: ["island-4-rocks"], achievements: ["Terrorizing bird"] },
};

const questNames = new Map(getCollection("quests").map((entry) => [entry.slug, entry]));

export const questForFish = Object.entries(questRelations).reduce<Record<string, string[]>>((result, [questSlug, relation]) => {
  relation.creatures?.forEach((fishSlug) => {
    result[fishSlug] = [...(result[fishSlug] ?? []), questSlug];
  });
  return result;
}, {});

export const achievementsForFish: Record<string, string[]> = {
  "spider-crab": ["Who stole my beer"],
  "giant-piranha": ["Dinnertime"],
  needlefish: ["Vacation"],
  pufferfish: ["Vacation"],
  "blue-shark": ["Grillmaster"],
  tuna: ["Terrorizing bird"],
  albatross: ["Terrorizing bird"],
  "bowhead-whale": ["Deadliest catch"],
  "mutated-bowhead-whale": ["We are so back", "Handyman", "Bean"],
};

function anchor(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function contentItem(collection: CollectionKey, slug: string, meta: string): RelationItem | null {
  const entry = getCollection(collection).find((candidate) => candidate.slug === slug);
  if (!entry) return null;
  const prefix = ["weapons", "items", "bait", "npcs"].includes(collection) ? `/wiki/${collection}` : `/${collection}`;
  return {
    title: entry.name,
    href: `${prefix}/${entry.slug}/`,
    meta,
    description: entry.description,
    image: entry.image,
    imageAlt: entry.imageAlt,
  };
}

function achievementItem(name: string): RelationItem | null {
  const entry = achievements.find((candidate) => candidate.name === name);
  if (!entry) return null;
  return {
    title: entry.name,
    href: `/wiki/achievements/#${anchor(entry.name)}`,
    meta: "Achievement",
    description: entry.description,
    image: entry.image,
    imageAlt: entry.imageAlt,
  };
}

function fishItem(slug: string): RelationItem | null {
  const entry = fish.find((candidate) => candidate.slug === slug);
  if (!entry) return null;
  return {
    title: entry.name,
    href: isBossCreature(entry) ? `/bosses/${entry.slug}/` : `/fish/${entry.slug}/`,
    meta: `${entry.category} · ${entry.islandName}`,
    description: `${entry.rod} · ${entry.lure}`,
    image: getFishImage(entry),
    imageAlt: getFishImageAlt(entry),
  };
}

function rodItem(slug: string): RelationItem {
  const crab = slug === "crab-fishing-rod";
  return {
    title: crab ? "Crab Fishing Rod" : "Fishing Rod",
    href: `/wiki/rods-and-lures/#${slug}`,
    meta: "Rod",
    description: crab ? "Opening rod for Lighthouse pools and the first story trigger." : "Main rod for regular, boss and story bait routes.",
  };
}

function mechanicsItem(): RelationItem {
  return {
    title: "Weapons & attachment slots",
    href: "/wiki/weapons/",
    meta: "Equipment",
    description: "Weapon roles, the four attachment slots and the Fully equipped requirement.",
  };
}

function group(id: string, title: string, description: string, items: Array<RelationItem | null>): RelationGroup | null {
  const available = items.filter((item): item is RelationItem => Boolean(item));
  return available.length ? { id, title, description, items: available } : null;
}

function buildGroups(spec: RelationSpec, context: "quest" | "boss" | "island"): RelationGroup[] {
  const rewardHref = context === "quest" ? "#steps" : spec.quests?.[0] ? `/quests/${spec.quests[0]}/` : "#rewards";
  const groups = [
    group("related-creatures", "Related creatures", "Creatures caught, defeated or handed in during this route.", (spec.creatures ?? []).map(fishItem)),
    group("required-items", "Required items and lures", "Check each item and lure before starting the objective.", [
      ...(spec.items ?? []).map((slug) => contentItem("items", slug, "Quest item")),
      ...(spec.bait ?? []).map((slug) => contentItem("bait", slug, "Bait / trigger")),
    ]),
    group("available-weapons", "Weapons available at this stage", "Shop and progression weapons associated with this island stage.", (spec.weapons ?? []).map((slug) => contentItem("weapons", slug, "Available weapon"))),
    group("quest-links", "Quest links", "Quests that start, advance or finish this encounter.", (spec.quests ?? []).map((slug) => contentItem("quests", slug, "Quest"))),
    group("npcs", "NPCs", "Characters involved in accepting, advancing or completing this route.", (spec.npcs ?? []).map((slug) => contentItem("npcs", slug, "NPC"))),
    group("rewards", "Rewards and hand-ins", "Items to keep, NPC hand-ins and the next route unlocked.", (spec.rewards ?? []).map((reward) => ({ ...reward, href: rewardHref, meta: "Progression result" }))),
    group("achievements", "Related achievements", "Achievements whose objective directly uses this route or encounter.", (spec.achievements ?? []).map(achievementItem)),
  ];
  return groups.filter((item): item is RelationGroup => Boolean(item));
}

function buildWikiGroups(spec: RelationSpec, includeMechanics = false): RelationGroup[] {
  const creatureSlugs = [...new Set([...(spec.creatures ?? []), ...(spec.bosses ?? []).filter((slug) => fish.some((entry) => entry.slug === slug))])];
  const islandSlugs = [...new Set([...(spec.islands ?? []), ...creatureSlugs.map((slug) => fish.find((entry) => entry.slug === slug)?.islandSlug).filter((slug): slug is string => Boolean(slug))])];
  const questSlugs = [...new Set([...(spec.quests ?? []), ...(spec.bosses ?? []).flatMap((slug) => bossRelations[slug]?.quests ?? [])])];
  const groups = [
    group("related-creatures", "Related creatures", "Fish and encounters that use this item or equipment.", creatureSlugs.map(fishItem)),
    group("route-links", "Island and rod routes", "Where this entry is used and which rod is paired with it.", [
      ...islandSlugs.map((slug) => contentItem("islands", slug, "Island")),
      ...(spec.rods ?? []).map(rodItem),
    ]),
    group("encounters-and-quests", "Bosses and quests", "Where this item or equipment appears in the route.", [
      ...(spec.bosses ?? []).map((slug) => contentItem("bosses", slug, "Boss encounter")),
      ...questSlugs.map((slug) => contentItem("quests", slug, "Quest")),
    ]),
    group("equipment-links", "Connected equipment", "Items, bait and weapons used in the same route.", [
      ...(spec.items ?? []).map((slug) => contentItem("items", slug, "Item")),
      ...(spec.bait ?? []).map((slug) => contentItem("bait", slug, "Bait / lure")),
      ...(spec.weapons ?? []).map((slug) => contentItem("weapons", slug, "Weapon")),
      ...(includeMechanics ? [mechanicsItem()] : []),
    ]),
    group("npcs", "Related NPCs", "Characters who give, trade or receive this entry.", (spec.npcs ?? []).map((slug) => contentItem("npcs", slug, "NPC"))),
    group("achievements", "Related achievements", "Achievements whose requirement directly uses this item, route or encounter.", (spec.achievements ?? []).map(achievementItem)),
  ];
  return groups.filter((item): item is RelationGroup => Boolean(item));
}

function baitRelations(entry: ContentEntry): RelationSpec {
  const creatures = entry.catchSlugs ?? [];
  const caught = creatures.map((slug) => fish.find((candidate) => candidate.slug === slug)).filter((item): item is (typeof fish)[number] => Boolean(item));
  const quests = Object.entries(questRelations).filter(([, spec]) => spec.bait?.includes(entry.slug)).map(([slug]) => slug);
  const bosses = Object.entries(bossRelations).filter(([, spec]) => spec.bait?.includes(entry.slug)).map(([slug]) => slug);
  const npcs = Object.entries(npcRelations).filter(([, spec]) => spec.bait?.includes(entry.slug)).map(([slug]) => slug);
  const item = getCollection("items").some((candidate) => candidate.slug === entry.slug) ? [entry.slug] : [];
  const achievementNames = [
    ...quests.flatMap((slug) => questRelations[slug]?.achievements ?? []),
    ...bosses.flatMap((slug) => bossRelations[slug]?.achievements ?? []),
    ...(creatures.length ? ["Collector", "Drip", "Fishipedia"] : []),
  ];
  return {
    creatures,
    islands: [...new Set(caught.map((item) => item.islandSlug))],
    rods: [...new Set(caught.map((item) => item.rod === "Crab Fishing Rod" ? "crab-fishing-rod" : item.rod === "Fishing Rod" ? "fishing-rod" : "").filter(Boolean))],
    quests,
    bosses,
    npcs,
    items: item,
    achievements: [...new Set(achievementNames)],
  };
}

export function getRelationGroups(collection: CollectionKey, entry: ContentEntry): RelationGroup[] {
  if (collection === "quests") return buildGroups(questRelations[entry.slug] ?? {}, "quest");
  if (collection === "bosses") {
    const spec = bossRelations[entry.slug] ?? {};
    return buildGroups(spec, "boss");
  }
  if (collection === "islands") {
    const creatures = fish.filter((item) => item.islandSlug === entry.slug).map((item) => item.slug);
    const groups = buildGroups({ creatures, ...(islandRelations[entry.slug] ?? {}) }, "island");
    const progression = islandProgression[entry.slug];
    if (progression?.next) {
      const next = contentItem("islands", progression.next.slug, "Next island");
      const nextQuestSlug = progression.nextQuestHref?.split("/").filter(Boolean).at(-1);
      const nextQuest = nextQuestSlug ? contentItem("quests", nextQuestSlug, "Required quest") : null;
      if (next) groups.unshift({
        id: "next-island",
        title: `Unlock ${progression.next.name}`,
        description: progression.nextUnlockRequirement ?? progression.unlockRequirement,
        items: [
          ...(nextQuest ? [nextQuest] : []),
          { ...next, description: `Complete the checklist above, finish the return hand-in, then follow the next Radar marker to ${progression.next.name}.` },
        ],
      });
    }
    if (progression?.previous) {
      const previous = contentItem("islands", progression.previous.slug, "Previous island");
      if (previous) groups.push({ id: "previous-island", title: "Previous stage", description: "Return to the preceding island if the current Radar marker or quest chain is incomplete.", items: [previous] });
    }
    return groups;
  }
  if (collection === "weapons") return buildWikiGroups(weaponRelations[entry.slug] ?? {}, true);
  if (collection === "items") return buildWikiGroups(itemRelations[entry.slug] ?? {});
  if (collection === "bait") return buildWikiGroups(baitRelations(entry));
  if (collection === "npcs") return buildWikiGroups(npcRelations[entry.slug] ?? {});
  return [];
}

export function getFishRelationItems(slug: string) {
  const achievementNames = [...new Set([...(achievementsForFish[slug] ?? []), "Collector", "Fishipedia", "Drip"])];
  return {
    quests: (questForFish[slug] ?? []).map((questSlug) => contentItem("quests", questSlug, "Quest")).filter((item): item is RelationItem => Boolean(item)),
    achievements: achievementNames.map(achievementItem).filter((item): item is RelationItem => Boolean(item)),
  };
}

const achievementExtras: Record<string, RelationItem[]> = {
  "Getting started": [{ title: "Fish list", href: "/fish/", meta: "Creature checklist", description: "Choose any opening creature and complete the catch-and-kill loop." }],
  Drip: [{ title: "Fish list", href: "/fish/", meta: "Creature routes", description: "Match each base creature to its island, rod and bait before hunting the rare variant." }],
  Noob: [{ title: "Beginner Guide", href: "/guides/beginner-guide/", meta: "Guide", description: "Learn the opening catch, combat and selling loop." }],
  Impressive: [{ title: "Weapons", href: "/wiki/weapons/", meta: "Equipment", description: "Choose a weapon that makes style-condition attempts easier to control." }],
  "GOLD GOLD GOLD": [{ title: "Desert Island", href: "/islands/island-3-desert/", meta: "Island route", description: "Find the grill and economy systems used during high-value sale attempts." }],
  "360 no scope": [{ title: "Sniper Rifle", href: "/wiki/weapons/sniper-rifle/", meta: "Weapon", description: "Use the precision weapon tied to no-scope attempts." }],
  "Fully equipped": [{ title: "Weapons & attachments", href: "/wiki/weapons/", meta: "Equipment", description: "Choose a firearm before filling its magazine, laser, optic and muzzle slots." }],
  "All in": [{ title: "Desert Island", href: "/islands/island-3-desert/", meta: "Island route", description: "The Reel of Fortune challenge is part of the Desert Island economy route." }],
  Easy: [{ title: "Boss guides", href: "/bosses/", meta: "Encounter directory", description: "Return to an early encounter with a stronger loadout for the ten-second kill." }],
  "I'm the bird now": [{ title: "Dynamite", href: "/wiki/weapons/dynamite/", meta: "Weapon", description: "Boat physics and explosive placement control the launch attempt." }],
  Collector: [
    { title: "Fish list", href: "/fish/", meta: "Non-boss checklist", description: "All non-boss fish and creatures appear together on one page." },
    { title: "Boss list", href: "/bosses/", meta: "Encounter checklist", description: "Story bosses, optional mini-bosses and the final encounter are listed separately." },
  ],
  "Rich! Millionaire": [{ title: "Desert Island", href: "/islands/island-3-desert/", meta: "Island route", description: "Use cooking and the Reel of Fortune route for the high-value sale." }],
  Fishipedia: [{ title: "Fish list", href: "/fish/", meta: "Creature checklist", description: "Use each base creature route while cleaning up the separate Drip entries." }],
  Bean: [{ title: "Full Walkthrough", href: "/guides/full-walkthrough/", meta: "Speed route", description: "Practice only the five-island progression-critical objectives." }],
};

export function getAchievementRelationItems(name: string): RelationItem[] {
  const items: RelationItem[] = [];
  const appendReverse = (collection: CollectionKey, records: Record<string, RelationSpec>, meta: string) => {
    Object.entries(records).forEach(([slug, spec]) => {
      if (!spec.achievements?.includes(name)) return;
      const item = contentItem(collection, slug, meta);
      if (item) items.push(item);
    });
  };
  appendReverse("quests", questRelations, "Quest");
  appendReverse("bosses", bossRelations, "Boss encounter");
  appendReverse("islands", islandRelations, "Island");
  appendReverse("weapons", weaponRelations, "Weapon");
  appendReverse("items", itemRelations, "Item");
  appendReverse("npcs", npcRelations, "NPC");
  items.push(...(achievementExtras[name] ?? []));
  return [...new Map(items.map((item) => [item.href, item])).values()].slice(0, 6);
}

export function getQuestName(slug: string) {
  return questNames.get(slug)?.name ?? slug;
}
