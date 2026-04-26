# Business Owners "More" Audience Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the Differentiators rows as hover-highlighted clickable cards linked to per-row pages, and ship a first-draft Business Owners audience page at `/business-owners-more` modeled on the Blue Carrot Studio SE case-study layout.

**Architecture:** Add an optional `href` to the `DIFFERENTIATORS` constant so each row can link to its own destination. Build a small reusable library of case-study section components under `src/components/case-study/` (Breadcrumb, Hero, Prose, Tabs, Breakdown, MediaShowcase, Results, Testimonial, FinalCTA). Compose `/business-owners-more` from those components with a page-local content object holding the draft copy. The same components will be reused later for the three remaining audience pages.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, framer-motion, lucide-react. No test framework — verification is `tsc` via `next build`, `next lint`, and manual browser QA.

**Spec:** `docs/superpowers/specs/2026-04-25-business-owners-more-design.md`

---

## File Structure

### Files to create

- `src/components/case-study/types.ts` — shared TypeScript types for section props and content.
- `src/components/case-study/Breadcrumb.tsx` — page breadcrumb trail.
- `src/components/case-study/Hero.tsx` — dark hero (title + CTA + meta + image).
- `src/components/case-study/Prose.tsx` — single-column titled text section, optional image.
- `src/components/case-study/Tabs.tsx` — vertical tab list with swappable right-side preview (client component).
- `src/components/case-study/Breakdown.tsx` — numbered scrollable module cards.
- `src/components/case-study/MediaShowcase.tsx` — titled caption + media/placeholder tile.
- `src/components/case-study/Results.tsx` — titled bullet list.
- `src/components/case-study/Testimonial.tsx` — quote + attribution.
- `src/components/case-study/FinalCTA.tsx` — dark CTA banner with visual-only form.
- `src/components/case-study/index.ts` — barrel export.
- `src/app/business-owners-more/page.tsx` — the route page composing the components.

### Files to modify

- `src/lib/constants.ts` — add optional `href` to each `DIFFERENTIATORS` entry.
- `src/components/sections/Differentiators.tsx` — wrap row in `<Link>`, add hover container styles, stop button click propagation.

---

## Task 1: Add `href` field to DIFFERENTIATORS

**Files:**
- Modify: `src/lib/constants.ts:89-110`

- [ ] **Step 1: Edit DIFFERENTIATORS to add optional `href` per entry**

Replace the `DIFFERENTIATORS` array in `src/lib/constants.ts` with:

```ts
export const DIFFERENTIATORS = [
  {
    title: "Business Owners",
    description:
      "Learn how to use AI tools to manage your business, evaluate AI-assisted work, and apply AI to your operations. Understand prompt design, output evaluation, and AI risk identification. Access through promotional codes at three tiers: AI Literacy, Business Growth, or Advanced.",
    href: "/business-owners-more",
  },
  {
    title: "University Students",
    description:
      "Access AI literacy training through your university. Complete the curriculum and earn a credential that proves genuine competency to employers. Available through institution-issued codes. Opens pathways to roles across Iozera's portfolio companies and international markets.",
    href: "#contact",
  },
  {
    title: "Professionals & Employees",
    description:
      "No technical background required. Learn to apply AI tools to real business functions—sales, operations, customer service, finance, management. Master prompt design, output evaluation, and AI risk identification at a price point businesses can justify.",
    href: "#contact",
  },
  {
    title: "Enterprise Teams",
    description:
      "For business owners needing scalable job training solutions. Build programs from your own SOPs, workflows, and role definitions. Train employees consistently across all locations and receive verified mastery records per employee. Priced per engagement.",
    href: "#contact",
  },
] as const;
```

- [ ] **Step 2: Verify TypeScript still compiles**

Run: `npm run lint`
Expected: No new errors related to `constants.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat(constants): add per-row href to DIFFERENTIATORS"
```

---

## Task 2: Wire Differentiators rows as hoverable, clickable links

**Files:**
- Modify: `src/components/sections/Differentiators.tsx`

- [ ] **Step 1: Replace the file with the updated version**

