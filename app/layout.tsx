/**
 * Root app shell (App Router).
 * - Exports `metadata` for SEO/social (title, description, canonical, OpenGraph, Twitter, icons, robots).
 * - Renders site-wide JSON-LD structured data (Person + Organization) via <JsonLd />.
 * - Wires up Geist sans/mono fonts via CSS variables on <html>.
 * - Wraps all pages in <MotionProvider> (framer-motion context for scroll/entrance animations).
 * - Provides an accessible "Skip to content" link targeting <main id="main">.
 * - Renders chrome shared across pages: ProgressBar, Navbar, Footer, BackToTop.
 * - Mounts Vercel <Analytics />.
 */
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProgressBar } from "@/components/ProgressBar";
import { BackToTop } from "@/components/BackToTop";
import { MotionProvider } from "@/components/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE.name}: ${SITE.tagline}`,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
    type: "website",
    url: SITE.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}: ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        "font-sans"
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-surface text-ink antialiased">
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-white focus:shadow-accent-glow"
        >
          Skip to content
        </a>

        <MotionProvider>
          <ProgressBar />
          <Navbar />

          <main id="main" className="relative">
            {children}
          </main>

          <Footer />
          <BackToTop />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
