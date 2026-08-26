import Link from "next/link";
import styles from "@/style/page/wiki.module.css";

export default function NotFound() {
  return <main id="main-content"><header className={styles.hero}><div className="container"><h1>That catch got away</h1><p>This page is unavailable or the route has moved.</p></div></header><section className={styles.paper}><div className={styles.section}><h2>Choose another route</h2><p><Link className={styles.link} href="/creatures/">Creatures</Link> · <Link className={styles.link} href="/guides/">Guides</Link> · <Link className={styles.link} href="/">Home</Link></p></div></section></main>;
}
