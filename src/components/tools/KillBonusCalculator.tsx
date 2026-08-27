"use client";

import { useMemo, useState } from "react";
import { formatMultiplier, type AttackType, type KillBonus } from "@/lib/killBonuses";
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
  { title: "Movement & aerial state", note: "Spin and airborne conditions. Pick one aerial state.", ids: ["three-sixty", "dogfight", "aerial", "fly-fishing"] },
  { title: "Combat state", note: "Target state and challenge bonuses.", ids: ["noob-kill", "finally", "endangered", "killsteal", "overkill", "impressive", "melee", "explosion"] },
] as const;

function selectionGroup(id: string) {
  return id.startsWith("multikill-") ? "multikill" : exclusiveGroups[id];
}

export function KillBonusCalculator({ bonuses }: { bonuses: KillBonus[] }) {
  const [baseReward, setBaseReward] = useState("100");
  const [attackType, setAttackType] = useState<AttackType>("ranged");
  const [selected, setSelected] = useState<Record<string, { name: string; multiplier: number }>>({});
  const choices = useMemo(() => bonuses.filter((bonus) => bonus.attackTypes.includes(attackType) || bonus.attackTypes.includes("universal")), [attackType, bonuses]);
  const base = Math.max(0, Number(baseReward) || 0);
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
      const compatible = Object.fromEntries(Object.entries(current).filter(([id]) => selectionGroup(id) !== group));
      return { ...compatible, [bonus.id]: { name: bonus.name, multiplier: value } };
    });
  };

  const selectMultikillTier = (bonus: KillBonus, count: number) => {
    const tier = bonus.tiers?.find((item) => item.count === count);
    setSelected((current) => {
      const withoutTier = Object.fromEntries(Object.entries(current).filter(([id]) => selectionGroup(id) !== "multikill"));
      return tier ? { ...withoutTier, [`${bonus.id}-${tier.count}`]: { name: `${tier.name} (${tier.count} kills)`, multiplier: tier.multiplier } } : withoutTier;
    });
  };

  const multikill = choices.find((bonus) => bonus.id === "multikill");
  const fixedChoices = choices.filter((bonus) => bonus.multiplier !== null);
  const selectedBonuses = Object.values(selected);

  return <section className={styles.calculator} id="bonus-multiplier-calculator">
    <header className={styles.calculatorHeader}><div><p>Reward calculator</p><h2>Build your Killscore reward</h2><span>Set up the kill first, then choose the bonus conditions you actually earned.</span></div><span className={styles.stepLabel}>Step 1 · Set up</span></header>
    <div className={styles.calculatorSetup}>
      <label>Base reward<input type="number" min="0" step="any" value={baseReward} onChange={(event) => setBaseReward(event.target.value)} /></label>
      <fieldset><legend>Attack type</legend><div>{attackTypes.map((type) => <button type="button" className={attackType === type.value ? styles.selectedType : undefined} onClick={() => changeAttackType(type.value)} key={type.value}>{type.label}</button>)}</div></fieldset>
    </div>
    <div className={styles.calculatorWorkspace}>
      <div className={styles.conditionArea}>
        <div className={styles.conditionIntro}><div><p>Step 2 · Add conditions</p><h3>What happened during the kill?</h3></div><span>Only matching bonuses are shown for {attackType} attacks.</span></div>
        {conditionGroups.map((group) => {
          const entries = fixedChoices.filter((bonus) => group.ids.includes(bonus.id as never));
          if (!entries.length) return null;
          return <section className={styles.conditionGroup} key={group.title}><header><div><h4>{group.title}</h4><span>{group.note}</span></div></header><div>{entries.map((bonus) => <label className={styles.choice} key={bonus.id}><input type={selectionGroup(bonus.id) ? "radio" : "checkbox"} name={selectionGroup(bonus.id) ? `kill-bonus-${selectionGroup(bonus.id)}` : undefined} checked={Boolean(selected[bonus.id])} onChange={() => toggleBonus(bonus)} /><span><b>{bonus.name}</b><small>{bonus.summary}</small></span><strong>{formatMultiplier(bonus.multiplier!)}</strong></label>)}</div></section>;
        })}
        {multikill ? <section className={`${styles.conditionGroup} ${styles.multikillGroup}`}><header><div><h4>Multikill chain</h4><span>Choose the total kills in the active chain, including this kill.</span></div><strong>Dynamic</strong></header><label className={styles.multikillControl}><span><b>Current chain length</b><small>Leave it off if this was not a chain kill.</small></span><select aria-label={`${multikill.name} total kills`} value={Object.keys(selected).find((id) => id.startsWith(`${multikill.id}-`))?.slice(multikill.id.length + 1) ?? ""} onChange={(event) => selectMultikillTier(multikill, Number(event.target.value))}><option value="">Not applied</option>{multikill.tiers?.map((tier) => <option value={tier.count} key={tier.count}>{tier.count} kills · {formatMultiplier(tier.multiplier)}</option>)}</select></label></section> : null}
      </div>
      <aside className={styles.calculatorResult}><p>Live reward</p><h3>Killscore result</h3><dl><div><dt>Base reward</dt><dd>{base.toLocaleString("en-US", { maximumFractionDigits: 2 })}</dd></div><div><dt>Multiplier</dt><dd>{formatMultiplier(multiplier)}</dd></div><div className={styles.finalReward}><dt>Final reward</dt><dd>{reward.toLocaleString("en-US", { maximumFractionDigits: 2 })}</dd></div></dl><button type="button" onClick={() => setSelected({})} disabled={!selectedBonuses.length}>Clear choices</button><div className={styles.appliedBonuses}><small>Applied bonuses</small>{selectedBonuses.length ? <ul>{selectedBonuses.map((bonus) => <li key={bonus.name}>{bonus.name} <b>{formatMultiplier(bonus.multiplier)}</b></li>)}</ul> : <span>Choose a condition to preview the final reward.</span>}</div><p className={styles.calculatorNote}>Scope choices are mutually exclusive. Dogfight, Aerial and Fly Fishing are also mutually exclusive.</p></aside>
    </div>
  </section>;
}
