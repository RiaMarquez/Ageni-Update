"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import IndustriesParticles from "@/components/ui/IndustriesParticles";
import { INDUSTRIES } from "@/lib/constants";
import * as LucideIcons from "lucide-react";

export default function Industries() {
  return (
    <SectionWrapper
      id="industries"
      className="relative overflow-hidden bg-light py-20"
    >
      <IndustriesParticles />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
          Built for every industry
        </h2>
        <p className="mb-14 max-w-2xl text-sm leading-relaxed text-muted">
          From enterprise teams to universities, our AI literacy programs
          adapt to the language, workflows, and compliance needs of your
          sector.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => {
            const IconMap = LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>;
            const Icon = IconMap[industry.icon] ?? LucideIcons.Briefcase;

            return (
              <div
                key={industry.name}
                className="group flex flex-col items-center gap-3 rounded-2xl bg-white/80 p-6 text-center backdrop-blur-sm transition-all hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-light transition-colors group-hover:bg-primary/10">
                  <Icon className="h-6 w-6 text-dark group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-dark">
                  {industry.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
