"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDynamicOptions,
  createNewBrand,
  createNewCategory,
  createNewWarehouse,
  createNewSupplier,
  selectDynamicOptions,
  selectNewDynamicOptions,
  addTempDynamicOption,
  clearNewDynamicOptions,
} from "@/features/inventory/inventorySlice";
import api from "@/lib/axios";
import toast from "react-hot-toast";
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
  RefreshCw,
  Search,
  ChevronDown,
  MapPin,
  Calendar,
  DollarSign,
  Boxes,
  Tag,
  Truck,
  Archive,
  Info,
  FileText,
  Save,
  HelpCircle,
} from "lucide-react";

import Tooltip from "../ui/Tooltip";

const partSchema = z
  .object({
    productName: z
      .string()
      .min(3, "Product name must be at least 3 characters"),
    productCode: z.string().min(1, "Product ID is required"),
    category: z.string().min(1, "Category is required"),
    productType: z.string().min(1, "Product type is required"),
    brand: z.string().min(1, "Brand is required"),
    supplier: z.string().min(1, "Supplier is required"),
    warehouse: z.string().optional(),
    storageLocation: z.string().optional(),
    unit: z.string().min(1, "Unit is required"),
    publicPrice: z.number().positive("Public price must be positive"),
    wholesalePrice: z.number().positive("Wholesale price must be positive"),
    stockQuantity: z.number().int().min(0, "Stock cannot be negative"),
    stockAlert: z.number().int().min(0, "Stock alert cannot be negative"),
    shippingCost: z.number().min(0, "Shipping cost cannot be negative"),
    warrantyPeriod: z.string().optional(),
    expireDate: z.string().optional(),
    tags: z.string().optional(),
  })
  .superrefine((data, ctx) => {
    if (data.wholesalePrice > data.publicPrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Wholesale price cannot exceed public price",
        path: ["wholesalePrice"],
      });
    }
  });

const isServiceType = (productType) => {
  const serviceTypes = [
    "Service",
    "Labor",
    "Repair",
    "Installation",
    "Maintenance",
  ];
  return serviceTypes.some((type) =>
    productType?.toLowerCase().includes(type.toLowerCase()),
  );
};

