"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [featureLoading, setFeatureLoading] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [pagination.page]);

  useEffect(() => {
    loadProducts();
  }, [filters.status, filters.category]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.category && { category: filters.category }),
      };
      const { data } = await adminApi.getProducts(params);
      setProducts(data.products || data);
      setPagination((prev) => ({
        ...prev,
        total: data.total || products.length,
      }));
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const { data } = await fetch("/api/categories").then((r) => r.json());
      setCategories(data);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const handleAction = async (productId, action, data = {}) => {
    setActionLoading(true);
    try {
      if (action === "delete") {
        if (!confirm("Are you sure you want to delete this product?")) return;
        await fetch(`/api/admin/products/${productId}`, { method: "DELETE" });
      } else if (action === "approve") {
        await fetch(`/api/admin/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "active" }),
        });
      } else if (action === "reject") {
        await fetch(`/api/admin/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "rejected",
            rejectionReason: data.reason,
          }),
        });
      } else if (action === "feature") {
        setFeatureLoading(productId);
        const isFeatured = products.find(
          (p) => p._id === productId,
        )?.isFeatured;
        await fetch(`/api/admin/products/${productId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFeatured: !isFeatured }),
        });
        setFeatureLoading(null);
      }
      loadProducts();
      setShowModal(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Action failed:", error);
      alert(error.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts();
  };

  const getStatusBadge = (product) => {
    if (product.status === "active") {
      return (
        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
          Active
        </span>
      );
    }
    if (product.status === "rejected") {
      return (
        <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">
          Rejected
        </span>
      );
    }
    if (product.isFeatured) {
      return (
        <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
          Featured
        </span>
      );
    }
    return (
      <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
        Pending
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <button
          onClick={loadProducts}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="flex-1 min-w-48 px-3 py-2 border rounded"
            />
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="px-3 py-2 border rounded"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Seller
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-6 py-4">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-full" />
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">No img</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.category?.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">{product.sellerId?.name}</p>
                    <p className="text-xs text-gray-500">
                      {product.sellerId?.email}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-xs text-gray-500 line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className={product.stock === 0 ? "text-red-600" : ""}>
                      {product.stock}
                    </p>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(product)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(product._id, "feature")}
                        disabled={featureLoading === product._id}
                        className="text-yellow-600 hover:underline text-sm"
                      >
                        {featureLoading === product._id
                          ? "..."
                          : product.isFeatured
                            ? "Unfeature"
                            : "Feature"}
                      </button>
                      {product.status !== "active" && (
                        <button
                          onClick={() => handleAction(product._id, "approve")}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Approve
                        </button>
                      )}
                      {product.status === "pending" && (
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowModal(true);
                          }}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from(
          { length: Math.ceil(pagination.total / pagination.limit) || 1 },
          (_, i) => (
            <button
              key={i}
              onClick={() => setPagination({ ...pagination, page: i + 1 })}
              className={`px-3 py-1 rounded ${
                pagination.page === i + 1
                  ? "bg-gray-800 text-white"
                  : "bg-white border"
              }`}
            >
              {i + 1}
            </button>
          ),
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Reject Product</h2>
            <p className="mb-4">
              Are you sure you want to reject "{selectedProduct?.name}"?
            </p>
            <textarea
              placeholder="Reason for rejection (optional)"
              className="w-full px-3 py-2 border rounded mb-4"
              rows={3}
              id="rejectReason"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleAction(selectedProduct._id, "reject", {
                    reason: document.getElementById("rejectReason").value,
                  })
                }
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {actionLoading ? "Loading..." : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
