"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
          How it works
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-light p-8"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-dark text-sm font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-xl font-medium text-dark">
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
