import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ui from "@/style/components/ui.module.css";

type SectionHeadingProps = {
  number?: number;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
};

export function SectionHeading({
  number,
  title,
  description,
  href,
  linkLabel = "View all",
}: SectionHeadingProps) {
  return (
    <div className={ui.sectionHeading}>
      <div>
        <h2>
          {number ? <span className={ui.number}>{number}</span> : null}
          {title}
        </h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? (
        <Link href={href} className={ui.textLink}>
          {linkLabel} <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
