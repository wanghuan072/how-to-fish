import achievementsJson from "@/data/achievements.json";
import baitJson from "@/data/bait.json";
import { baitGameData, defaultCatchPools } from "@/data/baitGameData";
import bossesJson from "@/data/bosses.json";
import fishJson from "@/data/fish.json";
import fishValuesJson from "@/data/fish-values.json";
import guidesJson from "@/data/guides.json";
import islandsJson from "@/data/islands.json";
import itemsJson from "@/data/items.json";
import npcsJson from "@/data/npcs.json";
import questsJson from "@/data/quests.json";
import sourcesJson from "@/data/sources.json";
import updatesJson from "@/data/updates.json";
import weaponsJson from "@/data/weapons.json";
import { getFishArea, getFishCatchMethod } from "@/lib/fishRelations";
import type {
  AchievementEntry,
  CollectionKey,
  ContentEntry,
  FishEntry,
  FishCatchMethod,
  IslandEntry,
  SearchItem,
  SourceEntry,
} from "@/types/content";

const islandNames: Record<string, string> = {
  lighthouse: "Lighthouse",
  "island-2-forest": "Forest Island (Island 2)",
  "island-3-desert": "Desert Island (Island 3)",
  "island-4-rocks": "Rocks Island (Island 4)",
  "island-5-volcano": "Volcano Island (Island 5)",
};

function extractedCatchMethods(entry: FishEntry): FishCatchMethod[] {
  const defaultMethods: FishCatchMethod[] = defaultCatchPools.flatMap((pool) => {
    const catchable = pool.catchables.find((item) => item.slug === entry.slug);
    if (!catchable) return [];
    return [{
      baitName: pool.name,
      islandSlug: pool.islandSlug,
      islandName: islandNames[pool.islandSlug],
      rod: pool.rod,
      methodType: "Default pool" as const,
      rawWeight: catchable.weight,
      poolShare: catchable.poolShare,
      catchTimeSeconds: pool.catchTimeSeconds,
      lostOnBaitChance: 0,
      requireReeling: pool.rod === "Fishing Rod",
    }];
  });
  const baitMethods: FishCatchMethod[] = baitGameData.flatMap((bait) => {
    const catchable = bait.catchables.find((item) => item.slug === entry.slug);
    if (!catchable) return [];
    return [{
      baitSlug: bait.slug,
      baitName: bait.sourceName,
      islandSlug: bait.islandSlug,
      islandName: islandNames[bait.islandSlug],
      rod: bait.requireReeling ? "Fishing Rod" : "Crab Fishing Rod",
      methodType: bait.kind,
      price: bait.price ?? undefined,
      rawWeight: catchable.weight,
      poolShare: catchable.poolShare,
      catchTimeSeconds: bait.catchTimeSeconds,
      lostOnBaitChance: bait.lostOnBaitChance,
      requireReeling: bait.requireReeling,
    }];
  });
  return [...defaultMethods, ...baitMethods];
}

function fallbackCatchMethod(entry: FishEntry): FishCatchMethod {
  const groundPickup = entry.lure.toLowerCase().includes("ground pickup");
  const encounterTrigger = entry.lure.startsWith("Defeated ");
  return {
    baitName: entry.lure,
    islandSlug: entry.islandSlug,
    islandName: entry.islandName,
    rod: entry.rod,
    methodType: groundPickup ? "Ground pickup" : encounterTrigger ? "Encounter trigger" : "Default pool",
    price: entry.lureCost,
  };
}

const publishedGuideSlugs = new Set(["beginner-guide", "full-walkthrough"]);
const publishedGuides = (guidesJson as ContentEntry[]).filter((entry) => publishedGuideSlugs.has(entry.slug));

const contentCollections = {
  guides: publishedGuides,
  quests: questsJson,
  bosses: bossesJson,
  islands: islandsJson,
  weapons: weaponsJson,
  items: itemsJson,
  bait: baitJson,
  npcs: npcsJson,
  updates: updatesJson,
} as unknown as Record<CollectionKey, ContentEntry[]>;

