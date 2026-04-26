import Badge from "@/components/ui/Badge";

const team = [
  { name: "Timothy Ngo", role: "CEO & Founder" },
  { name: "Alex Rivera", role: "Head of Curriculum" },
  { name: "Mia Chen", role: "Lead Engineer" },
];

export default function AboutPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge>About Us</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Iozera Inc. &amp; ageni<span className="text-primary">.ai</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            We&apos;re on a mission to close the AI literacy gap worldwide
            &mdash; making cutting-edge artificial intelligence education
            accessible, practical, and certification-ready for everyone.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-dark">Our Mission</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The global workforce is rapidly transforming, yet most people lack
            the skills to work alongside AI systems confidently. Iozera Inc.
            created ageni.ai to bridge that gap &mdash; delivering structured AI
            literacy training, hands-on workshops, and industry-recognised
            certifications that prove real competence. Whether you&apos;re a
            student entering the workforce, a business owner optimizing
            operations, or an employee future-proofing your career, ageni.ai
            meets you where you are and takes you further.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-light py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold text-dark">
            Team
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border bg-white p-6 text-center"
              >
                {/* Photo placeholder */}
                <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-muted/10" />
                <h3 className="text-lg font-semibold text-dark">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
