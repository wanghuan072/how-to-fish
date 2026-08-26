import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/seo/schema";
import styles from "@/style/page/wiki-reference.module.css";

type Mechanic = { title: string; description: string; bullets: string[]; links: Array<[string, string]> };

const groups: Array<{ id: string; title: string; description: string; entries: Mechanic[] }> = [
  { id: "fishing", title: "Fishing Systems", description: "The catch loop, rods, bait and line control.", entries: [
    { title: "Catch, kill, sell", description: "Fishing begins the encounter. Reel or launch the creature out of the water, kill it with your current loadout, then sell the result to fund lures, ammunition, weapons and boat upgrades.", bullets: ["Match island, rod and bait.", "A creature registers after the kill.", "Keep named quest trophies before selling ordinary catches."], links: [["Fish list", "/fish/"], ["Rods & lures", "/wiki/rods-and-lures/"], ["Weapons", "/wiki/weapons/"]] },
    { title: "Line tension", description: "Hold the reel input while tension is low and release when tension becomes high. A snapped line or escaped boss consumes time and can also consume a single-use lure.", bullets: ["Cast beyond nearby scenery.", "Pulse the reel instead of holding through high tension.", "Watch the boss escape bar as well as health."], links: [["Bait & lures", "/wiki/bait/"], ["Boss guides", "/bosses/"]] },
  ] },
  { id: "combat-economy", title: "Combat & Economy", description: "Killscore, cooking and the value systems used by money routes.", entries: [
    { title: "Killscore multipliers", description: "Style conditions multiply the caught item's value. Fixed bonuses include 360 (1.5x), headshot (1.25x), last bullet (1.25x), no scope (1.2x) and point blank (1.1x).", bullets: ["Bonuses multiply rather than add.", "Airborne, overkill and killsteal conditions can stack too.", "The 5x target is an achievement threshold."], links: [["Achievements", "/wiki/achievements/#impressive"], ["Fast Money Guide", "/guides/fast-money-guide/"], ["Sniper Rifle", "/wiki/weapons/sniper-rifle/"]] },
    { title: "Cooking", description: "The Desert Island grill and Volcano lava can raise an item's cooking multiplier to about 1.5x. Cooking is separate from Killscore and also works on sellable gear.", bullets: ["Inspect the live value before cooking.", "Pull the item away at 1.5x.", "A black burnt item drops to zero value."], links: [["Grillmaster quest", "/quests/grillmaster/"], ["Grillmaster NPC", "/wiki/npcs/grillmaster/"], ["Desert Island", "/islands/island-3-desert/"]] },
    { title: "Roulette & $100,000 sale", description: "Green is one pocket in 37 and pays the large multiplier used by many Millionaire routes. The achievement requires one item worth at least $100,000, not cumulative sales.", bullets: ["Build value with Killscore first.", "Cook the item to 1.5x.", "Only gamble an item you can afford to lose."], links: [["Rich! Millionaire", "/wiki/achievements/#rich-millionaire"], ["All in", "/wiki/achievements/#all-in"], ["Fast Money Guide", "/guides/fast-money-guide/"]] },
  ] },
  { id: "progression", title: "Progression & Collection", description: "Island order, quest gates and rare Drip cleanup.", entries: [
    { title: "Drip variants", description: "Drip creatures are rainbow-name rare variants tracked separately in the Tab encyclopedia. Killing one unlocks Drip; killing all of them unlocks Fishipedia.", bullets: ["There is no separate Drip bait.", "Use blank encyclopedia entries as the checklist.", "Save the island sweep for post-game cleanup."], links: [["Rare Drip Fish Guide", "/guides/rare-fish-guide/"], ["Fish list", "/fish/"], ["Fishipedia", "/wiki/achievements/#fishipedia"]] },
    { title: "Island progression", description: "The route is Lighthouse → Forest → Desert → Rocks → Volcano. New Radar markers appear after the required story trophy is handed back to the current quest giver.", bullets: ["Green, yellow, red and pink dots mark the four destinations.", "The boss kill alone is not enough.", "Do not sell Tuna or Bowhead Whale before the next trigger."], links: [["Island routes", "/islands/"], ["Quest guides", "/quests/"], ["Radar", "/wiki/items/radar/"]] },
  ] },
  { id: "equipment-coop", title: "Equipment & Co-op", description: "Attachments, controller support and role planning for multiplayer.", entries: [
    { title: "Weapons & four attachment slots", description: "The weapon set is Brass Knuckles, Knife, Pistol, SMG, Shotgun, Sniper Rifle, Dynamite and Assault Rifle. A full firearm build uses extended magazine, laser, one optic and one muzzle option.", bullets: ["Red dot and sniper scope share the optic slot.", "Compensator and suppressor share the muzzle slot.", "Fill all four slots on one weapon for Fully equipped."], links: [["Weapons", "/wiki/weapons/"], ["Fully equipped", "/wiki/achievements/#fully-equipped"]] },
    { title: "Controller & Steam Deck", description: "The game supports controller play. On Steam Deck, controls and performance work while some in-game text can be small.", bullets: ["The default controller configuration is functional.", "The game displays controller icons.", "Test readable UI scale before a long handheld session."], links: [["Beginner Guide", "/guides/beginner-guide/"], ["Game Wiki", "/wiki/"]] },
    { title: "Online co-op", description: "Single-player and online co-op support up to four players. Physics and explosives make explicit roles useful during expensive boss attempts.", bullets: ["Agree who casts the single-use lure.", "Keep explosives away from the boat.", "Confirm who carries the physical chain item."], links: [["Boss guides", "/bosses/"], ["Dynamite", "/wiki/weapons/dynamite/"], ["Full Walkthrough", "/guides/full-walkthrough/"]] },
  ] },
];

function mechanicId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function MechanicsPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Guides", href: "/guides/" }, { name: "Game Mechanics", href: "/guides/game-mechanics/" }];
  return (
    <main id="main-content">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Gameplay systems"
        title="How to Fish Mechanics — Fishing, Combat, Money & Co-op"
        description="Learn how line tension, Killscore, cooking, island progression, Drip variants, attachments and multiplayer roles work during a normal playthrough."
        image="/images/official/gameplay-06.jpg"
        imageAlt="Official How to Fish gameplay screenshot"
        summary={<><span><strong>{groups.length}</strong> system categories</span><span>Fishing, combat, progression and co-op</span></>}
      />
      <section className={styles.paper}><div className={styles.layout}>
        <aside className={styles.sidebar}><h2>System Categories</h2><nav>{groups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.title}</span><b>{group.entries.length}</b></a>)}</nav></aside>
        <div className={styles.groups}>{groups.map((group) => <section className={styles.group} id={group.id} key={group.id}><header className={styles.groupHeader}><div><p>Mechanic category</p><h2>{group.title}</h2><span>{group.description}</span></div><strong>{group.entries.length} systems</strong></header><div className={styles.mechanicList}>{group.entries.map((entry, index) => <article className={styles.mechanic} id={mechanicId(entry.title)} key={entry.title}><span className={styles.mechanicNumber}>{String(index + 1).padStart(2, "0")}</span><div><h3>{entry.title}</h3><p>{entry.description}</p><ul>{entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div><nav className={styles.mechanicLinks} aria-label={`${entry.title} related pages`}>{entry.links.map(([label, href]) => <Link href={href} key={href}>{label}<ArrowRight size={11} /></Link>)}</nav></article>)}</div></section>)}</div>
      </div></section>
    </main>
  );
}
