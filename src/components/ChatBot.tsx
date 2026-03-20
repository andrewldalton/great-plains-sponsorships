"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone, Mail, ExternalLink } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatOption {
  label: string;
  action: string; // step key or URL (starts with "/" or "tel:" or "mailto:")
}

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string | React.ReactNode;
  options?: ChatOption[];
}

// ─── Revenue lookup helper ───────────────────────────────────────────────────

function getRevenueEstimate(
  facility: string,
  market: string
): { range: string; example: string } {
  const estimates: Record<string, Record<string, { range: string; example: string }>> = {
    "Sports Complex": {
      "Under 50K": { range: "$500K–$2M", example: "Gretna Crossing Sports Complex" },
      "50K-250K": { range: "$2M–$8M", example: "the Scheels Overland Park Soccer Complex" },
      "250K-1M": { range: "$5M–$15M", example: "the Mid-America Center" },
      "1M+": { range: "$10M–$30M+", example: "Levi's Stadium" },
    },
    "Recreation Center": {
      "Under 50K": { range: "$250K–$1M", example: "community recreation partnerships" },
      "50K-250K": { range: "$1M–$4M", example: "the Denny Sanford Premier Center" },
      "250K-1M": { range: "$3M–$10M", example: "similar mid-market recreation facilities" },
      "1M+": { range: "$8M–$20M", example: "major metro recreation complexes" },
    },
    "Stadium/Arena": {
      "Under 50K": { range: "$1M–$5M", example: "Werner Park" },
      "50K-250K": { range: "$5M–$15M", example: "the Denny Sanford Premier Center" },
      "250K-1M": { range: "$10M–$30M", example: "regional arenas GPS has consulted on" },
      "1M+": { range: "$20M–$50M+", example: "Levi's Stadium" },
    },
    "Event Center": {
      "Under 50K": { range: "$250K–$1.5M", example: "community event center projects" },
      "50K-250K": { range: "$1.5M–$6M", example: "the Denny Sanford Premier Center" },
      "250K-1M": { range: "$5M–$15M", example: "mid-market event venues" },
      "1M+": { range: "$10M–$25M+", example: "Levi's Stadium's event partnerships" },
    },
    Other: {
      "Under 50K": { range: "$200K–$1M", example: "small-market GPS projects" },
      "50K-250K": { range: "$1M–$5M", example: "comparable GPS partnerships" },
      "250K-1M": { range: "$4M–$12M", example: "mid-sized GPS engagements" },
      "1M+": { range: "$8M–$25M+", example: "large-scale GPS projects" },
    },
  };

  return (
    estimates[facility]?.[market] ?? {
      range: "$1M–$10M",
      example: "similar GPS projects across the country",
    }
  );
}

// ─── Decision-tree step definitions ──────────────────────────────────────────

type StepBuilder = (ctx: Record<string, string>) => ChatMessage[];

