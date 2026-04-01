"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICE_MENU } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-dark">
          ageni<span className="text-primary">.ai</span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            ("hasDropdown" in link && link.hasDropdown) ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-dark/70 transition-colors hover:text-dark">
                  {link.label}
                  <svg
                    className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                            {SERVICE_MENU.columns[0].title}
                          </h4>
                          <ul className="space-y-2">
                            {SERVICE_MENU.columns[0].links.map((item) => (
                              <li key={item.label}>
                                <Link href={item.href} className="block text-sm text-dark/70 transition-colors hover:text-primary">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                            {SERVICE_MENU.columns[1].title}
                          </h4>
                          <ul className="space-y-2">
                            {SERVICE_MENU.columns[1].links.map((item) => (
                              <li key={item.label}>
                                <Link href={item.href} className="block text-sm text-dark/70 transition-colors hover:text-primary">
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl bg-dark p-4">
                          <h4 className="mb-2 text-sm font-semibold text-white">
                            ageni<span className="text-primary-light">.ai</span>
                          </h4>
                          <p className="mb-3 text-xs leading-relaxed text-white/60">
                            AI literacy training and certification that proves real competence — trusted by employers and institutions worldwide.
                          </p>
                          <Link href="/about" className="inline-flex items-center text-xs font-semibold text-primary-light transition-colors hover:text-white">
                            About us &rarr;
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-medium text-dark/70 transition-colors hover:text-dark">
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right: blue CTA with arrow circle (matches BlueCarrot) */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-primary pl-6 pr-2 py-2 text-sm font-medium text-white transition-all hover:brightness-110 lg:inline-flex"
          >
            Contact us
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>

          <button
            className="lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-white px-6 py-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-dark" onClick={() => setMobileOpen(false)}>
                  ageni<span className="text-primary">.ai</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) =>
                  ("hasDropdown" in link && link.hasDropdown) ? (
                    <li key={link.label} className="flex flex-col gap-2">
                      <span className="text-base font-semibold text-dark">{link.label}</span>
                      {SERVICE_MENU.columns.map((col) => (
                        <div key={col.title} className="ml-4">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">{col.title}</p>
                          <ul className="mb-3 space-y-1">
                            {col.links.map((item) => (
                              <li key={item.label}>
                                <Link href={item.href} className="block text-sm text-dark/70 transition-colors hover:text-primary" onClick={() => setMobileOpen(false)}>
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link href={link.href} className="text-base font-medium text-dark/80 transition-colors hover:text-primary" onClick={() => setMobileOpen(false)}>
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
              <div className="mt-auto pt-6">
                <Link
                  href="#contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Contact us <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
