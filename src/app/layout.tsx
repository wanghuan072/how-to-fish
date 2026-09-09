import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/config/site";
import { pageTdk } from "@/seo/tdk";
import "@/style/globals.css";

const nunito = localFont({ src: "../../public/fonts/Nunito-Variable.woff2", variable: "--font-nunito", weight: "200 1000", display: "swap" });
const underdog = localFont({ src: "../../public/fonts/Underdog-Regular.woff2", variable: "--font-underdog", weight: "400", display: "swap" });
const medieval = localFont({ src: "../../public/fonts/MedievalSharp-Brand.woff2", variable: "--font-medieval", weight: "400", display: "swap", preload: false, adjustFontFallback: "Times New Roman" });

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
    <html lang="en" className={`${nunito.variable} ${underdog.variable} ${medieval.variable}`} data-scroll-behavior="smooth">
      <head>
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-BF2BMZKJP0" />
        <Script id="google-analytics" strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BF2BMZKJP0');`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
