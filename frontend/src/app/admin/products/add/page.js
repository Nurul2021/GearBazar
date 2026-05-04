"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  Search,
  ChevronDown,
  Package,
  Hash,
  Tag,
  DollarSign,
  Boxes,
  MapPin,
  Archive,
  Shield,
  Truck,
  Calendar,
  Globe,
  Upload,
  Image as ImageIcon,
  Trash2,
  Save,
  Send,
  X,
  Plus,
  Check,
  ToggleLeft,
  ToggleRight,
  Star,
  Car,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const vendors = [
  {
    id: "v1",
    shopName: "AutoCare Garage",
    ownerName: "Mohammad Rahman",
    type: "Garage",
    warehouses: ["Main Warehouse - Dhaka", "Distribution Center - Dhaka"],
    suppliers: ["AutoCare Supplies Ltd"],
  },
  {
    id: "v2",
    shopName: "Prime Auto Parts",
    ownerName: "Fatima Khan",
    type: "Shop",
    warehouses: ["Warehouse 2 - Chittagong"],
    suppliers: ["Prime Motors BD"],
  },
  {
    id: "v3",
    shopName: "Dhaka Car Service",
    ownerName: "Kamal Hossain",
    type: "Garage",
    warehouses: ["Main Warehouse - Dhaka", "Warehouse 3 - Sylhet"],
    suppliers: ["Dhaka Auto Supply"],
  },
  {
    id: "v4",
    shopName: "Speedy Spares",
    ownerName: "Nusrat Jahan",
    type: "Shop",
    warehouses: ["Distribution Center - Dhaka"],
    suppliers: ["Speedy Imports"],
  },
  {
    id: "v5",
    shopName: "GearMax Workshop",
    ownerName: "Arif Ahmed",
    type: "Garage",
    warehouses: ["Warehouse 3 - Sylhet"],
    suppliers: ["GearMax Parts"],
  },
];

let initialCategories = [
  "Brakes",
  "Engine Parts",
  "Suspension",
  "Electrical",
  "Transmission",
  "Filters",
  "Cooling System",
  "Body Parts",
  "Lighting",
  "Wheels & Tires",
  "Oils & Fluids",
  "Exhaust",
  "Interior",
  "Accessories",
  "Tools",
];

let initialBrands = [
  "Bosch",
  "Brembo",
  "NGK",
  "Denso",
  "Gates",
  "Monroe",
  "K&N",
  "Exedy",
  "Shell",
  "Castrol",
  "Philips",
  "Prestone",
  "Exide",
  "Toyota",
  "Honda",
];

const storageLocations = [
  "A-01",
  "A-02",
  "A-03",
  "B-01",
  "B-02",
  "B-03",
  "C-01",
  "C-02",
  "C-03",
];

const carMakes = [
  "Toyota",
  "Honda",
  "Ford",
  "BMW",
  "Mercedes",
  "Audi",
  "Hyundai",
  "Nissan",
  "Kia",
  "Mazda",
];

const carModels = {
  Toyota: ["Camry", "Corolla", "Prius", "Fortuner", "Hilux", "Rav4"],
  Honda: ["Civic", "Accord", "CR-V", "City", "Amaze", "Pilot"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "X1", "X7"],
  Mercedes: ["C-Class", "E-Class", "GLC", "GLE", "A-Class", "S-Class"],
};

function CreatableSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
  required,
  onCreate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newValue, setNewValue] = useState("");
  const ref = useRef(null);

  const filtered = options.filter((o) =>
    o.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
        setIsCreating(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleCreate = () => {
    const v = newValue.trim();
    if (v && !options.includes(v)) {
      onCreate(v);
      onChange(v);
      setNewValue("");
      setIsCreating(false);
      setIsOpen(false);
      setSearch("");
    }
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => !isCreating && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl bg-white cursor-pointer flex items-center gap-3 transition-all ${
          isOpen
            ? "border-indigo-500 ring-2 ring-indigo-100"
            : "border-slate-200 hover:border-slate-300"
        }`}
      >
        {Icon && <Icon className="w-5 h-5 text-slate-400 shrink-0" />}
        <span
          className={
            value
              ? "text-slate-900 flex-1 text-left"
              : "text-slate-400 flex-1 text-left"
          }
        >
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or type new..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
          <div className="max-h-40 overflow-y-auto">
            {filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-indigo-50 transition-colors"
              >
                {opt}
              </button>
            ))}
            {search.trim() &&
              !options.some(
                (o) => o.toLowerCase() === search.trim().toLowerCase(),
              ) && (
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(true);
                    setNewValue(search.trim());
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-indigo-600 font-medium hover:bg-indigo-50 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Create "{search.trim()}"
                </button>
              )}
            {filtered.length === 0 && !search && (
              <p className="px-4 py-2 text-sm text-slate-400">No options</p>
            )}
          </div>
          {isCreating && (
            <div className="p-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Type and press Enter"
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-sm"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <button
                type="button"
                onClick={handleCreate}
                className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AddProductPage() {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorSearch, setVendorSearch] = useState("");
  const [showVendorDropdown, setShowVendorDropdown] = useState(false);
  const [images, setImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);
  const [compatibility, setCompatibility] = useState([]);
  const [bypassVerification, setBypassVerification] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [brands, setBrands] = useState(initialBrands);
  const [errors, setErrors] = useState({});

  const vendorRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    slug: "",
    brand: "",
    category: "",
    publicPrice: "",
    wholesalePrice: "",
    discountedPrice: "",
    stock: "",
    unit: "Pcs",
    lowStockAlert: "5",
    warehouse: "",
    storageLocation: "",
    warrantyPeriod: "",
    condition: "New",
    originCountry: "Japan",
    description: "",
    compatibilityNotes: "",
  });

  useEffect(() => {
    function handleClick(e) {
      if (vendorRef.current && !vendorRef.current.contains(e.target))
        setShowVendorDropdown(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredVendors = vendors.filter(
    (v) =>
      v.shopName.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(vendorSearch.toLowerCase()),
  );

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorDropdown(false);
    setVendorSearch("");
    setForm((prev) => ({ ...prev, warehouse: "", storageLocation: "" }));
  };

  const generateSKU = () => {
    const prefix = form.category
      ? form.category.substring(0, 3).toUpperCase()
      : "PRD";
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const sku = prefix + "-" + random;
    setForm((prev) => ({ ...prev, sku, slug: sku.toLowerCase() }));
  };

  const generateSlug = () => {
    if (!form.name) return;
    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setForm((prev) => ({ ...prev, slug }));
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 1));
  };

  const handleGalleryDrop = (e) => {
    e.preventDefault();
    setIsGalleryDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/"),
    );
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setGalleryImages((prev) => [...prev, ...newImages].slice(0, 8));
  };

  const validate = () => {
    const errs = {};
    if (!form.sku.trim()) errs.sku = "SKU is required";
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.brand) errs.brand = "Brand is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.publicPrice || Number(form.publicPrice) <= 0)
      errs.publicPrice = "Valid public price is required";
    if (!form.wholesalePrice || Number(form.wholesalePrice) <= 0)
      errs.wholesalePrice = "Valid wholesale price is required";
    if (Number(form.wholesalePrice) >= Number(form.publicPrice))
      errs.wholesalePrice = "Wholesale price must be lower than public price";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePublish = async () => {
    if (!validate()) return;
    if (!selectedVendor) {
      alert("Please select a vendor");
      return;
    }
    setPublishing(true);
    const payload = {
      ...form,
      ownerId: selectedVendor.id,
      wholesalePrice: Number(form.wholesalePrice),
      publicPrice: Number(form.publicPrice),
    };
    console.log("POST /api/products", payload);
    await new Promise((r) => setTimeout(r, 1500));
    alert(
      bypassVerification
        ? "Product published and auto-approved!"
        : "Product submitted for approval!",
    );
    setPublishing(false);
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    alert("Draft saved!");
    setSaving(false);
  };

  const addCompatibility = () =>
    setCompatibility([
      ...compatibility,
      { id: Date.now(), make: "", model: "", year: "" },
    ]);
  const removeCompatibility = (id) =>
    setCompatibility((prev) => prev.filter((c) => c.id !== id));
  const updateCompatibility = (id, field, value) => {
    setCompatibility((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
  };

  return (
    <div className="space-y-6 pb-28">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Add New Product</h1>
              {bypassVerification && (
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                  Auto-Approved
                </span>
              )}
              {featured && (
                <span className="px-3 py-1 bg-yellow-400/20 text-yellow-100 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3" /> Featured
                </span>
              )}
            </div>
            <p className="text-indigo-100 mt-1">
              Admin-exclusive product upload with full control
            </p>
          </div>
        </div>
      </div>

      {/* Vendor Selection */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Store className="w-6 h-6 text-indigo-600" />
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Select Vendor
            </h2>
            <p className="text-sm text-slate-500">
              Product will be owned by the selected vendor
            </p>
          </div>
          <span className="ml-auto px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
            Required *
          </span>
        </div>
        <div ref={vendorRef} className="relative">
          <div
            onClick={() => setShowVendorDropdown(!showVendorDropdown)}
            className={`w-full px-4 py-4 border-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
              showVendorDropdown
                ? "border-indigo-500 ring-2 ring-indigo-100"
                : selectedVendor
                  ? "border-green-500 bg-green-50"
                  : "border-slate-200 hover:border-slate-300"
            }`}
          >
            {selectedVendor ? (
              <>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedVendor.type === "Garage" ? "bg-blue-100" : "bg-purple-100"}`}
                >
                  <Store
                    className={`w-6 h-6 ${selectedVendor.type === "Garage" ? "text-blue-600" : "text-purple-600"}`}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {selectedVendor.shopName}
                  </p>
                  <p className="text-sm text-slate-500">
                    {selectedVendor.ownerName} • {selectedVendor.type}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Selected
                </span>
              </>
            ) : (
              <>
                <Store className="w-6 h-6 text-slate-400" />
                <span className="text-slate-400">
                  Click to select a vendor or shop owner...
                </span>
              </>
            )}
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform ${showVendorDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {showVendorDropdown && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg">
              <div className="p-3 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={vendorSearch}
                    onChange={(e) => setVendorSearch(e.target.value)}
                    placeholder="Search vendors..."
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredVendors.map((vendor) => (
                  <button
                    key={vendor.id}
                    type="button"
                    onClick={() => handleVendorSelect(vendor)}
                    className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${vendor.type === "Garage" ? "bg-blue-100" : "bg-purple-100"}`}
                    >
                      <Store
                        className={`w-5 h-5 ${vendor.type === "Garage" ? "text-blue-600" : "text-purple-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {vendor.shopName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {vendor.ownerName}
                      </p>
                    </div>
                    {selectedVendor?.id === vendor.id && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedVendor && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="text-sm font-medium text-indigo-900 mb-2">
              Vendor Resources
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-indigo-600 mb-1">Warehouses</p>
                <div className="flex flex-wrap gap-1">
                  {selectedVendor.warehouses.map((w) => (
                    <span
                      key={w}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-indigo-600 mb-1">Suppliers</p>
                <div className="flex flex-wrap gap-1">
                  {selectedVendor.suppliers.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600" /> Basic Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setErrors({ ...errors, name: undefined });
                  }}
                  onBlur={generateSlug}
                  placeholder="e.g., Brembo Premium Brake Caliper"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-300" : "border-slate-200"}`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.sku}
                      onChange={(e) => {
                        setForm({ ...form, sku: e.target.value });
                        setErrors({ ...errors, sku: undefined });
                      }}
                      placeholder="e.g., BRM-001"
                      className={`flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm ${errors.sku ? "border-red-300" : "border-slate-200"}`}
                    />
                    <button
                      type="button"
                      onClick={generateSKU}
                      className="px-3 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100"
                      title="Auto-generate SKU"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                  {errors.sku && (
                    <p className="text-xs text-red-500 mt-1">{errors.sku}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto-generated"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CreatableSelect
                  label="Brand"
                  value={form.brand}
                  onChange={(v) => {
                    setForm({ ...form, brand: v });
                    setErrors({ ...errors, brand: undefined });
                  }}
                  options={brands}
                  placeholder="Select or create brand..."
                  icon={Tag}
                  required
                  onCreate={(v) => setBrands((prev) => [...prev, v])}
                />
                <CreatableSelect
                  label="Category"
                  value={form.category}
                  onChange={(v) => {
                    setForm({ ...form, category: v });
                    setErrors({ ...errors, category: undefined });
                  }}
                  options={categories}
                  placeholder="Select or create category..."
                  icon={Package}
                  required
                  onCreate={(v) => setCategories((prev) => [...prev, v])}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600" /> Pricing
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Public Price (৳) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={form.publicPrice}
                    onChange={(e) => {
                      setForm({ ...form, publicPrice: e.target.value });
                      setErrors({
                        ...errors,
                        publicPrice: undefined,
                        wholesalePrice: undefined,
                      });
                    }}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.publicPrice ? "border-red-300" : "border-slate-200"}`}
                  />
                </div>
                {errors.publicPrice && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.publicPrice}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Wholesale Price (৳) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={form.wholesalePrice}
                    onChange={(e) => {
                      setForm({ ...form, wholesalePrice: e.target.value });
                      setErrors({ ...errors, wholesalePrice: undefined });
                    }}
                    placeholder="0.00"
                    className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.wholesalePrice ? "border-red-300" : "border-slate-200"}`}
                  />
                </div>
                {errors.wholesalePrice && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.wholesalePrice}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Discounted Price (৳)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={form.discountedPrice}
                    onChange={(e) =>
                      setForm({ ...form, discountedPrice: e.target.value })
                    }
                    placeholder="Optional"
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Boxes className="w-5 h-5 text-indigo-600" /> Inventory &
              Logistics
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Unit
                  </label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Pcs">Pcs</option>
                    <option value="Set">Set</option>
                    <option value="Pair">Pair</option>
                    <option value="Box">Box</option>
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Pack">Pack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Low Stock Alert
                  </label>
                  <input
                    type="number"
                    value={form.lowStockAlert}
                    onChange={(e) =>
                      setForm({ ...form, lowStockAlert: e.target.value })
                    }
                    placeholder="5"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <Archive className="w-4 h-4" /> Warehouse
                    </span>
                  </label>
                  <select
                    value={form.warehouse}
                    onChange={(e) =>
                      setForm({ ...form, warehouse: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select warehouse...</option>
                    {(selectedVendor?.warehouses || []).map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> Shelf Location
                    </span>
                  </label>
                  <select
                    value={form.storageLocation}
                    onChange={(e) =>
                      setForm({ ...form, storageLocation: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select location...</option>
                    {storageLocations.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Specifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" /> Specifications
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Warranty Period
                  </span>
                </label>
                <input
                  type="text"
                  value={form.warrantyPeriod}
                  onChange={(e) =>
                    setForm({ ...form, warrantyPeriod: e.target.value })
                  }
                  placeholder="e.g., 1 Year"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Condition
                </label>
                <select
                  value={form.condition}
                  onChange={(e) =>
                    setForm({ ...form, condition: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="New">New</option>
                  <option value="Reconditioned">Reconditioned</option>
                  <option value="Used">Used</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" /> Origin Country
                  </span>
                </label>
                <input
                  type="text"
                  value={form.originCountry}
                  onChange={(e) =>
                    setForm({ ...form, originCountry: e.target.value })
                  }
                  placeholder="e.g., Japan"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-indigo-600" /> Media Upload
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Main Product Image
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleImageDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${isDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"}`}
              >
                {images.length > 0 ? (
                  <div className="relative w-40 h-40 mx-auto">
                    <Image
                      src={images[0].preview}
                      alt="Main"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setImages([])}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && file.type.startsWith("image/"))
                          setImages([
                            {
                              id: Date.now(),
                              file,
                              preview: URL.createObjectURL(file),
                            },
                          ]);
                      }}
                      className="hidden"
                      id="mainImage"
                    />
                    <label htmlFor="mainImage" className="cursor-pointer">
                      <Upload className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-medium text-slate-700">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs text-slate-400">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  </>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Gallery Images
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsGalleryDragging(true);
                }}
                onDragLeave={() => setIsGalleryDragging(false)}
                onDrop={handleGalleryDrop}
                className={`border-2 border-dashed rounded-xl p-4 transition-colors ${isGalleryDragging ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-slate-300"}`}
              >
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group"
                    >
                      <Image
                        src={img.preview}
                        alt="Gallery"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryImages((prev) =>
                            prev.filter((i) => i.id !== img.id),
                          )
                        }
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {galleryImages.length < 8 && (
                    <label
                      htmlFor="galleryImages"
                      className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
                    >
                      <Plus className="w-6 h-6 text-slate-300" />
                    </label>
                  )}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files).filter((f) =>
                        f.type.startsWith("image/"),
                      );
                      const newImages = files.map((f) => ({
                        id: Date.now() + Math.random(),
                        file: f,
                        preview: URL.createObjectURL(f),
                      }));
                      setGalleryImages((prev) =>
                        [...prev, ...newImages].slice(0, 8),
                      );
                    }}
                    className="hidden"
                    id="galleryImages"
                  />
                </div>
                <p className="text-xs text-slate-400 text-center">
                  {galleryImages.length}/8 images uploaded
                </p>
              </div>
            </div>
          </div>

          {/* Vehicle Compatibility */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-indigo-600" /> Vehicle Compatibility
            </h3>
            <div className="space-y-3 mb-4">
              {compatibility.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                >
                  <select
                    value={c.make}
                    onChange={(e) =>
                      updateCompatibility(c.id, "make", e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Make</option>
                    {carMakes.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={c.model}
                    onChange={(e) =>
                      updateCompatibility(c.id, "model", e.target.value)
                    }
                    disabled={!c.make}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option value="">Model</option>
                    {(carModels[c.make] || []).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={c.year}
                    onChange={(e) =>
                      updateCompatibility(c.id, "year", e.target.value)
                    }
                    placeholder="Year"
                    className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeCompatibility(c.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addCompatibility}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Compatible Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600" /> Product Description
        </h3>
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Product Details
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Enter detailed product description, features, specifications..."
              rows={6}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Compatibility Notes
            </label>
            <textarea
              value={form.compatibilityNotes}
              onChange={(e) =>
                setForm({ ...form, compatibilityNotes: e.target.value })
              }
              placeholder="e.g., Fits Toyota Camry 2018-2022, Honda Civic 2016+..."
              rows={4}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Admin Overrides */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" /> Admin Overrides
        </h3>
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setBypassVerification(!bypassVerification)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {bypassVerification ? (
              <ToggleRight className="w-8 h-8 text-green-500" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-slate-400" />
            )}
            <div className="text-left">
              <p className="font-medium text-slate-900">Bypass Verification</p>
              <p className="text-xs text-slate-500">
                {bypassVerification
                  ? "Product will be auto-published"
                  : "Product requires manual approval"}
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFeatured(!featured)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {featured ? (
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            ) : (
              <Star className="w-8 h-8 text-slate-400" />
            )}
            <div className="text-left">
              <p className="font-medium text-slate-900">Featured Product</p>
              <p className="text-xs text-slate-500">
                {featured
                  ? "Will appear in featured section"
                  : "Regular product display"}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-slate-200 px-6 py-4 z-50 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            {selectedVendor ? (
              <span>
                Adding for{" "}
                <span className="font-medium text-slate-700">
                  {selectedVendor.shopName}
                </span>
              </span>
            ) : (
              <span className="text-red-500">Please select a vendor first</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save as Draft
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={publishing || !selectedVendor}
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {publishing ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {bypassVerification ? "Publish Product" : "Submit for Approval"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
