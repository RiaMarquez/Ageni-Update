"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Badge>How It Works</Badge>
          <h2 className="mt-4 text-3xl font-bold text-dark sm:text-4xl">
            Three steps to mastery
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-muted/10 bg-white p-8 transition-all hover:shadow-lg"
            >
              <span className="text-xs font-medium tracking-widest text-primary">
                STEP {item.step}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
