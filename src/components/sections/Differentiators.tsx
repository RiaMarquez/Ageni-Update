"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import { DIFFERENTIATORS } from "@/lib/constants";
import { ShieldCheck, Brain, BarChart3, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [ShieldCheck, Brain, BarChart3, Smartphone];

export default function Differentiators() {
  return (
    <SectionWrapper id="differentiators" className="relative -mt-8 rounded-[1.5rem] bg-white py-16 lg:rounded-[3rem] lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-title mb-10 text-4xl font-semibold italic text-dark sm:text-5xl lg:mb-16 lg:text-7xl">
          What makes us <span className="text-primary">different</span>
        </h2>

        {/* Bento grid — first and last are tall */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {DIFFERENTIATORS.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={item.title}
                className={`group relative overflow-hidden rounded-2xl bg-dark p-7 transition-all hover:shadow-xl ${
                  index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                {/* Hover golden accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
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
