"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  X,
  Check,
} from "lucide-react";
import Modal from "../ui/Modal";
import AddNewPartForm from "./AddNewPartForm";

const categories = [
  "All Categories",
  "Engine",
  "Brakes",
  "Suspension",
  "Electrical",
  "Transmission",
  "Body Parts",
  "Interior",
  "Wheels",
  "Oils & Fluids",
];

const stockStatuses = ["All", "In Stock", "Low Stock", "Out of Stock"];

const inventoryData = [
  {
    id: 1,
    name: "Brembo Premium Brake Caliper",
    sku: "BRM-PMC-001",
    category: "Brakes",
    publicPrice: 189.99,
    wholesalePrice: 145.0,
    stock: 45,
    stockAlert: 10,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80",
  },
  {
    id: 2,
    name: "Monroe Shock Absorber Set",
    sku: "MON-SH-002",
    category: "Suspension",
    publicPrice: 129.99,
    wholesalePrice: 99.0,
    stock: 12,
    stockAlert: 10,
    image:
      "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=100&q=80",
  },
  {
    id: 3,
    name: "Bosch Alternator 150A",
    sku: "BOS-ALT-003",
    category: "Electrical",
    publicPrice: 249.99,
    wholesalePrice: 199.0,
    stock: 0,
    stockAlert: 5,
    image:
      "https://images.unsplash.com/photo-1552975383-513c7002d408?w=100&q=80",
  },
  {
    id: 4,
    name: "NGK Iridium Spark Plugs (4pc)",
    sku: "NGK-SP-004",
    category: "Engine",
    publicPrice: 59.99,
    wholesalePrice: 45.0,
    stock: 156,
    stockAlert: 20,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=100&q=80",
  },
  {
    id: 5,
    name: "Castrol Edge Motor Oil 5W-30",
    sku: "CAS-OIL-005",
    category: "Oils & Fluids",
    publicPrice: 34.99,
    wholesalePrice: 26.0,
    stock: 8,
    stockAlert: 15,
    image:
      "https://images.unsplash.com/photo-1506368242239-9d49a5466f7a?w=100&q=80",
  },
  {
    id: 6,
    name: "Michelin Defender Tires",
    sku: "MCH-TIRE-006",
    category: "Wheels",
    publicPrice: 159.99,
    wholesalePrice: 125.0,
    stock: 32,
    stockAlert: 8,
    image:
      "https://images.unsplash.com/photo-1578844251758-2f0316a63835?w=100&q=80",
  },
  {
    id: 7,
    name: "Denso A/C Compressor",
    sku: "DEN-AC-007",
    category: "Electrical",
    publicPrice: 329.99,
    wholesalePrice: 269.0,
    stock: 5,
    stockAlert: 3,
    image:
      "https://images.unsplash.com/photo-1552975383-513c7002d408?w=100&q=80",
  },
  {
    id: 8,
    name: "TRW Brake Pad Set",
    sku: "TRW-BP-008",
    category: "Brakes",
    publicPrice: 79.99,
    wholesalePrice: 59.0,
    stock: 67,
    stockAlert: 10,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80",
  },
];

function getStockStatus(stock, stockAlert = 10) {
  if (stock === 0)
    return {
      label: "Out of Stock",
      color: "bg-red-100 text-red-700",
      dot: "bg-red-500",
    };
  if (stock <= stockAlert)
    return {
      label: "Low Stock",
      color: "bg-yellow-100 text-yellow-700",
      dot: "bg-yellow-500",
    };
  return {
    label: "In Stock",
    color: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  };
}

export default function InventoryTable() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredData = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || item.category === categoryFilter;
    const stockStatus = getStockStatus(item.stock, item.stockAlert).label;
    const matchesStock =
      stockFilter === "All" ||
      (stockFilter === "In Stock" && stockStatus === "In Stock") ||
      (stockFilter === "Low Stock" && stockStatus === "Low Stock") ||
      (stockFilter === "Out of Stock" && stockStatus === "Out of Stock");
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Inventory / My Parts
          </h1>
          <p className="text-slate-500">Manage your products and stock</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by part name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
              showFilters
                ? "bg-red-50 border-red-200 text-red-600"
                : "border-gray-200 text-slate-600"
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {(categoryFilter !== "All Categories" || stockFilter !== "All") && (
              <span className="w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                {(categoryFilter !== "All Categories" ? 1 : 0) +
                  (stockFilter !== "All" ? 1 : 0)}
              </span>
            )}
          </button>

          {/* Desktop Filters */}
          <div
            className={`hidden lg:flex items-center gap-3 ${showFilters ? "flex" : "hidden"}`}
          >
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500"
            >
              {stockStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {(categoryFilter !== "All Categories" || stockFilter !== "All") && (
              <button
                onClick={() => {
                  setCategoryFilter("All Categories");
                  setStockFilter("All");
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <div className="lg:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500"
            >
              {stockStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-medium text-red-700">
            {selectedItems.length} item(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-red-700 hover:bg-red-100 rounded-lg transition-colors">
              Delete Selected
            </button>
            <button className="px-3 py-1.5 text-sm text-red-700 hover:bg-red-100 rounded-lg transition-colors">
              Update Stock
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Image
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Part Name
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  SKU
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Category
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Price
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Stock
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => {
                const stockStatus = getStockStatus(item.stock, item.stockAlert);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelect(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-slate-900">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600 font-mono">
                        {item.sku}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">
                            {item.publicPrice}
                          </span>
                          <span className="text-xs text-slate-500">Public</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-green-600">
                            {item.wholesalePrice}
                          </span>
                          <span className="text-xs text-slate-400">
                            Wholesale
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${stockStatus.dot}`}
                          />
                          {stockStatus.label}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({item.stock})
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No products found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredData.length} of {inventoryData.length} products
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 text-sm text-slate-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-gray-100 rounded-lg">
              2
            </button>
            <button className="px-3 py-1.5 text-sm text-slate-600 hover:bg-gray-100 rounded-lg">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        size="xl"
      >
        <AddNewPartForm onSuccess={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}
