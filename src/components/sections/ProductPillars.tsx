"use client";

import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";

const PILLAR_LINKS_1 = [
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Certification", href: "/#certification" },
  { label: "PMA Assessment", href: "/#pma" },
];

const PILLAR_LINKS_2 = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Industries", href: "/#industries" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "#contact" },
];

export default function ProductPillars() {
  return (
    <SectionWrapper id="service-pillars" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-dark sm:text-4xl">
            We{" "}
            <em className="not-italic italic text-primary">train</em> and{" "}
            <em className="not-italic italic text-primary">certify</em>{" "}
            workforces
          </h2>
          <Link
            href="/about"
            className="mt-2 hidden text-sm font-medium text-primary hover:underline sm:inline"
          >
            More about us &rarr;
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1 — AI Literacy Training */}
          <div className="rounded-xl border border-muted/10 bg-white p-8 transition-all hover:shadow-lg">
            <div className="mb-4 h-16 w-16 rounded-full bg-primary/10" />
            <h3 className="text-xl font-bold text-dark">
              AI Literacy Training
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Structured courses that take individuals and teams from AI-curious
              to AI-competent. Programs range from $100 to $1,000 depending on
              track and team size.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {PILLAR_LINKS_1.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-muted/10 px-4 py-1.5 text-center text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Card 2 — Custom Job Skills Training */}
          <div className="rounded-xl border border-muted/10 bg-white p-8 transition-all hover:shadow-lg">
            <div className="mb-4 h-16 w-16 rounded-full bg-primary/10" />
            <h3 className="text-xl font-bold text-dark">
              Custom Job Skills Training
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tailored programs built around your SOPs and workflows so your
              team learns AI in the context of the work they already do.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {PILLAR_LINKS_2.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full border border-muted/10 px-4 py-1.5 text-center text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
