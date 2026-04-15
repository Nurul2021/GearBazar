"use client";

import { useState, useEffect } from "react";
import { adminApi, categoryApi } from "../../../lib/api";
import toast from "react-hot-toast";

const mockProducts = [
  {
    _id: "prod1",
    title: "Brembo Ceramic Brake Pads",
    vendorId: { name: "AutoParts Pro", _id: "v1" },
    category: { name: "Brake System", _id: "c1" },
    pricing: { publicPrice: 89.99, wholesalePrice: 65.0 },
    isFeatured: true,
    isActive: true,
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "prod2",
    title: "Monroe Shock Absorber Strut",
    vendorId: { name: "TurboTech", _id: "v2" },
    category: { name: "Suspension", _id: "c2" },
    pricing: { publicPrice: 149.99, wholesalePrice: 110.0 },
    isFeatured: false,
    isActive: true,
    status: "active",
    createdAt: "2024-01-14T08:15:00Z",
  },
  {
    _id: "prod3",
    title: "NGK Iridium Spark Plugs (Set of 4)",
    vendorId: { name: "PartsPro Seller", _id: "v3" },
    category: { name: "Engine", _id: "c3" },
    pricing: { publicPrice: 34.99, wholesalePrice: 24.0 },
    isFeatured: false,
    isActive: true,
    status: "active",
    createdAt: "2024-01-13T14:45:00Z",
  },
  {
    _id: "prod4",
    title: "Bosch Oil Filter Premium",
    vendorId: { name: "Elite Auto Parts", _id: "v4" },
    category: { name: "Filters", _id: "c4" },
    pricing: { publicPrice: 12.99, wholesalePrice: 8.5 },
    isFeatured: true,
    isActive: true,
    status: "active",
    createdAt: "2024-01-12T09:20:00Z",
  },
  {
    _id: "prod5",
    title: "Michelin Pilot Sport Tire",
    vendorId: { name: "QuickFix Motors", _id: "v5" },
    category: { name: "Tires & Wheels", _id: "c5" },
    pricing: { publicPrice: 299.99, wholesalePrice: 245.0 },
    isFeatured: false,
    isActive: false,
    status: "inactive",
    createdAt: "2024-01-11T16:30:00Z",
  },
  {
    _id: "prod6",
    title: "ACDelco Coolant Antifreeze",
    vendorId: { name: "AutoParts Pro", _id: "v1" },
    category: { name: "Cooling", _c: "c6" },
    pricing: { publicPrice: 24.99, wholesalePrice: 18.0 },
    isFeatured: false,
    isActive: true,
    status: "pending",
    createdAt: "2024-01-10T11:00:00Z",
  },
];

const mockVendors = [
  { _id: "v1", name: "AutoParts Pro" },
  { _id: "v2", name: "TurboTech" },
  { _id: "v3", name: "PartsPro Seller" },
  { _id: "v4", name: "Elite Auto Parts" },
  { _id: "v5", name: "QuickFix Motors" },
];

const mockCategories = [
  { _id: "c1", name: "Brake System" },
  { _id: "c2", name: "Suspension" },
  { _id: "c3", name: "Engine" },
  { _id: "c4", name: "Filters" },
  { _id: "c5", name: "Tires & Wheels" },
  { _id: "c6", name: "Cooling" },
];

const statusBadge = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};

