"use client";

import { useState } from "react";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SectionWrapper id="contact" className="bg-light py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — Form */}
          <div>
            <h2 className="text-3xl font-bold text-dark sm:text-4xl">
              Let&apos;s talk about <em className="text-primary">your</em>{" "}
              training needs
            </h2>

            {submitted ? (
              <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
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
                className="mt-8 space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-muted/20 bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-muted/20 bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    Company{" "}
                    <span className="text-xs text-muted">(optional)</span>
                  </label>
                  <input
                    id="company"
                    type="text"
                    className="w-full rounded-lg border border-muted/20 bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm font-medium text-dark"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full rounded-lg border border-muted/20 bg-white px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-primary"
                  />
                </div>

                <Button>Send</Button>
              </form>
            )}

            <p className="mt-4 text-xs text-muted">
              By submitting, you agree to our{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Right — Book a call + review badges */}
          <div className="flex flex-col items-start justify-center gap-8">
            <Link
              href="#contact"
              className="inline-flex items-center rounded-full border border-primary px-7 py-3 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
            >
              Book a call &rarr;
            </Link>

            {/* Review badge placeholders */}
            <div className="flex gap-4">
              <div className="h-12 w-28 rounded-lg bg-muted/10" />
              <div className="h-12 w-28 rounded-lg bg-muted/10" />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
