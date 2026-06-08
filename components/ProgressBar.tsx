"use client";

/**
 * Thin reading-progress bar pinned to the top of the page. Binds framer-motion's
 * `scrollYProgress` (0→1 of total page scroll) directly to the element's
 * horizontal scale; `origin-left` makes it grow rightward as you scroll.
 */

import { useScroll, motion } from "framer-motion";

export function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    // scaleX is driven by scroll progress (0–1); origin-left anchors the growth.
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