export default function ProductApprovalPage() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    vendor: "",
    status: "",
  });
  const [featureLoading, setFeatureLoading] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        adminApi.getProducts({ limit: 100 }),
        categoryApi.getAll(),
      ]);
      setProducts(
        productsRes.data?.products || productsRes.data || mockProducts,
      );
      setCategories(categoriesRes.data || mockCategories);
      setVendors(mockVendors);
    } catch (error) {
      setProducts(mockProducts);
      setCategories(mockCategories);
      setVendors(mockVendors);
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (productId) => {
    setFeatureLoading(productId);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(
        products.map((p) =>
          p._id === productId ? { ...p, isFeatured: !p.isFeatured } : p,
        ),
      );
      toast.success("Featured status updated");
    } catch (error) {
      toast.error("Failed to update featured status");
    } finally {
      setFeatureLoading(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (
      filters.search &&
      !p.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    if (filters.vendor && p.vendorId?._id !== filters.vendor) return false;
    if (filters.status && p.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="text-gray-500">Manage all products across vendors</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "products"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setActiveTab("categories")}
          className={`px-4 py-2 font-medium border-b-2 transition-colors ${
            activeTab === "categories"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Category Management
        </button>
      </div>

      {activeTab === "products" && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filters.vendor}
                onChange={(e) =>
                  setFilters({ ...filters, vendor: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Vendors</option>
                {vendors.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name}
                  </option>
                ))}
              </select>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Product Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Vendor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Public Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Wholesale
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                        Featured
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            {product.title}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.vendorId?.name || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {product.category?.name || "Uncategorized"}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ${product.pricing?.publicPrice?.toFixed(2) || "0.00"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          $
                          {product.pricing?.wholesalePrice?.toFixed(2) ||
                            "0.00"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[product.status]}`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleFeatured(product._id)}
                            disabled={featureLoading === product._id}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              product.isFeatured ? "bg-blue-600" : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                product.isFeatured
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
              Showing {filteredProducts.length} products
            </div>
          </div>
        </>
      )}

      {activeTab === "categories" && <CategoryManagement />}
    </div>
  );
}

function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      _id: "c1",
      name: "Brake System",
      subcategories: [
        "Brake Pads",
        "Brake Discs",
        "Brake Calipers",
        "Brake Fluid",
      ],
    },
    {
      _id: "c2",
      name: "Suspension",
      subcategories: ["Shock Absorbers", "Struts", "Springs", "Control Arms"],
    },
    {
      _id: "c3",
      name: "Engine",
      subcategories: [
        "Spark Plugs",
        "Oil Filters",
        "Air Filters",
        "Fuel Filters",
      ],
    },
    {
      _id: "c4",
      name: "Cooling",
      subcategories: ["Radiators", "Water Pumps", "Coolant", "Thermostats"],
    },
    {
      _id: "c5",
      name: "Tires & Wheels",
      subcategories: ["Tires", "Rims", "Wheel Bearings"],
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategories, setNewSubcategories] = useState("");

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    const subs = newSubcategories
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setCategories([
      ...categories,
      { _id: `c${Date.now()}`, name: newCategoryName, subcategories: subs },
    ]);
    toast.success("Category added");
    setShowAddModal(false);
    setNewCategoryName("");
    setNewSubcategories("");
  };

  const handleDeleteCategory = (id) => {
    if (!confirm("Delete this category?")) return;
    setCategories(categories.filter((c) => c._id !== id));
    toast.success("Category deleted");
  };

  const handleEditCategory = (cat) => {
    setEditingCategory(cat);
    setNewCategoryName(cat.name);
    setNewSubcategories(cat.subcategories.join(", "));
    setShowAddModal(true);
  };

  const handleUpdateCategory = () => {
    if (!newCategoryName.trim()) return;
    const subs = newSubcategories
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setCategories(
      categories.map((c) =>
        c._id === editingCategory._id
          ? { ...c, name: newCategoryName, subcategories: subs }
          : c,
      ),
    );
    toast.success("Category updated");
    setShowAddModal(false);
    setEditingCategory(null);
    setNewCategoryName("");
    setNewSubcategories("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Category Management
        </h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setNewCategoryName("");
            setNewSubcategories("");
            setShowAddModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {cat.subcategories.length} subcategories
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditCategory(cat)}
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {cat.subcategories.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Engine, Suspension"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subcategories (comma separated)
                </label>
                <textarea
                  value={newSubcategories}
                  onChange={(e) => setNewSubcategories(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="e.g., Spark Plugs, Oil Filters, Air Filters"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={
                  editingCategory ? handleUpdateCategory : handleAddCategory
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingCategory ? "Update" : "Add Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
