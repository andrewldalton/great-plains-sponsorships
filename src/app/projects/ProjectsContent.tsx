"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Trophy,
  MapPin,
  DollarSign,
  Users,
  Star,
  Landmark,
  Dumbbell,
  Truck,
  Handshake,
  Quote,
  Theater,
  Waves,
  Bike,
  GraduationCap,
  Wheat,
  Home,
  Volleyball,
  Music,
  CircleDot,
  Activity,
  Flame,
  ShieldCheck,
  Zap,
} from "lucide-react";
import AnimatedSection, {
  StaggerContainer,
  StaggerItem,
} from "@/components/AnimatedSection";
import { useState, useEffect, useCallback } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";
import TextRotate from "@/components/TextRotate";

function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: { quote: string; name: string; title: string; org: string }[];
}) {
  const [active, setActive] = useState(0);
  const next = useCallback(
    () => setActive((i) => (i + 1) % testimonials.length),
    [testimonials.length],
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
            Testimonials
          </h2>
          <p className="text-4xl font-bold text-gps-slate tracking-tight">
            What Our Partners Say
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="bg-gps-cream rounded-3xl p-10 md:p-14 border border-gps-green/5 relative"
            >
              <Quote className="w-12 h-12 text-gps-green/10 absolute top-8 right-8" />
              <p className="text-xl md:text-2xl text-gps-slate leading-relaxed italic mb-8">
                &quot;{testimonials[active].quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gps-green/10 flex items-center justify-center text-gps-green font-bold text-base">
                  {testimonials[active].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-bold text-gps-slate">
                    {testimonials[active].name}
                  </p>
                  <p className="text-sm text-gps-gray">
                    {testimonials[active].title},{" "}
                    {testimonials[active].org}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-gps-green w-8"
                    : "bg-gps-green/20 hover:bg-gps-green/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  // === FEATURED ===
  {
    name: "Youth Sports Naming Rights",
    location: "Midwest",
    value: "2-Year Contract",
    category: "Naming Rights",
    description:
      "Secured jersey naming rights for a 3,000+ member youth sports organization. Now seeking a partner for naming rights on the fields and complexes — an opportunity to put your brand front and center in the community.",
    icon: Handshake,
    color: "from-gps-green-light to-gps-green",
    highlights: [
      "3,000+ member organization",
      "Jersey naming rights secured",
      "Fields & complex partner sought",
    ],
    featured: true,
  },
  // === GPS DIRECT PROJECTS ===
  {
    name: "Gretna Crossing Sports Complex",
    location: "Gretna, NE",
    value: "$55M",
    category: "Sports Complex",
    description:
      "Naming rights, sponsorships, and pouring rights at Gretna's new $55M sports complex in one of Nebraska's fastest-growing communities.",
    icon: Building2,
    color: "from-gps-green to-gps-green-dark",
    image: "/images/projects/gretna-crossing.jpg",
    highlights: [
      "Full naming rights package",
      "Sponsorships & pouring rights",
      "Community partnership integration",
    ],
  },
  {
    name: "ETOWAH Mega Sports Complex",
    location: "Southeast",
    value: "Major",
    category: "Mega Sports Complex",
    description:
      "Naming rights, sponsorships, and pouring rights for the ETOWAH Mega Sports Complex — demonstrating GPS's ability to deliver results beyond the Midwest market.",
    icon: Star,
    color: "from-emerald-500 to-teal-700",
    image: "/images/projects/etowah.jpg",
    highlights: [
      "Out-of-region project",
      "Complete sponsorship buildout",
      "Pouring rights secured",
    ],
  },
  {
    name: "GJ Blackout Fieldhouse",
    location: "Regional",
    value: "Multi-Use",
    category: "Fieldhouse",
    description:
      "Naming rights, sponsorships, and pouring rights for the GJ Blackout Fieldhouse — a versatile venue spanning sports and entertainment.",
    icon: Dumbbell,
    color: "from-gray-700 to-gray-900",
    image: "/images/projects/gj-blackout.jpg",
    highlights: [
      "Naming rights & sponsorships",
      "Pouring rights",
      "Multi-use fieldhouse",
    ],
  },
  {
    name: "Pinnacle Bank Sports Complex",
    location: "Grand Island, NE",
    value: "$35M",
    category: "Indoor Sports",
    description:
      "Naming rights, sponsorships, and pouring rights for $35M indoor sporting facility in Grand Island, NE.",
    icon: DollarSign,
    color: "from-gps-gold to-yellow-700",
    image: "/images/projects/pinnacle-bank.jpg",
    highlights: [
      "$35M indoor facility",
      "Full naming rights package",
      "Pouring rights secured",
    ],
  },
  {
    name: "The Granary",
    location: "Ralston, NE",
    value: "Naming Rights",
    category: "Venue Sponsorship",
    description:
      "Naming rights, sponsorships, and pouring rights for The Granary venue in Ralston — a unique community destination.",
    icon: Wheat,
    color: "from-amber-600 to-amber-800",
    image: "/images/projects/the-granary.jpg",
    highlights: [
      "Naming rights secured",
      "Sponsorship platform",
      "Pouring rights",
    ],
  },
  {
    name: "Allison Sports Town",
    location: "Midwest",
    value: "Multi-Year",
    category: "Youth Sports Complex",
    description:
      "Naming rights and sponsorship development for a youth-focused sports town concept, creating sustainable revenue while enhancing the youth sports experience.",
    icon: Trophy,
    color: "from-orange-500 to-red-600",
    image: "/images/projects/allison-sports-town.jpg",
    highlights: [
      "Youth sports focus",
      "Naming rights secured",
      "Multi-field complex",
    ],
  },
  {
    name: "Freeman Health Storey Creek",
    location: "Lamar, MO",
    value: "Multi-Use",
    category: "Entertainment Venue",
    description:
      "Naming rights, sponsorships, and pouring rights for multiuse venue in Lamar, MO hosting Monster Trucks, Concerts, Tractor Pulls, Rodeos, and more!",
    icon: Truck,
    color: "from-red-600 to-red-800",
    image: "/images/projects/freeman-health.jpg",
    highlights: [
      "Multi-use entertainment venue",
      "Monster trucks & concerts",
      "Full sponsorship package",
    ],
  },
  {
    name: "Sandhills Bogeys Stadium",
    location: "Pinehurst, NC",
    value: "Full Package",
    category: "Stadium",
    description:
      "Evaluation, sponsorships, and pouring rights at the now opened Bogey's Stadium in Pinehurst, NC.",
    icon: CircleDot,
    color: "from-green-700 to-green-900",
    image: "/images/projects/sandhills-bogeys.jpg",
    highlights: [
      "Sponsorship evaluation",
      "Pouring rights",
      "Now open & operating",
    ],
  },
  {
    name: "Kinetic Sports Complex",
    location: "Lincoln, NE",
    value: "Roadmap",
    category: "Sports Complex",
    description:
      "Comprehensive naming rights & sponsorship evaluation (\"roadmap\") with multipurpose sports complex in Lincoln, NE.",
    icon: Zap,
    color: "from-cyan-600 to-cyan-800",
    image: "/images/projects/kinetic.jpg",
    highlights: [
      "Sponsorship roadmap",
      "Naming rights evaluation",
      "Multipurpose complex",
    ],
  },
  {
    name: "Clyde, Texas Sports Complex",
    location: "Clyde, TX",
    value: "$14M",
    category: "Sports Complex",
    description:
      "Naming rights, sponsorships, and pouring rights for $14 million complex in Clyde, TX.",
    icon: Building2,
    color: "from-sky-600 to-sky-800",
    image: "/images/projects/clyde-texas.jpg",
    highlights: [
      "$14M complex",
      "Full naming rights",
      "Texas market expansion",
    ],
  },
  {
    name: "Sportsplex West",
    location: "Norwalk, IA",
    value: "$300M",
    category: "Mega Development",
    description:
      "Naming rights, sponsorships, and pouring rights for 70-acre, $300 million retail, housing, fitness and sports development in Norwalk, IA.",
    icon: Building2,
    color: "from-indigo-600 to-indigo-800",
    image: "/images/projects/sportsplex-west.jpg",
    highlights: [
      "70-acre development",
      "$300M total project",
      "Retail, housing & sports",
    ],
  },
  {
    name: "City of Watertown",
    location: "Watertown, SD",
    value: "$22M+",
    category: "Municipal Partnership",
    description:
      "Comprehensive sponsorship evaluation and sales-execution for the City of Watertown's newly built $22M Prairie Lakes Wellness Center, $5M PREMIER Softball Complex, and consultancy on the anticipated Ice Arena.",
    icon: Landmark,
    color: "from-blue-700 to-blue-900",
    image: "/images/projects/watertown.jpg",
    highlights: [
      "$22M Wellness Center",
      "$5M Softball Complex",
      "Ice Arena consultancy",
    ],
  },
  {
    name: "City of Aberdeen",
    location: "Aberdeen, SD",
    value: "$12.5M",
    category: "Municipal Partnership",
    description:
      "Working with the City of Aberdeen Parks & Rec Department to develop and execute the sale of naming rights & sponsorships for a $12.5M renovation to softball and youth baseball complexes.",
    icon: GraduationCap,
    color: "from-teal-600 to-teal-800",
    image: "/images/projects/aberdeen.jpg",
    highlights: [
      "$12.5M renovation",
      "Softball & youth baseball",
      "Parks & Rec partnership",
    ],
  },
  {
    name: "Prairie Lakes Wellness Center",
    location: "Watertown, SD",
    value: "Naming Rights",
    category: "Wellness & Fitness",
    description:
      "Naming rights & sponsorship evaluation and sales-execution for the Prairie Lakes Wellness Center.",
    icon: Activity,
    color: "from-lime-600 to-lime-800",
    image: "/images/projects/prairie-lakes.jpg",
    highlights: [
      "Naming rights secured",
      "Sponsorship sales-execution",
      "Wellness facility",
    ],
  },
  {
    name: "Midco Aquatic Center",
    location: "South Dakota",
    value: "$2.2M",
    category: "Naming Rights",
    description:
      "Largest known naming rights deal secured for an aquatic center at $2.2 million. Work consisting of evaluation, valuation, sales-execution & contract negotiation.",
    icon: Waves,
    color: "from-blue-500 to-blue-700",
    image: "/images/projects/midco-aquatic-center.jpg",
    highlights: [
      "$2.2M naming rights deal",
      "Largest aquatic center deal",
      "Full valuation & negotiation",
    ],
  },
  {
    name: "Gateway Sports Village",
    location: "Midwest",
    value: "World-Class",
    category: "Turf Complex",
    description:
      "Gateway Village will be the largest synthetic turf complex in the world, hosting national and regional soccer tournaments as well as local youth soccer, lacrosse, and football clubs.",
    icon: Volleyball,
    color: "from-green-600 to-green-800",
    image: "/images/projects/gateway-sports-village.jpg",
    highlights: [
      "Largest synthetic turf complex",
      "National & regional tournaments",
      "Soccer, lacrosse & football",
    ],
  },
  {
    name: "Historic State Theatre",
    location: "Sioux Falls, SD",
    value: "Naming Rights",
    category: "Historic Venue",
    description:
      "Working with the SFSTC to secure once-in-a-century naming rights & sponsorship partners for this historic State Theatre in Downtown Sioux Falls, SD.",
    icon: Theater,
    color: "from-rose-600 to-rose-800",
    image: "/images/projects/historic-state-theatre.jpg",
    highlights: [
      "Historic venue",
      "Once-in-a-century opportunity",
      "Downtown Sioux Falls",
    ],
  },
  {
    name: "Washington Pavilion",
    location: "Sioux Falls, SD",
    value: "Platform",
    category: "Arts & Science",
    description:
      "Sponsorship evaluation/audit and platform development for the Washington Pavilion of Arts and Science — a storied and beautiful building.",
    icon: Music,
    color: "from-purple-600 to-purple-800",
    image: "/images/projects/washington-pavilion.jpg",
    highlights: [
      "Sponsorship audit",
      "Platform development",
      "Arts & science venue",
    ],
  },
  {
    name: "PREMIER Softball Complex",
    location: "South Dakota",
    value: "Naming Rights",
    category: "Youth Sports",
    description:
      "Naming rights & sponsorships evaluation and sales-execution for the PREMIER Softball Complex.",
    icon: Trophy,
    color: "from-pink-600 to-pink-800",
    image: "/images/projects/premier-softball.jpg",
    highlights: [
      "Naming rights secured",
      "Sponsorship sales-execution",
      "Youth softball",
    ],
  },
  {
    name: "Brandon Valley Hockey",
    location: "Brandon Valley, SD",
    value: "Naming Rights",
    category: "Hockey & Ice",
    description:
      "Naming rights & sponsorships evaluation and sales-execution for Brandon Valley Hockey and the IceCats program.",
    icon: ShieldCheck,
    color: "from-slate-600 to-slate-800",
    image: "/images/projects/brandon-valley.jpg",
    highlights: [
      "Naming rights",
      "Hockey program sponsorship",
      "IceCats partnership",
    ],
  },
  // === EXPERIENCE (via Legends Global Sales) ===
  {
    name: "Levi's Stadium",
    location: "Santa Clara, CA",
    value: "$1B+",
    category: "NFL Stadium",
    description:
      "Querry worked at Levi's Stadium while with Legends Global Sales — new home of the San Francisco 49ers. The elite sales team generated revenue exceeding $1 billion.",
    icon: Landmark,
    color: "from-red-700 to-red-900",
    image: "/images/projects/levis-stadium.jpg",
    highlights: [
      "San Francisco 49ers",
      "$1B+ in revenue",
      "Via Legends Global Sales",
    ],
  },
  {
    name: "Denny Sanford PREMIER Center",
    location: "Sioux Falls, SD",
    value: "$17.2M",
    category: "Arena",
    description:
      "Over $17.2 million in sponsorships and premium seating sales (suites, loge boxes, club seats).",
    icon: Building2,
    color: "from-amber-700 to-amber-900",
    image: "/images/projects/denny-sanford.jpg",
    highlights: [
      "$17.2M in sponsorships",
      "Premium seating sales",
      "Suites, loge boxes & club seats",
    ],
  },
  {
    name: "74th & 75th Sturgis Motorcycle Rally",
    location: "Sturgis, SD",
    value: "1M+ Attendees",
    category: "Major Event",
    description:
      "Querry secured sponsorships while at Legends Global Sales for the \"super bowl\" of motorcycle rallies (74th & 75th). An estimated million+ attended the 75th over the 10-day rally.",
    icon: Bike,
    color: "from-stone-700 to-stone-900",
    image: "/images/projects/sturgis.jpg",
    highlights: [
      "1M+ attendees",
      "\"Super bowl\" of rallies",
      "Via Legends Global Sales",
    ],
  },
  {
    name: "Sioux Falls Canaries",
    location: "Sioux Falls, SD",
    value: "Consultation",
    category: "Minor League Baseball",
    description:
      "Sponsorships & group sales consultation for the Sioux Falls Canaries professional baseball team.",
    icon: CircleDot,
    color: "from-yellow-600 to-yellow-800",
    image: "/images/projects/sioux-falls-canaries.jpg",
    highlights: [
      "Professional baseball",
      "Sponsorship consultation",
      "Group sales strategy",
    ],
  },
  {
    name: "Sioux Falls Skyforce",
    location: "Sioux Falls, SD",
    value: "Jersey Naming",
    category: "NBA D-League",
    description:
      "Jersey naming rights for the 2016 NBA D-League Champions and affiliate of the Miami HEAT. Work consisting of evaluation, valuation, sales-execution, and contract negotiation.",
    icon: Flame,
    color: "from-orange-600 to-orange-800",
    image: "/images/projects/sioux-falls-skyforce.jpg",
    highlights: [
      "NBA D-League Champions",
      "Miami HEAT affiliate",
      "Jersey naming rights",
    ],
  },
  {
    name: "Club Bell | Ottawa Senators",
    location: "Ottawa, Canada",
    value: "NHL",
    category: "Premium Seating",
    description:
      "Querry conducted premium seating consulting while at LGS for the NHL's Ottawa Senators' new Club Bell.",
    icon: Home,
    color: "from-red-800 to-red-950",
    image: "/images/projects/club-bell.jpg",
    highlights: [
      "NHL Ottawa Senators",
      "Premium seating consulting",
      "Via Legends Global Sales",
    ],
  },
  {
    name: "Extreme Off Road Expo",
    location: "Regional",
    value: "Event",
    category: "Event Sponsorship",
    description:
      "Sponsorship consultation for the Extreme Off Road Expo event series.",
    icon: Truck,
    color: "from-zinc-700 to-zinc-900",
    image: "/images/projects/extreme-off-road-expo.jpg",
    highlights: [
      "Event sponsorship",
      "Off-road entertainment",
      "Consultation",
    ],
  },
  {
    name: "Sioux Falls PREMIER Rodeo",
    location: "Sioux Falls, SD",
    value: "PRCA Event",
    category: "Rodeo & Events",
    description:
      "Sponsorship sales support for a two-night rodeo event featuring numerous PRCA events, including Bareback, Steer Wrestling, Team Roping, Saddle Bronc, Barrel Racing, Bull Riding, and Mutton Busting.",
    icon: Dumbbell,
    color: "from-amber-800 to-amber-950",
    image: "/images/projects/sioux-falls-premier-rodeo.jpg",
    highlights: [
      "PRCA sanctioned",
      "Two-night event",
      "Bull riding & barrel racing",
    ],
  },
  {
    name: "Lone Star Park",
    location: "Grand Prairie, TX",
    value: "Consultation",
    category: "Horse Racing",
    description:
      "Sponsorship consultation conducted by Querry while working with Legends Global Sales.",
    icon: Trophy,
    color: "from-emerald-700 to-emerald-900",
    image: "/images/projects/lone-star-park.jpg",
    highlights: [
      "Horse racing venue",
      "Sponsorship consultation",
      "Via Legends Global Sales",
    ],
  },
];

const testimonials = [
  {
    quote:
      "GPS has been instrumental in helping our community maximize the value of our facilities. Their understanding of the Midwest market is unmatched.",
    name: "Jay DeLange",
    title: "Director of Parks & Recreation",
    org: "City of Watertown, SD",
  },
  {
    quote:
      "Working with Great Plains Sponsorships gave us confidence that we were getting the best possible return on our naming rights investment.",
    name: "Glen Vilhauer",
    title: "City Council Member",
    org: "Watertown, SD",
  },
];

export default function ProjectsContent() {
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
              Our Work
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gps-slate tracking-tight">
              Projects &{" "}
              <TextRotate
                words={["Partnerships", "Results", "Revenue", "Impact"]}
                interval={2500}
              />
            </h1>
            <p className="mt-6 text-xl text-gps-gray leading-relaxed">
              From multi-million dollar sports complexes to youth fields and
              community venues — GPS delivers naming rights and sponsorship
              revenue for organizations of every size.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      {projects
        .filter((p) => p.featured)
        .map((project) => (
          <section key={project.name} className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-gps-green via-gps-green-dark to-gps-green p-1">
                  <div className="bg-white rounded-[1.35rem] p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gps-gold/10 rounded-full text-xs font-bold text-gps-gold uppercase tracking-wider mb-4">
                          <Star className="w-3.5 h-3.5" /> Active Opportunity
                        </div>
                        <h2 className="text-3xl font-bold text-gps-slate mb-4">
                          {project.name}
                        </h2>
                        <p className="text-gps-gray leading-relaxed mb-6">
                          {project.description}
                        </p>
                        <ul className="space-y-2 mb-8">
                          {project.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-center gap-2 text-sm text-gps-slate"
                            >
                              <span className="w-2 h-2 rounded-full bg-gps-green" />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/contact"
                          className="inline-flex items-center px-6 py-3 bg-gps-green text-white font-bold rounded-full hover:bg-gps-green-dark transition-all group"
                        >
                          Inquire About Partnership
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="w-full aspect-square max-w-xs rounded-3xl bg-gradient-to-br from-gps-cream via-white to-gps-cream flex items-center justify-center shadow-lg relative overflow-hidden border border-gps-green/10">
                          <div className="absolute inset-0 grid-pattern opacity-60" />
                          <div className="w-28 h-28 rounded-3xl bg-gps-green/10 flex items-center justify-center relative z-10">
                            <project.icon className="w-14 h-14 text-gps-green" />
                          </div>
                          <div className="absolute bottom-6 left-6 text-xs font-semibold text-gps-gold uppercase tracking-wider z-10">
                            Active Opportunity
                          </div>
                          <div className="absolute top-6 right-6 px-3 py-1 bg-gps-green text-white rounded-full text-xs font-bold z-10">
                            {project.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        ))}

      {/* PROJECT GRID */}
      <section className="py-24 bg-gps-cream relative overflow-hidden grain-overlay">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-gps-gold mb-3">
              Portfolio
            </h2>
            <p className="text-4xl sm:text-5xl font-bold text-gps-slate tracking-tight">
              Deals We&apos;ve Done
            </p>
            <p className="mt-4 text-lg text-gps-gray max-w-2xl mx-auto">
              Every project is unique. GPS builds custom sponsorship strategies
              that match the scale, market, and goals of each client.
            </p>
          </AnimatedSection>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <StaggerItem key={project.name}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gps-green/5 hover:border-gps-green/15 h-full flex flex-col transition-shadow duration-300"
                  >
                    {/* Card Header */}
                    <div className="h-48 relative overflow-hidden">
                      {project.image ? (
                        <>
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-gps-cream via-white to-gps-cream" />
                          <div className="absolute inset-0 grid-pattern opacity-60" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-2xl bg-gps-green/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                              <project.icon className="w-10 h-10 text-gps-green" />
                            </div>
                          </div>
                        </>
                      )}
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-10" />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gps-green text-white rounded-full text-xs font-bold z-10">
                        {project.value}
                      </div>
                      <div className="absolute bottom-4 left-4 text-[10px] font-semibold text-gps-gold uppercase tracking-wider z-10 drop-shadow-sm">
                        {project.category}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-gps-gold uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gps-slate mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gps-gray mb-3">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </div>
                      <p className="text-sm text-gps-gray leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <ul className="space-y-1">
                          {project.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-center gap-2 text-xs text-gps-slate"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-gps-green" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
          </StaggerContainer>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* STATS BAR */}
      <section className="py-16 bg-gps-green-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$300M+", label: "Career Transactions" },
              { value: "20+", label: "Years Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "100%", label: "Midwest Grit" },
            ].map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gps-green-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gps-green-dark via-gps-green to-gps-green-dark opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Have a Project in Mind?{" "}
              <span className="text-gps-gold">Let&apos;s Talk.</span>
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
              Whether it&apos;s a $50M complex or a local youth field, GPS
              brings the same intensity and expertise to every deal.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-gps-green-dark text-base font-bold rounded-full hover:bg-gps-gold hover:text-white transition-all group"
              >
                Start a Conversation
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
