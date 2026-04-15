"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Search, Filter, ChevronRight, X, Car } from "lucide-react";
import {
  CategorySidebar,
  MobileSidebar,
  CATEGORIES,
} from "@/components/categories/CategorySidebar";
import {
  VehicleSelector,
  getItemCountForVehicle,
} from "@/components/categories/VehicleSelector";
import NestedCategoryGrid from "@/components/categories/NestedCategoryGrid";

export default function CategoryGridPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({
    make: "",
    model: "",
    year: "",
  });

  const filteredCategories = CATEGORIES.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subcategories.some((sub) =>
        sub.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const activeCategoryData = activeCategory
    ? CATEGORIES.find((c) => c.id === activeCategory)
    : null;

  const totalItems = CATEGORIES.reduce((sum, cat) => sum + cat.itemCount, 0);

  const hasVehicleSelected =
    selectedVehicle.make || selectedVehicle.model || selectedVehicle.year;

  const handleVehicleChange = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleClearVehicle = () => {
    setSelectedVehicle({ make: "", model: "", year: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Browse Categories
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Explore our wide range of automotive parts and accessories
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <span className="text-2xl font-bold text-white">
                  {CATEGORIES.length}
                </span>
                <span className="text-white/70 ml-2">Categories</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                <span className="text-2xl font-bold text-white">
                  {totalItems}
                </span>
                <span className="text-white/70 ml-2">Products</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-20"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Vehicle Selector Bar */}
      <div className="bg-slate-100 border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600">
              <Car className="w-5 h-5" />
              <span className="text-sm font-medium">Select Your Vehicle:</span>
            </div>
            <div className="flex-1">
              <VehicleSelector
                selected={selectedVehicle}
                onChange={handleVehicleChange}
                onClear={handleClearVehicle}
              />
            </div>
            {hasVehicleSelected && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                <span className="font-medium">
                  {selectedVehicle.year} {selectedVehicle.make}{" "}
                  {selectedVehicle.model}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden sticky top-0 z-30 px-4 py-3 bg-white border-b border-slate-200">
        <button
          onClick={() => setShowMobileSidebar(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Filter className="w-5 h-5" />
          Filter Categories
        </button>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Desktop Sticky Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <CategorySidebar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </aside>

          {/* Mobile Sidebar */}
          <MobileSidebar
            isOpen={showMobileSidebar}
            onClose={() => setShowMobileSidebar(false)}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Main Grid */}
          <main className="flex-1">
            {/* Active Category Header */}
            {activeCategoryData && (
              <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeCategoryData.color?.replace("text-", "from-").replace("500", "-400").replace("500", "-500")} to-slate-600 flex items-center justify-center`}
                  >
                    <activeCategoryData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {activeCategoryData.name}
                    </h2>
                    <p className="text-slate-500">
                      {activeCategoryData.subcategories.length} subcategories
                      available
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  ← View all categories
                </button>
              </div>
            )}

            {/* Search Bar (Mobile) */}
            <div className="lg:hidden mb-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Category Grid - Nested with Framer Motion */}
            <NestedCategoryGrid selectedVehicle={selectedVehicle} />

            {/* Empty State */}
            {filteredCategories.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No categories found
                </h3>
                <p className="text-slate-500 mb-6">Try adjusting your search</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Popular Brands */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                Popular Brands
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Brembo",
                  "NGK",
                  "Bosch",
                  "Mobil",
                  "Michelin",
                  "Castrol",
                  "Monroe",
                  "KYB",
                ].map((brand) => (
                  <Link
                    key={brand}
                    href={`/products?brand=${brand.toLowerCase()}`}
                    className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-medium hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md transition-all"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
