import { LegalPage } from "@/page/legal/LegalPage";
import { createMetadata } from "@/seo/metadata";
import { pageTdk } from "@/seo/tdk";

export const metadata = createMetadata(pageTdk.contactUs);

export default function Page() {
  return <LegalPage page="contact" />;
}
