/**
 * HowItWorks Component
 * Step-by-step guide for customers
 */

"use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Search Your Parts",
    description:
      "Enter your vehicle details or browse by category to find the right parts for your car",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Add to Cart",
    description:
      "Add products to cart. Verified garages get automatic wholesale pricing applied",
  },
  {
    number: "03",
    icon: Truck,
    title: "Fast Delivery",
    description:
      "We deliver to your doorstep. Same-day shipping on in-stock items",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get the right parts in 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Number */}
              <div className="text-6xl lg:text-7xl font-bold text-slate-200 absolute top-0 left-1/2 -translate-x-1/2 -z-10">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <step.icon className="w-10 h-10 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 max-w-xs mx-auto">
                {step.description}
              </p>

              {/* Arrow Connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-6 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
          >
            Start Finding Parts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
