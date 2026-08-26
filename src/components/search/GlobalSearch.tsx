"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Fish, Search, X } from "lucide-react";
import type { SearchItem } from "@/types/content";
import styles from "@/style/components/layout.module.css";

type GlobalSearchProps = {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
};

export function GlobalSearch({ items, open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items.slice(0, 8);
    return items
      .filter((item) =>
        `${item.title} ${item.type} ${item.description}`.toLowerCase().includes(needle),
      )
      .slice(0, 12);
  }, [items, query]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      returnFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <section
        ref={dialogRef}
        className={styles.searchPanel}
        role="dialog"
        aria-modal="true"
        aria-label="Search the How to Fish wiki"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.searchBox}>
          <Search size={21} aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.searchInput}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fish, guides, bosses, bait..."
            aria-label="Search"
          />
          <button className={styles.closeSearch} onClick={onClose} aria-label="Close search">
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className={styles.results} aria-live="polite">
          {results.length ? (
            results.map((item) => (
              <Link className={styles.result} href={item.href} key={`${item.type}-${item.href}`} onClick={onClose}>
                <span className={styles.resultIcon}>
                  <Fish size={19} aria-hidden="true" />
                </span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>
                <span className={styles.resultType}>{item.type}</span>
                <ArrowRight className="sr-only" size={16} aria-hidden="true" />
              </Link>
            ))
          ) : (
            <p className={styles.empty}>No result yet. Try a fish, island, boss or lure name.</p>
          )}
        </div>
      </section>
    </div>
  );
}
