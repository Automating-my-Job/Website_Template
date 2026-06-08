/**
 * Site footer: brand mark + tagline, the shared NAV_LINKS list, a dynamic
 * copyright year (new Date().getFullYear()), and a mailto link to SITE.email.
 * Server component (no "use client") — purely presentational, content-driven
 * from @/lib/content.
 */

import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-surface-100">
      <div className="container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 rounded" aria-label="OPS GS home">
              <Image src="/logo.png" alt="OPS GS" width={28} height={28} />
              <span className="font-mono text-sm font-medium text-ink">
                OPS<span className="text-accent"> GS</span>
              </span>
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink-quaternary">
              Operational governance and AI-powered automation for executive
              teams.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-tertiary transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-edge pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-quaternary">
            &copy; {new Date().getFullYear()} {SITE.fullName}. All rights
            reserved.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            aria-label={`Send email to ${SITE.email}`}
            className="inline-flex items-center gap-1.5 text-xs text-ink-quaternary transition-colors hover:text-accent"
          >
            <Mail size={12} />
            {SITE.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
