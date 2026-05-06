"use client";
import Link from "next/link";
import { Facebook, Youtube, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "All Products", href: "/products" },
    { label: "Featured Shops", href: "/shops" },
    { label: "Garage Partners", href: "/garages" },
    { label: "Special Offers", href: "/offers" },
    { label: "Brands", href: "/brands" },
  ];

  const customerService = [
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="px-6 py-12 md:px-20 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-3">GearBazar</h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted source for premium auto parts. Quality guaranteed,
              delivered fast.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-300"
              >
                <Youtube size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-300"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              {customerService.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Contact & Partnership
            </h4>
            <div className="space-y-2 text-sm mb-4">
              <p>123 Auto Plaza, Karachi, Pakistan</p>
              <p>support@gearbazar.com</p>
              <p>+92 300 1234567</p>
            </div>
            <Link
              href="/vendor-register"
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors duration-300"
            >
              Join as a Vendor
            </Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2026 GearBazar. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 mr-2">Payments:</span>
            <div className="p-2 bg-slate-800 rounded grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium">Bank Transfer</span>
            </div>
            <div className="p-2 bg-slate-800 rounded grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium">bKash</span>
            </div>
            <div className="p-2 bg-slate-800 rounded grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <span className="text-xs font-medium">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