Full new content for `src/components/sections/Differentiators.tsx`:

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { DIFFERENTIATORS } from "@/lib/constants";

const IMAGES = [
  "/media/cards/business-owners.png",
  "/media/cards/university-students.png",
  "/media/cards/professionals.png",
  "/media/cards/enterprise.png",
];

const CATEGORIES = [
  "Management",
  "Career Credentials",
  "Workplace Skills",
  "Custom Training",
];

export default function Differentiators() {
  return (
    <SectionWrapper
      id="differentiators"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-[26px]">
        {/* Header row */}
        <div className="pb-10">
          <h2 className="font-title text-5xl font-semibold leading-[0.95] text-dark sm:text-6xl lg:text-7xl">
            Courses built for{" "}
            <em className="italic text-primary">all stages</em>
          </h2>
        </div>

        {/* Top divider */}
        <div className="h-px w-full bg-dark/10" />

        {/* Rows */}
        <div className="flex flex-col">
          {DIFFERENTIATORS.map((item, i) => {
            const href = item.href ?? "#contact";
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative border-b border-dark/10 transition-all duration-300 hover:rounded-3xl hover:border-transparent hover:bg-dark/[0.04]"
              >
                {/* Stretched link covering the whole row. Buttons below are raised above it via z-index so they receive their own clicks. */}
                <Link
                  href={href}
                  aria-label={`Learn more about ${item.title}`}
                  className="absolute inset-0 z-[1] rounded-3xl"
                />

                <div className="relative z-[2] grid grid-cols-12 items-center gap-3 px-4 py-5 lg:gap-5 lg:px-6 lg:py-6">
                  {/* Thumbnail */}
                  <div className="col-span-12 md:col-span-5">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-dark/[0.04] md:w-[70%]">
                      <Image
                        src={IMAGES[i]}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 768px) 30vw, 100vw"
                      />
                    </div>
                  </div>

                  {/* Title + category */}
                  <div className="col-span-12 md:col-span-3 md:-ml-32">
                    <h3 className="font-title text-2xl font-semibold leading-tight text-dark lg:text-[32px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {CATEGORIES[i]}
                    </p>
                  </div>

                  {/* Description + actions */}
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-sm leading-relaxed text-dark/60 lg:text-base">
                      {item.description}
                    </p>
                    <div className="pointer-events-auto relative z-[3] mt-4 flex flex-wrap gap-3">
                      <Link
                        href={href}
                        className="rounded-full border border-dark/15 bg-white px-5 py-2 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white"
                      >
                        More
                      </Link>
                      <Link
                        href="#contact"
                        className="rounded-full border border-dark/15 bg-white px-5 py-2 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white"
                      >
                        View demo
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-dark/15 bg-white px-6 py-3 text-sm font-medium text-dark transition-all hover:border-dark hover:bg-dark hover:text-white"
          >
            Learn more about our platform
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

Key changes vs. the current file:
- Each row is a `<motion.div>` with `group relative` and the hover styles.
- A "stretched link" `<Link>` sits `absolute inset-0 z-[1]` covering the whole row (valid HTML — no nested anchors).
- Row content grid is `relative z-[2]` so it sits above the stretched link.
- The `More` / `View demo` buttons sit at `z-[3]` with `pointer-events-auto` so clicks land on those anchors, not the stretched link underneath. No `stopPropagation` needed because anchors are siblings, not nested.
- Hover state on the row wrapper: `hover:rounded-3xl hover:border-transparent hover:bg-dark/[0.04]` with `transition-all duration-300`.
- `More` points to the row's `href` so it lands on the same target.

- [ ] **Step 2: Start the dev server**

Run: `npm run dev`
Expected: Next.js dev server starts on `http://localhost:3000`.

- [ ] **Step 3: Manual QA — hover and click**

- Open `http://localhost:3000` in a browser.
- Scroll to the "Courses built for all stages" section.
- Hover each of the four rows. Confirm:
  - The whole row lifts into a rounded container with a soft gray background.
  - The bottom divider line fades away on hover.
  - The image inside scales up slightly (existing behavior).
- Click the **Business Owners** row (anywhere except the two buttons). Expected: URL becomes `/business-owners-more` (page will 404 until Task 12 — that's fine, the route wiring is what we're verifying).
- Click **Business Owners → More** button. Expected: same navigation to `/business-owners-more`.
- Click **Business Owners → View demo** button. Expected: URL changes to `#contact` (no navigation away).
- Click each of the other three rows. Expected: URL changes to `#contact`.

- [ ] **Step 4: Stop the dev server and commit**

```bash
git add src/components/sections/Differentiators.tsx
git commit -m "feat(differentiators): make rows hoverable, clickable cards"
```

---

## Task 3: Define shared case-study types

**Files:**
- Create: `src/components/case-study/types.ts`

- [ ] **Step 1: Create the types file**

Full content of `src/components/case-study/types.ts`:

```ts
export type CaseStudyCrumb = { label: string; href?: string };

export type CaseStudyMetaRow = { label: string; value: string };

export type CaseStudyHeroContent = {
  breadcrumbs: CaseStudyCrumb[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  meta: CaseStudyMetaRow[];
  image: { src: string; alt: string };
};

export type CaseStudyProseContent = {
  heading: string;
  body: string;
  image?: { src?: string; alt: string; caption?: string };
  imageSide?: "left" | "right";
};

export type CaseStudyTabItem = {
  label: string;
  previewCaption: string;
  previewSrc?: string;
};

export type CaseStudyBreakdownItem = {
  title: string;
  description: string;
};

export type CaseStudyMediaItem = {
  title: string;
  caption: string;
  src?: string;
  kind?: "image" | "video";
};

export type CaseStudyResult = string;

export type CaseStudyTestimonialContent = {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
};

export type CaseStudyFinalCTAContent = {
  heading: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  disclaimerHtml: string;
};
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run lint`
Expected: No new errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/case-study/types.ts
git commit -m "feat(case-study): add shared section types"
```

---

## Task 4: Create CaseStudyBreadcrumb component

**Files:**
- Create: `src/components/case-study/Breadcrumb.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CaseStudyCrumb } from "./types";

type Props = { items: CaseStudyCrumb[]; className?: string };

export default function CaseStudyBreadcrumb({ items, className = "" }: Props) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-white/70 ${className}`}
    >
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? "text-white" : ""}>
              {item.label}
            </span>
          )}
          {i < items.length - 1 && (
            <ChevronRight className="h-4 w-4 text-white/40" />
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Breadcrumb.tsx
git commit -m "feat(case-study): add Breadcrumb component"
```

---

## Task 5: Create CaseStudyHero component

**Files:**
- Create: `src/components/case-study/Hero.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import Image from "next/image";
import Link from "next/link";
import CaseStudyBreadcrumb from "./Breadcrumb";
import type { CaseStudyHeroContent } from "./types";

type Props = { content: CaseStudyHeroContent };

export default function CaseStudyHero({ content }: Props) {
  return (
    <section className="relative overflow-hidden bg-accent pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="mx-auto max-w-[1500px] px-[26px]">
        <CaseStudyBreadcrumb items={content.breadcrumbs} className="mb-12" />

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-title text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>

            <div className="mt-8">
              <Link
                href={content.ctaHref}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-dark transition-all hover:bg-primary-light"
              >
                {content.ctaLabel}
              </Link>
            </div>

            <dl className="mt-10 space-y-2 text-white/90">
              {content.meta.map((row) => (
                <div key={row.label} className="flex gap-4 text-sm">
                  <dt className="w-32 shrink-0 text-white/60">{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Hero.tsx
git commit -m "feat(case-study): add Hero component"
```

---

## Task 6: Create CaseStudyProse component

**Files:**
- Create: `src/components/case-study/Prose.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import Image from "next/image";
import type { CaseStudyProseContent } from "./types";

type Props = { content: CaseStudyProseContent };

export default function CaseStudyProse({ content }: Props) {
  const imageSide = content.imageSide ?? "right";
  const hasImage = !!content.image;

  const ImageBlock = hasImage ? (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-dark/[0.04]">
      {content.image?.src ? (
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-medium text-dark/40">
          {content.image?.caption ?? "Placeholder — replace with final asset"}
        </div>
      )}
    </div>
  ) : null;

  const TextBlock = (
    <div>
      <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
        {content.heading}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-dark/70 lg:text-lg">
        {content.body}
      </p>
    </div>
  );

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] px-[26px]">
        {hasImage ? (
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            {imageSide === "left" ? (
              <>
                {ImageBlock}
                {TextBlock}
              </>
            ) : (
              <>
                {TextBlock}
                {ImageBlock}
              </>
            )}
          </div>
        ) : (
          <div className="max-w-3xl">{TextBlock}</div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Prose.tsx
git commit -m "feat(case-study): add Prose section component"
```

---

## Task 7: Create CaseStudyTabs component

**Files:**
- Create: `src/components/case-study/Tabs.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { CaseStudyTabItem } from "./types";

type Props = { heading: string; items: CaseStudyTabItem[] };

export default function CaseStudyTabs({ heading, items }: Props) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1500px] px-[26px]">
        <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <ul className="flex flex-col divide-y divide-dark/10 rounded-xl border border-dark/10">
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-light text-dark"
                        : "text-dark/70 hover:bg-light/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-dark/40">→</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-dark/[0.04]">
            {current.previewSrc ? (
              <Image
                src={current.previewSrc}
                alt={current.label}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-medium text-dark/40">
                {current.previewCaption}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Tabs.tsx
git commit -m "feat(case-study): add Tabs section component"
```

---

## Task 8: Create CaseStudyBreakdown component

**Files:**
- Create: `src/components/case-study/Breakdown.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import type { CaseStudyBreakdownItem } from "./types";

type Props = {
  heading: string;
  intro?: string;
  items: CaseStudyBreakdownItem[];
};

export default function CaseStudyBreakdown({ heading, intro, items }: Props) {
  return (
    <section className="bg-light py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-[26px] md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
            {heading}
          </h2>
          {intro && (
            <p className="mt-4 max-w-md text-base leading-relaxed text-dark/70">
              {intro}
            </p>
          )}
        </div>

        <ol className="relative flex max-h-[420px] flex-col gap-4 overflow-y-auto pr-2">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="list-none rounded-2xl bg-white p-6 shadow-[0_1px_0_0_rgba(45,58,74,0.06)]"
            >
              <div className="text-sm font-medium text-primary">{i + 1}</div>
              <h3 className="mt-2 font-title text-xl font-semibold text-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dark/70">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Breakdown.tsx
git commit -m "feat(case-study): add Breakdown section component"
```

---

## Task 9: Create CaseStudyMediaShowcase component

**Files:**
- Create: `src/components/case-study/MediaShowcase.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import Image from "next/image";
import type { CaseStudyMediaItem } from "./types";

type Props = { id?: string; items: CaseStudyMediaItem[] };

export default function CaseStudyMediaShowcase({ id, items }: Props) {
  return (
    <section id={id} className="bg-white py-16 lg:py-20">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-14 px-[26px]">
        {items.map((item) => (
          <div
            key={item.title}
            className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.4fr]"
          >
            <div>
              <h3 className="font-title text-2xl font-semibold text-dark lg:text-3xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-dark/60 lg:text-base">
                {item.caption}
              </p>
            </div>

            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-dark/[0.04]">
              {item.src ? (
                item.kind === "video" ? (
                  <video
                    src={item.src}
                    controls
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 55vw, 100vw"
                    className="object-cover"
                  />
                )
              ) : (
                // TODO: replace with final asset
                <div className="flex h-full w-full items-center justify-center p-6 text-center text-xs font-medium text-dark/40">
                  Placeholder — {item.title}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/MediaShowcase.tsx
git commit -m "feat(case-study): add MediaShowcase section component"
```

---

## Task 10: Create CaseStudyResults component

**Files:**
- Create: `src/components/case-study/Results.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import { ArrowUpRight } from "lucide-react";
import type { CaseStudyResult } from "./types";

type Props = { heading: string; items: CaseStudyResult[] };

export default function CaseStudyResults({ heading, items }: Props) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-[26px] md:grid-cols-[1fr_1.5fr]">
        <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
          {heading}
        </h2>

        <ul className="flex flex-col gap-5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span className="text-base leading-relaxed text-dark/80">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Results.tsx
git commit -m "feat(case-study): add Results section component"
```

---

## Task 11: Create CaseStudyTestimonial component

**Files:**
- Create: `src/components/case-study/Testimonial.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
import type { CaseStudyTestimonialContent } from "./types";

type Props = { heading: string; content: CaseStudyTestimonialContent };

export default function CaseStudyTestimonial({ heading, content }: Props) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-10 px-[26px] md:grid-cols-[1fr_1.5fr]">
        <h2 className="font-title text-3xl font-semibold text-dark lg:text-4xl">
          {heading}
        </h2>

        <div>
          <p className="text-base leading-relaxed text-dark/80 lg:text-lg">
            {content.quote}
          </p>
          <div className="mt-6">
            <div className="font-title text-base font-semibold text-dark">
              {content.authorName}
            </div>
            <div className="text-sm text-dark/60">
              {content.authorRole}, {content.authorCompany}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Testimonial.tsx
git commit -m "feat(case-study): add Testimonial section component"
```

---

## Task 12: Create CaseStudyFinalCTA component

**Files:**
- Create: `src/components/case-study/FinalCTA.tsx`

- [ ] **Step 1: Create the component**

Full content:

```tsx
"use client";

import Link from "next/link";
import type { CaseStudyFinalCTAContent } from "./types";

type Props = { content: CaseStudyFinalCTAContent };

export default function CaseStudyFinalCTA({ content }: Props) {
  return (
    <section className="bg-accent py-20 lg:py-28">
      <div className="mx-auto max-w-[1500px] px-[26px]">
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/FinalCTA.tsx
git commit -m "feat(case-study): add FinalCTA section component"
```

---

## Task 13: Add barrel export for case-study components

**Files:**
- Create: `src/components/case-study/index.ts`

- [ ] **Step 1: Create the barrel**

Full content:

```ts
export { default as CaseStudyBreadcrumb } from "./Breadcrumb";
export { default as CaseStudyHero } from "./Hero";
export { default as CaseStudyProse } from "./Prose";
export { default as CaseStudyTabs } from "./Tabs";
export { default as CaseStudyBreakdown } from "./Breakdown";
export { default as CaseStudyMediaShowcase } from "./MediaShowcase";
export { default as CaseStudyResults } from "./Results";
export { default as CaseStudyTestimonial } from "./Testimonial";
export { default as CaseStudyFinalCTA } from "./FinalCTA";
export type * from "./types";
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/index.ts
git commit -m "feat(case-study): add barrel export"
```

---

## Task 14: Build the /business-owners-more page

**Files:**
- Create: `src/app/business-owners-more/page.tsx`

- [ ] **Step 1: Create the page**

Full content:

```tsx
import type { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyProse,
  CaseStudyTabs,
  CaseStudyBreakdown,
  CaseStudyMediaShowcase,
  CaseStudyResults,
  CaseStudyTestimonial,
  CaseStudyFinalCTA,
} from "@/components/case-study";

export const metadata: Metadata = {
  title: "Business Owners — ageni.ai",
  description:
    "AI training built for business owners: judgment, evaluation, and application across your operations.",
};

const content = {
  hero: {
    breadcrumbs: [
      { label: "Homepage", href: "/" },
      { label: "Audiences" },
      { label: "Business Owners" },
    ],
    title: "Business Owners — AI that actually runs your operations",
    ctaLabel: "View demo",
    ctaHref: "#sample-materials",
    meta: [
      { label: "Audience", value: "Business Owners" },
      { label: "Format", value: "Self-paced online" },
      { label: "Access tiers", value: "AI Literacy / Business Growth / Advanced" },
    ],
    image: {
      src: "/media/cards/business-owners.png",
      alt: "Business owner at desk",
    },
  },
  whoItsFor: {
    heading: "Who this is for",
    body:
      "Owner-operators who need their team — and themselves — using AI well, without hiring a technical lead or adding six weeks of engineering training to everyone's calendar. Built for leaders who make operational decisions and want AI to accelerate them.",
  },
  goal: {
    heading: "The goal",
    body:
      "Graduate with the judgment to direct AI work, evaluate output quality, and apply AI across sales, ops, customer service, finance, and management — at a price point a small business can justify.",
    imageSide: "left" as const,
    image: { alt: "Course goal illustration", caption: "Course goal" },
  },
  challenges: {
    heading: "The challenges",
    body:
      "Most AI training assumes a technical audience. Owners face a different problem: no time for courses built for engineers; no reliable way to tell good AI output from confident-sounding wrong answers; no clarity on where AI is safe to use versus risky; and tools that change faster than training materials. Courses need to meet owners where they are.",
    imageSide: "right" as const,
    image: { alt: "Challenges illustration", caption: "Owner challenges" },
  },
  approach: {
    heading: "Our approach",
    body:
      "No-code, operations-first, tiered access so owners pay for the depth they need, and hands-on prompt and evaluation practice over theory. Every module ties back to a decision an owner actually makes.",
    imageSide: "right" as const,
    image: { alt: "Approach illustration", caption: "Our approach" },
  },
  whatYouGet: {
    heading: "What you get",
    items: [
      {
        label: "AI literacy foundations",
        previewCaption: "AI literacy foundations preview",
      },
      {
        label: "Prompt design for business problems",
        previewCaption: "Prompt design preview",
      },
      {
        label: "Output evaluation & quality checks",
        previewCaption: "Output evaluation preview",
      },
      {
        label: "AI risk identification",
        previewCaption: "AI risk identification preview",
      },
      {
        label: "Applying AI to your operations",
        previewCaption: "Operations application preview",
      },
    ],
  },
  breakdown: {
    heading: "Course breakdown",
    intro:
      "Access tiers (AI Literacy / Business Growth / Advanced) unlock increasing depth within these modules.",
    items: [
      {
        title: "Foundation",
        description:
          "Terminology, capabilities, and limits. What AI is and isn't good for today.",
      },
      {
        title: "Prompt Mastery",
        description:
          "Frameworks for writing prompts that return useful output on the first try.",
      },
      {
        title: "Output Evaluation",
        description:
          "Judge AI work against your own quality bar. Spot hallucination, drift, and bluffing.",
      },
      {
        title: "Risk & Ethics",
        description:
          "Where AI is safe and where it isn't. How to set guardrails for your team.",
      },
      {
        title: "Application",
        description:
          "Map AI to your own SOPs across sales, ops, customer service, finance, and management.",
      },
    ],
  },
  sampleMaterials: [
    {
      title: "Curriculum map extract",
      caption: "A visual index of every module and the skills each builds.",
    },
    {
      title: "Explainer video for the course",
      caption: "A short intro recorded by our lead instructor.",
    },
    {
      title: "Interactive activities example",
      caption:
        "Exercises where owners evaluate AI output against a rubric they build themselves.",
    },
    {
      title: "Built-in AI practice workbench",
      caption:
        "A sandbox where owners practice prompting and evaluation on realistic business scenarios.",
    },
  ],
  outcomes: {
    heading: "Outcomes",
    items: [
      "Direct AI work with the judgment of someone trained on AI risk.",
      "Write prompts that return usable output the first time.",
      "Spot low-quality or risky AI output before it reaches a customer.",
      "Apply AI to a named operation (sales, ops, finance, CS) by course end.",
    ],
  },
  testimonial: {
    heading: "What owners are saying",
    // SAMPLE testimonial — replace with real attribution.
    content: {
      quote:
        "We stopped guessing about AI. Six weeks in, my team writes better prompts than our last consultant did.",
      authorName: "Jane Doe",
      authorRole: "Owner",
      authorCompany: "[Company]",
    },
  },
  finalCta: {
    heading: "Let's talk about your team",
    secondaryCtaLabel: "Book a call",
    secondaryCtaHref: "/contact",
    disclaimerHtml:
      'By submitting this form you agree to our <a href="/privacy-policy" class="underline">Privacy Policy</a>. This site is protected by reCAPTCHA.',
  },
};

export default function BusinessOwnersMorePage() {
  return (
    <main>
      <CaseStudyHero content={content.hero} />
      <CaseStudyProse content={content.whoItsFor} />
      <CaseStudyProse content={content.goal} />
      <CaseStudyProse content={content.challenges} />
      <CaseStudyProse content={content.approach} />
      <CaseStudyTabs
        heading={content.whatYouGet.heading}
        items={content.whatYouGet.items}
      />
      <CaseStudyBreakdown
        heading={content.breakdown.heading}
        intro={content.breakdown.intro}
        items={content.breakdown.items}
      />
      <CaseStudyMediaShowcase
        id="sample-materials"
        items={content.sampleMaterials}
      />
      <CaseStudyResults
        heading={content.outcomes.heading}
        items={content.outcomes.items}
      />
      <CaseStudyTestimonial
        heading={content.testimonial.heading}
        content={content.testimonial.content}
      />
      <CaseStudyFinalCTA content={content.finalCta} />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/business-owners-more/page.tsx
git commit -m "feat(business-owners-more): add audience page composed from case-study components"
```

---

## Task 15: Verify everything builds and renders

**Files:** (verification only — no edits unless failures)

- [ ] **Step 1: TypeScript + production build**

Run: `npm run build`
Expected: build completes with no type errors. If errors point to files in this plan, read the error, fix the exact issue in the referenced file, and re-run.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no new errors introduced by the files in this plan.

- [ ] **Step 3: Dev server manual QA**

Run: `npm run dev`

In a browser at `http://localhost:3000`:

1. Confirm the homepage "Courses built for all stages" section rows hover-highlight as rounded containers (already verified in Task 2 — re-verify since we later navigate away).
2. Click the **Business Owners** row. The URL becomes `/business-owners-more` and the page renders.
3. On `/business-owners-more`, confirm each section renders top-to-bottom:
   - Dark hero with breadcrumb, title, `View demo` button, meta rows, image.
   - Four prose sections: Who this is for, The goal (image left), The challenges (image right), Our approach (image right).
   - "What you get" with 5 tabs on the left; clicking each tab swaps the caption on the right placeholder.
   - "Course breakdown" with 5 numbered cards inside a scrollable panel.
   - "Sample materials" section — four stacked items, each with a placeholder tile.
   - `View demo` in the hero scrolls to the Sample materials section.
   - "Outcomes" list with arrow bullets.
   - Testimonial block with quote and attribution.
   - Dark final CTA with heading, `Book a call` pill, and visual-only form.
4. Resize the window to mobile width (~375px): confirm each section collapses to a single column and remains readable.
5. Click `Book a call` — expected: navigates to `/contact`.
6. Click the privacy policy link in the disclaimer — expected: navigates to `/privacy-policy`.

- [ ] **Step 4: Stop the dev server**

If anything above fails, fix the specific file flagged, re-run `npm run build` + `npm run dev`, and re-verify only the broken item.

- [ ] **Step 5: Final commit if any fixes were needed**

If no fixes were required, skip this step. Otherwise:

```bash
git add <files changed during verification>
git commit -m "fix(case-study): post-build verification fixes"
```

---

## Done criteria

- Each of the four Differentiators rows hover-highlights as a rounded container and is clickable as a single surface.
- Clicking the Business Owners row or its "More" button lands on `/business-owners-more`.
- `/business-owners-more` renders every section in the design spec, top to bottom.
- `npm run build` succeeds with no type errors.
- `npm run lint` reports no new errors.
- All placeholder media tiles render as labeled gray blocks; testimonial is marked `SAMPLE` in code.
