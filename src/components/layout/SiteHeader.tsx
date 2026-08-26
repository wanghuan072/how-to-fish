"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { GlobalSearch } from "@/components/search/GlobalSearch";
import type { SearchItem } from "@/types/content";
import styles from "@/style/components/layout.module.css";

export function SiteHeader({ searchItems }: { searchItems: SearchItem[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.slice(0, -1));

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link className={styles.brand} href="/" onClick={() => setMenuOpen(false)}>
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
                className={`${styles.navLink} ${isActive(item.href) ? styles.navActive : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.actions}>
            <button className={styles.searchButton} onClick={() => setSearchOpen(true)}>
              <span>Search the wiki...</span>
              <Search size={18} aria-hidden="true" />
            </button>
            <button
              className={`${styles.iconButton} ${styles.mobileSearch}`}
              onClick={() => setSearchOpen(true)}
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
      <GlobalSearch items={searchItems} open={searchOpen} onClose={closeSearch} />
    </>
  );
}
