"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowRight,
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
} from "lucide-react";

const CATEGORY_CONFIG = {
  engine: {
    icon: Wrench,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    accentColor: "text-orange-600",
  },
  brakes: {
    icon: Disc,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    accentColor: "text-red-600",
  },
  electrical: {
    icon: Zap,
    color: "from-yellow-500 to-amber-500",
    bgColor: "bg-yellow-50",
    accentColor: "text-yellow-600",
  },
  suspension: {
    icon: Gauge,
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-600",
  },
  transmission: {
    icon: Cog,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    accentColor: "text-cyan-600",
  },
  body: {
    icon: Palette,
    color: "from-sky-500 to-teal-500",
    bgColor: "bg-sky-50",
    accentColor: "text-sky-600",
  },
  interior: {
    icon: Box,
    color: "from-rose-500 to-orange-400",
    bgColor: "bg-rose-50",
    accentColor: "text-rose-600",
  },
  wheels: {
    icon: Disc,
    color: "from-slate-500 to-zinc-600",
    bgColor: "bg-slate-50",
    accentColor: "text-slate-600",
  },
  oils: {
    icon: Droplet,
    color: "from-amber-600 to-yellow-500",
    bgColor: "bg-amber-50",
    accentColor: "text-amber-600",
  },
  exhaust: {
    icon: FlaskConical,
    color: "from-stone-500 to-neutral-600",
    bgColor: "bg-stone-50",
    accentColor: "text-stone-600",
  },
  cooling: {
    icon: Battery,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    accentColor: "text-emerald-600",
  },
  accessories: {
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    accentColor: "text-violet-600",
  },
};

