import type { ContentSection } from "@/types/content";

export type WeaponProgression = {
  price: string;
  availableAt: string;
  islandSlug: string;
  obtain: string;
  damage: string;
  role: string;
  upgradeNote: string;
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
    damage: "Upgradeable single-shot firearm damage.",
    role: "Low-cost ranged control for ordinary catches.",
    upgradeNote: "A practical first attachment platform because its ammunition is easier to budget than late-game weapons.",
  },
  shotgun: {
    price: "$150",
    availableAt: "Forest Island",
    islandSlug: "island-2-forest",
    obtain: "Buy from the Forest Island weapon stock after the green Radar route is unlocked.",
    damage: "Close-range pellet spread; effective damage depends on how many pellets connect.",
    role: "Burst damage against large targets close to the boat.",
    upgradeNote: "Prioritize damage only if you can keep the target inside the spread; carry another weapon for distant targets.",
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
    damage: "Upgradeable automatic damage; short bursts preserve accuracy and ammunition.",
    role: "Moving bosses and targets that need fast follow-up shots.",
    upgradeNote: "Invest in magazine upgrades only if this will remain your main weapon.",
  },
  "sniper-rifle": {
    price: "About $3,800",
    availableAt: "Rocks Island",
    islandSlug: "island-4-rocks",
    obtain: "Buy during the Rocks Island weapon tier before the Albatross fight.",
    damage: "High precision damage; upgrades can take it to 500 damage.",
    role: "Albatross, distance kills and no-scope multiplier attempts.",
    upgradeNote: "It is powerful but slow; keep a faster secondary weapon for targets that reach the boat.",
  },
  "assault-rifle": {
    price: "About $20,000",
    availableAt: "Volcano / late route",
    islandSlug: "island-5-volcano",
    obtain: "Late-game shop stock used for the whale encounter chain.",
    damage: "Upgradeable sustained damage, rising from 40 to 100.",
    role: "Maintaining pressure on Bowhead Whale and the final mutated phase.",
    upgradeNote: "Restock ammunition before using a one-use encounter trigger.",
  },
};

export type ItemRoute = {
  function: string;
  foundAt: string;
  obtain: string;
  handling: string;
};

export const itemRoutes: Record<string, ItemRoute> = {
  radar: { function: "Shows unlocked island coordinates as colored route markers.", foundAt: "Lighthouse shop", obtain: "Buy for $10 after the opening route.", handling: "Permanent navigation tool; the boat key is still required to leave." },
  "beer-can": { function: "Starts the Empty Beer Can bait chain for Spider Crab.", foundAt: "Lighthouse quest route", obtain: "Give the Beer Can to the Lighthouse Keeper and keep the returned empty can.", handling: "Do not discard the returned can before the boss catch." },
  "modified-leech": { function: "One-use story bait that summons Giant Piranha.", foundAt: "Forest Island lake", obtain: "Collect three ground leeches and give them to the lake NPC.", handling: "Equip only when prepared for the boss; a failed attempt can consume it." },
  carrot: { function: "One-use story bait that summons Pufferfish.", foundAt: "Desert Island", obtain: "Catch Needlefish with Standard Lure and trade it to the tourist under the tree.", handling: "Keep the Pufferfish fin after the fight for the return hand-in." },
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
      "Give the Beer Can to the Lighthouse Keeper and keep the returned Empty Beer Can.",
      "Equip the Empty Beer Can on the Crab Fishing Rod and defeat Spider Crab.",
      "Return the required Spider Crab quest result to the Lighthouse Keeper to receive the boat key.",
      "Buy the $10 Radar, then follow the green marker northwest to Forest Island.",
    ],
    weapons: ["brass-knuckles", "knife"],
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
  },
  "island-3-desert": {
    marker: "Yellow Radar marker",
    unlockRequirement: "Forest: complete Dinnertime and return the Giant Piranha trophy.",
    nextUnlockRequirement: "Complete Vacation and return the Pufferfish fin to the Desert Tourist.",
    questHref: "/quests/dinnertime/",
    nextQuestHref: "/quests/vacation/",
    previous: { slug: "island-2-forest", name: "Forest Island" },
    next: { slug: "island-4-rocks", name: "Rocks Island" },
    steps: ["Catch Needlefish with Standard Lure.", "Trade it to the tourist for the Carrot.", "Defeat Pufferfish and return its fin.", "Follow the new red Radar marker to Rocks Island."],
    weapons: ["smg"],
  },
  "island-4-rocks": {
    marker: "Red Radar marker",
    unlockRequirement: "Desert: complete Vacation and return the Pufferfish fin.",
    nextUnlockRequirement: "Complete Terrorizing Bird and return the Albatross head to the Rocks shop NPC.",
    questHref: "/quests/vacation/",
    nextQuestHref: "/quests/terrorizing-bird/",
    previous: { slug: "island-3-desert", name: "Desert Island" },
    next: { slug: "island-5-volcano", name: "Volcano Island" },
    steps: ["Use Professional Boss Lure to defeat Tuna.", "Keep the Tuna body and place it on land to trigger Albatross.", "Return the Albatross head to the Rocks shop NPC.", "Follow the new pink Radar marker to Volcano Island."],
    weapons: ["sniper-rifle"],
  },
  "island-5-volcano": {
    marker: "Pink Radar marker",
    unlockRequirement: "Rocks: complete Terrorizing Bird and return the Albatross head.",
    questHref: "/quests/terrorizing-bird/",
    previous: { slug: "island-4-rocks", name: "Rocks Island" },
    steps: ["Complete the scientist's five-fish request.", "Use the Fish Bucket / Whale Bait for Bowhead Whale.", "Keep the defeated whale body and carry it into the final trigger.", "Defeat Mutated Bowhead Whale to finish the story route."],
    weapons: ["assault-rifle"],
  },
};

export function weaponSections(slug: string): ContentSection[] {
  const data = weaponProgression[slug];
  if (!data) return [];
  return [
    { heading: "How to get it", paragraphs: [data.obtain], bullets: [`Available at: ${data.availableAt}`, `Observed price: ${data.price}`] },
    { heading: "Damage and upgrades", paragraphs: [data.damage], bullets: [data.upgradeNote] },
  ];
}

export function itemSections(slug: string): ContentSection[] {
  const data = itemRoutes[slug];
  if (!data) return [];
  return [
    { heading: "What this item does", paragraphs: [data.function], bullets: [data.handling] },
    { heading: "Location and acquisition", paragraphs: [data.obtain], bullets: [`Location: ${data.foundAt}`] },
  ];
}
