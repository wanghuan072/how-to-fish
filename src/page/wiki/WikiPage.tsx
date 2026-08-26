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
  { title: "Weapons & Attachments", description: "Compare eight weapons by price, range, damage and the fights where each one is useful.", href: "/wiki/weapons/", image: "/images/game/weapons/shotgun.jpg", count: getCollection("weapons").length, label: "weapons", tags: ["Loadouts", "Boss pairings"] },
  { title: "Items & Upgrades", description: "Find quest objects, navigation tools and boat upgrades without selling something needed later.", href: "/wiki/items/", image: "/images/official/gameplay-05.jpg", count: getCollection("items").length, label: "items", tags: ["Hand-ins", "Progression"] },
  { title: "Bait & Lures", description: "Match regular lures, boss lures and one-use story bait to the creatures they catch.", href: "/wiki/bait/", image: "/images/official/gameplay-06.jpg", count: getCollection("bait").length, label: "bait types", tags: ["Catch pools", "Prices"] },
  { title: "Rods & Lures", description: "Rod compatibility and direct links from each lure to its creatures.", href: "/wiki/rods-and-lures/", image: "/images/official/gameplay-07.jpg", count: 2, label: "rod types", tags: ["Compatibility", "Catch pools"] },
  { title: "NPCs & Quest Givers", description: "See where each character stands, what they request and what their return dialogue unlocks.", href: "/wiki/npcs/", image: "/images/official/gameplay-04.jpg", count: getCollection("npcs").length, label: "NPCs", tags: ["Quest roles", "Rewards"] },
  { title: "Achievements", description: "A categorized checklist with hints and direct links to required routes and equipment.", href: "/wiki/achievements/", image: "/images/game/achievements/collector.jpg", count: achievements.length, label: "achievements", tags: ["Checklist", "Route links"] },
] as const;

export function WikiPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki/" }];
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
        summary={<><span><strong>{sections.length}</strong> gameplay categories</span><span><strong>{achievements.length}</strong> achievements</span></>}
      />
      <section className={styles.paper}>
        <div className={styles.hubIntro}><div><p>Wiki categories</p><h2>What do you need to check?</h2></div><span>{sections.length} gameplay categories</span></div>
        <div className={styles.hubGrid}>
          {sections.map((entry) => (
            <Link className={styles.hubCard} href={entry.href} key={entry.href}>
              <span className={styles.hubImage}><Image src={entry.image} alt="" fill sizes="(max-width: 768px) 100vw, 360px" /></span>
              <span className={styles.hubBody}>
                <small>{entry.count} {entry.label}</small>
                <h3>{entry.title}</h3>
                <em>{entry.description}</em>
                <span className={styles.hubTags}>{entry.tags.map((tag) => <b key={tag}>{tag}</b>)}</span>
                <span className={styles.hubAction}>View {entry.title.toLowerCase()} <ArrowRight size={14} /></span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
