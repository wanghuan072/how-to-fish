import { DirectoryPage } from "@/page/directory/DirectoryPage";
import { collectionMetadata } from "@/seo/route";

export const metadata = collectionMetadata("items");
export default function Page() { return <DirectoryPage collection="items" />; }
