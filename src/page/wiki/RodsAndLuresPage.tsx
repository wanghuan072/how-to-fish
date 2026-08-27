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
        title="How to Fish Bait, Lures & Rods: Catch Setups"
        description="Browse the two fishing rods and every equippable bait or lure. Each entry explains its purpose; open its detail page for price, catch timing, pool weights, targets and route links."
        image="/images/official/gameplay-07.jpg"
        imageAlt="Official How to Fish gameplay screenshot showing a fishing setup"
        summary={<><span><strong>{rods.length}</strong> rod types</span><span><strong>{lures.length}</strong> equippable bait and lure entries</span></>}
      />
      <div className={styles.paper}>
        <aside className={styles.sidebar}>
          <h2>Browse equipment</h2>
          <nav><a href="#rods"><span>Fishing rods</span><b>{rods.length}</b></a><a href="#default-pools"><span>Default rod catches</span><b>{defaultCatchPools.length}</b></a>{lureGroups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.title}</span><b>{lures.filter(group.matches).length}</b></a>)}</nav>
          <Link href="/creatures/">Browse creatures <ArrowRight size={13} /></Link>
          <Link href="/bosses/">Browse boss triggers <ArrowRight size={13} /></Link>
        </aside>

        <div className={styles.content}>
          <section id="rods" className={styles.section}>
            <header><Anchor size={24} /><div><p>Fishing equipment</p><h2>Fishing rods</h2><span>Open a rod page to see its confirmed no-bait pool, compatible bait and lure entries, and all linked creatures.</span></div></header>
            <div className={styles.rodList}>{rods.map((rod) => {
              const catches = rod.fishSlugs.map((slug) => fish.find((entry) => entry.slug === slug)).filter((entry): entry is FishEntry => Boolean(entry));
              const regularCount = catches.filter((entry) => !isBossCreature(entry)).length;
              return <article className={styles.rodCard} id={rod.slug} key={rod.slug}>
                <div className={styles.rodIdentity}><span className={styles.rodMedia}><Image src={rod.image} alt={rod.imageAlt} fill sizes="80px" /></span><div><small>{rod.stage}</small><h3><Link href={`/wiki/bait-and-lures/rods/${rod.slug}/`}>{rod.name}</Link></h3><p>{rod.description}</p><Link className={styles.openLink} href={`/wiki/bait-and-lures/rods/${rod.slug}/`}>View rod details <ArrowRight size={13} /></Link></div></div>
                <dl><div><dt>Regular targets</dt><dd>{regularCount}</dd></div><div><dt>Encounters</dt><dd>{catches.length - regularCount}</dd></div><div><dt>Islands</dt><dd>{new Set(catches.map((entry) => entry.islandSlug)).size}</dd></div></dl>
                <nav aria-label={`${rod.name} example targets`}>{catches.slice(0, 8).map((entry) => <Link href={targetHref(entry)} key={entry.slug}>{entry.name}</Link>)}</nav>
              </article>;
            })}</div>
          </section>

          <section id="default-pools" className={styles.section}>
            <header><FishIcon size={24} /><div><p>Equip a rod, then leave the bait slot empty</p><h2>Default Rod Catches (No Bait Equipped)</h2><span>You still need the listed fishing rod and must cast on the matching island. When no Bait or Lure is selected, the game uses that rod’s default catch table instead of consuming an item. “No bait equipped” is not a separate item or a “Free Lure.”</span></div></header>
            <div className={styles.defaultPools}>{defaultCatchPools.map((pool) => <article key={pool.id}><div><small>{pool.rod}</small><h3>{pool.name}</h3><p>Equip {pool.rod}, leave the bait slot empty, then cast on its matching island. The confirmed catch time is {pool.catchTimeSeconds.min}–{pool.catchTimeSeconds.max} seconds.</p></div><nav aria-label={`${pool.name} targets`}>{pool.catchables.map((catchable) => <Link href={`/creatures/${catchable.slug}/`} key={catchable.slug}>{catchable.name}<span>{catchable.poolShare.toFixed(catchable.poolShare % 1 ? 1 : 0)}%</span></Link>)}</nav></article>)}</div>
          </section>

          {lureGroups.map((group) => {
            const entries = lures.filter(group.matches);
            return <section id={group.id} className={styles.section} key={group.id}>
              <header><Crosshair size={24} /><div><p>Equippable fishing item</p><h2>{group.title}</h2><span>{group.description}</span></div></header>
              <div className={styles.lureGrid}>{entries.map((lure) => {
                const catches = (lure.catchSlugs ?? []).map((slug) => fish.find((entry) => entry.slug === slug)).filter((entry): entry is FishEntry => Boolean(entry));
                const visibleCatches = catches.slice(0, 6);
                const gameData = getBaitGameData(lure.slug);
                const rodsUsed = gameData ? [gameData.rod] : [...new Set(catches.map((entry) => entry.rod).filter((rod) => rod !== "None"))];
                return <article className={styles.lureCard} key={lure.slug}>
                  <Link className={styles.lureMedia} href={`/wiki/bait-and-lures/${lure.slug}/`}><Image src={lure.image} alt={lure.imageAlt} fill sizes="240px" /><small>{catches.length} target{catches.length === 1 ? "" : "s"}</small></Link>
                  <div className={styles.lureBody}><p>{lure.eyebrow}</p><h3><Link href={`/wiki/bait-and-lures/${lure.slug}/`}>{lure.name}</Link></h3><span>{lure.description}</span><div className={styles.setup}><Route size={13} /><b>Equip to {rodsUsed.join(" / ")}{gameData ? ` · ${gameData.catchTimeSeconds.min}–${gameData.catchTimeSeconds.max}s catch time` : ""}</b></div><nav aria-label={`${lure.name} example target pages`}>{visibleCatches.map((entry) => <Link href={targetHref(entry)} key={entry.slug}><FishIcon size={11} />{entry.name}</Link>)}</nav><Link className={styles.openLink} href={`/wiki/bait-and-lures/${lure.slug}/`}>View all targets and parameters <ArrowRight size={13} /></Link></div>
                </article>;
              })}</div>
            </section>;
          })}
        </div>
      </div>
    </main>
  );
}
