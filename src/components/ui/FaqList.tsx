import type { FaqItem } from "@/types/content";
import ui from "@/style/components/ui.module.css";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className={ui.faqList}>
      {items.map((item) => (
        <details className={ui.faq} key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
