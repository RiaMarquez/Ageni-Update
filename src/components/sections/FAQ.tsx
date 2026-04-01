"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <SectionWrapper id="faq" className="bg-light py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-dark sm:text-4xl">
          Frequently asked <em className="text-primary">questions</em>
        </h2>

        <Accordion items={[...FAQ_ITEMS]} />
      </div>
    </SectionWrapper>
  );
}
