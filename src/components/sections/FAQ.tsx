"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <SectionWrapper id="faq" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
          Frequently asked questions
        </h2>

        <Accordion items={[...FAQ_ITEMS]} />
      </div>
    </SectionWrapper>
  );
}
