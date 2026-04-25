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
