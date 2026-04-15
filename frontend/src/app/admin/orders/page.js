"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";
import toast from "react-hot-toast";

const mockOrders = [
  {
    _id: "ord1",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+8801712345678",
    },
    vendor: { name: "AutoParts Pro", _id: "v1" },
    items: [{ title: "Brembo Brake Pads", quantity: 2, price: 89.99 }],
    total: 179.98,
    paymentStatus: "paid",
    paymentMethod: "bKash",
    transactionId: "BK123456789",
    status: "delivered",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "ord2",
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Sarah Islam",
      email: "sarah@example.com",
      phone: "+8801912345678",
    },
    vendor: { name: "TurboTech", _id: "v2" },
    items: [{ title: "Monroe Shock Absorber", quantity: 1, price: 149.99 }],
    total: 149.99,
    paymentStatus: "paid",
    paymentMethod: "Nagad",
    transactionId: "NG987654321",
    status: "shipped",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    _id: "ord3",
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+8801812345678",
    },
    vendor: { name: "PartsPro Seller", _id: "v3" },
    items: [
      { title: "NGK Spark Plugs", quantity: 4, price: 34.99 },
      { title: "Bosch Oil Filter", quantity: 2, price: 12.99 },
    ],
    total: 163.94,
    paymentStatus: "unpaid",
    paymentMethod: "Cash on Delivery",
    transactionId: null,
    status: "pending",
    createdAt: "2024-01-13T09:15:00Z",
  },
  {
    _id: "ord4",
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Ali Ahmed",
      email: "ali@example.com",
      phone: "+8801512345678",
    },
    vendor: { name: "Elite Auto Parts", _id: "v4" },
    items: [{ title: "Michelin Tire", quantity: 2, price: 299.99 }],
    total: 599.98,
    paymentStatus: "paid",
    paymentMethod: "bKash",
    transactionId: "BK456789123",
    status: "processing",
    createdAt: "2024-01-12T16:45:00Z",
  },
  {
    _id: "ord5",
    orderNumber: "ORD-2024-005",
    customer: {
      name: "Emma Johnson",
      email: "emma@example.com",
      phone: "+8801612345678",
    },
    vendor: { name: "QuickFix Motors", _id: "v5" },
    items: [{ title: "ACDelco Coolant", quantity: 3, price: 24.99 }],
    total: 74.97,
    paymentStatus: "paid",
    paymentMethod: "Nagad",
    transactionId: "NG789123456",
    status: "cancelled",
    createdAt: "2024-01-11T11:30:00Z",
  },
  {
    _id: "ord6",
    orderNumber: "ORD-2024-006",
    customer: {
      name: "Rahim Khan",
      email: "rahim@example.com",
      phone: "+8801412345678",
    },
    vendor: { name: "AutoParts Pro", _id: "v1" },
    items: [{ title: "Brembo Brake Disc", quantity: 1, price: 120.0 }],
    total: 120.0,
    paymentStatus: "paid",
    paymentMethod: "bKash",
    transactionId: "BK321654987",
    status: "delivered",
    createdAt: "2024-01-10T08:00:00Z",
  },
];

const statusBadge = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentBadge = {
  paid: "bg-green-100 text-green-800",
  unpaid: "bg-red-100 text-red-800",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    paymentStatus: "",
    dateFrom: "",
    dateTo: "",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getOrders({ limit: 100 });
      setOrders(data?.orders || data || mockOrders);
    } catch (error) {
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusOverride = async (orderId) => {
    if (!newStatus) return;
    setActionLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setOrders(
        orders.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o,
        ),
      );
      toast.success("Order status updated");
      setShowModal(false);
      setSelectedOrder(null);
      setNewStatus("");
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  const openTransactionModal = (order) => {
    setSelectedTransaction(order);
    setShowTransactionModal(true);
  };

  const filteredOrders = orders.filter((order) => {
    if (
      filters.search &&
      !order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) &&
      !order.customer?.name
        ?.toLowerCase()
        .includes(filters.search.toLowerCase())
    )
      return false;
    if (filters.status && order.status !== filters.status) return false;
    if (filters.paymentStatus && order.paymentStatus !== filters.paymentStatus)
      return false;
    if (
      filters.dateFrom &&
      new Date(order.createdAt) < new Date(filters.dateFrom)
    )
      return false;
    if (filters.dateTo && new Date(order.createdAt) > new Date(filters.dateTo))
      return false;
    return true;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTotalSales = () => {
    return filteredOrders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.total, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Monitoring</h1>
          <p className="text-gray-500">Track and manage all platform orders</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Sales</p>
            <p className="text-xl font-bold text-green-600">
              ${getTotalSales().toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={filters.paymentStatus}
            onChange={(e) =>
              setFilters({ ...filters, paymentStatus: e.target.value })
            }
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters({ ...filters, dateFrom: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <span className="flex items-center text-gray-500">to</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters({ ...filters, dateTo: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Vendor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {order.orderNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {order.customer?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.customer?.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.vendor?.name}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${paymentBadge[order.paymentStatus]}`}
                        >
                          {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {order.paymentStatus === "paid" && (
                          <button
                            onClick={() => openTransactionModal(order)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            View Transaction
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setNewStatus(order.status);
                            setShowModal(true);
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-300"
                        >
                          Override Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Showing {filteredOrders.length} orders
          </span>
        </div>
      </div>

      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowTransactionModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Transaction Details
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Order</p>
                <p className="font-semibold">
                  {selectedTransaction.orderNumber}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Payment Method</p>
                  <p className="font-semibold">
                    {selectedTransaction.paymentMethod}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Transaction ID</p>
                  <p className="font-semibold font-mono">
                    {selectedTransaction.transactionId}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Customer Phone</p>
                <p className="font-semibold">
                  {selectedTransaction.customer?.phone}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600">Amount Paid</p>
                <p className="text-xl font-bold text-green-600">
                  ${selectedTransaction.total.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTransactionModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Override Order Status
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>Warning:</strong> Manually overriding order status may
                affect analytics and reporting.
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <p className="font-semibold">{selectedOrder.orderNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusOverride(selectedOrder._id)}
                disabled={actionLoading || newStatus === selectedOrder.status}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoading ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
