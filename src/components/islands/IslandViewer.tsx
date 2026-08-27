"use client";

import { useMemo, useSyncExternalStore } from "react";
import styles from "@/style/page/detail.module.css";

const viewerOrigin = "https://how-to-fish-islands.vercel.app";
const emptySubscribe = () => () => {};

type IslandViewerProps = {
  islandName: string;
  viewerPath: string;
};

export function IslandViewer({ islandName, viewerPath }: IslandViewerProps) {
  const parentOrigin = useSyncExternalStore(emptySubscribe, () => window.location.origin, () => "");

  const viewerUrl = useMemo(() => {
    const url = new URL(viewerPath, viewerOrigin);
    url.searchParams.set("embed", "1");
    if (parentOrigin) url.searchParams.set("parentOrigin", parentOrigin);
    return url.toString();
  }, [parentOrigin, viewerPath]);

  return (
    <section className={`${styles.section} ${styles.islandViewerSection}`} id="interactive-island-map">
      <div className={styles.sectionHeading}><span>3D</span><h2>Explore {islandName} in 3D</h2></div>
      <p>Use the interactive island model to inspect the coastline and landmarks while following this route. Drag to rotate, scroll to zoom and use the viewer controls to reset the camera.</p>
      <div className={styles.islandViewerFrame}>
        {parentOrigin ? (
          <iframe
            src={viewerUrl}
            title={`Interactive 3D model of ${islandName}`}
            loading="lazy"
            allow="fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : <div className={styles.islandViewerLoading}>Loading the interactive island model…</div>}
      </div>
    </section>
  );
}
