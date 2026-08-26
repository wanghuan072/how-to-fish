export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContentEntry = {
  slug: string;
  name: string;
  published?: boolean;
  eyebrow?: string;
  description: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  tags?: string[];
  updated?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  sections: ContentSection[];
  faq?: FaqItem[];
  catchSlugs?: string[];
};

export type FishEntry = {
  slug: string;
  name: string;
  aliases?: string[];
  islandSlug: string;
  islandName: string;
  rod: string;
  lure: string;
  lureCost?: number;
  baseValue?: number;
  valueNote?: string;
  category: "Regular" | "Special" | "Boss" | "Mini-boss" | "Final encounter";
  progression?: "Story" | "Optional" | "Collection";
  evidence: "Verified" | "Cross-checked" | "Community";
  sourceKeys: string[];
  note?: string;
  guide?: boolean;
  image?: string;
  imageAlt?: string;
  collectionStatus?: "Confirmed" | "Unconfirmed";
  catchMethods?: FishCatchMethod[];
  creatureGroup?: "Fish" | "Shell creatures" | "Special creatures";
  creatureStatus?: "Journal" | "Ground pickup" | "Ambient" | "Hidden";
  sourceClass?: string;
};

export type FishCatchMethod = {
  baitSlug?: string;
  baitName: string;
  islandSlug: string;
  islandName: string;
  rod: string;
  methodType: "Bait" | "Lure" | "Default pool" | "Ground pickup" | "Encounter trigger" | "Unconfirmed";
  verification: "Unity BaitInfo" | "Gameplay cross-check" | "Route cross-check";
  price?: number;
  rawWeight?: number;
  poolShare?: number;
  catchTimeSeconds?: { min: number; max: number };
  lostOnBaitChance?: number;
  requireReeling?: boolean;
};

export type IslandEntry = ContentEntry & {
  number: number;
  label: string;
  fishCount: number;
  bossNames: string[];
};

export type AchievementEntry = {
  name: string;
  description: string;
  hint: string;
  image: string;
  imageAlt: string;
  globalPercent?: number;
  statsChecked?: string;
  reward?: string;
};

export type SourceEntry = {
  key: string;
  title: string;
  publisher: string;
  url: string;
  tier: "Official" | "Platform data" | "Secondary" | "Gameplay evidence";
  checked: string;
  usedFor: string;
};

export type SearchItem = {
  title: string;
  href: string;
  type: string;
  description: string;
};

export type CollectionKey =
  | "guides"
  | "quests"
  | "bosses"
  | "islands"
  | "weapons"
  | "bait"
  | "npcs"
  | "updates";

export type DirectoryGroup = {
  id: string;
  title: string;
  description: string;
  slugs: string[];
};

export type DirectoryGroups = Partial<Record<CollectionKey, DirectoryGroup[]>>;
