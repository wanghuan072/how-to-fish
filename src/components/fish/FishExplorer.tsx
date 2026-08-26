"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Coins, Filter, MapPinned, Search } from "lucide-react";
import { getFishImage, getFishImageAlt } from "@/lib/content";
import type { FishEntry, IslandEntry } from "@/types/content";
import styles from "@/style/page/fish.module.css";

const all = "All";

export function FishExplorer({ entries, islandEntries }: { entries: FishEntry[]; islandEntries: IslandEntry[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [island, setIsland] = useState(all);
  const [category, setCategory] = useState(all);
  const [sort, setSort] = useState("route");
  const islandFilters = useMemo(() => islandEntries.map((item) => ({ slug: item.slug, label: item.label, count: entries.filter((entry) => entry.islandSlug === item.slug).length })), [entries, islandEntries]);
  const categories = useMemo(() => [...new Set(entries.map((entry) => entry.category))], [entries]);
  const routeOrder = useMemo(() => new Map(entries.map((entry, index) => [entry.slug, index])), [entries]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const haystack = `${entry.name} ${entry.aliases?.join(" ") ?? ""} ${entry.islandName} ${entry.rod} ${entry.lure} ${entry.category}`.toLowerCase();
      return (!needle || haystack.includes(needle)) && (island === all || entry.islandSlug === island) && (category === all || entry.category === category);
    }).sort((a, b) => {
      if (sort === "route") return (routeOrder.get(a.slug) ?? 999) - (routeOrder.get(b.slug) ?? 999);
      if (sort === "island") return a.islandName.localeCompare(b.islandName) || a.name.localeCompare(b.name);
      if (sort === "category") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      if (sort === "value") return (b.baseValue ?? -1) - (a.baseValue ?? -1) || a.name.localeCompare(b.name);
      return a.name.localeCompare(b.name);
    });
  }, [category, entries, island, query, routeOrder, sort]);

  return (
    <div className={styles.explorer}>
      <aside className={styles.sidebar} aria-label="Fish filters">
        <section className={styles.filterPanel}>
          <h2><Filter size={17} /> Categories</h2>
          <div className={styles.filterList}>
            <button className={`${styles.filterButton} ${category === all ? styles.filterActive : ""}`} onClick={() => setCategory(all)}><span>All creatures</span><span className={styles.count}>{entries.length}</span></button>
            {categories.map((name) => <button className={`${styles.filterButton} ${category === name ? styles.filterActive : ""}`} onClick={() => setCategory(name)} key={name}><span>{name}</span><span className={styles.count}>{entries.filter((entry) => entry.category === name).length}</span></button>)}
          </div>
        </section>
        <section className={styles.filterPanel}>
          <h2><MapPinned size={17} /> Filter by Island</h2>
          <div className={styles.filterList}>
            <button className={`${styles.filterButton} ${island === all ? styles.filterActive : ""}`} onClick={() => setIsland(all)}><span>All islands</span><span className={styles.count}>{entries.length}</span></button>
            {islandFilters.map((item, index) => <button className={`${styles.filterButton} ${island === item.slug ? styles.filterActive : ""}`} onClick={() => setIsland(item.slug)} key={item.slug}><span><i className={styles.islandDot}>{index + 1}</i>{item.label}</span><span className={styles.count}>{item.count}</span></button>)}
            <Link className={styles.clearButton} href="/islands/">View all islands →</Link>
          </div>
        </section>
      </aside>

      <div className={styles.main}>
        <div className={styles.resultLine}>
          <label className={styles.inputWrap}><span className="sr-only">Search fish</span><input className={styles.searchInput} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search fish by name, island, rod or lure..." /><Search size={18} /></label>
          <span>Showing {filtered.length} of {entries.length} creatures</span>
          <label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="route">Story / encyclopedia order</option><option value="name">Name</option><option value="island">Island</option><option value="category">Type</option><option value="value">Base coins (high to low)</option></select></label>
        </div>
        <section className={styles.tablePanel} aria-label="Fish list results">
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Creature</th><th>Location</th><th>Rod</th><th>Bait / trigger</th><th>Base coins</th></tr></thead>
              <tbody>{filtered.map((entry) => <tr className={styles.clickableRow} onClick={(event) => { if ((event.target as HTMLElement).closest("a")) return; router.push(`/fish/${entry.slug}/`); }} key={entry.slug}><td><Link className={styles.fishName} href={`/fish/${entry.slug}/`} aria-label={`Open ${entry.name} details`}><span className={styles.fishThumb}><Image src={getFishImage(entry)} alt={getFishImageAlt(entry)} fill sizes="66px" /></span><span>{entry.name}<small>{entry.aliases?.length ? entry.aliases.join(" · ") : entry.category}</small></span></Link></td><td>{entry.islandName}</td><td>{entry.rod}</td><td>{entry.lure}{entry.lureCost !== undefined ? <small>${entry.lureCost.toLocaleString("en-US")}</small> : null}</td><td>{entry.baseValue !== undefined ? <span className={styles.coinValue}><Coins size={15} aria-hidden="true" /><strong>{entry.baseValue.toLocaleString("en-US")}</strong></span> : <span className={styles.pending}>No fixed value</span>}</td></tr>)}</tbody>
            </table>
          </div>
        </section>
        <section className={styles.inlineIslands}>
          <div className={styles.inlineHeading}><h2>Fish by Island</h2><Link href="/islands/">View all islands →</Link></div>
          <div className={styles.islandGrid}>{islandEntries.map((item) => <Link className={styles.islandCard} href={`/islands/${item.slug}/`} key={item.slug}><span className={styles.islandImage}><Image src={item.image} alt="" fill sizes="240px" /></span><span className={styles.islandBody}><strong>{item.label}</strong><span>{item.fishCount} creatures</span><span>Boss: {item.bossNames[0]}</span></span></Link>)}</div>
        </section>
      </div>
    </div>
  );
}
