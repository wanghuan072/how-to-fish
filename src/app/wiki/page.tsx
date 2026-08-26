import { WikiPage } from "@/page/wiki/WikiPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.wiki);
export default WikiPage;
