"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgePercent, Truck } from "lucide-react";

export default function DualPromotionalBanner() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl group">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1600&q=80"
              alt="Premium Auto Parts"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="px-8 lg:px-16 w-full max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center gap-2 px-4 py-1.5 bg-red-500 text-white text-sm font-semibold rounded-full">
                  <BadgePercent className="w-4 h-4" />
                  Limited Time Offer
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl/tight font-extrabold text-white mb-4">
                Get <span className="text-red-500">15% Off</span> Your First
                Order
              </h2>

              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                Premium quality auto parts at unbeatable prices. Use code at
                checkout and save big on your first purchase.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 hover:shadow-red-600/50"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                >
                  <Truck className="w-5 h-5" />
                  Register for Garage Pricing
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 lg:right-16 hidden lg:block">
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="text-center">
                <span className="block text-5xl lg:text-6xl font-black text-white">
                  15%
                </span>
                <span className="block text-sm text-slate-400 uppercase tracking-wider mt-1">
                  Discount
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
