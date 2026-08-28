"use client";

import "leaflet/dist/leaflet.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import L from "leaflet";
import { ImageOverlay, MapContainer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import type { InteractiveMapIsland } from "./InteractiveIslandMap";
import styles from "@/style/page/island-map.module.css";

const mapBounds = L.latLngBounds([0, 0], [1800, 2400]);

function markerIcon(island: InteractiveMapIsland) {
  const colors: Record<string, string> = { blue: "#3288b8", green: "#5e9e72", yellow: "#dba326", red: "#d45247", pink: "#da718e" };
  const color = colors[island.markerColor.toLowerCase()] ?? colors.blue;
  return L.divIcon({
    className: styles.islandMarker,
    html: `<span class="${styles.islandPin}" style="--marker-color:${color}"><b>${String(island.number).padStart(2, "0")}</b></span>`,
    iconSize: [38, 46], iconAnchor: [19, 42], popupAnchor: [0, -39], tooltipAnchor: [0, -42],
  });
}

function mapPoint(island: InteractiveMapIsland): [number, number] {
  return [1800 - island.y / 100 * 1800, island.x / 100 * 2400];
}

function MapNavigator({ selected }: { selected?: InteractiveMapIsland }) {
  const map = useMap();
  useEffect(() => { map.invalidateSize(); }, [map]);
  useEffect(() => {
    if (selected) map.flyTo(mapPoint(selected), Math.max(map.getZoom(), -0.25), { animate: true, duration: .6 });
  }, [map, selected]);
  return null;
}

type CanvasProps = { islands: InteractiveMapIsland[]; selectedSlug?: string; onSelect: (slug: string) => void };

function IslandMapCanvas({ islands, selectedSlug, onSelect }: CanvasProps) {
  const selected = islands.find((island) => island.slug === selectedSlug);
  return <MapContainer aria-label="Interactive How to Fish island map" attributionControl={false} center={mapBounds.getCenter()} className={styles.leafletMap} crs={L.CRS.Simple} maxBounds={mapBounds.pad(.1)} maxBoundsViscosity={.8} maxZoom={1.5} minZoom={-2} scrollWheelZoom zoom={-1} zoomControl zoomDelta={.35} zoomSnap={.1}>
    <ImageOverlay bounds={mapBounds} url="/images/maps/how-to-fish-islands-map.webp" />
    {islands.map((island) => <Marker eventHandlers={{ click: () => onSelect(island.slug) }} icon={markerIcon(island)} key={island.slug} position={mapPoint(island)}>
      <Tooltip direction="top" opacity={.96}>{island.label}</Tooltip>
    </Marker>)}
    {selected ? <Popup autoPan={false} closeButton eventHandlers={{ remove: () => onSelect("") }} position={mapPoint(selected)}>
      <article className={styles.mapPopup}>
        <div className={styles.popupImage}><Image src={selected.image} alt={selected.imageAlt} fill sizes="260px" /></div>
        <div className={styles.popupBody}>
          <small>{selected.markerColor} Radar marker · Island {selected.number}</small>
          <h3>{selected.label}</h3>
          <p>{selected.description}</p>
          <dl><div><dt>Creatures</dt><dd>{selected.number === 1 ? "6" : selected.number === 5 ? "8" : "11"}</dd></div><div><dt>Key encounters</dt><dd>{selected.bossNames.length}</dd></div></dl>
          <Link className={styles.popupGuideLink} href={`/islands/${selected.slug}/`}>Open {selected.label} guide <span aria-hidden="true">→</span></Link>
        </div>
      </article>
    </Popup> : null}
    <MapNavigator selected={selected} />
  </MapContainer>;
}

export function IslandLeafletMap({ islands }: { islands: InteractiveMapIsland[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string>();
  return <>
    <div className={styles.mapViewport}>
      <IslandMapCanvas islands={islands} onSelect={setSelectedSlug} selectedSlug={selectedSlug} />
      <p className={styles.mapHint}>Drag to move · Use the map controls or mouse wheel to zoom · Select a marker for details</p>
    </div>
    <nav className={styles.routeLinks} aria-label="Island locations">
      {islands.map((island) => <button aria-pressed={selectedSlug === island.slug} key={island.slug} onClick={() => setSelectedSlug(island.slug)} type="button"><span>{String(island.number).padStart(2, "0")}</span><div><small>{island.markerColor} Radar marker</small><strong>{island.label}</strong></div></button>)}
    </nav>
  </>;
}
