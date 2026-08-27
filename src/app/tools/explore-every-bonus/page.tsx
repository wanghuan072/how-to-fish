import { ExploreEveryBonusPage } from "@/page/tools/ExploreEveryBonusPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.exploreEveryBonus);

export default function Page() { return <ExploreEveryBonusPage />; }
