"use client";

import { useState, useId } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { CaseStudyTabItem } from "./types";

type Props = { heading: string; items: CaseStudyTabItem[] };

export default function CaseStudyTabs({ heading, items }: Props) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = items[active];

  if (!current) return null;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <h2 className="text-center font-title text-3xl italic text-dark lg:text-4xl">
          {heading}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:mt-20 lg:gap-16">
          <ul
            role="tablist"
            aria-label={heading}
            className="flex flex-col divide-y divide-dark/10"
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={i} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-4 px-2 py-5 text-left transition-colors ${
                      isActive
                        ? "font-semibold text-dark"
                        : "font-medium text-dark/60 hover:text-dark"
                    }`}
                  >
                    <span className="text-sm lg:text-base">{item.label}</span>
                    {isActive ? (
                      <ChevronDown className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    ) : (
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-dark/30" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            id={panelId}
            role="tabpanel"
            aria-label={current.label}
            className="flex flex-col gap-6"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-dark/[0.04]">
              {current.previewSrc ? (
                <Image
                  src={current.previewSrc}
                  alt={current.label}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-medium text-dark/40">
                  {current.previewCaption}
                </div>
              )}
            </div>
            <p className="text-sm leading-relaxed text-dark/70 lg:text-base">
              {current.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
