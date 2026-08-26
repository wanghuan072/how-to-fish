import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, Fish, Shell, Skull, Sparkles } from "lucide-react";
import { FishExplorer } from "@/components/fish/FishExplorer";
import { InnerHero } from "@/components/layout/InnerHero";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bossCreatures, creatures, islands } from "@/lib/content";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import ui from "@/style/components/ui.module.css";
import styles from "@/style/page/fish.module.css";

const creatureFaq = [
  { question: "How many creatures are in How to Fish?", answer: `This directory records all ${creatures.length} extracted creature assets: 40 fish, 5 shell creatures and 9 special creatures. Its ${bossCreatures.length} boss encounters link to their dedicated Boss pages.` },
  { question: "How do rare Drip variants work?", answer: "Drip is the term used by official Steam achievements for rare variants. Use the normal species route and lure while farming for one." },
  { question: "What is the best bait for rare creatures?", answer: "Use the bait associated with the base creature. Drip variants do not use a separate universal bait." },
  { question: "Do creatures have different values?", answer: "Yes. The table shows extracted or observed raw base values. Killscore and cooking can change the final sale." },
  { question: "When is the creature list updated?", answer: "Creature pages are updated when an extracted asset, route, lure pairing, value or location changes after a game update." },
];

export function FishPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Creatures", href: "/creatures/" }];
  const fishCount = creatures.filter((entry) => entry.creatureGroup === "Fish").length;
  const shellCount = creatures.filter((entry) => entry.creatureGroup === "Shell creatures").length;
  const specialCount = creatures.filter((entry) => entry.creatureGroup === "Special creatures").length;

  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.creatures), faqSchema(creatureFaq)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Extracted creature directory"
        title={`How to Fish Creatures: All ${creatures.length} Extracted Creatures`}
        description={`Browse every extracted creature asset: ${fishCount} fish, ${shellCount} shell creatures and ${specialCount} special creatures. Boss rows lead directly to their dedicated encounter guides.`}
        image="/images/official/gameplay-03.jpg"
        imageAlt="Official How to Fish gameplay screenshot of fishing on a tropical island"
        summary={<>
          <span><Fish size={18} /><strong>{fishCount}</strong><small>Fish</small></span>
          <span><Shell size={18} /><strong>{shellCount}</strong><small>Shell creatures</small></span>
          <span><Sparkles size={18} /><strong>{specialCount}</strong><small>Special creatures</small></span>
          <span><Skull size={18} /><strong>{bossCreatures.length}</strong><small>Encounter guides</small></span>
          <span><BookOpen size={18} /><strong>{creatures.length}</strong><small>All extracted</small></span>
        </>}
      />

      <div className={styles.paper}>
        <FishExplorer entries={creatures} islandEntries={islands} bossSlugs={bossCreatures.map((entry) => entry.slug)} />

        <div className={styles.below}>
          <section className={`${styles.contentPanel} ${styles.valueStrip}`}>
            <h2>Boss creatures use dedicated encounter pages</h2>
            <div><Link href="/bosses/"><Skull size={30} /><span><strong>Looking for a Boss?</strong><small>Boss rows above link here instead of creating duplicate creature detail pages.</small></span><b>See triggers, fight tips and rewards →</b></Link></div>
          </section>

          <div className={styles.bottomGrid}>
            <section className={`${styles.contentPanel} ${styles.tips}`}>
              <div className={styles.tipsImage}><Image src="/images/official/gameplay-03.jpg" alt="Official gameplay screenshot of a player fishing from a small boat" fill sizes="300px" /></div>
              <div><h2>Rare Drip Variant Tips</h2><p>Drip creatures use a rainbow-name variant and are tracked separately in the Tab encyclopedia.</p><ul><li><CheckCircle2 size={14} /> Use the normal base-creature bait.</li><li><CheckCircle2 size={14} /> Kill the variant so it registers.</li><li><CheckCircle2 size={14} /> Check blank Drip entries with Tab.</li><li><CheckCircle2 size={14} /> Save this grind for post-game cleanup.</li></ul><Link className={ui.textLink} href="/wiki/achievements/#fishipedia">View Drip achievements →</Link></div>
            </section>

            <section className={styles.contentPanel}>
              <SectionHeading title="Frequently Asked Questions" />
              <FaqList items={creatureFaq} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
