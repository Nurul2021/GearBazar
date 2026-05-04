"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  CheckCircle2,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  SlidersHorizontal,
} from "lucide-react";
import api from "@/lib/axios";
import Badge from "@/components/ui/Badge";

/* ---------- helpers ---------- */
const productKeys = {
  all: ["products"],
  lists: () => [...productKeys.all, "list"],
  list: (filters) => [...productKeys.lists(), filters],
};

function useProducts(filters = {}) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: async () => {
      const res = await api.get("/inventory", { params: filters });
      return res.data.data;
    },
  });
}

function getStockStatus(stock = 0, alert = 10) {
  if (stock === 0) return { label: "Out of Stock", variant: "outOfStock" };
  if (stock <= alert) return { label: "Low Stock", variant: "pending" };
  return { label: "In Stock", variant: "stock" };
}

/* ---------- columns ---------- */
const COLUMNS = [
  { key: "product", label: "Product", sortable: true },
  { key: "sku", label: "SKU", sortable: false },
  { key: "category", label: "Category", sortable: false },
  { key: "price", label: "Price", sortable: true, align: "right" },
  { key: "stock", label: "Stock", sortable: true, align: "right" },
  { key: "status", label: "Status", sortable: false, align: "center" },
  { key: "actions", label: "Actions", sortable: false, align: "right" },
];

/* ---------- page ---------- */
export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selected, setSelected] = useState([]);

  const { data, isLoading, error } = useProducts({
    search: search || undefined,
    category: category !== "all" ? category : undefined,
    sort: `${sortOrder === "desc" ? "-" : ""}${sortBy}`,
  });

  const products = data?.products || [];

  const filtered = products.filter((p) => {
    if (stockFilter === "all") return true;
    const s = getStockStatus(p.stock, p.stockAlert)
      .label.toLowerCase()
      .replace(/\s+/g, "-");
    return s === stockFilter;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price")
      return sortOrder === "asc"
        ? (a.publicPrice || 0) - (b.publicPrice || 0)
        : (b.publicPrice || 0) - (a.publicPrice || 0);
    if (sortBy === "stock")
      return sortOrder === "asc"
        ? (a.stock || 0) - (b.stock || 0)
        : (b.stock || 0) - (a.stock || 0);
    return 0;
  });

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const toggleAll = () => {
    if (selected.length === sorted.length) setSelected([]);
    else setSelected(sorted.map((p) => p._id || p.id));
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  if (error) {
    const isAuthError = error?.response?.status === 401;
    return (
      <div className="text-center py-16">
        <Package className="mx-auto mb-4 h-12 w-12 text-slate-300" />
        <p className="mb-2 text-lg font-semibold text-slate-900">
          {isAuthError ? "Authentication Required" : "Failed to load products"}
        </p>
        <p className="mb-6 text-sm text-slate-500">
          {isAuthError
            ? "Please log in to view your products"
            : "Something went wrong. Please try again later."}
        </p>
        {isAuthError && (
          <button
            onClick={() => (window.location.href = "/login")}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
          >
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Products</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your entire product catalog
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/dashboard/products/add")}
          className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
        >
          <Plus className="h-5 w-5" />
          Add New Product
        </button>
      </div>

      {/* filters bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        {/* search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, SKU, category..."
            className="w-full rounded-xl border-0 bg-slate-50 py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border-0 bg-slate-50 py-2.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Categories</option>
          <option value="engine">Engine</option>
          <option value="brakes">Brakes</option>
          <option value="suspension">Suspension</option>
          <option value="electrical">Electrical</option>
          <option value="transmission">Transmission</option>
          <option value="body-parts">Body Parts</option>
        </select>

        {/* stock */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          className="rounded-xl border-0 bg-slate-50 py-2.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Status</option>
          <option value="in-stock">In Stock</option>
          <option value="low-stock">Low Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        {/* sort */}
        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split("-");
            setSortBy(field);
            setSortOrder(order);
          }}
          className="rounded-xl border-0 bg-slate-50 py-2.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-red-500"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="publicPrice-desc">Price: High → Low</option>
          <option value="publicPrice-asc">Price: Low → High</option>
          <option value="stock-desc">Stock: High → Low</option>
        </select>

        {/* clear filters */}
        {(search || category !== "all" || stockFilter !== "all") && (
          <button
            onClick={() => {
              setSearch("");
              setCategory("all");
              setStockFilter("all");
            }}
            className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* bulk actions */}
      {selected.length > 0 && (
        <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 ring-1 ring-red-200">
          <span className="text-sm font-medium text-red-700">
            {selected.length} selected
          </span>
          <div className="flex gap-2">
            <button className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm text-red-600 hover:bg-red-50">
              Bulk Edit
            </button>
            <button className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      )}

      {/* table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === sorted.length && sorted.length > 0
                    }
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                </th>

                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 ${col.align === "right" ? "text-right" : ""}`}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => handleSort(col.key)}
                        className="inline-flex items-center gap-1 hover:text-slate-700"
                      >
                        {col.label}
                        {sortBy === col.key ? (
                          sortOrder === "asc" ? (
                            <ArrowUp className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDown className="h-3.5 w-3.5" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                        )}
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 rounded bg-slate-100" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : sorted.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center">
                    <Package className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                    <p className="font-medium text-slate-900">
                      No products found
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {search || category !== "all" || stockFilter !== "all"
                        ? "Try adjusting your filters"
                        : "Add your first product to get started"}
                    </p>
                  </td>
                </tr>
              ) : (
                sorted.map((product) => {
                  const status = getStockStatus(
                    product.stock,
                    product.stockAlert,
                  );
                  const id = product._id || product.id;
                  const isSelected = selected.includes(id);

                  return (
                    <tr key={id} className="transition hover:bg-slate-50/70">
                      {/* checkbox */}
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(id)}
                          className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                        />
                      </td>

                      {/* product */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              product.images?.[0]?.url ||
                              "/placeholder-product.png"
                            }
                            alt={product.title || product.name}
                            className="h-10 w-10 rounded-lg object-cover bg-slate-50"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-slate-900">
                              {product.title || product.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {product.partNumber || product.sku || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* sku */}
                      <td className="px-4 py-3 text-slate-600">
                        {product.partNumber || product.sku || "N/A"}
                      </td>

                      {/* category */}
                      <td className="px-4 py-3 text-slate-600">
                        {product.category || "N/A"}
                      </td>

                      {/* price */}
                      <td className="px-4 py-3 text-right font-semibold text-slate-900">
                        ${product.publicPrice?.toFixed(2) || "0.00"}
                      </td>

                      {/* stock */}
                      <td className="px-4 py-3 text-right text-slate-700">
                        {product.stock ?? 0}
                      </td>

                      {/* status */}
                      <td className="px-4 py-3 text-center">
                        <Badge variant={status.variant} size="xs">
                          {status.label}
                        </Badge>
                      </td>

                      {/* actions */}
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <button
                            onClick={() =>
                              (window.location.href = `/dashboard/products/${id}`)
                            }
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"
                            title="Edit"
                          >
                            <Package className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-500"
                            title="Delete"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
