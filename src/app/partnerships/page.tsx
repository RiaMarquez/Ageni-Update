import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function PartnershipsPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Badge>Partnerships</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Partner with ageni<span className="text-primary">.ai</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            We collaborate with universities, organisations, and individuals to
            bring AI literacy to every corner of the workforce.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          {/* University Partnerships */}
          <div>
            <h2 className="text-3xl font-bold text-dark">
              University Partnerships
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              We work hand-in-hand with leading Philippine universities
              &mdash; Mapua University, Polytechnic University of the
              Philippines (PUP), Far Eastern University (FEU), and the
              University of the East (UE) &mdash; to embed AI literacy directly
              into their programs. Through co-developed curricula, campus
              workshops, and certification pathways, we ensure students graduate
              with the practical AI skills employers are looking for.
            </p>
          </div>

          {/* Agent Network */}
          <div>
            <h2 className="text-3xl font-bold text-dark">Agent Network</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Our Agent Network empowers individuals and organizations to spread
              AI literacy while earning. As an ageni.ai agent, you receive a
              unique referral link and earn a $10 commission for every learner
              you bring on board who completes a certification. It&apos;s a
              win-win: you grow your network, and more people gain the AI skills
              they need to thrive.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Button href="/contact">Become a Partner</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
