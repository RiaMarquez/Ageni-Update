import { ArrowUpRight } from "lucide-react";
import type { CaseStudyResult } from "./types";

type Props = { heading: string; items: CaseStudyResult[] };

export default function CaseStudyResults({ heading, items }: Props) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-[26px] md:grid-cols-[1fr_1.5fr]">
        <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
          {heading}
        </h2>

        <ul className="flex flex-col gap-5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span className="text-base leading-relaxed text-dark/80">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
