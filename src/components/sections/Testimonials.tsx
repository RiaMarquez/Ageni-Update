"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const TESTIMONIALS = [
  {
    quote:
      "ageni.ai transformed how our team thinks about AI. The certification gave our managers confidence to lead AI initiatives across departments.",
    name: "Maria Santos",
    title: "VP of Operations",
    company: "TechCorp Philippines",
  },
  {
    quote:
      "The Prompt Mastery Assessment is the real deal. Unlike other certifications, it actually tests whether you can use AI effectively in real scenarios.",
    name: "James Reyes",
    title: "Head of L&D",
    company: "GlobalBPO Inc.",
  },
  {
    quote:
      "We rolled out ageni.ai to 200+ employees in under a month. The self-paced format and employer dashboard made tracking progress effortless.",
    name: "Angela Cruz",
    title: "Chief People Officer",
    company: "NovaTech Solutions",
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
    <SectionWrapper className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mb-12 text-3xl font-bold text-dark sm:text-4xl">
          Testimonials
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Avatar placeholder */}
              <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-muted/10" />

              <p className="text-lg italic leading-relaxed text-dark">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <p className="mt-6 text-sm font-semibold text-dark">
                {testimonial.name}
              </p>
              <p className="text-xs text-muted">
                {testimonial.title}, {testimonial.company}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border p-2 transition-colors hover:border-primary hover:text-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrent(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-muted/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            className="rounded-full border p-2 transition-colors hover:border-primary hover:text-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
