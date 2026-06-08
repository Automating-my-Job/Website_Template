"use client";

/**
 * Floating "scroll to top" button. A passive scroll listener toggles `visible`
 * once the page is scrolled past 600px; AnimatePresence fades/scales the button
 * in and out. Clicking smooth-scrolls back to the top.
 *
 * State: `visible` (gated by the 600px scroll threshold).
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  // Show the button only after scrolling past 600px.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="fixed bottom-8 right-8 z-50 grid h-10 w-10 place-items-center rounded-full border border-edge bg-white text-ink-tertiary shadow-zenMd transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
