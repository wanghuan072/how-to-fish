import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Coins,
  Crosshair,
  Database,
  MapPin,
  Package,
  Route,
  Target,
  UserRound,
} from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { collectionConfig } from "@/config/collections";
import directoryGroupsJson from "@/data/directory-groups.json";
import { fish, getCollection, isBossCreature } from "@/lib/content";
import { itemRoutes, weaponProgression } from "@/lib/gameplayData";
import { getBaitGameData } from "@/data/baitGameData";
import { contentDisplayName } from "@/lib/contentNaming";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import type { CollectionKey, ContentEntry, DirectoryGroups, IslandEntry } from "@/types/content";
import styles from "@/style/page/directory.module.css";

type DirectoryConfig = (typeof collectionConfig)[CollectionKey];
const directoryGroups = directoryGroupsJson as DirectoryGroups;

function entryHref(config: DirectoryConfig, entry: ContentEntry) {
  return `${config.detailPrefix}/${entry.slug}/`;
}

function firstBullets(entry: ContentEntry) {
  return entry.sections.find((section) => section.bullets?.length)?.bullets ?? [];
}

function priceLabel(entry: ContentEntry) {
  const price = `${entry.eyebrow ?? ""} ${(entry.tags ?? []).join(" ")}`.match(/\$[\d,]+/)?.[0];
  if (price) return price;
  if (/Encounter trigger|Final encounter trigger/i.test(entry.eyebrow ?? "")) return "Not purchased";
  if (/Story bait|Quest item|Final-route/.test(`${entry.eyebrow ?? ""} ${(entry.tags ?? []).join(" ")}`)) return "Quest supplied";
  return "No price shown";
}

