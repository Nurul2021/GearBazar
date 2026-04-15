"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Car,
  ChevronDown,
  X,
  Check,
  MapPin,
  Calendar,
  RotateCcw,
} from "lucide-react";

const VEHICLE_DATA = {
  Toyota: {
    models: [
      "Camry",
      "Corolla",
      "Prius",
      "Fortuner",
      "Hilux",
      "RAV4",
      "Land Cruiser",
      "Innova",
      "Vios",
      "Yaris",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Honda: {
    models: [
      "Civic",
      "Accord",
      "CR-V",
      "City",
      "Amaze",
      "HR-V",
      "BR-V",
      "Jazz",
      "Pilot",
      "Odyssey",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Ford: {
    models: [
      "Mustang",
      "F-150",
      "Explorer",
      "EcoSport",
      "Everest",
      "Ranger",
      "Escape",
      "Edge",
      "Focus",
      "Fiesta",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  BMW: {
    models: [
      "3 Series",
      "5 Series",
      "X3",
      "X5",
      "7 Series",
      "X1",
      "X7",
      "4 Series",
      "M3",
      "X6",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Mercedes: {
    models: [
      "C-Class",
      "E-Class",
      "GLC",
      "GLE",
      "A-Class",
      "S-Class",
      "GLA",
      "GLS",
      "CLA",
      "G-Class",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Hyundai: {
    models: [
      "Tucson",
      "Creta",
      "i20",
      "Verna",
      "Santa Fe",
      "Venue",
      "Alcazar",
      "Kona",
      "Ioniq",
      "Accent",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Nissan: {
    models: [
      "Sylphy",
      "X-Trail",
      "Kicks",
      "Rogue",
      "Altima",
      "Magnite",
      "Qashqai",
      "Patrol",
      "Navara",
      "Sentra",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Mazda: {
    models: [
      "CX-5",
      "CX-3",
      "Mazda3",
      "CX-9",
      "CX-30",
      "MX-5",
      "CX-50",
      "Mazda6",
      "BT-50",
      "CX-90",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Suzuki: {
    models: [
      "Swift",
      "Dzire",
      "Vitara",
      "Baleno",
      "Ertiga",
      "Ciaz",
      "S-Cross",
      "Jimny",
      "Alto",
      "WagonR",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
  Mitsubishi: {
    models: [
      "Pajero",
      "Outlander",
      "Eclipse Cross",
      "Attrage",
      "Xpander",
      "Lancer",
      "Triton",
      "Montero",
      "ASX",
      "Mirage",
    ],
    years: Array.from({ length: 25 }, (_, i) => 2024 - i),
  },
};

const VEHICLE_MAKES = Object.keys(VEHICLE_DATA);

const SAMPLE_VEHICLE_COUNTS = {
  engine: {
    Toyota: 89,
    Honda: 76,
    Ford: 82,
    BMW: 95,
    Mercedes: 88,
    Hyundai: 65,
    Nissan: 71,
    Mazda: 68,
    Suzuki: 58,
    Mitsubishi: 62,
  },
  brakes: {
    Toyota: 45,
    Honda: 42,
    Ford: 38,
    BMW: 51,
    Mercedes: 48,
    Hyundai: 35,
    Nissan: 33,
    Mazda: 31,
    Suzuki: 29,
    Mitsubishi: 32,
  },
  electrical: {
    Toyota: 112,
    Honda: 98,
    Ford: 105,
    BMW: 134,
    Mercedes: 128,
    Hyundai: 82,
    Nissan: 88,
    Mazda: 78,
    Suzuki: 68,
    Mitsubishi: 72,
  },
  suspension: {
    Toyota: 56,
    Honda: 48,
    Ford: 52,
    BMW: 68,
    Mercedes: 62,
    Hyundai: 42,
    Nissan: 45,
    Mazda: 41,
    Suzuki: 38,
    Mitsubishi: 41,
  },
  transmission: {
    Toyota: 38,
    Honda: 32,
    Ford: 35,
    BMW: 45,
    Mercedes: 42,
    Hyundai: 28,
    Nissan: 31,
    Mazda: 29,
    Suzuki: 25,
    Mitsubishi: 28,
  },
  body: {
    Toyota: 95,
    Honda: 88,
    Ford: 92,
    BMW: 108,
    Mercedes: 102,
    Hyundai: 78,
    Nissan: 82,
    Mazda: 72,
    Suzuki: 68,
    Mitsubishi: 75,
  },
  interior: {
    Toyota: 72,
    Honda: 65,
    Ford: 68,
    BMW: 88,
    Mercedes: 82,
    Hyundai: 55,
    Nissan: 58,
    Mazda: 52,
    Suzuki: 48,
    Mitsubishi: 52,
  },
  wheels: {
    Toyota: 128,
    Honda: 115,
    Ford: 122,
    BMW: 145,
    Mercedes: 138,
    Hyundai: 95,
    Nissan: 102,
    Mazda: 92,
    Suzuki: 82,
    Mitsubishi: 88,
  },
  oils: {
    Toyota: 156,
    Honda: 142,
    Ford: 148,
    BMW: 168,
    Mercedes: 162,
    Hyundai: 118,
    Nissan: 125,
    Mazda: 112,
    Suzuki: 98,
    Mitsubishi: 105,
  },
  exhaust: {
    Toyota: 32,
    Honda: 28,
    Ford: 30,
    BMW: 38,
    Mercedes: 35,
    Hyundai: 22,
    Nissan: 25,
    Mazda: 22,
    Suzuki: 18,
    Mitsubishi: 21,
  },
  cooling: {
    Toyota: 48,
    Honda: 42,
    Ford: 45,
    BMW: 58,
    Mercedes: 52,
    Hyundai: 35,
    Nissan: 38,
    Mazda: 34,
    Suzuki: 28,
    Mitsubishi: 32,
  },
  accessories: {
    Toyota: 210,
    Honda: 195,
    Ford: 202,
    BMW: 245,
    Mercedes: 238,
    Hyundai: 168,
    Nissan: 182,
    Mazda: 158,
    Suzuki: 145,
    Mitsubishi: 162,
  },
};

function VehicleSelector({ selected, onChange, onClear }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const makes = VEHICLE_MAKES;
  const models = selected.make ? VEHICLE_DATA[selected.make]?.models || [] : [];
  const years = selected.make ? VEHICLE_DATA[selected.make]?.years || [] : [];

  const handleSelect = (type, value) => {
    const newSelected = { ...selected, [type]: value };
    if (type === "make") {
      newSelected.model = "";
      newSelected.year = "";
    }
    onChange(newSelected);
    setOpenDropdown(null);
    setSearchTerm("");
  };

  const getFilteredOptions = (options) => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const renderDropdown = (type, options, value, label) => {
    const isOpen = openDropdown === type;
    const filteredOptions = getFilteredOptions(options);

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(isOpen ? null : type)}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all
            ${
              value
                ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
            }
          `}
        >
          {type === "make" && <Car className="w-4 h-4" />}
          {type === "model" && <MapPin className="w-4 h-4" />}
          {type === "year" && <Calendar className="w-4 h-4" />}
          <span className="text-sm font-medium">{value || label}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-2 left-0 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
            {type !== "year" && (
              <div className="p-3 border-b border-slate-100">
                <input
                  type="text"
                  placeholder={`Search ${label}...`}
                  value={type === openDropdown ? searchTerm : ""}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border-0 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  autoFocus
                />
              </div>
            )}
            <div className="max-h-64 overflow-y-auto">
              {filteredOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(type, option)}
                  className={`
                    w-full px-4 py-2.5 text-left text-sm hover:bg-emerald-50 transition-colors
                    ${value === option ? "bg-emerald-50 text-emerald-700 font-medium" : "text-slate-700"}
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const hasSelection = selected.make || selected.model || selected.year;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {renderDropdown("make", makes, selected.make, "Select Make")}

      {selected.make &&
        renderDropdown("model", models, selected.model, "Select Model")}

      {selected.model &&
        renderDropdown("year", years, selected.year, "Select Year")}

      {hasSelection && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 hover:text-red-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
      )}
    </div>
  );
}

function getItemCountForVehicle(categoryId, vehicle) {
  if (!vehicle.make) return null;

  const baseCounts = SAMPLE_VEHICLE_COUNTS[categoryId];
  if (!baseCounts) return null;

  const vehicleCount = baseCounts[vehicle.make];
  if (!vehicleCount) return null;

  const modelMultiplier = vehicle.model ? 0.85 + Math.random() * 0.3 : 0.7;
  const yearMultiplier = vehicle.year ? 0.8 + Math.random() * 0.4 : 0.6;

  return Math.round(vehicleCount * modelMultiplier * yearMultiplier);
}

export { VehicleSelector, getItemCountForVehicle, VEHICLE_DATA };
