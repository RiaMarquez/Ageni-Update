"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

const STATS = [
  { value: "2026", label: "Year of launch" },
  { value: "4", label: "University partners" },
  { value: "4", label: "Audience tiers" },
  { value: "24/7", label: "AI avatar tutor" },
];

export default function Numbers() {
  return (
    <SectionWrapper className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — Numbers */}
          <div className="lg:border-r lg:border-muted/15 lg:pr-12">
            <h2 className="mb-10 text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
              Numbers
            </h2>

            <div className="space-y-0">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-4 border-b border-muted/10 py-4">
                  <p className="text-2xl font-medium text-dark">{stat.value}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm leading-relaxed text-muted">
              ageni.ai is designed to scale AI literacy across the Philippines and
              Southeast Asia. With university partnerships, enterprise upskilling
              programs, and a 24/7 AI avatar tutor, we are building the
              infrastructure for a workforce that is not just AI-aware but
              AI-competent.
            </p>
          </div>

          {/* Right — Advisory */}
          <div>
            <h2 className="mb-10 text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
              Advisory
            </h2>

            {/* Photo placeholder */}
            <div className="mb-8 h-48 w-full rounded-2xl bg-muted/10" />

            <p className="text-sm leading-relaxed text-muted">
              Our advisory board brings together educators, enterprise leaders,
              and AI practitioners to ensure ageni.ai stays grounded in
              real-world needs. Every curriculum decision is informed by the
              people closest to the workforce.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
