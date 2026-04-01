import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="text-xl font-bold tracking-tight">
              ageni<span className="text-primary">.ai</span>
            </p>
            <p className="mt-1 text-xs text-white/50">by Iozera Inc.</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              AI literacy training and certification that proves real
              competence. Trusted by employers, universities, and
              professionals worldwide.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com/company/ageni-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-primary hover:text-primary"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter + copyright */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium text-white/60">Subscribe to the newsletter</p>
              <form action="#" className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-primary"
                />
                <button
                  type="submit"
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:brightness-110"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-xs text-white/30 transition-colors hover:text-white/60">
                Privacy Policy
              </Link>
              <p className="text-xs text-white/30">
                &copy; {new Date().getFullYear()} ageni.ai &mdash; All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
