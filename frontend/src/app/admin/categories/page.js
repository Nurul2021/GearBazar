"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  Package,
  Tag,
  AlertCircle,
  CheckCircle2,
  X,
  Save,
  FolderTree,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";

const initialCategories = [
  {
    id: 1,
    name: "Engine Parts",
    slug: "engine-parts",
    parent: null,
    productCount: 342,
    status: "Active",
    icon: "🔧",
    order: 1,
  },
  {
    id: 2,
    name: "Oil & Lubricants",
    slug: "oil-lubricants",
    parent: 1,
    productCount: 89,
    status: "Active",
    icon: "🛢️",
    order: 2,
  },
  {
    id: 3,
    name: "Filters",
    slug: "filters",
    parent: 1,
    productCount: 156,
    status: "Active",
    icon: "🔍",
    order: 3,
  },
  {
    id: 4,
    name: "Pistons & Rings",
    slug: "pistons-rings",
    parent: 1,
    productCount: 67,
    status: "Active",
    icon: "⚙️",
    order: 4,
  },
  {
    id: 5,
    name: "Brake System",
    slug: "brake-system",
    parent: null,
    productCount: 278,
    status: "Active",
    icon: "🛑",
    order: 5,
  },
  {
    id: 6,
    name: "Brake Pads",
    slug: "brake-pads",
    parent: 5,
    productCount: 145,
    status: "Active",
    icon: "📄",
    order: 6,
  },
  {
    id: 7,
    name: "Brake Discs",
    slug: "brake-discs",
    parent: 5,
    productCount: 89,
    status: "Active",
    icon: "💿",
    order: 7,
  },
  {
    id: 8,
    name: "Brake Fluid",
    slug: "brake-fluid",
    parent: 5,
    productCount: 44,
    status: "Active",
    icon: "🧪",
    order: 8,
  },
  {
    id: 9,
    name: "Electrical Parts",
    slug: "electrical-parts",
    parent: null,
    productCount: 198,
    status: "Active",
    icon: "⚡",
    order: 9,
  },
  {
    id: 10,
    name: "Batteries",
    slug: "batteries",
    parent: 9,
    productCount: 112,
    status: "Active",
    icon: "🔋",
    order: 10,
  },
  {
    id: 11,
    name: "Lighting",
    slug: "lighting",
    parent: 9,
    productCount: 86,
    status: "Active",
    icon: "💡",
    order: 11,
  },
  {
    id: 12,
    name: "Suspension",
    slug: "suspension",
    parent: null,
    productCount: 167,
    status: "Active",
    icon: "🏗️",
    order: 12,
  },
  {
    id: 13,
    name: "Shock Absorbers",
    slug: "shock-absorbers",
    parent: 12,
    productCount: 98,
    status: "Active",
    icon: "📐",
    order: 13,
  },
  {
    id: 14,
    name: "Springs",
    slug: "springs",
    parent: 12,
    productCount: 69,
    status: "Inactive",
    icon: "🌀",
    order: 14,
  },
  {
    id: 15,
    name: "Transmission",
    slug: "transmission",
    parent: null,
    productCount: 134,
    status: "Active",
    icon: "🔄",
    order: 15,
  },
  {
    id: 16,
    name: "Clutch Parts",
    slug: "clutch-parts",
    parent: 15,
    productCount: 78,
    status: "Active",
    icon: "📋",
    order: 16,
  },
  {
    id: 17,
    name: "Gear Box",
    slug: "gear-box",
    parent: 15,
    productCount: 56,
    status: "Active",
    icon: "⚙️",
    order: 17,
  },
  {
    id: 18,
    name: "Body Parts",
    slug: "body-parts",
    parent: null,
    productCount: 245,
    status: "Active",
    icon: "🚗",
    order: 18,
  },
  {
    id: 19,
    name: "Mirrors",
    slug: "mirrors",
    parent: 18,
    productCount: 67,
    status: "Active",
    icon: "🪞",
    order: 19,
  },
  {
    id: 20,
    name: "Bumpers",
    slug: "bumpers",
    parent: 18,
    productCount: 89,
    status: "Inactive",
    icon: "🛡️",
    order: 20,
  },
];

const iconOptions = [
  "🔧",
  "🛢️",
  "🔍",
  "⚙️",
  "🛑",
  "📄",
  "💿",
  "🧪",
  "⚡",
  "🔋",
  "💡",
  "🏗️",
  "📐",
  "🌀",
  "🔄",
  "🚗",
  "🪞",
  "🛡️",
  "📦",
  "🛞",
];

