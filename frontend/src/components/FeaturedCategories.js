/**
 * FeaturedCategories Component
 * Displays product categories and brand showcase
 */

"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "engine",
    name: "Engine Parts",
    icon: "⚙️",
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=400&q=80",
    count: 1250,
  },
  {
    id: "brakes",
    name: "Brake System",
    icon: "🛑",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    count: 890,
  },
  {
    id: "suspension",
    name: "Suspension",
    icon: "🔩",
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80",
    count: 720,
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "⚡",
    image:
      "https://images.unsplash.com/photo-1552975383-513c7002d408?w=400&q=80",
    count: 1100,
  },
  {
    id: "transmission",
    name: "Transmission",
    icon: "🔄",
    image:
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&q=80",
    count: 650,
  },
  {
    id: "body",
    name: "Body Parts",
    icon: "🚗",
    image:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&q=80",
    count: 980,
  },
  {
    id: "oils",
    name: "Oils & Fluids",
    icon: "🛢️",
    image:
      "https://images.unsplash.com/photo-1506368242239-9d49a5466f7a?w=400&q=80",
    count: 420,
  },
  {
    id: "wheels",
    name: "Wheels & Tires",
    icon: "🔘",
    image:
      "https://images.unsplash.com/photo-1578844251758-2f0316a63835?w=400&q=80",
    count: 560,
  },
  {
    id: "interior",
    name: "Interior",
    icon: "💺",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400&q=80",
    count: 380,
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: "🔧",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=400&q=80",
    count: 720,
  },
];

const brands = [
  {
    id: "toyota",
    name: "Toyota",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Toyota_logo.png",
  },
  {
    id: "honda",
    name: "Honda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Honda_logo.png",
  },
  {
    id: "bosch",
    name: "Bosch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Robert_Bosch_GmbH_logo.svg",
  },
  {
    id: "denso",
    name: "Denso",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Denso_logo.svg",
  },
  {
    id: "ford",
    name: "Ford",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
  },
  {
    id: "ngk",
    name: "NGK",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/NGK_Spark_Plugs_logo.svg",
  },
  {
    id: "mobil",
    name: "Mobil",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Mobil_Logo.svg",
  },
  {
    id: "monroe",
    name: "Monroe",
    logo: "https://www.monroe.com/content/dam/monroe/global/monroe-logo.svg",
  },
  {
    id: "castrol",
    name: "Castrol",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Castrol_logo.svg",
  },
  {
    id: "goodyear",
    name: "Goodyear",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Goodyear_Tire_%26_Rubber_Company_logo.svg",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Shop by Category
          </h2>
          <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
            Browse our extensive collection of auto parts by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image */}
                <div className="relative h-32 lg:h-40 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                  {/* Icon Overlay */}
                  <div className="absolute bottom-2 left-3 text-2xl lg:text-3xl">
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {category.count}+ Products
                  </p>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </div>
            </Link>
          ))}
        </div>

        {/* Brand Showcase */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Top Brands
            </h2>
            <Link
              href="/brands"
              className="text-red-600 hover:text-red-700 font-medium flex items-center"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Scrolling Brand Slider */}
          <div className="relative">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* Brands Track */}
            <div className="flex overflow-x-auto scrollbar-hide gap-6 py-4">
              {/* Duplicate brands for infinite scroll effect */}
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <Link
                  key={`${brand.id}-${index}`}
                  href={`/products?brand=${brand.id}`}
                  className="flex-shrink-0 group"
                >
                  <div className="w-28 lg:w-36 h-20 lg:h-24 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center p-4 border border-gray-100 hover:border-red-200">
                    <div className="relative w-full h-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.parentElement.innerHTML = `<span class="text-sm font-bold text-slate-600 text-center">${brand.name}</span>`;
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
