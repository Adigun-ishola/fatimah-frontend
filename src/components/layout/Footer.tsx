import Link from "next/link";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Scale, Mail, Heart } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a365d] text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <Scale className="w-5 h-5 text-[#1a365d]" />
              </div>
              <div>
                <p className="text-lg font-bold font-['Playfair_Display']">
                  Fatima Adesewa
                </p>
                <p className="text-xs text-gray-400">Jimoh-Sulaiman</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Aspiring legal practitioner committed to justice, legal scholarship,
              and making a positive impact through the law.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@fatimaadesewa.com"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#c9a84c] transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#c9a84c] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#c9a84c] font-semibold text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                Feel free to reach out for collaborations, legal discussions,
                or just to connect.
              </p>
              <Link
                href="/contact"
                className="inline-block px-5 py-2 bg-[#c9a84c] text-[#1a365d] rounded-lg font-medium hover:bg-[#dfc06e] transition-colors mt-2"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="flex items-center mt-2 sm:mt-0">
            Built with <Heart className="w-3 h-3 text-red-400 mx-1" /> for justice & excellence
          </p>
        </div>
      </div>
    </footer>
  );
}
