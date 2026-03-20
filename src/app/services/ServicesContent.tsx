"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Handshake,
  Trophy,
  Wine,
  Star,
  Search,
  PenTool,
  BarChart3,
  Users,
  FileText,
  Presentation,
  CheckSquare,
  FileSignature,
  RefreshCw,
  ArrowRight,
  Armchair,
  Mic2,
  GraduationCap,
  Medal,
  Music,
  HardHat,
  Wrench,
  Building2,
  Calendar,
  DollarSign,
  Sparkles,
  Beer,
  ChevronRight,
} from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

const namingRightsServices = [
  { icon: PenTool, text: "Naming Rights & Sponsorship Platform Development" },
  { icon: Search, text: "Market Research & Asset Identification" },
  { icon: Sparkles, text: "Asset Creation" },
  { icon: Armchair, text: "Premium Seating Sales" },
  { icon: Users, text: "Prospecting & Solicitation" },
  { icon: FileText, text: "Marketing Campaign & Material Development" },
  { icon: DollarSign, text: "Capital Sourcing for Startups" },
  { icon: Presentation, text: "Presentations & Sales-Execution" },
  { icon: CheckSquare, text: "Fulfillment Coordination" },
  { icon: FileSignature, text: "Contract Negotiation" },
  { icon: RefreshCw, text: "Renewal Management" },
  { icon: ArrowRight, text: "Streamlined Hand-off to Clients" },
  { icon: Calendar, text: "VIP Event Coordination" },
  { icon: GraduationCap, text: "Talent Acquisition / Recruitment" },
  { icon: BarChart3, text: "Onsite Sales Training" },
  { icon: Medal, text: "Athlete Endorsements" },
  { icon: Music, text: "Concert / Performing-Act Sponsors" },
];

const ownerRepServices = [
  "Pre-construction procurement meetings to find & hire qualified General Contractors",
  "Collaborate with architects on cost-effective, sustainable design",
  "Leverage buying power through partnerships with thousands of premier vendors",
  'Construction "hard hat" tours during site development',
  "Pre-opening solutions for HR, accounting, and program development",
  "Tournament development and overall facility activation",
  "Post-construction management: sponsorship sales, concessions, ongoing marketing",
  "Community engagement and monthly budget updates",
];

