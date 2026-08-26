import type { ContentSection } from "@/types/content";

export type WeaponProgression = {
  price: string;
  availableAt: string;
  islandSlug: string;
  obtain: string;
  damage: string;
  role: string;
  upgradeNote: string;
  baseDamage?: string;
  damageLadder?: number[];
  damageUpgradeCosts?: number[];
  magazine?: string;
  extendedMagazine?: string;
  extendedMagazineCost?: number;
};

export const weaponProgression: Record<string, WeaponProgression> = {
  "brass-knuckles": {
    price: "$24",
    availableAt: "Lighthouse",
    islandSlug: "lighthouse",
    obtain: "Buy from the opening Lighthouse shop.",
    damage: "Melee damage; upgrade values vary by the installed game build.",
    role: "Ammo-free finisher for small catches.",
    upgradeNote: "Useful before firearms become available, but bare fists—not Brass Knuckles—are required for Handyman.",
  },
  knife: {
    price: "$45",
    availableAt: "Lighthouse",
    islandSlug: "lighthouse",
    obtain: "Buy from the opening Lighthouse shop and improve it at the local upgrade station.",
    damage: "Upgradeable melee damage; the page does not treat a patch-sensitive value as permanent.",
    role: "Controlled melee cleanup that saves ammunition.",
    upgradeNote: "Use only after the catch is controlled on land or in the boat.",
  },
  pistol: {
    price: "$50",
    availableAt: "Forest Island",
    islandSlug: "island-2-forest",
    obtain: "The first firearm tier becomes purchasable after reaching Forest Island.",
    damage: "Single-shot firearm with a 25-damage starting value in the extracted weapon component.",
    role: "Low-cost ranged control for ordinary catches.",
    upgradeNote: "A practical first attachment platform because its ammunition is easier to budget than late-game weapons.",
    baseDamage: "25 per shot",
    damageLadder: [25, 28, 30, 33, 35, 40, 45, 50, 55, 60, 100, 130, 160],
    damageUpgradeCosts: [0, 15, 25, 35, 150, 250, 300, 1500, 1920, 2560, 4700, 6300, 9100],
    magazine: "10 rounds",
    extendedMagazine: "17 rounds",
    extendedMagazineCost: 90,
  },
  shotgun: {
    price: "$150",
    availableAt: "Forest Island",
    islandSlug: "island-2-forest",
    obtain: "Buy from the Forest Island weapon stock after the green Radar route is unlocked.",
    damage: "Starts at 3 damage per pellet. Total damage depends on how many projectiles in the spread connect.",
    role: "Burst damage against large targets close to the boat.",
    upgradeNote: "Prioritize damage only if you can keep the target inside the spread; carry another weapon for distant targets.",
    baseDamage: "3 per pellet",
    damageLadder: [3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 20, 24, 28],
    damageUpgradeCosts: [0, 20, 30, 40, 200, 250, 300, 1500, 2500, 3000, 4240, 6120, 8340],
    magazine: "2 shells",
    extendedMagazine: "Not supported",
  },
  dynamite: {
    price: "$25",
    availableAt: "Forest Island",
    islandSlug: "island-2-forest",
    obtain: "Purchased as a consumable explosive from the early firearm-stage shop stock.",
    damage: "Area blast damage rather than a fixed firearm shot.",
    role: "Crowd clearing, physics launches and two achievement routes.",
    upgradeNote: "Practice fuse placement away from the boat, NPCs and co-op partners.",
  },
  smg: {
    price: "Check current shop",
    availableAt: "Desert Island",
    islandSlug: "island-3-desert",
    obtain: "The rapid-fire tier appears during the Desert-stage shop progression.",
    damage: "Automatic firearm with a 24-damage starting value in the extracted weapon component.",
    role: "Moving bosses and targets that need fast follow-up shots.",
    upgradeNote: "Invest in magazine upgrades only if this will remain your main weapon.",
    baseDamage: "24 per shot",
    damageLadder: [24, 25, 26, 27, 28, 29, 30, 32, 35, 36, 45, 60, 70],
    damageUpgradeCosts: [0, 32, 64, 128, 180, 240, 375, 1500, 1800, 2200, 3400, 4850, 6700],
    magazine: "30 rounds",
    extendedMagazine: "40 rounds",
    extendedMagazineCost: 320,
  },
  "sniper-rifle": {
    price: "Not verified in the current build",
    availableAt: "Rocks Island",
    islandSlug: "island-4-rocks",
    obtain: "Buy during the Rocks Island weapon tier before the Albatross fight.",
    damage: "Precision firearm with a 200-damage starting value in the extracted weapon component.",
    role: "Albatross, distance kills and no-scope multiplier attempts.",
    upgradeNote: "It is powerful but slow; keep a faster secondary weapon for targets that reach the boat.",
    baseDamage: "200 per shot",
    damageLadder: [200, 210, 220, 230, 240, 250, 260, 270, 280, 300, 350, 400, 500],
    damageUpgradeCosts: [0, 140, 220, 349, 690, 900, 1400, 2000, 2650, 3300, 5600, 8500, 10000],
    magazine: "5 rounds",
    extendedMagazine: "8 rounds",
    extendedMagazineCost: 1200,
  },
  "assault-rifle": {
    price: "$20,000",
    availableAt: "Volcano / late route",
    islandSlug: "island-5-volcano",
    obtain: "Late-game shop stock used for the whale encounter chain.",
    damage: "Automatic late-game firearm with a 40-damage starting value in the extracted weapon component.",
    role: "Maintaining pressure on Bowhead Whale and the final mutated phase.",
    upgradeNote: "Restock ammunition before using a one-use encounter trigger.",
    baseDamage: "40 per shot",
    damageLadder: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    damageUpgradeCosts: [0, 300, 480, 700, 920, 1360, 1890, 2480, 3100, 3875, 4520, 5125, 5800],
    magazine: "30 rounds",
    extendedMagazine: "40 rounds",
    extendedMagazineCost: 5400,
  },
};

