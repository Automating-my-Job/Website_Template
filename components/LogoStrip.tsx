/**
 * Infinite horizontal marquee of company names (a "trusted by" strip).
 *
 * The list is repeated 6× so the track always overflows the viewport and the
 * CSS `animate-marquee` keyframe (translateX of one rep-width) loops seamlessly —
 * see the inline note below for why 6 reps. The wrapper's `animate-marquee-pause`
 * + `group` pauses the scroll on hover. Server component; data from @/lib/content.
 */

import { LOGO_STRIP } from "@/lib/content";

export function LogoStrip() {
  // 6 reps guarantees the track overflows any desktop viewport.
  // Keyframe scrolls calc(-100%/6) = 1 rep-width → lands on rep 2 which is
  // identical to rep 1, so the loop is seamless at all viewport widths.
  const items = Array(6).fill(null).flatMap(() => LOGO_STRIP.companies);

  return (
    <section
      aria-label={LOGO_STRIP.label}
      className="overflow-hidden border-y border-edge bg-surface-100 py-8"
    >
      <p className="mb-5 text-center font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-quaternary">
        {LOGO_STRIP.label}
      </p>

      {/* Marquee track: pauses on hover */}
      <div className="animate-marquee-pause group w-full overflow-hidden">
        <div
          className="animate-marquee flex w-max gap-16"
          style={{ willChange: "transform" }}
        >
          {items.map((company, i) => (
            <span
              key={i}
              className="flex-shrink-0 select-none font-sans text-xl font-semibold tracking-tight text-ink opacity-20 transition-opacity duration-300 hover:opacity-60"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