const steps: Record<string, StepBuilder> = {
  // ── Root ──────────────────────────────────────────────────────────────────
  start: () => [
    {
      id: "start-1",
      type: "bot",
      content:
        "Hi! \u{1F44B} I'm the GPS Assistant. I can help you explore how sponsorships could work for your organization. What brings you here today?",
      options: [
        { label: "I want to learn about naming rights", action: "learn" },
        { label: "I have a facility that needs sponsorship", action: "facility" },
        { label: "I'd like to see your past projects", action: "projects" },
        { label: "I want to talk to someone", action: "contact" },
      ],
    },
  ],

  // ── Branch 1: Learn about naming rights ────────────────────────────────
  learn: () => [
    {
      id: "learn-1",
      type: "bot",
      content:
        "Great choice! Naming rights are one of the most powerful revenue tools available. GPS has facilitated over $300M in career transactions. What type of facility are you interested in?",
      options: [
        { label: "Sports Complex", action: "learn-sports" },
        { label: "Municipal / City Facility", action: "learn-municipal" },
        { label: "Entertainment Venue", action: "learn-entertainment" },
        { label: "Something else", action: "learn-other" },
      ],
    },
  ],

  "learn-sports": () => [
    {
      id: "learn-sports-1",
      type: "bot",
      content:
        "Sports complexes are a sweet spot for naming rights. From youth soccer to multi-use athletic campuses, sponsors love the visibility and community connection. Our Gretna Crossing project is a perfect example of what's possible.",
    },
    {
      id: "learn-sports-2",
      type: "bot",
      content: "Would you like to estimate your revenue potential or talk to our team?",
      options: [
        { label: "Try the ROI Calculator", action: "/calculator" },
        { label: "Contact GPS", action: "/contact" },
      ],
    },
  ],

  "learn-municipal": () => [
    {
      id: "learn-municipal-1",
      type: "bot",
      content:
        "Municipal and city facilities offer unique naming opportunities. Parks, recreation centers, and civic venues all attract strong sponsor interest. The Denny Sanford Premier Center is a great case study in municipal naming rights done right.",
    },
    {
      id: "learn-municipal-2",
      type: "bot",
      content: "Would you like to estimate your revenue potential or talk to our team?",
      options: [
        { label: "Try the ROI Calculator", action: "/calculator" },
        { label: "Contact GPS", action: "/contact" },
      ],
    },
  ],

  "learn-entertainment": () => [
    {
      id: "learn-ent-1",
      type: "bot",
      content:
        "Entertainment venues command premium naming rights valuations. High foot traffic and media exposure make them incredibly attractive to sponsors. Levi's Stadium is a landmark example of how naming rights can transform a venue's revenue.",
    },
    {
      id: "learn-ent-2",
      type: "bot",
      content: "Would you like to estimate your revenue potential or talk to our team?",
      options: [
        { label: "Try the ROI Calculator", action: "/calculator" },
        { label: "Contact GPS", action: "/contact" },
      ],
    },
  ],

  "learn-other": () => [
    {
      id: "learn-other-1",
      type: "bot",
      content:
        "Naming rights work for all kinds of facilities \u2014 convention centers, aquatic parks, trails, and more. If there's a built environment and a community that uses it, there's sponsorship potential. GPS has worked across 30+ unique projects.",
    },
    {
      id: "learn-other-2",
      type: "bot",
      content: "Would you like to estimate your revenue potential or talk to our team?",
      options: [
        { label: "Try the ROI Calculator", action: "/calculator" },
        { label: "Contact GPS", action: "/contact" },
      ],
    },
  ],

  // ── Branch 2: Have a facility ──────────────────────────────────────────
  facility: () => [
    {
      id: "facility-1",
      type: "bot",
      content: "Exciting! Let\u2019s learn a bit about your project. What type of facility is it?",
      options: [
        { label: "Sports Complex", action: "fac-type-sports" },
        { label: "Recreation Center", action: "fac-type-rec" },
        { label: "Stadium / Arena", action: "fac-type-stadium" },
        { label: "Event Center", action: "fac-type-event" },
        { label: "Other", action: "fac-type-other" },
      ],
    },
  ],

  "fac-type-sports": (ctx) => {
    ctx.facilityType = "Sports Complex";
    return marketSizeStep();
  },
  "fac-type-rec": (ctx) => {
    ctx.facilityType = "Recreation Center";
    return marketSizeStep();
  },
  "fac-type-stadium": (ctx) => {
    ctx.facilityType = "Stadium/Arena";
    return marketSizeStep();
  },
  "fac-type-event": (ctx) => {
    ctx.facilityType = "Event Center";
    return marketSizeStep();
  },
  "fac-type-other": (ctx) => {
    ctx.facilityType = "Other";
    return marketSizeStep();
  },
};

function marketSizeStep(): ChatMessage[] {
  return [
    {
      id: "fac-market",
      type: "bot",
      content: "And roughly how large is your market area (population)?",
      options: [
        { label: "Under 50K", action: "fac-result-Under 50K" },
        { label: "50K\u2013250K", action: "fac-result-50K-250K" },
        { label: "250K\u20131M", action: "fac-result-250K-1M" },
        { label: "1M+", action: "fac-result-1M+" },
      ],
    },
  ];
}

// Dynamic facility-result steps are handled in processAction

