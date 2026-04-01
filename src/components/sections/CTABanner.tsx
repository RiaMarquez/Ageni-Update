import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="bg-dark py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Want to upskill your workforce? Tell us about your training needs, and
          we&apos;ll find the right program during our consultation.
        </h2>
        <div className="mt-8">
          <Button href="#contact" variant="primary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
