import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { achievements } from "@/lib/content";
import { getAchievementRelationItems } from "@/lib/contentRelations";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import killBonusesJson from "@/data/kill-bonuses.json";
import styles from "@/style/page/wiki-reference.module.css";

type KillBonus = {
  id: string;
  name: string;
  multiplier: number | null;
  summary: string;
  exactTrigger: string;
  attackTypes: string[];
  targets: string[];
  tiers?: Array<{ count: number; name: string; multiplier: number }>;
};

const killBonuses = killBonusesJson as KillBonus[];

const groups = [
  { id: "progression", title: "Story & Progression", description: "Island unlocks, quest hand-ins, engine tiers and full-route clears.", names: ["Getting started", "Who stole my beer", "Getting an upgrade", "Dinnertime", "Grillmaster", "Vacation", "I am speed", "Terrorizing bird", "Deadliest catch", "We are so back", "Bean"] },
  { id: "combat", title: "Combat & Skill", description: "Killscore conditions, fast boss clears, explosives and challenge finishes.", names: ["Noob", "Impressive", "360 no scope", "Easy", "Everyone's dream", "Handyman"] },
  { id: "collection", title: "Creature Collection", description: "Normal creatures, optional mini-bosses and every rare Drip entry.", names: ["Drip", "Competitive eating", "Collector", "Fishipedia"] },
  { id: "economy", title: "Economy & Equipment", description: "Attachments, cooking, roulette, legendary skins and a high-value sale.", names: ["Fully equipped", "Yummy in my tummy", "GOLD GOLD GOLD", "All in", "Rich! Millionaire"] },
  { id: "physics", title: "Physics & Miscellaneous", description: "Seagull interactions and the explosive boat-launch challenge.", names: ["Let me go", "I'm the bird now"] },
] as const;

function achievementId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AchievementsPage() {
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki/" }, { name: "Achievements", href: "/wiki/achievements/" }];
  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.achievements)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Steam achievement checklist"
        title={`How to Fish Steam Achievements: All ${achievements.length} Unlocks`}
        description="Complete every Steam achievement with its real trigger, practical route advice, unlock rate and direct links to the fish, boss, item, weapon, NPC or island involved."
        image="/images/official/gameplay-07.jpg"
        imageAlt="Official How to Fish gameplay screenshot"
        summary={<><span><strong>{achievements.length}</strong> achievements</span><span><strong>{groups.length}</strong> categories</span></>}
      />
      <section className={styles.paper}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}><h2>Achievement Types</h2><nav>{groups.map((group) => <a href={`#${group.id}`} key={group.id}><span>{group.title}</span><b>{group.names.length}</b></a>)}<a href="#killscore-bonuses"><span>Killscore Bonuses</span><b>{killBonuses.length}</b></a></nav></aside>
          <div className={styles.groups}>
            {groups.map((group) => {
              const entries = group.names.map((name) => achievements.find((entry) => entry.name === name)).filter((entry): entry is (typeof achievements)[number] => Boolean(entry));
              return <section className={styles.group} id={group.id} key={group.id}><header className={styles.groupHeader}><div><p>Achievement category</p><h2>{group.title}</h2><span>{group.description}</span></div><strong>{entries.length} objectives</strong></header><div className={styles.achievementGrid}>{entries.map((entry) => {
                const links = getAchievementRelationItems(entry.name);
                return <article className={styles.achievement} id={achievementId(entry.name)} key={entry.name}><span className={styles.achievementIcon}><Image src={entry.image} alt={entry.imageAlt} width={68} height={68} /></span><div><h3>{entry.name}</h3><p>{entry.description}</p><p><strong>Hint:</strong> {entry.hint}</p>{entry.reward ? <p><strong>Unlock:</strong> {entry.reward}</p> : null}<div className={styles.achievementMeta}>{entry.globalPercent !== undefined ? <span>{entry.globalPercent.toFixed(1)}% unlock rate</span> : null}<span>{links.length} related pages</span></div></div>{links.length ? <nav className={styles.relationLinks} aria-label={`${entry.name} related pages`}>{links.map((item) => <Link href={item.href} key={item.href}>{item.meta}: {item.title}<ArrowRight size={10} /></Link>)}</nav> : null}</article>;
              })}</div></section>;
            })}
            <section className={styles.group} id="killscore-bonuses">
              <header className={styles.groupHeader}><div><p>Combat value data</p><h2>All Killscore Bonuses</h2><span>Bonuses multiply together. The Impressive bonus itself is 2× after five other bonuses; the Steam achievement separately asks for a 5× final Killscore.</span></div><strong>{killBonuses.length} bonuses</strong></header>
              <div className={styles.killBonusTable}>{killBonuses.map((bonus) => {
                const multiplier = bonus.multiplier !== null ? `${bonus.multiplier.toFixed(bonus.multiplier % 1 ? 2 : 0)}×` : `${bonus.tiers?.[0]?.multiplier.toFixed(2)}–${bonus.tiers?.at(-1)?.multiplier.toFixed(2)}×`;
                return <article id={`killscore-${bonus.id}`} key={bonus.id}><strong>{multiplier}</strong><div><h3>{bonus.name}</h3><p>{bonus.exactTrigger}</p><span>{bonus.summary}</span></div><dl><div><dt>Attack</dt><dd>{bonus.attackTypes.join(" / ")}</dd></div><div><dt>Targets</dt><dd>{bonus.targets.join(" / ")}</dd></div></dl></article>;
              })}</div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
