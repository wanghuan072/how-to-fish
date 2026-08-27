import { KillBonusesPage } from "@/page/tools/KillBonusesPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.bonusMultiplierCalculator);

export default function Page() { return <KillBonusesPage />; }
