import Badge from "@/components/ui/Badge";

export default function BlogPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge>Blog</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Articles &amp; Insights
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Expert perspectives on AI literacy, workforce transformation, and
            the future of learning.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-xl border bg-light p-12 text-center">
            <h2 className="text-2xl font-bold text-dark">Coming Soon</h2>
            <p className="mt-3 text-sm text-muted">
              We&apos;re preparing our first wave of articles. Check back soon
              for insights on AI trends, certification guides, and success
              stories from our learners.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
