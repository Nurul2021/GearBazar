"use client";

import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  Search,
  Filter,
  Download,
  Eye,
  ChevronDown,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  PackageCheck,
  Loader2,
} from "lucide-react";
import {
  useVendorOrders,
  useUpdateVendorOrderStatus,
  useCancelOrder,
} from "@/hooks/queries/useOrders";
import { selectCurrentUser } from "@/features/auth/authSlice";

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-700",
    icon: Clock,
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle,
  },
  {
    value: "shipped",
    label: "Shipped",
    color: "bg-purple-100 text-purple-700",
    icon: Truck,
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: PackageCheck,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
];

const statusFlow = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["shipped", "cancelled"],
  shipped: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
};

function getStatusConfig(status) {
  return statusOptions.find((s) => s.value === status) || statusOptions[0];
}

export default function OrdersTable() {
  const user = useSelector(selectCurrentUser);
  const vendorId = user?._id || user?.id;

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: ordersData,
    isLoading,
    error,
  } = useVendorOrders(vendorId, {
    status: activeTab !== "all" ? activeTab : undefined,
  });

  const updateStatus = useUpdateVendorOrderStatus();
  const cancelOrder = useCancelOrder();

  const orders = ordersData?.data || ordersData?.orders || ordersData || [];

  const demoOrders = [
    {
      _id: "demo-1",
      orderNumber: "ORD-001",
      orderStatus: "pending",
      createdAt: new Date().toISOString(),
      totalPrice: 459.99,
      customer: { name: "John Doe", email: "john@example.com" },
      shippingAddress: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
      },
      orderItems: [
        {
          product: { title: "Brembo Premium Brake Caliper", images: [] },
          quantity: 2,
          price: 189.99,
          subtotal: 379.98,
        },
      ],
    },
    {
      _id: "demo-2",
      orderNumber: "ORD-002",
      orderStatus: "confirmed",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      totalPrice: 259.98,
      customer: { name: "Jane Smith", email: "jane@example.com" },
      shippingAddress: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1987654321",
        street: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
      },
      orderItems: [
        {
          product: { title: "Monroe Shock Absorber Set", images: [] },
          quantity: 2,
          price: 129.99,
          subtotal: 259.98,
        },
      ],
    },
    {
      _id: "demo-3",
      orderNumber: "ORD-003",
      orderStatus: "pending",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      totalPrice: 189.5,
      customer: { name: "Mike Johnson", email: "mike@example.com" },
      shippingAddress: {
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1555555555",
        street: "789 Pine Rd",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
      },
      orderItems: [
        {
          product: { title: "Bosch Spark Plugs Set", images: [] },
          quantity: 4,
          price: 47.37,
          subtotal: 189.5,
        },
      ],
    },
    {
      _id: "demo-4",
      orderNumber: "ORD-004",
      orderStatus: "shipped",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      totalPrice: 349.99,
      customer: { name: "Sarah Wilson", email: "sarah@example.com" },
      shippingAddress: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+1444444444",
        street: "321 Elm St",
        city: "Houston",
        state: "TX",
        zipCode: "77001",
      },
      orderItems: [
        {
          product: { title: "K&N Air Filter", images: [] },
          quantity: 1,
          price: 349.99,
          subtotal: 349.99,
        },
      ],
    },
    {
      _id: "demo-5",
      orderNumber: "ORD-005",
      orderStatus: "delivered",
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      totalPrice: 599.0,
      customer: { name: "Tom Brown", email: "tom@example.com" },
      shippingAddress: {
        name: "Tom Brown",
        email: "tom@example.com",
        phone: "+1666666666",
        street: "654 Maple Ave",
        city: "Phoenix",
        state: "AZ",
        zipCode: "85001",
      },
      orderItems: [
        {
          product: { title: "Performance Exhaust System", images: [] },
          quantity: 1,
          price: 599.0,
          subtotal: 599.0,
        },
      ],
    },
    {
      _id: "demo-6",
      orderNumber: "ORD-006",
      orderStatus: "cancelled",
      createdAt: new Date(Date.now() - 518400000).toISOString(),
      totalPrice: 129.99,
      customer: { name: "Lisa Green", email: "lisa@example.com" },
      shippingAddress: {
        name: "Lisa Green",
        email: "lisa@example.com",
        phone: "+1777777777",
        street: "987 Cedar Ln",
        city: "Philadelphia",
        state: "PA",
        zipCode: "19101",
      },
      orderItems: [
        {
          product: { title: "WD-40 Specialist", images: [] },
          quantity: 3,
          price: 43.33,
          subtotal: 129.99,
        },
      ],
    },
  ];

  const displayOrders =
    orders.length > 0 ? orders : isLoading || error ? demoOrders : demoOrders;

  const filteredOrders = displayOrders.filter((order) => {
    const orderNumber = order.orderNumber || order.orderId || order._id || "";
    const customerName =
      order.customer?.name || order.shippingAddress?.name || "";
    const matchesSearch =
      orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      customerName.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "all" || order.orderStatus === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === "cancelled") {
      cancelOrder.mutate(
        { orderId },
        {
          onError: () => {},
        },
      );
    } else {
      updateStatus.mutate(
        { orderId, status: newStatus, vendorId },
        {
          onError: () => {},
        },
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
    }).format(price || 0);
  };

  const getAvailableTransitions = (currentStatus) => {
    return statusFlow[currentStatus] || [];
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-slate-500">Loading orders...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <Package className="w-12 h-12 mx-auto text-slate-300 mb-4" />
        <p className="text-slate-500">Unable to load orders</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
          <p className="text-slate-500">Manage and track customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 border-b border-gray-100">
          {[
            "all",
            "pending",
            "confirmed",
            "shipped",
            "delivered",
            "cancelled",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-red-600 border-red-600"
                  : "text-slate-500 border-transparent hover:text-slate-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab !== "all" && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
                  {displayOrders.filter((o) => o.orderStatus === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Customer
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Amount
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0
                ? filteredOrders.map((order) => {
                    const orderId = order._id || order.orderId;
                    const statusConfig = getStatusConfig(order.orderStatus);
                    const StatusIcon = statusConfig.icon;
                    const availableTransitions = getAvailableTransitions(
                      order.orderStatus,
                    );
                    const isUpdating =
                      updateStatus.variables?.orderId === orderId;

                    return (
                      <tr key={orderId} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="font-medium text-red-600 hover:text-red-700"
                          >
                            {order.orderNumber || orderId}
                          </button>
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-medium text-slate-900">
                              {order.customer?.name ||
                                order.shippingAddress?.name ||
                                "N/A"}
                            </p>
                            <p className="text-sm text-slate-500">
                              {order.customer?.email ||
                                order.shippingAddress?.email ||
                                ""}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {formatDate(order.createdAt || order.orderDate)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-medium text-slate-900">
                            {formatPrice(order.totalPrice || order.totalAmount)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="relative">
                            <select
                              value={order.orderStatus}
                              onChange={(e) =>
                                handleStatusChange(orderId, e.target.value)
                              }
                              disabled={
                                isUpdating || availableTransitions.length === 0
                              }
                              className={`appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium cursor-pointer ${statusConfig.color} border-0 focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {statusOptions
                                .filter(
                                  (opt) =>
                                    availableTransitions.includes(opt.value) ||
                                    opt.value === order.orderStatus,
                                )
                                .map((status) => (
                                  <option
                                    key={status.value}
                                    value={status.value}
                                  >
                                    {status.label}
                                  </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-slate-400" />
                            {isUpdating && (
                              <Loader2 className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-slate-400" />
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No orders found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing {filteredOrders.length} of {orders.length} orders
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
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedOrder.orderNumber || selectedOrder._id}
                </h2>
                <p className="text-sm text-slate-500">
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                  Ordered Items
                </h3>
                <div className="space-y-3">
                  {(selectedOrder.orderItems || selectedOrder.items || []).map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-14 h-14 bg-white rounded-lg overflow-hidden">
                          {item.product?.images?.[0] || item.image ? (
                            <Image
                              src={item.product?.images?.[0] || item.image}
                              alt={
                                item.product?.title || item.name || "Product"
                              }
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                              <Package className="w-6 h-6 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {item.product?.title || item.name || "Product"}
                          </p>
                          <p className="text-sm text-slate-500">
                            Qty: {item.quantity || item.qty}
                          </p>
                        </div>
                        <p className="font-medium text-slate-900">
                          {formatPrice(item.price || item.subtotal)}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                  Customer Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-900">
                      {selectedOrder.customer?.name ||
                        selectedOrder.shippingAddress?.name ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-900">
                      {selectedOrder.customer?.email ||
                        selectedOrder.shippingAddress?.email ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-900">
                      {selectedOrder.shippingAddress?.phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-3">
                  Shipping Address
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-slate-900">
                        {selectedOrder.shippingAddress?.street || "N/A"}
                      </p>
                      <p className="text-slate-600">
                        {selectedOrder.shippingAddress?.city},{" "}
                        {selectedOrder.shippingAddress?.state}{" "}
                        {selectedOrder.shippingAddress?.zipCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl">
                <span className="text-white font-medium">Total Amount</span>
                <span className="text-xl font-bold text-white">
                  {formatPrice(
                    selectedOrder.totalPrice || selectedOrder.totalAmount,
                  )}
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-gray-100 flex items-center justify-between gap-3">
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition-colors">
                <Download className="w-5 h-5" />
                Download Packing Slip
              </button>
              <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors">
                Print Label
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
