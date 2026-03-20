"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";

const services = [
  { name: "Naming Rights & Sponsorships", href: "/services#naming-rights" },
  { name: "Owner's Representation", href: "/services#owners-representation" },
  { name: "Pouring Rights", href: "/services#pouring-rights" },
];

const navItems = [
  { name: "Services", href: "/services", dropdown: services },
  { name: "Projects", href: "/projects" },
  { name: "Who We Serve", href: "/who-we-serve" },
  { name: "ROI Calculator", href: "/calculator" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gps-green/5">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group relative z-10">
              <Image
                src="/images/gps-logo.png"
                alt="Great Plains Sponsorships"
                width={50}
                height={50}
                className="group-hover:scale-105 transition-transform"
                priority
              />
              <div className="hidden sm:block">
                <span className="text-lg font-bold text-gps-green tracking-tight">
                  Great Plains
                </span>
                <span className="block text-xs text-gps-gray tracking-widest uppercase -mt-0.5">
                  Sponsorships
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gps-slate hover:text-gps-green transition-colors rounded-lg hover:bg-gps-green/5"
                    >
                      {item.name}
                      <ChevronDown className="w-3.5 h-3.5" />
                    </Link>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gps-green/10 overflow-hidden"
                        >
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block px-4 py-3 text-sm text-gps-slate hover:bg-gps-green/5 hover:text-gps-green transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium text-gps-slate hover:text-gps-green transition-colors rounded-lg hover:bg-gps-green/5"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3 relative z-10">
              <MagneticButton className="hidden sm:inline-block">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-2.5 bg-gps-green text-white text-sm font-semibold rounded-full hover:bg-gps-green-dark transition-all glow-green"
                >
                  Free Consultation
                </Link>
              </MagneticButton>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gps-green/5 text-gps-slate"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu — outside header to avoid backdrop-filter containment */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 lg:hidden flex flex-col items-center justify-center px-8"
            style={{ zIndex: 55, backgroundColor: "rgba(61, 79, 95, 0.97)" }}
          >
            <nav className="flex flex-col items-center gap-1 w-full max-w-sm mx-auto">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center w-full"
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-bold text-white hover:text-gps-gold transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="flex flex-col items-center gap-2 mt-2 mb-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-base text-white/60 hover:text-gps-gold transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center px-8 py-4 bg-gps-green text-white text-lg font-semibold rounded-full hover:bg-gps-green-dark transition-all glow-green"
              >
                Free Consultation
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-center"
            >
              <p className="text-white/30 text-sm">(402) 657-8170</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
