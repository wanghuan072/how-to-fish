# How to Fish

[How to Fish Wiki](https://howtofish.org/) is an independent English-language player guide for *How to Fish*, the physics-driven fishing adventure by Dazed Games. The game begins with a basic rod and a small Lighthouse island, then expands into boat travel, creature hunting, quest hand-ins, unusual boss triggers, weapons, equipment upgrades and a five-island story route.

The site is designed around the questions players ask while playing: which bait catches a creature, where an item is used, what must be returned to an NPC, how a boss encounter starts and which objective unlocks the next island.

## Game Features

- Catch and defeat a varied collection of fish, crabs and special creatures.
- Match different rods and lure tiers to island-specific catch pools.
- Complete connected quests that unlock boats, Radar markers and new islands.
- Prepare for story bosses and optional encounters with the correct trigger items.
- Buy weapons, upgrades and utility items as the route expands.
- Play solo or work through the adventure with friends in online co-op.
- Track standard creatures, rare Drip variants and Steam achievements.

## Player Guides and Navigation

### [Home](https://howtofish.org/)

Start with the main route overview, browse current creature and island counts, open the recommended beginner guide, or jump directly to quests, bosses, weapons and achievements.

### [Guides](https://howtofish.org/guides/)

Choose between a spoiler-light beginner guide and the complete Lighthouse-to-Volcano walkthrough. The beginner route covers controls, early fishing, selling and safe purchases; the full walkthrough follows every major trigger, trophy, NPC return and island unlock.

### [Creatures](https://howtofish.org/creatures/)

Browse all 54 extracted creatures: 40 fish, 5 shell creatures and 9 special creatures. Each non-boss creature page links its island, exact rod and bait or trigger, observed base value, related quests and relevant achievements. Boss rows open the dedicated boss strategy page.

### [Quests](https://howtofish.org/quests/)

Follow quests in story order with the objective, required creature or item, NPC hand-in, reward and progression result shown together. Quest pages connect directly to the islands, bosses, bait, items and achievements involved.

### [Bosses](https://howtofish.org/bosses/)

Check how each encounter is triggered before spending a one-use lure or carrying the wrong body. Boss guides cover preparation, fight mechanics, a practical attack plan, drops, quest connections and achievements.

### [Islands](https://howtofish.org/islands/)

Travel from Lighthouse through Forest, Desert, Rocks and Volcano. Island pages explain how to arrive, which task unlocks the next destination and what creatures, NPCs, quests, shops, items and weapons are available at that stage.

### [Wiki](https://howtofish.org/wiki/)

Open focused references for [weapons](https://howtofish.org/wiki/weapons/), [items](https://howtofish.org/wiki/items/), [bait and lures](https://howtofish.org/wiki/bait/), [rods and lure compatibility](https://howtofish.org/wiki/rods-and-lures/), [NPCs](https://howtofish.org/wiki/npcs/) and [achievements](https://howtofish.org/wiki/achievements/). These pages link back to the exact quests, islands, creatures and encounters where the subject matters.

### [Updates](https://howtofish.org/updates/)

Read dated launch news and patch notes in one list. Update entries explain which gameplay routes, values, creatures, items or requirements may need to be checked again after a build changes.

## Getting Started

Begin at the Lighthouse and learn the opening fishing pool before buying expensive gear. Finish the local beer quest, return the required result to the Lighthouse Keeper and keep the boat key. Once boat travel becomes available, buy the Radar and follow the newly unlocked marker rather than searching the open sea at random.

Keep named quest objects and boss trophies until their return dialogue is complete. A creature that can be sold may still be needed for a trade, trigger or achievement, so open its connected page when the purpose is unclear.

## Maintaining Local Content

Game content is maintained as separate local JSON files in `src/data`, including `creatures.json`, `creature-categories.json`, `bosses.json`, `weapons.json`, `quests.json`, `guides.json`, `items.json`, `bait.json`, `npcs.json` and `islands.json`. Edit the matching JSON file directly when content changes.

Use the `published` field in `guides.json` to control which guides appear on the site. Wiki directory categories are kept in `directory-groups.json`.

## Frequently Asked Questions

### How many creatures are tracked?

The creature directory contains all 54 extracted creature prefabs: fish, shell creatures, boss encounters, ground pickups and ambient creatures. Boss entries link to the Bosses section for their triggers and fight routes.

### Which bait should I use?

There is no single best bait. Regular lure tiers are tied to progression stages, while some fish use food bait and bosses may require purchased lures, quest objects or carried bodies. Check the creature or bait page before casting.

### How do I unlock the next island?

Complete the current island's main quest, defeat its required boss, collect the named result and return it to the correct NPC. The next Radar marker appears after the hand-in. Each island page links directly to the following destination and the quest that unlocks it.

### Can I play solo?

Yes. The main route can be completed in single-player. Online co-op can make travel and combat easier, but it is not required to follow the guides.

### Where can I report a correction?

Read [Contact Us](https://howtofish.org/legal/contact-us/) and email [wyong@howtofish.org](mailto:wyong@howtofish.org) with the page URL, game version, steps followed and observed result.

## Independent Fan Site

How to Fish Wiki is an independent fan project and is not affiliated with, endorsed by, sponsored by or connected to Dazed Games, Steam or Valve. Game names, screenshots and related assets remain the property of their respective owners.
