/**
 * Vehicle Part Finder Widget
 * Search widget with cascading dropdowns for make/model/year
 * Fits perfectly in Hero section, mobile-responsive
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { ChevronDown, Search, Loader2, Car } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const DEFAULT_MAKES = [
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
  toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma", "4Runner"],
  honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  ford: ["F-150", "Mustang", "Explorer", "Escape", "Bronco"],
  bmw: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  mercedes: ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
  audi: ["A3", "A4", "Q5", "Q7", "A6"],
  hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Palisade"],
  kia: ["Forte", "K5", "Sportage", "Telluride", "Sorento"],
  nissan: ["Altima", "Rogue", "Sentra", "Pathfinder", "Armada"],
  chevrolet: ["Malibu", "Silverado", "Equinox", "Tahoe", "Camaro"],
};

const DEFAULT_YEARS = Array.from(
  { length: 25 },
  (_, i) => new Date().getFullYear() - i,
);

export default function VehiclePartFinder() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [isOpen, setIsOpen] = useState({
    make: false,
    model: false,
    year: false,
  });

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
      console.log("Using default models");
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
    if (year) params.set("year", year);

    router.push(`/products?${params.toString()}`);
  };

  const currentModels =
    models.length > 0
      ? models
      : DEFAULT_MAKES.find((m) => m.name.toLowerCase() === make?.toLowerCase())
        ? DEFAULT_MODELS[make.toLowerCase()]
        : [];
  const currentYears = DEFAULT_YEARS;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Find Parts for Your Vehicle
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Select your vehicle to see compatible parts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Make Dropdown */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              Make
            </label>
            <button
              type="button"
              onClick={() => setIsOpen({ ...isOpen, make: !isOpen.make })}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <span
                className={`text-sm truncate ${make ? "text-slate-900" : "text-slate-400"}`}
              >
                {make || "Select Make"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${isOpen.make ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen.make && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                {DEFAULT_MAKES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      handleMakeChange(item.name);
                      setIsOpen({ ...isOpen, make: false });
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${make === item.name ? "bg-primary-50 text-primary-600 font-medium" : "text-slate-700"}`}
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
                make && setIsOpen({ ...isOpen, model: !isOpen.model })
              }
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                className={`w-4 h-4 text-slate-400 transition-transform ${isOpen.model ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen.model && models.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                {currentModels.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setModel(item);
                      setIsOpen({ ...isOpen, model: false });
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${model === item ? "bg-primary-50 text-primary-600 font-medium" : "text-slate-700"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              Year
            </label>
            <button
              type="button"
              onClick={() => setIsOpen({ ...isOpen, year: !isOpen.year })}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-left transition-all focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <span
                className={`text-sm truncate ${year ? "text-slate-900" : "text-slate-400"}`}
              >
                {year || "Select Year"}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform ${isOpen.year ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen.year && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-auto">
                {currentYears.map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => {
                      setYear(yr.toString());
                      setIsOpen({ ...isOpen, year: false });
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${year === yr.toString() ? "bg-primary-50 text-primary-600 font-medium" : "text-slate-700"}`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Find Button */}
          <div className="flex items-end">
            <button
              onClick={handleFindParts}
              disabled={!make && !model && !year}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Find Parts</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
          <span className="text-xs text-slate-500">Popular:</span>
          {["Toyota Camry", "Honda Civic", "Ford F-150"].map((quick) => (
            <button
              key={quick}
              onClick={() => {
                const [make, model] = quick.split(" ");
                handleMakeChange(make);
                setTimeout(() => setModel(model), 100);
              }}
              className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
            >
              {quick}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
