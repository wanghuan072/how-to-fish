import { IslandMapPage } from "@/page/islands/IslandMapPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.map);
export default function Page() { return <IslandMapPage />; }