function BossDirectory({ entries, config }: { entries: ContentEntry[]; config: DirectoryConfig }) {
  const story = entries.filter((entry) => (entry.tags ?? []).includes("Story") || /Final|Story setup|Final-route/.test(entry.eyebrow ?? ""));
  const optional = entries.filter((entry) => !story.includes(entry));
  const renderGroup = (title: string, description: string, group: ContentEntry[]) => (
    <section className={styles.bossGroup}>
      <header><div><span>{title === "Story route" ? "Main path" : "Collection"}</span><h2>{title}</h2><p>{description}</p></div><strong>{group.length} encounters</strong></header>
      <div className={styles.bossFiles}>
        {group.map((entry, index) => (
          <article className={styles.bossFile} id={entry.slug} key={entry.slug}>
            <Link className={styles.bossMedia} href={entryHref(config, entry)}>
              <Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 768px) 100vw, 320px" />
              <span>#{String(index + 1).padStart(2, "0")}</span>
            </Link>
            <div className={styles.bossFileBody}>
              <p className={styles.kicker}><Crosshair size={14} /> {entry.eyebrow}</p>
              <h3><Link href={entryHref(config, entry)}>{contentDisplayName("bosses", entry)}</Link></h3>
              <p>{entry.description}</p>
              <dl className={styles.bossFacts}>
                <div><dt>Trigger</dt><dd>{entry.tags?.[0] ?? "Open the fight guide"}</dd></div>
                <div><dt>Route</dt><dd>{entry.tags?.[1] ?? "Optional encounter"}</dd></div>
              </dl>
              {firstBullets(entry).length ? <ul className={styles.microSteps}>{firstBullets(entry).slice(0, 3).map((step) => <li key={step}><CheckCircle2 size={13} />{step}</li>)}</ul> : null}
              <Link className={styles.actionLink} href={entryHref(config, entry)}>Open tactical guide <ArrowRight size={15} /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );

  return <div className={styles.bossBoard}>{renderGroup("Story route", "Required encounters and hand-ins that move the island route forward.", story)}{renderGroup("Optional encounters", "Mini-bosses and collection targets that do not unlock the next island.", optional)}</div>;
}

function IslandDirectory({ entries, config }: { entries: ContentEntry[]; config: DirectoryConfig }) {
  const islands = entries as IslandEntry[];
  return (
    <section className={styles.routeMap} aria-label="Island progression route">
      {islands.map((entry, index) => (
        <article className={styles.routeStop} id={entry.slug} key={entry.slug}>
          <div className={styles.routeRail}><span>{entry.number}</span>{index < islands.length - 1 ? <i /> : null}</div>
          <Link className={styles.routeMedia} href={entryHref(config, entry)}><Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 768px) 100vw, 330px" /></Link>
          <div className={styles.routeBody}>
            <p className={styles.kicker}><Route size={14} /> Stage {entry.number} · {entry.tags?.[1]}</p>
            <h2><Link href={entryHref(config, entry)}>{entry.label}</Link></h2>
            <p>{entry.description}</p>
            <div className={styles.islandMetrics}><span><Database size={15} /><strong>{entry.fishCount}</strong> creatures</span><span><Target size={15} /><strong>{entry.bossNames.length}</strong> encounters</span></div>
            <div className={styles.bossChips}>{entry.bossNames.map((boss) => <span key={boss}>{boss}</span>)}</div>
            <Link className={styles.actionLink} href={entryHref(config, entry)}>View stage route <ArrowRight size={15} /></Link>
          </div>
        </article>
      ))}
    </section>
  );
}

function QuestDirectory({ entries, config }: { entries: ContentEntry[]; config: DirectoryConfig }) {
  return (
    <div className={styles.questBoard}>
      {entries.map((entry, index) => (
        <article className={styles.questSheet} id={entry.slug} key={entry.slug}>
          <header><span>{String(index + 1).padStart(2, "0")}</span><div><p>{entry.eyebrow}</p><h2><Link href={entryHref(config, entry)}>{contentDisplayName("quests", entry)}</Link></h2></div></header>
          <p className={styles.questSummary}>{entry.description}</p>
          <ol>{firstBullets(entry).slice(0, 4).map((step) => <li key={step}><span><CircleDot size={13} /></span>{step}</li>)}</ol>
          <footer><div>{(entry.tags ?? []).map((tag) => <span key={tag}>{tag}</span>)}</div><Link href={entryHref(config, entry)}>Open checklist <ChevronRight size={15} /></Link></footer>
        </article>
      ))}
    </div>
  );
}

function GuideDirectory({ entries, config }: { entries: ContentEntry[]; config: DirectoryConfig }) {
  return (
    <div className={styles.catalogLayout}>
      <aside className={styles.categorySidebar} aria-label="Guide categories">
        <h2>Current Guides</h2>
        <nav>{entries.map((entry, index) => <a href={`#${entry.slug}`} key={entry.slug}><span>{contentDisplayName("guides", entry)}</span><b>{index + 1}</b></a>)}</nav>
        <Link href="/wiki/rods-and-lures/">Rods & lures <ArrowRight size={14} /></Link>
      </aside>
      <div className={styles.guideSections}>
        <section className={styles.guideGroup} id="current-guides">
          <header><div><p>Available now</p><h2>Start Here</h2><span>Choose a spoiler-light introduction or follow the complete story route.</span></div><strong>{entries.length} guides</strong></header>
          <div className={styles.guideGrid}>{entries.map((entry) => <article className={styles.guideStory} id={entry.slug} key={entry.slug}><Link className={styles.guideStoryMedia} href={entryHref(config, entry)}><Image src={entry.image} alt={entry.imageAlt} fill sizes="(max-width: 768px) 100vw, 360px" /></Link><div><p>{entry.eyebrow}</p><h3><Link href={entryHref(config, entry)}>{contentDisplayName("guides", entry)}</Link></h3><span>{entry.description}</span><div className={styles.topicTags}>{entry.tags?.slice(0, 2).map((tag) => <b key={tag}>{tag}</b>)}</div><Link href={entryHref(config, entry)}>Read guide <ArrowRight size={14} /></Link></div></article>)}</div>
        </section>
      </div>
    </div>
  );
}

function UpdateDirectory({ entries }: { entries: ContentEntry[] }) {
  return <div className={styles.updateTimeline}>{entries.map((entry) => <article className={styles.updateEntry} id={entry.slug} key={entry.slug}><time dateTime={entry.updated}>{entry.updated}</time><i /><div className={styles.updateMedia}><Image src={entry.image} alt={entry.imageAlt} fill sizes="240px" /></div><div><p>{entry.tags?.join(" · ")}</p><h2>{entry.name}</h2><span>{entry.description}</span>{entry.sections.map((section) => <section className={styles.updateSection} key={section.heading}><h3>{section.heading}</h3>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets?.length ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>)}<nav className={styles.updateLinks}><Link href="/fish/">Fish list</Link><Link href="/guides/beginner-guide/">Beginner guide</Link><Link href="/wiki/achievements/">Achievements</Link></nav></div></article>)}</div>;
}

function WikiCatalog({ collection, entries, config }: { collection: CollectionKey; entries: ContentEntry[]; config: DirectoryConfig }) {
  const groups = directoryGroups[collection] ?? [];
  const groupEntries = (slugs: string[]) => slugs.map((slug) => entries.find((entry) => entry.slug === slug)).filter((entry): entry is ContentEntry => Boolean(entry));
  const sidebar = <aside className={styles.categorySidebar} aria-label={`${config.title} categories`}><h2>Categories</h2><nav>{groups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.title}</span><b>{groupEntries(group.slugs).length}</b></a>)}</nav>{collection === "bait" ? <Link href="/wiki/rods-and-lures/">Rod compatibility <ArrowRight size={14} /></Link> : null}</aside>;
  const groupHeader = (group: (typeof groups)[number]) => <header className={styles.wikiGroupHeader}><div><p>{config.eyebrow}</p><h2>{group.title}</h2><span>{group.description}</span></div><strong>{groupEntries(group.slugs).length} entries</strong></header>;

  if (collection === "bait") return <div className={styles.catalogLayout}>{sidebar}<div className={styles.wikiSections}>{groups.map((group) => <section className={styles.wikiGroup} id={group.id} key={group.id}>{groupHeader(group)}<div className={styles.baitTable}>{groupEntries(group.slugs).map((entry) => {
    const catches = (entry.catchSlugs ?? []).map((slug) => fish.find((item) => item.slug === slug)).filter((item): item is (typeof fish)[number] => Boolean(item));
    const gameData = getBaitGameData(entry.slug);
    const rod = gameData ? gameData.rod : "Physical trigger";
    return <article id={entry.slug} key={entry.slug}><Link className={styles.baitMedia} href={entryHref(config, entry)}><Image src={entry.image} alt={entry.imageAlt} fill sizes="126px" /><small>{/trigger/i.test(entry.eyebrow ?? "") ? "Trigger" : gameData?.bossBait ? "Boss lure" : gameData?.kind ?? "Catch pool"}</small></Link><div><p>{entry.eyebrow}</p><h3><Link href={entryHref(config, entry)}>{contentDisplayName("bait", entry)}</Link></h3><span>{entry.description}</span><small>Rod: {rod}{gameData ? ` · Catch ${gameData.catchTimeSeconds.min}–${gameData.catchTimeSeconds.max}s · Bait loss ${gameData.lostOnBaitChance}%` : ""}</small>{catches.length ? <nav className={styles.baitTargets} aria-label={`${entry.name} catches`}>{catches.map((item) => { const catchable = gameData?.catchables.find((candidate) => candidate.slug === item.slug); return <Link href={isBossCreature(item) ? `/bosses/${item.slug}/` : `/fish/${item.slug}/`} key={item.slug}>{item.name}{catchable ? ` · ${catchable.poolShare.toFixed(catchable.poolShare % 1 ? 1 : 0)}%` : ""}</Link>; })}</nav> : null}</div><strong><Coins size={15} />{gameData ? gameData.price === null ? "Quest supplied" : `$${gameData.price.toLocaleString("en-US")}` : priceLabel(entry)}</strong><Link href={entryHref(config, entry)}>See stats and catch pool <ArrowRight size={14} /></Link></article>;
  })}</div></section>)}</div></div>;

  if (collection === "weapons") return <div className={styles.catalogLayout}>{sidebar}<div className={styles.wikiSections}>{groups.map((group) => <section className={styles.wikiGroup} id={group.id} key={group.id}>{groupHeader(group)}<div className={styles.armory}>{groupEntries(group.slugs).map((entry) => { const data = weaponProgression[entry.slug]; return <article id={entry.slug} key={entry.slug}><Link className={styles.armoryMedia} href={entryHref(config, entry)}><Image src={entry.image} alt={entry.imageAlt} fill sizes="260px" /></Link><div><p className={styles.kicker}><Crosshair size={14} />{entry.eyebrow}</p><h3><Link href={entryHref(config, entry)}>{contentDisplayName("weapons", entry)}</Link></h3><span>{entry.description}</span><dl><div><dt>Available at</dt><dd>{data?.availableAt ?? "Check the island route"}</dd></div><div><dt>Price</dt><dd>{data?.price ?? "No price shown"}</dd></div><div><dt>Role</dt><dd>{data?.role ?? entry.tags?.[0] ?? "Weapon"}</dd></div><div><dt>Damage</dt><dd>{data?.baseDamage ?? data?.damage ?? "Version dependent"}</dd></div></dl><Link href={entryHref(config, entry)}>See stats, location and uses <ArrowRight size={14} /></Link></div></article>; })}</div></section>)}</div></div>;

  if (collection === "npcs") return <div className={styles.catalogLayout}>{sidebar}<div className={styles.wikiSections}>{groups.map((group) => <section className={styles.wikiGroup} id={group.id} key={group.id}>{groupHeader(group)}<div className={styles.roster}>{groupEntries(group.slugs).map((entry) => <article id={entry.slug} key={entry.slug}><div className={styles.rosterAvatar}><Image src={entry.image} alt={entry.imageAlt} fill sizes="96px" /></div><div><p><MapPin size={13} />{entry.tags?.[0] ?? entry.eyebrow}</p><h3><Link href={entryHref(config, entry)}>{entry.name}</Link></h3><span>{entry.description}</span></div><div className={styles.rosterRole}><UserRound size={17} /><small>Route role</small><strong>{entry.tags?.[1] ?? "Companion"}</strong></div><Link href={entryHref(config, entry)} aria-label={`Open ${entry.name}`}><ChevronRight /></Link></article>)}</div></section>)}</div></div>;

  return <div className={styles.catalogLayout}>{sidebar}<div className={styles.wikiSections}>{groups.map((group) => <section className={styles.wikiGroup} id={group.id} key={group.id}>{groupHeader(group)}<div className={`${styles.inventory} ${styles.itemInventory}`}>{groupEntries(group.slugs).map((entry) => { const data = itemRoutes[entry.slug]; return <article id={entry.slug} key={entry.slug}><Link className={styles.inventoryMedia} href={entryHref(config, entry)}><Image src={entry.image} alt={entry.imageAlt} fill sizes="240px" /></Link><div className={styles.inventoryBody}><p><Package size={14} />{entry.eyebrow}</p><h3><Link href={entryHref(config, entry)}>{entry.name}</Link></h3><span>{entry.description}</span><dl><div><dt>Location</dt><dd>{data?.foundAt ?? entry.tags?.[0]}</dd></div><div><dt>Use</dt><dd>{data?.function ?? entry.tags?.[1]}</dd></div></dl><Link href={entryHref(config, entry)}>Open use & location <ArrowRight size={14} /></Link></div></article>; })}</div></section>)}</div></div>;
}

