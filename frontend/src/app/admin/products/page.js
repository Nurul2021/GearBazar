"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  ChevronDown,
  Package,
  Image as ImageIcon,
  Tag,
  Hash,
  DollarSign,
  Store,
  Building2,
  CheckCircle,
  XCircle,
  Edit3,
  ExternalLink,
  Trash2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Plus,
  Send,
} from "lucide-react";
import ProductEditModal from "@/components/admin/ProductEditModal";

const mockProducts = [
  {
    id: 1,
    name: "Disc Brake Pad Set",
    sku: "BRK-001",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=80",
    vendorName: "AutoCare Garage",
    vendorType: "Garage",
    category: "Brakes",
    brand: "Bosch",
    publicPrice: 2500,
    wholesalePrice: 1800,
    stock: 45,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "123456789012",
  },
  {
    id: 2,
    name: "Engine Oil 5W-30",
    sku: "OIL-002",
    image:
      "https://images.unsplash.com/photo-1635864431048-8b8eeefe3a31?w=100&q=80",
    vendorName: "Prime Auto Parts",
    vendorType: "Shop",
    category: "Engine",
    brand: "Shell",
    publicPrice: 3200,
    wholesalePrice: 2400,
    stock: 120,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "234567890123",
  },
  {
    id: 3,
    name: "Headlight Assembly",
    sku: "HDT-003",
    image:
      "https://images.unsplash.com/photo-1621996070411-5e5d6c2d5c36?w=100&q=80",
    vendorName: "Dhaka Car Service",
    vendorType: "Garage",
    category: "Lighting",
    brand: "Philips",
    publicPrice: 8500,
    wholesalePrice: 6200,
    stock: 0,
    status: "Out of Stock",
    approvalStatus: "Pending",
    barcode: "345678901234",
  },
  {
    id: 4,
    name: "Air Filter Element",
    sku: "AIR-004",
    image:
      "https://images.unsplash.com/photo-1605559424843-947ed4710b1a?w=100&q=80",
    vendorName: "Speedy Spares",
    vendorType: "Shop",
    category: "Filters",
    brand: "K&N",
    publicPrice: 1800,
    wholesalePrice: 1200,
    stock: 88,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "456789012345",
  },
  {
    id: 5,
    name: "Shock Absorber Pair",
    sku: "SHK-005",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=100&q=80",
    vendorName: "GearMax Workshop",
    vendorType: "Garage",
    category: "Suspension",
    brand: "Monroe",
    publicPrice: 15600,
    wholesalePrice: 11200,
    stock: 15,
    status: "Pending",
    approvalStatus: "Pending",
    barcode: "567890123456",
  },
  {
    id: 6,
    name: "Spark Plug Set",
    sku: "SPK-006",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&q=80",
    vendorName: "MotorHub Store",
    vendorType: "Shop",
    category: "Ignition",
    brand: "NGK",
    publicPrice: 1200,
    wholesalePrice: 800,
    stock: 200,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "678901234567",
  },
  {
    id: 7,
    name: "Radiator Coolant",
    sku: "CLT-007",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=80",
    vendorName: "AutoZone BD",
    vendorType: "Shop",
    category: "Cooling",
    brand: "Prestone",
    publicPrice: 900,
    wholesalePrice: 600,
    stock: 150,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "789012345678",
  },
  {
    id: 8,
    name: "Clutch Plate Kit",
    sku: "CLT-008",
    image:
      "https://images.unsplash.com/photo-1635864431048-8b8eeefe3a31?w=100&q=80",
    vendorName: "ProMechanic Garage",
    vendorType: "Garage",
    category: "Transmission",
    brand: "Exedy",
    publicPrice: 12500,
    wholesalePrice: 9200,
    stock: 10,
    status: "Pending",
    approvalStatus: "Pending",
    barcode: "890123456789",
  },
  {
    id: 9,
    name: "Battery 12V 65Ah",
    sku: "BAT-009",
    image:
      "https://images.unsplash.com/photo-1621996070411-5e5d6c2d5c36?w=100&q=80",
    vendorName: "Prime Auto Parts",
    vendorType: "Shop",
    category: "Electrical",
    brand: "Exide",
    publicPrice: 9800,
    wholesalePrice: 7200,
    stock: 25,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "901234567890",
  },
  {
    id: 10,
    name: "Timing Belt Kit",
    sku: "TBT-010",
    image:
      "https://images.unsplash.com/photo-1605559424843-947ed4710b1a?w=100&q=80",
    vendorName: "AutoCare Garage",
    vendorType: "Garage",
    category: "Engine",
    brand: "Gates",
    publicPrice: 4500,
    wholesalePrice: 3200,
    stock: 0,
    status: "Out of Stock",
    approvalStatus: "Approved",
    barcode: "012345678901",
  },
  {
    id: 11,
    name: "Wiper Blade Set",
    sku: "WIP-011",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=100&q=80",
    vendorName: "Speedy Spares",
    vendorType: "Shop",
    category: "Exterior",
    brand: "Bosch",
    publicPrice: 1500,
    wholesalePrice: 1000,
    stock: 75,
    status: "Active",
    approvalStatus: "Approved",
    barcode: "112345678902",
  },
  {
    id: 12,
    name: "Brake Disc Rotor",
    sku: "BDR-012",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=100&q=80",
    vendorName: "GearMax Workshop",
    vendorType: "Garage",
    category: "Brakes",
    brand: "Brembo",
    publicPrice: 6800,
    wholesalePrice: 4900,
    stock: 30,
    status: "Pending",
    approvalStatus: "Pending",
    barcode: "122345678903",
  },
];

