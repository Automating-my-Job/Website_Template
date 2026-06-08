"use client";

/**
 * CaseStudy — single highlighted case-study card (#case-study anchor).
 *
 * Two-column feature card: left holds eyebrow/company tag, headline, and a
 * checklist of outcomes; right holds the headline result stat. All copy comes
 * from CASE_STUDY in lib/content.ts.
 *
 * Behavior: one section-level useInView ref (fires once) gates every animation.
 * The card fades/rises in, and each outcome <li> slides in from the left with
 * an index-based stagger delay.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CASE_STUDY } from "@/lib/content";
import { EASE } from "@/lib/motion";

export function CaseStudy() {
  const ref = useRef<HTMLElement>(null);
  // Single shared trigger: -80px margin starts the reveal slightly before the
  // section is fully on screen; `once` keeps it from replaying.
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="case-study"
      ref={ref}
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="card-feature p-8 md:p-12"
        >
          {/* Corner accent blob */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-accent/[0.07] blur-3xl"
          />

          <div className="grid gap-12 lg:grid-cols-[1fr_auto]">
            {/* Left: eyebrow, headline, outcomes */}
            <div>
              <div className="flex items-center gap-3">
                <span className="eyebrow">{CASE_STUDY.eyebrow}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-quaternary">
                  {CASE_STUDY.company}
                </span>
              </div>

              <h2 className="mt-4 max-w-2xl text-balance text-display-lg text-ink">
                {CASE_STUDY.headline}
              </h2>

              <ul className="mt-8 flex flex-col gap-4" role="list">
                {CASE_STUDY.outcomes.map((outcome, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.1,
                      ease: EASE,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span className="text-ink-secondary">{outcome}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: result stat */}
            <div className="flex flex-col justify-center lg:items-end">
              <div className="rounded-xl border border-accent/20 bg-accent-light p-6 text-center lg:min-w-[180px]">
                <div className="font-mono text-5xl font-medium tracking-tight text-ink md:text-6xl">
                  {CASE_STUDY.stat.value}
                </div>
                <div className="mt-2 text-sm text-ink-tertiary">
                  {CASE_STUDY.stat.label}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom hairline */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
