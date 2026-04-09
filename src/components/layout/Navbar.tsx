"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SERVICE_MENU } from "@/lib/constants";
import { useSplash } from "@/components/ui/SplashContext";

export default function Navbar() {
  const { splashDone } = useSplash();
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
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-light rounded-b-[5rem] ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="shrink-0">
          <Image src="/media/ageni-logo.png" alt="ageni" width={150} height={50} className="h-[50px] w-auto" />
        </Link>

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
                  <svg className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-2xl border border-dark/10 bg-light p-6 shadow-2xl"
                    >
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">{SERVICE_MENU.columns[0].title}</h4>
                          <ul className="space-y-2">
                            {SERVICE_MENU.columns[0].links.map((item) => (
                              <li key={item.label}><Link href={item.href} className="block text-sm text-dark/60 transition-colors hover:text-primary">{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">{SERVICE_MENU.columns[1].title}</h4>
                          <ul className="space-y-2">
                            {SERVICE_MENU.columns[1].links.map((item) => (
                              <li key={item.label}><Link href={item.href} className="block text-sm text-dark/60 transition-colors hover:text-primary">{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                          <h4 className="mb-2 text-sm font-semibold text-dark">ageni</h4>
                          <p className="mb-3 text-xs leading-relaxed text-dark/50">AI literacy training and certification — trusted by employers and institutions worldwide.</p>
                          <Link href="/about" className="inline-flex items-center text-xs font-semibold text-primary transition-colors hover:text-primary-light">About us &rarr;</Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-medium text-dark/70 transition-colors hover:text-dark">{link.label}</Link>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-primary pl-6 pr-1.5 py-1.5 text-sm font-semibold text-white transition-all hover:brightness-110 lg:inline-flex"
          >
            Contact us
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </span>
          </Link>

          <button className="text-dark lg:hidden" onClick={() => setMobileOpen((prev) => !prev)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-40 bg-dark/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col bg-accent px-6 py-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="text-xl font-bold text-white" onClick={() => setMobileOpen(false)}>ageni</Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close" className="text-white"><X className="h-6 w-6" /></button>
              </div>
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) =>
                  ("hasDropdown" in link && link.hasDropdown) ? (
                    <li key={link.label} className="flex flex-col gap-2">
                      <span className="text-base font-semibold text-white">{link.label}</span>
                      {SERVICE_MENU.columns.map((col) => (
                        <div key={col.title} className="ml-4">
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">{col.title}</p>
                          <ul className="mb-3 space-y-1">
                            {col.links.map((item) => (
                              <li key={item.label}><Link href={item.href} className="block text-sm text-white/60 hover:text-primary" onClick={() => setMobileOpen(false)}>{item.label}</Link></li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </li>
                  ) : (
                    <li key={link.label}><Link href={link.href} className="text-base font-medium text-white/70 hover:text-primary" onClick={() => setMobileOpen(false)}>{link.label}</Link></li>
                  )
                )}
              </ul>
              <div className="mt-auto pt-6">
                <Link href="#contact" className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-dark" onClick={() => setMobileOpen(false)}>
                  Contact us <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
