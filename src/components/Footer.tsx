import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  Services: [
    { name: "Naming Rights & Sponsorships", href: "/services#naming-rights" },
    { name: "Owner's Representation", href: "/services#owners-representation" },
    { name: "Pouring Rights", href: "/services#pouring-rights" },
    { name: "Premium Seating", href: "/services#naming-rights" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Who We Serve", href: "/who-we-serve" },
    { name: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gps-green-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/gps-logo.png"
                alt="Great Plains Sponsorships"
                width={45}
                height={45}
                className="brightness-0 invert opacity-90"
              />
              <div>
                <span className="text-lg font-bold tracking-tight">Great Plains</span>
                <span className="block text-xs tracking-widest uppercase text-white/60 -mt-0.5">
                  Sponsorships
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mt-4">
              Midwestern work-ethic meets big-city results. We create profitable,
              sustainable sponsorship platforms for forward-thinking organizations.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gps-gold mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-gps-gold mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gps-gold flex-shrink-0" />
                <span className="text-sm text-white/60">
                  18919 Margo St.<br />Omaha, NE 68136
                </span>
              </li>
              <li>
                <a
                  href="tel:402-657-8170"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-gps-gold flex-shrink-0" />
                  (402) 657-8170
                </a>
              </li>
              <li>
                <a
                  href="mailto:Ryan.Querry@GreatPlainsSponsorships.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-gps-gold flex-shrink-0" />
                  Email Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Great Plains Sponsorships, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
