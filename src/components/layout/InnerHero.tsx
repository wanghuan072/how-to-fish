import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import styles from "@/style/components/inner-hero.module.css";

type InnerHeroProps = {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  eyebrow?: string;
  summary?: ReactNode;
};

export function InnerHero({ breadcrumbs, title, description, image, imageAlt = "", eyebrow, summary }: InnerHeroProps) {
  return (
    <header className={styles.hero}>
      <Image className={styles.image} src={image} alt={imageAlt} fill loading="eager" sizes="100vw" />
      <div className={styles.shade} />
      <div className={`container ${styles.inner}`}>
        <Breadcrumb items={breadcrumbs} />
        <div className={styles.copy}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1>{title}</h1>
          <p className={styles.description}>{description}</p>
          {summary ? <div className={styles.summary} aria-label="Page summary">{summary}</div> : null}
        </div>
      </div>
    </header>
  );
}
