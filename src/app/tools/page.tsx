import { ToolsPage } from "@/page/tools/ToolsPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.tools);

export default function Page() { return <ToolsPage />; }
