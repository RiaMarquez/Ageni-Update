"use client";

import SectionWrapper from "@/components/ui/SectionWrapper";
import Accordion from "@/components/ui/Accordion";
import { FAQ_ITEMS } from "@/lib/constants";

export default function FAQ() {
  return (
    <SectionWrapper id="faq" className="relative -mt-8 rounded-t-[1.5rem] bg-white py-20 lg:rounded-t-[3rem] lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 text-center lg:mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            FAQ
          </p>
          <h2 className="font-title text-4xl font-semibold text-dark sm:text-5xl lg:text-6xl">
            Frequently asked <span className="text-primary italic">questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Everything you need to know about ageni.ai, our certifications, and how we help teams build real AI skills.
          </p>
        </div>

        <Accordion items={[...FAQ_ITEMS]} />
      </div>
    </SectionWrapper>
  );
}
