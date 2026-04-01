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
    <SectionWrapper className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          Numbers
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-dark lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Vision paragraph */}
        <p className="mt-10 max-w-2xl text-sm text-muted">
          ageni.ai is designed to scale AI literacy across the Philippines and
          Southeast Asia. With university partnerships, enterprise upskilling
          programs, and a 24/7 AI avatar tutor, we are building the
          infrastructure for a workforce that is not just AI-aware but
          AI-competent.
        </p>
      </div>
    </SectionWrapper>
  );
}
