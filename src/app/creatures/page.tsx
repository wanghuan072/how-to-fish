import { FishPage } from "@/page/fish/FishPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.creatures);
export default FishPage;
