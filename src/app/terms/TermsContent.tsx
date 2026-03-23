"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const EFFECTIVE_DATE = "March 1, 2025";
const COMPANY_NAME = "Great Plains Sponsorships, Inc.";
const CONTACT_EMAIL = "andrew.dalton@greatplainssponsorships.com";
const WEBSITE = "greatplainssponsorships.com";

interface TermsSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function TermsSection({ id, title, children }: TermsSectionProps) {
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
  { href: "#acceptance", label: "Acceptance of Terms" },
  { href: "#description-of-services", label: "Description of Services" },
  { href: "#use-of-website", label: "Use of Website" },
  { href: "#intellectual-property", label: "Intellectual Property" },
  { href: "#disclaimer-of-warranties", label: "Disclaimer of Warranties" },
  { href: "#limitation-of-liability", label: "Limitation of Liability" },
  { href: "#indemnification", label: "Indemnification" },
  { href: "#governing-law", label: "Governing Law" },
  { href: "#dispute-resolution", label: "Dispute Resolution" },
  { href: "#termination", label: "Termination" },
  { href: "#changes-to-terms", label: "Changes to Terms" },
  { href: "#contact-us", label: "Contact Us" },
];

export default function TermsContent() {
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
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="mt-6 text-lg text-gps-gray leading-relaxed">
              Please read these terms carefully before using our website or engaging our services.
              By accessing{" "}
              <span className="font-medium text-gps-slate">{WEBSITE}</span> or contacting us about
              sponsorship consulting, you agree to be bound by these terms.
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

            {/* Terms Body */}
            <div className="lg:col-span-3 space-y-12">

              <TermsSection id="acceptance" title="1. Acceptance of Terms">
                <p>
                  These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement
                  between you and {COMPANY_NAME} (&quot;Company,&quot; &quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;), a Nebraska corporation.
                </p>
                <p>
                  By accessing or using our website at{" "}
                  <span className="font-medium text-gps-slate">{WEBSITE}</span>, submitting a
                  contact form, or engaging with us regarding our services, you confirm that you
                  are at least 18 years of age, have the authority to enter into these Terms on
                  behalf of yourself or your organization, and agree to be bound by these Terms and
                  our{" "}
                  <Link href="/privacy" className="text-gps-green hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <p>
                  If you do not agree to these Terms, please do not use our website or services.
                </p>
              </TermsSection>

              <TermsSection id="description-of-services" title="2. Description of Services">
                <p>
                  {COMPANY_NAME} is a sponsorship consulting firm headquartered in Omaha, Nebraska.
                  We provide professional consulting services to organizations seeking to develop,
                  negotiate, and manage sponsorship relationships. Our core service areas include:
                </p>
                <StaggerContainer className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Naming Rights & Sponsorships",
                      description:
                        "Strategic identification and negotiation of naming rights and title sponsorship opportunities for facilities, events, and programs.",
                    },
                    {
                      title: "Owner's Representation",
                      description:
                        "Acting as an advocate on behalf of organizations in sponsorship negotiations to maximize value and protect client interests.",
                    },
                    {
                      title: "Pouring Rights",
                      description:
                        "Consulting on beverage pouring rights agreements for venues, arenas, stadiums, and event facilities.",
                    },
                    {
                      title: "Premium Seating",
                      description:
                        "Advisory services for premium seating programs including suites, club seats, and hospitality packages.",
                    },
                  ].map((service) => (
                    <StaggerItem key={service.title}>
                      <div className="bg-gps-light rounded-xl p-5 border border-gps-green/5 h-full">
                        <h3 className="font-semibold text-gps-slate mb-2 text-sm">{service.title}</h3>
                        <p className="text-sm text-gps-gray">{service.description}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
                <p>
                  The specific scope, deliverables, timeline, compensation, and terms of any
                  consulting engagement will be governed by a separate written consulting agreement
                  executed between {COMPANY_NAME} and the client. These Terms of Service govern
                  use of our website and general inquiries; they do not constitute a consulting
                  agreement.
                </p>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our
                  services at any time without liability to you.
                </p>
              </TermsSection>

              <TermsSection id="use-of-website" title="3. Use of Website">
                <p>
                  You may use our website for lawful purposes only. You agree not to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Use the website in any manner that violates applicable federal, state, or local law or regulation",
                    "Transmit any unsolicited or unauthorized advertising, promotional material, or spam",
                    "Attempt to gain unauthorized access to any portion of the website or its related systems",
                    "Use automated tools, bots, or scrapers to collect information from the website",
                    "Impersonate any person or entity or falsely represent your affiliation with any person or entity",
                    "Interfere with or disrupt the integrity or performance of the website",
                    "Post or transmit any content that is defamatory, fraudulent, harmful, or otherwise objectionable",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gps-gold mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  We reserve the right to terminate or restrict access to our website for any user
                  who violates these terms.
                </p>
              </TermsSection>

              <TermsSection id="intellectual-property" title="4. Intellectual Property">
                <p>
                  The website and all of its content — including but not limited to text, graphics,
                  logos, images, audio clips, data compilations, and software — are the property of
                  {" "}{COMPANY_NAME} or its content suppliers and are protected by United States
                  copyright law, trademark law, and other applicable intellectual property laws.
                </p>
                <p>
                  The &quot;Great Plains Sponsorships&quot; name, logo, and related marks are
                  trademarks of {COMPANY_NAME}. Nothing in these Terms grants you any right to use
                  our trademarks without our prior written permission.
                </p>
                <p>
                  You are granted a limited, non-exclusive, non-transferable, revocable license to
                  access and use the website for your personal, non-commercial informational
                  purposes only. This license does not permit you to reproduce, distribute, modify,
                  create derivative works of, publicly display, publicly perform, republish,
                  download, store, or transmit any of our content without our prior written consent.
                </p>
              </TermsSection>

              <TermsSection id="disclaimer-of-warranties" title="5. Disclaimer of Warranties">
                <div className="bg-gps-light rounded-xl p-6 border border-gps-green/5">
                  <p className="font-semibold text-gps-slate mb-3 text-sm uppercase tracking-wide">
                    Important Notice
                  </p>
                  <p>
                    THE WEBSITE AND ITS CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND
                    &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS
                    OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, {COMPANY_NAME.toUpperCase()} DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
                    TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                    AND NON-INFRINGEMENT.
                  </p>
                </div>
                <p>
                  We do not warrant that the website will be uninterrupted or error-free, that
                  defects will be corrected, that the website or the server that makes it available
                  are free of viruses or other harmful components, or that the website or its
                  content will otherwise meet your needs or expectations.
                </p>
                <p>
                  Information on our website regarding sponsorship markets, valuations, and deal
                  structures is provided for general informational purposes only and does not
                  constitute professional advice. Engagement of our consulting services is
                  necessary for advice tailored to your specific situation.
                </p>
              </TermsSection>

              <TermsSection id="limitation-of-liability" title="6. Limitation of Liability">
                <div className="bg-gps-light rounded-xl p-6 border border-gps-green/5">
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE NEBRASKA LAW, IN NO EVENT SHALL
                    {" "}{COMPANY_NAME.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS,
                    LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                    CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
                    LOSS OF DATA, LOSS OF BUSINESS OPPORTUNITY, OR GOODWILL, ARISING OUT OF OR IN
                    CONNECTION WITH YOUR USE OF, OR INABILITY TO USE, THE WEBSITE OR ANY CONTENT
                    THEREON, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  </p>
                </div>
                <p>
                  In jurisdictions that do not allow the exclusion or limitation of liability for
                  consequential or incidental damages, our liability shall be limited to the maximum
                  extent permitted by law.
                </p>
                <p>
                  Our total aggregate liability to you for any claims arising out of or relating to
                  these Terms or your use of the website shall not exceed one hundred dollars
                  ($100.00). Liability arising from a separately executed consulting agreement is
                  governed by the terms of that agreement.
                </p>
              </TermsSection>

              <TermsSection id="indemnification" title="7. Indemnification">
                <p>
                  You agree to defend, indemnify, and hold harmless {COMPANY_NAME}, its officers,
                  directors, employees, agents, and successors from and against any claims,
                  liabilities, damages, judgments, awards, losses, costs, expenses, or fees
                  (including reasonable attorneys&apos; fees) arising out of or relating to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Your violation of these Terms",
                    "Your use of the website",
                    "Your violation of any third-party right, including any intellectual property right or privacy right",
                    "Any claim that your use of the website caused damage to a third party",
                    "Any content you submit through our website",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gps-gold mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </TermsSection>

              <TermsSection id="governing-law" title="8. Governing Law">
                <p>
                  These Terms and any dispute or claim arising out of or related to them, their
                  subject matter, or their formation shall be governed by and construed in
                  accordance with the laws of the State of Nebraska, without regard to its conflict
                  of law provisions.
                </p>
                <p>
                  You agree that any legal action or proceeding arising out of or relating to these
                  Terms shall be brought exclusively in the state or federal courts located in
                  Douglas County, Nebraska, and you hereby consent to personal jurisdiction and
                  venue in those courts.
                </p>
              </TermsSection>

              <TermsSection id="dispute-resolution" title="9. Dispute Resolution">
                <p>
                  Before initiating any formal legal proceeding, we encourage you to contact us
                  directly at{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gps-green hover:underline">
                    {CONTACT_EMAIL}
                  </a>{" "}
                  to attempt to resolve any dispute informally. We will make good-faith efforts to
                  resolve disputes promptly and amicably.
                </p>
                <p>
                  If an informal resolution is not reached within thirty (30) days of written notice
                  of the dispute, either party may pursue the legal remedies available under the
                  governing law set forth above.
                </p>
                <p>
                  Nothing in this section limits either party&apos;s right to seek emergency
                  injunctive or other equitable relief in a court of competent jurisdiction where
                  necessary to protect proprietary rights or confidential information.
                </p>
              </TermsSection>

              <TermsSection id="termination" title="10. Termination">
                <p>
                  We may terminate or suspend your access to the website immediately, without prior
                  notice or liability, for any reason, including if you breach these Terms.
                </p>
                <p>
                  Upon termination, your right to use the website will immediately cease. All
                  provisions of these Terms that by their nature should survive termination shall
                  survive, including but not limited to intellectual property provisions, disclaimers
                  of warranties, limitations of liability, and indemnification obligations.
                </p>
              </TermsSection>

              <TermsSection id="changes-to-terms" title="11. Changes to Terms">
                <p>
                  We reserve the right to modify these Terms at any time. When we make changes, we
                  will update the effective date at the top of this page. Material changes will be
                  indicated by a new effective date, and we encourage you to review these Terms
                  periodically.
                </p>
                <p>
                  Your continued use of the website after any changes to these Terms constitutes
                  your acceptance of the revised Terms. If you do not agree to the revised Terms,
                  you must stop using the website.
                </p>
              </TermsSection>

              <TermsSection id="contact-us" title="12. Contact Us">
                <p>
                  If you have questions or concerns about these Terms, please contact us:
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
              </TermsSection>

            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-gps-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-gps-gray mb-6">
              Questions about our services or these terms?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gps-green text-white text-sm font-semibold rounded-full hover:bg-gps-green-dark transition-colors"
            >
              Contact Us
            </Link>
            <p className="mt-6 text-sm text-gps-gray/60">
              Also see our{" "}
              <Link href="/privacy" className="text-gps-green hover:underline">
                Privacy Policy
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
