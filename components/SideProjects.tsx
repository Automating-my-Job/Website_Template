"use client";

/**
 * SideProjects — "side projects" showcase section (#side-projects anchor).
 *
 * Renders a three-column grid of project cards from SIDE_PROJECTS in
 * lib/content.ts (icon via ICON_MAP, status badge, title, description, and an
 * optional external link). The status badge is styled green for "Live (WIP)"
 * and muted otherwise.
 *
 * Behavior: one section-level useInView ref (fires once) drives the header and
 * each card's fade/rise, with an index-based stagger delay per card.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  Code2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SIDE_PROJECTS } from "@/lib/content";
import { EASE } from "@/lib/motion";

const ICON_MAP: Record<string, LucideIcon> = {
  Search,
  Code2,
  Sparkles,
};


// Status badge color carries meaning and stays legible (tinted background with
// dark, same-family text). Green = live/shipped, blue = open source. Unknown
// statuses fall back to a readable neutral, not the faint quaternary ink.
const STATUS_STYLES: Record<string, string> = {
  "Live (WIP)": "bg-emerald-50 text-emerald-700",
  Production: "bg-emerald-50 text-emerald-700",
  "Open source": "bg-accent-light text-accent",
};
const STATUS_FALLBACK = "bg-surface-200 text-ink-secondary";

export function SideProjects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="side-projects"
      ref={ref}
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">{SIDE_PROJECTS.eyebrow}</span>
          <h2 className="mt-4 text-balance text-display-lg text-ink">
            {SIDE_PROJECTS.headline}
          </h2>
          <p className="mt-4 text-pretty text-ink-secondary">
            {SIDE_PROJECTS.subhead}
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {SIDE_PROJECTS.projects.map((project, i) => {
            // Resolve icon name from content; fall back to Search if unmapped.
            const Icon = ICON_MAP[project.icon] ?? Search;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                className="card-bento flex flex-col gap-4"
              >
                {/* Icon */}
                <div className="grid h-10 w-10 place-items-center rounded-md border border-accent/15 bg-accent-light text-accent">
                  <Icon size={18} strokeWidth={1.75} />
                </div>

                {/* Status badge */}
                <div>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider ${
                      STATUS_STYLES[project.status] ?? STATUS_FALLBACK
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title + description */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium tracking-tight text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-ink-secondary">
                    {project.description}
                  </p>
                </div>

                {/* Link */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-600"
                  >
                    {project.linkLabel} →
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
