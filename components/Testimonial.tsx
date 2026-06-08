"use client";

/**
 * Testimonial — colleague recommendations section.
 *
 * Splits TESTIMONIALS.items (lib/content.ts) into the single `featured` quote
 * (rendered large up top) and the remaining `secondary` quotes (two-column
 * grid). Each quote renders via the local <QuoteCard>. A LinkedIn CTA at the
 * bottom links to SITE.linkedin recommendations.
 *
 * Behavior: one section-level useInView ref (fires once) drives every card's
 * fade/rise; per-card `delay` props stagger the reveal.
 */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TESTIMONIALS, SITE } from "@/lib/content";
import { LinkedInIcon } from "@/components/icons";
import { EASE } from "@/lib/motion";


function QuoteCard({
  item,
  featured,
  delay,
  isInView,
}: {
  item: (typeof TESTIMONIALS.items)[number];
  featured?: boolean;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={
        featured
          ? "card-feature flex flex-col gap-5"
          : "card-bento flex flex-col gap-4"
      }
    >
      {/* Quote mark */}
      <span
        aria-hidden
        className={
          featured
            ? "font-serif text-5xl leading-none text-accent/40 select-none"
            : "font-serif text-4xl leading-none text-accent/25 select-none"
        }
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p
        className={
          featured
            ? "flex-1 text-base leading-relaxed text-ink"
            : "flex-1 text-sm leading-relaxed text-ink-secondary"
        }
      >
        {item.quote}
      </p>

      {/* Attribution */}
      <div className="flex items-end justify-between gap-4 border-t border-accent/10 pt-4">
        <div>
          <p className={featured ? "font-medium text-ink" : "text-sm font-medium text-ink"}>
            {item.name}
          </p>
          <p className="mt-0.5 text-xs text-ink-tertiary">
            {item.title}, {item.company}
          </p>
          <span className="mt-2 inline-block font-mono text-[0.6rem] uppercase tracking-wider text-ink-quaternary">
            {item.relationship}
          </span>
        </div>
        <p className="shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-ink-quaternary">
          {item.date}
        </p>
      </div>
    </motion.div>
  );
}

export function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Partition content: one featured quote gets prominent placement; the rest
  // fill the secondary grid.
  const featured = TESTIMONIALS.items.find((i) => i.featured);
  const secondary = TESTIMONIALS.items.filter((i) => !i.featured);

  return (
    <section
      ref={ref}
      className="relative scroll-mt-24 py-24 md:py-32"
      aria-label="Colleague recommendations"
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow">{TESTIMONIALS.eyebrow}</span>
          <h2 className="mt-4 text-balance text-display-lg text-ink">
            {TESTIMONIALS.headline}
          </h2>
        </motion.div>

        {/* Featured card */}
        {featured && (
          <div className="mt-12">
            <QuoteCard item={featured} featured delay={0.1} isInView={isInView} />
          </div>
        )}

        {/* Secondary cards */}
        {secondary.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {secondary.map((item, i) => (
              <QuoteCard
                key={item.name}
                item={item}
                delay={0.2 + i * 0.1}
                isInView={isInView}
              />
            ))}
          </div>
        )}

        {/* LinkedIn CTA */}
        {SITE.linkedin && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
            className="mt-10 text-center"
          >
            <a
              href={`${SITE.linkedin}/details/recommendations/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-edge bg-white px-5 py-2 text-sm font-medium text-ink-secondary shadow-zen transition-all hover:border-accent/30 hover:text-accent hover:-translate-y-px"
            >
              <LinkedInIcon size={13} />
              View all 46+ recommendations on LinkedIn
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
