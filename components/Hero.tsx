"use client";

/**
 * Hero — the top-of-page landing section.
 *
 * Renders the eyebrow, gradient headline, subhead, CTAs, a social-proof bar,
 * a faux terminal "proof" line, and a four-up animated stats strip. All copy
 * (headline, subhead, CTAs, terminalStatus, stats) comes from HERO in
 * lib/content.ts; the LinkedIn CTA reads SITE.linkedin.
 *
 * Behaviors:
 * - Entrance uses a parent `container`/child `item` stagger; the section runs
 *   it on mount (initial="hidden" animate="show"), not on scroll.
 * - useScroll/useTransform drive a subtle parallax on the dot-grid backdrop.
 * - Stats use <Counter>, which counts up only once when scrolled into view.
 * - Primary/secondary CTAs are wrapped in <MagneticLink> for a cursor-follow
 *   hover effect.
 */
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
  useInView,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { HERO, SITE } from "@/lib/content";
import { EASE } from "@/lib/motion";

/* ─── Animated counter that counts up from 0 on scroll entry ─── */
function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const el = ref.current;
    el.textContent = prefix + "0" + suffix;
    // Tween 0 → value, writing directly to textContent each frame. Integers
    // render rounded; non-integers keep one decimal place.
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate(v) {
        el.textContent = prefix + (Number.isInteger(value) ? String(Math.round(v)) : v.toFixed(1)) + suffix;
      },
    });
    return () => controls.stop();
  }, [isInView, value, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ─── Magnetic wrapper that shifts slightly toward the cursor ─── */
function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring-smooth the raw offset so the element eases toward/back from cursor.
  const sx = useSpring(x, { stiffness: 280, damping: 18 });
  const sy = useSpring(y, { stiffness: 280, damping: 18 });

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    // Offset = distance from element center to cursor, dampened to 35%.
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.a>
  );
}

/* ─── Stagger variants ─── */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};


const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const socialProof = [
  { label: "Equifax USIS", detail: "$1.9B segment" },
  { label: "HP Print", detail: "$18.9B division" },
  { label: "13+ years", detail: "exec partnerships" },
];

export function Hero() {
  const { scrollY } = useScroll();
  // Parallax: dot-grid drifts 0 → 24px as the page scrolls its first 600px.
  const backdropY = useTransform(scrollY, [0, 600], [0, 24]);

  return (
    <section className="relative isolate overflow-hidden bg-surface pb-24 pt-28 md:pb-32 md:pt-40">
      {/* Dot-grid pattern */}
      <motion.div
        className="absolute inset-0 -z-10 dot-grid"
        style={{ y: backdropY }}
        aria-hidden
      />

      {/* Floating blue radial blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-1/2 top-0 -translate-x-1/2 h-[600px] w-[600px] animate-float rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 50%, transparent 70%)",
        }}
      />

      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Eyebrow */}
          <motion.div variants={item} className="flex justify-center">
            <span className="eyebrow">{HERO.eyebrow}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mt-6 text-balance text-display-2xl text-ink"
          >
            {HERO.headline[0]}
            <br />
            <span className="text-gradient">{HERO.headline[1]}</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-secondary md:text-xl"
          >
            {HERO.subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <MagneticLink href={HERO.cta.primary.href} className="btn-primary group">
              {HERO.cta.primary.label}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </MagneticLink>
            <MagneticLink href={HERO.cta.secondary.href} className="btn-ghost">
              {HERO.cta.secondary.label}
            </MagneticLink>
            {SITE.linkedin && (
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="btn-ghost inline-flex items-center gap-2"
              >
                <LinkedInIcon size={16} />
                LinkedIn
              </a>
            )}
          </motion.div>

          {/* Social proof bar */}
          <motion.div
            variants={item}
            className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {socialProof.map((item, i) => (
              <span key={item.label} className="flex items-center gap-4">
                <span className="text-sm text-ink-tertiary">
                  <span className="font-medium text-ink-secondary">{item.label}</span>
                  {" · "}
                  {item.detail}
                </span>
                {i < socialProof.length - 1 && (
                  <span
                    aria-hidden
                    className="h-3.5 w-px bg-edge-strong"
                  />
                )}
              </span>
            ))}
          </motion.div>

          {/* Terminal proof line */}
          <motion.div
            variants={item}
            className="mx-auto mt-12 inline-flex max-w-fit items-center gap-3 rounded-lg border border-edge bg-white px-4 py-2.5 shadow-zen"
          >
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-soft" aria-hidden />
            <code className="font-mono text-xs text-ink-tertiary">
              <span className="text-ink-quaternary">$</span>{" "}
              <span className="text-ink-secondary">opsgs</span>{" "}
              <span className="text-accent">deploy</span>{" "}
              <span className="text-ink-quaternary">--accountability</span>{" "}
              <span className="text-ink-quaternary">--realtime</span>
            </code>
            <span className="h-3 w-px bg-edge-strong" />
            <span className="font-mono text-xs text-accent">
              {HERO.terminalStatus}
            </span>
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
          className="mt-20 grid grid-cols-2 overflow-hidden rounded-2xl border border-edge bg-edge md:mt-28 md:grid-cols-4"
        >
          {HERO.stats.map((s) => (
            <div key={s.label} className="bg-white p-6 md:p-8">
              <div className="font-mono text-3xl tracking-tight text-ink md:text-4xl">
                <Counter
                  value={s.value}
                  prefix={"prefix" in s ? s.prefix : ""}
                  suffix={s.suffix}
                />
              </div>
              <div className="mt-2 text-sm text-ink-tertiary">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
