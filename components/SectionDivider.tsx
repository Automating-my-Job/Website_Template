/**
 * SectionDivider — the subtle gradient hairline that paces sections.
 * Shared by /work and /services so the rhythm is defined in one place.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="container my-2 h-px bg-gradient-to-r from-transparent via-edge to-transparent"
    />
  );
}
