import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/**
 * robots.txt (Next metadata route). Allows all crawlers, keeps the contact API
 * out of the index, and points crawlers at the sitemap. SITE.url is the
 * canonical www host.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
