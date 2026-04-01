"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { DIFFERENTIATORS } from "@/lib/constants";
import { ShieldCheck, Brain, BarChart3, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ShieldCheck, Brain, BarChart3, Smartphone];

export default function Differentiators() {
  return (
    <SectionWrapper id="differentiators" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
          What makes us different
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-dark">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
