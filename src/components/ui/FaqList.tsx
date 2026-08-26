import type { FaqItem } from "@/types/content";
import ui from "@/style/components/ui.module.css";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className={ui.faqList}>
      {items.map((item) => (
        <article className={ui.faq} key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </article>
      ))}
    </div>
  );
}