const isPartType = (productType) => {
  const partTypes = [
    "Original Equipment (OEM)",
    "Aftermarket",
    "Genuine",
    "Refurbished",
    "Used",
    "Part",
    "Parts",
  ];
  return partTypes.some((type) =>
    productType?.toLowerCase().includes(type.toLowerCase()),
  );
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
        onClick={() => !showInput && setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl bg-white cursor-pointer flex items-center gap-3 transition-all ${
          isOpen
            ? "border-emerald-500 ring-2 ring-emerald-100"
            : "border-slate-200"
        }`}
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
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg max-h-64 overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search or type new..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  className="w-full px-4 py-2.5 text-left text-sm hover:bg-emerald-50 transition-colors"
                >
                  {opt}
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
              (opt) => opt.toLowerCase() === search.trim().toLowerCase(),
            ) && (
              <div className="p-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCustomValue(search.trim());
                    setShowInput(true);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create "{search.trim()}"
                </button>
              </div>
            )}
        </div>
      )}

      {showInput && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-emerald-500 rounded-xl shadow-lg p-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter new value"
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCreate();
              }}
              className="px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
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
              className="px-3 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-200"
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

export default function AddNewPartForm() {
  const dispatch = useDispatch();
  const dynamicOptions = useSelector(selectDynamicOptions);
  const newDynamicOptions = useSelector(selectNewDynamicOptions);
  const [compatibility, setCompatibility] = useState([]);
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showSelector, setShowSelector] = useState(false);
  const [options, setOptions] = useState({
    categories:
      dynamicOptions.categories.length > 0
        ? dynamicOptions.categories.map((c) => c.name || c)
        : initialOptions.categories,
    productTypes: initialOptions.productTypes,
    brands:
      dynamicOptions.brands.length > 0
        ? dynamicOptions.brands.map((b) => b.name || b)
        : initialOptions.brands,
    suppliers:
      dynamicOptions.suppliers.length > 0
        ? dynamicOptions.suppliers.map((s) => s.name || s)
        : initialOptions.suppliers,
    warehouses:
      dynamicOptions.warehouses.length > 0
        ? dynamicOptions.warehouses.map((w) => w.name || w)
        : initialOptions.warehouses,
    storageLocations: initialOptions.storageLocations,
    units: initialOptions.units,
  });

  useEffect(() => {
    dispatch(fetchDynamicOptions());
  }, [dispatch]);

  useEffect(() => {
    if (
      dynamicOptions.categories.length > 0 ||
      dynamicOptions.brands.length > 0
    ) {
      setOptions((prev) => ({
        ...prev,
        categories:
          dynamicOptions.categories.length > 0
            ? dynamicOptions.categories.map((c) => c.name || c)
            : prev.categories,
        brands:
          dynamicOptions.brands.length > 0
            ? dynamicOptions.brands.map((b) => b.name || b)
            : prev.brands,
        suppliers:
          dynamicOptions.suppliers.length > 0
            ? dynamicOptions.suppliers.map((s) => s.name || s)
            : prev.suppliers,
        warehouses:
          dynamicOptions.warehouses.length > 0
            ? dynamicOptions.warehouses.map((w) => w.name || w)
            : prev.warehouses,
      }));
    }
  }, [dynamicOptions]);

  const handleCreateOption = async (type, value) => {
    try {
      if (type === "brand") {
        await dispatch(createNewBrand(value)).unwrap();
        toast.success(`Brand "${value}" created successfully`);
      } else if (type === "category") {
        await dispatch(createNewCategory({ name: value })).unwrap();
        toast.success(`Category "${value}" created successfully`);
      } else if (type === "warehouse") {
        await dispatch(createNewWarehouse({ name: value })).unwrap();
        toast.success(`Warehouse "${value}" created successfully`);
      } else if (type === "supplier") {
        await dispatch(createNewSupplier({ name: value })).unwrap();
        toast.success(`Supplier "${value}" created successfully`);
      }
      setOptions((prev) => ({
        ...prev,
        [type === "category"
          ? "categories"
          : type === "warehouse"
            ? "warehouses"
            : type === "supplier"
              ? "suppliers"
              : "brands"]: [
          ...prev[
            type === "category"
              ? "categories"
              : type === "warehouse"
                ? "warehouses"
                : type === "supplier"
                  ? "suppliers"
                  : "brands"
          ],
          value,
        ],
      }));
      setFormData((prev) => ({
        ...prev,
        [type === "category"
          ? "category"
          : type === "warehouse"
            ? "warehouse"
            : type === "supplier"
              ? "supplier"
              : "brand"]: value,
      }));
    } catch (error) {
      toast.error(error.message || "Failed to create option");
      dispatch(addTempDynamicOption({ type, value }));
      setFormData((prev) => ({
        ...prev,
        [type === "category"
          ? "category"
          : type === "warehouse"
            ? "warehouse"
            : type === "supplier"
              ? "supplier"
              : "brand"]: value,
      }));
    }
  };

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
  });

  const existingProducts = [
    {
      id: 1,
      title: "Brembo Brake Caliper - Front",
      brand: "Brembo",
      status: "published",
    },
    {
      id: 2,
      title: "Monroe Shock Absorber Set",
      brand: "Monroe",
      status: "published",
    },
    {
      id: 3,
      title: "NGK Iridium Spark Plugs (4pc)",
      brand: "NGK",
      status: "draft",
    },
    {
      id: 4,
      title: "Bosch Alternator 12V",
      brand: "Bosch",
      status: "published",
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [watchedPublicPrice, setWatchedPublicPrice] = useState(0);
  const [watchedWholesalePrice, setWatchedWholesalePrice] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(partSchema),
    defaultValues: formData,
  });

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

  const onSubmit = async (data) => {
    try {
      const submitData = {
        ...data,
        compatibility,
        images: images.map((img) => img.file),
        newOptions: {
          brands: newDynamicOptions.brands,
          categories: newDynamicOptions.categories,
          warehouses: newDynamicOptions.warehouses,
          suppliers: newDynamicOptions.suppliers,
        },
      };

      const formDataToSend = new FormData();
      formDataToSend.append("title", submitData.productName);
      formDataToSend.append("description", submitData.tags || "");
      formDataToSend.append("brand", submitData.brand);
      formDataToSend.append("category", submitData.category);
      formDataToSend.append("stockQuantity", submitData.stockQuantity);
      formDataToSend.append("publicPrice", submitData.publicPrice);
      formDataToSend.append("wholesalePrice", submitData.wholesalePrice);
      formDataToSend.append("partNumber", submitData.productCode);
      formDataToSend.append("sku", submitData.storageLocation);
      formDataToSend.append("warehouse", submitData.warehouse);
      formDataToSend.append("supplier", submitData.supplier);
      formDataToSend.append(
        "compatibility",
        JSON.stringify(submitData.compatibility),
      );
      formDataToSend.append(
        "newOptions",
        JSON.stringify(submitData.newOptions),
      );

      images.forEach((img, index) => {
        formDataToSend.append(`images[${index}]`, img.file);
      });

      const response = await api.post("/inventory", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Product published successfully!");
        dispatch(clearNewDynamicOptions());
        handleNewProduct();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to publish product");
    }
  };

  const getSelectedModels = (make) => carData.models[make] || [];

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setShowSelector(false);
    setFormData({
      ...formData,
      productName: product.title,
      productCode: `PRD-${product.id}`,
      brand: product.brand,
    });
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
    setShowSelector(false);
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
      expireDate: "",
      tags: "",
    });
  };

  const handleOptionChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (
      field === "brand" ||
      field === "category" ||
      field === "productType" ||
      field === "supplier" ||
      field === "warehouse" ||
      field === "storageLocation" ||
      field === "unit"
    ) {
      if (
        !options[
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
                      : "units"
        ].includes(value)
      ) {
        const key =
          field === "category"
            ? "categories"
            : field === "productType"
              ? "productTypes"
              : field === "unit"
                ? "units"
                : field === "brand"
                  ? "brands"
                  : field === "supplier"
                    ? "suppliers"
                    : field === "warehouse"
                      ? "warehouses"
                      : "storageLocations";
        setOptions({ ...options, [key]: [...options[key], value] });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-24">
      {/* Product Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedProduct ? (
              <>
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Editing</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {selectedProduct.title}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Adding</p>
                  <p className="text-lg font-semibold text-slate-900">
                    New Product
                  </p>
                </div>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowSelector(!showSelector)}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {selectedProduct ? "Select Another" : "Load Existing"}
          </button>
        </div>

        {showSelector && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-3">
              Select a product to edit
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {existingProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product)}
                  className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {product.brand?.name || product.brand}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      product.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleNewProduct}
              className="mt-3 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              + Create New Product
            </button>
          </div>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-slate-500">Create a new product listing</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? "Publishing..." : "Publish Product"}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Basic Information */}
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
                  {...register("productName")}
                  type="text"
                  value={formData.productName}
                  onChange={(e) => {
                    setFormData({ ...formData, productName: e.target.value });
                    register("productName").onChange(e);
                  }}
                  placeholder="e.g., Brembo Premium Brake Caliper"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.productName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.productName.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("productCode")}
                    type="text"
                    value={formData.productCode}
                    onChange={(e) =>
                      setFormData({ ...formData, productCode: e.target.value })
                    }
                    placeholder="e.g., BRM-001"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  required
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
                  options={options.suppliers}
                  value={formData.supplier}
                  onChange={(value) => handleOptionChange("supplier", value)}
                  onCreate={(type, value) =>
                    handleCreateOption("supplier", value)
                  }
                  placeholder="Select supplier"
                  icon={Truck}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
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
                    {...register("publicPrice", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    value={formData.publicPrice}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        publicPrice: parseFloat(e.target.value) || 0,
                      });
                      setWatchedPublicPrice(parseFloat(e.target.value) || 0);
                    }}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Wholesale Price ($) <span className="text-red-500">*</span>
                  </label>
                  <Tooltip content="Price for bulk buyers. Must be lower than public price.">
                    <Info className="w-4 h-4 text-slate-400 cursor-help" />
                  </Tooltip>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    $
                  </span>
                  <input
                    {...register("wholesalePrice", { valueAsNumber: true })}
                    type="number"
                    step="0.01"
                    value={formData.wholesalePrice}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        wholesalePrice: parseFloat(e.target.value) || 0,
                      });
                      setWatchedWholesalePrice(parseFloat(e.target.value) || 0);
                    }}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {watchedPublicPrice > 0 && watchedWholesalePrice > 0 && (
              <div
                className={`mt-4 p-4 rounded-xl flex items-center gap-3 ${
                  watchedWholesalePrice <= watchedPublicPrice
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {watchedWholesalePrice <= watchedPublicPrice ? (
                  watchedWholesalePrice === watchedPublicPrice ? (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Wholesale price equals public price - no discount
                        applied
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Customers save $
                        {(watchedPublicPrice - watchedWholesalePrice).toFixed(
                          2,
                        )}{" "}
                        (
                        {Math.round(
                          ((watchedPublicPrice - watchedWholesalePrice) /
                            watchedPublicPrice) *
                            100,
                        )}
                        % off) when buying wholesale
                      </span>
                    </>
                  )
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">
                      Wholesale price exceeds public price - not allowed
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Inventory & Logistics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Inventory & Logistics
            </h2>
            <div className="space-y-5">
              {!isServiceType(formData.productType) && (
                <div className="grid grid-cols-2 gap-4">
                  <CreatableSelect
                    label="Warehouse"
                    options={options.warehouses}
                    value={formData.warehouse}
                    onChange={(value) => handleOptionChange("warehouse", value)}
                    onCreate={(type, value) =>
                      handleCreateOption("warehouse", value)
                    }
                    placeholder="Select warehouse"
                    icon={Archive}
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
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {isServiceType(formData.productType)
                      ? "Service Duration (hrs)"
                      : "Stock Quantity"}
                    {!isServiceType(formData.productType) && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    {...register("stockQuantity", { valueAsNumber: true })}
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
                {!isServiceType(formData.productType) && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Stock Alert
                      </label>
                      <Tooltip content="Alert when stock falls below this level">
                        <Info className="w-4 h-4 text-slate-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <input
                      {...register("stockAlert", { valueAsNumber: true })}
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
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Shipping Cost
                  </label>
                  <input
                    {...register("shippingCost", { valueAsNumber: true })}
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

          {/* Technical Details */}
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
                    {...register("warrantyPeriod")}
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
                    {...register("expireDate")}
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
                  {...register("tags")}
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="Enter tags separated by comma (e.g., brake, ceramic, front)"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {formData.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Product Images
            </h2>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300"
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
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
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
        </div>
      </div>

      {/* Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 z-40 shadow-lg shadow-slate-900/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-sm text-slate-500">
            {formData.productName ? (
              <span className="font-medium text-slate-900">
                {formData.productName}
              </span>
            ) : (
              "No product selected"
            )}
            {formData.productCode && (
              <span className="ml-2 text-slate-400">
                • {formData.productCode}
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
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Product"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
