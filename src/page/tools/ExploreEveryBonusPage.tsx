import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { bonusMultiplierRange, killBonuses } from "@/lib/killBonuses";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/kill-bonuses.module.css";

export function ExploreEveryBonusPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Tools", href: "/tools/" }, { name: "Explore Every Bonus", href: "/tools/explore-every-bonus/" }];
  return <main id="main-content">
    <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.exploreEveryBonus)]} />
    <InnerHero breadcrumbs={breadcrumbs} eyebrow="Combat bonus directory" title="Explore Every How to Fish Killscore Bonus" description="Browse all 20 verified Killscore bonuses in one place, with each trigger, multiplier and usage note shown directly in the guide." image="/images/official/gameplay-05.jpg" imageAlt="Official How to Fish gameplay screenshot" summary={<><span><strong>{killBonuses.length}</strong> verified bonuses</span><span><strong>1.01×–2×</strong> fixed multipliers</span></>} />
    <section className={styles.paper}>
      <section className={styles.directory} id="all-bonuses">
        <header><div><p>Explore every bonus</p><h2>All Killscore bonuses</h2><span>Every record is shown directly below, so you can compare conditions without opening another page.</span></div><strong>{killBonuses.length} records</strong></header>
        <div className={styles.bonusDirectoryGrid}>{killBonuses.map((bonus, index) => <article className={styles.bonusDirectoryCard} key={bonus.id}><header><span>#{String(index + 1).padStart(2, "0")}</span><strong>{bonusMultiplierRange(bonus)}</strong></header><div className={styles.bonusDirectoryTitle}><small>{bonus.attackTypes.join(" · ")} · {bonus.targets.join(" / ")}</small><h3>{bonus.name}</h3><p>{bonus.summary}</p></div><div className={styles.bonusTrigger}><b>How to earn it</b><p>{bonus.exactTrigger}</p></div></article>)}</div>
      </section>
    </section>
  </main>;
}
