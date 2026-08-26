import type { FishEntry } from "@/types/content";

export function getFishImage(entry: FishEntry) {
  if (entry.image) return entry.image;
  return "/images/brand/creature-thumbnail-pending.svg";
}

export function getFishImageAlt(entry: FishEntry) {
  return entry.image
    ? entry.imageAlt ?? `${entry.name} creature illustration from How to Fish`
    : `No verified in-game creature thumbnail is available for ${entry.name}`;
}
