import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/config/site";
import { buildSearchIndex } from "@/lib/content";
import { pageTdk } from "@/seo/tdk";
import "@/style/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: pageTdk.home.title, template: "%s" },
  description: pageTdk.home.description,
  applicationName: siteConfig.name,
  category: "gaming",
  keywords: pageTdk.home.keywords,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
  },
};

export const viewport: Viewport = { themeColor: "#031c31", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader searchItems={buildSearchIndex()} />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
