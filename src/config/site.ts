export const siteConfig = {
  name: "How to Fish Wiki",
  shortName: "HTF Wiki",
  description:
    "Find creatures, bait, quests, bosses, weapons and island routes for Dazed Games' How to Fish on Steam.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://howtofish.org",
  steamUrl: "https://store.steampowered.com/app/4001890/How_to_Fish/",
  steamAchievementsUrl:
    "https://steamcommunity.com/stats/4001890/achievements/?l=english",
  communityDataSource:
    "https://timesofindia.indiatimes.com/sports/esports/news/how-to-fish-list-of-all-fish-how-to-get-them-and-more/articleshow/133438002.cms",
  nav: [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/guides/" },
    { label: "Creatures", href: "/creatures/" },
    { label: "Quests", href: "/quests/" },
    { label: "Bosses", href: "/bosses/" },
    { label: "Islands", href: "/islands/" },
    { label: "Wiki", href: "/wiki/" },
    { label: "Tools", href: "/tools/" },
    { label: "Updates", href: "/updates/" },
  ],
} as const;
