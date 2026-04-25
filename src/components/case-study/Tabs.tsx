"use client";

import { useState, useId } from "react";
import Image from "next/image";
import type { CaseStudyTabItem } from "./types";

type Props = { heading: string; items: CaseStudyTabItem[] };

export default function CaseStudyTabs({ heading, items }: Props) {
  const [active, setActive] = useState(0);
  const panelId = useId();
  const current = items[active];

  if (!current) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] px-[26px]">
        <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ul
            role="tablist"
            aria-label={heading}
            className="flex flex-col divide-y divide-dark/10 rounded-xl border border-dark/10"
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.label} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-light text-dark"
                        : "text-dark/70 hover:bg-light/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-dark/40">→</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            id={panelId}
            role="tabpanel"
            aria-label={current.label}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-dark/[0.04]"
          >
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
        </div>
      </div>
    </section>
  );
}
