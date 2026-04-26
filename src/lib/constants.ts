/* ------------------------------------------------------------------ */
/*  Navigation                                                        */
/* ------------------------------------------------------------------ */

export const NAV_LINKS = [
  { label: "Services", href: "#", hasDropdown: true },
  { label: "Partnerships", href: "/partnerships", disabled: true },
  { label: "About", href: "/about", disabled: true },
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

/* ------------------------------------------------------------------ */
/*  FAQ                                                               */
/* ------------------------------------------------------------------ */

export const FAQ_ITEMS = [
  {
    question: "What is ageni.ai?",
    answer:
      "ageni.ai is Iozera's AI learning platform. It delivers two products on a single engine: AI Literacy — structured courses that train business owners and employees to use AI effectively in daily work — and Custom Job Skills Training — job-specific programs built from a company's own SOPs and workflows. Both are powered by AI avatar tutors and the Progressive Mastery Assessment (PMA) system.",
  },
  {
    question: "How is mastery verified?",
    answer:
      "Through the Progressive Mastery Assessment (PMA). For every concept, the engine starts with 3 dynamically generated questions and expands — to 6, 9, up to 200 — until understanding is demonstrated. The learner then enters Performance Validation: a real scenario where they evaluate an AI output, solve a novel problem, or defend a decision. Only two states exist: mastered, or not yet mastered. No percentage scores, no rankings, no advancement past an unresolved gap.",
  },
  {
    question: "Which AI tools does the curriculum cover?",
    answer:
      "The AI Literacy curriculum is built around 10 core AI tools defined in collaboration with Iozera leadership and is updated as tools and best practices change. Coverage includes how LLMs work at a practical level, prompt design, critical evaluation of AI outputs, applying AI to sales / operations / customer service / finance, and responsible-use considerations. All hands-on work happens on live AI platforms — not simulations.",
  },
  {
    question: "How much does it cost?",
    answer:
      "AI Literacy has three tiers per learner: $100 (AI Literacy), $500 (AI Literacy + Business Growth), and $1,000 (Advanced). Philippines market pricing is $50 per learner for the base tier. Custom Job Skills Training is priced per engagement based on number of roles, concepts, and employee volume. There are no subscriptions, hidden fees, or per-seat software licenses.",
  },
  {
    question: "Who is ageni.ai built for?",
    answer:
      "Business owners and HR leaders enrolling employees are the primary audience. Enterprises with high-volume onboarding needs are the audience for Custom Job Skills Training — companies that need to train service technicians, operations staff, or customer-facing employees consistently across locations. University students are a secondary market, accessed through institution-issued coupon codes.",
  },
  {
    question: "What is Custom Job Skills Training?",
    answer:
      "Job-specific training programs built from the client's own materials — SOPs, workflows, role definitions, and training standards. Iozera maps the roles, the curriculum is built from the company's own content (not generic), and the AI delivers it consistently to every employee in every location. PMA verification runs throughout, and the employer receives a verified mastery record per employee per role.",
  },
  {
    question: "How does the platform prevent assessment gaming or AI-assisted cheating?",
    answer:
      "Every question is dynamically generated and rephrased — no two learners receive the same assessment, so sharing answers has no value. Performance Validation is a live, interactive Socratic dialogue with real-time follow-up questions based on the learner's specific responses. Answers sourced from an external AI do not survive targeted follow-up questioning that probes for depth and original application. Mastery is also re-tested at 30, 60, and 90 days through spaced repetition.",
  },
  {
    question: "What do employers actually see in the dashboard?",
    answer:
      "The employer dashboard shows individual mastery data — which specific concepts each employee has mastered, which they have not yet mastered, and which certifications they have earned. It is intentionally not aggregated into completion percentages or course progress bars; the data is specific enough to act on. Detailed assessment interactions remain accessible to the learner, not exposed to the employer by default.",
  },
  {
    question: "How does ageni.ai compare to LinkedIn Learning, Coursera, or Udemy?",
    answer:
      "Most platforms have AI content; few verify that the learner can actually apply what they learned. ageni.ai is built around mastery-verified certification: anti-gaming dynamic assessment, performance validation as a required final stage, an individual-level employer mastery dashboard, and Custom Job Skills Training on the same platform. A learner is certified only after completing the full PMA sequence and passing performance validation — finishing a course is not enough.",
  },
  {
    question: "How is learner data handled?",
    answer:
      "ageni.ai collects only what is necessary for training and certification: course progress, assessment responses, and mastery records. Learner data is not sold or shared with third parties. The platform is designed for compliance with GDPR, the Philippine Data Privacy Act (RA 10173), and applicable national data protection laws per market. University students enrolled through institutional codes receive additional protections — no behavioral advertising, no sale of student data.",
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
