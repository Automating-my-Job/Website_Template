"use client";

/**
 * BentoGrid — the "Services" section (#services anchor).
 *
 * Renders a bento-style grid of service cards from SERVICES in lib/content.ts.
 * Each entry supplies icon (resolved via ICON_MAP), tag, title, blurb, an
 * optional `feature` flag (larger styling + accent blob), and a `span` class
 * controlling its grid footprint.
 *
 * Behavior: cards animate in on scroll via whileInView with a per-card stagger
 * (custom index → cardMotion delay), each firing once.
 */
import { motion } from "framer-motion";
import {
  Activity,
  Bot,
  Rocket,
  ClipboardList,
  Workflow,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/content";

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Bot,
  Rocket,
  ClipboardList,
  Workflow,
  LineChart,
};

// Spring entrance; `show` is a custom() function so each card's delay is
// derived from its index for a staggered reveal.
const cardMotion = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
      mass: 0.8,
      delay: i * 0.07,
    },
  }),
};

export function BentoGrid() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="container">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Services</span>
          <h2 className="mt-4 text-balance text-display-lg text-ink">
            Six systems we build for executive teams.
          </h2>
          <p className="mt-4 text-pretty text-ink-secondary">
            Each is a real artifact (code, calendar, or governance) that
            outlives the engagement.
          </p>
        </div>

        {/* Bento grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:auto-rows-[16rem] md:grid-cols-4">
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon];
            return (
              <motion.div
                key={s.title}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardMotion}
                className={cn(
                  s.feature ? "card-feature" : "card-bento",
                  "group flex flex-col justify-between",
                  s.span
                )}
              >
                {/* Feature card accent blob */}
                {s.feature && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.06] blur-3xl"
                  />
                )}

                <div className="flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-md border border-accent/15 bg-accent-light text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/[0.12]">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-quaternary">
                    {s.tag}
                  </span>
                </div>

                <div>
                  <h3
                    className={cn(
                      "tracking-tight text-ink",
                      s.feature ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                    )}
                    style={{ fontWeight: 500, letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-pretty text-ink-secondary",
                      s.feature ? "max-w-md text-base" : "text-base"
                    )}
                  >
                    {s.blurb}
                  </p>
                </div>

                {/* Bottom hairline on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
