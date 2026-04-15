/**
 * Testimonials Component
 * Social proof for sales conversion
 */

"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Md. Rahman",
    role: "Garage Owner, Dhaka",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Best decision to switch to GearBazar. Get genuine parts at wholesale rates. My repair costs dropped by 30%!",
  },
  {
    name: "Fatema Begum",
    role: "Auto Parts Shop, Chittagong",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Fast delivery and authentic products. My customers trust me because I source from GearBazar.",
  },
  {
    name: "Khalid Hasan",
    role: "Service Center Manager, Sylhet",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    text: "Wholesale pricing for garajes is a game-changer. Professional support team always helps find the right part.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Trusted by 50,000+ Customers
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Join thousands of satisfied garage owners and resellers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/50 rounded-2xl p-6 lg:p-8 border border-slate-700"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-red-500/30 mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 mb-6 italic">"{testimonial.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-slate-800">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
              50K+
            </div>
            <div className="text-slate-400 text-sm">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
              10K+
            </div>
            <div className="text-slate-400 text-sm">Products</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
              500+
            </div>
            <div className="text-slate-400 text-sm">Verified Sellers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
              98%
            </div>
            <div className="text-slate-400 text-sm">Positive Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}
