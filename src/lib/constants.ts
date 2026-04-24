/* ------------------------------------------------------------------ */
/*  Navigation                                                        */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Services", href: "#", hasDropdown: true },
  { label: "Partnerships", href: "/partnerships" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/#faq" },
] as const;

export const SERVICE_MENU = {
  columns: [
    {
      title: "AI Literacy Training",
      links: [
        { label: "Pricing", href: "/#pricing", desc: "Plans for individuals & teams" },
        { label: "How It Works", href: "/#how-it-works", desc: "Our three-step learning path" },
        { label: "Differentiators", href: "/#differentiators", desc: "What sets ageni apart" },
      ],
    },
    {
      title: "Custom Job Skills Training",
      links: [
        { label: "Service Overview", href: "/#service-pillars", desc: "Tailored AI skills programs" },
        { label: "Industries", href: "/#industries", desc: "Sector-specific training" },
        { label: "FAQ", href: "/#faq", desc: "Common questions answered" },
      ],
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/*  Trust / Logos                                                      */
/* ------------------------------------------------------------------ */

export const TRUST_LOGOS = [
  { name: "Mapua", src: "/media/logos/mapua-logo.png" },
  { name: "PUP", src: "/media/logos/PUPlogo.png" },
  { name: "DLSU", src: "/media/logos/dlsu-logo.png" },
  { name: "MFI", src: "/media/logos/mfi-logo.png" },
] as const;

/* ------------------------------------------------------------------ */
/*  Industries                                                        */
/* ------------------------------------------------------------------ */

export const INDUSTRIES = [
  { name: "Enterprise/Corporate", icon: "Building2" },
  { name: "Education/Universities", icon: "GraduationCap" },
  { name: "BPO/Operations", icon: "Headphones" },
  { name: "Healthcare", icon: "Heart" },
  { name: "Finance/Fintech", icon: "TrendingUp" },
  { name: "Technology/SaaS", icon: "Code" },
  { name: "Government/NGO", icon: "Landmark" },
  { name: "Manufacturing", icon: "Factory" },
] as const;

/* ------------------------------------------------------------------ */
/*  How It Works                                                      */
/* ------------------------------------------------------------------ */

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Enroll",
    description:
      "Sign up and choose the AI literacy track that fits your role, industry, or learning goals.",
  },
  {
    step: 2,
    title: "Learn",
    description:
      "Work through bite-sized, self-paced modules designed by AI education experts with real-world scenarios.",
  },
  {
    step: 3,
    title: "Prove Mastery",
    description:
      "Complete the Prompt Mastery Assessment (PMA) to earn a verified, employer-recognized certification.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Differentiators                                                   */
/* ------------------------------------------------------------------ */

export const DIFFERENTIATORS = [
  {
    title: "Business Owners",
    description:
      "Learn how to use AI tools to manage your business, evaluate AI-assisted work, and apply AI to your operations. Understand prompt design, output evaluation, and AI risk identification. Access through promotional codes at three tiers: AI Literacy, Business Growth, or Advanced.",
  },
  {
    title: "University Students",
    description:
      "Access AI literacy training through your university. Complete the curriculum and earn a credential that proves genuine competency to employers. Available through institution-issued codes. Opens pathways to roles across Iozera's portfolio companies and international markets.",
  },
  {
    title: "Professionals & Employees",
    description:
      "No technical background required. Learn to apply AI tools to real business functions—sales, operations, customer service, finance, management. Master prompt design, output evaluation, and AI risk identification at a price point businesses can justify.",
  },
  {
    title: "Enterprise Teams",
    description:
      "For business owners needing scalable job training solutions. Build programs from your own SOPs, workflows, and role definitions. Train employees consistently across all locations and receive verified mastery records per employee. Priced per engagement.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

export const FAQ_ITEMS = [
  {
    question: "What is the Prompt Mastery Assessment (PMA)?",
    answer:
      "The PMA is a rigorous, AI-proctored exam that evaluates your ability to write effective prompts, reason about AI outputs, and apply AI tools to real-world tasks. It goes beyond multiple choice — you demonstrate mastery through practical, scenario-based challenges.",
  },
  {
    question: "Which AI tools does the curriculum cover?",
    answer:
      "Our curriculum covers leading AI platforms including ChatGPT, Claude, Gemini, Midjourney, and industry-specific tools. We update content regularly so you are always learning with the latest models and best practices.",
  },
  {
    question:
      "How does ageni.ai compare to LinkedIn Learning or Coursera for AI training?",
    answer:
      "Unlike LinkedIn Learning or Coursera, ageni.ai focuses exclusively on verifiable AI mastery. Our PMA certification proves you can actually use AI — not just watch videos about it. Employers trust our credentials because of our anti-gaming assessment technology.",
  },
  {
    question: "How do employers verify a candidate's certification?",
    answer:
      "Each certification comes with a unique verification link and QR code. Employers can also use the Mastery Dashboard for real-time analytics on candidate and employee AI skill levels, including role-specific breakdowns.",
  },
  {
    question: "What are Custom Job Skills assessments?",
    answer:
      "Custom Job Skills lets organizations create role-specific AI assessments tailored to their workflows. Whether you need to evaluate prompt engineering for marketers, data analysts, or customer support teams, we build assessments that match your exact requirements.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Pricing                                                           */
/* ------------------------------------------------------------------ */

export const PRICING_TIERS = [
  {
    tag: "Most Popular",
    name: "Business Owner",
    price: "$1,000",
    priceNote: "one-time",
    description:
      "Full AI literacy certification for founders and executives who need to lead AI adoption.",
    features: [
      "Prompt Mastery Assessment (PMA)",
      "AI Strategy for Leaders module",
      "Employer Mastery Dashboard access",
      "Verified digital certificate & badge",
      "Priority support",
    ],
    featured: true,
  },
  {
    tag: "Academic",
    name: "Students",
    price: "$750",
    priceNote: "one-time",
    description:
      "Discounted certification track for university and college students building career-ready AI skills.",
    features: [
      "Prompt Mastery Assessment (PMA)",
      "Self-paced learning modules",
      "Verified digital certificate & badge",
      "Student community access",
      "Career resource pack",
    ],
    featured: false,
  },
  {
    tag: "Individual",
    name: "General Public",
    price: "$750",
    priceNote: "one-time",
    description:
      "For professionals and lifelong learners who want a recognized AI credential on their own terms.",
    features: [
      "Prompt Mastery Assessment (PMA)",
      "Self-paced learning modules",
      "Verified digital certificate & badge",
      "Community forum access",
      "Email support",
    ],
    featured: false,
  },
  {
    tag: "Teams",
    name: "Employee Upskilling",
    price: "$100",
    priceNote: "per employee",
    description:
      "Volume pricing for organizations upskilling teams with measurable AI competence.",
    features: [
      "Prompt Mastery Assessment (PMA)",
      "Custom learning paths",
      "Employer Mastery Dashboard",
      "Role-specific assessments",
      "Dedicated account manager",
    ],
    featured: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/* ------------------------------------------------------------------ */

export const FOOTER_COLUMNS = [
  {
    title: "AI Literacy Training",
    links: [
      { label: "Prompt Mastery Assessment", href: "#pma" },
      { label: "AI Foundations", href: "#ai-foundations" },
      { label: "AI for Business Leaders", href: "#ai-business" },
    ],
  },
  {
    title: "Custom Job Skills",
    links: [
      { label: "Role-Based Assessments", href: "#role-based" },
      { label: "Team Upskilling", href: "#team-upskilling" },
      { label: "Enterprise Packages", href: "#enterprise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Help Center", href: "#help" },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/company/ageni-ai", icon: "Linkedin" },
] as const;
