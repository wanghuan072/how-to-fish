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
    title: "How to Fish Guides",
    seoTitle: "Guides — Walkthrough & Island Progression",
    breadcrumb: "Guides",
    eyebrow: "Walkthroughs & strategy",
    description:
      "Start with spoiler-light beginner tips, then use the complete Steam walkthrough for every quest trigger, boss trophy and island unlock from Lighthouse to Volcano.",
    href: "/guides/",
    detailPrefix: "/guides",
    image: "/images/official/gameplay-03.jpg",
  },
  quests: {
    title: "How to Fish Steam Quest Guide: All 7 Quest Walkthroughs",
    seoTitle: "Quests — Steps, Items & Unlocks",
    breadcrumb: "Quests",
    eyebrow: "Objectives & solutions",
    description:
      "Follow all 7 documented quest routes in story order, including the required creatures, items, NPC hand-ins, boss links, rewards and next island unlock.",
    href: "/quests/",
    detailPrefix: "/quests",
    image: "/images/official/gameplay-04.jpg",
  },
  bosses: {
    title: "How to Fish Steam Boss Guide: All 11 Bosses & Strategies",
    seoTitle: "Bosses — Triggers, Strategy & Rewards",
    breadcrumb: "Bosses",
    eyebrow: "Bait, preparation & tactics",
    description:
      "Prepare for all 11 bosses with the correct lure, quest item or carried trigger, then use the fight plan, keep the required drop and finish the hand-in.",
    href: "/bosses/",
    detailPrefix: "/bosses",
    image: "/images/official/gameplay-02.jpg",
  },
  islands: {
    title: "How to Fish Steam Islands Guide: All 5 Routes & Unlocks",
    seoTitle: "Islands — Unlock Routes & Locations",
    breadcrumb: "Islands",
    eyebrow: "Five-island progression",
    description:
      "Explore all 5 islands from Lighthouse to Volcano with arrival requirements, route directions, fish, bosses, NPCs, quests, shops, weapons and items.",
    href: "/islands/",
    detailPrefix: "/islands",
    image: "/images/official/gameplay-01.jpg",
  },
  weapons: {
    title: "How to Fish Steam Weapons Guide: All 8 Weapons & Stats",
    seoTitle: "Weapons — Prices, Damage & Locations",
    breadcrumb: "Weapons",
    eyebrow: "How to Fish Wiki",
    description:
      "Compare all 8 weapons by damage, price, magazine, upgrades and island availability, then choose a practical loadout for the fish or boss ahead.",
    href: "/wiki/weapons/",
    detailPrefix: "/wiki/weapons",
    image: "/images/official/gameplay-05.jpg",
  },
  bait: {
    title: "How to Fish Bait, Lures & Rods Guide: Catch Setups",
    seoTitle: "Bait, Lures & Rods — Catch Setups",
    breadcrumb: "Bait, Lures & Rods",
    eyebrow: "How to Fish Wiki",
    description:
      "Match every bait, lure and carried trigger with the correct rod, catch pool, island, shop price and connected boss or quest route.",
    href: "/wiki/bait-and-lures/",
    detailPrefix: "/wiki/bait-and-lures",
    image: "/images/official/gameplay-07.jpg",
  },
  npcs: {
    title: "How to Fish Steam NPC Guide: All 14 Locations & Quests",
    seoTitle: "NPCs — Locations, Quests & Rewards",
    breadcrumb: "NPCs",
    eyebrow: "How to Fish Wiki",
    description:
      "Find all 14 documented NPCs, see which island and service they belong to, what each quest requests and which reward or route the return dialogue unlocks.",
    href: "/wiki/npcs/",
    detailPrefix: "/wiki/npcs",
    image: "/images/official/gameplay-03.jpg",
  },
  updates: {
    title: "How to Fish Steam Updates: Patch Notes & Game Changes",
    seoTitle: "Updates — Patch Notes & News",
    breadcrumb: "Updates",
    eyebrow: "News & build notes",
    description:
      "Read dated Steam patch notes and player-focused explanations of changes affecting fish, bait, prices, quests, bosses, islands and achievement requirements.",
    href: "/updates/",
    detailPrefix: "/updates",
    image: "/images/official/steam-header.jpg",
  },
};
