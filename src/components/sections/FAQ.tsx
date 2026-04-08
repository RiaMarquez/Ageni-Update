"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <SectionWrapper id="faq" className="relative -mt-8 rounded-t-[1.5rem] bg-white py-16 lg:rounded-t-[3rem] lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="font-title mb-10 text-4xl font-semibold italic text-dark sm:text-5xl lg:mb-16 lg:text-7xl">
          Frequently asked <span className="text-primary">questions</span>
        </h2>

        <Accordion items={[...FAQ_ITEMS]} />
      </div>
    </SectionWrapper>
  );
}
