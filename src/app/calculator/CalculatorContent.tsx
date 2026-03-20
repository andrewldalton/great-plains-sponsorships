"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────────

type VenueType =
  | "sports-complex"
  | "recreation-center"
  | "stadium"
  | "entertainment"
  | "convention-center"
  | "nonprofit";

type MarketSize = "small" | "mid" | "large" | "major";

type CurrentRevenue = "none" | "under-50k" | "50k-250k" | "250k-plus";

interface Selections {
  venueType: VenueType | null;
  marketSize: MarketSize | null;
  capacity: number;
  annualEvents: number;
  currentRevenue: CurrentRevenue | null;
}

interface RevenueEstimate {
  namingRightsLow: number;
  namingRightsHigh: number;
  totalPackageLow: number;
  totalPackageHigh: number;
  fiveYearLow: number;
  fiveYearHigh: number;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const VENUE_TYPES: { id: VenueType; label: string; icon: string; description: string }[] = [
  {
    id: "sports-complex",
    label: "Sports Complex / Athletic Facility",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4",
    description: "Multi-field complexes, training centers, and athletic venues",
  },
  {
    id: "recreation-center",
    label: "Municipal Recreation Center",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    description: "Community centers, aquatic facilities, and public recreation",
  },
  {
    id: "stadium",
    label: "Stadium / Arena",
    icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    description: "Professional and collegiate stadiums, arenas, and ballparks",
  },
  {
    id: "entertainment",
    label: "Entertainment Venue / Event Center",
    icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
    description: "Concert halls, amphitheaters, and multi-purpose event spaces",
  },
  {
    id: "convention-center",
    label: "Convention Center",
    icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
    description: "Conference centers, expo halls, and trade show venues",
  },
  {
    id: "nonprofit",
    label: "Nonprofit Facility",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    description: "YMCA, Boys & Girls Clubs, community nonprofits",
  },
];

const MARKET_SIZES: { id: MarketSize; label: string; population: string }[] = [
  { id: "small", label: "Small Market", population: "Under 50,000" },
  { id: "mid", label: "Mid-Market", population: "50,000 - 250,000" },
  { id: "large", label: "Large Market", population: "250,000 - 1M" },
  { id: "major", label: "Major Market", population: "1 Million+" },
];

const REVENUE_OPTIONS: { id: CurrentRevenue; label: string }[] = [
  { id: "none", label: "None" },
  { id: "under-50k", label: "Under $50K" },
  { id: "50k-250k", label: "$50K - $250K" },
  { id: "250k-plus", label: "$250K+" },
];

const COMPARABLE_PROJECTS: Record<VenueType, { name: string; detail: string }[]> = {
  "sports-complex": [
    { name: "Regional Athletic Complex", detail: "$1.2M naming rights over 10 years" },
    { name: "Youth Sports Campus", detail: "$350K annual sponsorship package" },
    { name: "Multi-Sport Training Facility", detail: "$800K naming deal + field sponsorships" },
  ],
  "recreation-center": [
    { name: "Municipal Aquatic Center", detail: "$500K naming rights over 5 years" },
    { name: "Community Recreation Hub", detail: "$200K annual partnership" },
    { name: "City Parks & Rec Complex", detail: "$750K combined sponsorship value" },
  ],
  stadium: [
    { name: "Minor League Ballpark", detail: "$2.5M naming rights over 10 years" },
    { name: "College Football Stadium", detail: "$5M+ multi-year partnership" },
    { name: "Multi-Use Sports Arena", detail: "$1.8M annual sponsorship revenue" },
  ],
  entertainment: [
    { name: "Outdoor Amphitheater", detail: "$1.5M naming rights over 7 years" },
    { name: "Downtown Event Center", detail: "$600K annual sponsorship package" },
    { name: "Performing Arts Venue", detail: "$900K combined partnership value" },
  ],
  "convention-center": [
    { name: "Regional Convention Center", detail: "$2M naming rights over 10 years" },
    { name: "Expo & Trade Show Facility", detail: "$800K annual sponsorship" },
    { name: "Conference & Meeting Center", detail: "$1.2M multi-partner package" },
  ],
  nonprofit: [
    { name: "YMCA Facility", detail: "$400K naming rights over 5 years" },
    { name: "Boys & Girls Club Center", detail: "$150K annual partnerships" },
    { name: "Community Wellness Center", detail: "$300K combined sponsorship" },
  ],
};

// ── Revenue Logic ──────────────────────────────────────────────────────────────

const VENUE_BASE: Record<VenueType, number> = {
  "sports-complex": 75000,
  "recreation-center": 50000,
  stadium: 150000,
  entertainment: 100000,
  "convention-center": 120000,
  nonprofit: 35000,
};

const MARKET_MULTIPLIER: Record<MarketSize, number> = {
  small: 1,
  mid: 1.5,
  large: 2.5,
  major: 4,
};

const REVENUE_DISCOUNT: Record<CurrentRevenue, number> = {
  none: 1,
  "under-50k": 0.85,
  "50k-250k": 0.65,
  "250k-plus": 0.45,
};

function calculateEstimate(s: Selections): RevenueEstimate {
  if (!s.venueType || !s.marketSize || !s.currentRevenue) {
    return {
      namingRightsLow: 0,
      namingRightsHigh: 0,
      totalPackageLow: 0,
      totalPackageHigh: 0,
      fiveYearLow: 0,
      fiveYearHigh: 0,
    };
  }

  const base = VENUE_BASE[s.venueType];
  const marketMult = MARKET_MULTIPLIER[s.marketSize];
  const capacityMult = Math.log10(Math.max(s.capacity, 500)) / Math.log10(500); // ~1 at 500, ~1.6 at 5000, ~2 at 50000
  const eventMult = 0.7 + (Math.min(s.annualEvents, 500) / 500) * 0.8; // 0.7 to 1.5
  const discount = REVENUE_DISCOUNT[s.currentRevenue];

  const namingRightsMid = base * marketMult * capacityMult * eventMult * discount;
  const namingRightsLow = Math.round(namingRightsMid * 0.7 / 1000) * 1000;
  const namingRightsHigh = Math.round(namingRightsMid * 1.4 / 1000) * 1000;

  // Total sponsorship package is typically 2-3x naming rights alone
  const totalPackageLow = Math.round(namingRightsLow * 2.2 / 1000) * 1000;
  const totalPackageHigh = Math.round(namingRightsHigh * 3.1 / 1000) * 1000;

  // 5-year projection includes ~3% annual growth
  const growthFactor = 5.3; // sum of (1 + 1.03 + 1.06 + 1.09 + 1.12)
  const fiveYearLow = Math.round(totalPackageLow * growthFactor / 1000) * 1000;
  const fiveYearHigh = Math.round(totalPackageHigh * growthFactor / 1000) * 1000;

  return { namingRightsLow, namingRightsHigh, totalPackageLow, totalPackageHigh, fiveYearLow, fiveYearHigh };
}

// ── Animated Currency Counter ──────────────────────────────────────────────────

function CurrencyCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current && value === display) return;
    hasAnimated.current = true;

    let startTime: number;
    let frame: number;
    const startVal = display;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      ${display.toLocaleString()}
    </span>
  );
}

