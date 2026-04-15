"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  CpuIcon,
  DiscIcon,
  ZapIcon,
  CarIcon,
  CogIcon,
  SettingsIcon,
  WrenchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

const categories = [
  {
    id: "engine",
    name: "Engine",
    icon: CpuIcon,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "suspension",
    name: "Suspension",
    icon: SettingsIcon,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "brakes",
    name: "Brake",
    icon: DiscIcon,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: ZapIcon,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "interior",
    name: "Interior",
    icon: WrenchIcon,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "body",
    name: "Body Parts",
    icon: CarIcon,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "transmission",
    name: "Transmission",
    icon: CogIcon,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "wheels",
    name: "Wheels",
    icon: SettingsIcon,
    color: "bg-gray-100 text-gray-600",
  },
  {
    id: "cooling",
    name: "Cooling",
    icon: SettingsIcon,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    id: "exhaust",
    name: "Exhaust",
    icon: SettingsIcon,
    color: "bg-amber-100 text-amber-600",
  },
];

export default function ProductCategoryGrid() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Shop by Category
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our extensive collection of auto parts by category
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-10 py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.id}`}
                  className="group flex-shrink-0"
                >
                  <div className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-gray-200 w-40 lg:w-44">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors text-center">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6 text-slate-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
