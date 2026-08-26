import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { achievements, getCollection } from "@/lib/content";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/wiki.module.css";

const sections = [
  {
    title: "Weapons & Attachments",
    description: "Compare weapon damage, price, magazine size, upgrades and the island where each loadout becomes available.",
    href: "/wiki/weapons/",
    image: "/images/game/weapons/shotgun.jpg",
    count: getCollection("weapons").length,
    label: "weapons",
    tags: ["Damage & prices", "Island shops"],
    action: "Browse weapons",
  },
  {
    title: "Bait, Lures & Rods",
    description: "Match every rod, default pool, regular lure, boss lure and quest trigger to its creatures and island route.",
    href: "/wiki/bait-and-lures/",
    image: "/images/official/gameplay-07.jpg",
    count: getCollection("bait").length,
    label: "bait & triggers",
    tags: ["Rods & pools", "Catch setups"],
    action: "Browse catch setups",
  },
  {
    title: "NPCs & Quest Givers",
    description: "Locate each character and check the shop, quest request, hand-in or progression reward connected to them.",
    href: "/wiki/npcs/",
    image: "/images/official/gameplay-04.jpg",
    count: getCollection("npcs").length,
    label: "NPCs",
    tags: ["Locations", "Quest chains"],
    action: "Browse NPCs",
  },
  {
    title: "Achievements",
    description: "Work through all Steam achievements with categorized objectives, unlock rates and links to required routes and equipment.",
    href: "/wiki/achievements/",
    image: "/images/game/achievements/collector.jpg",
    count: achievements.length,
    label: "achievements",
    tags: ["Steam checklist", "Unlock hints"],
    action: "View achievements",
  },
] as const;

export function WikiPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki/" }];
  const totalRecords = sections.reduce((total, section) => total + section.count, 0);
  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.wiki)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Player reference"
        title="How to Fish Steam Wiki: Weapons, Bait, NPCs & Achievements"
        description="Use the complete Steam Wiki to compare all 8 weapons, match bait and rods with catch pools, follow NPC quest chains and finish all 28 achievements."
        image="/images/official/gameplay-05.jpg"
        imageAlt="Official How to Fish gameplay screenshot showing equipment and island exploration"
        summary={<><span><strong>{sections.length}</strong> gameplay categories</span><span><strong>{achievements.length}</strong> achievements</span></>}
      />

      <section className={styles.paper}>
        <header className={styles.directoryIntro}>
          <div>
            <p>Wiki categories</p>
            <h2>Browse the How to Fish Wiki</h2>
            <span>Open a category to compare game data, then follow its links to the related fish, boss, island, quest or achievement.</span>
          </div>
          <strong>{totalRecords} indexed records</strong>
        </header>

        <div className={styles.directoryGrid}>
          {sections.map((entry, index) => (
            <Link className={styles.directoryCard} href={entry.href} key={entry.href}>
              <span className={styles.directoryMedia}>
                <Image src={entry.image} alt="" fill sizes="(max-width: 768px) 120px, 220px" />
                <b>{String(index + 1).padStart(2, "0")}</b>
              </span>
              <span className={styles.directoryBody}>
                <small>{entry.count} {entry.label}</small>
                <h3>{entry.title}</h3>
                <em>{entry.description}</em>
                <span className={styles.directoryTags}>{entry.tags.map((tag) => <b key={tag}>{tag}</b>)}</span>
                <span className={styles.directoryAction}>{entry.action}<ArrowRight size={14} /></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