export default function ServicesContent() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-24 bg-gradient-to-b from-gps-cream to-white grid-pattern">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gps-green/10 rounded-full text-sm font-medium text-gps-green mb-6">
              Our Services
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gps-slate tracking-tight">
              Securing{" "}
              <span className="gradient-text">Sustainable Partnerships</span>
            </h1>
            <p className="mt-6 text-xl text-gps-gray leading-relaxed">
              Whether you&apos;re a municipality, non-profit, corporation, or
              other entity in need of corporate partnerships, reach out
              risk-free to see how we can generate revenue for you. Our
              pay-for-performance model is designed to ensure R.O.I.
            </p>
          </motion.div>
        </div>
      </section>

      {/* NAMING RIGHTS & SPONSORSHIPS */}
      <section id="naming-rights" className="py-24 bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left">
              <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-6">
                <Handshake className="w-7 h-7 text-gps-green" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gps-slate mb-2">
                Naming Rights & Sponsorships
              </h2>
              <p className="text-lg font-medium text-gps-gold italic mb-6">
                Our Bread &apos;n Butter!
              </p>
              <p className="text-gps-gray leading-relaxed mb-4">
                Great Plains Sponsorships was originated to help
                forward-thinking organizations create profitable and sustainable
                Naming Rights & Sponsorships. When there is a need from a sports
                complex, aquatic center, recreation center, non-profit,
                amphitheater, municipality, team, or other entity to help fund
                and create supplemental revenue — we provide the expertise.
              </p>
              <p className="text-gps-gray leading-relaxed">
                Implementing a clutter-free, less-is-more atmosphere is the
                philosophy we live by. This enables our clients and corporate
                partners to walk away with aesthetically pleasing, high-value,
                and sustainable corporate partnerships.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-gps-light rounded-2xl p-8 border border-gps-green/5">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-6">
                  Full Service List
                </h3>
                <div className="grid gap-3">
                  {namingRightsServices.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="flex items-center gap-3 text-sm text-gps-slate"
                    >
                      <service.icon className="w-4 h-4 text-gps-green flex-shrink-0" />
                      {service.text}
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* OWNER'S REPRESENTATION */}
      <section
        id="owners-representation"
        className="py-24 bg-gps-cream scroll-mt-24 relative overflow-hidden grain-overlay"
      >
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid gap-4">
                  {ownerRepServices.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gps-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-3.5 h-3.5 text-gps-green" />
                      </div>
                      <p className="text-sm text-gps-slate leading-relaxed">
                        {service}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-6">
                <HardHat className="w-7 h-7 text-gps-green" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gps-slate mb-2">
                Owner&apos;s Representation
              </h2>
              <p className="text-lg font-medium text-gps-gold italic mb-6">
                Setting Up for Success
              </p>
              <p className="text-gps-gray leading-relaxed mb-4">
                Before construction we hold procurement meetings to find and
                hire a General Contractor that has the capacity, wherewithal, and
                necessary means to take on a project of your size.
              </p>
              <p className="text-gps-gray leading-relaxed mb-4">
                We&apos;ll work hand-in-hand with architects on the most
                cost-effective design that will lead to long term
                sustainability. We leverage your buying power for equipment,
                furniture, and more through our partnerships with thousands of
                premier vendors.
              </p>
              <p className="text-gps-gray leading-relaxed">
                Subsequent to owner&apos;s representation, we&apos;ll provide
                full-time post construction management that includes sponsorship
                sales, concessions, ongoing marketing, community engagement, and
                monthly budget updates.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* POURING RIGHTS */}
      <section id="pouring-rights" className="py-24 bg-white scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-6">
                <Beer className="w-7 h-7 text-gps-green" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gps-slate mb-2">
                Pouring Rights
              </h2>
              <p className="text-lg font-medium text-gps-gold italic mb-6">
                The Bubbliest of Partnerships
              </p>
              <p className="text-gps-gray leading-relaxed mb-4">
                We maximize revenue through new and existing pouring and
                beverage contracts. Whether you&apos;re currently working with a
                major soft drink brand, beer, or spirit distributor, or
                you&apos;re starting from square one — we use our expertise and
                resources to ensure your project and the beverage company walk
                away profitable and happy.
              </p>
              <p className="text-gps-gray leading-relaxed">
                Our demonstrated experience to successfully execute volume
                threshold appropriately to sponsorship dollars, attach brand
                naming rights to the appropriate landmark, or simply leverage
                our relationships to enhance your project&apos;s revenue — we
                put the needs of our clients and partners first.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-gps-light rounded-2xl p-8 border border-gps-green/5">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-4">
                  What are Pouring Rights?
                </h3>
                <p className="text-gps-gray text-sm leading-relaxed italic">
                  Pouring Rights means the right to make available, sell,
                  dispense and serve beverages during Events and/or at a said
                  venue, which right may or may not be to the exclusion of other
                  beverage vendors, and to identify the holder of such right as
                  the &quot;official&quot; provider of such beverage at the
                  Arena.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PREMIUM SEATING / VIP */}
      <section className="py-24 bg-gps-cream relative overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-6 mx-auto">
              <Star className="w-7 h-7 text-gps-green" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gps-slate mb-2">
              Redefining &quot;VIP&quot; Access
            </h2>
            <p className="text-lg font-medium text-gps-gold italic mb-6">
              Where Do You Want to Sit?
            </p>
            <p className="text-gps-gray leading-relaxed mb-4">
              We will optimize current seating options, create first-class
              premium inventory that doesn&apos;t yet exist, and institute
              one-of-a-kind Hospitality Programs.
            </p>
            <p className="text-gps-gray leading-relaxed mb-4">
              Your patrons will become inadvertent reciprocal partners. You
              provide them with priceless experiences. They return the favor by
              knowing where the next family outing will be without
              contemplation.
            </p>
            <p className="text-gps-slate font-medium mt-8">
              If we can&apos;t fulfill exactly what you&apos;re looking for, we
              will exhaust every last resource and co-op partner at our disposal
              to see your experience come to fruition.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gps-green-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gps-green-dark via-gps-green to-gps-green-dark opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Let&apos;s Talk About{" "}
              <span className="text-gps-gold">Your Project</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
              You will not find another company that has your back and is willing
              to back it up. Reach out risk-free today.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-gps-green-dark text-base font-bold rounded-full hover:bg-gps-gold hover:text-white transition-all group"
              >
                Start the Conversation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
