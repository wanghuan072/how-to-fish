import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import styles from "@/style/components/layout.module.css";

const legalLinks = [
  ["Privacy Policy", "/legal/privacy-policy/"],
  ["Terms of Service", "/legal/terms-of-service/"],
  ["Copyright", "/legal/copyright/"],
  ["About Us", "/legal/about-us/"],
  ["Contact Us", "/legal/contact-us/"],
] as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerTop}`}>
        <div className={styles.footerBrand}>
          <Link className={styles.brand} href="/">
            <span className={styles.brandIcon}>
              <Image src="/images/logo.png" alt="" width={48} height={48} />
            </span>
            <span>
              How to <span className={styles.brandGold}>Fish Wiki</span>
            </span>
          </Link>
          <p>Practical English guides for finding creatures, choosing bait, finishing quests, defeating bosses and moving from Lighthouse to Volcano.</p>
        </div>
        <section>
          <h2>Navigate</h2>
          <ul className={styles.footerSmall}>
            {siteConfig.nav.map((item) => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
          </ul>
        </section>
        <section>
          <h2>Legal</h2>
          <ul className={styles.footerSmall}>
            {legalLinks.map(([label, href]) => <li key={href}><Link href={href} rel="noopener noreferrer nofollow">{label}</Link></li>)}
          </ul>
        </section>
      </div>
      <div className={`container ${styles.footerBottom}`}>
        <span>Copyright © {currentYear} {siteConfig.name}. All rights reserved.</span>
        <span>This is an independent fan site and is not affiliated with, endorsed by, or connected to Dazed Games, Steam or Valve.</span>
      </div>
    </footer>
  );
}
