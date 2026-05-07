"use client";

import { useState, useRef } from "react";
import {
  ArrowLeft,
  Store,
  Plus,
  X,
  Upload,
  Trash2,
  AlertCircle,
  CheckCircle,
  Car,
  Package,
  Search,
  ChevronDown,
  MapPin,
  DollarSign,
  Boxes,
  Tag,
  Truck,
  Archive,
  Info,
  Save,
  FileText,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mockVendors = [
  { id: 1, name: "AutoCare Garage", email: "autocare@example.com" },
  { id: 2, name: "Prime Auto Parts", email: "prime@example.com" },
  { id: 3, name: "Dhaka Car Service", email: "dhakacar@example.com" },
];

const carData = {
  makes: [
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes",
    "Audi",
    "Hyundai",
    "Nissan",
  ],
  models: {
    Toyota: ["Camry", "Corolla", "Prius", "Fortuner", "Hilux"],
    Honda: ["Civic", "Accord", "CR-V", "City", "Amaze"],
    Ford: ["Mustang", "F-150", "Explorer", "EcoSport"],
    BMW: ["3 Series", "5 Series", "X3", "X5"],
    Mercedes: ["C-Class", "E-Class", "GLC", "GLE"],
    Audi: ["A4", "A6", "Q3", "Q5"],
    Hyundai: ["Tucson", "Creta", "i20", "Verna"],
    Nissan: ["Sylphy", "X-Trail", "Kicks"],
  },
  years: Array.from({ length: 20 }, (_, i) => 2024 - i),
};

const initialOptions = {
  categories: [
    "Engine Parts",
    "Brake System",
    "Suspension",
    "Electrical",
    "Transmission",
    "Body Parts",
    "Interior",
    "Wheels & Tires",
    "Oils & Fluids",
    "Exhaust",
    "Cooling System",
    "Accessories",
  ],
  productTypes: [
    "Original Equipment (OEM)",
    "Aftermarket",
    "Genuine",
    "Refurbished",
    "Used",
  ],
  brands: [
    "Brembo",
    "Monroe",
    "NGK",
    "Bosch",
    "Magna",
    "Denso",
    "Toyota",
    "Honda",
    "Ford",
    "BMW",
    "Mercedes",
    "Audi",
  ],
  suppliers: [
    "AutoParts Bangladesh",
    "Motor Zone Dhaka",
    "Global Auto Supply",
    "Premium Parts Co",
    "Bangla Motors Ltd",
  ],
  warehouses: [
    "Main Warehouse - Dhaka",
    "Warehouse 2 - Chittagong",
    "Warehouse 3 - Sylhet",
  ],
  storageLocations: [
    "A-01",
    "A-02",
    "A-03",
    "B-01",
    "B-02",
    "B-03",
    "C-01",
    "C-02",
  ],
  units: ["Pcs", "Set", "Pair", "Box", "Liter", "Kg", "Pack"],
};

function CreatableSelect({
  label,
  options,
  value,
  onChange,
  placeholder,
  required = false,
  icon: Icon,
  newItems = [],
  onCreate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const searchInputRef = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  const isNew = (opt) => newItems.includes(opt);

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setSearch("");
  };

  const handleCreate = () => {
    if (customValue.trim()) {
      const newVal = customValue.trim();
      onChange(newVal);
      if (onCreate) onCreate(newVal);
      setCustomValue("");
      setShowInput(false);
      setSearch("");
    }
  };

  const handleOpenInput = () => {
    setCustomValue(search.trim());
    setShowInput(true);
    setTimeout(() => searchInputRef.current?.focus(), 10);
  };

  const selectClassName = [
    "w-full px-4 py-3 border-2 rounded-xl bg-white cursor-pointer flex items-center gap-3 transition-all touch-manipulation",
    isOpen
      ? "border-indigo-500 ring-2 ring-indigo-100"
      : "border-slate-300 hover:border-slate-400",
  ].join(" ");

  const valueClassName = [
    "truncate",
    value ? "text-slate-900" : "text-slate-400",
  ].join(" ");

  const chevronClassName = [
    "w-5 h-5 text-slate-400 ml-auto flex-shrink-0 transition-transform",
    isOpen ? "rotate-180" : "",
  ].join(" ");

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => !showInput && setIsOpen(!isOpen)}
        className={selectClassName}
      >
        {Icon && <Icon className="w-5 h-5 text-slate-400 flex-shrink-0" />}
        <span className={valueClassName}>{value || placeholder}</span>
        <ChevronDown className={chevronClassName} />
      </div>

      {isOpen && !showInput && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-64 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or type to add new..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const itemClass = [
                  "w-full px-4 py-2.5 text-left text-sm flex items-center justify-between gap-2 transition-colors touch-manipulation",
                  value === opt
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "hover:bg-slate-50 text-slate-700",
                ].join(" ");
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={itemClass}
                  >
                    <span className="truncate">{opt}</span>
                    {isNew(opt) && (
                      <span className="flex-shrink-0 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide rounded">
                        New
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <p className="px-4 py-3 text-sm text-slate-400 text-center">
                No matches found
              </p>
            )}
          </div>
          {search.trim() &&
            !options.some(
              (opt) => opt.toLowerCase() === search.trim().toLowerCase(),
            ) && (
              <div className="p-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleOpenInput}
                  className="w-full px-4 py-2.5 text-left text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2 touch-manipulation"
                >
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  Add "{search.trim()}" as new
                </button>
              </div>
            )}
        </div>
      )}

      {showInput && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-indigo-500 rounded-xl shadow-lg p-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <p className="text-xs font-medium text-slate-500 mb-2">
            Add new {label}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder={`Enter ${label.toLowerCase()}...`}
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors"
              autoFocus
            />
            <button
              type="button"
              onClick={handleCreate}
              className="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowInput(false);
                setCustomValue("");
              }}
              className="px-3 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminAddProductPage() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [compatibility, setCompatibility] = useState([]);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const [newItems, setNewItems] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    category: "",
    productType: "",
    brand: "",
    supplier: "",
    warehouse: "",
    storageLocation: "",
    unit: "Pcs",
    publicPrice: 0,
    wholesalePrice: 0,
    stockQuantity: 0,
    stockAlert: 5,
    shippingCost: 0,
    warrantyPeriod: "",
    expireDate: "",
    tags: "",
    adminNote: "",
    featured: false,
    published: true,
  });

  const handleAddNewOption = (field, value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const key =
      field === "category"
        ? "categories"
        : field === "productType"
          ? "productTypes"
          : field === "brand"
            ? "brands"
            : field === "supplier"
              ? "suppliers"
              : field === "warehouse"
                ? "warehouses"
                : field === "storageLocation"
                  ? "storageLocations"
                  : field === "unit"
                    ? "units"
                    : null;
    if (key && !options[key].includes(trimmed)) {
      setOptions((prev) => ({ ...prev, [key]: [...prev[key], trimmed] }));
      setNewItems((prev) => [...prev, trimmed]);
    }
    setFormData((prev) => ({ ...prev, [field]: trimmed }));
  };

  const addCompatibility = () => {
    setCompatibility([
      ...compatibility,
      { id: Date.now(), make: "", model: "", year: "" },
    ]);
  };

  const removeCompatibility = (id) => {
    setCompatibility(compatibility.filter((c) => c.id !== id));
  };

  const updateCompatibility = (id, field, value) => {
    setCompatibility(
      compatibility.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const newImages = files.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map((file) => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedVendor) {
      alert("Please select a vendor");
      return;
    }
    const submitData = {
      ...formData,
      vendorId: selectedVendor.id,
      vendorName: selectedVendor.name,
      compatibility,
      images: images.length,
    };
    console.log("Submitting product for vendor:", submitData);
    alert(
      `Product "${formData.productName}" submitted for vendor "${selectedVendor.name}" (mock)`,
    );
  };

  const getSelectedModels = (make) => carData.models[make] || [];

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Add New Product (Admin)
        </h1>
        <p className="text-slate-500">Upload products on behalf of vendors</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 pb-24">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            Select Vendor
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mockVendors.map((vendor) => (
              <button
                key={vendor.id}
                type="button"
                onClick={() => setSelectedVendor(vendor)}
                className={`p-4 border rounded-xl text-left transition-colors ${selectedVendor?.id === vendor.id ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-slate-300"}`}
              >
                <p className="font-medium text-slate-900">{vendor.name}</p>
                <p className="text-sm text-slate-500">{vendor.email}</p>
              </button>
            ))}
          </div>
          {selectedVendor && (
            <div className="mt-3 p-3 bg-emerald-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-emerald-700">
                Selected: <strong>{selectedVendor.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => setSelectedVendor(null)}
                className="text-emerald-600 hover:text-emerald-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Basic Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    placeholder="e.g., Brembo Premium Brake Caliper"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Product ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.productCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productCode: e.target.value,
                        })
                      }
                      placeholder="e.g., BRM-001"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <CreatableSelect
                    label="Unit"
                    options={options.units}
                    value={formData.unit}
                    onChange={(val) => setFormData({ ...formData, unit: val })}
                    onCreate={(val) => handleAddNewOption("unit", val)}
                    newItems={newItems}
                    placeholder="Select unit"
                    icon={Boxes}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CreatableSelect
                    label="Category"
                    options={options.categories}
                    value={formData.category}
                    onChange={(val) =>
                      setFormData({ ...formData, category: val })
                    }
                    onCreate={(val) => handleAddNewOption("category", val)}
                    newItems={newItems}
                    placeholder="Select category"
                    icon={Tag}
                    required
                  />
                  <CreatableSelect
                    label="Product Type"
                    options={options.productTypes}
                    value={formData.productType}
                    onChange={(val) =>
                      setFormData({ ...formData, productType: val })
                    }
                    onCreate={(val) => handleAddNewOption("productType", val)}
                    newItems={newItems}
                    placeholder="Select type"
                    icon={Package}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <CreatableSelect
                    label="Brand"
                    options={options.brands}
                    value={formData.brand}
                    onChange={(val) => setFormData({ ...formData, brand: val })}
                    onCreate={(val) => handleAddNewOption("brand", val)}
                    newItems={newItems}
                    placeholder="Select brand"
                    icon={Tag}
                    required
                  />
                  <CreatableSelect
                    label="Supplier"
                    options={options.suppliers}
                    value={formData.supplier}
                    onChange={(val) =>
                      setFormData({ ...formData, supplier: val })
                    }
                    onCreate={(val) => handleAddNewOption("supplier", val)}
                    newItems={newItems}
                    placeholder="Select supplier"
                    icon={Truck}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Pricing
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Public Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.publicPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          publicPrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Wholesale Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.wholesalePrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          wholesalePrice: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Inventory & Logistics
              </h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <CreatableSelect
                    label="Warehouse"
                    options={options.warehouses}
                    value={formData.warehouse}
                    onChange={(val) =>
                      setFormData({ ...formData, warehouse: val })
                    }
                    onCreate={(val) => handleAddNewOption("warehouse", val)}
                    newItems={newItems}
                    placeholder="Select warehouse"
                    icon={Archive}
                  />
                  <CreatableSelect
                    label="Storage Location"
                    options={options.storageLocations}
                    value={formData.storageLocation}
                    onChange={(val) =>
                      setFormData({ ...formData, storageLocation: val })
                    }
                    onCreate={(val) =>
                      handleAddNewOption("storageLocation", val)
                    }
                    newItems={newItems}
                    placeholder="Select location"
                    icon={MapPin}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.stockQuantity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stockQuantity: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="0"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Stock Alert
                    </label>
                    <input
                      type="number"
                      value={formData.stockAlert}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stockAlert: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="5"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Shipping Cost
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.shippingCost}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          shippingCost: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Technical Details
              </h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Warranty Period
                    </label>
                    <input
                      type="text"
                      value={formData.warrantyPeriod}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          warrantyPeriod: e.target.value,
                        })
                      }
                      placeholder="e.g., 1 Year"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Expire Date
                    </label>
                    <input
                      type="date"
                      value={formData.expireDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expireDate: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="Enter tags separated by comma"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Product Images
              </h2>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-slate-300"}`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p className="text-lg font-medium text-slate-700 mb-1">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-sm text-slate-500">PNG, JPG up to 5MB</p>
                </label>
              </div>
              {images.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-700 mb-3">
                    Uploaded Images ({images.length})
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={img.preview}
                          alt="Product"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 text-slate-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Vehicle Compatibility
                  </h2>
                  <p className="text-sm text-slate-500">
                    Add compatible car models
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addCompatibility}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Model
                </button>
              </div>
              {compatibility.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Car className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p>No vehicles added yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {compatibility.map((comp) => (
                    <div
                      key={comp.id}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <select
                        value={comp.make}
                        onChange={(e) =>
                          updateCompatibility(comp.id, "make", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select Make</option>
                        {carData.makes.map((make) => (
                          <option key={make} value={make}>
                            {make}
                          </option>
                        ))}
                      </select>
                      <select
                        value={comp.model}
                        onChange={(e) =>
                          updateCompatibility(comp.id, "model", e.target.value)
                        }
                        disabled={!comp.make}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select Model</option>
                        {getSelectedModels(comp.make).map((model) => (
                          <option key={model} value={model}>
                            {model}
                          </option>
                        ))}
                      </select>
                      <select
                        value={comp.year}
                        onChange={(e) =>
                          updateCompatibility(comp.id, "year", e.target.value)
                        }
                        className="w-28 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Year</option>
                        {carData.years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeCompatibility(comp.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Admin Overrides
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Admin Note
                  </label>
                  <textarea
                    value={formData.adminNote}
                    onChange={(e) =>
                      setFormData({ ...formData, adminNote: e.target.value })
                    }
                    placeholder="Internal note about this product..."
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">
                      Mark as Featured
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">
                      Publish Immediately
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-sm text-slate-500">
              {formData.productName ? (
                <span className="font-medium text-slate-900">
                  {formData.productName}
                </span>
              ) : (
                "No product name"
              )}
              {selectedVendor && (
                <span className="ml-2 text-slate-400">
                  • Vendor: {selectedVendor.name}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="px-5 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
              >
                Publish Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
