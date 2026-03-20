"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

const services = [
  { name: "Naming Rights & Sponsorships", href: "/services#naming-rights" },
  { name: "Owner's Representation", href: "/services#owners-representation" },
  { name: "Pouring Rights", href: "/services#pouring-rights" },
];

const navItems = [
  { name: "Services", href: "/services", dropdown: services },
  { name: "Projects", href: "/projects" },
  { name: "Who We Serve", href: "/who-we-serve" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gps-green/5">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
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
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2.5 bg-gps-green text-white text-sm font-semibold rounded-full hover:bg-gps-green-dark transition-all glow-green"
            >
              Free Consultation
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gps-green/5 text-gps-slate"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gps-green/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-gps-slate hover:text-gps-green hover:bg-gps-green/5 rounded-lg transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2 text-sm text-gps-gray hover:text-gps-green transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block mx-4 mt-3 text-center px-5 py-3 bg-gps-green text-white font-semibold rounded-full"
              >
                Free Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
