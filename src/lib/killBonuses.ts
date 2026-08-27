import killBonusesJson from "@/data/kill-bonuses.json";

export type AttackType = "ranged" | "melee" | "explosion" | "universal";

export type KillBonusTier = { count: number; name: string; multiplier: number };

export type KillBonus = {
  id: string;
  name: string;
  multiplier: number | null;
  formula: { kind: "clamped-lerp"; minimum: number; maximum: number; countScale: number; countOffset: number } | null;
  extraValuePercent: number | null;
  summary: string;
  exactTrigger: string;
  triggerValues: Record<string, string | number | boolean>;
  attackTypes: AttackType[];
  targets: Array<"creature" | "player">;
  stackable: boolean;
  sourceMethods: string[];
  notes?: string;
  tiers?: KillBonusTier[];
};

export const killBonuses = killBonusesJson as KillBonus[];

export function getKillBonus(slug: string) {
  return killBonuses.find((bonus) => bonus.id === slug);
}

export function formatMultiplier(value: number) {
  return `×${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

export function bonusMultiplierRange(bonus: KillBonus) {
  if (bonus.multiplier !== null) return formatMultiplier(bonus.multiplier);
  const tiers = bonus.tiers ?? [];
  return tiers.length ? `${formatMultiplier(tiers[0].multiplier)}–${formatMultiplier(tiers.at(-1)!.multiplier)}` : "Dynamic";
}

export function compatibleBonuses(attackType: AttackType) {
  return killBonuses.filter((bonus) => bonus.attackTypes.includes(attackType) || bonus.attackTypes.includes("universal"));
}