// ── Step Components ────────────────────────────────────────────────────────────

function StepVenueType({
  selected,
  onSelect,
}: {
  selected: VenueType | null;
  onSelect: (v: VenueType) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gps-slate">What type of facility do you have?</h2>
        <p className="text-gps-gray max-w-lg mx-auto">
          Select the category that best describes your venue. This helps us benchmark against comparable properties.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {VENUE_TYPES.map((v) => (
          <motion.button
            key={v.id}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(v.id)}
            className={`relative p-5 rounded-xl border-2 text-left transition-colors duration-200 cursor-pointer ${
              selected === v.id
                ? "border-gps-green bg-gps-green/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gps-green/40 hover:shadow-sm"
            }`}
          >
            {selected === v.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gps-green flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            <div className="w-10 h-10 rounded-lg bg-gps-green/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-gps-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
              </svg>
            </div>
            <h3 className="font-semibold text-gps-slate text-sm">{v.label}</h3>
            <p className="text-xs text-gps-gray mt-1">{v.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function StepMarketSize({
  selected,
  onSelect,
}: {
  selected: MarketSize | null;
  onSelect: (v: MarketSize) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gps-slate">What is your market size?</h2>
        <p className="text-gps-gray max-w-lg mx-auto">
          The metro area population around your facility significantly impacts sponsorship value.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {MARKET_SIZES.map((m) => (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(m.id)}
            className={`relative p-6 rounded-xl border-2 text-left transition-colors duration-200 cursor-pointer ${
              selected === m.id
                ? "border-gps-green bg-gps-green/5 shadow-md"
                : "border-gray-200 bg-white hover:border-gps-green/40 hover:shadow-sm"
            }`}
          >
            {selected === m.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gps-green flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
            <h3 className="font-semibold text-gps-slate text-lg">{m.label}</h3>
            <p className="text-sm text-gps-gray mt-1">{m.population}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function StepFacilityDetails({
  selections,
  onUpdate,
}: {
  selections: Selections;
  onUpdate: (updates: Partial<Selections>) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gps-slate">Tell us about your facility</h2>
        <p className="text-gps-gray max-w-lg mx-auto">
          These details help us fine-tune your revenue estimate.
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {/* Capacity */}
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="font-semibold text-gps-slate">Seating / Capacity</span>
            <span className="text-sm font-mono text-gps-green font-bold bg-gps-green/10 px-3 py-1 rounded-full">
              {selections.capacity.toLocaleString()}
            </span>
          </label>
          <input
            type="range"
            min={500}
            max={50000}
            step={500}
            value={selections.capacity}
            onChange={(e) => onUpdate({ capacity: Number(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-gps-green bg-gray-200"
          />
          <div className="flex justify-between text-xs text-gps-gray">
            <span>500</span>
            <span>10,000</span>
            <span>25,000</span>
            <span>50,000</span>
          </div>
        </div>

        {/* Annual Events */}
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="font-semibold text-gps-slate">Annual Events / Games</span>
            <span className="text-sm font-mono text-gps-green font-bold bg-gps-green/10 px-3 py-1 rounded-full">
              {selections.annualEvents}
            </span>
          </label>
          <input
            type="range"
            min={10}
            max={500}
            step={5}
            value={selections.annualEvents}
            onChange={(e) => onUpdate({ annualEvents: Number(e.target.value) })}
            className="w-full h-2 rounded-full appearance-none cursor-pointer accent-gps-green bg-gray-200"
          />
          <div className="flex justify-between text-xs text-gps-gray">
            <span>10</span>
            <span>125</span>
            <span>250</span>
            <span>500</span>
          </div>
        </div>

        {/* Current Revenue */}
        <div className="space-y-3">
          <span className="font-semibold text-gps-slate block">Current Sponsorship Revenue</span>
          <div className="grid grid-cols-2 gap-3">
            {REVENUE_OPTIONS.map((r) => (
              <motion.button
                key={r.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onUpdate({ currentRevenue: r.id })}
                className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  selections.currentRevenue === r.id
                    ? "border-gps-green bg-gps-green/5 text-gps-green"
                    : "border-gray-200 bg-white text-gps-slate hover:border-gps-green/40"
                }`}
              >
                {r.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepResults({ selections, estimate }: { selections: Selections; estimate: RevenueEstimate }) {
  const venueLabel = VENUE_TYPES.find((v) => v.id === selections.venueType)?.label ?? "";
  const comparables = selections.venueType ? COMPARABLE_PROJECTS[selections.venueType] : [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4"
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-bold text-white">Your Revenue Potential</h2>
        <p className="text-white/70 max-w-lg mx-auto">
          Based on your {venueLabel.toLowerCase()} profile, here is your estimated sponsorship opportunity.
        </p>
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
        >
          <p className="text-sm text-white/60 uppercase tracking-wider mb-2">Annual Naming Rights</p>
          <p className="text-2xl md:text-3xl font-bold text-gps-gold">
            <CurrencyCounter value={estimate.namingRightsLow} />
          </p>
          <p className="text-white/40 text-sm my-1">to</p>
          <p className="text-2xl md:text-3xl font-bold text-gps-gold">
            <CurrencyCounter value={estimate.namingRightsHigh} duration={2.2} />
          </p>
          <p className="text-xs text-white/50 mt-2">per year</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center"
        >
          <p className="text-sm text-white/60 uppercase tracking-wider mb-2">Total Package Value</p>
          <p className="text-2xl md:text-3xl font-bold text-gps-gold">
            <CurrencyCounter value={estimate.totalPackageLow} duration={2.3} />
          </p>
          <p className="text-white/40 text-sm my-1">to</p>
          <p className="text-2xl md:text-3xl font-bold text-gps-gold">
            <CurrencyCounter value={estimate.totalPackageHigh} duration={2.5} />
          </p>
          <p className="text-xs text-white/50 mt-2">per year (all sponsorships)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-gps-gold/30 text-center"
        >
          <p className="text-sm text-white/60 uppercase tracking-wider mb-2">5-Year Projection</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            <CurrencyCounter value={estimate.fiveYearLow} duration={2.5} />
          </p>
          <p className="text-white/40 text-sm my-1">to</p>
          <p className="text-2xl md:text-3xl font-bold text-white">
            <CurrencyCounter value={estimate.fiveYearHigh} duration={2.8} />
          </p>
          <p className="text-xs text-white/50 mt-2">cumulative (with ~3% annual growth)</p>
        </motion.div>
      </div>

      {/* Comparable Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h3 className="text-lg font-semibold text-white/80 text-center mb-4">Comparable GPS Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {comparables.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.4 }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm font-medium text-white">{c.name}</p>
              <p className="text-xs text-gps-gold mt-1">{c.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-center space-y-4 pt-4"
      >
        <p className="text-white/70 max-w-md mx-auto">
          These estimates are based on industry benchmarks. A custom analysis from our team can identify the exact
          opportunity for your facility.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gps-gold hover:bg-gps-gold-light text-gps-slate font-bold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Ready to Unlock This Revenue?
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <p className="text-white/40 text-sm">Free consultation &mdash; no obligation</p>
      </motion.div>
    </div>
  );
}

// ── Main Calculator Component ──────────────────────────────────────────────────

const STEP_LABELS = ["Venue Type", "Market Size", "Facility Details", "Your Results"];

export default function CalculatorContent() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [selections, setSelections] = useState<Selections>({
    venueType: null,
    marketSize: null,
    capacity: 5000,
    annualEvents: 50,
    currentRevenue: null,
  });

  const estimate = calculateEstimate(selections);

  const canAdvance = useCallback(() => {
    if (step === 0) return selections.venueType !== null;
    if (step === 1) return selections.marketSize !== null;
    if (step === 2) return selections.currentRevenue !== null;
    return false;
  }, [step, selections]);

  const goNext = useCallback(() => {
    if (canAdvance() && step < 3) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [canAdvance, step]);

  const goBack = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }, [step]);

  const updateSelections = useCallback((updates: Partial<Selections>) => {
    setSelections((prev) => ({ ...prev, ...updates }));
  }, []);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  const isResults = step === 3;

  return (
    <section className={`min-h-screen transition-colors duration-700 ${isResults ? "bg-gradient-to-br from-gps-green-dark via-gps-green to-gps-green-light" : "bg-gps-cream"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-3">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    scale: i === step ? 1.15 : 1,
                    backgroundColor: i <= step
                      ? isResults ? "rgba(255,255,255,0.9)" : "var(--gps-green)"
                      : isResults ? "rgba(255,255,255,0.2)" : "rgb(229,231,235)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                >
                  {i < step ? (
                    <svg
                      className={`w-4 h-4 ${isResults ? "text-gps-green" : "text-white"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={i <= step ? (isResults ? "text-gps-green" : "text-white") : (isResults ? "text-white/50" : "text-gray-400")}>
                      {i + 1}
                    </span>
                  )}
                </motion.div>
                <span className={`text-xs mt-1.5 hidden sm:block ${i <= step ? (isResults ? "text-white/80" : "text-gps-slate") : (isResults ? "text-white/30" : "text-gps-gray")}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          {/* Bar */}
          <div className={`h-1.5 rounded-full overflow-hidden ${isResults ? "bg-white/20" : "bg-gray-200"}`}>
            <motion.div
              className={`h-full rounded-full ${isResults ? "bg-white/80" : "bg-gps-green"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {step === 0 && (
                <StepVenueType
                  selected={selections.venueType}
                  onSelect={(v) => {
                    updateSelections({ venueType: v });
                    // auto-advance after a short delay for a smooth feel
                    setTimeout(() => {
                      setDirection(1);
                      setStep(1);
                    }, 350);
                  }}
                />
              )}
              {step === 1 && (
                <StepMarketSize
                  selected={selections.marketSize}
                  onSelect={(v) => {
                    updateSelections({ marketSize: v });
                    setTimeout(() => {
                      setDirection(1);
                      setStep(2);
                    }, 350);
                  }}
                />
              )}
              {step === 2 && (
                <StepFacilityDetails selections={selections} onUpdate={updateSelections} />
              )}
              {step === 3 && <StepResults selections={selections} estimate={estimate} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="max-w-2xl mx-auto mt-10 flex items-center justify-between">
          {step > 0 ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={goBack}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                isResults
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-gps-gray hover:text-gps-slate hover:bg-white"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </motion.button>
          ) : (
            <div />
          )}

          {step < 3 && step === 2 && (
            <motion.button
              whileHover={canAdvance() ? { scale: 1.03 } : {}}
              whileTap={canAdvance() ? { scale: 0.97 } : {}}
              onClick={goNext}
              disabled={!canAdvance()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ${
                canAdvance()
                  ? "bg-gps-green text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              See My Results
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}

          {step === 3 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setDirection(-1);
                setStep(0);
                setSelections({
                  venueType: null,
                  marketSize: null,
                  capacity: 5000,
                  annualEvents: 50,
                  currentRevenue: null,
                });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Start Over
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
