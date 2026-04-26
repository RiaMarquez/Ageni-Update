# Business Owners — "More" Audience Page & Differentiators Hover

**Date:** 2026-04-25
**Status:** Approved design
**Scope phase:** First of four planned audience pages (Business Owners → University Students → Professionals & Employees → Enterprise Teams). Only Business Owners is in scope here; the shared components introduced are intended to be reused for the other three pages later.

---

## 1. Problem

1. The `Differentiators` section on the homepage presents four audience cards. Each card's **More** button links to `#contact`, which is a dead anchor — nothing happens on click.
2. The cards do not communicate which row is targetable on hover. In the reference, hovering a row highlights it as a single rounded container; Ageni's version shows only a divider line.
3. Business Owners need a dedicated page that explains what the course covers, how access works, and what outcomes to expect — modelled on the Blue Carrot "Studio SE" case-study layout, but with Ageni content about the Business Owners segment.

## 2. Goals

- Wire each Differentiators row as a single clickable surface with a rounded-container hover state.
- Ship a first-draft Business Owners audience page at `/business-owners-more` following the Blue Carrot case-study section structure, using Ageni's design tokens.
- Build the page from small, reusable section components so the three remaining audience pages become low-effort follow-ups.

## 3. Non-goals

- Building the University Students, Professionals & Employees, or Enterprise Teams pages.
- Wiring the bottom CTA form to a backend. The form is visual-only for this phase (matches the reference site's behavior).
- Producing final photography, videos, or diagrams. The four "sample materials" blocks render as gray placeholder tiles with captions and inline `TODO` markers.
- Rewriting or removing the existing homepage `CTABanner` / `#contact` section if one exists.

## 4. Architecture

### 4.1 Shared component library — `src/components/case-study/`

Eight focused components. Each has a single job, no cross-concerns, and accepts plain data props so a page can be assembled declaratively.

| Component           | Responsibility                                                                   |
| ------------------- | -------------------------------------------------------------------------------- |
| `Breadcrumb`        | "Homepage > Audiences > Business Owners" link chain                              |
| `Hero`              | Dark hero: title, CTA pill, meta table (3 rows), hero image                      |
| `Prose`             | Single-column titled text section (used for About / Goal / Challenges / Approach) |
| `Tabs`              | Left-aligned vertical tabs that swap a preview image on the right                 |
| `Breakdown`         | Numbered scrollable cards (vertical list with a scrollbar indicator)              |
| `MediaShowcase`     | Title + caption + media tile (image or video or placeholder block)                |
| `Results`           | Titled bullet list with accent icons                                              |
| `Testimonial`       | Quote block + attribution                                                         |
| `FinalCTA`          | Dark banner with heading, visual-only contact form, and "Book a call" pill        |

Per-page data lives inside the page file as a typed content object. No MDX, no CMS.

### 4.2 Route — `src/app/business-owners-more/page.tsx`

- Single `page.tsx` that imports the case-study components and composes them.
- Content (strings, meta rows, tab items, breakdown items, results, testimonial) lives in a `const content` object at the top of the file.
- Uses the existing root `layout.tsx` (inherits Navbar, Footer, global styles).

### 4.3 Differentiators — `src/components/sections/Differentiators.tsx` + `src/lib/constants.ts`

- Add optional `href` field to each `DIFFERENTIATORS` entry in `src/lib/constants.ts`. Business Owners → `/business-owners-more`. The other three → `#contact` for now (keeps current behavior until their pages exist).
- In `Differentiators.tsx`, wrap the row grid in a Next `<Link>` pointing to `item.href ?? "#contact"`.
- On hover: container gets `rounded-3xl bg-dark/[0.04]`, horizontal padding `px-6`, and the bottom divider fades to transparent. Transition `all 300ms ease`.
- `More` and `View demo` links inside the row keep an `onClick={(e) => e.stopPropagation()}` so they remain independently clickable.

## 5. Page content (initial draft)

All copy is a first-pass draft the user will review on the page itself.

### 5.1 Breadcrumb
`Homepage > Audiences > Business Owners` (the "Audiences" crumb is non-clickable for now — no audiences index page exists).

### 5.2 Hero
- Background: `var(--color-accent)` (#1E293B)
- Title: **"Business Owners — AI that actually runs your operations"**
- CTA: mint-primary pill labeled `View demo`, links to `#sample-materials` on-page (scrolls to sample materials), since there is no dedicated demo URL yet.
- Meta table:
  - **Audience:** Business Owners
  - **Format:** Self-paced online
  - **Access tiers:** AI Literacy / Business Growth / Advanced
- Image: `/media/cards/business-owners.png` (already in repo).

### 5.3 Who this is for (Prose)
One paragraph: owner-operators who need their team — and themselves — using AI well, without hiring a technical lead or adding six weeks of engineering training to everyone's calendar.

### 5.4 The goal (Prose + small image, image on the LEFT)
Graduate with the judgment to direct AI work, evaluate output quality, and apply AI across sales, ops, customer service, finance, and management — at a price point a small business can justify.

### 5.5 The challenges (Prose + small image, image on the RIGHT)
Four pain points, written as a paragraph (not a bullet list, matching reference):
1. No time for courses built for engineers.
2. Can't tell good AI output from confident-sounding wrong answers.
3. Unclear where AI is safe vs. risky.
4. Tools change faster than training materials.

### 5.6 Our approach (Prose + small image, image on the RIGHT — matching reference)
Short paragraph: no-code, operations-first, tiered access so owners pay for the depth they need, hands-on prompt and evaluation practice over theory.

All "small image" placeholders in sections 5.4–5.6 render as `aspect-[16/9]` gray `rounded-xl` tiles (`bg-dark/[0.04]`) with a tiny caption label, so the layout holds its shape without real assets.

### 5.7 What you get — Tabs section
Left-side tab list (5 pillars). Right side swaps to a captioned image when a tab is clicked. Active tab styled with primary-mint left border.

1. AI literacy foundations
2. Prompt design for business problems
3. Output evaluation & quality checks
4. AI risk identification
5. Applying AI to your operations

For this draft, right-side preview is a gray placeholder block with the pillar name as caption. Note `TODO: replace with final asset per pillar`.

### 5.8 Course breakdown — Breakdown section
Numbered scrollable cards, ~5 visible at once with scroll:

1. **Foundation** — terminology, capabilities, limits
2. **Prompt Mastery** — frameworks for useful prompts
3. **Output Evaluation** — judging AI work against your standards
4. **Risk & Ethics** — when not to trust AI
5. **Application** — mapping AI to your SOPs

Intro sentence above the cards notes that access tiers (Literacy / Growth / Advanced) unlock increasing depth within these modules.

### 5.9 Sample materials — MediaShowcase section
Four stacked blocks, each a caption + gray placeholder tile marked `TODO: replace with final asset`:

- **Curriculum map extract**
- **Explainer video for the course**
- **Interactive activities example**
- **Built-in AI practice workbench**

The `View demo` CTA in the hero anchors to the container around these blocks (`id="sample-materials"`).

### 5.10 Outcomes — Results section
- Direct AI work with the judgment of someone trained on AI risk.
- Write prompts that return usable output the first time.
- Spot low-quality or risky AI output before it reaches a customer.
- Apply AI to a named operation (sales, ops, finance, CS) by course end.

### 5.11 What owners are saying — Testimonial
Drafted placeholder, marked `SAMPLE` in a code comment so it's easy to find-and-replace:

> "We stopped guessing about AI. Six weeks in, my team writes better prompts than our last consultant did."
> — Jane Doe, Owner, [Company]

### 5.12 Final CTA — FinalCTA section
- Background: dark (`var(--color-accent)`)
- Heading: **"Let's talk about your team"**
- Form fields (visual only, no submit handler; inputs have `name` attributes for future wiring): Name, Email, Company (optional), Brief description. Submit button: `Send`.
- Secondary CTA: `Book a call` pill next to the form. Links to the existing `/contact` page.
- Small print below, matching the reference's "By submitting this form..." disclaimer — drafted generically with a link to `/privacy-policy` (existing route). The reference's "Terms of Service" link is omitted since no `/terms` route exists yet.

## 6. Styling

- **Colors:** Use existing Tailwind tokens (`bg-dark`, `bg-accent`, `text-primary`, `bg-primary`, `bg-light`). No new colors introduced.
- **Fonts:** `font-title` for section headings, default body font elsewhere. Italic emphasis with `<em className="italic text-primary">` matches existing patterns (e.g., Differentiators header).
- **Spacing:** `py-20 lg:py-28` for major sections, matching existing `SectionWrapper` defaults.
- **Container:** `mx-auto max-w-[1500px] px-[26px]` on section wrappers, matching existing sections.

## 7. Dependencies

No new npm packages. Uses already-installed `next/image`, `next/link`, `framer-motion`, `lucide-react`.

## 8. Testing / verification

- Manual: dev server, visit `/`, confirm the four Differentiators rows hover-highlight as rounded containers and that `More` / the whole row on Business Owners navigates to `/business-owners-more`.
- Manual: at `/business-owners-more`, scroll through the page and confirm each section renders with the correct content, fonts, spacing, and that the "View demo" CTA in the hero scrolls to the sample-materials block.
- Manual: tab swap in "What you get" swaps the preview block without full page jump.
- TypeScript: `tsc --noEmit` clean (or equivalent `next build` clean).
- Responsive: spot-check mobile (single column), tablet, and desktop.

## 9. Risks

- **Content drift:** placeholder gray blocks for sample materials may look unfinished in review. Mitigated by labeled captions and a short intro sentence.
- **Form is visual-only:** users could try to submit and get no feedback. Mitigated by `<form>` having no action/handler and the submit button being a plain button (no submit behavior) until wiring is added.
- **Shared components over-abstracted:** if later audience pages diverge in structure, components may need reshaping. Acceptable — refactor when the second page is built, with concrete requirements.

## 10. Out of scope / follow-ups

- University Students, Professionals & Employees, Enterprise Teams pages (each is a short follow-up using the same components and a per-page content object).
- Final assets (curriculum map SVG, explainer video, interactive activity screenshots, simulator screenshot).
- Real testimonials with real names and company attributions.
- Form submission handling (email, CRM, etc.).
- `/audiences` index page (would make the breadcrumb clickable).
