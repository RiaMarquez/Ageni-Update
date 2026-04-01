"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { INDUSTRIES } from "@/lib/constants";
import * as LucideIcons from "lucide-react";

export default function Industries() {
  return (
    <SectionWrapper id="industries" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Badge>Who It&apos;s For</Badge>
          <h2 className="mt-4 text-3xl font-bold text-dark sm:text-4xl">
            Built for every industry
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            From enterprise teams to universities, our AI literacy programs
            adapt to the language, workflows, and compliance needs of your
            sector.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => {
            const IconMap = LucideIcons as unknown as Record<
              string,
              LucideIcons.LucideIcon
            >;
            const Icon = IconMap[industry.icon] ?? LucideIcons.Briefcase;

            return (
              <div
                key={industry.name}
                className="group flex flex-col items-center gap-3 rounded-xl border border-muted/10 bg-light p-6 text-center transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <Icon className="h-7 w-7 text-muted group-hover:text-primary transition-colors" />
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
