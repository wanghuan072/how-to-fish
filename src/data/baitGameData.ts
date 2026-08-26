export type BaitCatchable = {
  slug: string;
  name: string;
  weight: number;
  poolShare: number;
};

export type BaitGameEntry = {
  slug: string;
  sourceName: string;
  kind: "Bait" | "Lure";
  bossBait: boolean;
  islandSlug: string;
  islandNumber: number;
  price: number | null;
  shopIslandSlugs: string[];
  acquisition: "Shop" | "Quest";
  questSlug?: string;
  catchTimeSeconds: { min: number; max: number };
  lostOnBaitChance: number;
  requireReeling: boolean;
  image: string;
  catchables: BaitCatchable[];
};

export type DefaultCatchPool = {
  id: "default-crab-pool" | "default-fish-pool";
  name: string;
  rod: "Crab Fishing Rod" | "Fishing Rod";
  islandSlug: string;
  catchTimeSeconds: { min: number; max: number };
  catchables: BaitCatchable[];
};

export const baitBuild = {
  unityVersion: "6000.4.4f1",
  verifiedOn: "2026-08-26",
};

export const baitGameData: BaitGameEntry[] = [
  {
    slug: "empty-beer-can",
    sourceName: "Empty Beer Can",
    kind: "Bait",
    bossBait: false,
    islandSlug: "lighthouse",
    islandNumber: 1,
    price: null,
    shopIslandSlugs: [],
    acquisition: "Quest",
    questSlug: "who-stole-my-beer",
    catchTimeSeconds: { min: 2, max: 4 },
    lostOnBaitChance: 100,
    requireReeling: false,
    image: "/images/game/bait/empty-beer-can.webp",
    catchables: [{ slug: "spider-crab", name: "Spider Crab", weight: 1, poolShare: 100 }],
  },
  {
    slug: "hot-dog",
    sourceName: "Hot Dog",
    kind: "Bait",
    bossBait: false,
    islandSlug: "lighthouse",
    islandNumber: 1,
    price: 1,
    shopIslandSlugs: ["lighthouse", "island-2-forest", "island-3-desert", "island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 3 },
    lostOnBaitChance: 40,
    requireReeling: false,
    image: "/images/game/bait/hot-dog.webp",
    catchables: [
      { slug: "rock-crab", name: "Rock Crab", weight: 10, poolShare: 76.9231 },
      { slug: "lobster", name: "Lobster", weight: 3, poolShare: 23.0769 },
    ],
  },
  {
    slug: "beginner-boss-lure",
    sourceName: "Beginner Boss Lure",
    kind: "Lure",
    bossBait: true,
    islandSlug: "island-2-forest",
    islandNumber: 2,
    price: 40,
    shopIslandSlugs: ["island-2-forest", "island-3-desert", "island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 3 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/beginner-boss-lure.webp",
    catchables: [
      { slug: "sunfish", name: "Sunfish", weight: 10, poolShare: 50 },
      { slug: "old-pike", name: "The Old Pike", weight: 10, poolShare: 50 },
    ],
  },
  {
    slug: "beginner-lure",
    sourceName: "Beginner Lure",
    kind: "Lure",
    bossBait: false,
    islandSlug: "island-2-forest",
    islandNumber: 2,
    price: 3,
    shopIslandSlugs: ["island-2-forest", "island-3-desert", "island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 3 },
    lostOnBaitChance: 35,
    requireReeling: true,
    image: "/images/game/bait/beginner-lure.webp",
    catchables: [
      { slug: "cod", name: "Cod", weight: 10, poolShare: 17.5439 },
      { slug: "pike", name: "Pike", weight: 10, poolShare: 17.5439 },
      { slug: "piranha", name: "Piranha", weight: 10, poolShare: 17.5439 },
      { slug: "triggerfish", name: "Triggerfish", weight: 5, poolShare: 8.7719 },
      { slug: "goby", name: "Goby", weight: 5, poolShare: 8.7719 },
      { slug: "salmon", name: "Salmon", weight: 7, poolShare: 12.2807 },
      { slug: "goldfish", name: "Goldfish", weight: 4, poolShare: 7.0175 },
      { slug: "perch", name: "Perch", weight: 5, poolShare: 8.7719 },
      { slug: "sunfish", name: "Sunfish", weight: 1, poolShare: 1.7544 },
    ],
  },
  {
    slug: "modified-leech",
    sourceName: "Leech Bait",
    kind: "Bait",
    bossBait: false,
    islandSlug: "island-2-forest",
    islandNumber: 2,
    price: null,
    shopIslandSlugs: [],
    acquisition: "Quest",
    questSlug: "dinnertime",
    catchTimeSeconds: { min: 1, max: 3 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/leech-bait.webp",
    catchables: [{ slug: "giant-piranha", name: "Giant Piranha", weight: 1, poolShare: 100 }],
  },
  {
    slug: "carrot",
    sourceName: "Carrot",
    kind: "Bait",
    bossBait: false,
    islandSlug: "island-3-desert",
    islandNumber: 3,
    price: null,
    shopIslandSlugs: [],
    acquisition: "Quest",
    questSlug: "vacation",
    catchTimeSeconds: { min: 1, max: 2.5 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/carrot.webp",
    catchables: [{ slug: "pufferfish", name: "Pufferfish", weight: 1, poolShare: 100 }],
  },
  {
    slug: "coconut",
    sourceName: "Coconut",
    kind: "Bait",
    bossBait: false,
    islandSlug: "island-3-desert",
    islandNumber: 3,
    price: 350,
    shopIslandSlugs: ["island-3-desert"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 2.5 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/coconut.webp",
    catchables: [{ slug: "bing-bong", name: "Bing Bong", weight: 1, poolShare: 100 }],
  },
  {
    slug: "standard-boss-lure",
    sourceName: "Standard Boss Lure",
    kind: "Lure",
    bossBait: true,
    islandSlug: "island-3-desert",
    islandNumber: 3,
    price: 280,
    shopIslandSlugs: ["island-3-desert", "island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 2.5 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/standard-boss-lure.webp",
    catchables: [{ slug: "blue-shark", name: "Blue Shark", weight: 10, poolShare: 100 }],
  },
  {
    slug: "standard-lure",
    sourceName: "Standard Lure",
    kind: "Lure",
    bossBait: false,
    islandSlug: "island-3-desert",
    islandNumber: 3,
    price: 15,
    shopIslandSlugs: ["island-3-desert", "island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 2.5 },
    lostOnBaitChance: 30,
    requireReeling: true,
    image: "/images/game/bait/standard-lure.webp",
    catchables: [
      { slug: "catfish", name: "Catfish", weight: 12, poolShare: 17.3913 },
      { slug: "bluegill", name: "Bluegill", weight: 10, poolShare: 14.4928 },
      { slug: "boxfish", name: "Yellow Boxfish", weight: 8, poolShare: 11.5942 },
      { slug: "angelfish", name: "Angelfish", weight: 8, poolShare: 11.5942 },
      { slug: "needlefish", name: "Needlefish", weight: 8, poolShare: 11.5942 },
      { slug: "sea-urchin", name: "Sea Urchin", weight: 10, poolShare: 14.4928 },
      { slug: "clownfish", name: "Clownfish", weight: 6, poolShare: 8.6957 },
      { slug: "seahorse", name: "Seahorse", weight: 3, poolShare: 4.3478 },
      { slug: "bowlfish", name: "Bowlfish", weight: 3, poolShare: 4.3478 },
      { slug: "blue-shark", name: "Blue Shark", weight: 1, poolShare: 1.4493 },
    ],
  },
  {
    slug: "professional-boss-lure",
    sourceName: "Professional Boss Lure",
    kind: "Lure",
    bossBait: true,
    islandSlug: "island-4-rocks",
    islandNumber: 4,
    price: 1200,
    shopIslandSlugs: ["island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 2 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/professional-boss-lure.webp",
    catchables: [{ slug: "tuna", name: "Tuna", weight: 10, poolShare: 100 }],
  },
  {
    slug: "professional-lure",
    sourceName: "Professional Lure",
    kind: "Lure",
    bossBait: false,
    islandSlug: "island-4-rocks",
    islandNumber: 4,
    price: 50,
    shopIslandSlugs: ["island-4-rocks", "island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 1, max: 2 },
    lostOnBaitChance: 25,
    requireReeling: true,
    image: "/images/game/bait/professional-lure.webp",
    catchables: [
      { slug: "sengarat", name: "Sengarat", weight: 10, poolShare: 12.8205 },
      { slug: "red-snapper", name: "Red Snapper", weight: 10, poolShare: 12.8205 },
      { slug: "tigerfish", name: "Tigerfish", weight: 10, poolShare: 12.8205 },
      { slug: "parrotfish", name: "Parrotfish", weight: 10, poolShare: 12.8205 },
      { slug: "bass", name: "Bass", weight: 10, poolShare: 12.8205 },
      { slug: "halibut", name: "Halibut", weight: 10, poolShare: 12.8205 },
      { slug: "flying-fish", name: "Flying Fish", weight: 5, poolShare: 6.4103 },
      { slug: "eel", name: "Eel", weight: 5, poolShare: 6.4103 },
      { slug: "voxelfish", name: "Voxelfish", weight: 3, poolShare: 3.8462 },
      { slug: "dripper", name: "Dripper", weight: 3, poolShare: 3.8462 },
      { slug: "tuna", name: "Tuna", weight: 1, poolShare: 1.2821 },
      { slug: "seahorse", name: "Seahorse", weight: 1, poolShare: 1.2821 },
    ],
  },
  {
    slug: "fish-bucket",
    sourceName: "Fish Bucket",
    kind: "Bait",
    bossBait: false,
    islandSlug: "island-5-volcano",
    islandNumber: 5,
    price: null,
    shopIslandSlugs: [],
    acquisition: "Quest",
    questSlug: "deadliest-catch",
    catchTimeSeconds: { min: 2, max: 3 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/fish-bucket.webp",
    catchables: [{ slug: "bowhead-whale", name: "Bowhead Whale", weight: 1, poolShare: 100 }],
  },
  {
    slug: "scientific-boss-lure",
    sourceName: "Scientific Boss Lure",
    kind: "Lure",
    bossBait: true,
    islandSlug: "island-5-volcano",
    islandNumber: 5,
    price: 5800,
    shopIslandSlugs: ["island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 0.75, max: 1.5 },
    lostOnBaitChance: 100,
    requireReeling: true,
    image: "/images/game/bait/scientific-boss-lure.webp",
    catchables: [{ slug: "goblin-shark", name: "Goblin Shark", weight: 10, poolShare: 100 }],
  },
  {
    slug: "scientific-lure",
    sourceName: "Scientific Lure",
    kind: "Lure",
    bossBait: false,
    islandSlug: "island-5-volcano",
    islandNumber: 5,
    price: 500,
    shopIslandSlugs: ["island-5-volcano"],
    acquisition: "Shop",
    catchTimeSeconds: { min: 0.75, max: 1.5 },
    lostOnBaitChance: 20,
    requireReeling: true,
    image: "/images/game/bait/scientific-lure.webp",
    catchables: [
      { slug: "stonefish", name: "Stonefish", weight: 10, poolShare: 25 },
      { slug: "blobfish", name: "Blobfish", weight: 10, poolShare: 25 },
      { slug: "anglerfish", name: "Anglerfish", weight: 10, poolShare: 25 },
      { slug: "oarfish", name: "Oarfish", weight: 6, poolShare: 15 },
      { slug: "superdwarf-fish", name: "Superdwarf Fish", weight: 4, poolShare: 10 },
    ],
  },
];

export const defaultCatchPools: DefaultCatchPool[] = [
  {
    id: "default-crab-pool",
    name: "Default Crab Pool",
    rod: "Crab Fishing Rod",
    islandSlug: "lighthouse",
    catchTimeSeconds: { min: 1, max: 4 },
    catchables: [
      { slug: "brown-crab", name: "Brown Crab", weight: 10, poolShare: 55.5556 },
      { slug: "shrimp", name: "Shrimp", weight: 8, poolShare: 44.4444 },
    ],
  },
  {
    id: "default-fish-pool",
    name: "Default Fish Pool",
    rod: "Fishing Rod",
    islandSlug: "island-2-forest",
    catchTimeSeconds: { min: 2, max: 3 },
    catchables: [
      { slug: "mackerel", name: "Mackerel", weight: 10, poolShare: 40 },
      { slug: "gar", name: "Gar", weight: 10, poolShare: 40 },
      { slug: "pike", name: "Pike", weight: 5, poolShare: 20 },
    ],
  },
];

export function getBaitGameData(slug: string) {
  return baitGameData.find((entry) => entry.slug === slug);
}
