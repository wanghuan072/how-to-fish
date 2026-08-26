import { RodsAndLuresPage } from "@/page/wiki/RodsAndLuresPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.rodsAndLures);

export default function Page() {
  return <RodsAndLuresPage />;
}
