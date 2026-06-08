"use client";

/**
 * About — founder bio section (#about anchor).
 *
 * Two-column layout: left holds eyebrow, headline, subhead, and bio; right
 * holds the headshot, a LinkedIn CTA (SITE.linkedin), and a "Track record"
 * card listing ABOUT.highlights. All copy comes from ABOUT in lib/content.ts.
 *
 * Behavior: one section-level useInView ref (fires once) drives the reveal.
 * The two columns slide in from opposite sides; each highlight <li> then
 * springs in from the right with an index-based stagger delay.
 */
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { ABOUT, SITE } from "@/lib/content";
import { LinkedInIcon } from "@/components/icons";
import { EASE } from "@/lib/motion";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="container">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="eyebrow">{ABOUT.eyebrow}</span>
            <h2 className="mt-4 text-balance text-display-lg text-ink">
              {ABOUT.headline}
            </h2>
            <p className="mt-4 text-pretty text-ink-secondary">{ABOUT.subhead}</p>
            <p className="mt-6 text-pretty leading-relaxed text-ink-secondary">
              {ABOUT.bio}
            </p>
          </motion.div>

          {/* Right: headshot + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="flex flex-col items-center gap-6"
          >
            {/* Headshot */}
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-zenLg ring-1 ring-edge">
              <Image
                src="/headshot.jpg"
                alt="Tom Romano"
                fill
                className="object-cover object-center object-top"
                sizes="192px"
              />
            </div>

            {/* LinkedIn button */}
            {SITE.linkedin && (
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-edge bg-white px-5 py-2 text-sm font-medium text-ink-secondary shadow-zen transition-all hover:border-accent/30 hover:text-accent hover:-translate-y-px"
              >
                <LinkedInIcon size={15} />
                46+ recommendations on LinkedIn
              </a>
            )}

            {/* Track record card */}
            <div className="w-full rounded-2xl border border-edge bg-white p-8 shadow-zenMd">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-quaternary">
                Track record
              </p>
              <ul className="mt-6 flex flex-col gap-5" role="list">
                {ABOUT.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      type: "spring" as const,
                      stiffness: 300,
                      damping: 25,
                      delay: 0.3 + i * 0.08,
                    }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span className="text-sm leading-relaxed text-ink-secondary">
                      {highlight}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
