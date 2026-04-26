"use client";

import { useState, type FormEvent } from "react";
import Badge from "@/components/ui/Badge";

const inputClass =
  "w-full rounded-lg border border-muted/20 px-4 py-3 text-sm focus:border-primary focus:outline-none";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge>Contact</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Have a question, partnership inquiry, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-6">
          {submitted ? (
            <div className="rounded-xl border bg-light p-12 text-center">
              <h2 className="text-2xl font-bold text-dark">Thank you!</h2>
              <p className="mt-3 text-sm text-muted">
                We&apos;ve received your message and will get back to you
                shortly.
              </p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  className={inputClass}
                />
                <textarea
                  placeholder="Your message"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                >
                  Send Message
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-muted">
                Prefer a live conversation?{" "}
                <a
                  href="#"
                  className="font-semibold text-primary hover:underline"
                >
                  Book a Call &rarr;
                </a>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