export const attachmentEffects = [
  "Compensator — moderately reduces recoil.",
  "Suppressor — significantly reduces recoil.",
  "Extended Mag — increases the number of rounds in the magazine.",
  "Laser Sight — shows where the weapon is pointing and makes hipfire easier.",
  "Red Dot Sight — makes targets easier to hit while aiming.",
  "Sniper Scope — makes distant targets easier to hit while aiming.",
  "Iron Sight — removes the currently attached sight.",
] as const;

export type ItemRoute = {
  function: string;
  foundAt: string;
  obtain: string;
  handling: string;
};

export const itemRoutes: Record<string, ItemRoute> = {
  radar: { function: "Shows unlocked island coordinates as colored route markers.", foundAt: "Lighthouse shop", obtain: "Buy for $10 after the opening route.", handling: "Permanent navigation tool; the boat key is still required to leave." },
  "beer-can": { function: "Starts the Empty Beer Can bait chain for Spider Crab.", foundAt: "Lighthouse quest route", obtain: "Give a Beer to the Lighthouse Keeper and keep the returned empty can.", handling: "Do not discard the returned can before the boss catch." },
  "modified-leech": { function: "One-use story bait that summons Giant Piranha.", foundAt: "Forest Island lake", obtain: "Collect three ground leeches and give them to the lake NPC.", handling: "Equip only when prepared for the boss; a failed attempt can consume it." },
  carrot: { function: "One-use story bait that summons Pufferfish.", foundAt: "Desert Island", obtain: "Catch an eligible endangered creature with Standard Lure and trade it to the tourist under the tree; Needlefish and Seahorse are confirmed options.", handling: "Keep the Pufferfish fin after the fight for the return hand-in." },
  "fish-bucket": { function: "Final-route trigger used for Bowhead Whale.", foundAt: "Volcano scientist route", obtain: "Return the scientist's five requested fish to receive the whale trigger.", handling: "Do not sell or cook the defeated whale; its body triggers the mutated phase." },
  "boat-engine": { function: "Reduces travel time between Radar markers.", foundAt: "Island shop progression", obtain: "Buy successive engine tiers as the route economy allows.", handling: "Permanent upgrade; the highest tier unlocks I am speed." },
};

export type IslandProgression = {
  marker: string;
  unlockRequirement: string;
  nextUnlockRequirement?: string;
  questHref?: string;
  nextQuestHref?: string;
  previous?: { slug: string; name: string };
  next?: { slug: string; name: string };
  steps: string[];
  weapons: string[];
  shopInventory: string[];
  baitStock: string[];
  attachmentStock: string[];
  npcRoles: string[];
  bulletUpgradeCap?: number;
  sharpnessUpgradeCap: number;
};

