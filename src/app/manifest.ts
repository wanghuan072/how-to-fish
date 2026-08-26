import type { MetadataRoute } from "next";
import { pageTdk } from "@/seo/tdk";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "How to Fish Wiki",
    short_name: "HTF Wiki",
    description: pageTdk.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#031c31",
    theme_color: "#031c31",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
