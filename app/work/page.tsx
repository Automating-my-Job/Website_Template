/**
 * /work — the portfolio page (for people who might hire Tom). Composes the full
 * set of portfolio sections in render order. Chrome (Navbar, Footer) lives in
 * app/layout.tsx. Voice: first person "I".
 */
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { BentoGrid } from "@/components/BentoGrid";
import { CaseStudy } from "@/components/CaseStudy";
import { Testimonial } from "@/components/Testimonial";
import { SideProjects } from "@/components/SideProjects";
import { Approach } from "@/components/Approach";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { SectionDivider } from "@/components/SectionDivider";

export const metadata = {
  title: "Tom Romano: Technical Chief of Staff",
  description:
    "Tom Romano. Strategy and operations leader, former Chief of Staff, AI builder. Thirteen years across HP and Equifax.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Hero />
      <LogoStrip />

      <SectionDivider />
      <BentoGrid />

      <SectionDivider />
      <CaseStudy />

      <SectionDivider />
      <Testimonial />

      <SectionDivider />
      <Approach />

      <SectionDivider />
      <About />

      <SectionDivider />
      <SideProjects />

      <SectionDivider />
      <Contact />
    </>
  );
}