function CollectionList({ collection, entries, config }: { collection: CollectionKey; entries: ContentEntry[]; config: DirectoryConfig }) {
  if (collection === "bosses") return <BossDirectory entries={entries} config={config} />;
  if (collection === "islands") return <IslandDirectory entries={entries} config={config} />;
  if (collection === "quests") return <QuestDirectory entries={entries} config={config} />;
  if (collection === "guides") return <GuideDirectory entries={entries} config={config} />;
  if (collection === "updates") return <UpdateDirectory entries={entries} />;
  return <WikiCatalog collection={collection} entries={entries} config={config} />;
}

export function DirectoryPage({ collection }: { collection: CollectionKey }) {
  const config = collectionConfig[collection];
  const entries = getCollection(collection);
  const entryCount = entries.length;
  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...(config.href.startsWith("/wiki/") ? [{ name: "Wiki", href: "/wiki/" }] : []),
    { name: config.breadcrumb, href: config.href },
  ];

  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema({ name: config.title, description: config.description, path: pageTdk[collection].path })]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow={config.eyebrow}
        title={config.title}
        description={config.description}
        image={config.image}
        summary={<><span><strong>{entryCount}</strong> entries</span><span>Connected quests, items and routes</span></>}
      />

      <section className={styles.paper} aria-label={`${config.title} directory`}>
        <CollectionList collection={collection} entries={entries} config={config} />
      </section>
    </main>
  );
}
