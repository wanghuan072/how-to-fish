import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ui from "@/style/components/ui.module.css";

export type BreadcrumbItem = {
  name: string;
  href: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className={ui.breadcrumb} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={`${item.href}-${index}`}>
          {index > 0 && <ChevronRight size={13} aria-hidden="true" />}
          {index === items.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link href={item.href}>{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
