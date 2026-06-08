import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/**
 * Web app manifest (Next metadata route). Provides the install/branding
 * metadata for browsers and adds the PWA icon set. Colors match the site
 * tokens: surface background, accent theme.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.fullName,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#2563EB",
    icons: [
      { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