export const islandProgression: Record<string, IslandProgression> = {
  lighthouse: {
    marker: "Starting area",
    unlockRequirement: "Complete Who Stole My Beer? and return the Spider Crab quest result.",
    nextUnlockRequirement: "Complete Who Stole My Beer?, return the Spider Crab quest result, receive the boat key and buy the $10 Radar.",
    questHref: "/quests/who-stole-my-beer/",
    nextQuestHref: "/quests/who-stole-my-beer/",
    next: { slug: "island-2-forest", name: "Forest Island" },
    steps: [
      "Give a Beer to the Lighthouse Keeper and keep the returned Empty Beer Can.",
      "Equip the Empty Beer Can on the Crab Fishing Rod and defeat Spider Crab.",
      "Return the required Spider Crab quest result to the Lighthouse Keeper to receive the boat key.",
      "Buy the $10 Radar, then follow the green marker northwest to Forest Island.",
    ],
    weapons: ["brass-knuckles", "knife"],
    shopInventory: ["Crab-Fishing Rod", "Brass Knuckles", "Radar", "Radio", "Beer", "Knife"],
    baitStock: ["Hot Dog"],
    attachmentStock: [],
    npcRoles: ["Lighthouse Keeper — gives the Empty Beer Can route, accepts the Spider Crab result and awards the boat key.", "Opening shopkeeper — sells the Crab-Fishing Rod, Hot Dog, Radar, early melee gear and utility items."],
    sharpnessUpgradeCap: 3,
  },
  "island-2-forest": {
    marker: "Green Radar marker",
    unlockRequirement: "Lighthouse: finish Who Stole My Beer?, receive the boat key and buy the Radar.",
    nextUnlockRequirement: "Complete Dinnertime and return the named Giant Piranha trophy to the Forest lake NPC.",
    questHref: "/quests/who-stole-my-beer/",
    nextQuestHref: "/quests/dinnertime/",
    previous: { slug: "lighthouse", name: "Lighthouse" },
    next: { slug: "island-3-desert", name: "Desert Island" },
    steps: [
      "Collect three ground-spawned leeches and give them to the lady by the lake.",
      "Use the returned Leech Bait to summon and defeat Giant Piranha.",
      "Return the named Giant Piranha trophy to the lake NPC.",
      "The yellow Desert Island marker is added after the hand-in; the boss kill alone is not enough.",
    ],
    weapons: ["pistol", "shotgun", "dynamite"],
    shopInventory: ["Radio", "Brass Knuckles", "Dynamite", "Crab-Fishing Rod", "Shotgun", "Pistol", "Beer", "Knife", "Fishing Rod", "Radar"],
    baitStock: ["Hot Dog", "Beginner Boss Lure", "Beginner Lure"],
    attachmentStock: ["Laser Sight"],
    npcRoles: ["Forest lake lady — trades three ground leeches for Leech Bait and receives the Giant Piranha result.", "Swamp Man — runs the island shop and points players toward the Fishing Rod and trick-shot economy."],
    bulletUpgradeCap: 3,
    sharpnessUpgradeCap: 6,
  },
  "island-3-desert": {
    marker: "Yellow Radar marker",
    unlockRequirement: "Forest: complete Dinnertime and return the Giant Piranha trophy.",
    nextUnlockRequirement: "Complete Vacation and return the Pufferfish fin to the Desert Tourist.",
    questHref: "/quests/dinnertime/",
    nextQuestHref: "/quests/vacation/",
    previous: { slug: "island-2-forest", name: "Forest Island" },
    next: { slug: "island-4-rocks", name: "Rocks Island" },
    steps: ["Catch an eligible endangered creature with Standard Lure; Needlefish and Seahorse are confirmed options.", "Trade the eligible catch to the tourist for the Carrot.", "Defeat Pufferfish and return its fin.", "Follow the new red Radar marker to Rocks Island."],
    weapons: ["smg"],
    shopInventory: ["Beer", "Shotgun", "Brass Knuckles", "Pistol", "Badball", "Radio", "Crab-Fishing Rod", "Dynamite", "Radar", "Disc", "SMG", "Knife", "Fishing Rod"],
    baitStock: ["Standard Lure", "Beginner Lure", "Hot Dog", "Coconut", "Beginner Boss Lure", "Standard Boss Lure"],
    attachmentStock: ["Red Dot Sight", "Iron Sight", "Compensator", "Laser Sight", "Extended Mag"],
    npcRoles: ["Desert Tourist — trades an eligible requested creature for the Carrot and receives the Pufferfish result.", "Grillmaster — accepts Blue Shark and unlocks cooking.", "Kiosk seller — sells weapons, balls, boat upgrades, radio and other island stock."],
    bulletUpgradeCap: 6,
    sharpnessUpgradeCap: 9,
  },
  "island-4-rocks": {
    marker: "Red Radar marker",
    unlockRequirement: "Desert: complete Vacation and return the Pufferfish fin.",
    nextUnlockRequirement: "Complete Terrorizing Bird and return the Albatross head to the scared Rocks islander.",
    questHref: "/quests/vacation/",
    nextQuestHref: "/quests/terrorizing-bird/",
    previous: { slug: "island-3-desert", name: "Desert Island" },
    next: { slug: "island-5-volcano", name: "Volcano Island" },
    steps: ["Use Professional Boss Lure to defeat Tuna.", "Keep the Tuna body and place it on the island grass to trigger Albatross.", "Return the Albatross head to the scared Rocks islander.", "Follow the new pink Radar marker to Volcano Island."],
    weapons: ["sniper-rifle"],
    shopInventory: ["Brass Knuckles", "Badball", "Radio", "Shotgun", "Dynamite", "Disc", "Pistol", "SMG", "Sniper Rifle", "Crab-Fishing Rod", "Knife", "Fishing Rod", "Beer"],
    baitStock: ["Hot Dog", "Standard Lure", "Professional Boss Lure", "Professional Lure", "Beginner Lure", "Beginner Boss Lure", "Standard Boss Lure"],
    attachmentStock: ["Iron Sight", "Laser Sight", "Extended Mag", "Sniper Scope", "Suppressor", "Red Dot Sight", "Compensator"],
    npcRoles: ["Scared Rocks Islander — explains the Tuna ground-bait trigger and receives the Albatross head.", "Roulette operator — accepts item bets; winning a green bet unlocks All in.", "Slot operator — accepts a Drip creature or boss trophy for the skin machine.", "Store clerk and weapon seller — run separate equipment services on the island."],
    bulletUpgradeCap: 9,
    sharpnessUpgradeCap: 12,
  },
  "island-5-volcano": {
    marker: "Pink Radar marker",
    unlockRequirement: "Rocks: complete Terrorizing Bird and return the Albatross head.",
    questHref: "/quests/terrorizing-bird/",
    previous: { slug: "island-4-rocks", name: "Rocks Island" },
    steps: ["Check the military officer and Scientist; they use separate quest records.", "Complete the Scientist's five-creature request.", "Use the Fish Bucket / Whale Bait for Bowhead Whale.", "Keep the defeated whale body and carry it into the final trigger.", "Defeat Mutated Bowhead Whale, then take the ending transport."],
    weapons: ["assault-rifle"],
    shopInventory: ["Brass Knuckles", "Radio", "Dynamite", "Assault Rifle", "Badball", "Pistol", "Crab-Fishing Rod", "SMG", "Beer", "Sniper Rifle", "Radar", "Knife", "Shotgun", "Fishing Rod"],
    baitStock: ["Scientific Lure", "Scientific Boss Lure", "Standard Lure", "Professional Boss Lure", "Professional Lure", "Hot Dog", "Beginner Lure", "Beginner Boss Lure", "Standard Boss Lure"],
    attachmentStock: ["Iron Sight", "Laser Sight", "Extended Mag", "Sniper Scope", "Suppressor", "Red Dot Sight", "Compensator"],
    npcRoles: ["Military quest giver — starts the large-creature route.", "Military store NPC — sells final-island equipment.", "Scientist — requests five smaller catches, gives the whale trigger and advances the Bowhead-to-mutated-whale chain."],
    bulletUpgradeCap: 12,
    sharpnessUpgradeCap: 15,
  },
};

