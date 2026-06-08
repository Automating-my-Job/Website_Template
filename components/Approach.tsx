"use client";

/**
 * Approach — the process/methodology section (#approach anchor).
 *
 * Renders a centered header plus a row of numbered steps from APPROACH in
 * lib/content.ts (each step has number, title, description). A decorative
 * gradient hairline connects the step circles on large screens only.
 *
 * Behavior: one section-level useInView ref (fires once, -100px margin) drives
 * the header and each step's fade/rise, with an index-based stagger delay.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { APPROACH } from "@/lib/content";
import { EASE } from "@/lib/motion";

export function Approach() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="approach"
      ref={ref}
      className="relative scroll-mt-24 bg-surface-100 py-24 md:py-32"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">{APPROACH.eyebrow}</span>
          <h2 className="mt-4 text-balance text-display-lg text-ink">
            {APPROACH.headline}
          </h2>
          <p className="mt-4 text-pretty text-ink-secondary">{APPROACH.subhead}</p>
        </motion.div>

        {/* Steps */}
        <div className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden
            className="absolute left-0 top-[2.25rem] hidden h-px w-full bg-gradient-to-r from-transparent via-edge-strong to-transparent lg:block"
          />

          {APPROACH.steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.15 + i * 0.1,
                ease: EASE,
              }}
              className="relative flex flex-col gap-4"
            >
              {/* Step number circle */}
              <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-edge bg-white shadow-zen">
                <span className="font-mono text-sm font-medium text-accent">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
