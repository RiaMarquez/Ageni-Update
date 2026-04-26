"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { FOOTER_COLUMNS } from "@/lib/constants";

const LogoBackground = dynamic(() => import("@/components/LogoBackground"), { ssr: false });

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <footer className="bg-dark text-white rounded-t-[1.5rem] lg:rounded-t-[3rem]" style={{ position: "relative", overflow: "hidden" }}>
      <LogoBackground />
      {/* Golden separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" style={{ position: "relative", zIndex: 1 }} />

      <div className="mx-auto max-w-7xl px-6 py-16" style={{ position: "relative", zIndex: 1 }}>
        {/* Main grid: footer info left, contact form right */}
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — Footer content */}
          <div>
            <div>
              <Image src="/media/ageni-white.png" alt="ageni.ai" width={120} height={40} className="h-[40px] w-auto" />
              <p className="mt-1 text-xs text-white/40">by Iozera Inc.</p>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                AI literacy training and certification that proves real
                competence. Trusted by employers, universities, and
                professionals worldwide.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="https://linkedin.com/company/ageni-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-primary hover:text-primary"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Footer link columns */}
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {col.title}
                  </h4>
                  <ul className="space-y-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm text-white/40 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <div>
            <h2 className="font-title text-3xl font-semibold italic text-white sm:text-4xl mb-8">
              Let&apos;s talk about <span className="text-primary">your training needs</span>
            </h2>

            {submitted ? (
              <div className="rounded-2xl bg-white p-10 text-center">
                <p className="text-lg font-semibold text-dark">Thank you for your inquiry</p>
                <p className="mt-2 text-sm text-muted">We will reply within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-3"
              >
                <input
                  type="text" required placeholder="Name"
                  className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted/60 outline-none transition-all focus:ring-2 focus:ring-primary/30"
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="email" required placeholder="Email"
                    className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted/60 outline-none transition-all focus:ring-2 focus:ring-primary/30"
                  />
                  <input
                    type="text" placeholder="Company (optional)"
                    className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted/60 outline-none transition-all focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="relative">
                  <textarea
                    rows={5} required placeholder="Brief description of the project"
                    className="w-full rounded-xl bg-white px-6 py-4 text-sm text-dark placeholder-muted/60 outline-none transition-all focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-primary pl-5 pr-2 py-2 text-sm font-semibold text-white transition-all hover:brightness-110"
                  >
                    Send
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </form>
            )}

            <p className="mt-4 text-xs text-white/30">
              By submitting, you agree to our{" "}
              <Link href="/privacy-policy" className="underline hover:text-white/50">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/8 pt-8" style={{ position: "relative", zIndex: 1 }}>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <form action="#" className="flex items-center gap-2">
              <input
                type="email" placeholder="Your email"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-primary"
              />
              <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-dark transition-colors hover:brightness-110">
                Subscribe
              </button>
            </form>

            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-xs text-white/25 transition-colors hover:text-white/50">Privacy Policy</Link>
              <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} ageni.ai</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
