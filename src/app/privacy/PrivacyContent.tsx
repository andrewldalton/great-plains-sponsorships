"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const EFFECTIVE_DATE = "March 1, 2025";
const COMPANY_NAME = "Great Plains Sponsorships, Inc.";
const CONTACT_EMAIL = "andrew.dalton@greatplainssponsorships.com";
const WEBSITE = "greatplainssponsorships.com";

interface PolicySectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function PolicySection({ id, title, children }: PolicySectionProps) {
  return (
    <div id={id} className="scroll-mt-24">
      <AnimatedSection>
        <h2 className="text-xl font-bold text-gps-slate mb-4 pb-3 border-b border-gps-green/10">
          {title}
        </h2>
        <div className="space-y-4 text-gps-gray leading-relaxed">
          {children}
        </div>
      </AnimatedSection>
    </div>
  );
}

const tocItems = [
  { href: "#information-we-collect", label: "Information We Collect" },
  { href: "#how-we-use-information", label: "How We Use Your Information" },
  { href: "#data-retention", label: "Data Retention" },
  { href: "#no-sale-of-data", label: "No Sale of Personal Data" },
  { href: "#third-party-services", label: "Third-Party Services" },
  { href: "#childrens-privacy", label: "Children's Privacy" },
  { href: "#nebraska-rights", label: "Nebraska Privacy Rights" },
  { href: "#data-security", label: "Data Security" },
  { href: "#changes-to-policy", label: "Changes to This Policy" },
  { href: "#contact-us", label: "Contact Us" },
];