const auditedFishValues = fishValuesJson as Record<string, number>;
export const fish: FishEntry[] = (fishJson as FishEntry[]).map((entry) => {
  const catchMethods = extractedCatchMethods(entry);
  const methods = catchMethods.length ? catchMethods : [fallbackCatchMethod(entry)];
  const primaryMethod = methods.find((method) => method.baitName.includes("Boss Lure")) ?? methods[0];
  const auditedValue = auditedFishValues[entry.slug];
  const sourceKeys = [...entry.sourceKeys];
  if (catchMethods.length && !sourceKeys.includes("game-bait-extract")) sourceKeys.push("game-bait-extract");
  if (auditedValue !== undefined && !sourceKeys.includes("nerdschalk-creature-values")) sourceKeys.push("nerdschalk-creature-values");
  return {
    ...entry,
    ...(catchMethods.length ? {
      islandSlug: primaryMethod.islandSlug,
      islandName: primaryMethod.islandName,
      rod: primaryMethod.rod,
      lure: methods.map((method) => method.baitName).join(" / "),
      lureCost: primaryMethod.price,
      evidence: "Verified" as const,
    } : {}),
    ...(auditedValue !== undefined ? {
      baseValue: auditedValue,
      valueNote: "Base value before cooking and Killscore; the final sale can be higher.",
    } : {}),
    sourceKeys,
    catchMethods: methods,
  };
});
const bossCreatureSlugs = new Set((bossesJson as ContentEntry[]).map((entry) => entry.slug));

export function isBossCreature(entry: FishEntry) {
  return bossCreatureSlugs.has(entry.slug) || ["Boss", "Mini-boss", "Final encounter"].includes(entry.category);
}

export const regularFish = fish.filter((entry) => !isBossCreature(entry));
export const bossCreatures = fish.filter(isBossCreature);
export const islands = (islandsJson as unknown as IslandEntry[]).map((entry) => ({
  ...entry,
  fishCount: fish.filter((creature) => creature.islandSlug === entry.slug).length,
}));
export const achievements = achievementsJson as AchievementEntry[];
export const sources = sourcesJson as SourceEntry[];

export function getSources(keys: string[]) {
  return keys
    .map((key) => sources.find((source) => source.key === key))
    .filter((source): source is SourceEntry => Boolean(source));
}

export function getCollection(key: CollectionKey): ContentEntry[] {
  return contentCollections[key];
}

export function getEntry(key: CollectionKey, slug: string) {
  return getCollection(key).find((entry) => entry.slug === slug);
}

export function getFish(slug: string) {
  return fish.find((entry) => entry.slug === slug);
}

export function getFishImage(entry: FishEntry) {
  if (entry.image) return entry.image;
  return "/images/brand/creature-thumbnail-pending.svg";
}

export function getFishImageAlt(entry: FishEntry) {
  return entry.image
    ? `${entry.name} creature illustration from How to Fish`
    : `No verified in-game creature thumbnail is available for ${entry.name}`;
}

