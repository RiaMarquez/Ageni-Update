# ageni.ai Website Rebuild — Design Spec

**Date:** 2026-04-01
**Project:** ageni.ai marketing website
**Location:** `C:\Users\ouimq\Desktop\Ageni-Update`
**Owner:** Timothy Ngo, Iozera Inc.

---

## 1. Overview

Rebuild the ageni.ai website as a rebrand of the existing Blue Carrot site (bluecarrot.io). The Blue Carrot site is the old website — retain its design patterns, layout structure, and section ordering as closely as possible. All content, branding, and visual direction are updated for the new ageni.ai identity, but the bones of the site remain the same.

**ageni.ai** is an AI-powered learning platform by Iozera Inc. with two products:
- **Product 1 — AI Literacy:** Structured courses training employees to use AI tools effectively. 4 audience tiers.
- **Product 2 — Custom Job Skills Training:** Job-specific training built from client SOPs/workflows, delivered via AI at scale.

Both products use AI avatar tutors, the Progressive Mastery Assessment (PMA) engine, and employer-facing mastery dashboards.

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS v3 |
| Output | Static export (`output: 'export'`) |
| Font | Inter (Google Fonts) |
| Animations | Framer Motion (click/scroll animations, modern dynamic feel) |
| Icons | Lucide React |
| Deployment | Static — Vercel, Netlify, or any static host |

No CMS. Content lives in code. Blog is placeholder for now.

---

## 3. Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#EBA536` | CTAs, highlights, active states, accent borders |
| `dark` | `#0A0A0A` | Hero backgrounds, headings, dark sections |
| `accent` | `#0F1B2D` | Card backgrounds, footer, secondary dark sections |
| `light` | `#FAFAFA` | Body backgrounds, text on dark |
| `muted` | `#6B7280` | Secondary text, borders, subtle elements |
| `white` | `#FFFFFF` | Card backgrounds on dark sections |

### Typography

- **Font family:** Inter
- **Headings:** Bold/Semibold, large sizes
- **Body:** Regular weight, `text-base` / `text-lg`
- **Style notes:** Clean, professional, generous whitespace. Dark sections with light text alternate with light sections with dark text.

### Component Style

- Cards with subtle borders, rounded corners (`rounded-xl`)
- Pricing cards: dark background (`accent`), featured card (Business Owner) with `primary` top border and white background — matching the screenshot provided
- Buttons: Rounded, `primary` fill for main CTAs, outline variants for secondary
- Smooth scroll-triggered and click animations via Framer Motion

---

## 4. Pages & Routing

### 4.1 Shared Components

