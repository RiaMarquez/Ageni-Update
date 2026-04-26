"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
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

  return (
    <SectionWrapper className="bg-light py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Testimonials
            </p>
            <h2 className="font-title text-4xl font-semibold text-dark sm:text-5xl lg:text-6xl">
              What they <span className="text-primary italic">say</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dark/10 text-dark/40 transition-all hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/10"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-dark/10 text-dark/40 transition-all hover:border-primary hover:text-primary hover:shadow-md hover:shadow-primary/10"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Single card with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="relative overflow-hidden rounded-2xl border border-primary/20 bg-white p-10 shadow-xl shadow-primary/[0.06] md:p-12"
          >
            {/* Gold accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                {/* Quote icon */}
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Quote className="h-4 w-4 text-primary" />
                </div>

                <p className="max-w-2xl text-lg leading-relaxed text-dark/80 md:text-xl">
                  {TESTIMONIALS[current].quote}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-dark/[0.05] pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                  <span className="text-sm font-bold">
                    {TESTIMONIALS[current].name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark">{TESTIMONIALS[current].name}</p>
                  <p className="text-xs text-primary">{TESTIMONIALS[current].title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="mt-12 flex justify-center gap-2">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === current ? "w-12 bg-primary" : "w-6 bg-dark/10"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
