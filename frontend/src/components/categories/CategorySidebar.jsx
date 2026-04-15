"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  Disc,
  Zap,
  Cog,
  Gauge,
  Droplet,
  FlaskConical,
  Sparkles,
  Box,
  Palette,
  Battery,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  ChevronRight,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "engine",
    name: "Engine Parts",
    slug: "engine",
    icon: Wrench,
    color: "text-orange-500",
    subcategories: [
      "Pistons",
      "Crankshaft",
      "Camshaft",
      "Gaskets",
      "Belts",
      "Filters",
      "Oil Pumps",
    ],
  },
  {
    id: "brakes",
    name: "Brake System",
    slug: "brakes",
    icon: Disc,
    color: "text-red-500",
    subcategories: [
      "Brake Pads",
      "Brake Rotors",
      "Calipers",
      "Brake Lines",
      "Cables",
      "Brake Fluid",
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    slug: "electrical",
    icon: Zap,
    color: "text-yellow-500",
    subcategories: [
      "Alternator",
      "Starter",
      "Battery",
      "Wiring",
      "Sensors",
      "ECU",
      "Lights",
    ],
  },
  {
    id: "suspension",
    name: "Suspension",
    slug: "suspension",
    icon: Gauge,
    color: "text-purple-500",
    subcategories: [
      "Shocks",
      "Struts",
      "Springs",
      "Bushings",
      "Links",
      "Ball Joints",
    ],
  },
  {
    id: "transmission",
    name: "Transmission",
    slug: "transmission",
    icon: Cog,
    color: "text-cyan-500",
    subcategories: [
      "Clutch",
      "Gearbox",
      "Drive Shaft",
      "CV Joint",
      "Fluids",
      "Gears",
    ],
  },
  {
    id: "body",
    name: "Body Parts",
    slug: "body",
    icon: Palette,
    color: "text-sky-500",
    subcategories: [
      "Bumpers",
      "Grilles",
      "Mirrors",
      "Lights",
      "Panels",
      "Fenders",
    ],
  },
  {
    id: "interior",
    name: "Interior",
    slug: "interior",
    icon: Box,
    color: "text-rose-500",
    subcategories: [
      "Seats",
      "Dashboard",
      "Steering",
      "Carpets",
      "Accessories",
      "Electronics",
    ],
  },
  {
    id: "wheels",
    name: "Wheels & Tires",
    slug: "wheels",
    icon: Disc,
    color: "text-slate-500",
    subcategories: [
      "Tires",
      "Alloy Wheels",
      "Steel Rims",
      "Wheel Covers",
      "Balancing",
      "Valves",
    ],
  },
  {
    id: "oils",
    name: "Oils & Fluids",
    slug: "oils",
    icon: Droplet,
    color: "text-amber-500",
    subcategories: [
      "Engine Oil",
      "Brake Fluid",
      "Coolant",
      "Transmission Fluid",
      "Grease",
      "Additives",
    ],
  },
  {
    id: "exhaust",
    name: "Exhaust",
    slug: "exhaust",
    icon: FlaskConical,
    color: "text-stone-500",
    subcategories: [
      "Mufflers",
      "Catalytic Converters",
      "Manifolds",
      "Pipes",
      "Clamps",
      "Gaskets",
    ],
  },
  {
    id: "cooling",
    name: "Cooling System",
    slug: "cooling",
    icon: Battery,
    color: "text-emerald-500",
    subcategories: [
      "Radiator",
      "Water Pump",
      "Thermostat",
      "Hoses",
      "Fan",
      "Coolant",
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    icon: Sparkles,
    color: "text-violet-500",
    subcategories: [
      "Car Care",
      "Electronics",
      "Floor Mats",
      "Covers",
      "Interior",
      "Tools",
    ],
  },
];

function CategoryAccordion({ category, isOpen, onToggle, searchQuery }) {
  const Icon = category.icon;
  const filteredSubcategories = category.subcategories.filter((sub) =>
    sub.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isEmpty = filteredSubcategories.length === 0;

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors ${
          isOpen ? "bg-slate-50" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${category.color}`} />
          <span className="font-medium text-slate-700">{category.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {category.subcategories.length}
          </span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="bg-slate-50/50 pb-3">
          {isEmpty ? (
            <p className="px-4 py-2 text-sm text-slate-400 italic">
              No matching subcategories
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-1 px-4">
              {filteredSubcategories.map((sub) => (
                <Link
                  key={sub}
                  href={`/products?category=${category.slug}&subcategory=${sub.toLowerCase()}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-white rounded-lg transition-colors group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-emerald-500" />
                  {sub}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySidebar({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) {
  const [openCategory, setOpenCategory] = useState(activeCategory);

  const filteredCategories = CATEGORIES.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.subcategories.some((sub) =>
        sub.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <div className="flex flex-col" style={{ maxHeight: "calc(100vh - 12rem)" }}>
      {/* Search Input */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-0 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* All Categories Link */}
      <div className="p-4 border-b border-slate-200">
        <button
          onClick={() => setActiveCategory(null)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
            !activeCategory
              ? "bg-emerald-600 text-white"
              : "hover:bg-slate-100 text-slate-700"
          }`}
        >
          <Box className="w-5 h-5" />
          <span className="font-medium">All Categories</span>
        </button>
      </div>

      {/* Categories List - Scrollable */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 16rem)" }}
      >
        {filteredCategories.map((category) => (
          <CategoryAccordion
            key={category.id}
            category={category}
            isOpen={openCategory === category.id}
            onToggle={() =>
              setOpenCategory(openCategory === category.id ? null : category.id)
            }
            searchQuery={searchQuery}
          />
        ))}

        {filteredCategories.length === 0 && (
          <div className="p-4 text-center">
            <p className="text-sm text-slate-400">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileSidebar({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">Categories</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Category Content */}
        <CategorySidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={(cat) => {
            setActiveCategory(cat);
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export { CategorySidebar, MobileSidebar, CATEGORIES };