function CategoryModal({ category, onClose, onSave }) {
  const [form, setForm] = useState(
    category
      ? { ...category }
      : {
          name: "",
          slug: "",
          parent: null,
          productCount: 0,
          status: "Active",
          icon: "🔧",
          order: initialCategories.length + 1,
        },
  );

  const parentOptions = initialCategories.filter((c) => !c.parent);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setForm((prev) => ({ ...prev, name, slug: generateSlug(name) }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            {category ? "Edit Category" : "Add New Category"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Engine Parts"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Parent Category
            </label>
            <select
              value={form.parent || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  parent: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">None (Top Level)</option>
              {parentOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, icon }))}
                  className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${
                    form.icon === icon
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    order: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
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
            onClick={() => onSave(form)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" />
            {category ? "Update" : "Create"} Category
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ category, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Delete Category
          </h3>
          <p className="text-sm text-slate-500">
            Are you sure you want to delete{" "}
            <span className="font-medium text-slate-900">
              "{category.name}"
            </span>
            ? This action cannot be undone. ({category.productCount} products in
            this category)
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState(
    new Set([1, 5, 9, 12, 15, 18]),
  );
  const [showModal, setShowModal] = useState(null);
  const [showDelete, setShowDelete] = useState(null);

  const toggleExpand = (id) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      if (statusFilter !== "all" && cat.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !cat.name.toLowerCase().includes(q) &&
          !cat.slug.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [categories, search, statusFilter]);

  const topLevelCategories = filteredCategories.filter((c) => !c.parent);
  const getChildren = (parentId) =>
    filteredCategories.filter((c) => c.parent === parentId);

  const handleSave = (formData) => {
    if (formData.id) {
      setCategories((prev) =>
        prev.map((c) => (c.id === formData.id ? formData : c)),
      );
    } else {
      setCategories((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    setShowModal(null);
  };

  const handleDelete = (category) => {
    setCategories((prev) => prev.filter((c) => c.id !== category.id));
    setShowDelete(null);
  };

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c,
      ),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Category Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Organize products with hierarchical categories
          </p>
        </div>
        <button
          onClick={() => setShowModal({})}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
              <FolderTree className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {categories.filter((c) => !c.parent).length}
              </p>
              <p className="text-sm text-slate-500">Top-Level Categories</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Tag className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {categories.length}
              </p>
              <p className="text-sm text-slate-500">Total Categories</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {categories.reduce((sum, c) => sum + c.productCount, 0)}
              </p>
              <p className="text-sm text-slate-500">Total Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase w-8"></th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Category
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Slug
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Products
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Order
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {topLevelCategories.map((cat) => {
                const children = getChildren(cat.id);
                const isExpanded = expandedRows.has(cat.id);
                return (
                  <>
                    <tr key={cat.id} className="hover:bg-slate-50">
                      <td className="px-5 py-3">
                        {children.length > 0 ? (
                          <button
                            onClick={() => toggleExpand(cat.id)}
                            className="p-0.5 hover:bg-slate-100 rounded"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        ) : (
                          <GripVertical className="w-4 h-4 text-slate-300" />
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{cat.icon}</span>
                          <span className="text-sm font-medium text-slate-900">
                            {cat.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-500">
                        {cat.slug}
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-sm font-medium text-slate-900">
                          {cat.productCount}
                        </span>
                        {children.length > 0 && (
                          <span className="text-xs text-slate-500 ml-1">
                            (+{children.reduce((s, c) => s + c.productCount, 0)}{" "}
                            sub)
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => toggleStatus(cat.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            cat.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {cat.status === "Active" ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          {cat.status}
                        </button>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-500">
                        {cat.order}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setShowModal(cat)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDelete(cat)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded &&
                      children.map((child) => (
                        <tr
                          key={child.id}
                          className="bg-slate-50/50 hover:bg-slate-100/50"
                        >
                          <td className="px-5 py-3">
                            <div className="pl-6">
                              <GripVertical className="w-4 h-4 text-slate-300" />
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3 pl-6">
                              <span className="text-xl">{child.icon}</span>
                              <span className="text-sm text-slate-700">
                                {child.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-500">
                            {child.slug}
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-700">
                            {child.productCount}
                          </td>
                          <td className="px-5 py-3">
                            <button
                              onClick={() => toggleStatus(child.id)}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                child.status === "Active"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {child.status === "Active" ? (
                                <Eye className="w-3 h-3" />
                              ) : (
                                <EyeOff className="w-3 h-3" />
                              )}
                              {child.status}
                            </button>
                          </td>
                          <td className="px-5 py-3 text-sm text-slate-500">
                            {child.order}
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setShowModal(child)}
                                className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowDelete(child)}
                                className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {topLevelCategories.length === 0 && (
          <div className="text-center py-12">
            <FolderTree className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No categories found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showModal && (
        <CategoryModal
          category={showModal.id ? showModal : null}
          onClose={() => setShowModal(null)}
          onSave={handleSave}
        />
      )}
      {showDelete && (
        <DeleteConfirmModal
          category={showDelete}
          onClose={() => setShowDelete(null)}
          onConfirm={() => handleDelete(showDelete)}
        />
      )}
    </div>
  );
}