// ── Branch 3: See projects ───────────────────────────────────────────────
steps.projects = () => [
  {
    id: "proj-1",
    type: "bot",
    content: "We\u2019ve completed 30+ projects across the country! Here are some highlights:",
  },
  {
    id: "proj-cards",
    type: "bot",
    content: (
      <div className="flex flex-col gap-2">
        <ProjectCard
          name="Gretna Crossing"
          desc="Multi-sport complex \u2014 Gretna, NE"
          href="/projects"
        />
        <ProjectCard
          name="Levi\u2019s Stadium"
          desc="NFL venue \u2014 Santa Clara, CA"
          href="/projects"
        />
        <ProjectCard
          name="Denny Sanford Premier Center"
          desc="Premier event center \u2014 Sioux Falls, SD"
          href="/projects"
        />
      </div>
    ),
  },
  {
    id: "proj-2",
    type: "bot",
    content: "Want to see all our projects or discuss how we can help your organization?",
    options: [
      { label: "View All Projects", action: "/projects" },
      { label: "Contact GPS", action: "/contact" },
    ],
  },
];

// ── Branch 4: Talk to someone ────────────────────────────────────────────
steps.contact = () => [
  {
    id: "contact-1",
    type: "bot",
    content: "Of course! You can reach us directly:",
  },
  {
    id: "contact-card",
    type: "bot",
    content: (
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gps-green shrink-0" />
          <a href="tel:+14026578170" className="underline text-gps-green font-medium">
            (402) 657-8170
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Mail size={14} className="text-gps-green shrink-0" />
          <a
            href="mailto:andrew.dalton@greatplainssponsorships.com"
            className="underline text-gps-green font-medium break-all"
          >
            andrew.dalton@greatplainssponsorships.com
          </a>
        </div>
      </div>
    ),
  },
  {
    id: "contact-2",
    type: "bot",
    content: "Or fill out a quick form and we\u2019ll follow up:",
    options: [
      { label: "Go to Contact Page", action: "/contact" },
      { label: "Call Now", action: "tel:+14026578170" },
    ],
  },
];

// ─── Subcomponents ───────────────────────────────────────────────────────────

