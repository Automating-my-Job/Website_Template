/**
 * /services — the OPS GS automated-reporting offer (for people who might
 * contract the service). Voice: "we" for the studio, "I" only on the free-build
 * and the data/NDA lines. Copy lives in SERVICE (lib/content.ts).
 *
 * Section order answers the buyer's questions in sequence: what is this (hero),
 * what do I get (before/after demo), is it for me (offer), what do I do (how),
 * how is it possible without IT work (simple + connects), the technical aside
 * (tech), who am I dealing with (proof), is it safe (trust + NDA), what's the
 * catch (free), then the form.
 *
 * Layout system mirrors /work for consistency (we do not change /work itself):
 *   - one rhythm: every section py-24 md:py-32, paced by <SectionDivider/>
 *   - centered headers (mx-auto max-w-2xl text-center) so single-column content
 *     is balanced, never a narrow box stranded in a wide gutter
 *   - "how it works" reuses the /work Approach pattern (tinted band, numbered
 *     circle steps, connecting line); trust reuses the CaseStudy checklist
 *   - type scale by role (display-lg section titles, text-xl card titles,
 *     text-lg lead, text-sm meta) and 8pt spacing (mt-6 / mt-4 / gap-6 / gap-12)
 */
import Link from "next/link";
import Image from "next/image";
import { Send, ArrowUpRight, Download, CheckCircle2 } from "lucide-react";
import { Contact } from "@/components/Contact";
import { ServiceJsonLd } from "@/components/JsonLd";
import { SectionDivider } from "@/components/SectionDivider";
import { SERVICE } from "@/lib/content";

