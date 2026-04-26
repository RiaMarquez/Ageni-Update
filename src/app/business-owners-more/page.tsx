import type { Metadata } from "next";
import {
  CaseStudyHero,
  CaseStudyProse,
  CaseStudyTabs,
  CaseStudyBreakdown,
  CaseStudyMediaShowcase,
  CaseStudyResults,
  CaseStudyTestimonial,
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
      "By the end, an owner can look at AI output and know whether it's any good — what to keep, what to throw out, and what to send back. They can prompt for the answers they actually need, point their team at the right tools for the right tasks, and apply AI where it moves the needle: sales, ops, customer service, finance, and the day-to-day calls that keep the company running. Priced for a small business, not an enterprise procurement budget.",
    imageSide: "left" as const,
    image: { alt: "Course goal illustration", caption: "Course goal" },
  },
  challenges: {
    heading: "The challenges",
    body:
      "Most AI courses are written for engineers. That doesn't help the owner running a business. Owners aren't training models, they're trying to close deals, write next quarter's plan, and keep customer service from drowning. The way most courses grade is part of the problem too. An owner scores 70%, gets passed, and the 30% they missed quietly carries forward to the next module. Six months later it shows up as a bad decision they didn't see coming. The tools keep moving on top of all that. The way ChatGPT was prompted in January isn't how it should be prompted today, and the owner down the street probably already knows that. None of it even touches the trust gap — knowing when AI is right, when it's confidently wrong, and when it shouldn't be used at all. That's the gap this course is built to close.",
    imageSide: "right" as const,
    image: { alt: "Challenges illustration", caption: "Owner challenges" },
  },
  approach: {
    heading: "Our approach",
    body:
      "The course is built like an owner's day — short, hands-on, and rooted in real decisions. No engineering background needed and no theory for theory's sake. Every module asks the owner to do something with AI, then pushes them on it: write the prompt, evaluate the output, decide whether to ship it. Mastery is the bar — owners only move on once a concept is genuinely understood, not when they've scraped together enough partial credit. And the tiered access (AI Literacy, Business Growth, Advanced) lets an owner pay for the depth the business actually needs, not a one-size course wrapped in marketing.",
    imageSide: "right" as const,
    image: { alt: "Approach illustration", caption: "Our approach" },
  },
  whatYouGet: {
    heading: "What we did",
    items: [
      {
        label: "AI literacy foundations",
        previewCaption: "AI literacy foundations preview",
        previewSrc: "/media/business-owners-more/tab-ai-literacy.png",
        description:
          "We start owners with the vocabulary, capabilities, and limits of modern AI — what it can actually do for a small business today, and where the hype falls apart. No engineering background required, no jargon left undefined.",
      },
      {
        label: "Prompt design for business problems",
        previewCaption: "Prompt design preview",
        previewSrc: "/media/business-owners-more/tab-prompt-design.png",
        description:
          "Hands-on practice writing prompts that return usable answers the first time. Owners work through real business scenarios — sales emails, supplier negotiations, customer service drafts — and learn the patterns that consistently produce good output.",
      },
      {
        label: "Output evaluation & quality checks",
        previewCaption: "Output evaluation preview",
        previewSrc: "/media/business-owners-more/tab-output-evaluation.png",
        description:
          "AI is confident even when it's wrong. We teach owners how to judge AI output against their own quality bar, spot hallucinations and fabrications, and decide when output is ready to ship versus when it needs another pass.",
      },
      {
        label: "AI risk identification",
        previewCaption: "AI risk identification preview",
        previewSrc: "/media/business-owners-more/tab-risk-identification.png",
        description:
          "Where AI is safe to use and where it isn't — privacy, accuracy, legal exposure, brand voice. Owners leave with a working framework for setting guardrails on their team's AI usage without slowing the business down.",
      },
      {
        label: "Applying AI to your operations",
        previewCaption: "Operations application preview",
        previewSrc: "/media/business-owners-more/tab-application.png",
        description:
          "By the final module, owners map AI to their own SOPs across sales, ops, customer service, finance, and management. Every owner finishes the course with a named operation they've already accelerated using AI — not a theoretical plan.",
      },
    ],
  },
  breakdown: {
    heading: "Course breakdown",
    intro:
      "Ten tools, ten modules. Each one mapped to how a business owner actually uses AI day-to-day — across content, ops, sales, research, and decisions you make every week.",
    items: [
      {
        title: "ChatGPT — LLM",
        description:
          "Your daily assistant. Draft emails, summarise meetings, brainstorm strategy, and get up to speed on any topic in minutes — without a research team.",
      },
      {
        title: "Google Veo — Video Gen",
        description:
          "Turn a prompt into polished video. Generate ads, social reels, and explainers without booking a studio or hiring an editor.",
      },
      {
        title: "Claude Code — Coding LLM",
        description:
          "Automate the tedious. Pull data from spreadsheets, write internal scripts, and ship small tools your team uses every day — even if you don't code.",
      },
      {
        title: "Perplexity — Research",
        description:
          "Real-time research with cited sources. Market scans, competitor checks, and due diligence in the time it used to take to open the browser.",
      },
      {
        title: "Gemini — Image",
        description:
          "Generate marketing visuals, product mockups, and social-ready imagery from a description. Skip the freelance brief.",
      },
      {
        title: "Midjourney — Image Pro",
        description:
          "Agency-grade creative for brand campaigns, pitch decks, and hero imagery. The look you'd outsource — produced inside your business.",
      },
      {
        title: "Cursor — AI IDE",
        description:
          "An AI pair programmer. Prototype features, fix bugs, and ship internal tools alongside your devs — or before you hire one.",
      },
      {
        title: "MiniMax / Hailuo — Applied Video",
        description:
          "AI video built for business — product demos, customer training, and explainer content delivered at the speed you actually need it.",
      },
      {
        title: "Figma AI — Design",
        description:
          "From wireframe to production UI in one tool. Move fast on landing pages, decks, and brand assets without bouncing between three apps.",
      },
      {
        title: "OpenClaw — Agentic AI",
        description:
          "AI agents that act on your behalf. Automate outreach, lead qualification, scheduling, and reporting — workflows that used to need another hire.",
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
};

export default function BusinessOwnersMorePage() {
  return (
    <main>
      <CaseStudyHero content={content.hero} />
      <div className="bg-accent">
        <div className="overflow-hidden rounded-t-[3rem] sm:rounded-t-[4rem]">
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
        </div>
      </div>
    </main>
  );
}
