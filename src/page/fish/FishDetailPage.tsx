import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Anchor,
  ArrowRight,
  Clock3,
  Coins,
  Crosshair,
  Fish,
  Map,
  MapPin,
  PackageCheck,
  Sparkles,
  Star,
  TriangleAlert,
  Trophy,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { getFish, getFishContent, getFishImage, getFishImageAlt, islands, regularFish } from "@/lib/content";
import { getFishRelationItems } from "@/lib/contentRelations";
import { getFishArea, getFishBaitLinks, getFishCatchMethod, getFishRecordLinks, getFishRodLink } from "@/lib/fishRelations";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import styles from "@/style/page/fish-detail.module.css";

const sectionIds = ["quick-answer", "data-overview", "where-to-find", "how-to-catch", "best-bait-gear", "sell-value", "rare-variant", "common-mistakes", "faq"];

function SectionTitle({ number, children }: { number: number; children: React.ReactNode }) {
  return <h2 className={styles.sectionTitle}><span>{number}</span>{children}</h2>;
}

export function FishDetailPage({ slug }: { slug: string }) {
  const entry = getFish(slug);
  if (!entry) notFound();
  const content = getFishContent(entry);
  const island = islands.find((item) => item.slug === entry.islandSlug);
  const baitLinks = getFishBaitLinks(entry);
  const baitLinkBySlug = new globalThis.Map(baitLinks.map((item) => [item.href.split("/").filter(Boolean).at(-1), item]));
  const rodLink = getFishRodLink(entry);
  const recordLinks = getFishRecordLinks(entry);
  const objectiveLinks = getFishRelationItems(entry.slug);
  const catchMethod = getFishCatchMethod(entry);
  const starterPoolCatch = catchMethod === "Starter pool catch";
  const area = getFishArea(entry);
  const related = regularFish
    .filter((candidate) => candidate.slug !== slug && candidate.islandSlug === entry.islandSlug)
    .sort((a, b) => Number(b.lure === entry.lure) - Number(a.lure === entry.lure) || a.name.localeCompare(b.name))
    .slice(0, 4);
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Fish", href: "/fish/" }, { name: entry.name, href: `/fish/${entry.slug}/` }];
  const steps = catchMethod === "Ground pickup" ? [
    [MapPin, "Go to Lighthouse", "Stay in the opening grounds."],
    [PackageCheck, "Leave bait unequipped", "No rod or lure is required."],
    [Anchor, "Search the ground", "This is a pickup, not a pool catch."],
    [Crosshair, "Pick up the Clam", "Interact with the ground creature."],
    [Clock3, "Check the encyclopedia", "Use Tab to confirm registration."],
  ] as const : starterPoolCatch ? [
    [MapPin, "Go to Lighthouse", `Use the ${entry.lure}.`],
    [PackageCheck, `Equip ${entry.rod}`, "No separate lure is needed."],
    [Anchor, "Fish the starter pool", "Stay in the opening Lighthouse area."],
    [Crosshair, `Land ${entry.name}`, "Keep it separate from the other crab entries."],
    [Clock3, "Check the encyclopedia", "Use Tab to confirm registration."],
  ] as const : [
    [MapPin, `Go to ${entry.islandName}`, `Target ${area}.`],
    [PackageCheck, `Equip ${entry.rod}`, `Select ${entry.lure}.`],
    [Anchor, catchMethod === "Rod catch" ? "Fish the regular pool" : "Complete the trigger route", catchMethod === "Rod catch" ? `Stay on ${entry.islandName}.` : "Do not substitute a regular lure."],
    [Crosshair, "Land the creature", "Create space before attacking."],
    [Clock3, "Confirm the entry", "Use Tab before spending another bait."],
  ] as const;

  return (
    <main id="main-content">
      <JsonLd data={[articleSchema(content, `/fish/${entry.slug}/`), breadcrumbSchema(breadcrumbs), faqSchema(content.faq ?? [])]} />

      <header className={styles.hero}>
        <Image className={styles.heroBackdrop} src={island?.image ?? "/images/official/gameplay-03.jpg"} alt="" fill loading="eager" sizes="100vw" />
        <div className={styles.heroShade} />
        <div className="container">
          <Breadcrumb items={breadcrumbs} />
          <div className={styles.heroGrid}>
            <div className={styles.heroVisual}><Image src={getFishImage(entry)} alt={content.imageAlt} fill loading="eager" sizes="520px" /><small>Wiki species illustration</small></div>
            <div className={styles.heroCopy}>
              <p>{entry.category} creature guide</p>
              <h1>{entry.name}</h1>
              <span>{content.description}</span>
              <div className={styles.heroFacts}>
                <div><Sparkles size={18} /><small>Type</small><strong>{entry.category}</strong></div>
                <div><Map size={18} /><small>Island</small><strong>{entry.islandName}</strong></div>
                <div><Coins size={18} /><small>Base coins</small><strong>{entry.baseValue !== undefined ? entry.baseValue.toLocaleString("en-US") : "No fixed value"}</strong></div>
                <div><Fish size={18} /><small>Method</small><strong>{catchMethod}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`container ${styles.pageGrid}`}>
        <article className={styles.article}>
          <section className={`${styles.block} ${styles.quick}`} id="quick-answer">
            <SectionTitle number={1}>Quick Answer</SectionTitle>
            <div><Star size={38} /><p>Find <strong>{entry.name}</strong> in <Link className={styles.inlineLink} href={`/islands/${entry.islandSlug}/`}>{area}</Link>. {catchMethod === "Ground pickup" ? <>Pick it up directly; no rod or bait is required.</> : starterPoolCatch ? <>Use <strong>{entry.rod}</strong> in the <strong>{entry.lure}</strong>; no separate lure is needed.</> : <>Use <strong>{entry.rod}</strong> with {(entry.catchMethods ?? []).map((method, index) => { const link = method.baitSlug ? baitLinkBySlug.get(method.baitSlug) : undefined; return <span key={`${method.baitSlug ?? method.baitName}-${index}`}>{index ? " or " : ""}{link ? <Link className={styles.inlineLink} href={link.href}>{method.baitName}</Link> : <strong>{method.baitName}</strong>}{method.poolShare !== undefined ? <> ({method.poolShare.toFixed(method.poolShare % 1 ? 2 : 0)}% pool share)</> : null}</span>; })}.</>} {entry.note ?? "Kill the creature so it registers in the encyclopedia."}</p></div>
          </section>

          <section className={`${styles.block} ${styles.dataBlock}`} id="data-overview">
            <SectionTitle number={2}>{entry.name} Data Overview</SectionTitle>
            <dl className={styles.dataOverview}>
              <div><dt>Creature type</dt><dd>{entry.category}</dd></div>
              <div><dt>Island</dt><dd><Link className={styles.inlineLink} href={`/islands/${entry.islandSlug}/`}>{entry.islandName}</Link></dd></div>
              <div><dt>Area</dt><dd>{area}</dd></div>
              <div><dt>Catch method</dt><dd>{catchMethod}</dd></div>
              <div><dt>Required rod</dt><dd>{rodLink ? <Link className={styles.inlineLink} href={rodLink.href}>{entry.rod}</Link> : entry.rod}</dd></div>
              <div><dt>{starterPoolCatch ? "Fishing pool" : "Bait / trigger"}</dt><dd>{(entry.catchMethods ?? []).map((method, index) => { const link = method.baitSlug ? baitLinkBySlug.get(method.baitSlug) : undefined; return <span key={`${method.baitName}-${index}`}>{index ? " · " : ""}{link ? <Link className={styles.inlineLink} href={link.href}>{method.baitName}</Link> : method.baitName}</span>; })}</dd></div>
              <div><dt>Base coins</dt><dd className={styles.dataCoins}>{entry.baseValue !== undefined ? <><Coins size={15} aria-hidden="true" />{entry.baseValue.toLocaleString("en-US")}</> : "No fixed value"}</dd></div>
              <div><dt>Route</dt><dd>{entry.progression ?? "Collection"}</dd></div>
              <div><dt>Related quests</dt><dd>{objectiveLinks.quests.length ? objectiveLinks.quests.map((item, index) => <span key={item.href}>{index ? " · " : ""}<Link className={styles.inlineLink} href={item.href}>{item.title}</Link></span>) : "No direct quest"}</dd></div>
              <div><dt>Achievements</dt><dd>{objectiveLinks.achievements.length ? objectiveLinks.achievements.map((item, index) => <span key={item.href}>{index ? " · " : ""}<Link className={styles.inlineLink} href={item.href}>{item.title}</Link></span>) : <Link className={styles.inlineLink} href="/wiki/achievements/#collector">Collector / Fishipedia</Link>}</dd></div>
            </dl>
          </section>

          <section className={styles.block} id="where-to-find">
            <SectionTitle number={3}>Where to Find {entry.name}</SectionTitle>
            <p className={styles.intro}>{entry.name} appears during the <Link className={styles.inlineLink} href={`/islands/${entry.islandSlug}/`}>{entry.islandName}</Link> route around {area}. Match the rod and bait shown below, then check the in-game Tab encyclopedia after the kill.</p>
            <div className={styles.locationGrid}>
              <div className={styles.locationImage}><Image src={island?.image ?? getFishImage(entry)} alt={`${entry.islandName} gameplay location`} fill sizes="560px" /></div>
              <div className={styles.locationCard}><h3><Link href={`/islands/${entry.islandSlug}/`}>{entry.islandName}</Link></h3><p>{island?.description ?? "The island stage for this creature."}</p><h4>Required setup</h4><ul><li>Area: {area}</li><li>Method: {catchMethod}</li><li>Rod: {rodLink ? <Link className={styles.inlineLink} href={rodLink.href}>{entry.rod}</Link> : entry.rod}</li><li>{starterPoolCatch ? "Fishing pool" : "Bait / trigger"}: {entry.lure}</li><li>Route: {entry.progression ?? "Collection"}</li></ul><h4>Keep going</h4><p>Use the island, bait and quest links below when this catch is part of a longer objective.</p></div>
            </div>
          </section>

          <section className={styles.block} id="how-to-catch">
            <SectionTitle number={4}>How to Catch {entry.name}</SectionTitle>
            <div className={styles.steps}>{steps.map(([Icon, title, text], index) => <div key={title}><span>{index + 1}</span><Icon size={34} /><strong>{title}</strong><p>{text}</p></div>)}</div>
          </section>

          <section className={styles.block} id="best-bait-gear">
            <SectionTitle number={5}>Catch Methods and Bait Data</SectionTitle>
            <div className={`${styles.gearGrid} ${(entry.catchMethods?.length ?? 0) === 1 ? styles.singleMethodGrid : ""}`}>
              {(entry.catchMethods ?? []).map((method, index) => { const link = method.baitSlug ? baitLinkBySlug.get(method.baitSlug) : undefined; return <div key={`${method.baitName}-${index}`}><span><Fish size={30} /></span><strong>{link ? <Link className={styles.inlineLink} href={link.href}>{method.baitName}</Link> : method.baitName}</strong><p>{method.rod} · {method.catchTimeSeconds ? `${method.catchTimeSeconds.min}–${method.catchTimeSeconds.max}s bite window` : method.methodType}{method.methodType === "Default pool" ? " · no bait equipped" : method.lostOnBaitChance !== undefined ? ` · ${method.lostOnBaitChance}% loss chance on bite` : ""}</p><b>{method.poolShare !== undefined ? `${method.poolShare.toFixed(method.poolShare % 1 ? 2 : 0)}% pool share · weight ${method.rawWeight}` : method.methodType}</b></div>; })}
            </div>
          </section>

          <section className={styles.block} id="sell-value">
            <SectionTitle number={6}>Sell Value and Is It Worth Farming?</SectionTitle>
            <div className={styles.valueGrid}>
              <div><small>Base coins</small><strong className={styles.coinAmount}>{entry.baseValue !== undefined ? <><Coins size={17} aria-hidden="true" />{entry.baseValue.toLocaleString("en-US")}</> : "No fixed value"}</strong><span>{entry.valueNote ?? "Check the live value before selling"}</span></div>
              <div><small>Cooking cap</small><strong>Up to 1.5×</strong><span>Pull away before the item burns</span></div>
              <div><small>Killscore</small><strong>Stacks</strong><span>Applied separately from cooking</span></div>
              <div><Trophy size={35} /><small>Collection use</small><strong>{objectiveLinks.quests.length ? "Quest target" : "Encyclopedia"}</strong><span>{objectiveLinks.achievements.length ? `${objectiveLinks.achievements.length} direct achievement link${objectiveLinks.achievements.length === 1 ? "" : "s"}` : "Counts toward collection goals"}</span></div>
            </div>
          </section>

          <section className={`${styles.block} ${styles.rare}`} id="rare-variant">
            <SectionTitle number={7}>Rare Variant</SectionTitle>
            <div><span className={styles.rareImage}><Image src={getFishImage(entry)} alt={getFishImageAlt(entry)} fill sizes="520px" /></span><p><strong>Drip {entry.name}</strong><br />Drip variants use the normal creature route and are tracked separately in the Tab encyclopedia. Watch for the rainbow-name treatment, kill the variant so it registers, and use blank encyclopedia entries for cleanup.</p><aside><Sparkles size={27} /><strong>Setup</strong><span>{entry.lure}</span></aside></div>
          </section>

          <section className={`${styles.block} ${styles.mistakes}`} id="common-mistakes"><SectionTitle number={8}>Common Mistakes</SectionTitle><div><TriangleAlert size={50} /><ul><li>Using the wrong bait.</li><li>Fishing on the wrong island.</li><li>Skipping prerequisite dialogue.</li><li>Trusting an old fixed-value table.</li></ul></div></section>

          <section className={styles.block} id="faq"><SectionTitle number={9}>FAQ</SectionTitle><FaqList items={content.faq ?? []} /></section>

        </article>

        <aside className={styles.sidebar} aria-label={`${entry.name} quick information`}>
          <section className={`${styles.sideCard} ${styles.profileCard}`}>
            <h2>{entry.name}<Star size={19} /></h2>
            <div className={styles.sideImage}><Image src={getFishImage(entry)} alt={getFishImageAlt(entry)} fill sizes="520px" /></div>
          </section>

          <section className={`${styles.sideCard} ${styles.toc}`}><h2>On This Page</h2><ol>{sectionIds.map((id, index) => <li key={id}><a href={`#${id}`}>{index + 1}. {id === "best-bait-gear" ? "Catch Methods" : id.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")}</a></li>)}</ol></section>

          <section className={styles.sideCard}><h2><PackageCheck size={17} /> Catch & Route Links</h2><nav className={styles.sideLinks}>{recordLinks.map((item) => <Link href={item.href} key={`${item.kind}-${item.href}`}><span><small>{item.kind}</small>{item.name}</span><ArrowRight size={13} /></Link>)}</nav></section>

          {objectiveLinks.quests.length || objectiveLinks.achievements.length ? <section className={styles.sideCard}><h2><Trophy size={17} /> Quests & Achievements</h2><nav className={styles.sideLinks}>{[...objectiveLinks.quests, ...objectiveLinks.achievements].map((item) => <Link href={item.href} key={item.href}><span><small>{item.meta}</small>{item.title}</span><ArrowRight size={13} /></Link>)}</nav></section> : null}

          <section className={styles.sideCard}>
            <h2><MapPin size={17} /> Found In</h2>
            <Link className={styles.horizontalSideCard} href={`/islands/${entry.islandSlug}/`}><span className={styles.horizontalImage}><Image src={island?.image ?? getFishImage(entry)} alt={`${entry.islandName} island`} fill sizes="130px" /></span><span><strong>{entry.islandName}</strong><small>{island?.description}</small><b>View island guide <ArrowRight size={12} /></b></span></Link>
          </section>

          <section className={styles.sideCard}><h2>Related Fish</h2><nav className={styles.relatedSideList}>{related.map((item) => <Link href={`/fish/${item.slug}/`} key={item.slug}><span className={styles.relatedSideImage}><Image src={getFishImage(item)} alt={getFishImageAlt(item)} fill sizes="92px" /></span><span><strong>{item.name}</strong><small>{item.category} · {item.lure}</small><b>See catch details <ArrowRight size={11} /></b></span></Link>)}</nav><Link className={styles.moreLink} href="/fish/">View all fish →</Link></section>
        </aside>
      </div>
    </main>
  );
}
