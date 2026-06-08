import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/**
 * sitemap.xml (Next metadata route). Lists the canonical, indexable routes:
 * the home fork (/), the /work portfolio, and the /services offer.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
