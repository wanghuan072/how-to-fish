"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { formatMultiplier, type AttackType, type KillBonus } from "@/lib/killBonuses";
import type { FishEntry } from "@/types/content";
import styles from "@/style/page/kill-bonuses.module.css";

const attackTypes: Array<{ value: AttackType; label: string }> = [
  { value: "ranged", label: "Ranged" },
  { value: "melee", label: "Melee" },
  { value: "explosion", label: "Explosion" },
  { value: "universal", label: "Universal" },
];

const exclusiveGroups: Record<string, string> = {
  "no-scope": "scope",
  "quick-scope": "scope",
  dogfight: "aerial",
  aerial: "aerial",
  "fly-fishing": "aerial",
};

const conditionGroups = [
  { title: "Aim & weapon handling", note: "Scope, range and shot-management bonuses.", ids: ["no-scope", "quick-scope", "longshot", "headshot", "one-shot-one-kill", "point-blank", "last-bullet"] },
  { title: "Movement & aerial state", note: "Spin and airborne conditions. Choose one aerial state when applicable.", ids: ["three-sixty", "dogfight", "aerial", "fly-fishing"] },
  { title: "Combat state", note: "Target state and challenge bonuses.", ids: ["noob-kill", "finally", "endangered", "killsteal", "overkill", "impressive", "melee", "explosion"] },
] as const;

function selectionGroup(id: string) {
  return id.startsWith("multikill-") ? "multikill" : exclusiveGroups[id];
}

