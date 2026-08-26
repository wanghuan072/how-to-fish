import type { FishEntry } from "@/types/content";

export type InternalRecordLink = {
  name: string;
  href: string;
  kind: "Rod" | "Bait" | "Fish" | "Quest" | "Boss" | "Island";
};

const baitRoutes: Record<string, InternalRecordLink[]> = {
  "Hot Dog": [{ name: "Hot Dog", href: "/wiki/bait-and-lures/hot-dog/", kind: "Bait" }],
  "Beginner Lure": [{ name: "Beginner Lure", href: "/wiki/bait-and-lures/beginner-lure/", kind: "Bait" }],
  "Beginner Boss Lure": [{ name: "Beginner Boss Lure", href: "/wiki/bait-and-lures/beginner-boss-lure/", kind: "Bait" }],
  "Leech Bait": [{ name: "Leech Bait", href: "/wiki/bait-and-lures/modified-leech/", kind: "Bait" }],
  Coconut: [{ name: "Coconut", href: "/wiki/bait-and-lures/coconut/", kind: "Bait" }],
  "Standard Lure": [{ name: "Standard Lure", href: "/wiki/bait-and-lures/standard-lure/", kind: "Bait" }],
  "Standard Boss Lure": [{ name: "Standard Boss Lure", href: "/wiki/bait-and-lures/standard-boss-lure/", kind: "Bait" }],
  Carrot: [{ name: "Carrot", href: "/wiki/bait-and-lures/carrot/", kind: "Bait" }],
  "Professional Lure": [{ name: "Professional Lure", href: "/wiki/bait-and-lures/professional-lure/", kind: "Bait" }],
  "Professional Boss Lure": [{ name: "Professional Boss Lure", href: "/wiki/bait-and-lures/professional-boss-lure/", kind: "Bait" }],
  "Scientific Lure": [{ name: "Scientific Lure", href: "/wiki/bait-and-lures/scientific-lure/", kind: "Bait" }],
  "Scientific Boss Lure": [{ name: "Scientific Boss Lure", href: "/wiki/bait-and-lures/scientific-boss-lure/", kind: "Bait" }],
  "Fish Bucket / Whale Bait": [{ name: "Fish Bucket / Whale Bait", href: "/wiki/bait-and-lures/fish-bucket/", kind: "Bait" }],
  "Empty Beer Can": [{ name: "Empty Beer Can", href: "/wiki/bait-and-lures/empty-beer-can/", kind: "Bait" }],
  "Defeated Tuna": [{ name: "Defeated Tuna", href: "/bosses/tuna/", kind: "Boss" }],
  "Defeated Bowhead Whale": [{ name: "Defeated Bowhead Whale", href: "/bosses/bowhead-whale/", kind: "Boss" }],
};

export const questFishSlugs: Record<string, string[]> = {
  "who-stole-my-beer": ["spider-crab"],
  dinnertime: ["giant-piranha"],
  vacation: ["needlefish", "seahorse", "pufferfish"],
  grillmaster: ["blue-shark"],
  "terrorizing-bird": ["tuna", "albatross"],
  "deadliest-catch": ["mutated-bowhead-whale"],
  "scientists-whale-bait": ["bowhead-whale", "mutated-bowhead-whale"],
};

const questNames: Record<string, string> = {
  "who-stole-my-beer": "Who Stole My Beer?",
  dinnertime: "Dinnertime & the Leech Route",
  vacation: "Vacation & Pufferfish Route",
  grillmaster: "Grillmaster & Blue Shark",
  "terrorizing-bird": "Terrorizing Bird",
  "deadliest-catch": "Deadliest Catch Military Route",
  "scientists-whale-bait": "Scientist's Whale Bait & Final Route",
};

const preciseAreas: Record<string, string> = {
  clam: "Lighthouse opening grounds",
  "brown-crab": "Lighthouse starting pool",
  "spider-crab": "Lighthouse story encounter waters",
  "giant-piranha": "Forest Island lake quest waters",
  pufferfish: "Desert Island story encounter waters",
  albatross: "Rocks Island Terrorizing Bird encounter",
  "bowhead-whale": "Volcano Island scientist route waters",
  "mutated-bowhead-whale": "Volcano Island final encounter",
};

export function getFishBaitLinks(entry: FishEntry) {
  if (entry.catchMethods?.length) {
    return [...new Map(entry.catchMethods
      .filter((method) => method.baitSlug)
      .map((method) => [method.baitSlug, {
        name: method.baitName,
        href: `/wiki/bait-and-lures/${method.baitSlug}/`,
        kind: "Bait" as const,
      }])).values()];
  }
  return baitRoutes[entry.lure] ?? [];
}

export function getFishArea(entry: FishEntry) {
  return preciseAreas[entry.slug] ?? `${entry.islandName} fishing waters`;
}

export function getFishQuestLinks(entry: FishEntry): InternalRecordLink[] {
  return Object.entries(questFishSlugs)
    .filter(([, fishSlugs]) => fishSlugs.includes(entry.slug))
    .map(([questSlug]) => ({
      name: questNames[questSlug],
      href: `/quests/${questSlug}/`,
      kind: "Quest" as const,
    }));
}

export function getFishBossLink(entry: FishEntry): InternalRecordLink | null {
  if (!["Boss", "Mini-boss", "Final encounter"].includes(entry.category)) return null;
  return { name: `${entry.name} encounter guide`, href: `/bosses/${entry.slug}/`, kind: "Boss" };
}

export function getFishCatchMethod(entry: FishEntry) {
  if (entry.catchMethods?.some((method) => method.methodType === "Ground pickup")) return "Ground pickup";
  if (entry.catchMethods?.some((method) => method.methodType === "Encounter trigger")) return "Story creature trigger";
  if (entry.catchMethods?.some((method) => method.methodType === "Unconfirmed")) return "Catch method unconfirmed";
  if (entry.catchMethods?.every((method) => method.methodType === "Default pool")) return "Starter pool catch";
  if (entry.category === "Boss" || entry.category === "Final encounter") return "Quest encounter";
  if (entry.category === "Mini-boss" || entry.catchMethods?.some((method) => method.baitName.includes("Boss Lure"))) return "Boss-lure catch";
  return "Rod catch";
}

export function getFishRodLink(entry: FishEntry): InternalRecordLink | null {
  if (entry.rod === "None") return null;
  const anchor = entry.rod === "Crab Fishing Rod" ? "crab-fishing-rod" : "fishing-rod";
  return { name: entry.rod, href: `/wiki/bait-and-lures/#${anchor}`, kind: "Rod" };
}

export function getFishRecordLinks(entry: FishEntry): InternalRecordLink[] {
  const boss = getFishBossLink(entry);
  const rod = getFishRodLink(entry);
  return [
    { name: entry.islandName, href: `/islands/${entry.islandSlug}/`, kind: "Island" },
    ...(rod ? [rod] : []),
    ...getFishBaitLinks(entry),
    ...getFishQuestLinks(entry),
    ...(boss ? [boss] : []),
  ];
}
