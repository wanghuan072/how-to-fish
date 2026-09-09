"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "@/style/components/layout.module.css";

const GlobalSearch = dynamic(
  () => import("@/components/search/GlobalSearch").then((module) => module.GlobalSearch),
  { loading: () => <span role="status" className="sr-only">Loading search…</span> },
);

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const openSearch = () => { setSearchLoaded(true); setSearchOpen(true); };
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0, -1));

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link className={styles.brand} href="/" prefetch={false} onClick={() => setMenuOpen(false)}>
            <span className={styles.brandIcon}>
              <Image src="/images/brand/how-to-fish-game-mark.png" alt="" width={48} height={48} priority />
            </span>
            <span>
              How to <span className={styles.brandGold}>Fish Wiki</span>
            </span>
          </Link>
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`} aria-label="Primary navigation">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`${styles.navLink} ${isActive(item.href) ? styles.navActive : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.actions}>
            <button className={styles.searchButton} onClick={openSearch}>
              <span>Search the wiki...</span>
              <Search size={18} aria-hidden="true" />
            </button>
            <button
              className={`${styles.iconButton} ${styles.mobileSearch}`}
              onClick={openSearch}
              aria-label="Search"
            >
              <Search size={21} aria-hidden="true" />
            </button>
            <button
              className={styles.iconButton}
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      {searchLoaded && <GlobalSearch open={searchOpen} onClose={closeSearch} />}
    </>
  );
}