export function weaponSections(slug: string): ContentSection[] {
  const data = weaponProgression[slug];
  if (!data) return [];
  const parameters = [
    data.baseDamage ? `Base damage: ${data.baseDamage}` : null,
    data.magazine ? `Magazine: ${data.magazine}` : null,
    data.extendedMagazine ? `Extended magazine: ${data.extendedMagazine}` : null,
    data.extendedMagazineCost !== undefined ? `Extended magazine cost: $${data.extendedMagazineCost.toLocaleString("en-US")}` : null,
  ].filter((item): item is string => Boolean(item));
  const sections: ContentSection[] = [
    { heading: "How to get it", paragraphs: [data.obtain], bullets: [`Available at: ${data.availableAt}`, `Observed price: ${data.price}`] },
    { heading: "Combat parameters", paragraphs: [data.damage], bullets: [...parameters, data.upgradeNote] },
  ];
  if (data.damageLadder && data.damageUpgradeCosts) sections.push({
    heading: "Damage upgrade ladder",
    paragraphs: ["The weapon component stores thirteen damage states. The first cost is zero because it represents the base state; each following amount is the cost attached to that upgraded state."],
    bullets: [
      `Damage: ${data.damageLadder.join(" → ")}`,
      `State costs: ${data.damageUpgradeCosts.map((cost) => `$${cost.toLocaleString("en-US")}`).join(" → ")}`,
    ],
  });
  if (data.baseDamage) sections.push({
    heading: "Attachment effects",
    paragraphs: ["Attachment compatibility and stock change by weapon and island. These are the effects shown by the in-game attachment descriptions."],
    bullets: [...attachmentEffects],
  });
  return sections;
}

export function itemSections(slug: string): ContentSection[] {
  const data = itemRoutes[slug];
  if (!data) return [];
  return [
    { heading: "What this item does", paragraphs: [data.function], bullets: [data.handling] },
    { heading: "Location and acquisition", paragraphs: [data.obtain], bullets: [`Location: ${data.foundAt}`] },
  ];
}
