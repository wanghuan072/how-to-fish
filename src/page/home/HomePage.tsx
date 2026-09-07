import Image from "next/image";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  CheckCircle2,
  CalendarClock,
  ChevronRight,
  Crosshair,
  Fish,
  Map,
  ScrollText,
  Skull,
  Trophy,
} from "lucide-react";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { achievements, bossCreatures, creatures, getCollection, getFishImage, getFishImageAlt, islands, regularFish } from "@/lib/content";
import { faqSchema, organizationSchema, websiteSchema } from "@/seo/schema";
import styles from "@/style/page/home.module.css";

const homeFaq = [
  { question: "How do I get to the next island?", answer: "Finish the local quest, defeat the required story boss, pick up its named trophy and return it to the quest giver. A new colored dot appears on the Radar after the hand-in." },
  { question: "What is included in the creature directory?", answer: `The directory records all ${creatures.length} creature prefabs found in the unpacked game data: 40 fish, 5 shell creatures and 9 special creatures. ${bossCreatures.length} boss encounters link to their dedicated strategy pages; ground pickups and ambient creatures are clearly marked.` },
  { question: "Which lure should I use on each island?", answer: "The rods' built-in no-bait pools cover the first crabs and fish. Beginner Lure starts the named lure tiers, followed by Standard on Desert, Professional on Rocks and Scientific on Volcano. Story bosses use their own quest bait or carried trigger." },
  { question: "What should I buy first?", answer: "Buy the $10 Radar once the boat is available, then choose a reliable weapon and improve the boat engine when travel time starts slowing the route down." },
  { question: "How do I catch rare Drip creatures?", answer: "Use the normal creature route and watch for the rainbow-name variant. Kill it so the Tab encyclopedia records the Drip entry." },
  { question: "Can I finish How to Fish solo?", answer: "Yes. The game supports single-player as well as online co-op for up to eight players after Patch 1.0.4. Co-op makes some fights easier, but it is not required for the main route." },
];

const startCards = [
  { title: "Beginner Guide", text: "Learn fishing, combat, selling and the first boat route without late-game spoilers.", href: "/guides/beginner-guide/", image: "/images/official/gameplay-03.jpg", label: "Start here" },
  { title: "Full Walkthrough", text: "Follow every trigger, trophy and NPC hand-in from Lighthouse to Volcano.", href: "/guides/full-walkthrough/", image: "/images/official/gameplay-02.jpg", label: "Follow the route" },
] as const;

const questPreviewImages: Record<string, string> = {
  "who-stole-my-beer": "/images/game/bosses/spider-crab.webp",
  dinnertime: "/images/game/bosses/giant-piranha.webp",
  vacation: "/images/game/bosses/pufferfish.webp",
  grillmaster: "/images/game/bosses/blue-shark.png",
  "terrorizing-bird": "/images/game/bosses/albatross.webp",
  "scientists-whale-bait": "/images/game/bosses/mutated-bowhead-whale.webp",
};

