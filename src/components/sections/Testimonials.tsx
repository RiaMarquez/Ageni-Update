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
    <SectionWrapper className="bg-light py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="font-title text-5xl font-semibold italic text-dark sm:text-6xl lg:text-7xl">
            What they <span className="text-primary">say</span>
          </h2>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-muted/20 transition-colors hover:border-primary hover:text-primary"
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-muted/20 transition-colors hover:border-primary hover:text-primary"
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white p-10"
          >
            <span className="mb-4 block text-5xl font-bold leading-none text-primary/15">
              &ldquo;
            </span>
            <p className="max-w-3xl text-lg leading-relaxed text-dark">
              {testimonial.quote}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-dark">{testimonial.name}</p>
                <p className="text-xs text-primary">{testimonial.title}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="mt-8 flex gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-1.5 w-8 rounded-full transition-all ${
                index === current ? "bg-primary" : "bg-muted/15"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
