"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  X,
  Upload,
  Image as ImageIcon,
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
  Shield,
  Store,
  User,
} from "lucide-react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";

function CreatableSelect({
  label,
  options,
  value,
  onChange,
  onCreate,
  placeholder,
  required = false,
  icon: Icon,
  type,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [customValue, setCustomValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const ref = useRef(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
        setShowInput(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setSearch("");
  };

  const handleCreate = () => {
    if (customValue.trim()) {
      const newValue = customValue.trim();
      if (onCreate) {
        onCreate(type, newValue);
      } else {
        onChange(newValue);
      }
      setCustomValue("");
      setShowInput(false);
      setSearch("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && showInput) {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        onClick={() => !disabled && !showInput && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl bg-white cursor-pointer flex items-center gap-3 transition-all ${
          disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""
        } ${isOpen ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-200"}`}
      >
        {Icon && <Icon className="w-5 h-5 text-slate-400" />}
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 ml-auto transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or type new..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt.value || opt}
                  type="button"
                  onClick={() => handleSelect(opt.value || opt)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 transition-colors"
                >
                  {opt.label || opt}
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-slate-400">
                No matches found
              </p>
            )}
          </div>

          {onCreate &&
            search.trim() &&
            !options.some(
              (opt) =>
                (opt.label || opt).toLowerCase() ===
                search.trim().toLowerCase(),
            ) && (
              <div className="p-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomValue(search.trim());
                    setShowInput(true);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create "{search.trim()}"
                </button>
              </div>
            )}
        </div>
      )}

      {showInput && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-blue-500 rounded-xl shadow-lg p-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter new value"
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCreate();
              }}
              className="px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowInput(false);
                setSearch("");
              }}
              className="px-3 py-2 bg-gray-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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
  warehouses: [
    "Main Warehouse - Dhaka",
    "Warehouse 2 - Chittagong",
    "Warehouse 3 - Sylhet",
    "Distribution Center - Dhaka",
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

const demoVendors = [
  {
    _id: "vendor-1",
    shopName: "AutoParts Pro",
    ownerName: "Rahim Ahmed",
    warehouses: ["Main Warehouse - Dhaka", "Warehouse 2 - Chittagong"],
    suppliers: ["AutoParts Bangladesh", "Global Auto Supply"],
  },
  {
    _id: "vendor-2",
    shopName: "TurboTech Garage",
    ownerName: "Karim Uddin",
    warehouses: ["Warehouse 3 - Sylhet", "Distribution Center - Dhaka"],
    suppliers: ["Motor Zone Dhaka", "Premium Parts Co"],
  },
  {
    _id: "vendor-3",
    shopName: "QuickFix Motors",
    ownerName: "Salam Khan",
    warehouses: ["Main Warehouse - Dhaka"],
    suppliers: ["Bangla Motors Ltd"],
  },
];

export default function AdminAddProductForm() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState(demoVendors);
  const [vendorSearch, setVendorSearch] = useState("");
  const [showVendorDropdown, setShowVendorDropdown] = useState(false);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [compatibility, setCompatibility] = useState([]);
  const [options, setOptions] = useState(initialOptions);

  const vendorRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (vendorRef.current && !vendorRef.current.contains(event.target)) {
        setShowVendorDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedVendor) {
      const vendor = vendors.find((v) => v._id === selectedVendor);
      if (vendor) {
        setOptions((prev) => ({
          ...prev,
          warehouses: vendor.warehouses,
          suppliers: vendor.suppliers,
        }));
      }
    }
  }, [selectedVendor, vendors]);

  const filteredVendors = vendors.filter(
    (v) =>
      v.shopName.toLowerCase().includes(vendorSearch.toLowerCase()) ||
      v.ownerName.toLowerCase().includes(vendorSearch.toLowerCase()),
  );

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
    tags: "",
  });

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor._id);
    setShowVendorDropdown(false);
    setVendorSearch("");
    setFormData((prev) => ({
      ...prev,
      supplier: "",
      warehouse: "",
    }));
  };

  const handleCreateOption = (type, value) => {
    if (type === "brand" || type === "category") {
      setOptions((prev) => ({
        ...prev,
        [type === "category" ? "categories" : "brands"]: [
          ...(type === "category" ? prev.categories : prev.brands),
          value,
        ],
      }));
    }
  };

  const handleOptionChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
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
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!selectedVendor) {
      toast.error("Please select a vendor/shop owner");
      return;
    }

    if (!formData.productName || !formData.category || !formData.brand) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.productName);
      formDataToSend.append("description", formData.tags || "");
      formDataToSend.append("brand", formData.brand);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stockQuantity", formData.stockQuantity);
      formDataToSend.append("publicPrice", formData.publicPrice);
      formDataToSend.append("wholesalePrice", formData.wholesalePrice);
      formDataToSend.append("partNumber", formData.productCode);
      formDataToSend.append("sku", formData.storageLocation);
      formDataToSend.append("warehouse", formData.warehouse);
      formDataToSend.append("supplier", formData.supplier);
      formDataToSend.append("unit", formData.unit);
      formDataToSend.append("vendorId", selectedVendor);
      formDataToSend.append("isApproved", "true");
      formDataToSend.append("status", "active");

      images.forEach((img, index) => {
        formDataToSend.append(`images[${index}]`, img.file);
      });

      const response = await api.post("/inventory", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Product added successfully!");
        setFormData({
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
          tags: "",
        });
        setImages([]);
        setSelectedVendor(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const getSelectedModels = (make) => carData.models[make] || [];

  const selectedVendorData = vendors.find((v) => v._id === selectedVendor);

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-24">
      {/* Admin Control Badge */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                Add Product (Admin Control)
              </h1>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                Auto-Approved
              </span>
            </div>
            <p className="text-blue-100 mt-1">
              Add products on behalf of vendors. Products will be automatically
              approved and active.
            </p>
          </div>
        </div>
      </div>

      {/* Vendor Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Store className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Select Vendor / Shop Owner
            </h2>
            <p className="text-sm text-slate-500">
              Choose which vendor this product belongs to
            </p>
          </div>
          <span className="ml-auto px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
            Required *
          </span>
        </div>

        <div ref={vendorRef} className="relative">
          <div
            onClick={() => setShowVendorDropdown(!showVendorDropdown)}
            className={`w-full px-4 py-4 border-2 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
              showVendorDropdown
                ? "border-blue-500 ring-2 ring-blue-100"
                : selectedVendor
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {selectedVendorData ? (
              <>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Store className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    {selectedVendorData.shopName}
                  </p>
                  <p className="text-sm text-slate-500">
                    Owner: {selectedVendorData.ownerName}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Selected
                </span>
              </>
            ) : (
              <>
                <User className="w-6 h-6 text-slate-400" />
                <span className="text-slate-400">
                  Click to select a vendor or shop owner...
                </span>
              </>
            )}
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform ${
                showVendorDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {showVendorDropdown && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
              <div className="p-3 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={vendorSearch}
                    onChange={(e) => setVendorSearch(e.target.value)}
                    placeholder="Search vendors..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor) => (
                    <button
                      key={vendor._id}
                      type="button"
                      onClick={() => handleVendorSelect(vendor)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Store className="w-5 h-5 text-slate-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {vendor.shopName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {vendor.ownerName} • {vendor.warehouses.length}{" "}
                          warehouse
                          {vendor.warehouses.length > 1 ? "s" : ""}
                        </p>
                      </div>
                      {selectedVendor === vendor._id && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-slate-500">
                    <Store className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                    <p>No vendors found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {selectedVendorData && (
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <h4 className="text-sm font-medium text-blue-900 mb-2">
              Associated Resources
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-600 mb-1">Warehouses</p>
                <div className="flex flex-wrap gap-1">
                  {selectedVendorData.warehouses.map((w) => (
                    <span
                      key={w}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-blue-600 mb-1">Suppliers</p>
                <div className="flex flex-wrap gap-1">
                  {selectedVendorData.suppliers.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
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

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Product Details</h2>
          <p className="text-slate-500">Enter product information below</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2.5 bg-white border border-gray-300 text-slate-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !selectedVendor}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSubmitting ? "Adding..." : "Add Product"}
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Basic Information
            </h3>
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    SKU / Product ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.productCode}
                    onChange={(e) =>
                      setFormData({ ...formData, productCode: e.target.value })
                    }
                    placeholder="e.g., BRM-001"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <CreatableSelect
                  label="Unit"
                  options={options.units}
                  value={formData.unit}
                  onChange={(value) => handleOptionChange("unit", value)}
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
                  onChange={(value) => handleOptionChange("category", value)}
                  onCreate={(type, value) =>
                    handleCreateOption("category", value)
                  }
                  placeholder="Select category"
                  icon={Tag}
                  required
                />
                <CreatableSelect
                  label="Product Type"
                  options={options.productTypes}
                  value={formData.productType}
                  onChange={(value) => handleOptionChange("productType", value)}
                  placeholder="Select type"
                  icon={Package}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <CreatableSelect
                  label="Brand"
                  options={options.brands}
                  value={formData.brand}
                  onChange={(value) => handleOptionChange("brand", value)}
                  onCreate={(type, value) => handleCreateOption("brand", value)}
                  placeholder="Select brand"
                  icon={Tag}
                  required
                />
                <CreatableSelect
                  label="Supplier"
                  options={
                    selectedVendorData?.suppliers || options.suppliers || []
                  }
                  value={formData.supplier}
                  onChange={(value) => handleOptionChange("supplier", value)}
                  placeholder={
                    selectedVendor ? "Select supplier" : "Select vendor first"
                  }
                  icon={Truck}
                  disabled={!selectedVendor}
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Pricing
            </h3>
            <div className="grid grid-cols-2 gap-4">
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
                    step="0.01"
                    value={formData.publicPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        publicPrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                    step="0.01"
                    value={formData.wholesalePrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wholesalePrice: parseFloat(e.target.value) || 0,
                      })
                    }
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory & Logistics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Inventory & Logistics
            </h3>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <CreatableSelect
                  label="Warehouse"
                  options={selectedVendorData?.warehouses || options.warehouses}
                  value={formData.warehouse}
                  onChange={(value) => handleOptionChange("warehouse", value)}
                  placeholder={
                    selectedVendor ? "Select warehouse" : "Select vendor first"
                  }
                  icon={Archive}
                  disabled={!selectedVendor}
                />
                <CreatableSelect
                  label="Storage Location"
                  options={options.storageLocations}
                  value={formData.storageLocation}
                  onChange={(value) =>
                    handleOptionChange("storageLocation", value)
                  }
                  placeholder="Select location"
                  icon={MapPin}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Stock Quantity
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Product Images
            </h3>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
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
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
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

            {images.length === 0 && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center"
                  >
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vehicle Compatibility */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Vehicle Compatibility
                </h3>
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
                <p className="text-sm">
                  Click &quot;Add Model&quot; to specify compatible vehicles
                </p>
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
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      disabled={!comp.make}
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
                      className="w-28 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
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

          {/* Additional Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Additional Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Warranty Period
                </label>
                <input
                  type="text"
                  value={formData.warrantyPeriod}
                  onChange={(e) =>
                    setFormData({ ...formData, warrantyPeriod: e.target.value })
                  }
                  placeholder="e.g., 1 Year"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-6 py-4 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-slate-600">
              Admin Adding Product • Auto-approved
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-5 py-2.5 bg-white border border-gray-300 text-slate-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedVendor}
              className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
