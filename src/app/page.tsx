import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ProductPillars from "@/components/sections/ProductPillars";
import CTABanner from "@/components/sections/CTABanner";
import HowItWorks from "@/components/sections/HowItWorks";
import Industries from "@/components/sections/Industries";
import Numbers from "@/components/sections/Numbers";
import Advisory from "@/components/sections/Advisory";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <ProductPillars />
      <CTABanner />
      <HowItWorks />
      <Industries />
      <Numbers />
      <Advisory />
    </main>
  );
}
