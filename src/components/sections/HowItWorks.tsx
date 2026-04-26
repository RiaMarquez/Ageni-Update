"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { HOW_IT_WORKS } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" className="relative overflow-hidden bg-dark py-24 pb-40">
      {/* Oversized watermark at bottom of dark band */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end overflow-hidden">
        <span className="translate-x-[10%] translate-y-[15%] text-[22vw] font-bold leading-none tracking-tighter text-white/[0.04] whitespace-nowrap">
          let&apos;s go
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="font-title mb-16 text-5xl font-semibold italic text-white sm:text-6xl lg:text-7xl">
          How it <span className="text-primary">works</span>
        </h2>

        {/* Steps with connecting golden line */}
        <div className="relative grid gap-6 md:grid-cols-3">
          {/* Connecting line behind cards (desktop) */}
          <div className="pointer-events-none absolute top-12 left-[16%] right-[16%] hidden h-px bg-gradient-to-r from-primary/30 via-primary/15 to-primary/30 md:block" />

          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-accent p-8 transition-all hover:border-primary/20"
            >
              <span className="absolute -top-4 -right-2 text-[6rem] font-bold leading-none text-white/[0.03]">
                {item.step}
              </span>

              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/20 bg-dark text-sm font-bold text-primary">
                {item.step}
              </span>
              <h3 className="relative z-10 mt-5 text-xl font-bold text-white">
                {item.title}
              </h3>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-white/45">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
