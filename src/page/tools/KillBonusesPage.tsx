import { Crosshair } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { KillBonusCalculator } from "@/components/tools/KillBonusCalculator";
import { JsonLd } from "@/components/ui/JsonLd";
import { killBonuses } from "@/lib/killBonuses";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/kill-bonuses.module.css";

export function KillBonusesPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Tools", href: "/tools/" }, { name: "Bonus Multiplier Calculator", href: "/tools/bonus-multiplier-calculator/" }];
  return <main id="main-content">
    <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.bonusMultiplierCalculator)]} />
    <InnerHero breadcrumbs={breadcrumbs} eyebrow="Game-derived combat tool" title="How to Fish Bonus Multiplier Calculator" description="Enter a base reward, choose the attack type and combine the bonus conditions that happened during the kill to preview the final Killscore reward." image="/images/official/gameplay-05.jpg" imageAlt="Official How to Fish gameplay screenshot" summary={<><span><strong>{killBonuses.length}</strong> verified bonuses</span><span><strong>2×</strong> highest fixed bonus</span><span><strong>4</strong> attack setups</span></>} />
    <section className={styles.paper}>
      <div className={styles.explainer}><Crosshair size={22} /><div><p>Combat reward tool</p><h2>Calculate the Killscore you earned</h2><span>Use the same multiplicative rule as the game. Choose only conditions that were true for the kill you are checking.</span></div></div>
      <KillBonusCalculator bonuses={killBonuses} />
    </section>
  </main>;
}
