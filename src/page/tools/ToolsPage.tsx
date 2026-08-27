import Link from "next/link";
import { Calculator, ListChecks, ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/kill-bonuses.module.css";

const tools = [
  { title: "Bonus Multiplier Calculator", description: "Enter a base reward, select the attack type and combine compatible Killscore bonuses to preview the final value.", href: "/tools/bonus-multiplier-calculator/", icon: Calculator, label: "Interactive calculator", action: "Open calculator" },
  { title: "Explore Every Bonus", description: "Browse all 20 verified Killscore bonuses and expand any record to see its trigger, multiplier and practical explanation.", href: "/tools/explore-every-bonus/", icon: ListChecks, label: "20 verified records", action: "Browse bonuses" },
] as const;

export function ToolsPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Tools", href: "/tools/" }];
  return <main id="main-content">
    <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.tools)]} />
    <InnerHero breadcrumbs={breadcrumbs} eyebrow="How to Fish tools" title="How to Fish Tools: Killscore Calculator & Bonuses" description="Calculate a reward before a fight, or browse every verified bonus when you want to understand a specific combat condition." image="/images/official/gameplay-05.jpg" imageAlt="Official How to Fish gameplay screenshot" summary={<><span><strong>2</strong> player tools</span><span><strong>20</strong> verified bonuses</span></>} />
    <section className={styles.paper}>
      <header className={styles.toolsIntro}><p>Choose a tool</p><h2>Plan a reward or look up a bonus</h2><span>Start with a calculator when you know the combat conditions. Open the bonus guide when you need to understand what a condition means.</span></header>
      <div className={styles.toolCards}>{tools.map((tool) => { const Icon = tool.icon; return <Link href={tool.href} className={styles.toolCard} key={tool.href}><span className={styles.toolIcon}><Icon size={24} /></span><div><small>{tool.label}</small><h2>{tool.title}</h2><p>{tool.description}</p><b>{tool.action}<ArrowRight size={14} /></b></div></Link>; })}</div>
    </section>
  </main>;
}
