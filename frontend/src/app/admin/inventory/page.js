"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Package,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpDown,
  Download,
  Pencil,
  Plus,
  X,
  Save,
  Warehouse,
  TrendingDown,
  TrendingUp,
  BarChart3,
  Box,
  Truck,
} from "lucide-react";

const initialInventory = [
  {
    id: 1,
    name: "Engine Oil 5W-30",
    sku: "EO-5W30-001",
    vendor: "Rahim Auto Parts",
    warehouse: "Dhaka Central",
    currentStock: 245,
    reserved: 12,
    available: 233,
    lowStockAlert: 50,
    status: "In Stock",
    category: "Engine Parts",
  },
  {
    id: 2,
    name: "Brake Pad Set Front",
    sku: "BP-F-001",
    vendor: "Karim Spare Center",
    warehouse: "Dhaka Central",
    currentStock: 89,
    reserved: 5,
    available: 84,
    lowStockAlert: 30,
    status: "In Stock",
    category: "Brake System",
  },
  {
    id: 3,
    name: "Air Filter Element",
    sku: "AF-EL-002",
    vendor: "AutoMax Ltd.",
    warehouse: "Chittagong",
    currentStock: 156,
    reserved: 8,
    available: 148,
    lowStockAlert: 40,
    status: "In Stock",
    category: "Filters",
  },
  {
    id: 4,
    name: "Spark Plug Iridium",
    sku: "SP-IR-004",
    vendor: "ProParts BD",
    warehouse: "Dhaka Central",
    currentStock: 23,
    reserved: 3,
    available: 20,
    lowStockAlert: 25,
    status: "Low Stock",
    category: "Electrical",
  },
  {
    id: 5,
    name: "Headlight Assembly",
    sku: "HL-LED-003",
    vendor: "GearHead Parts",
    warehouse: "Sylhet",
    currentStock: 0,
    reserved: 0,
    available: 0,
    lowStockAlert: 10,
    status: "Out of Stock",
    category: "Body Parts",
  },
  {
    id: 6,
    name: "Shock Absorber",
    sku: "SA-002",
    vendor: "Rahim Auto Parts",
    warehouse: "Dhaka Central",
    currentStock: 67,
    reserved: 4,
    available: 63,
    lowStockAlert: 20,
    status: "In Stock",
    category: "Suspension",
  },
  {
    id: 7,
    name: "Clutch Plate",
    sku: "CP-001",
    vendor: "Karim Spare Center",
    warehouse: "Chittagong",
    currentStock: 12,
    reserved: 1,
    available: 11,
    lowStockAlert: 15,
    status: "Low Stock",
    category: "Transmission",
  },
  {
    id: 8,
    name: "Radiator Coolant",
    sku: "RC-001",
    vendor: "AutoMax Ltd.",
    warehouse: "Dhaka Central",
    currentStock: 189,
    reserved: 10,
    available: 179,
    lowStockAlert: 50,
    status: "In Stock",
    category: "Engine Parts",
  },
  {
    id: 9,
    name: "Timing Belt",
    sku: "TB-001",
    vendor: "ProParts BD",
    warehouse: "Sylhet",
    currentStock: 34,
    reserved: 2,
    available: 32,
    lowStockAlert: 20,
    status: "In Stock",
    category: "Engine Parts",
  },
  {
    id: 10,
    name: "Fuel Filter",
    sku: "FF-001",
    vendor: "GearHead Parts",
    warehouse: "Dhaka Central",
    currentStock: 8,
    reserved: 0,
    available: 8,
    lowStockAlert: 30,
    status: "Low Stock",
    category: "Filters",
  },
  {
    id: 11,
    name: "Alternator",
    sku: "ALT-001",
    vendor: "Rahim Auto Parts",
    warehouse: "Chittagong",
    currentStock: 45,
    reserved: 3,
    available: 42,
    lowStockAlert: 15,
    status: "In Stock",
    category: "Electrical",
  },
  {
    id: 12,
    name: "Brake Disc",
    sku: "BD-001",
    vendor: "Karim Spare Center",
    warehouse: "Dhaka Central",
    currentStock: 0,
    reserved: 0,
    available: 0,
    lowStockAlert: 20,
    status: "Out of Stock",
    category: "Brake System",
  },
];

const warehouses = ["All Warehouses", "Dhaka Central", "Chittagong", "Sylhet"];
const categories = [
  "All Categories",
  "Engine Parts",
  "Brake System",
  "Filters",
  "Electrical",
  "Suspension",
  "Transmission",
  "Body Parts",
];