export function HomePage() {
  const quests = getCollection("quests");
  const bosses = getCollection("bosses");
  const weapons = getCollection("weapons");
  const fishRows = regularFish.slice(0, 10);
  const bossHighlights = ["spider-crab", "giant-piranha", "pufferfish", "blue-shark", "albatross", "mutated-bowhead-whale"]
    .map((slug) => bosses.find((boss) => boss.slug === slug))
    .filter((boss): boss is (typeof bosses)[number] => Boolean(boss));
  const achievementSpotlights = [
    { entry: achievements.find((item) => item.name === "Collector")!, title: "Collector", description: "Finish the full base-creature checklist.", href: "/wiki/achievements/" },
    { entry: achievements.find((item) => item.name === "Fishipedia")!, title: "Fishipedia", description: "Complete the separate Drip collection.", href: "/wiki/achievements/#fishipedia" },
    { entry: achievements.find((item) => item.name === "Handyman")!, title: "Handyman", description: "Defeat the final boss with bare hands.", href: "/wiki/achievements/" },
  ];

  return (
    <main id="main-content">
      <JsonLd data={[websiteSchema(), organizationSchema(), faqSchema(homeFaq)]} />

      <section className={styles.hero}>
        <Image className={styles.heroImage} src="/images/official/gameplay-03.jpg" alt="Official How to Fish gameplay screenshot showing players fishing and exploring a tropical shore" fill loading="eager" sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <h1>How to Fish: Complete Walkthrough & Wiki</h1>
            <p className={styles.heroLead}>Use one connected How to Fish guide for beginner tips, all {creatures.length} extracted creatures, all {bosses.length} bosses, {islands.length} islands, story quests, weapons, items and every one of the {achievements.length} achievements.</p>
            <p className={styles.heroUpdated}><CalendarClock size={15} /><time dateTime="2026-08">Site updated: August 2026</time></p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/guides/beginner-guide/"><Anchor size={19} /> Start Here</Link>
              <Link className={styles.secondaryButton} href="/creatures/"><Fish size={19} /> Browse Creatures</Link>
            </div>
            <div className={styles.heroStats}>
              <span className={styles.heroStat}><Fish size={22} /><strong>{creatures.length}</strong><small>Extracted creatures</small></span>
              <span className={styles.heroStat}><Skull size={22} /><strong>{bosses.length}</strong><small>Boss guides</small></span>
              <span className={styles.heroStat}><Map size={22} /><strong>{islands.length}</strong><small>Route stages</small></span>
              <span className={styles.heroStat}><ScrollText size={22} /><strong>{achievements.length}</strong><small>Achievements</small></span>
            </div>
          </div>
          <aside className={styles.heroPlanner} aria-label="Player shortcuts">
            <header>
              <small>Player shortcuts</small>
              <h2>What do you need next?</h2>
              <p>Jump straight to the decision holding up your run.</p>
            </header>
            <nav>
              <Link href="/creatures/"><span><Fish size={20} /><b>Find a creature</b><small>Check its island, rod, bait and value</small></span><ArrowRight size={18} /></Link>
              <Link href="/quests/"><span><ScrollText size={20} /><b>Finish a quest</b><small>Follow the steps and keep the right item</small></span><ArrowRight size={18} /></Link>
              <Link href="/bosses/"><span><Skull size={20} /><b>Prepare for a boss</b><small>See the trigger before starting the fight</small></span><ArrowRight size={18} /></Link>
            </nav>
            <div className={styles.routeNote}><Map size={22} /><span><small>Complete story route</small><strong>Lighthouse → Forest → Desert → Rocks → Volcano</strong></span></div>
          </aside>
        </div>
      </section>

      <div className={styles.dashboard}>
        <section className={styles.section}>
          <SectionHeading number={1} title="Explore Every Island" description="Travel in story order and check what unlocks each stop, which creatures live there and which fight moves the story forward." href="/islands/" linkLabel="View all islands" />
          <div className={styles.islandRoute}>
            {islands.map((island) => (
              <Link className={styles.islandCard} href={`/islands/${island.slug}/`} key={island.slug}>
                <span className={styles.islandStage}>Stage {island.number}</span>
                <span className={styles.islandImage}><Image src={island.image} alt={island.imageAlt} fill sizes="(max-width: 768px) 82vw, 270px" /></span>
                <span className={styles.islandBody}><h3>{island.label}</h3><span><Fish size={13} /> {island.fishCount} creatures</span><span><Crosshair size={13} /> {island.bossNames[0] ?? "Explore"}</span><b>Open island guide <ArrowRight size={13} /></b></span>
                {island.number < islands.length ? <span className={styles.routeArrow} aria-hidden="true"><ChevronRight size={18} /></span> : null}
              </Link>
            ))}
          </div>
        </section>

        <div className={`${styles.section} ${styles.middlePair}`}>
          <section className={`${styles.panel} ${styles.databasePanel}`}>
            <SectionHeading number={2} title="Creature Directory" description={`Search all ${creatures.length} extracted creatures by name, island, rod, bait or category. Boss encounters open their dedicated strategy pages.`} href="/creatures/" linkLabel="View all creatures" />
            <div className={styles.databaseTools}><span>Search by creature, island or bait</span><b>All</b><span>Island</span><span>Type</span></div>
            <div className={styles.homeTableWrap}>
              <table className={styles.homeTable}>
                <thead><tr><th>Creature</th><th>Location</th><th>Rod</th><th>Bait / trigger</th></tr></thead>
                <tbody>{fishRows.map((entry) => <tr key={entry.slug}><td><Link href={`/creatures/${entry.slug}/`}><Image src={getFishImage(entry)} alt={getFishImageAlt(entry)} width={52} height={36} />{entry.name}</Link></td><td>{entry.islandName}</td><td><span>{entry.rod}</span></td><td>{entry.lure}</td></tr>)}</tbody>
              </table>
            </div>
            <Link className={styles.tableLink} href="/creatures/"><span>Previewing 10 non-boss creatures from the {creatures.length}-entry directory</span><b>Browse all creatures <ArrowRight size={14} /></b></Link>
          </section>

          <section className={`${styles.panel} ${styles.questPanel}`}>
            <SectionHeading number={3} title="Stuck on a Quest?" description="Pick the point where your island route stopped." href="/quests/" linkLabel="View all quests" />
            <div className={styles.questGrid}>
              {quests.slice(0, 5).map((quest, index) => (
                <Link className={styles.questCard} href={`/quests/${quest.slug}/`} key={quest.slug}>
                  <span className={styles.questImage}><Image src={questPreviewImages[quest.slug] ?? quest.image} alt={`${quest.name} route encounter`} fill sizes="(max-width: 768px) 110px, 140px" /></span>
                  <span className={styles.questBody}><small>Step {index + 1} · {quest.tags?.[0]}</small><h3>{quest.name}</h3><p>{quest.description}</p><b>Open quest <ArrowRight size={13} /></b></span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.section}>
          <SectionHeading number={4} title="Boss Route" description="See the story trigger before spending a single-use lure or carrying a trophy back to an NPC." href="/bosses/" linkLabel="View all bosses" />
          <div className={styles.bossGrid}>
            {bossHighlights.map((boss) => (
              <Link className={styles.bossCard} href={`/bosses/${boss.slug}/`} key={boss.slug}>
                <span className={styles.bossImage}><Image src={boss.image} alt={boss.imageAlt} fill sizes="(max-width: 768px) 130px, 190px" /></span>
                <span className={styles.bossBody}><small>{boss.tags?.[1] ?? "Encounter"}</small><h3>{boss.name.replace(" Boss Guide", "")}</h3><p>{boss.tags?.[0] ? `Trigger: ${boss.tags[0]}` : boss.description}</p><b>View strategy <ArrowRight size={13} /></b></span>
              </Link>
            ))}
          </div>
        </section>

        <div className={`${styles.section} ${styles.resourcePair}`}>
          <section className={`${styles.panel} ${styles.guidePanel}`}>
            <SectionHeading number={5} title="Choose Your Guide" description="Pick a spoiler-light start or the complete island route." href="/guides/" linkLabel="View both guides" />
            <div className={styles.featureGrid}>
              {startCards.map(({ title, text, href, image, label }, index) => (
                <Link className={`${styles.featureCard} ${index === 0 ? styles.featureLead : ""}`} href={href} key={title}>
                  <span className={styles.featureImage}><Image src={image} alt={`${title} gameplay preview`} fill sizes="(max-width: 768px) 100vw, 220px" /></span>
                  <span className={styles.featureBody}><small>{index === 0 ? "Recommended first" : `Route ${index + 1}`}</small><h3>{title}</h3><p>{text}</p><span className={styles.smallLink}>{label} <ArrowRight size={14} /></span></span>
                </Link>
              ))}
            </div>
          </section>

          <section className={`${styles.panel} ${styles.armoryPanel}`}>
            <SectionHeading number={6} title="Weapons & Gear" description="Match the weapon to the encounter and open each loadout for its practical role." href="/wiki/weapons/" linkLabel="View all gear" />
            <div className={styles.gearGrid}>
              {weapons.slice(0, 4).map((weapon) => (
                <Link className={styles.gearCard} href={`/wiki/weapons/${weapon.slug}/`} key={weapon.slug}>
                  <span className={styles.gearImage}><Image src={weapon.image} alt={weapon.imageAlt} fill sizes="140px" /></span>
                  <span className={styles.gearBody}><small>{weapon.eyebrow}</small><h3>{weapon.name.replace(" Guide", "")}</h3><p>{weapon.description}</p><b>Open loadout <ArrowRight size={13} /></b></span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <section className={`${styles.section} ${styles.achievementPanel}`}>
          <SectionHeading number={7} title="Achievement Hunting" description="Use three rare goals to plan collection, Drip and bare-hands cleanup before a full achievement run." href="/wiki/achievements/" linkLabel="View all achievements" />
          <div className={styles.achievementGrid}>
            {achievementSpotlights.map(({ entry, title, description, href }, index) => (
              <Link className={styles.achievementCard} href={href} key={entry.name}>
                <span className={styles.achievementIcon}><Image src={entry.image} alt={entry.imageAlt} fill sizes="120px" /></span>
                <span className={styles.achievementBody}><small><Trophy size={13} /> Challenge {index + 1}</small><h3>{title}</h3><p>{description}</p><span className={styles.rarityLine}><i style={{ width: `${Math.max(entry.globalPercent ?? 0, 3)}%` }} /> <em>{entry.globalPercent}% unlocked</em></span><b>View achievement <ArrowRight size={13} /></b></span>
              </Link>
            ))}
          </div>
          <Link className={styles.completionLink} href="/wiki/achievements/"><CheckCircle2 size={18} /><span><strong>Planning a full clear?</strong><small>Open the creature and 28-achievement checklist.</small></span><ArrowRight size={16} /></Link>
        </section>

        <section className={`${styles.section} ${styles.aboutSection}`}>
          <SectionHeading number={8} title="About How to Fish Wiki" description="Built for the moments when the game stops telling you what to keep, where to go or which lure starts the next fight." />
          <div className={styles.aboutGrid}>
            <div className={styles.aboutCopy}>
              <h3>Keep the right item. Follow the right route.</h3>
              <p>How to Fish starts with a rod and a small island, then quickly turns into a chain of trades, boss bodies, Radar markers and equipment choices. This wiki keeps those steps together so you can check what to catch, what not to sell and what unlocks next.</p>
              <p>Use the creature directory for everyday catches and special finds, open a quest when progress stops, or follow the island route from Lighthouse to Volcano. Weapons, bait, items, NPCs and achievements link back to the same steps instead of leaving you to piece the route together.</p>
              <div className={styles.aboutLinks}><Link href="/legal/about-us/">How this wiki is maintained <ArrowRight size={14} /></Link><Link href="/legal/contact-us/">Report a correction <ArrowRight size={14} /></Link></div>
            </div>
            <dl className={styles.aboutFacts}>
              <div><dt>Creature directory</dt><dd>{creatures.length} entries</dd><span>40 fish · 5 shell creatures · 9 special creatures</span></div>
              <div><dt>Story route</dt><dd>5 stages</dd><span>Lighthouse through Volcano</span></div>
              <div><dt>Steam achievements</dt><dd>{achievements.length}</dd><span>Story, combat and collection goals</span></div>
              <div><dt>Play styles</dt><dd>1–8 players</dd><span>Single-player and online co-op</span></div>
            </dl>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`}>
          <SectionHeading number={9} title="Frequently Asked Questions" description="Quick answers for island progression, lure tiers, collection tracking and solo play." />
          <div className={styles.homeFaq}><FaqList items={homeFaq} /></div>
        </section>
      </div>
    </main>
  );
}
