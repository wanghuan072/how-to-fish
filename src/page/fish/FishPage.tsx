import Image from "next/image";
import Link from "next/link";
import { BookOpen, CheckCircle2, Fish, MapPinned, Sparkles } from "lucide-react";
import { FishExplorer } from "@/components/fish/FishExplorer";
import { InnerHero } from "@/components/layout/InnerHero";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { regularFish, islands } from "@/lib/content";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import ui from "@/style/components/ui.module.css";
import styles from "@/style/page/fish.module.css";

const fishFaq = [
  { question: "How many non-boss fish and creatures are in How to Fish?", answer: `This page lists ${regularFish.length} non-boss creatures across five stages. Story bosses, optional mini-bosses and the final encounter are listed separately under Bosses.` },
  { question: "How do rare Drip variants work?", answer: "Drip is the term used by official Steam achievements for rare variants. Use the normal species route and lure while farming for one." },
  { question: "What is the best bait for rare fish?", answer: "Use the bait associated with the base species. Drip variants do not use a separate universal bait." },
  { question: "Do fish have different values?", answer: "Yes. The table shows the available raw base values. Killscore and cooking can change the final sale." },
  { question: "When is the fish list updated?", answer: "Fish pages are updated when a route, lure pairing, value or creature location changes after a game update." },
];

export function FishPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Fish", href: "/fish/" }, { name: "All Fish", href: "/fish/" }];

  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.fish), faqSchema(fishFaq)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Creature encyclopedia"
        title="How to Fish Fish List — Locations, Bait, Rods & Values"
        description="Choose a creature to see where it appears, which rod and bait it uses, how much it can sell for and whether a quest or achievement depends on it. Boss encounters are kept in their own fight section."
        image="/images/official/gameplay-03.jpg"
        imageAlt="Official How to Fish gameplay screenshot of fishing on a tropical island"
        summary={<>
          <span><Fish size={18} /><strong>{regularFish.length}</strong><small>Non-boss catches</small></span>
          <span><Sparkles size={18} /><strong>{regularFish.filter((entry) => entry.category === "Special").length}</strong><small>Special catches</small></span>
          <span><MapPinned size={18} /><strong>{islands.length}</strong><small>Island stages</small></span>
          <span><BookOpen size={18} /><strong>{regularFish.length}</strong><small>Catch pages</small></span>
        </>}
      />

      <div className={styles.paper}>
        <FishExplorer entries={regularFish} islandEntries={islands} />

        <div className={styles.below}>
          <section className={`${styles.contentPanel} ${styles.valueStrip}`}>
            <h2>Looking for encounter creatures?</h2>
            <div><Link href="/bosses/"><Fish size={30} /><span><strong>Looking for a Boss?</strong><small>Story bosses, optional mini-bosses and the final encounter</small></span><b>See triggers, fight tips and rewards →</b></Link></div>
          </section>

          <div className={styles.bottomGrid}>
            <section className={`${styles.contentPanel} ${styles.tips}`}>
              <div className={styles.tipsImage}><Image src="/images/official/gameplay-03.jpg" alt="Official gameplay screenshot of a player fishing from a small boat" fill sizes="300px" /></div>
              <div><h2>Rare Drip Variant Tips</h2><p>Drip creatures use a rainbow-name variant and are tracked separately in the Tab encyclopedia.</p><ul><li><CheckCircle2 size={14} /> Use the normal base-creature bait.</li><li><CheckCircle2 size={14} /> Kill the variant so it registers.</li><li><CheckCircle2 size={14} /> Check blank Drip entries with Tab.</li><li><CheckCircle2 size={14} /> Save this grind for post-game cleanup.</li></ul><Link className={ui.textLink} href="/wiki/achievements/#fishipedia">View Drip achievements →</Link></div>
            </section>

            <section className={styles.contentPanel}>
              <SectionHeading title="Frequently Asked Questions" />
              <FaqList items={fishFaq} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