const PRODUCTS_PER_PAGE = 10;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedStockStatus, setSelectedStockStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState(mockProducts);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bulkAction, setBulkAction] = useState("");
  const [bulkCategory, setBulkCategory] = useState("");

  const vendors = ["All", ...new Set(mockProducts.map((p) => p.vendorName))];
  const categories = ["All", ...new Set(mockProducts.map((p) => p.category))];
  const brands = ["All", ...new Set(mockProducts.map((p) => p.brand))];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.includes(q),
      );
    }

    if (selectedVendor !== "All") {
      result = result.filter((p) => p.vendorName === selectedVendor);
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedBrand !== "All") {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (selectedStockStatus !== "All") {
      if (selectedStockStatus === "In Stock") {
        result = result.filter((p) => p.stock > 0);
      } else if (selectedStockStatus === "Out of Stock") {
        result = result.filter((p) => p.stock === 0);
      } else if (selectedStockStatus === "Low Stock") {
        result = result.filter((p) => p.stock > 0 && p.stock <= 20);
      }
    }

    return result;
  }, [
    products,
    searchQuery,
    selectedVendor,
    selectedCategory,
    selectedBrand,
    selectedStockStatus,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p.id !== id) : [...prev, id],
    );
  };

  const handleApprove = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, approvalStatus: "Approved", status: "Active" }
          : p,
      ),
    );
  };

  const handleReject = (productId) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, approvalStatus: "Rejected", status: "Pending" }
          : p,
      ),
    );
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  const handleSaveEdit = (productId, formData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...formData } : p)),
    );
  };

  const handleBulkAction = () => {
    if (!bulkAction || selectedProducts.length === 0) return;

    if (bulkAction === "delete") {
      setProducts((prev) =>
        prev.filter((p) => !selectedProducts.includes(p.id)),
      );
    } else if (bulkAction === "activate") {
      setProducts((prev) =>
        prev.map((p) =>
          selectedProducts.includes(p.id) ? { ...p, status: "Active" } : p,
        ),
      );
    } else if (bulkAction === "deactivate") {
      setProducts((prev) =>
        prev.map((p) =>
          selectedProducts.includes(p.id) ? { ...p, status: "Pending" } : p,
        ),
      );
    } else if (bulkAction === "assignCategory" && bulkCategory) {
      setProducts((prev) =>
        prev.map((p) =>
          selectedProducts.includes(p.id)
            ? { ...p, category: bulkCategory }
            : p,
        ),
      );
    }

    setSelectedProducts([]);
    setBulkAction("");
    setBulkCategory("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    setSelectedProducts([]);
  };

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Global Product Catalog
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and approve all vendor products
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/products/add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 space-y-3">
          <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Name, SKU, or Barcode..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <FilterSelect
                icon={Store}
                value={selectedVendor}
                onChange={(e) => {
                  setSelectedVendor(e.target.value);
                  setCurrentPage(1);
                }}
                options={vendors}
                placeholder="All Vendors"
              />
              <FilterSelect
                icon={Tag}
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                options={categories}
                placeholder="All Categories"
              />
              <FilterSelect
                icon={LayoutGrid}
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setCurrentPage(1);
                }}
                options={brands}
                placeholder="All Brands"
              />
              <select
                value={selectedStockStatus}
                onChange={(e) => {
                  setSelectedStockStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="All">All Stock</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Low Stock">Low Stock (≤20)</option>
              </select>
            </div>
          </div>

          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
              <span className="text-sm font-medium text-indigo-700">
                {selectedProducts.length} selected
              </span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
              >
                <option value="">Bulk Actions</option>
                <option value="activate">Set Active</option>
                <option value="deactivate">Set Pending</option>
                <option value="assignCategory">Assign to Category</option>
                <option value="delete">Delete</option>
              </select>
              {bulkAction === "assignCategory" && (
                <select
                  value={bulkCategory}
                  onChange={(e) => setBulkCategory(e.target.value)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm"
                >
                  <option value="">Select Category</option>
                  {categories
                    .filter((c) => c !== "All")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              )}
              <button
                onClick={handleBulkAction}
                disabled={!bulkAction}
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === paginatedProducts.length &&
                      paginatedProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Public Price
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Wholesale
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Approval
                </th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Package className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">
                        No products found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 text-sm">
                        {product.name}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {product.sku}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-slate-700">
                          {product.vendorName}
                        </span>
                        <VendorBadge type={product.vendorType} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        <Tag className="w-3 h-3" />
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-900 text-sm">
                      ৳{product.publicPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-slate-600 text-sm">
                      ৳{product.wholesalePrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StockBadge stock={product.stock} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.approvalStatus === "Pending" ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleApprove(product.id)}
                            className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleReject(product.id)}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                            product.approvalStatus === "Approved"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {product.approvalStatus === "Approved" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {product.approvalStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4 text-slate-500" />
                        </button>
                        <a
                          href={`/products/${product.id}`}
                          target="_blank"
                          className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                          title="View on Site"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-500" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}-
              {Math.min(
                currentPage * PRODUCTS_PER_PAGE,
                filteredProducts.length,
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductEditModal
        product={selectedProduct}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

function FilterSelect({ icon: Icon, value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="appearance-none pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "All" ? placeholder : opt}
          </option>
        ))}
      </select>
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

function VendorBadge({ type }) {
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
        type === "Garage"
          ? "bg-blue-100 text-blue-700 border-blue-200"
          : "bg-purple-100 text-purple-700 border-purple-200"
      }`}
    >
      {type}
    </span>
  );
}

function StockBadge({ stock }) {
  let color, label;
  if (stock === 0) {
    color = "bg-red-100 text-red-700 border-red-200";
    label = "Out";
  } else if (stock <= 20) {
    color = "bg-amber-100 text-amber-700 border-amber-200";
    label = stock;
  } else {
    color = "bg-green-100 text-green-700 border-green-200";
    label = stock;
  }

  return (
    <span
      className={`inline-flex items-center justify-center min-w-[40px] px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}
    >
      {label}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    "Out of Stock": "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
