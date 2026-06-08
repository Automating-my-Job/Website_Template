"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Honors the user's OS "reduce motion" setting for all framer-motion
 * animations in one place. `reducedMotion="user"` disables transform/layout
 * animations (keeping opacity/colour) ONLY when the user has the setting on —
 * behavior is unchanged for everyone else.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
