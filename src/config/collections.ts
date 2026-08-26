import type { CollectionKey } from "@/types/content";

export const collectionConfig: Record<
  CollectionKey,
  {
    title: string;
    seoTitle: string;
    breadcrumb: string;
    eyebrow: string;
    description: string;
    href: string;
    detailPrefix: string;
    image: string;
  }
> = {
  guides: {
    title: "How to Fish Guides — Master Every Island",
    seoTitle: "Guides — Walkthrough & Island Progression",
    breadcrumb: "Guides",
    eyebrow: "Walkthroughs & strategy",
    description:
      "Start at Lighthouse, learn fishing and combat, then follow each quest, boss trophy and island unlock without losing an item you still need.",
    href: "/guides/",
    detailPrefix: "/guides",
    image: "/images/official/gameplay-03.jpg",
  },
  quests: {
    title: "How to Fish Quests — Objectives, Items & Island Unlocks",
    seoTitle: "Quests — Steps, Items & Unlocks",
    breadcrumb: "Quests",
    eyebrow: "Objectives & solutions",
    description:
      "Find the quest giver, bring the right item, finish each objective in order and see what the hand-in unlocks next.",
    href: "/quests/",
    detailPrefix: "/quests",
    image: "/images/official/gameplay-04.jpg",
  },
  bosses: {
    title: "How to Fish Bosses — Triggers, Fight Tips & Rewards",
    seoTitle: "Bosses — Triggers, Strategy & Rewards",
    breadcrumb: "Bosses",
    eyebrow: "Bait, preparation & tactics",
    description:
      "Check the bait or carried item before starting a fight, then plan the attack, keep the reward and finish the return hand-in.",
    href: "/bosses/",
    detailPrefix: "/bosses",
    image: "/images/official/gameplay-02.jpg",
  },
  islands: {
    title: "How to Fish Islands — Routes, Unlocks & What to Find",
    seoTitle: "Islands — Unlock Routes & Locations",
    breadcrumb: "Islands",
    eyebrow: "Five-island progression",
    description:
      "Follow the route from Lighthouse to Volcano, see how each island unlocks and check its creatures, NPCs, shops, weapons and quests.",
    href: "/islands/",
    detailPrefix: "/islands",
    image: "/images/official/gameplay-01.jpg",
  },
  weapons: {
    title: "How to Fish Weapons — Prices, Damage & Where to Buy",
    seoTitle: "Weapons — Prices, Damage & Locations",
    breadcrumb: "Weapons",
    eyebrow: "How to Fish Wiki",
    description:
      "Compare the eight weapons by price, damage, range and availability, then choose a loadout that fits the creature or boss ahead.",
    href: "/wiki/weapons/",
    detailPrefix: "/wiki/weapons",
    image: "/images/official/gameplay-05.jpg",
  },
  items: {
    title: "How to Fish Items — Uses, Locations & Quest Links",
    seoTitle: "Items — Uses, Locations & Quests",
    breadcrumb: "Items",
    eyebrow: "How to Fish Wiki",
    description:
      "See what each item does, where to get it and whether it should be kept for a quest, boss trigger or island unlock.",
    href: "/wiki/items/",
    detailPrefix: "/wiki/items",
    image: "/images/official/gameplay-01.jpg",
  },
  bait: {
    title: "How to Fish Bait & Lures — What Each One Catches",
    seoTitle: "Bait & Lures — Catch List & Prices",
    breadcrumb: "Bait & Lures",
    eyebrow: "How to Fish Wiki",
    description:
      "Choose a fish or boss, then match it to the correct rod, lure, island and price before you cast or spend a one-use item.",
    href: "/wiki/bait/",
    detailPrefix: "/wiki/bait",
    image: "/images/official/gameplay-03.jpg",
  },
  npcs: {
    title: "How to Fish NPCs — Locations, Quests & Rewards",
    seoTitle: "NPCs — Locations, Quests & Rewards",
    breadcrumb: "NPCs",
    eyebrow: "How to Fish Wiki",
    description:
      "Find each quest giver, see what they ask for and check the item, reward or island marker received after the return dialogue.",
    href: "/wiki/npcs/",
    detailPrefix: "/wiki/npcs",
    image: "/images/official/gameplay-03.jpg",
  },
  updates: {
    title: "How to Fish Updates — Patch Notes & Game News",
    seoTitle: "Updates — Patch Notes & News",
    breadcrumb: "Updates",
    eyebrow: "News & build notes",
    description:
      "Read patch notes, launch news and gameplay changes that may affect routes, prices, creatures or achievement requirements.",
    href: "/updates/",
    detailPrefix: "/updates",
    image: "/images/official/steam-header.jpg",
  },
};
