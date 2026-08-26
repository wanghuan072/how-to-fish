import { DirectoryPage } from "@/page/directory/DirectoryPage";
import { collectionMetadata } from "@/seo/route";

export const metadata = collectionMetadata("weapons");
export default function Page() { return <DirectoryPage collection="weapons" />; }
