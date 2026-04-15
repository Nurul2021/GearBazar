/**
 * WhyChooseUs Component
 * Sales-focused trust-building section
 */

"use client";

import Link from "next/link";
import {
  Shield,
  Truck,
  BadgeDollarSign,
  Headphones,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Genuine Parts",
    description: "Certified authentic parts directly from manufacturers",
    color: "bg-green-500",
  },
  {
    icon: BadgeDollarSign,
    title: "Wholesale Prices",
    description: "Best rates for garages and resellers – save up to 40%",
    color: "bg-red-500",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day dispatch. Free shipping on orders over $100",
    color: "bg-blue-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. No questions asked",
    color: "bg-orange-500",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "24/7 technical support from certified auto experts",
    color: "bg-purple-500",
  },
  {
    icon: CheckCircle,
    title: "Cash on Delivery",
    description: "Pay when you receive. Secure payments on delivery",
    color: "bg-teal-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Why Choose GearBazar?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The trusted platform for auto parts – professional grade parts at
            wholesale prices
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Ready to start saving?
              </h3>
              <p className="text-slate-300">
                Register as a garage owner and get access to wholesale pricing
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all"
              >
                Register as Reseller
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
