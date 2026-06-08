/**
 * Shared utilities.
 * `cn` merges conditional className inputs (clsx) and de-dupes/​resolves
 * conflicting Tailwind classes (tailwind-merge) so the last wins.
 */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
