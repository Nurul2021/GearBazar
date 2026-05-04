/**
 * HeroSection Component
 * High-Impact, Sales-Focused Hero for Auto-Parts Marketplace
 * Professional design with vehicle search widget
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  ChevronDown,
  Search,
  Loader2,
  Car,
  Wrench,
  Shield,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const isDemo = process.env.NEXT_PUBLIC_DEMO === "true";
const API_URL = isDemo
  ? "/api"
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:5003/api";

const MAKES = [
  { id: "toyota", name: "Toyota" },
  { id: "honda", name: "Honda" },
  { id: "ford", name: "Ford" },
  { id: "bmw", name: "BMW" },
  { id: "mercedes", name: "Mercedes-Benz" },
  { id: "audi", name: "Audi" },
  { id: "hyundai", name: "Hyundai" },
  { id: "kia", name: "Kia" },
  { id: "nissan", name: "Nissan" },
  { id: "chevrolet", name: "Chevrolet" },
];

const DEFAULT_MODELS = {
  toyota: [
    "Camry",
    "Corolla",
    "RAV4",
    "Highlander",
    "Tacoma",
    "4Runner",
    "Prado",
  ],
  honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V", "City"],
  ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco", "Ranger"],
  bmw: ["3 Series", "5 Series", "X3", "X5", "7 Series", "X7"],
  mercedes: ["C-Class", "E-Class", "GLC", "GLE", "S-Class", "A-Class"],
  audi: ["A3", "A4", "Q5", "Q7", "A6", "Q3"],
  hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade", "Creta"],
  kia: ["Forte", "K5", "Sportage", "Telluride", "Sorento", "Seltos"],
  nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Armada", "X-Trail"],
  chevrolet: [
    "Malibu",
    "Silverado",
    "Equinox",
    "Tahoe",
    "Camaro",
    "Trailblazer",
  ],
};

const YEARS = Array.from(
  { length: 25 },
  (_, i) => new Date().getFullYear() - i,
);

export default function HeroSection() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchModels = useDebouncedCallback(async (selectedMake) => {
    if (!selectedMake) {
      setModels([]);
      return;
    }
    setLoadingModels(true);
    try {
      const response = await fetch(
        `${API_URL}/vehicles/models?make=${selectedMake}`,
      );
      const data = await response.json();
      setModels(
        data.models || DEFAULT_MODELS[selectedMake.toLowerCase()] || [],
      );
    } catch (error) {
      setModels(DEFAULT_MODELS[selectedMake.toLowerCase()] || []);
    } finally {
      setLoadingModels(false);
    }
  }, 300);

  const handleMakeChange = (value) => {
    setMake(value);
    setModel("");
    setModels([]);
    if (value) {
      fetchModels(value);
    }
  };

  const handleFindParts = () => {
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (yearFrom) params.set("yearFrom", yearFrom);
    if (yearTo) params.set("yearTo", yearTo);
    router.push(`/products?${params.toString()}`);
  };

  const currentModels =
    models.length > 0 ? models : DEFAULT_MODELS[make?.toLowerCase()] || [];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80"
          alt="Auto parts warehouse"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm font-medium">
                  Genuine Parts
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Truck className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">
                  Fast Delivery
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm font-medium">
                  Best Prices
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Find the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Right Parts
              </span>{" "}
              for Your Car
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl">
              Wholesale prices for garages. Genuine auto parts for every
              vehicle. Trusted by 50,000+ customers nationwide.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
              >
                <Search className="w-5 h-5" />
                Purchas Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-all"
              >
                <Wrench className="w-5 h-5" />
                Become a Reseller
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  10K+
                </div>
                <div className="text-slate-400 text-sm">Products</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  500+
                </div>
                <div className="text-slate-400 text-sm">Verified Sellers</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-bold text-white">
                  50K+
                </div>
                <div className="text-slate-400 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Vehicle Search Widget */}
          <div className="lg:pl-8">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Find Parts for Your Vehicle
                  </h3>
                  <p className="text-sm text-slate-500">
                    Select your vehicle to see compatible parts
                  </p>
                </div>
              </div>

              {/* Dropdowns Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Make Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Make
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "make" ? null : "make")
                    }
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <span
                      className={`text-sm truncate ${make ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {make || "Select Make"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "make" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === "make" && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                      {MAKES.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            handleMakeChange(item.name);
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors ${make === item.name ? "bg-red-50 text-red-600 font-medium" : "text-slate-700"}`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Model Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Model
                  </label>
                  <button
                    type="button"
                    disabled={!make || loadingModels}
                    onClick={() =>
                      make &&
                      setOpenDropdown(openDropdown === "model" ? null : "model")
                    }
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingModels ? (
                      <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                    ) : (
                      <span
                        className={`text-sm truncate ${model ? "text-slate-900" : "text-slate-400"}`}
                      >
                        {model || (make ? "Select Model" : "Select Make First")}
                      </span>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "model" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === "model" && currentModels.length > 0 && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                      {currentModels.map((item, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setModel(item);
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors ${model === item ? "bg-red-50 text-red-600 font-medium" : "text-slate-700"}`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Year From Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Year From
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "yearFrom" ? null : "yearFrom",
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <span
                      className={`text-sm truncate ${yearFrom ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {yearFrom || "From"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "yearFrom" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === "yearFrom" && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                      {YEARS.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => {
                            setYearFrom(yr.toString());
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors ${yearFrom === yr.toString() ? "bg-red-50 text-red-600 font-medium" : "text-slate-700"}`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Year To Dropdown */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Year To
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "yearTo" ? null : "yearTo",
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <span
                      className={`text-sm truncate ${yearTo ? "text-slate-900" : "text-slate-400"}`}
                    >
                      {yearTo || "To"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${openDropdown === "yearTo" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openDropdown === "yearTo" && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                      {YEARS.map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => {
                            setYearTo(yr.toString());
                            setOpenDropdown(null);
                          }}
                          className={`w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors ${yearTo === yr.toString() ? "bg-red-50 text-red-600 font-medium" : "text-slate-700"}`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Find Button */}
              <button
                onClick={handleFindParts}
                disabled={!make && !model && !yearFrom && !yearTo}
                className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Search className="w-5 h-5" />
                Find Parts
              </button>

              {/* Quick Links */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                <span className="text-xs text-slate-500">Popular:</span>
                {["Toyota Camry", "Honda Civic", "Ford F-150"].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => {
                      const [m, mo] = quick.split(" ");
                      handleMakeChange(m);
                      setTimeout(() => setModel(mo), 100);
                    }}
                    className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Trust Note */}
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>100% Genuine Parts • Cash on Delivery • Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
