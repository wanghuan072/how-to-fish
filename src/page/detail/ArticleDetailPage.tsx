import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck2 } from "lucide-react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schema";
import { contentDisplayName } from "@/lib/contentNaming";
import type { ContentEntry } from "@/types/content";
import type { CollectionKey } from "@/types/content";
import type { RelationGroup } from "@/lib/contentRelations";
import styles from "@/style/page/detail.module.css";

type Fact = { label: string; value: string };
type Related = { title: string; href: string; meta: string; description: string; image: string; imageAlt: string };

type ArticleDetailPageProps = {
  entry: ContentEntry;
  collection?: CollectionKey;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  facts?: Fact[];
  linkedRecords?: Related[];
  relationGroups?: RelationGroup[];
  related?: Related[];
};

function headingId(heading: string) {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const operatingNotes: Partial<Record<CollectionKey, { title: string; text: string }>> = {
  bosses: { title: "Before you start the fight", text: "Check the bait or quest item, restock your ammunition and keep any trophy or defeated body needed after the fight." },
  quests: { title: "Before you start", text: "Accept the objective, keep the requested item and finish the return dialogue before looking for the next Radar marker." },
  islands: { title: "How this stage moves forward", text: "Finish the local quest, defeat the required encounter and return the requested item so the next route can appear on the Radar." },
  weapons: { title: "When to use this weapon", text: "Compare its price, damage, range and availability before buying it for the creature or boss ahead." },
  bait: { title: "Check the item name first", text: "Regular lure, boss lure and story bait can have similar names but different targets. Match the inventory label and route before casting." },
  npcs: { title: "Finish the conversation loop", text: "Accept the objective, return with the requested result, speak again and then check the Radar or inventory for the reward." },
  guides: { title: "What this guide helps with", text: "Follow the steps below when you reach this part of the route, then open the linked fish, item or island page when you need a specific setup." },
};

const detailPageClasses: Partial<Record<CollectionKey, string>> = {
  bosses: styles.bossPage,
  quests: styles.questPage,
  islands: styles.islandPage,
  weapons: styles.weaponPage,
  bait: styles.baitPage,
  npcs: styles.npcPage,
  guides: styles.guidePage,
};

export function ArticleDetailPage({ entry, collection, path, breadcrumbs, facts = [], linkedRecords = [], relationGroups = [], related = [] }: ArticleDetailPageProps) {
  const displayName = contentDisplayName(collection, entry);
  const schemas: Record<string, unknown>[] = [
    articleSchema({ ...entry, name: displayName }, path),
    breadcrumbSchema(breadcrumbs),
  ];
  if (entry.faq?.length) schemas.push(faqSchema(entry.faq));

  return (
    <main className={collection ? detailPageClasses[collection] : undefined} id="main-content">
      <JsonLd data={schemas} />
      <header className={styles.hero}>
        <Image className={styles.heroImage} src={entry.image} alt="" fill loading="eager" sizes="100vw" aria-hidden="true" />
        <div className={styles.heroShade} />
        <div className="container">
          <Breadcrumb items={breadcrumbs} />
          <div className={styles.heroInner}>
            <div className={styles.heroMedia}>
              <Image src={entry.image} alt={entry.imageAlt} fill loading="eager" sizes="(max-width: 768px) 92vw, 560px" />
            </div>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{entry.eyebrow ?? "How to Fish guide"}</p>
              <h1>{displayName}</h1>
              <p>{entry.description}</p>
              <div className={styles.chips}>
                {(entry.tags ?? []).map((tag) => <span className={styles.chip} key={tag}>{tag}</span>)}
                {entry.updated ? <span className={styles.chip}>Updated {entry.updated}</span> : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`container ${styles.layout}`}>
        <article className={styles.article}>
          <section className={styles.dataOverview}>
            <div className={styles.overviewCopy}>
              <p><FileCheck2 size={15} /> Plan before you start</p>
              <h2>{operatingNotes[collection ?? "guides"]?.title ?? "What you need to know"}</h2>
              <span>{operatingNotes[collection ?? "guides"]?.text ?? "Check the route, equipment and next step below."}</span>
            </div>
            <dl className={styles.overviewFacts}>{facts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
          </section>

          {entry.sections.map((section, index) => (
            <section className={styles.section} id={headingId(section.heading)} key={section.heading}>
              <div className={styles.sectionHeading}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.heading}</h2></div>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets?.length ? (
                <ul className={styles.dataList}>{section.bullets.map((bullet) => <li key={bullet}><CheckCircle2 size={15} /> <span>{bullet}</span></li>)}</ul>
              ) : null}
            </section>
          ))}

          {linkedRecords.length ? (
            <section className={styles.section} id="linked-records">
              <div className={styles.sectionHeading}><span>↔</span><h2>{collection === "bait" ? "Creatures caught with this bait" : collection === "islands" ? "Creatures found in this area" : "Creatures on this route"}</h2></div>
              <p>Choose a creature to check its island, rod, bait, sell value and any quest or achievement tied to it.</p>
              <div className={styles.linkedRecords}>
                {linkedRecords.map((item) => (
                  <Link className={styles.linkedRecord} href={item.href} key={item.href}>
                    <span className={styles.linkedImage}><Image src={item.image} alt={item.imageAlt} fill sizes="92px" /></span>
                    <span><small>{item.meta}</small><strong>{item.title}</strong><em>{item.description}</em></span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {relationGroups.length ? (
            <section className={`${styles.section} ${styles.relationHub}`} id="connected-records">
              <div className={styles.sectionHeading}><span>↔</span><h2>Connected routes and records</h2></div>
              <p>Open the exact creature, item, island, quest or achievement used by this entry.</p>
              <div className={styles.relationGroups}>
                {relationGroups.map((group) => (
                  <section className={`${styles.relationGroup} ${group.items.length > 4 ? styles.wideRelationGroup : ""}`} id={group.id} key={group.id}>
                    <header><div><h3>{group.title}</h3><p>{group.description}</p></div><span>{group.items.length}</span></header>
                    <div className={`${styles.relationDataGrid} ${group.items.length === 1 ? styles.singleRelation : ""}`}>
                      {group.items.map((item) => {
                        const coverImage = /(boss|island|quest|npc|achievement|encounter|route)/i.test(item.meta);
                        return (
                          <Link className={styles.relationDataCard} href={item.href} key={`${group.id}-${item.href}-${item.title}`}>
                            {item.image ? <span className={`${styles.relationDataImage} ${coverImage ? styles.relationCoverImage : ""}`}><Image src={item.image} alt={item.imageAlt ?? ""} fill sizes="104px" /></span> : <span className={styles.relationDataGlyph}>✓</span>}
                            <div><small>{item.meta}</small><h3>{item.title}</h3><p>{item.description}</p></div>
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </section>
          ) : null}

          {entry.faq?.length ? (
            <section className={styles.faqSection} id="frequently-asked-questions">
              <h2>Frequently asked questions</h2>
              <FaqList items={entry.faq} />
            </section>
          ) : null}

          {related.length ? (
            <section className={styles.section} id="related-guides">
              <h2>Related guides</h2>
              <div className={styles.related}>
                {related.map((item) => (
                  <Link className={styles.relatedCard} href={item.href} key={item.href}>
                    <span className={styles.relatedImage}><Image src={item.image} alt={item.imageAlt} fill sizes="220px" /></span>
                    <span className={styles.relatedBody}><small>{item.meta}</small><strong>{item.title}</strong><em>{item.description}</em><b>Open guide <ArrowRight size={12} aria-hidden="true" /></b></span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

        </article>

        <aside className={styles.aside} aria-label="Article information">
          <div className={styles.asideMedia}>
            <Image src={entry.image} alt={entry.imageAlt} fill sizes="320px" />
          </div>
          <div className={`${styles.asidePanel} ${styles.asideIntro}`}>
            <p>At a glance</p>
            <h2>{displayName}</h2>
            <span>{entry.description}</span>
            {entry.tags?.length ? <div>{entry.tags.map((tag) => <b key={tag}>{tag}</b>)}</div> : null}
          </div>
          <div className={styles.asidePanel}>
            <h2>On this page</h2>
            <ol className={styles.toc}>
              {entry.sections.map((section) => (
                <li key={section.heading}><a href={`#${headingId(section.heading)}`}>{section.heading}</a></li>
              ))}
              {linkedRecords.length ? <li><a href="#linked-records">Creature links</a></li> : null}
              {relationGroups.map((group) => <li key={group.id}><a href={`#${group.id}`}>{group.title}</a></li>)}
              {entry.faq?.length ? <li><a href="#frequently-asked-questions">FAQ</a></li> : null}
              {related.length ? <li><a href="#related-guides">Related guides</a></li> : null}
            </ol>
          </div>
        </aside>
      </div>
    </main>
  );
}
