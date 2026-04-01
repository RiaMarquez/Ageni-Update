"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const TESTIMONIALS = [
  {
    quote:
      "ageni.ai transformed how our team thinks about AI. The certification gave our managers confidence to lead AI initiatives across departments.",
    name: "Maria Santos",
    title: "VP of Operations, TechCorp Philippines",
  },
  {
    quote:
      "The Prompt Mastery Assessment is the real deal. Unlike other certifications, it actually tests whether you can use AI effectively in real scenarios.",
    name: "James Reyes",
    title: "Head of L&D, GlobalBPO Inc.",
  },
  {
    quote:
      "We rolled out ageni.ai to 200+ employees in under a month. The self-paced format and employer dashboard made tracking progress effortless.",
    name: "Angela Cruz",
    title: "Chief People Officer, NovaTech Solutions",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const testimonial = TESTIMONIALS[current];

  return (
    <SectionWrapper className="rounded-t-[2.5rem] bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header row: title left, controls right */}
        <div className="mb-14 flex items-end justify-between">
          <h2 className="text-5xl font-medium italic text-dark sm:text-6xl lg:text-7xl">
            Testimonials
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-muted/20 transition-colors hover:border-dark"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5 text-dark" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-muted/20 transition-colors hover:border-dark"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5 text-dark" />
            </button>
          </div>
        </div>

        {/* Testimonial content — left-aligned */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Avatar + name row */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted/10">
                <span className="text-sm font-bold text-dark">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-base font-semibold text-dark">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.title}</p>
              </div>
            </div>

            <p className="max-w-3xl text-lg leading-relaxed text-dark">
              {testimonial.quote}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-12 flex gap-1">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className="h-0.5 flex-1 rounded-full transition-colors"
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <div className={`h-full rounded-full transition-all ${index === current ? "bg-dark" : "bg-muted/15"}`} />
            </button>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
