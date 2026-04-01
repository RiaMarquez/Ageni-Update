"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "signin" | "signup";

const inputClass =
  "w-full rounded-lg border border-muted/20 px-4 py-3 text-sm focus:border-primary focus:outline-none";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark pt-20 pb-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-white">
            ageni<span className="text-primary">.ai</span>
          </Link>
        </div>

        {/* Animated card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-white p-8"
          >
            {mode === "signin" ? (
              /* ---- Sign In ---- */
              <>
                <h1 className="mb-6 text-center text-2xl font-bold text-dark">
                  Sign In
                </h1>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className={inputClass}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className={inputClass}
                  />

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Sign In
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-muted/20" />
                  <span className="text-xs text-muted">or</span>
                  <span className="h-px flex-1 bg-muted/20" />
                </div>

                <button
                  type="button"
                  className="w-full rounded-full border border-muted/20 py-3 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary"
                >
                  Continue with Google
                </button>

                {/* Toggle */}
                <p className="mt-6 text-center text-sm text-muted">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            ) : (
              /* ---- Sign Up ---- */
              <>
                <h1 className="mb-6 text-center text-2xl font-bold text-dark">
                  Create Account
                </h1>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    placeholder="Full name"
                    className={inputClass}
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className={inputClass}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className={inputClass}
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={inputClass}
                  />
                  <select className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select your role
                    </option>
                    <option value="business_owner">Business Owner</option>
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="general_public">General Public</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                  >
                    Sign Up
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-muted/20" />
                  <span className="text-xs text-muted">or</span>
                  <span className="h-px flex-1 bg-muted/20" />
                </div>

                <button
                  type="button"
                  className="w-full rounded-full border border-muted/20 py-3 text-sm font-medium text-dark transition-colors hover:border-primary hover:text-primary"
                >
                  Continue with Google
                </button>

                {/* Toggle */}
                <p className="mt-6 text-center text-sm text-muted">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signin")}
                    className="font-semibold text-primary hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
