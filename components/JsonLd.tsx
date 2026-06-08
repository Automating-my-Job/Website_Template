import { SITE } from "@/lib/content";

/**
 * Site-wide structured data (JSON-LD). A Person node (Tom) and an Organization
 * node (OPS GS LLC) linked by stable @ids, with sameAs pointing at LinkedIn so
 * search engines resolve Tom as a single entity. This drives the knowledge
 * panel for his name and lets the brand get cited by AI answers.
 *
 * Rendered as an inline application/ld+json script, which the CSP allows via
 * script-src 'unsafe-inline'. The /services route adds Service/Offer schema via
 * <ServiceJsonLd /> (below), which references this Organization by @id.
 */
export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: "Tom Romano",
        url: SITE.url,
        jobTitle: "Technical Chief of Staff",
        worksFor: { "@id": `${SITE.url}/#org` },
        sameAs: [SITE.linkedin],
        knowsAbout: [
          "executive reporting automation",
          "strategy and operations",
          "chief of staff",
          "Google Apps Script",
          "Tableau",
          "Aha!",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.fullName,
        url: SITE.url,
        logo: `${SITE.url}/logo.png`,
        founder: { "@id": `${SITE.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

/**
 * /services structured data. A Service node provided by the Organization (linked
 * by @id to the site-wide <JsonLd /> graph) with the free-first-build modeled as
 * an Offer at price 0. This lets search and AI answers describe the commercial
 * offer. Rendered only on app/services/page.tsx, not site-wide.
 *
 * Compliance: describes the independent OPS GS offer only. No employer internals.
 */
export function ServiceJsonLd() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE.url}/services#service`,
    name: "Automated executive reporting",
    serviceType: "Report automation",
    description:
      "OPS GS automates the recurring reports a company rebuilds by hand. It connects to the tools where the data already lives (Tableau, Aha!, Jira, Salesforce, Google Sheets, Excel, or a database), pulls the current numbers, and delivers a board-ready report on a set schedule. Built with Google Apps Script inside the company's own accounts.",
    provider: { "@id": `${SITE.url}/#org` },
    areaServed: "United States",
    url: `${SITE.url}/services`,
    offers: {
      "@type": "Offer",
      name: "First build free",
      description:
        "The first automated report build is free: one report, one source, one cycle.",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/services`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
    />
  );
}
