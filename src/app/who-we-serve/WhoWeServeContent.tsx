"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Trophy,
  Users,
  Music,
  Heart,
  Ticket,
  Landmark,
  Medal,
  Building,
  ArrowRight,
  MapPin,
  Handshake,
  TrendingUp,
} from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

const industries = [
  {
    icon: Building2,
    title: "Municipalities, Task-Forces & CVBs",
    description: "City and regional organizations looking to fund public venues and community projects.",
  },
  {
    icon: Trophy,
    title: "Sport Complexes",
    description: "Indoor and outdoor facilities seeking naming rights and corporate partnerships.",
  },
  {
    icon: Users,
    title: "Teams & Athletic Associations",
    description: "Youth, collegiate, and professional teams in need of sponsorship revenue.",
  },
  {
    icon: Music,
    title: "Touring & Entertainment Acts",
    description: "Performing artists and tour organizers seeking corporate sponsors.",
  },
  {
    icon: Heart,
    title: "Not-for-Profit Organizations",
    description: "Nonprofits looking to create sustainable funding through corporate partnerships.",
  },
  {
    icon: Ticket,
    title: "Entertainment Venues & Event Centers",
    description: "Concert halls, amphitheaters, and event spaces maximizing revenue potential.",
  },
  {
    icon: Building,
    title: "Convention Centers",
    description: "Large-scale venues seeking premium naming rights and sponsorship deals.",
  },
  {
    icon: Landmark,
    title: "Stadiums & Arenas",
    description: "Major venues from minor league to professional-level facilities.",
  },
  {
    icon: Medal,
    title: "NFL, NHL, Minor League & Collegiate Sports",
    description: "Professional and collegiate organizations seeking expert sponsorship consulting.",
  },
];

const strengths = [
  {
    icon: Handshake,
    title: "Securing Partnerships",
    description: "Naming Rights & Corporate Partnerships for entities throughout the Great Plains region and beyond.",
  },
  {
    icon: TrendingUp,
    title: "Revenue-Driven Platforms",
    description: "Creating Sponsorship & Naming Rights platforms that drive real, measurable revenue.",
  },
  {
    icon: Heart,
    title: "Community Collaboration",
    description: "Working with family-owned businesses, respected organizations, and entities in need of supplemental revenue.",
  },
];

export default function WhoWeServeContent() {
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
              Who We Serve
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gps-slate tracking-tight">
              E for Everyone, or{" "}
              <span className="gradient-text">N for Niche?</span>
            </h1>
            <p className="mt-6 text-xl text-gps-gray leading-relaxed">
              Although our clients and experience span the nation, GPS&apos;s
              foundation was designed for and expertise is focused primarily on
              companies throughout the Midwest and surrounding region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
              Our Experience
            </h2>
            <p className="text-4xl sm:text-5xl font-bold text-gps-slate tracking-tight">
              Industries We Partner With
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <StaggerItem key={industry.title}>
                <Link
                  href="/contact"
                  className="group block h-full p-8 bg-gps-light rounded-2xl border border-gps-green/5 hover:border-gps-green/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-5 group-hover:bg-gps-green group-hover:text-white transition-colors">
                    <industry.icon className="w-7 h-7 text-gps-green group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gps-slate mb-2">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-gps-gray leading-relaxed">
                    {industry.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* WHAT WE'RE GOOD AT */}
      <section className="py-24 bg-gps-cream relative overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
              Our Strengths
            </h2>
            <p className="text-4xl font-bold text-gps-slate tracking-tight">
              What We Do Best
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {strengths.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl p-8 shadow-sm h-full text-center">
                  <div className="w-14 h-14 rounded-xl bg-gps-green/10 flex items-center justify-center mb-6 mx-auto">
                    <item.icon className="w-7 h-7 text-gps-green" />
                  </div>
                  <h3 className="text-xl font-bold text-gps-slate mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gps-gray text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* REGION */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="w-20 h-20 rounded-2xl bg-gps-green/10 flex items-center justify-center mb-8 mx-auto">
              <MapPin className="w-10 h-10 text-gps-green" />
            </div>
            <h2 className="text-4xl font-bold text-gps-slate mb-6">
              From <span className="text-gps-green">Omaha</span> to the Great
              Plains and Beyond
            </h2>
            <p className="text-lg text-gps-gray leading-relaxed max-w-2xl mx-auto">
              Headquartered in Omaha, Nebraska, our reach extends across the
              entire Great Plains region and beyond. We bring Midwestern values
              and big-city expertise to every project, no matter the size or
              location.
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
              See How GPS Can Help{" "}
              <span className="text-gps-gold">Your Organization</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
              No matter your industry, if you need sponsorship revenue, we want
              to hear from you.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-gps-green-dark text-base font-bold rounded-full hover:bg-gps-gold hover:text-white transition-all group"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
