/**
 * Home (`/`) — the two-door fork. A short lobby: brand line, then a hire door
 * (-> /work) and a contract door (-> /services), with the career marquee below
 * as shared proof. Copy lives in HOME (lib/content.ts).
 */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoStrip } from "@/components/LogoStrip";
import { HOME } from "@/lib/content";

export const metadata = {
  title: "Tom Romano and OPS GS",
  description:
    "Tom Romano builds the systems that run executive teams. OPS GS automates the reporting behind the work.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="container flex min-h-[78vh] flex-col items-center justify-center py-28 text-center">
          <span className="eyebrow">{HOME.eyebrow}</span>
          <h1 className="mt-6 max-w-3xl text-balance text-display-lg text-ink">
            {HOME.tagline}
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-ink-secondary">{HOME.intro}</p>

          <div className="mt-12 grid w-full max-w-3xl gap-4 md:grid-cols-2">
            {HOME.doors.map((d) => (
              <Link
                key={d.href}
                href={d.href}
                className="card-bento group flex flex-col items-start gap-3 p-8 text-left"
              >
                <span className="eyebrow">{d.eyebrow}</span>
                <h2 className="text-2xl font-medium tracking-tight text-ink">{d.title}</h2>
                <p className="text-pretty text-ink-secondary">{d.body}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all group-hover:gap-2.5">
                  {d.cta}
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LogoStrip />
    </>
  );
}
