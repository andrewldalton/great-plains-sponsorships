"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";

const teamMembers = [
  {
    name: "Ryan Querry",
    title: "Founder & President",
    initials: "RQ",
    color: "bg-gps-green",
    photo: "/images/ryan-querry.jpg",
    bio: [
      "Over 20 years of experience in sales-execution and management",
      "Career sales and transactions exceeding $300 million",
      "NFL & NHL consulting experience; award-winning event centers and internationally-renowned events",
      "Currently Vice President of Membership Development at NE Chamber",
      "York College & Bellevue University graduate",
      "Board member of Susan G. Komen; resides in Omaha with wife Jen and children Harper & Nash",
    ],
    quote:
      "We are a family-owned business based in the Midwest, however, we are as sophisticated and capable in what we do as anyone in the country. GPS doesn't steer away from 'small,' 'tough' or 'rural' projects.",
  },
  {
    name: "Andrew Dalton",
    title: "EVP Partnerships",
    initials: "AD",
    color: "bg-gps-gold",
    photo: "/images/andrew-dalton.jpg",
    bio: [
      "20+ years in sales, business consulting, and management",
      "Board member of youth sports organization in Omaha",
      "Creighton Prep / College of the Ozarks",
      "Passionate about youth sports and community impact",
      "Current Employee Benefits Consultant",
    ],
    quote: null,
  },
];

export default function AboutContent() {
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
              About Us
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gps-slate tracking-tight">
              About{" "}
              <span className="gradient-text">Great Plains Sponsorships</span>
            </h1>
            <p className="mt-6 text-xl text-gps-gray leading-relaxed">
              Founded on unparalleled experience and results. A
              multidimensional service provider originated to help
              forward-thinking Midwestern companies create sustainable
              sponsorship platforms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* COMPANY STORY */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-4">
                Our Story
              </h2>
              <p className="text-3xl font-bold text-gps-slate leading-tight mb-6">
                Midwestern work-ethic meets{" "}
                <span className="text-gps-green">big-city results</span>
              </p>
              <p className="text-gps-gray leading-relaxed mb-4">
                The mixture of GPS&apos; Midwestern work-ethic and perpetual
                belief in building authentic relationships has resulted in a
                recipe for significant returns and long-term rapport with our
                clients.
              </p>
              <p className="text-gps-gray leading-relaxed">
                We are a family-owned business based in the Midwest, however, we
                are as sophisticated and capable in what we do as anyone in the
                country. GPS doesn&apos;t steer away from &quot;small,&quot;
                &quot;tough,&quot; or &quot;rural&quot; projects — every
                organization deserves the opportunity to create sustainable
                revenue.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, label: "20+ Years", sub: "Industry Experience" },
                  { icon: MapPin, label: "Omaha, NE", sub: "Headquartered" },
                  { icon: GraduationCap, label: "$300M+", sub: "Career Transactions" },
                  { icon: Heart, label: "Family-Owned", sub: "Values-Driven" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="p-6 bg-gps-light rounded-2xl text-center border border-gps-green/5"
                  >
                    <item.icon className="w-8 h-8 text-gps-green mx-auto mb-3" />
                    <p className="text-xl font-bold text-gps-slate">{item.label}</p>
                    <p className="text-xs text-gps-gray mt-1">{item.sub}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="py-24 bg-gps-cream relative overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
              Leadership
            </h2>
            <p className="text-4xl sm:text-5xl font-bold text-gps-slate tracking-tight">
              Meet the Team
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <StaggerItem key={member.name}>
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gps-green/5 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                    ) : (
                      <div
                        className={`w-16 h-16 rounded-2xl ${member.color} flex items-center justify-center text-white text-xl font-bold`}
                      >
                        {member.initials}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gps-slate">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gps-gold font-medium">
                        {member.title}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {member.bio.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gps-gray"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gps-green mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {member.quote && (
                    <div className="mt-6 pt-6 border-t border-gps-green/10">
                      <p className="text-sm text-gps-slate italic leading-relaxed">
                        &quot;{member.quote}&quot;
                      </p>
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gps-green-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gps-green-dark via-gps-green to-gps-green-dark opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Ready to{" "}
              <span className="text-gps-gold">Work With Us?</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
              We&apos;d love to learn about your project and explore how GPS can
              generate sustainable revenue for your organization.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-gps-green-dark text-base font-bold rounded-full hover:bg-gps-gold hover:text-white transition-all group"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
