"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
        {/* Large heading with "More about us" button — BlueCarrot style */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-5xl font-medium text-dark sm:text-6xl lg:text-7xl">
            We <em className="italic text-dark">train</em> and<br />
            <em className="italic text-dark">certify</em> workforces
          </h2>
          <Link
            href="/about"
            className="inline-flex shrink-0 items-center rounded-full border border-muted/30 px-6 py-3 text-sm font-medium text-dark transition-colors hover:border-dark"
          >
            More about us
          </Link>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1 — AI Literacy Training */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-medium text-dark">
                  <em className="italic">AI Literacy</em><br />Training
                </h3>
              </div>
              {/* Avatar placeholder with blue ring */}
              <div className="h-16 w-16 shrink-0 rounded-full border-2 border-primary/30 bg-muted/10" />
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Structured courses that take individuals and teams from AI-curious
              to AI-competent. Programs range from $100 to $1,000 depending on
              track and team size.
            </p>

            <p className="mt-6 text-xs font-medium text-muted">Training services</p>
            <div className="mt-3 flex flex-col gap-2">
              {PILLAR_LINKS_1.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between rounded-full bg-light px-5 py-3 text-sm font-medium text-dark transition-colors hover:bg-muted/10"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
              ))}
            </div>
          </div>

          {/* Card 2 — Custom Job Skills Training */}
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-medium text-dark">
                  <em className="italic">Custom Job Skills</em><br />Training
                </h3>
              </div>
              <div className="h-16 w-16 shrink-0 rounded-full border-2 border-primary/30 bg-muted/10" />
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Tailored programs built around your SOPs and workflows so your
              team learns AI in the context of the work they already do.
            </p>

            <p className="mt-6 text-xs font-medium text-muted">Skill assessments</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {PILLAR_LINKS_2.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full bg-light px-5 py-3 text-sm font-medium text-dark transition-colors hover:bg-muted/10"
                >
                  {link.label}
                  <ArrowUpRight className="h-4 w-4 text-muted" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
