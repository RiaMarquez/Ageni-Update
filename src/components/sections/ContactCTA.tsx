"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden rounded-t-[2.5rem] bg-dark py-24">
      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden">
        <span className="translate-y-24 text-[12vw] font-bold leading-none tracking-tighter text-white/[0.03]">
          contact us
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — Headline + Book a call */}
          <div>
            <h2 className="text-4xl font-medium text-white sm:text-5xl lg:text-6xl">
              Let&apos;s talk<br />
              about <em className="italic">your</em><br />
              <em className="italic">training needs</em>
            </h2>

            <Link
              href="#contact"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-white pl-6 pr-2 py-2 text-sm font-medium text-dark transition-all hover:-translate-y-0.5"
            >
              Book a call
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div className="rounded-2xl bg-white p-10 text-center">
                <p className="text-lg font-semibold text-dark">
                  Thank you for your inquiry
                </p>
                <p className="mt-2 text-sm text-muted">
                  We will reply within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  required
                  placeholder="Name"
                  className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted outline-none"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Company (optional)"
                    className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted outline-none"
                  />
                </div>

                <div className="relative">
                  <textarea
                    rows={5}
                    required
                    placeholder="Brief description of the project"
                    className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted outline-none"
                  />
                  {/* Send button inside textarea area */}
                  <button
                    type="submit"
                    className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-primary/10 pl-5 pr-2 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Send
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </form>
            )}

            <p className="mt-4 text-xs text-white/40">
              By submitting, you agree to our{" "}
              <Link href="/privacy-policy" className="underline hover:text-white/60">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
