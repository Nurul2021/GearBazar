"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";
import { formatRole, getRoleBadgeColor } from "../../../lib/rbac";

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "seller", label: "Seller" },
  { value: "garage", label: "Garage" },
  { value: "customer", label: "Customer" },
];

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "pending", label: "Pending" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({ role: "", status: "", search: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, [pagination.page, filters.role, filters.status]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.role && { role: filters.role }),
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      };
      const { data } = await adminApi.getUsers(params);
      setUsers(data.users || data);
      setPagination((prev) => ({ ...prev, total: data.total || users.length }));
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (userId, action, data = {}) => {
    setActionLoading(true);
    try {
      if (action === "delete") {
        if (!confirm("Are you sure you want to delete this user?")) return;
        await adminApi.deleteUser(userId);
      } else if (action === "suspend") {
        await adminApi.updateUser(userId, {
          isActive: false,
          suspensionReason: data.reason,
        });
      } else if (action === "activate") {
        await adminApi.updateUser(userId, { isActive: true });
      } else if (action === "verify") {
        await adminApi.updateUser(userId, { isVerified: true });
      } else if (action === "updateRole") {
        await adminApi.updateUser(userId, { role: data.role });
      }
      loadUsers();
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Action failed:", error);
      alert(error.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    loadUsers();
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={loadUsers}
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
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="flex-1 min-w-48 px-3 py-2 border rounded"
            />
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="px-3 py-2 border rounded"
            >
              {roleOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
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
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Verified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Joined
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
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${getRoleBadgeColor(user.role)}`}
                    >
                      {formatRole(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        user.isActive === false
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.isActive === false ? "Suspended" : "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.isVerified ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-yellow-600">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {!user.isVerified && (
                        <button
                          onClick={() => handleAction(user._id, "verify")}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          Verify
                        </button>
                      )}
                      {user.isActive !== false ? (
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction(user._id, "activate")}
                          className="text-green-600 hover:underline text-sm"
                        >
                          Activate
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
          { length: Math.ceil(pagination.total / pagination.limit) },
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
            <h2 className="text-lg font-bold mb-4">Suspend User</h2>
            <p className="mb-4">
              Are you sure you want to suspend {selectedUser?.name}?
            </p>
            <textarea
              placeholder="Reason for suspension (optional)"
              className="w-full px-3 py-2 border rounded mb-4"
              rows={3}
              id="suspendReason"
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
                  handleAction(selectedUser._id, "suspend", {
                    reason: document.getElementById("suspendReason").value,
                  })
                }
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {actionLoading ? "Loading..." : "Suspend"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
