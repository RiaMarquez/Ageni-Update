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
  description: string;
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
