"use client";

import dynamic from "next/dynamic";
import SectionWrapper from "@/components/ui/SectionWrapper";

const BookShelf = dynamic(() => import("@/components/BookShelf"), { ssr: false });

export default function Numbers() {
  return (
    <SectionWrapper className="relative z-10 bg-white pt-28 pb-6 lg:pt-36 lg:pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* AI Tools Bookshelf */}
        <div>
          <h3 className="font-title mb-3 text-center text-3xl font-semibold italic text-dark sm:text-4xl">
            Learn to <span className="text-primary">prompt</span> the right tools
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            Knowing which AI to use is half the skill. ageni.ai teaches you how
            to choose the right LLM for every task — and how to prompt it
            properly to get the best output, every time.
          </p>
          <BookShelf />
        </div>
      </div>
    </SectionWrapper>
  );
}
