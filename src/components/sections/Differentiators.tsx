"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { DIFFERENTIATORS } from "@/lib/constants";
import { ShieldCheck, Brain, BarChart3, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ShieldCheck, Brain, BarChart3, Smartphone];

export default function Differentiators() {
  return (
    <SectionWrapper id="differentiators" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <Badge>Why ageni.ai</Badge>
          <h2 className="mt-4 text-3xl font-bold text-dark sm:text-4xl">
            What makes us different
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={item.title}
                className="rounded-xl border border-muted/10 bg-white p-6 transition-all hover:shadow-lg"
              >
                <Icon className="mb-4 h-8 w-8 text-primary" />
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