function ProjectCard({
  name,
  desc,
  href,
}: {
  name: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-gps-green/10 bg-white p-3 shadow-sm transition hover:shadow-md hover:border-gps-green/30"
    >
      <div>
        <p className="font-semibold text-gps-slate text-sm">{name}</p>
        <p className="text-xs text-gps-gray">{desc}</p>
      </div>
      <ExternalLink size={14} className="text-gps-gray shrink-0" />
    </Link>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 px-1">
      <div className="w-7 h-7 rounded-full bg-gps-green flex items-center justify-center shrink-0">
        <span className="text-white text-[10px] font-bold leading-none">GPS</span>
      </div>
      <div className="bg-gps-cream rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-gps-gray/50 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ChatBot() {
  const pathname = usePathname();
  const router = useRouter();

  // Don't render on the contact page
  if (pathname === "/contact") return null;

  return <ChatBotInner key="chatbot" router={router} />;
}

function ChatBotInner({
  router,
}: {
  router: ReturnType<typeof useRouter>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const ctxRef = useRef<Record<string, string>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Restore open/closed state from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("gps-chat-open");
    if (stored === "true") {
      setIsOpen(true);
      setHasOpened(true);
    }
  }, []);

  // Persist open state
  useEffect(() => {
    sessionStorage.setItem("gps-chat-open", String(isOpen));
  }, [isOpen]);

  // Auto-scroll on new messages or typing
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Deliver bot messages with typing delay
  const deliverMessages = useCallback(
    (msgs: ChatMessage[], delay = 1200) => {
      const botMsgs = msgs.filter((m) => m.type === "bot");
      if (botMsgs.length === 0) return;

      botMsgs.forEach((msg, i) => {
        const timer = setTimeout(() => {
          if (i === 0) setIsTyping(true);
          setTimeout(() => {
            setMessages((prev) => [...prev, msg]);
            if (i === botMsgs.length - 1) setIsTyping(false);
          }, delay);
        }, i * delay);
      });
    },
    []
  );

  // Initial greeting on first open
  const greetingFired = useRef(false);
  useEffect(() => {
    if (!isOpen || greetingFired.current) return;
    greetingFired.current = true;

    const initialDelay = hasOpened ? 0 : 1500;
    setHasOpened(true);

    const timer = setTimeout(() => {
      const msgs = steps.start({});
      deliverMessages(msgs, 1200);
    }, initialDelay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const processAction = useCallback(
    (label: string, action: string) => {
      // Add user message
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: label,
      };
      setMessages((prev) => [...prev, userMsg]);

      // External / navigation links
      if (action.startsWith("/")) {
        setTimeout(() => router.push(action), 400);
        return;
      }
      if (action.startsWith("tel:") || action.startsWith("mailto:")) {
        window.location.href = action;
        return;
      }

      // Handle dynamic facility-result steps
      if (action.startsWith("fac-result-")) {
        const market = action.replace("fac-result-", "");
        ctxRef.current.market = market;
        const { range, example } = getRevenueEstimate(
          ctxRef.current.facilityType,
          market
        );
        const resultMsgs: ChatMessage[] = [
          {
            id: `fac-res-1-${Date.now()}`,
            type: "bot",
            content: `Based on similar projects, facilities like yours typically generate ${range} annually in sponsorship revenue. GPS has worked with ${example}.`,
          },
          {
            id: `fac-res-2-${Date.now()}`,
            type: "bot",
            content: "Want to get a detailed estimate or connect with our team?",
            options: [
              { label: "Try the ROI Calculator", action: "/calculator" },
              { label: "Schedule a Free Consultation", action: "/contact" },
              { label: "See Similar Projects", action: "/projects" },
            ],
          },
        ];
        deliverMessages(resultMsgs);
        return;
      }

      // Standard decision-tree steps
      const stepFn = steps[action];
      if (stepFn) {
        const newMsgs = stepFn(ctxRef.current);
        deliverMessages(newMsgs);
      }
    },
    [deliverMessages, router]
  );

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* ── Floating button ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-fab"
            onClick={handleToggle}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gps-green text-white shadow-lg flex items-center justify-center cursor-pointer hover:bg-gps-green-dark transition-colors"
            aria-label="Open chat"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-gps-green/30" />
            <MessageCircle size={24} className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat panel ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[calc(100vh-3rem)] rounded-2xl bg-white shadow-2xl border border-gps-green/10 flex flex-col overflow-hidden"
          >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 bg-gps-green text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold leading-none">GPS</span>
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">GPS Assistant</p>
                  <p className="text-[11px] text-white/70 leading-tight">
                    Sponsorship Concierge
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggle}
                className="w-7 h-7 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Messages area ───────────────────────────────────────────── */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gps-light/50"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {msg.type === "bot" ? (
                      <BotBubble msg={msg} onOption={processAction} />
                    ) : (
                      <UserBubble msg={msg} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && <TypingIndicator />}
            </div>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <div className="px-4 py-2 border-t border-gps-green/5 bg-white shrink-0">
              <p className="text-[10px] text-gps-gray text-center">
                Powered by Great Plains Sponsorships
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Bubble components ───────────────────────────────────────────────────────

function BotBubble({
  msg,
  onOption,
}: {
  msg: ChatMessage;
  onOption: (label: string, action: string) => void;
}) {
  return (
    <div className="flex items-end gap-2 px-1">
      <div className="w-7 h-7 rounded-full bg-gps-green flex items-center justify-center shrink-0">
        <span className="text-white text-[10px] font-bold leading-none">GPS</span>
      </div>
      <div className="max-w-[85%] space-y-2">
        <div className="bg-gps-cream rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-gps-slate leading-relaxed">
          {msg.content}
        </div>
        {msg.options && msg.options.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-1">
            {msg.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => onOption(opt.label, opt.action)}
                className="text-xs font-medium px-3 py-1.5 rounded-full border border-gps-green/20 text-gps-green bg-white hover:bg-gps-green hover:text-white transition-colors cursor-pointer"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function UserBubble({ msg }: { msg: ChatMessage }) {
  return (
    <div className="flex justify-end px-1">
      <div className="max-w-[85%] bg-gps-green text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed">
        {msg.content}
      </div>
    </div>
  );
}