const CATEGORIES = [
  {
    id: "engine",
    name: "Engine Parts",
    slug: "engine",
    itemCount: 156,
    subcategories: [
      "Pistons",
      "Crankshaft",
      "Camshaft",
      "Gaskets",
      "Belts",
      "Filters",
      "Oil Pumps",
      "Valvetrain",
      "Engine Mounts",
    ],
  },
  {
    id: "brakes",
    name: "Brake System",
    slug: "brakes",
    itemCount: 89,
    subcategories: [
      "Brake Pads",
      "Brake Rotors",
      "Calipers",
      "Brake Lines",
      "Cables",
      "Brake Fluid",
      "ABS Sensors",
      "Brake Boosters",
    ],
  },
  {
    id: "electrical",
    name: "Electrical",
    slug: "electrical",
    itemCount: 234,
    subcategories: [
      "Alternator",
      "Starter",
      "Battery",
      "Wiring",
      "Sensors",
      "ECU",
      "Lights",
      "Fuses",
      "Relays",
    ],
  },
  {
    id: "suspension",
    name: "Suspension",
    slug: "suspension",
    itemCount: 112,
    subcategories: [
      "Shocks",
      "Struts",
      "Springs",
      "Bushings",
      "Links",
      "Ball Joints",
      "Control Arms",
      "Sway Bars",
    ],
  },
  {
    id: "transmission",
    name: "Transmission",
    slug: "transmission",
    itemCount: 78,
    subcategories: [
      "Clutch",
      "Gearbox",
      "Drive Shaft",
      "CV Joint",
      "Fluids",
      "Gears",
      "Torque Converters",
      "Flywheel",
    ],
  },
  {
    id: "body",
    name: "Body Parts",
    slug: "body",
    itemCount: 198,
    subcategories: [
      "Bumpers",
      "Grilles",
      "Mirrors",
      "Lights",
      "Panels",
      "Fenders",
      "Doors",
      "Hoods",
      "Trunks",
    ],
  },
  {
    id: "interior",
    name: "Interior",
    slug: "interior",
    itemCount: 145,
    subcategories: [
      "Seats",
      "Dashboard",
      "Steering",
      "Carpets",
      "Accessories",
      "Electronics",
      "Console",
      "Door Panels",
    ],
  },
  {
    id: "wheels",
    name: "Wheels & Tires",
    slug: "wheels",
    itemCount: 267,
    subcategories: [
      "Tires",
      "Alloy Wheels",
      "Steel Rims",
      "Wheel Covers",
      "Balancing",
      "Valves",
      "TPMS",
      "Wheel Bearings",
    ],
  },
  {
    id: "oils",
    name: "Oils & Fluids",
    slug: "oils",
    itemCount: 312,
    subcategories: [
      "Engine Oil",
      "Brake Fluid",
      "Coolant",
      "Transmission Fluid",
      "Grease",
      "Additives",
      "Power Steering",
    ],
  },
  {
    id: "exhaust",
    name: "Exhaust",
    slug: "exhaust",
    itemCount: 64,
    subcategories: [
      "Mufflers",
      "Catalytic Converters",
      "Manifolds",
      "Pipes",
      "Clamps",
      "Gaskets",
      "Resonators",
    ],
  },
  {
    id: "cooling",
    name: "Cooling System",
    slug: "cooling",
    itemCount: 95,
    subcategories: [
      "Radiator",
      "Water Pump",
      "Thermostat",
      "Hoses",
      "Fan",
      "Coolant",
      "Expansion Tanks",
      "Heater Core",
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    itemCount: 421,
    subcategories: [
      "Car Care",
      "Electronics",
      "Floor Mats",
      "Covers",
      "Interior",
      "Tools",
      "Emergency Kits",
      "Phone Mounts",
    ],
  },
];

function NestedCategoryCard({ category, index, selectedVehicle }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const config = CATEGORY_CONFIG[category.id];
  const Icon = config?.icon || Box;

  const getItemCount = () => {
    if (!selectedVehicle?.make) return category.itemCount;
    const baseCount = category.itemCount * (0.6 + Math.random() * 0.4);
    return Math.round(baseCount);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative"
      onMouseEnter={() => {
        setIsHovered(true);
        setIsExpanded(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setTimeout(() => {
          if (!isHovered) setIsExpanded(false);
        }, 200);
      }}
    >
      <motion.div
        layout
        className={`
          relative overflow-hidden rounded-3xl
          bg-white border border-slate-200/60
          transition-all duration-300
          ${
            isExpanded
              ? "ring-2 ring-emerald-400 shadow-xl shadow-emerald-200/30"
              : "hover:shadow-lg hover:shadow-slate-200/30"
          }
        `}
      >
        {/* Background Color */}
        <motion.div
          className={`absolute inset-0 ${config?.bgColor || "bg-slate-50"} opacity-0 transition-opacity duration-300`}
          animate={{ opacity: isExpanded ? 0.5 : 0 }}
        />

        {/* Main Content */}
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div
              className={`
                w-14 h-14 rounded-2xl
                flex items-center justify-center
                bg-gradient-to-br ${config?.color || "from-slate-500 to-slate-600"}
                shadow-lg
              `}
              animate={{
                scale: isExpanded ? 1.1 : 1,
                rotate: isExpanded ? 5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight
                className={`w-5 h-5 ${config?.accentColor || "text-slate-400"}`}
              />
            </motion.div>
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-slate-500">
            {getItemCount()} items • {category.subcategories.length}{" "}
            subcategories
          </p>
        </div>

        {/* Expanded Subcategories Overlay */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Glassmorphism Overlay */}
              <div className="relative mx-2 mb-2 p-4 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-inner">
                {/* Decorative blur circles */}
                <div className="absolute top-0 left-4 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-4 w-16 h-16 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-2xl" />

                <div className="relative">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Subcategories
                  </h4>

                  <div className="grid grid-cols-2 gap-1.5">
                    {category.subcategories.slice(0, 8).map((sub, idx) => (
                      <motion.div
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                      >
                        <Link
                          href={`/products?category=${category.slug}&subcategory=${sub.toLowerCase()}`}
                          className={`
                            flex items-center gap-1.5 px-2 py-1.5 
                            text-xs rounded-lg
                            hover:bg-white hover:shadow-sm
                            ${config?.accentColor || "text-slate-600"}
                            transition-all duration-200
                          `}
                        >
                          <ChevronRight className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{sub}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {category.subcategories.length > 8 && (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="text-xs text-slate-500 hover:text-emerald-600 transition-colors"
                      >
                        +{category.subcategories.length - 8} more subcategories
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* View All Button */}
              <div className="px-2 pb-2">
                <Link
                  href={`/products?category=${category.slug}`}
                  className={`
                    flex items-center justify-center gap-2
                    w-full py-3 rounded-xl
                    bg-gradient-to-r ${config?.color || "from-slate-500 to-slate-600"}
                    text-white text-sm font-semibold
                    hover:shadow-lg hover:scale-[1.02]
                    transition-all duration-200
                  `}
                >
                  View All Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function NestedCategoryGrid({ selectedVehicle }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      layout
    >
      {CATEGORIES.map((category, index) => (
        <NestedCategoryCard
          key={category.id}
          category={category}
          index={index}
          selectedVehicle={selectedVehicle}
        />
      ))}
    </motion.div>
  );
}
