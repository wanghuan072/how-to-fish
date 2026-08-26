import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/seo/schema";
import { pageTdk } from "@/seo/tdk";
import styles from "@/style/page/wiki.module.css";

type LegalKey = "about" | "contact" | "privacy" | "terms" | "copyright";

type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] };

const content: Record<LegalKey, { title: string; description: string; path: string; tdk: keyof typeof pageTdk; sections: LegalSection[] }> = {
  about: { title: "About Us", description: "How this independent How to Fish player guide is built, maintained and connected around the decisions players make in the game.", path: "/legal/about-us/", tdk: "aboutUs", sections: [
    { title: "Why this site exists", paragraphs: ["How to Fish gives players a fishing rod, a boat and a deliberately unpredictable physics sandbox. The difficult part is often not controlling the rod; it is remembering which lure catches a target, which body or item must be carried back, and which hand-in opens the next island. This fan guide keeps those decisions together in one route."] },
    { title: "What we cover", paragraphs: ["The site connects fish and other creatures with their islands, rods and bait. Quest pages show objectives and required items, boss pages explain triggers before tactics, and island pages place NPCs, shops, weapons and progression in travel order. The Wiki adds item, bait, weapon, rod and achievement references."], bullets: ["Beginner guidance and a complete story walkthrough", "Creature locations, fishing setups and observed sell values", "Quest, boss and island progression with internal links", "Weapons, items, bait, NPCs, rods and achievements"] },
    { title: "Editorial approach", paragraphs: ["Pages are written for the question a player is likely to ask at that point in the route. We avoid inventing drop rates, exact coordinates or hidden rules that the game does not expose. When a patch changes a route, the related page can be revised without rewriting unrelated entries." ] },
    { title: "Independence", paragraphs: ["How to Fish Wiki is an independent fan site. It is not affiliated with, endorsed by, sponsored by or connected to Dazed Games, Steam or Valve. Game names and media remain the property of their respective owners."] },
  ] },
  contact: { title: "Contact Us", description: "How to send a correction, technical question or rights concern to the team maintaining this independent How to Fish player guide.", path: "/legal/contact-us/", tdk: "contactUs", sections: [
    { title: "Email", paragraphs: ["Send questions and corrections to wyong@howtofish.org. There is no contact form and the site will not ask you to create an account before contacting us."] },
    { title: "Gameplay corrections", paragraphs: ["For the fastest review, name the affected page and describe what happened in your current game build. Include the island, active quest, rod, lure or item involved and the result you observed. A short sequence of reproducible steps is more useful than a general statement that a page is wrong."], bullets: ["The exact page URL", "Your game version or patch date", "The steps you followed and the result", "A screenshot only when it helps identify the issue"] },
    { title: "Technical issues", paragraphs: ["If a page does not load, a link points to the wrong destination or an image is missing, include the page address, device type and browser name. Do not send passwords, payment information or other sensitive personal data."] },
    { title: "Rights and attribution", paragraphs: ["For a copyright, trademark or attribution concern, identify the specific image or passage, explain your relationship to the work and provide a reliable way to verify the claim. We will review clear notices and make reasonable corrections where appropriate."] },
  ] },
  privacy: { title: "Privacy Policy", description: "How this independent How to Fish guide handles basic technical information, emails, cookies, links and future changes to its privacy practices.", path: "/legal/privacy-policy/", tdk: "privacyPolicy", sections: [
    { title: "Information collected when you browse", paragraphs: ["You can read the site without creating an account or submitting a profile. The hosting provider may record standard request information such as an IP address, browser type, requested URL, timestamp and error status. These logs are used for security, availability and troubleshooting rather than to build a player profile."] },
    { title: "Cookies and local storage", paragraphs: ["The current guide does not require advertising cookies or a user account. Essential hosting or security services may use limited technical storage when needed to deliver the site. If analytics, advertising or optional personalization tools are introduced, this policy and any required consent controls will be updated before those tools are enabled."] },
    { title: "Email messages", paragraphs: ["When you email wyong@howtofish.org, we receive the address you use and the information you choose to include. Messages may be kept long enough to answer the request, verify a correction, address abuse or maintain a record of a rights concern. Do not include sensitive personal information."] },
    { title: "External links", paragraphs: ["The site may link to Steam or other third-party pages. Those services have their own privacy practices, and this policy does not control how an external service collects or uses information after you leave howtofish.org."] },
    { title: "Retention, security and changes", paragraphs: ["Technical logs and correspondence are kept only as long as reasonably needed for their stated purpose, legal obligations or site security. No internet service can guarantee absolute security. Material policy changes will be published on this page with an updated revision date."] },
  ] },
  terms: { title: "Terms of Service", description: "The conditions for using How to Fish Wiki, including guide accuracy, acceptable use, intellectual property, links and service availability.", path: "/legal/terms-of-service/", tdk: "termsOfService", sections: [
    { title: "Acceptance and purpose", paragraphs: ["By using howtofish.org, you agree to these terms. The site provides independent editorial information about How to Fish for personal, non-commercial gameplay reference. If you do not agree, you should stop using the site."] },
    { title: "Guide accuracy", paragraphs: ["Game updates, random physics and different quest states can change what a player observes. We aim to keep routes useful, but no page guarantees that a price, spawn, tactic or objective will behave identically in every version or session. Check your current build and use your own judgment before spending a limited item."] },
    { title: "Acceptable use", paragraphs: ["You may read, link to and quote short portions of the site with appropriate attribution. You may not disrupt the service, bypass security measures, scrape it at a rate that harms availability, impersonate the site, or republish substantial original text as your own."] },
    { title: "Intellectual property", paragraphs: ["Original guide writing, page organization and fan-site presentation are protected by applicable law. How to Fish, Steam, game screenshots, artwork, names and related marks belong to their respective owners. Their appearance here does not transfer ownership or imply endorsement."] },
    { title: "Third-party links and availability", paragraphs: ["Links to third-party services are provided for convenience. We do not control their content, terms or availability. The site may be corrected, reorganized, suspended or discontinued without guaranteeing uninterrupted access."] },
    { title: "Disclaimer and revisions", paragraphs: ["The site is provided on an as-available basis without warranties to the extent permitted by law. These terms may be revised when site features, legal requirements or publishing practices change. Continued use after a revision means you accept the updated terms."] },
  ] },
  copyright: { title: "Copyright", description: "Copyright, trademark and asset-use information for the independent How to Fish Wiki, plus instructions for submitting a rights concern.", path: "/legal/copyright/", tdk: "copyright", sections: [
    { title: "Game names and media", paragraphs: ["How to Fish, related game artwork, screenshots, characters, logos and other game assets belong to Dazed Games or the applicable rights holder. Steam names, marks and platform materials belong to Valve or their respective owners. They are referenced for identification, commentary and player education."] },
    { title: "Original site content", paragraphs: ["Unless otherwise stated, the site's original prose, information architecture, page layouts and custom fan-site graphics are created for howtofish.org. Permission is not granted to copy entire guides, mirror the site or remove attribution from original work."] },
    { title: "Fair and editorial use", paragraphs: ["Limited game media may appear to illustrate a location, creature, item or mechanic discussed on the same page. Use is contextual and does not claim ownership of the underlying game. The site is non-official and does not imply approval by the developer or platform owner."] },
    { title: "Reporting a concern", paragraphs: ["Send a clear notice to wyong@howtofish.org. Identify the work, the exact page or asset at issue, the rights holder, your authority to act and a reliable contact method. Good-faith notices will be reviewed, and material may be corrected, credited, replaced or removed when appropriate."] },
  ] },
};

export function LegalPage({ page }: { page: LegalKey }) {
  const entry = content[page];
  const tdk = pageTdk[entry.tdk];
  const breadcrumbs = [{ name: "Home", href: "/" }, { name: "Legal", href: "/legal/about-us/" }, { name: entry.title, href: entry.path }];
  return (
    <main id="main-content">
      <JsonLd data={[breadcrumbSchema(breadcrumbs), webPageSchema(tdk)]} />
      <InnerHero
        breadcrumbs={breadcrumbs}
        eyebrow="Site information"
        title={entry.title}
        description={entry.description}
        image="/images/official/gameplay-05.jpg"
      />
      <article className={styles.paper}>
        {entry.sections.map((section) => <section className={styles.section} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}
        <section className={styles.section}><h2>Contact</h2><p>Questions about this page can be sent to <a className={styles.link} href="mailto:wyong@howtofish.org" rel="noopener noreferrer nofollow">wyong@howtofish.org</a>.</p><p>Last updated: August 25, 2026.</p></section>
      </article>
    </main>
  );
}
