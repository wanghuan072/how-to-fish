import { Crosshair, MapPin, PackageCheck, ShieldCheck, Wallet } from "lucide-react";
import type { WeaponProgression } from "@/lib/gameplayData";
import styles from "@/style/page/detail.module.css";

export function WeaponLoadout({ weapon }: { weapon: WeaponProgression }) {
  return <section className={styles.weaponLoadout} id="weapon-overview">
    <header><span>ARMORY</span><div><h2>Weapon overview</h2><p>Check the purchase stage and combat role first, then read the handling notes and connected encounters below.</p></div></header>
    <div className={styles.weaponStatGrid}>
      <div><Wallet size={17} /><small>Price</small><strong>{weapon.price}</strong></div>
      <div><MapPin size={17} /><small>Available at</small><strong>{weapon.availableAt}</strong></div>
      <div><Crosshair size={17} /><small>Starting damage</small><strong>{weapon.baseDamage ?? weapon.damage}</strong></div>
      <div><PackageCheck size={17} /><small>Magazine</small><strong>{weapon.magazine ?? "Not applicable"}</strong></div>
      <div><ShieldCheck size={17} /><small>Best role</small><strong>{weapon.role}</strong></div>
    </div>
    <div className={styles.weaponHandling}><strong>Player note</strong><span>{weapon.upgradeNote}</span></div>
  </section>;
}