export const metadata = {
  title: "Automated executive reports | OPS GS",
  description:
    "OPS GS automates the report you rebuild by hand. We connect to Tableau, Aha!, databases, and APIs, and deliver board-ready reports on a schedule. The first build is free.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServiceJsonLd />
      {/* Hero (mirrors the /work hero: eyebrow pill, two-line gradient headline, dot-grid) */}
      <section className="relative isolate scroll-mt-24 overflow-hidden pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="absolute inset-0 -z-10 dot-grid" aria-hidden />
        <div className="container max-w-3xl text-center">
          <span className="eyebrow">{SERVICE.hero.eyebrow}</span>
          <h1 className="mt-6 text-balance text-display-2xl text-ink">
            {SERVICE.hero.headline[0]}
            <br />
            <span className="text-gradient">{SERVICE.hero.headline[1]}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-xl font-medium text-ink">
            {SERVICE.hero.tagline}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-ink-secondary">
            {SERVICE.hero.subhead}
          </p>
          <div className="mt-8">
            <Link href={SERVICE.hero.cta.href} className="btn-primary justify-center">
              {SERVICE.hero.cta.label}
              <Send size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Before / after: the spreadsheet you maintain vs the report it becomes */}
      <section className="pb-4">
        <div className="container">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            <figure className="card-bento p-0">
              <Image
                src={SERVICE.demo.before.src}
                alt={SERVICE.demo.before.alt}
                width={1594}
                height={884}
                className="aspect-video w-full border-b border-edge object-cover object-left"
              />
              <figcaption className="px-5 py-3 text-sm text-ink-tertiary">
                {SERVICE.demo.before.label}
              </figcaption>
            </figure>
            <figure className="card-feature p-0">
              <Image
                src={SERVICE.demo.after.src}
                alt={SERVICE.demo.after.alt}
                width={1700}
                height={957}
                className="aspect-video w-full border-b border-accent/15 object-cover"
              />
              <figcaption className="px-5 py-3 text-sm text-ink-secondary">
                {SERVICE.demo.after.label}
              </figcaption>
            </figure>
          </div>

          <p className="mt-5 text-center text-sm text-ink-secondary">
            {SERVICE.demo.caption}{" "}
            <a
              href={SERVICE.demo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-600"
            >
              {SERVICE.demo.linkLabel}
              <ArrowUpRight size={14} />
            </a>
          </p>

          {/* Downloadable sample artifacts (the same workbook and report) */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            <span className="text-ink-quaternary">{SERVICE.demo.downloadsLabel}</span>
            {SERVICE.demo.downloads.map((dl) => (
              <a
                key={dl.href}
                href={dl.href}
                download
                className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-600"
              >
                <Download size={14} />
                {dl.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Below the demo: 4 consolidated sections (war-room grouping) to
           tighten scroll, mirroring /work's rhythm and patterns. Blocks are
           grouped inside shared sections (no copy/order changes). ---- */}

      <SectionDivider />

      {/* A) Offer + How it works — "is this real, and what do I do?"
          One tinted band (mirrors the /work Approach surface): the offer
          statement, then the numbered circle steps. */}
      <section className="bg-surface-100 py-24 md:py-32">
        <div className="container">
          {/* Offer */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-display-lg text-ink">{SERVICE.offer.headline}</h2>
            <p className="mt-6 text-pretty text-lg text-ink-secondary">{SERVICE.offer.body}</p>
          </div>
          {/* How it works */}
          <div className="mx-auto mt-20 max-w-2xl text-center">
            <span className="eyebrow">{SERVICE.how.eyebrow}</span>
            <h2 className="mt-4 text-balance text-display-lg text-ink">{SERVICE.how.headline}</h2>
          </div>
          <div className="relative mt-16 grid gap-6 md:grid-cols-3">
            {/* Connecting line (desktop only) */}
            <div
              aria-hidden
              className="absolute left-0 top-[2.25rem] hidden h-px w-full bg-gradient-to-r from-transparent via-edge-strong to-transparent lg:block"
            />
            {SERVICE.how.steps.map((step) => (
              <div key={step.number} className="relative flex flex-col gap-4">
                <div className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-edge bg-white shadow-zen">
                  <span className="font-mono text-sm font-medium text-accent">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* B) No IT project + connects + under the hood — "will this disrupt my
          stack, and how is it possible?" The signature asymmetric row, then the
          technical aside (now a full section heading, display-lg, per request). */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 className="text-balance text-display-lg text-ink">{SERVICE.simple.headline}</h2>
              <p className="mt-6 text-pretty text-lg text-ink-secondary">{SERVICE.simple.body}</p>
            </div>
            <div className="card-feature p-8 md:p-10">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent">
                {SERVICE.connects.label}
              </p>
              <p className="mt-2 text-sm text-ink-secondary">{SERVICE.connects.caption}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {SERVICE.connects.sources.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full border border-accent/15 bg-white/70 px-3 py-1 text-sm text-ink"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Under the hood — same heading size as the other sections now */}
          <div className="mx-auto mt-20 max-w-3xl rounded-cardLg border border-edge bg-surface-100/60 p-8 text-center md:p-10">
            <span className="eyebrow">{SERVICE.tech.eyebrow}</span>
            <h2 className="mt-4 text-balance text-display-lg text-ink">{SERVICE.tech.headline}</h2>
            <p className="mt-6 text-pretty text-lg text-ink-secondary">{SERVICE.tech.body}</p>
            <p className="mt-3 text-sm text-ink-tertiary">{SERVICE.tech.note}</p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* C) Proof + Trust — "who am I trusting, and is my data safe?"
          Credibility statement, then the data/NDA assurance cards. */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{SERVICE.proof.eyebrow}</span>
            <h2 className="mt-4 text-balance text-display-lg text-ink">{SERVICE.proof.headline}</h2>
            <p className="mt-6 text-pretty text-lg text-ink-secondary">{SERVICE.proof.body}</p>
            <p className="mt-4 text-sm text-ink-tertiary">{SERVICE.proof.note}</p>
          </div>

          <div className="mx-auto mt-20 max-w-2xl text-center">
            <h2 className="text-balance text-display-lg text-ink">{SERVICE.trust.headline}</h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {SERVICE.trust.lines.map((line, i) => (
              <div key={i} className="card-bento flex flex-col gap-4 p-8">
                <CheckCircle2 size={20} className="text-accent" aria-hidden />
                <p className="text-pretty text-ink-secondary">{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Free build: the tinted climax, centered, with a CTA into the form */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-cardLg border border-accent/20 bg-accent-light p-10 text-center md:p-14">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/[0.08] blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <h2 className="text-balance text-display-lg text-ink">{SERVICE.free.headline}</h2>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink-secondary">
                {SERVICE.free.body}
              </p>
              <div className="mt-8">
                <Link href={SERVICE.hero.cta.href} className="btn-primary justify-center">
                  {SERVICE.hero.cta.label}
                  <Send size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Intake form */}
      <Contact content={SERVICE.contact} showLinkedIn={false} />
    </>
  );
}
