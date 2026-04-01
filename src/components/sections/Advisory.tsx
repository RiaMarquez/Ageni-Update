"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Advisory() {
  return (
    <SectionWrapper className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-primary">
          Advisory
        </p>

        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          {/* Left — description + quote */}
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-muted">
              Our advisory board brings together educators, enterprise leaders,
              and AI practitioners to ensure ageni.ai stays grounded in
              real-world needs. Every curriculum decision is informed by the
              people closest to the workforce.
            </p>

            <blockquote className="mt-8 border-l-2 border-primary pl-4 italic text-dark">
              &ldquo;Most AI training is built for developers. ageni.ai is built
              for everyone else&nbsp;&mdash; the employees who use AI every day
              but have no training built for them.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm font-semibold text-dark">
              Timothy Ngo
            </p>
            <p className="text-xs text-muted">CEO, Iozera Inc.</p>
          </div>

          {/* Right — photo placeholder */}
          <div className="h-64 w-64 shrink-0 rounded-xl bg-muted/10" />
        </div>
      </div>
    </SectionWrapper>
  );
}
