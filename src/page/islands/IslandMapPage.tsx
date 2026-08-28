import { InteractiveIslandMap, type InteractiveMapIsland } from "@/components/islands/InteractiveIslandMap";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import islandMapJson from "@/data/island-map.json";
import { islands } from "@/lib/content";
import { breadcrumbSchema, collectionPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/island-map.module.css";

type IslandMapPosition = { slug: string; x: number; y: number; marker: string; markerColor: string };

export function IslandMapPage() {
  const mapPositions = islandMapJson as IslandMapPosition[];
  const mapIslands: InteractiveMapIsland[] = mapPositions.flatMap((position) => {
    const island = islands.find((entry) => entry.slug === position.slug);
    return island ? [{ ...position, label: island.label, number: island.number, description: island.description, image: island.image, imageAlt: island.imageAlt, bossNames: island.bossNames }] : [];
  });
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Interactive Map", href: "/map/" }];

  return <main id="main-content">
    <JsonLd data={[breadcrumbSchema(breadcrumbs), collectionPageSchema(pageTdk.map)]} />
    <InnerHero breadcrumbs={breadcrumbs} eyebrow="North-up world map" title="How to Fish Island Map" description="Use the reference island map to see the five story destinations, then select an island name to open its complete route guide." image="/images/official/gameplay-07.jpg" imageAlt="Official How to Fish island gameplay screenshot" summary={<><span><strong>5</strong><small>island stages</small></span><span><strong>5</strong><small>linked route guides</small></span></>} />
    <section className={styles.paper}>
      <InteractiveIslandMap islands={mapIslands} />
    </section>
  </main>;
}
