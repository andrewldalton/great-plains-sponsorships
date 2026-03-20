"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Handshake,
  Wine,
  CheckCircle2,
  Building2,
  Users,
  Music,
  Heart,
  Ticket,
  Landmark,
  ArrowRight,
  Target,
  TrendingUp,
  Award,
  Shield,
} from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { ServiceSchema } from "@/components/SchemaMarkup";

const stats = [
  { value: "$300M+", label: "Career Transactions" },
  { value: "20+", label: "Years Experience" },
  { value: "NFL & NHL", label: "Consulting Experience" },
  { value: "Award-Winning", label: "Venues Served" },
];

const services = [
  {
    icon: Handshake,
    title: "Naming Rights & Sponsorships",
    tagline: "Our Bread 'n Butter!",
    description:
      "We help forward-thinking organizations create profitable and sustainable Naming Rights & Sponsorships. Our clutter-free, less-is-more philosophy ensures high-value, aesthetically pleasing corporate partnerships.",
    href: "/services#naming-rights",
  },
  {
    icon: Trophy,
    title: "Owner's Representation",
    tagline: "Setting Up for Success",
    description:
      "From pre-construction procurement through post-opening management. We work hand-in-hand with architects, leverage vendor partnerships, and ensure long-term facility sustainability.",
    href: "/services#owners-representation",
  },
  {
    icon: Wine,
    title: "Pouring Rights",
    tagline: "The Bubbliest of Partnerships",
    description:
      "We maximize revenue through new and existing pouring and beverage contracts. Whether you're working with a major brand or starting from square one, we ensure profitable outcomes.",
    href: "/services#pouring-rights",
  },
];

const differentiators = [
  {
    icon: Target,
    text: "Pay-for-performance model designed to ensure R.O.I.",
  },
  {
    icon: Shield,
    text: "Made-to-measure strategies aligned with your objectives",
  },
  {
    icon: Award,
    text: "Clutter-free, less-is-more approach to partnerships",
  },
  {
    icon: TrendingUp,
    text: "Long-term relationships built on authentic Midwestern values",
  },
];

const audiences = [
  { icon: Building2, label: "Municipalities & CVBs" },
  { icon: Trophy, label: "Sports Complexes" },
  { icon: Users, label: "Teams & Leagues" },
  { icon: Music, label: "Entertainment Acts" },
  { icon: Heart, label: "Nonprofits" },
  { icon: Ticket, label: "Event Centers" },
  { icon: Landmark, label: "Stadiums & Arenas" },
  { icon: Award, label: "Collegiate Sports" },
];

export default function Home() {
  return (
    <>
      <ServiceSchema />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center grid-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gps-cream/60 via-white to-gps-green/5" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-gps-green/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gps-gold/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gps-green/10 rounded-full text-sm font-medium text-gps-green mb-8">
              <span className="w-2 h-2 rounded-full bg-gps-green animate-pulse" />
              Midwest-Based Sponsorship Experts
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gps-slate leading-[1.1]">
              Your Project.{" "}
              <span className="gradient-text">Our Expertise.</span>
              <br />
              Sustainable Revenue.
            </h1>

            <p className="mt-6 text-xl text-gps-gray max-w-2xl leading-relaxed">
              We create profitable, sustainable sponsorship platforms for
              forward-thinking organizations. Midwestern work-ethic meets
              big-city results.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gps-green text-white text-base font-semibold rounded-full hover:bg-gps-green-dark transition-all glow-green group"
              >
                Get a Free Consultation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gps-green/20 text-gps-green text-base font-semibold rounded-full hover:bg-gps-green/5 transition-all"
              >
                View Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-gps-green-dark py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
              What We Do
            </h2>
            <p className="text-4xl sm:text-5xl font-bold text-gps-slate tracking-tight">
              Our Core Services
            </p>
            <p className="mt-4 text-lg text-gps-gray max-w-2xl mx-auto">
              From naming rights procurement to facility management, we provide
              end-to-end sponsorship solutions.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Link
                  href={service.href}
                  className="group block h-full p-8 bg-gps-light rounded-2xl border border-gps-green/5 hover:border-gps-green/20 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-6 group-hover:bg-gps-green/20 transition-colors">
                    <service.icon className="w-7 h-7 text-gps-green" />
                  </div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-gps-gold mb-2">
                    {service.tagline}
                  </p>
                  <h3 className="text-xl font-bold text-gps-slate mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gps-gray leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center mt-4 text-sm font-semibold text-gps-green group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* WHY GPS */}
      <section className="py-24 bg-gps-cream relative overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-4">
                Why Great Plains
              </h2>
              <p className="text-3xl sm:text-4xl font-bold text-gps-slate leading-tight">
                Before we even think about going to market, we make it our
                business to{" "}
                <span className="text-gps-green">
                  make your business our business.
                </span>
              </p>
              <p className="mt-6 text-lg text-gps-gray leading-relaxed">
                We are a family-owned business based in the Midwest. However, we
                are as sophisticated and capable in what we do as anyone in the
                country. GPS doesn&apos;t steer away from &quot;small,&quot;
                &quot;tough,&quot; or &quot;rural&quot; projects.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-6">
                {differentiators.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gps-green/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gps-green" />
                    </div>
                    <p className="text-gps-slate font-medium">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
              Who We Serve
            </h2>
            <p className="text-4xl sm:text-5xl font-bold text-gps-slate tracking-tight">
              Industries We Partner With
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {audiences.map((item) => (
              <StaggerItem key={item.label}>
                <Link
                  href="/who-we-serve"
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-gps-light hover:bg-gps-green/5 border border-transparent hover:border-gps-green/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gps-green/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-gps-green" />
                  </div>
                  <span className="text-sm font-semibold text-gps-slate text-center">
                    {item.label}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gps-green-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gps-green-dark via-gps-green to-gps-green-dark opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gps-gold/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Ready to Put Your Project{" "}
              <span className="text-gps-gold">in the Black?</span>
            </h2>
            <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto">
              There&apos;s no reason your project should operate in the red,
              when it can operate in the black. Let&apos;s talk about how GPS
              can generate sustainable revenue for your organization.
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