export default function PrivacyContent() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-20 bg-gradient-to-b from-gps-cream to-white grid-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gps-green/10 rounded-full text-sm font-medium text-gps-green mb-6">
              Legal
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gps-slate tracking-tight">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="mt-6 text-lg text-gps-gray leading-relaxed">
              {COMPANY_NAME} is committed to protecting your privacy. This policy explains
              what information we collect, how we use it, and your rights under Nebraska law.
            </p>
            <p className="mt-3 text-sm text-gps-gray/70">
              Effective date: {EFFECTIVE_DATE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-12">

            {/* Table of Contents — sticky sidebar on large screens */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block lg:col-span-1"
            >
              <div className="sticky top-24 bg-gps-cream rounded-2xl p-6">
                <h2 className="text-xs font-semibold tracking-widest uppercase text-gps-gold mb-4">
                  Contents
                </h2>
                <nav>
                  <ul className="space-y-2">
                    {tocItems.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="text-sm text-gps-gray hover:text-gps-green transition-colors leading-snug block py-0.5"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.aside>

            {/* Policy Body */}
            <div className="lg:col-span-3 space-y-12">

              <PolicySection id="information-we-collect" title="1. Information We Collect">
                <p>
                  We collect information you voluntarily provide to us and limited technical
                  data generated when you visit our website.
                </p>
                <div className="bg-gps-light rounded-xl p-6 border border-gps-green/5">
                  <h3 className="font-semibold text-gps-slate mb-3">Contact Form Submissions</h3>
                  <p className="mb-3">
                    When you submit our contact form, we collect the following information you
                    choose to provide:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Full name",
                      "Email address",
                      "Phone number (optional)",
                      "Organization or company name (optional)",
                      "Message content",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gps-green mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gps-light rounded-xl p-6 border border-gps-green/5">
                  <h3 className="font-semibold text-gps-slate mb-3">Analytics Data</h3>
                  <p className="mb-3">
                    We collect basic, anonymized analytics to understand how visitors use our
                    website. This includes:
                  </p>
                  <ul className="space-y-1.5">
                    {[
                      "Pages visited and navigation paths",
                      "General geographic region (country/state level only)",
                      "Browser type and device category",
                      "Referring website (how you arrived at our site)",
                      "Date and time of visit",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gps-green mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-gps-gray/80">
                    Analytics data is aggregated and does not identify you personally. We do not
                    use advertising cookies or cross-site tracking technologies.
                  </p>
                </div>
                <p>
                  We do not collect sensitive personal information such as Social Security numbers,
                  financial account numbers, health information, or biometric data.
                </p>
              </PolicySection>

              <PolicySection id="how-we-use-information" title="2. How We Use Your Information">
                <p>
                  We use the information we collect solely to operate our business and respond to
                  your inquiries. Specifically, we use your information to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Respond to your contact form submission and answer your questions",
                    "Follow up regarding sponsorship consulting services you have expressed interest in",
                    "Maintain records of our business communications",
                    "Improve our website content and user experience based on aggregated analytics",
                    "Comply with applicable legal obligations",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gps-gold mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  We will not use your information for any purpose materially different from those
                  described above without first obtaining your consent.
                </p>
              </PolicySection>

              <PolicySection id="data-retention" title="3. Data Retention">
                <p>
                  We retain contact form submissions and related correspondence for as long as
                  reasonably necessary to fulfill the purposes described in this policy, maintain
                  our business records, and comply with applicable legal requirements — generally
                  no longer than three (3) years from the date of last contact, unless a longer
                  retention period is required by law or an active business relationship exists.
                </p>
                <p>
                  Anonymized analytics data may be retained indefinitely as it cannot be used to
                  identify you.
                </p>
                <p>
                  You may request deletion of your personal information at any time by contacting
                  us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-gps-green hover:underline">{CONTACT_EMAIL}</a>. We will honor deletion requests within a reasonable time
                  unless retention is required by law.
                </p>
              </PolicySection>

              <PolicySection id="no-sale-of-data" title="4. No Sale of Personal Data">
                <div className="bg-gps-green/5 border border-gps-green/20 rounded-xl p-6">
                  <p className="font-semibold text-gps-slate">
                    We do not sell, rent, lease, or otherwise transfer your personal information
                    to third parties for monetary or other valuable consideration.
                  </p>
                </div>
                <p>
                  We do not share your personal information with marketers, data brokers,
                  advertisers, or any other third parties for commercial purposes. Your information
                  is used exclusively for the purposes described in this policy.
                </p>
              </PolicySection>

              <PolicySection id="third-party-services" title="5. Third-Party Services">
                <p>
                  Our website may use limited third-party services to operate. Any such services
                  are selected for their commitment to data privacy and are used only to the extent
                  necessary to provide our website functionality. We do not integrate advertising
                  networks, social media tracking pixels, or cross-site behavioral tracking tools.
                </p>
                <p>
                  Our website may contain links to external websites. This privacy policy applies
                  only to{" "}
                  <span className="font-medium text-gps-slate">{WEBSITE}</span>. We are not
                  responsible for the privacy practices of any linked third-party websites and
                  encourage you to review their privacy policies before providing any information.
                </p>
              </PolicySection>

              <PolicySection id="childrens-privacy" title="6. Children's Privacy">
                <p>
                  Our website and services are directed to business professionals and organizations.
                  We do not knowingly collect personal information from children under the age of
                  13. If you believe we have inadvertently collected information from a child under
                  13, please contact us immediately at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gps-green hover:underline">
                    {CONTACT_EMAIL}
                  </a>{" "}
                  and we will promptly delete such information.
                </p>
              </PolicySection>

              <PolicySection id="nebraska-rights" title="7. Nebraska Privacy Rights">
                <p>
                  The Nebraska Data Privacy Act (NDPA), effective January 1, 2025, provides
                  Nebraska residents with certain rights regarding their personal data. To the
                  extent the NDPA applies to our processing activities, we recognize the following
                  rights:
                </p>
                <StaggerContainer className="space-y-3">
                  {[
                    {
                      right: "Right to Know",
                      description:
                        "You may request confirmation of whether we process your personal data and, if so, request access to that data.",
                    },
                    {
                      right: "Right to Correction",
                      description:
                        "You may request that we correct inaccuracies in your personal data.",
                    },
                    {
                      right: "Right to Deletion",
                      description:
                        "You may request deletion of personal data you have provided to us, subject to certain exceptions.",
                    },
                    {
                      right: "Right to Data Portability",
                      description:
                        "Where technically feasible, you may request a copy of your personal data in a portable format.",
                    },
                    {
                      right: "Right to Opt Out",
                      description:
                        "You have the right to opt out of the sale of personal data. As stated above, we do not sell personal data.",
                    },
                  ].map((item) => (
                    <StaggerItem key={item.right}>
                      <div className="bg-gps-light rounded-xl p-5 border border-gps-green/5">
                        <h3 className="font-semibold text-gps-slate mb-1">{item.right}</h3>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <p>
                  To exercise any of these rights, please submit a request to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gps-green hover:underline">
                    {CONTACT_EMAIL}
                  </a>
                  . We will respond within forty-five (45) days as required by the NDPA. We will
                  not discriminate against you for exercising these rights.
                </p>
                <p>
                  If we deny your request, you may appeal the decision by contacting us and clearly
                  stating that you are appealing a prior decision. If your appeal is denied, you
                  may contact the Nebraska Attorney General&apos;s office.
                </p>
              </PolicySection>

              <PolicySection id="data-security" title="8. Data Security">
                <p>
                  We implement reasonable administrative, technical, and physical safeguards
                  designed to protect the personal information we collect against unauthorized
                  access, disclosure, alteration, and destruction. These measures include
                  encrypted data transmission (HTTPS) and limiting access to personal information
                  to personnel who need it to respond to your inquiry.
                </p>
                <p>
                  No method of transmission over the internet or electronic storage is completely
                  secure. While we strive to protect your information, we cannot guarantee its
                  absolute security.
                </p>
              </PolicySection>

              <PolicySection id="changes-to-policy" title="9. Changes to This Policy">
                <p>
                  We may update this privacy policy from time to time to reflect changes in our
                  practices or applicable law. When we make material changes, we will update the
                  effective date at the top of this page. We encourage you to review this policy
                  periodically. Your continued use of our website after any changes constitutes
                  your acceptance of the updated policy.
                </p>
              </PolicySection>

              <PolicySection id="contact-us" title="10. Contact Us">
                <p>
                  If you have questions, concerns, or requests regarding this privacy policy or
                  our data practices, please contact us:
                </p>
                <div className="bg-gps-cream rounded-xl p-6 border border-gps-green/10">
                  <p className="font-semibold text-gps-slate mb-1">{COMPANY_NAME}</p>
                  <p className="text-sm">18919 Margo St.</p>
                  <p className="text-sm">Omaha, NE 68136</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-gps-green hover:underline mt-2 block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <p>
                  You may also reach us through our{" "}
                  <Link href="/contact" className="text-gps-green hover:underline">
                    contact page
                  </Link>
                  .
                </p>
              </PolicySection>

            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-gps-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-gps-gray mb-6">
              Have questions about how we handle your information?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gps-green text-white text-sm font-semibold rounded-full hover:bg-gps-green-dark transition-colors"
            >
              Contact Us
            </Link>
            <p className="mt-6 text-sm text-gps-gray/60">
              Also see our{" "}
              <Link href="/terms" className="text-gps-green hover:underline">
                Terms of Service
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
