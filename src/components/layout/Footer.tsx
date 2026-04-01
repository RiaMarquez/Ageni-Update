import Link from "next/link";
import { FOOTER_COLUMNS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-accent text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Main 4-column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <p className="text-xl font-bold tracking-tight">
              ageni<span className="text-primary">.ai</span>
            </p>
            <p className="mt-1 text-xs text-white/50">by Iozera Inc.</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              AI literacy training and certification that proves real
              competence. Trusted by employers, universities, and
              professionals worldwide.
            </p>
            <hr className="mt-6 border-white/10" />
          </div>

          {/* Service / resource columns from constants */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 border-l-2 border-primary/40 pl-3 text-sm font-semibold uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} ageni.ai &mdash; All rights
            reserved.
          </p>

          {/* Newsletter */}
          <form
            action="#"
            className="flex w-full max-w-sm items-center gap-2"
          >
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Subscribe
            </button>
          </form>

          {/* Privacy */}
          <Link
            href="/privacy-policy"
            className="text-xs text-white/40 transition-colors hover:text-white/70"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
