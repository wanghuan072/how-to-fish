"use client";

import { useMemo, useSyncExternalStore } from "react";

const viewerOrigin = "https://how-to-fish-islands.vercel.app";
const viewerPaths: Record<string, string> = {
  lighthouse: "/lighthouse-island/",
  "island-2-forest": "/piranha-island/",
  "island-3-desert": "/pufferfish-island/",
  "island-4-rocks": "/albatross-island/",
  "island-5-volcano": "/military-volcano/",
};
const emptySubscribe = () => () => {};

export function IslandPreview({ slug, label }: { slug: string; label: string }) {
  const parentOrigin = useSyncExternalStore(emptySubscribe, () => window.location.origin, () => "");
  const src = useMemo(() => {
    const url = new URL(viewerPaths[slug] ?? "/lighthouse-island/", viewerOrigin);
    url.searchParams.set("embed", "1");
    if (parentOrigin) url.searchParams.set("parentOrigin", parentOrigin);
    return url.toString();
  }, [parentOrigin, slug]);

  return <iframe src={src} title={`${label} 3D island preview`} loading="lazy" tabIndex={-1} aria-hidden="true" />;
}
