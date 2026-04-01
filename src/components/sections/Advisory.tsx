"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Advisory() {
  return (
    <SectionWrapper className="relative overflow-hidden rounded-t-[2.5rem] bg-dark py-24">
      {/* Curved white top */}

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Quote */}
          <div>
            {/* Large decorative quote mark */}
            <span className="mb-4 block text-8xl leading-none text-white/10">&ldquo;</span>

            <blockquote className="text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              &ldquo;Most AI training is built for developers. ageni.ai is built
              for everyone else&nbsp;&mdash; the employees who use AI every day
              but have no training built for them.&rdquo;
            </blockquote>
            <p className="mt-6 text-base font-semibold text-white">
              Timothy Ngo
            </p>
            <p className="text-sm text-white/50">CEO, Iozera Inc.</p>
          </div>

          {/* Right — Photo placeholder with blue circle bg */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="h-72 w-72 rounded-full bg-primary/60" />
              {/* Avatar placeholder overlaid */}
              <div className="absolute inset-4 rounded-full bg-muted/20" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
