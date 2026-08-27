import { MapPin, MessageCircleMore, Route, UserRound } from "lucide-react";
import type { ContentEntry } from "@/types/content";
import styles from "@/style/page/detail.module.css";

export function NpcProfile({ entry }: { entry: ContentEntry }) {
  const location = entry.tags?.[0] ?? "See route below";
  const role = entry.tags?.[1] ?? entry.eyebrow ?? "NPC service";
  const serviceNpc = /(shop|store|seller|kiosk|roulette|slot|cooking|skins)/i.test(`${entry.eyebrow} ${role}`);
  return <section className={styles.npcProfile} id="npc-overview">
    <header><span>NPC</span><div><h2>Before you talk to them</h2><p>Use this quick reference to find the NPC, understand their role and avoid spending or handing in a route item too early.</p></div></header>
    <div className={styles.npcProfileGrid}>
      <div><MapPin size={17} /><small>Find them at</small><strong>{location}</strong></div>
      <div><UserRound size={17} /><small>Role</small><strong>{role}</strong></div>
      <div><MessageCircleMore size={17} /><small>Interaction</small><strong>{serviceNpc ? "Shop or island service" : "Quest conversation and hand-in"}</strong></div>
      <div><Route size={17} /><small>What to do</small><strong>{entry.description}</strong></div>
    </div>
  </section>;
}
