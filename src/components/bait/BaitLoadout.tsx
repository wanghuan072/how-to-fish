import Image from "next/image";
import Link from "next/link";
import { Clock3, Crosshair, MapPin, RotateCcw, ShoppingBag } from "lucide-react";
import { fish, getFishImage, getFishImageAlt, isBossCreature } from "@/lib/content";
import type { BaitGameEntry } from "@/data/baitGameData";
import styles from "@/style/page/detail.module.css";

export function BaitLoadout({ bait }: { bait: BaitGameEntry }) {
  const targets = bait.catchables.map((catchable) => fish.find((entry) => entry.slug === catchable.slug)).filter((entry): entry is (typeof fish)[number] => Boolean(entry));
  const availability = bait.acquisition === "Shop"
    ? `$${bait.price?.toLocaleString("en-US")} · Island ${bait.islandNumber} shop`
    : "Quest supplied · not sold in a shop";
  return <>
    <section className={styles.baitLoadout} id="quick-setup">
      <header><span>LOADOUT</span><div><h2>Quick setup</h2><p>Equip this item before casting. The values below are taken from this item’s game record.</p></div></header>
      <div className={styles.baitLoadoutGrid}>
        <div><Crosshair size={17} /><small>Equip to</small><strong>{bait.rod}</strong></div>
        <div><ShoppingBag size={17} /><small>Get it</small><strong>{availability}</strong></div>
        <div><Clock3 size={17} /><small>Catch time</small><strong>{bait.catchTimeSeconds.min}–{bait.catchTimeSeconds.max}s</strong></div>
        <div><RotateCcw size={17} /><small>After a bite</small><strong>{bait.requireReeling ? "Reel in required" : "No reeling required"}</strong></div>
        <div><MapPin size={17} /><small>Bait loss field</small><strong>{bait.lostOnBaitChance}%</strong></div>
      </div>
    </section>

    <section className={styles.baitCatchPool} id="catch-pool">
      <header><span>POOL</span><div><h2>Catch pool</h2><p>Each percentage is this target’s share inside the {bait.sourceName} pool, not its overall chance anywhere in the game.</p></div><b>{bait.catchables.length} target{bait.catchables.length === 1 ? "" : "s"}</b></header>
      <div className={styles.catchPoolRows}>
        {bait.catchables.map((catchable) => {
          const target = targets.find((entry) => entry.slug === catchable.slug);
          const href = target && isBossCreature(target) ? `/bosses/${target.slug}/` : `/creatures/${catchable.slug}/`;
          const image = target ? getFishImage(target) : bait.image;
          const alt = target ? getFishImageAlt(target) : catchable.name;
          return <Link className={styles.catchPoolRow} href={href} key={catchable.slug}>
            <span className={styles.catchPoolImage}><Image src={image} alt={alt} fill sizes="52px" /></span>
            <span className={styles.catchPoolName}><strong>{catchable.name}</strong><small>{catchable.weight === 1 && catchable.poolShare === 100 ? "Dedicated target" : `Raw weight ${catchable.weight}`}</small></span>
            <span className={styles.catchPoolBar} aria-label={`${catchable.poolShare.toFixed(catchable.poolShare % 1 ? 1 : 0)} percent pool share`}><i style={{ width: `${catchable.poolShare}%` }} /></span>
            <b>{catchable.poolShare.toFixed(catchable.poolShare % 1 ? 1 : 0)}%</b>
          </Link>;
        })}
      </div>
    </section>
  </>;
}