export function KillBonusCalculator({ bonuses, creatures }: { bonuses: KillBonus[]; creatures: FishEntry[] }) {
  const [creatureSlug, setCreatureSlug] = useState("");
  const [islandFilter, setIslandFilter] = useState("All creatures");
  const [attackType, setAttackType] = useState<AttackType>("ranged");
  const [selected, setSelected] = useState<Record<string, { name: string; multiplier: number }>>({});
  const choices = useMemo(() => bonuses.filter((bonus) => bonus.attackTypes.includes(attackType) || bonus.attackTypes.includes("universal")), [attackType, bonuses]);
  const creature = creatures.find((entry) => entry.slug === creatureSlug);
  const creatureIslands = [...new Set(creatures.map((entry) => entry.islandName))];
  const visibleCreatures = islandFilter === "All creatures"
    ? creatures
    : creatures.filter((entry) => entry.islandName === islandFilter);
  const base = creature?.baseValue ?? 0;
  const multiplier = Object.values(selected).reduce((total, bonus) => total * bonus.multiplier, 1);
  const reward = base * multiplier;

  const changeAttackType = (next: AttackType) => {
    setAttackType(next);
    setSelected({});
  };

  const toggleBonus = (bonus: KillBonus) => {
    const value = bonus.multiplier;
    if (value === null) return;
    setSelected((current) => {
      if (current[bonus.id]) {
        const next = { ...current };
        delete next[bonus.id];
        return next;
      }
      const group = selectionGroup(bonus.id);
      const compatible = group
        ? Object.fromEntries(Object.entries(current).filter(([id]) => selectionGroup(id) !== group))
        : current;
      return { ...compatible, [bonus.id]: { name: bonus.name, multiplier: value } };
    });
  };

  const selectMultikillTier = (bonus: KillBonus, count: number) => {
    const tier = bonus.tiers?.find((item) => item.count === count);
    setSelected((current) => {
      const withoutTier = Object.fromEntries(Object.entries(current).filter(([id]) => !id.startsWith("multikill-")));
      return tier ? { ...withoutTier, [`${bonus.id}-${tier.count}`]: { name: `${tier.name} (${tier.count} kills)`, multiplier: tier.multiplier } } : withoutTier;
    });
  };

  const multikill = choices.find((bonus) => bonus.id === "multikill");
  const fixedChoices = choices.filter((bonus) => bonus.multiplier !== null);
  const selectedBonuses = Object.values(selected);

  return <section className={styles.calculator} id="bonus-multiplier-calculator">
    <header className={styles.calculatorHeader}><div><p>Reward calculator</p><h2>Build your Killscore reward</h2><span>Choose the creature first, then select the bonus conditions you actually earned.</span></div><span className={styles.stepLabel}>Step 1 · Set up</span></header>
    <div className={styles.calculatorSetup}>
      <section className={styles.creaturePicker} aria-labelledby="creature-picker-title">
        <header><div><p>Step 1 · Choose a creature</p><h3 id="creature-picker-title">What did you defeat?</h3><span>Pick the creature you killed to use its actual sell value as the base reward.</span></div>{creature ? <b>{creature.name} selected</b> : null}</header>
        <div className={styles.creatureFilters} aria-label="Filter creatures by island">
          {["All creatures", ...creatureIslands].map((island) => <button type="button" className={islandFilter === island ? styles.selectedCreatureFilter : undefined} onClick={() => setIslandFilter(island)} key={island}>{island}</button>)}
        </div>
        <div className={styles.creatureList}>
          {visibleCreatures.map((entry) => <button type="button" className={`${styles.creatureOption}${creatureSlug === entry.slug ? ` ${styles.selectedCreature}` : ""}`} aria-pressed={creatureSlug === entry.slug} onClick={() => setCreatureSlug(entry.slug)} key={entry.slug}>
            <span className={styles.creatureImage}><Image src={entry.image ?? "/images/brand/creature-thumbnail-pending.svg"} alt="" fill sizes="52px" /></span>
            <span><strong>{entry.name}</strong><small>{entry.category} · ${entry.baseValue!.toLocaleString("en-US")}</small></span>
          </button>)}
        </div>
      </section>
      <fieldset><legend>Attack type</legend><div>{attackTypes.map((type) => <button type="button" className={attackType === type.value ? styles.selectedType : undefined} onClick={() => changeAttackType(type.value)} key={type.value}>{type.label}</button>)}</div></fieldset>
    </div>
    <div className={styles.calculatorWorkspace}>
      <div className={styles.conditionArea}>
        <div className={styles.conditionIntro}><div><p>Step 2 · Add conditions</p><h3>What happened during the kill?</h3></div><span>Only matching bonuses are shown for {attackType} attacks.</span></div>
        {conditionGroups.map((group) => {
          const entries = fixedChoices.filter((bonus) => group.ids.includes(bonus.id as never));
          if (!entries.length) return null;
          return <section className={styles.conditionGroup} key={group.title}><header><div><h4>{group.title}</h4><span>{group.note}</span></div></header><div>{entries.map((bonus) => { const groupId = selectionGroup(bonus.id); return <label className={styles.choice} key={bonus.id}><input type={groupId ? "radio" : "checkbox"} name={groupId ? `kill-bonus-${groupId}` : undefined} checked={Boolean(selected[bonus.id])} onChange={() => toggleBonus(bonus)} /><span><b>{bonus.name}</b><small>{bonus.summary}</small></span><strong>{formatMultiplier(bonus.multiplier!)}</strong></label>; })}</div></section>;
        })}
        {multikill ? <section className={`${styles.conditionGroup} ${styles.multikillGroup}`}><header><div><h4>Multikill chain</h4><span>Choose the total kills in the active chain, including this kill.</span></div><strong>Dynamic</strong></header><label className={styles.multikillControl}><span><b>Current chain length</b><small>Leave it off if this was not a chain kill.</small></span><select aria-label={`${multikill.name} total kills`} value={Object.keys(selected).find((id) => id.startsWith(`${multikill.id}-`))?.slice(multikill.id.length + 1) ?? ""} onChange={(event) => selectMultikillTier(multikill, Number(event.target.value))}><option value="">Not applied</option>{multikill.tiers?.map((tier) => <option value={tier.count} key={tier.count}>{tier.count} kills · {formatMultiplier(tier.multiplier)}</option>)}</select></label></section> : null}
      </div>
      <aside className={styles.calculatorResult}><p>Live reward</p><h3>Killscore result</h3><dl><div><dt>Base value</dt><dd>{creature ? `$${base.toLocaleString("en-US")}` : "Choose a creature"}</dd></div><div><dt>Multiplier</dt><dd>{formatMultiplier(multiplier)}</dd></div><div className={styles.finalReward}><dt>Final reward</dt><dd>{creature ? `$${reward.toLocaleString("en-US", { maximumFractionDigits: 2 })}` : "—"}</dd></div></dl><button type="button" onClick={() => setSelected({})} disabled={!selectedBonuses.length}>Clear choices</button><div className={styles.appliedBonuses}><small>Applied bonuses</small>{selectedBonuses.length ? <ul>{selectedBonuses.map((bonus) => <li key={bonus.name}>{bonus.name} <b>{formatMultiplier(bonus.multiplier)}</b></li>)}</ul> : <span>{creature ? "Select every bonus that applied to preview the final reward." : "Choose a creature to start the calculation."}</span>}</div><p className={styles.calculatorNote}>Only sellable combat creatures are listed. Scope choices are mutually exclusive; Dogfight, Aerial and Fly Fishing are also mutually exclusive.</p></aside>
    </div>
  </section>;
}