function StockUpdateModal({ item, onClose, onSave }) {
  const [form, setForm] = useState({ adjustment: "", type: "add", reason: "" });

  const handleSave = () => {
    const qty = Number(form.adjustment);
    if (!qty || qty <= 0) return;
    const newStock =
      form.type === "add"
        ? item.currentStock + qty
        : Math.max(0, item.currentStock - qty);
    onSave(item.id, newStock, form.reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Update Stock - {item.name}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">Current Stock</p>
            <p className="text-2xl font-bold text-slate-900">
              {item.currentStock} units
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Available: {item.available} | Reserved: {item.reserved}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Adjustment Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setForm((prev) => ({ ...prev, type: "add" }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-sm font-medium ${
                  form.type === "add"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <TrendingUp className="w-4 h-4" /> Add Stock
              </button>
              <button
                onClick={() => setForm((prev) => ({ ...prev, type: "remove" }))}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 text-sm font-medium ${
                  form.type === "remove"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-slate-200 text-slate-600"
                }`}
              >
                <TrendingDown className="w-4 h-4" /> Remove Stock
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              value={form.adjustment}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, adjustment: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason
            </label>
            <select
              value={form.reason}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, reason: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select reason</option>
              <option value="New Stock Received">New Stock Received</option>
              <option value="Damaged Products">Damaged Products</option>
              <option value="Returned by Customer">Returned by Customer</option>
              <option value="Inventory Correction">Inventory Correction</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" /> Update Stock
          </button>
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("All Warehouses");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [showModal, setShowModal] = useState(null);

  const filteredInventory = useMemo(() => {
    let result = [...inventory];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q),
      );
    }
    if (warehouseFilter !== "All Warehouses")
      result = result.filter((i) => i.warehouse === warehouseFilter);
    if (categoryFilter !== "All Categories")
      result = result.filter((i) => i.category === categoryFilter);
    if (stockFilter === "in_stock")
      result = result.filter((i) => i.status === "In Stock");
    if (stockFilter === "low_stock")
      result = result.filter((i) => i.status === "Low Stock");
    if (stockFilter === "out_of_stock")
      result = result.filter((i) => i.status === "Out of Stock");
    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (sortConfig.direction === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });
    return result;
  }, [
    inventory,
    search,
    warehouseFilter,
    categoryFilter,
    stockFilter,
    sortConfig,
  ]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleStockUpdate = (id, newStock, reason) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const status =
          newStock === 0
            ? "Out of Stock"
            : newStock <= item.lowStockAlert
              ? "Low Stock"
              : "In Stock";
        return {
          ...item,
          currentStock: newStock,
          available: newStock - item.reserved,
          status,
        };
      }),
    );
  };

  const stats = useMemo(() => {
    const total = inventory.reduce((s, i) => s + i.currentStock, 0);
    const inStock = inventory.filter((i) => i.status === "In Stock").length;
    const lowStock = inventory.filter((i) => i.status === "Low Stock").length;
    const outOfStock = inventory.filter(
      (i) => i.status === "Out of Stock",
    ).length;
    return { total, inStock, lowStock, outOfStock };
  }, [inventory]);

  const SortIcon = ({ column }) => (
    <button
      onClick={() => handleSort(column)}
      className="inline-flex items-center gap-1 hover:text-slate-900"
    >
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Inventory Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and manage stock across warehouses
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Items",
            value: stats.total,
            icon: Package,
            color: "indigo",
          },
          {
            label: "In Stock",
            value: stats.inStock,
            icon: CheckCircle2,
            color: "emerald",
          },
          {
            label: "Low Stock",
            value: stats.lowStock,
            icon: AlertTriangle,
            color: "amber",
          },
          {
            label: "Out of Stock",
            value: stats.outOfStock,
            icon: XCircle,
            color: "red",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={warehouseFilter}
            onChange={(e) => setWarehouseFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {warehouses.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Stock Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  <SortIcon column="name" /> Product
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  SKU
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Warehouse
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  <SortIcon column="currentStock" /> Current
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  Available
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-center">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500">{item.category}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm font-mono text-slate-600">
                      {item.sku}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Warehouse className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-700">
                        {item.warehouse}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className={`text-sm font-bold ${
                        item.currentStock === 0
                          ? "text-red-600"
                          : item.currentStock <= item.lowStockAlert
                            ? "text-amber-600"
                            : "text-slate-900"
                      }`}
                    >
                      {item.currentStock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-sm text-slate-600">
                    {item.available}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.status === "In Stock"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "Low Stock"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      {item.status === "In Stock" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : item.status === "Low Stock" ? (
                        <AlertTriangle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowModal(item)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                      >
                        <Pencil className="w-3 h-3" /> Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No inventory items found</p>
          </div>
        )}
      </div>

      {showModal && (
        <StockUpdateModal
          item={showModal}
          onClose={() => setShowModal(null)}
          onSave={handleStockUpdate}
        />
      )}
    </div>
  );
}
