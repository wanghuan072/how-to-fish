import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import tackle from "@/data/tackle.json";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { achievements, getCollection } from "@/lib/content";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/wiki.module.css";

const loadoutSections = [
  {
    title: "Weapons & Attachments",
    description: "Compare damage, magazine size, price and island availability before spending coins on a new combat loadout.",
    href: "/wiki/weapons/",
    image: "/images/game/weapons/shotgun.jpg",
    count: getCollection("weapons").length,
    label: "weapons",
    action: "Compare weapons",
    facts: ["Damage and price", "Upgrade route"],
  },
  {
    title: "Rods & Lures",
    description: "Start with the correct rod, then follow each lure to its catch pool, story bait and boss encounter.",
    href: "/wiki/rods-and-lures/",
    image: "/images/official/gameplay-07.jpg",
    count: tackle.length,
    label: "rod types",
    action: "Match a fishing setup",
    facts: ["Rod compatibility", "Catch-pool links"],
  },
] as const;

const lookupSections = [
  {
    title: "Items & Upgrades",
    description: "Check what an item does, where it is found and whether a quest needs it later.",
    href: "/wiki/items/",
    image: "/images/official/gameplay-05.jpg",
    count: getCollection("items").length,
    label: "items",
    action: "Find an item",
  },
  {
    title: "Bait & Lures",
    description: "See the price, compatible rod and complete catch list for regular, boss and story bait.",
    href: "/wiki/bait/",
    image: "/images/game/bait/standard-lure.webp",
    count: getCollection("bait").length,
    label: "bait records",
    action: "Check catch pools",
  },
  {
    title: "NPCs & Quest Givers",
    description: "Locate each character and see the quest, hand-in or shop service tied to them.",
    href: "/wiki/npcs/",
    image: "/images/official/gameplay-04.jpg",
    count: getCollection("npcs").length,
    label: "NPCs",
    action: "Find an NPC",
  },
] as const;

const featuredAchievementNames = ["Who stole my beer", "Collector", "Fishipedia", "Fully equipped"];
const featuredAchievements = featuredAchievementNames
  .map((name) => achievements.find((entry) => entry.name === name))
  .filter((entry): entry is (typeof achievements)[number] => Boolean(entry));

function achievementId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function WikiPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki/" }];
  const totalRecords = getCollection("weapons").length + getCollection("items").length + getCollection("bait").length + getCollection("npcs").length + achievements.length;
  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.wiki)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Player reference"
        title="How to Fish Steam Wiki: Weapons, Items, Bait & Achievements"
        description="Use the complete Steam Wiki to compare all 8 weapons, locate quest items and NPCs, match bait with catch pools, check rod compatibility and finish all 28 achievements."
        image="/images/official/gameplay-05.jpg"
        imageAlt="Official How to Fish gameplay screenshot showing equipment and island exploration"
        summary={<><span><strong>{loadoutSections.length + lookupSections.length + 1}</strong> gameplay categories</span><span><strong>{achievements.length}</strong> achievements</span></>}
      />

      <section className={styles.paper}>
        <header className={styles.wikiIntro}>
          <div>
            <p>How to Fish Wiki</p>
            <h2>Open the record you need next</h2>
            <span>Choose by task: build a loadout, identify a route item or clean up the Steam checklist.</span>
          </div>
          <strong>{totalRecords} connected records</strong>
        </header>

        <section className={styles.loadoutSection} aria-labelledby="loadout-heading">
          <header className={styles.sectionHeading}>
            <div><p>Equipment and catch setup</p><h2 id="loadout-heading">Build the right loadout</h2></div>
            <span>Start here before buying gear or casting a one-use lure.</span>
          </header>
          <div className={styles.loadoutGrid}>
            {loadoutSections.map((entry) => (
              <article className={styles.loadoutCard} key={entry.href}>
                <Link className={styles.loadoutMedia} href={entry.href} aria-label={`Open ${entry.title}`}>
                  <Image src={entry.image} alt="" fill sizes="(max-width: 768px) 100vw, 330px" />
                  <span>{entry.count} {entry.label}</span>
                </Link>
                <div className={styles.loadoutBody}>
                  <small>Loadout reference</small>
                  <h3><Link href={entry.href}>{entry.title}</Link></h3>
                  <p>{entry.description}</p>
                  <ul>{entry.facts.map((fact) => <li key={fact}><CheckCircle2 size={13} />{fact}</li>)}</ul>
                  <Link className={styles.wikiAction} href={entry.href}>{entry.action}<ArrowRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.wikiLowerGrid}>
          <section className={styles.lookupSection} aria-labelledby="lookup-heading">
            <header className={styles.sectionHeading}>
              <div><p>Routes, shops and hand-ins</p><h2 id="lookup-heading">Look up a game record</h2></div>
              <span>Keep quest objects and expensive bait connected to the route that uses them.</span>
            </header>
            <div className={styles.lookupList}>
              {lookupSections.map((entry) => (
                <Link className={styles.lookupCard} href={entry.href} key={entry.href}>
                  <span className={styles.lookupMedia}><Image src={entry.image} alt="" fill sizes="150px" /></span>
                  <span className={styles.lookupBody}>
                    <small>{entry.count} {entry.label}</small>
                    <strong>{entry.title}</strong>
                    <em>{entry.description}</em>
                    <b>{entry.action}<ArrowRight size={13} /></b>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.completionSection} aria-labelledby="completion-heading">
            <header>
              <p>Steam completion</p>
              <h2 id="completion-heading">Track all {achievements.length} achievements</h2>
              <span>Use one categorized checklist for story objectives, creature collections, equipment and physics challenges.</span>
            </header>
            <div className={styles.achievementPreview}>
              {featuredAchievements.map((entry) => (
                <Link href={`/wiki/achievements/#${achievementId(entry.name)}`} key={entry.name}>
                  <span><Image src={entry.image} alt={entry.imageAlt} fill sizes="70px" /></span>
                  <b>{entry.name}</b>
                </Link>
              ))}
            </div>
            <Link className={styles.completionAction} href="/wiki/achievements/">
              <span><small>Completion checklist</small><strong>View every achievement</strong></span>
              <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}
