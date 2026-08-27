import { Crosshair } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { KillBonusCalculator } from "@/components/tools/KillBonusCalculator";
import { JsonLd } from "@/components/ui/JsonLd";
import { killscoreCreatures } from "@/lib/content";
import { killBonuses } from "@/lib/killBonuses";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/kill-bonuses.module.css";

export function KillBonusesPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Tools", href: "/tools/" }, { name: "Bonus Multiplier Calculator", href: "/tools/bonus-multiplier-calculator/" }];
  return <main id="main-content">
    <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.bonusMultiplierCalculator)]} />
    <InnerHero breadcrumbs={breadcrumbs} eyebrow="Game-derived combat tool" title="How to Fish Bonus Multiplier Calculator" description="Choose a sellable creature, set the attack type and combine the bonus conditions that happened during the kill to preview the final Killscore reward." image="/images/official/gameplay-05.jpg" imageAlt="Official How to Fish gameplay screenshot" summary={<><span><strong>{killBonuses.length}</strong> verified bonuses</span><span><strong>{killscoreCreatures.length}</strong> sellable creatures</span><span><strong>4</strong> attack setups</span></>} />
    <section className={styles.paper}>
      <div className={styles.explainer}><Crosshair size={22} /><div><p>Combat reward tool</p><h2>Calculate the Killscore you earned</h2><span>Choose the creature you killed first. Only creatures with a verified sell value and a combat encounter are included.</span></div></div>
      <KillBonusCalculator bonuses={killBonuses} creatures={killscoreCreatures} />
    </section>
  </main>;
}
