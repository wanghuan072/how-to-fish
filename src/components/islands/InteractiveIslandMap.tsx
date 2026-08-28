"use client";

import dynamic from "next/dynamic";
import styles from "@/style/page/island-map.module.css";

export type InteractiveMapIsland = {
  slug: string;
  label: string;
  number: number;
  x: number;
  y: number;
  marker: string;
  markerColor: string;
  description: string;
  image: string;
  imageAlt: string;
  bossNames: string[];
};

const IslandLeafletMap = dynamic(
  () => import("./IslandLeafletMap").then((module) => module.IslandLeafletMap),
  { ssr: false, loading: () => <div className={styles.mapLoading}>Loading the island map…</div> },
);

export function InteractiveIslandMap({ islands }: { islands: InteractiveMapIsland[] }) {
  return <section className={styles.mapSection} aria-labelledby="map-heading">
    <header className={styles.mapIntro}><p>Island positions from the extracted game scenes</p><h2 id="map-heading">Explore the island map</h2><span>Drag to explore, zoom in for a closer look, or select an island below. A selected map marker opens its island summary and route guide.</span></header>
    <IslandLeafletMap islands={islands} />
  </section>;
}
