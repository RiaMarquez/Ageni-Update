import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import AboutTeam from "@/components/sections/AboutTeam";
import ServiceCards from "@/components/sections/ServiceCards";
import CTABanner from "@/components/sections/CTABanner";

import Numbers from "@/components/sections/Numbers";
import Advisory from "@/components/sections/Advisory";
import Differentiators from "@/components/sections/Differentiators";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Pricing from "@/components/sections/Pricing";
import ContactCTA from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main className="relative z-10 rounded-b-[2.5rem] bg-light">
      <Hero />
      <TrustBar />
      <AboutTeam />
      <ServiceCards />
      <CTABanner />

      <Numbers />
      <Advisory />
      <Differentiators />
      <Testimonials />
      <FAQ />
      <Pricing />
      <ContactCTA />
    </main>
  );
}