**Navbar** (retains Blue Carrot's nav pattern):
- Logo (ageni.ai text/wordmark) — left-aligned
- Links: Our Work (future portfolio), Services (mega-menu dropdown — see below), Resources (dropdown: Articles, Guides), About, Blog
- **Sign In / Sign Up** button (primary color, right-aligned) — opens the Sign In/Sign Up page on click
- Mobile: hamburger menu with slide-in drawer
- Sticky on scroll with backdrop blur

**Services mega-menu dropdown** (matches Blue Carrot's 3-column dropdown pattern):
- Column 1 — **AI Literacy Training**: icon + label, sub-links anchor to homepage sections (`/#pricing`, `/#how-it-works`, `/#differentiators`)
- Column 2 — **Custom Job Skills Training**: icon + label, sub-links anchor to homepage sections (`/#service-pillars`, `/#industries`, `/#faq`)
- Sidebar — Company card with image, short description, "About us" link (same pattern as Blue Carrot's dropdown sidebar)

**Footer** (retains Blue Carrot's footer structure):
- **Column 1 — AI Literacy Training:** Anchor links to homepage sections (Pricing, How It Works, Certification/Differentiators)
- **Column 2 — Custom Job Skills Training:** Anchor links to homepage sections (Service Pillars, Industries, FAQ)
- **Column 3 — Resources:** Portfolio, Articles, Blog, Guides
- **Bottom row:** Newsletter email signup, social links (LinkedIn, etc.), contact info (email, phone), legal links (Privacy Policy)
- Copyright: Iozera Inc.
- Review badges row (placeholder): e.g. industry review sites, partner badges

---

### 4.2 Homepage (`/`)

Section ordering retains the Blue Carrot homepage flow: Hero → Trust Bar → Service Pillars → CTA Banner → Case Studies/How It Works → Numbers → Advisory → Testimonials → FAQ → Pricing → Contact.

**Section 1 — Hero** (matches Blue Carrot hero pattern)
- Headline: "Ageni is a virtual learning platform to power the next generation, wherever they might be."
- Subtext: "For students, professionals, founders, and business owners using AI in real work."
- Background video placeholder (user will upload later) — same looping background video pattern as Blue Carrot
- CTA: "Get Started" (primary) / "Book a Call" (outline)
- Dark background (`dark`)

**Section 2 — Trust / Logo Bar** (matches Blue Carrot's placement — immediately after hero)
Horizontal scrolling logo strip of partners/affiliations:
- University partners: Mapua, PUP, FEU, UE
- Company: Iozera Inc.
- Review/industry badges if available
- Light background, subtle separator from hero

**Section 3 — What We Offer (Two Service Pillars)** (retains Blue Carrot's two-column service layout)
Section heading: "We _train_ and _certify_ workforces" with "More about us" link.

Two side-by-side cards, each matching Blue Carrot's service card pattern (avatar/image + italic title + description paragraph + sub-links grid):

- **Card 1 — _AI Literacy_ Training**
  - Avatar/illustration image (placeholder)
  - Description: "Structured courses training employees to use AI tools effectively. From prompt engineering to workflow automation, across 4 audience tiers from $100–$1,000. Mastery-verified certification."
  - Sub-links grid (anchor to homepage sections): Pricing, How It Works, Certification, PMA Assessment
  - CTA links to Sign Up page

- **Card 2 — _Custom Job Skills_ Training**
  - Avatar/illustration image (placeholder)
  - Description: "Job-specific training programs built from your own SOPs and workflows. AI-delivered at any scale with employer-facing mastery dashboards."
  - Sub-links grid (anchor to homepage sections): How It Works, Industries, FAQ, Contact
  - CTA links to Sign Up page

**Section 4 — CTA Banner** (retains Blue Carrot's mid-page CTA pattern)
Full-width banner between service pillars and case studies:
"Want to upskill your workforce? Tell us about your training needs, and we'll find the right program during our consultation."
- CTA: "Contact us" (primary)
- Dark background

**Section 5 — How It Works** (maps to Blue Carrot's case studies position)
Section heading: "How It Works" with visual cards matching Blue Carrot's case study card style (image + title + category tag + description + CTA):

3-step visual cards:
1. **Enroll** — Access via coupon code, agent, or direct signup
2. **Learn** — AI avatar tutor, self-paced, on any device
3. **Prove Mastery** — PMA assessment, performance validation, certification

**Section 6 — Industries**
Grid of industry cards/icons showing sectors served:
- Enterprise / Corporate
- Education / Universities
- BPO / Operations
- Healthcare
- Finance / Fintech
- Technology / SaaS
- Government / NGO
- Manufacturing

**Section 7 — Numbers / Stats** (retains Blue Carrot's "Numbers" section)
Key metrics displayed as large numbers with labels:
- Founding year or launch stat
- Number of university partners
- Audience tiers served
- Additional stat (e.g. "4 audience tiers", "AI-powered assessment")

Followed by a short paragraph about ageni.ai's scale/vision (mirrors Blue Carrot's description paragraph under their numbers).

**Section 8 — Advisory / Team Quote** (retains Blue Carrot's advisory section)
Quote card with team member photo:
- Quote from CEO Timothy Ngo about ageni.ai's mission/approach
- Name, title, photo
- Background context paragraph about the platform's design philosophy
- Light background section

**Section 9 — Key Differentiators**
4-card grid:
- Mastery-verified certification (not just completion)
- Anti-gaming dynamic assessment
- Employer mastery dashboard
- Device-agnostic, self-paced

**Section 10 — Testimonials** (retains Blue Carrot's carousel pattern)
Carousel with testimonial cards: photo, name, title/company, quote.
Manual prev/next controls + auto-play.
Placeholder content for launch.

**Section 11 — FAQ** (retains Blue Carrot's accordion pattern)
Accordion component. Questions sourced from white paper:
- How does the PMA assessment work?
- What AI tools does the curriculum cover?
- How is ageni.ai different from LinkedIn Learning or Coursera?
- Is the certification verifiable?
- How does Custom Job Skills training work?

**Section 12 — Pricing CTA**
4 pricing cards (matching the screenshot design — dark bg, featured card highlighted):

| Tier | Price | Model | Notes |
|------|-------|-------|-------|
| Business Owner | $1,000 | Full course price | ONE-TIME, NO RENEWAL. Agent gives free pass. Featured card. |
| Students | $750 | Full course price | ONE-TIME, NO RENEWAL. University coupon code. |
| General Public | $750 | Full course price | ONE-TIME, NO RENEWAL. |
| Employee Upskilling | $100 | Per employee | ONE-TIME, NO RENEWAL. Paid by business after owner completes. |

Commission note: "$10 per enrolled student. Volume discounts available for enterprise."
Each card has "Enroll Now" CTA.

**Section 13 — Contact / CTA** (retains Blue Carrot's bottom contact pattern)
"Let's talk about your training needs"
- Left side: Contact form — Name, Email, Company (optional), Message, Send button
- Right side: "Book a Call" link (Calendly)
- Below form: Review badges row (industry review sites, partner badges — placeholder)
- Privacy/consent note under form (matches Blue Carrot's form footer)
- Success state: "Thank you for your inquiry — we will reply within 24 hours" modal

---

### 4.3 Sign In / Sign Up (`/auth`)

A dedicated authentication page with two modes toggled via tabs or a link:

**Sign In mode (default):**
- Email input
- Password input
- "Forgot password?" link
- "Sign In" button (primary)
- "Don't have an account? Sign Up" link to toggle to Sign Up mode

**Sign Up mode:**
- Full Name input
- Email input
- Password input
- Confirm Password input
- Role selector (Business Owner, Student, Employee, General Public)
- "Sign Up" button (primary)
- "Already have an account? Sign In" link to toggle to Sign In mode

**Design notes:**
- Centered card layout on dark (`dark`) background
- ageni.ai logo above the card
- Framer Motion fade/slide transition between Sign In and Sign Up modes
- Social sign-in buttons (Google) below form — placeholder for future OAuth
- Form validation with inline error messages
- On successful sign-up, redirect to a welcome/onboarding placeholder page
- This page is the target for the navbar "Sign In / Sign Up" button and all "Enroll Now" / "Get Started" CTAs

---

### 4.4 Partnerships (`/partnerships`)

1. Hero — "Partner with ageni.ai"
2. University partnerships — Current partners (Mapua, PUP, FEU, UE), how it works for institutions, student credential value
3. Agent network — Distribution model, commission structure
4. CTA — Become a partner / Contact us

---

### 4.5 About (`/about`)

1. Hero — Iozera Inc. and ageni.ai story
2. Mission — "Solve two problems: AI literacy gap + broken job training at scale"
3. Design principles — The 6 principles from the white paper
4. Team — CEO Timothy Ngo + key roles (placeholder cards)
5. CTA — Join us / Contact

---

### 4.6 Blog (`/blog`)

1. Grid layout for article cards (thumbnail, title, category, date)
2. Category filters
3. "Coming soon" placeholder state for launch

---

### 4.7 Contact (`/contact`)

1. Contact form (Name, Email, Company, Message)
2. Book a Call — Calendly embed or link
3. Contact info — Email, phone numbers
4. Social links

---

### 4.8 Privacy Policy (`/privacy-policy`)

Standard legal content page. GDPR, Philippine Data Privacy Act compliance language from white paper.

---

## 5. Animations & Interactions

- **Framer Motion** for all animations
- Scroll-triggered fade-in/slide-up for sections
- Click animations on buttons (scale + color transition)
- Navbar: backdrop blur on scroll, smooth hide/show
- FAQ accordion: smooth expand/collapse
- Pricing cards: hover lift effect
- Testimonial carousel: auto-play with manual controls
- Mobile menu: slide-in drawer with overlay
- Page transitions: subtle fade

---

## 6. File Structure

```
Ageni-Update/
├── public/
│   ├── images/          # Logos, partner logos, team photos
│   └── videos/          # Hero video (added later)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (navbar + footer)
│   │   ├── page.tsx             # Homepage
│   │   ├── auth/
│   │   │   └── page.tsx
│   │   ├── partnerships/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── privacy-policy/
│   │       └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Accordion.tsx
│   │   │   └── SectionWrapper.tsx  # Scroll animation wrapper
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── TrustBar.tsx
│   │       ├── ProductPillars.tsx
│   │       ├── CTABanner.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── Industries.tsx
│   │       ├── Numbers.tsx
│   │       ├── Advisory.tsx
│   │       ├── Differentiators.tsx
│   │       ├── Testimonials.tsx
│   │       ├── FAQ.tsx
│   │       ├── Pricing.tsx
│   │       └── ContactCTA.tsx
│   └── lib/
│       └── constants.ts         # Site-wide content, links, pricing data
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-04-01-ageni-website-design.md
```

---

## 7. Content Source

All content is derived from:
- The ageni.ai White Paper (Version 1.4, March 2026)
- User-provided hero text and pricing screenshot
- Blue Carrot site (bluecarrot.io) — the old website being rebranded; layout, section ordering, and design patterns are retained

---

## 8. Out of Scope (for now)

- CMS integration
- Blog content (placeholder only)
- Authentication backend / user account persistence (sign-in/sign-up page is UI-only for now)
- Course platform / LMS functionality
- Payment processing
- Hero video (placeholder — user will provide)
- Team photos (placeholder cards)
