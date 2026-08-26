import type { CollectionKey, ContentEntry } from "@/types/content";

export function contentDisplayName(collection: CollectionKey | undefined, entry: ContentEntry) {
  if (collection === "quests") return entry.name.split(" & ")[0];
  if (collection === "islands") return entry.name.replace(/ Starting Area Guide$| Guide$/i, "");
  if (collection === "bosses") return entry.name.replace(/ Mini-Boss Guide$| Boss Guide$| Final Boss$| Guide$/i, "");
  if (collection === "weapons") return entry.name.replace(/ Guide$/i, "");
  if (collection === "bait") return entry.name.replace(/ Guide$/i, "");
  if (collection === "guides") return entry.name.replace(/^How to Fish /i, "");
  return entry.name;
}

export function contentSeoTitle(collection: CollectionKey, entry: ContentEntry) {
  const name = contentDisplayName(collection, entry);
  if (collection === "bosses") return `${name} Boss — Trigger, Fight Tips & Rewards`;
  if (collection === "quests") return `${name} Quest — Steps, Items & Rewards`;
  if (collection === "islands") return `${name} — Unlock Route, Creatures & Weapons`;
  if (collection === "weapons") return `${name} — Price, Damage & Where to Buy`;
  if (collection === "items") return `${name} — Location, Use & Quest Links`;
  if (collection === "bait") return `${name} — Catches, Rod & Island`;
  if (collection === "npcs") return `${name} — Location, Quest & Reward`;
  return entry.name;
}