export function getFishContent(entry: FishEntry): ContentEntry {
  const bossLike = isBossCreature(entry);
  const catchMethod = getFishCatchMethod(entry);
  const area = getFishArea(entry);
  const setup = catchMethod === "Ground pickup"
    ? "No rod or bait is required"
    : catchMethod === "Starter pool catch"
      ? `Use ${entry.rod} in the ${entry.lure}; no separate lure is needed`
      : `Use ${entry.rod} with ${entry.lure}`;
  return {
    slug: entry.slug,
    name: entry.name,
    eyebrow: `${entry.category} creature guide`,
    description: `${entry.name} is found in ${area}. ${setup}. Check the route, sell value and any quest or achievement that uses this creature before moving on.`,
    image: getFishImage(entry),
    imageAlt: !entry.image
      ? getFishImageAlt(entry)
      : bossLike
      ? `In-game ${entry.name} encounter image from How to Fish`
      : `${entry.name} creature illustration for How to Fish Wiki`,
    updated: "2026-08-26",
    sourceLabel: `${entry.sourceKeys.length} checked source${entry.sourceKeys.length === 1 ? "" : "s"}`,
    sections: [
      {
        heading: "Quick answer",
        paragraphs: [
          `Go to ${area}. ${setup}. ${
            bossLike
              ? "Finish the island's prerequisite objectives and restock before triggering the encounter."
              : "Fish in clear water and make sure a quest-specific lure has not replaced your regular setup."
          }`,
        ],
      },
      {
        heading: `Where to find ${entry.name}`,
        paragraphs: [
          `${entry.name} appears during the ${entry.islandName} route. Start in ${area}, use the setup below and check the Tab encyclopedia after the kill so you know it counted.`,
        ],
        bullets: [
          `Island: ${entry.islandName}`,
          `Rod: ${entry.rod}`,
          `Target type: ${entry.category}`,
          entry.note ?? "Finish any local dialogue or quest step that controls the fishing area before changing your bait.",
        ],
      },
      {
        heading: `How to catch ${entry.name}`,
        bullets: [
          catchMethod === "Ground pickup" ? "Search the Lighthouse opening grounds and pick the Clam up directly." : catchMethod === "Starter pool catch" ? `Equip ${entry.rod} and work the ${entry.lure}.` : `Equip ${entry.rod} and ${entry.lure}.`,
          catchMethod === "Ground pickup" ? "No casting step or fishing pool is required; pick the creature up from the ground." : catchMethod === "Starter pool catch" ? "No separate lure is needed for this opening-pool catch." : `Stay on ${entry.islandName} rather than changing islands.`,
          bossLike
            ? "Carry enough ammunition and use a weapon you can land consistently."
            : "Land the creature, create fighting space and finish it before starting the next cast.",
          "If the target does not appear, verify the island and active quest state before changing bait.",
        ],
      },
      {
        heading: "Sell value and farming",
        paragraphs: [
          entry.baseValue !== undefined
            ? `${entry.name} starts at ${entry.baseValue.toLocaleString("en-US")} coins before Killscore, cooking and other multipliers. ${entry.valueNote ?? "The final sale can change after the fight."}`
            : `${entry.name} does not have a fixed base value shown here. Check the live value before selling because Killscore, cooking and item condition can change the result.`,
        ],
      },
      {
        heading: "Rare Drip variant",
        paragraphs: [
          `Drip ${entry.name} uses the same bait and island as the normal version. Repeat the usual route, watch for the rainbow name and use the Tab encyclopedia to see whether the rare entry registered.`,
        ],
      },
      {
        heading: "Common mistakes",
        bullets: [
          `Using a lure other than ${entry.lure}.`,
          `Searching the wrong island instead of ${entry.islandName}.`,
          "Selling a creature or item that is still required by an active quest chain.",
          "Following an old price or spawn route after a game update without checking the current result.",
        ],
      },
    ],
    faq: [
      {
        question: `Where is ${entry.name} in How to Fish?`,
        answer: `Launch route data places it on ${entry.islandName}.`,
      },
      {
        question: `What bait catches ${entry.name}?`,
        answer: catchMethod === "Ground pickup" ? "No bait is required; Clam is a ground pickup in the Lighthouse opening area." : catchMethod === "Starter pool catch" ? `Use the ${entry.rod} in the ${entry.lure}; this opening-pool catch does not use a separate lure.` : `The bait or trigger is ${entry.lure}.`,
      },
      {
        question: `What is ${entry.name} worth?`,
        answer: entry.baseValue !== undefined
          ? `The observed raw base value is ${entry.baseValue.toLocaleString("en-US")} coins; Killscore and cooking can change the final sale.`
          : "No fixed base value is shown here, and the final sale can change with Killscore, cooking and item condition.",
      },
    ],
  };
}

export function buildSearchIndex(): SearchItem[] {
  const index: SearchItem[] = [
    ...fish.map((entry) => ({
        title: entry.name,
        href: isBossCreature(entry) ? `/bosses/${entry.slug}/` : `/fish/${entry.slug}/`,
        type: isBossCreature(entry) ? "Boss" : "Fish",
        description: `${entry.islandName} · ${entry.lure}`,
      })),
  ];

  (Object.keys(contentCollections) as CollectionKey[]).forEach((key) => {
    contentCollections[key].forEach((entry) => {
      index.push({
        title: entry.name,
        href: `${key === "weapons" || key === "items" || key === "bait" || key === "npcs" ? `/wiki/${key}` : `/${key}`}/${entry.slug}/`,
        type: key.charAt(0).toUpperCase() + key.slice(1),
        description: entry.description,
      });
    });
  });

  index.push(
    {
      title: "Achievements",
      href: "/wiki/achievements/",
      type: "Wiki",
      description: "All 28 official Steam achievements and concise hints.",
    },
    {
      title: "Rods & Lures",
      href: "/wiki/rods-and-lures/",
      type: "Wiki",
      description: "Rod compatibility, lure tiers, boss bait and the creatures caught by each setup.",
    },
  );
  return index;
}
