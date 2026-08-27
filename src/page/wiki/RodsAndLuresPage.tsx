import Image from "next/image";
import Link from "next/link";
import { Anchor, ArrowRight, Crosshair, Fish as FishIcon, Route } from "lucide-react";
import tackleJson from "@/data/tackle.json";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { fish, getCollection, isBossCreature } from "@/lib/content";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import { defaultCatchPools, getBaitGameData } from "@/data/baitGameData";
import type { ContentEntry, FishEntry } from "@/types/content";
import styles from "@/style/page/tackle.module.css";

type RodEntry = { slug: string; name: string; stage: string; description: string; image: string; imageAlt: string; fishSlugs: string[] };

const lureGroups = [
  { id: "regular", title: "Regular lure tiers", description: "Repeatable island catch pools", matches: (entry: ContentEntry) => /Regular lure|Starter lure/.test(entry.eyebrow ?? "") },
  { id: "food", title: "Special shop bait", description: "Small, specific catch pools", matches: (entry: ContentEntry) => /Food bait|Special bait/.test(entry.eyebrow ?? "") },
  { id: "boss", title: "Boss lures", description: "Purchased encounter lures", matches: (entry: ContentEntry) => /Boss lure/.test(entry.eyebrow ?? "") },
  { id: "story", title: "Quest bait", description: "One-use objective items", matches: (entry: ContentEntry) => /Quest bait/.test(entry.eyebrow ?? "") },
  { id: "triggers", title: "Encounter triggers", description: "Carried bodies, not equippable lures", matches: (entry: ContentEntry) => /trigger/i.test(entry.eyebrow ?? "") },
] as const;

function targetHref(entry: FishEntry) {
  return isBossCreature(entry) ? `/bosses/${entry.slug}/` : `/creatures/${entry.slug}/`;
}

export function BaitAndLuresPage() {
  const rods = tackleJson as RodEntry[];
  const lures = getCollection("bait");
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki/" }, { name: "Bait, Lures & Rods", href: "/wiki/bait-and-lures/" }];
  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.bait)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Equipment compatibility"
        title="How to Fish Bait, Lures & Rods Guide"
        description="Choose a target, then match it with the correct rod, lure, island and weighted catch pool. Defeated boss bodies are carried triggers; quest bait such as Leech Bait, Carrot, Fish Bucket and Empty Beer Can is equipped on a rod."
        image="/images/official/gameplay-07.jpg"
        imageAlt="Official How to Fish gameplay screenshot showing a fishing setup"
        summary={<><span><strong>{rods.length}</strong> rod types</span><span><strong>{lures.length}</strong> bait and trigger entries</span></>}
      />
      <div className={styles.paper}>
        <aside className={styles.sidebar}>
          <h2>Find equipment</h2>
          <nav><a href="#rods"><span>Fishing rods</span><b>{rods.length}</b></a><a href="#default-pools"><span>No-bait pools</span><b>{defaultCatchPools.length}</b></a>{lureGroups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.title}</span><b>{lures.filter(group.matches).length}</b></a>)}</nav>
          <Link href="/creatures/">Browse creatures <ArrowRight size={13} /></Link>
          <Link href="/bosses/">Browse boss triggers <ArrowRight size={13} /></Link>
        </aside>

        <div className={styles.content}>
          <section id="rods" className={styles.section}>
            <header><Anchor size={24} /><div><p>Step 1 · choose the rod</p><h2>Rod compatibility</h2></div></header>
            <div className={styles.rodList}>{rods.map((rod) => {
              const catches = rod.fishSlugs.map((slug) => fish.find((entry) => entry.slug === slug)).filter((entry): entry is FishEntry => Boolean(entry));
              const regularCount = catches.filter((entry) => !isBossCreature(entry)).length;
              return <article className={styles.rodCard} id={rod.slug} key={rod.slug}>
                <div className={styles.rodIdentity}><span className={styles.rodMedia}><Image src={rod.image} alt={rod.imageAlt} fill sizes="80px" /></span><div><small>{rod.stage}</small><h3>{rod.name}</h3><p>{rod.description}</p></div></div>
                <dl><div><dt>Regular targets</dt><dd>{regularCount}</dd></div><div><dt>Encounters</dt><dd>{catches.length - regularCount}</dd></div><div><dt>Islands</dt><dd>{new Set(catches.map((entry) => entry.islandSlug)).size}</dd></div></dl>
                <nav aria-label={`${rod.name} example targets`}>{catches.slice(0, 8).map((entry) => <Link href={targetHref(entry)} key={entry.slug}>{entry.name}</Link>)}</nav>
              </article>;
            })}</div>
          </section>

          <section id="default-pools" className={styles.section}>
            <header><FishIcon size={24} /><div><p>No inventory item</p><h2>Default no-bait pools</h2><span>These are internal pool records, not a reusable item called Free Lure. Rod and island pairings are gameplay cross-checks.</span></div></header>
            <div className={styles.defaultPools}>{defaultCatchPools.map((pool) => <article key={pool.id}><div><small>{pool.rod}</small><h3>{pool.name}</h3><p>Leave the bait slot empty. The internal catch-time field is {pool.catchTimeSeconds.min}–{pool.catchTimeSeconds.max} seconds.</p></div><nav aria-label={`${pool.name} targets`}>{pool.catchables.map((catchable) => <Link href={`/creatures/${catchable.slug}/`} key={catchable.slug}>{catchable.name}<span>{catchable.poolShare.toFixed(catchable.poolShare % 1 ? 1 : 0)}%</span></Link>)}</nav></article>)}</div>
          </section>

          {lureGroups.map((group) => {
            const entries = lures.filter(group.matches);
            return <section id={group.id} className={styles.section} key={group.id}>
              <header><Crosshair size={24} /><div><p>Step 2 · match the target</p><h2>{group.title}</h2><span>{group.description}</span></div></header>
              <div className={styles.lureGrid}>{entries.map((lure) => {
                const catches = (lure.catchSlugs ?? []).map((slug) => fish.find((entry) => entry.slug === slug)).filter((entry): entry is FishEntry => Boolean(entry));
                const gameData = getBaitGameData(lure.slug);
                const rodsUsed = gameData ? [gameData.rod] : [...new Set(catches.map((entry) => entry.rod).filter((rod) => rod !== "None"))];
                return <article className={styles.lureCard} key={lure.slug}>
                  <Link className={styles.lureMedia} href={`/wiki/bait-and-lures/${lure.slug}/`}><Image src={lure.image} alt={lure.imageAlt} fill sizes="240px" /><small>{catches.length} target{catches.length === 1 ? "" : "s"}</small></Link>
                  <div className={styles.lureBody}><p>{lure.eyebrow}</p><h3><Link href={`/wiki/bait-and-lures/${lure.slug}/`}>{lure.name}</Link></h3><span>{lure.description}</span><div className={styles.setup}><Route size={13} /><b>{rodsUsed.join(" / ") || "No rod · physical trigger"}{gameData ? ` · ${gameData.catchTimeSeconds.min}–${gameData.catchTimeSeconds.max}s` : ""}</b></div><nav aria-label={`${lure.name} target pages`}>{catches.map((entry) => <Link href={targetHref(entry)} key={entry.slug}><FishIcon size={11} />{entry.name}</Link>)}</nav><Link className={styles.openLink} href={`/wiki/bait-and-lures/${lure.slug}/`}>See stats and catch pool <ArrowRight size={13} /></Link></div>
                </article>;
              })}</div>
            </section>;
          })}
        </div>
      </div>
    </main>
  );
}
