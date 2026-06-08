"use client";

/**
 * Fixed top navigation, route-based across the multi-page site.
 *
 * - Scroll listener toggles `scrolled` past 20px to swap from transparent to the
 *   frosted `glass-nav` style.
 * - The active link is derived from the current pathname; the shared
 *   layoutId="nav-pill" motion.span animates the highlight between Work and Services.
 * - The CTA is page-aware: "Send me a report" on /services, "Get in touch" elsewhere.
 * - Mobile menu (`mobileOpen`) is an AnimatePresence reveal; it closes on route change.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/content";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle frosted-glass bar past 20px; run once on mount to set initial state.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // Page-aware CTA: services asks for a report (in-page anchor); /work invites
  // contact (in-page anchor); everywhere else (home, 404) sends to the services
  // intake form, the primary lead path.
  const cta =
    pathname === "/services"
      ? { label: "Send me a report", href: "#contact" }
      : pathname.startsWith("/work")
        ? { label: "Get in touch", href: "#contact" }
        : { label: "Get in touch", href: "/services#contact" };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav" : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between" aria-label="Main navigation">
        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 rounded" aria-label="OPS GS home">
          <Image src="/logo.png" alt="" width={32} height={32} priority />
          <span className="font-mono text-sm font-medium text-ink">
            OPS<span className="text-accent"> GS</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-sm transition-colors",
                    active ? "text-ink" : "text-ink-tertiary hover:text-ink"
                  )}
                >
                  {/* Shared layoutId lets the pill slide between active links. */}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-md bg-surface-100"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA (page-aware) */}
        <Link
          href={cta.href}
          className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-600 md:inline-flex"
        >
          {cta.label}
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="grid h-9 w-9 place-items-center rounded-md text-ink-tertiary transition-colors hover:text-ink md:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden border-b border-edge bg-white/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-ink-tertiary transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href={cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-full bg-accent px-3 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-accent-600"
                >
                  {cta.label}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
