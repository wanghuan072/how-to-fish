import { DirectoryPage } from "@/page/directory/DirectoryPage";
import { collectionMetadata } from "@/seo/route";

export const metadata = collectionMetadata("npcs");
export default function Page() { return <DirectoryPage collection="npcs" />; }
