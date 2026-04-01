export default function PrivacyPolicyPage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="bg-dark py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Your privacy matters. This policy explains how ageni.ai collects,
            uses, and protects your personal data.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-6">
          {/* Data Collection */}
          <div>
            <h2 className="text-2xl font-bold text-dark">Data Collection</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              We collect information you provide directly &mdash; such as your
              name, email address, company name, and role &mdash; when you
              create an account, fill out a contact form, or enroll in a
              certification program. We also collect limited technical data
              (browser type, IP address, device information) automatically when
              you visit our platform to ensure functionality and improve user
              experience.
            </p>
          </div>

          {/* Data Use */}
          <div>
            <h2 className="text-2xl font-bold text-dark">Data Use</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Your data is used to deliver our services, personalise your
              learning experience, issue certifications, communicate important
              updates, and improve our platform. We never sell your personal
              data to third parties. Anonymised, aggregated data may be used for
              internal analytics and research purposes.
            </p>
          </div>

          {/* Data Protection */}
          <div>
            <h2 className="text-2xl font-bold text-dark">Data Protection</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              ageni.ai is committed to compliance with both the{" "}
              <strong>General Data Protection Regulation (GDPR)</strong> and the{" "}
              <strong>Philippine Data Privacy Act of 2012 (RA 10173)</strong>.
              We employ industry-standard security measures &mdash; including
              encryption in transit and at rest, access controls, and regular
              security audits &mdash; to safeguard your information against
              unauthorised access, loss, or misuse.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-bold text-dark">Your Rights</h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              You have the right to access, correct, or delete your personal
              data at any time. You may also withdraw consent for data
              processing, request data portability, or lodge a complaint with
              the relevant supervisory authority. To exercise any of these
              rights, please contact us at{" "}
              <a
                href="mailto:privacy@ageni.ai"
                className="font-medium text-primary hover:underline"
              >
                privacy@ageni.ai
              </a>
              .
            </p>
          </div>

          {/* Footer copyright */}
          <div className="border-t border-muted/20 pt-8">
            <p className="text-sm text-muted">
              &copy; {new Date().getFullYear()} ageni.ai by Iozera Inc. All
              rights reserved.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
