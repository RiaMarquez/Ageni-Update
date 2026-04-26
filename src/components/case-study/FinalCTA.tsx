"use client";

import Link from "next/link";
import type { CaseStudyFinalCTAContent } from "./types";

type Props = { content: CaseStudyFinalCTAContent };

export default function CaseStudyFinalCTA({ content }: Props) {
  return (
    <section className="bg-accent py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-title text-4xl font-semibold leading-[1.05] text-white lg:text-5xl">
              {content.heading}
            </h2>
            <div className="mt-8">
              <Link
                href={content.secondaryCtaHref}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-dark transition-all hover:bg-primary-light"
              >
                {content.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          {/* Visual-only form — no action/handler. TODO: wire submit later. */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
              />
              <input
                type="text"
                name="company"
                placeholder="Company (optional)"
                className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
              />
            </div>
            <textarea
              name="message"
              rows={4}
              placeholder="Brief description of the project"
              className="rounded-md border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-primary focus:outline-none"
            />
            <div className="flex items-center justify-end">
              <button
                type="button"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-dark transition-all hover:bg-primary-light"
              >
                Send
              </button>
            </div>
            <p
              className="mt-2 text-xs text-white/50"
              dangerouslySetInnerHTML={{ __html: content.disclaimerHtml }}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
