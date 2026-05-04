"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Truck,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Printer,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  User,
  Store,
  Calendar,
  Hash,
  ArrowRight,
  Circle,
  Check,
  X,
  FileText,
  QrCode,
} from "lucide-react";
import Image from "next/image";

const mockOrders = [
  {
    id: "ORD-001",
    date: "2026-05-12",
    buyerName: "Rahim Ahmed",
    buyerType: "Customer",
    buyerPhone: "+880 1712-345678",
    buyerAddress: "House 12, Road 5, Dhanmondi, Dhaka-1205",
    sellerName: "AutoCare Garage",
    sellerType: "Garage",
    sellerAddress: "45/1, Naya Paltan, Dhaka",
    totalAmount: 12500,
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    items: [
      {
        name: "Disc Brake Pad Set",
        sku: "BRK-001",
        qty: 2,
        price: 5000,
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&q=80",
      },
      {
        name: "Brake Fluid 500ml",
        sku: "BRF-002",
        qty: 1,
        price: 2500,
        image:
          "https://images.unsplash.com/photo-1635864431048-8b8eeefe3a31?w=100&q=80",
      },
    ],
    paymentMethod: "bKash",
    trxId: "BK9C2P8L4",
    vat: 500,
    shippingFee: 1500,
    orderDate: "2026-05-12 14:30",
    packedDate: "2026-05-13 10:15",
    shippedDate: "2026-05-13 16:00",
    deliveredDate: "2026-05-15 11:30",
  },
  {
    id: "ORD-002",
    date: "2026-05-13",
    buyerName: "Sarah Khan",
    buyerType: "Customer",
    buyerPhone: "+880 1819-876543",
    buyerAddress: "Flat 4B, Plot 7, Gulshan 2, Dhaka-1212",
    sellerName: "Prime Auto Parts",
    sellerType: "Shop",
    sellerAddress: "78, Mirpur Road, Dhaka",
    totalAmount: 32000,
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
    items: [
      {
        name: "Engine Oil 5W-30",
        sku: "OIL-002",
        qty: 4,
        price: 3200,
        image:
          "https://images.unsplash.com/photo-1635864431048-8b8eeefe3a31?w=100&q=80",
      },
      {
        name: "Oil Filter",
        sku: "OFL-003",
        qty: 2,
        price: 1800,
        image:
          "https://images.unsplash.com/photo-1605559424843-947ed4710b1a?w=100&q=80",
      },
    ],
    paymentMethod: "Bank Transfer",
    trxId: "BN7X3K9M2",
    vat: 0,
    shippingFee: 2000,
    orderDate: "2026-05-13 09:15",
    packedDate: "2026-05-14 11:00",
    shippedDate: "2026-05-14 17:30",
    deliveredDate: null,
  },
  {
    id: "ORD-003",
    date: "2026-05-14",
    buyerName: "Tanvir Hasan",
    buyerType: "Garage",
    buyerPhone: "+880 1912-111222",
    buyerAddress: "123/A, Mirpur 10, Dhaka-1216",
    sellerName: "Dhaka Car Service",
    sellerType: "Garage",
    sellerAddress: "56, Old Airport Road, Dhaka",
    totalAmount: 8500,
    paymentStatus: "Unpaid",
    fulfillmentStatus: "Pending",
    items: [
      {
        name: "Headlight Assembly",
        sku: "HDT-003",
        qty: 1,
        price: 8500,
        image:
          "https://images.unsplash.com/photo-1621996070411-5e5d6c2d5c36?w=100&q=80",
      },
    ],
    paymentMethod: "Cash on Delivery",
    trxId: "-",
    vat: 0,
    shippingFee: 0,
    orderDate: "2026-05-14 16:45",
    packedDate: null,
    shippedDate: null,
    deliveredDate: null,
  },
  {
    id: "ORD-004",
    date: "2026-05-15",
    buyerName: "Nusrat Jahan",
    buyerType: "Customer",
    buyerPhone: "+880 1611-333444",
    buyerAddress: "House 45, Road 12, Banani, Dhaka-1213",
    sellerName: "Speedy Spares",
    sellerType: "Shop",
    sellerAddress: "23, Banani Road 11, Dhaka",
    totalAmount: 15600,
    paymentStatus: "Paid",
    fulfillmentStatus: "Processing",
    items: [
      {
        name: "Shock Absorber Pair",
        sku: "SHK-005",
        qty: 1,
        price: 15600,
        image:
          "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=100&q=80",
      },
    ],
    paymentMethod: "bKash",
    trxId: "BN2L5W9P3",
    vat: 600,
    shippingFee: 1500,
    orderDate: "2026-05-15 11:20",
    packedDate: "2026-05-16 09:30",
    shippedDate: null,
    deliveredDate: null,
  },
  {
    id: "ORD-005",
    date: "2026-05-16",
    buyerName: "Kamal Uddin",
    buyerType: "Customer",
    buyerPhone: "+880 1515-555666",
    buyerAddress: "Plot 34, Uttara Sector 7, Dhaka-1230",
    sellerName: "GearMax Workshop",
    sellerType: "Garage",
    sellerAddress: "89, Uttara Sector 4, Dhaka",
    totalAmount: 3400,
    paymentStatus: "Paid",
    fulfillmentStatus: "Cancelled",
    items: [
      {
        name: "Air Filter Element",
        sku: "AIR-004",
        qty: 1,
        price: 3400,
        image:
          "https://images.unsplash.com/photo-1605559424843-947ed4710b1a?w=100&q=80",
      },
    ],
    paymentMethod: "bKash",
    trxId: "INVALID123",
    vat: 0,
    shippingFee: 0,
    orderDate: "2026-05-16 08:00",
    packedDate: null,
    shippedDate: null,
    deliveredDate: null,
    cancelReason: "Wrong item ordered by customer",
  },
];

const sellers = ["All", ...new Set(mockOrders.map((o) => o.sellerName))];
const statuses = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];
const buyerTypes = ["All", "Customer", "Garage"];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeller, setSelectedSeller] = useState("All");
  const [selectedBuyerType, setSelectedBuyerType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [customCancelReason, setCustomCancelReason] = useState("");
  const [manualTrxId, setManualTrxId] = useState("");

  const ORDERS_PER_PAGE = 10;

  const filteredOrders = useMemo(() => {
    let result = [...mockOrders];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.buyerName.toLowerCase().includes(q) ||
          o.sellerName.toLowerCase().includes(q),
      );
    }
    if (selectedSeller !== "All")
      result = result.filter((o) => o.sellerName === selectedSeller);
    if (selectedBuyerType !== "All")
      result = result.filter((o) => o.buyerType === selectedBuyerType);
    if (selectedStatus !== "All")
      result = result.filter((o) => o.fulfillmentStatus === selectedStatus);
    if (dateRange.start)
      result = result.filter((o) => o.date >= dateRange.start);
    if (dateRange.end) result = result.filter((o) => o.date <= dateRange.end);
    return result;
  }, [
    searchQuery,
    selectedSeller,
    selectedBuyerType,
    selectedStatus,
    dateRange,
  ]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE,
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedOrder(null), 300);
  };

  const handleStatusChange = (orderId, newStatus) => {
    mockOrders.forEach((o) => {
      if (o.id === orderId) o.fulfillmentStatus = newStatus;
    });
    if (selectedOrder?.id === orderId)
      setSelectedOrder({ ...selectedOrder, fulfillmentStatus: newStatus });
  };

  const handlePaymentConfirm = (orderId, trxId) => {
    mockOrders.forEach((o) => {
      if (o.id === orderId) {
        o.paymentStatus = "Paid";
        o.trxId = trxId;
      }
    });
    if (selectedOrder?.id === orderId)
      setSelectedOrder({ ...selectedOrder, paymentStatus: "Paid", trxId });
  };

  const handleCancelOrder = () => {
    const reason = cancelReason === "Other" ? customCancelReason : cancelReason;
    if (!reason.trim()) return;
    mockOrders.forEach((o) => {
      if (o.id === selectedOrder.id) {
        o.fulfillmentStatus = "Cancelled";
        o.cancelReason = reason;
      }
    });
    setSelectedOrder({
      ...selectedOrder,
      fulfillmentStatus: "Cancelled",
      cancelReason: reason,
    });
    setShowCancelModal(false);
    setCancelReason("");
    setCustomCancelReason("");
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Order Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and manage all marketplace orders
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Buyer, or Seller..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <select
                value={selectedSeller}
                onChange={(e) => {
                  setSelectedSeller(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-4 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {sellers.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Sellers" : s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedBuyerType}
                onChange={(e) => {
                  setSelectedBuyerType(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-4 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {buyerTypes.map((t) => (
                  <option key={t} value={t}>
                    {t === "All" ? "All Buyer Types" : t}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-4 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === "All" ? "All Statuses" : s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, start: e.target.value }))
              }
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-slate-400">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, end: e.target.value }))
              }
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Buyer
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Seller
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500 font-medium">
                      No orders found
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-indigo-600">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 text-sm">
                        {order.buyerName}
                      </p>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${order.buyerType === "Garage" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                      >
                        {order.buyerType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-700">
                        {order.sellerName}
                      </p>
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${order.sellerType === "Garage" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
                      >
                        {order.sellerType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      ৳{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <PaymentBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={order.fulfillmentStatus} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowInvoice(true);
                          }}
                          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View Invoice"
                        >
                          <Printer className="w-4 h-4 text-slate-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Showing {(currentPage - 1) * ORDERS_PER_PAGE + 1}-
            {Math.min(currentPage * ORDERS_PER_PAGE, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </p>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPage === page ? "bg-indigo-600 text-white" : "hover:bg-slate-100 text-slate-600"}`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {drawerOpen && selectedOrder && (
        <OrderDrawer
          order={selectedOrder}
          onClose={handleCloseDrawer}
          onStatusChange={handleStatusChange}
          onPaymentConfirm={handlePaymentConfirm}
          onCancelOrder={() => setShowCancelModal(true)}
          manualTrxId={manualTrxId}
          setManualTrxId={setManualTrxId}
        />
      )}

      {showInvoice && selectedOrder && (
        <InvoiceModal
          order={selectedOrder}
          onClose={() => setShowInvoice(false)}
        />
      )}

      {showCancelModal && (
        <CancelModal
          order={selectedOrder}
          reason={cancelReason}
          setReason={setCancelReason}
          customReason={customCancelReason}
          setCustomReason={setCustomCancelReason}
          onConfirm={handleCancelOrder}
          onClose={() => {
            setShowCancelModal(false);
            setCancelReason("");
            setCustomCancelReason("");
          }}
        />
      )}
    </div>
  );
}

function PaymentBadge({ status }) {
  const styles = {
    Paid: "bg-green-100 text-green-700 border-green-200",
    Unpaid: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      {status === "Paid" ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <XCircle className="w-3 h-3" />
      )}
      {status}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Processing: "bg-blue-100 text-blue-700 border-blue-200",
    Shipped: "bg-purple-100 text-purple-700 border-purple-200",
    Delivered: "bg-green-100 text-green-700 border-green-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
  };
  const icons = {
    Pending: Clock,
    Processing: Package,
    Shipped: Truck,
    Delivered: CheckCircle,
    Cancelled: XCircle,
  };
  const Icon = icons[status] || Clock;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

function OrderDrawer({
  order,
  onClose,
  onStatusChange,
  onPaymentConfirm,
  onCancelOrder,
  manualTrxId,
  setManualTrxId,
}) {
  if (!order) return null;
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const grandTotal = subtotal + (order.vat || 0) + (order.shippingFee || 0);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-[70] h-full w-full max-w-2xl bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Order {order.id}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" /> Buyer Info
              </h3>
              <p className="font-medium text-slate-900">{order.buyerName}</p>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${order.buyerType === "Garage" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
              >
                {order.buyerType}
              </span>
              <p className="text-sm text-slate-600 flex items-center gap-1 mt-2">
                <Phone className="w-3.5 h-3.5" /> {order.buyerPhone}
              </p>
              <p className="text-sm text-slate-600 flex items-start gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />{" "}
                {order.buyerAddress}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Store className="w-4 h-4 text-indigo-600" /> Seller Info
              </h3>
              <p className="font-medium text-slate-900">{order.sellerName}</p>
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${order.sellerType === "Garage" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`}
              >
                {order.sellerType}
              </span>
              <p className="text-sm text-slate-600 flex items-start gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />{" "}
                {order.sellerAddress}
              </p>
            </div>
          </div>

          {/* Product Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600" /> Items Ordered
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 p-4 ${idx < order.items.length - 1 ? "border-b border-slate-200" : ""}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 text-sm truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {item.sku}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600">x{item.qty}</p>
                  <p className="text-sm font-semibold text-slate-900 w-24 text-right">
                    ৳{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="bg-slate-50 px-4 py-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                {order.vat > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">VAT/Tax</span>
                    <span className="font-medium">
                      ৳{order.vat.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping Fee</span>
                  <span className="font-medium">
                    ৳{order.shippingFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span>৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-600" /> Order Timeline
            </h3>
            <div className="space-y-4">
              <TimelineStep
                icon={CheckCircle}
                color="green"
                title="Order Placed"
                time={order.orderDate}
                active
              />
              <TimelineStep
                icon={Package}
                color="blue"
                title="Packed"
                time={order.packedDate}
                active={!!order.packedDate}
              />
              <TimelineStep
                icon={Truck}
                color="purple"
                title="Shipped"
                time={order.shippedDate}
                active={!!order.shippedDate}
              />
              <TimelineStep
                icon={CheckCircle}
                color="green"
                title="Delivered"
                time={order.deliveredDate}
                active={!!order.deliveredDate}
              />
              {order.fulfillmentStatus === "Cancelled" && (
                <TimelineStep
                  icon={XCircle}
                  color="red"
                  title="Cancelled"
                  time={order.orderDate}
                  active
                  subtitle={order.cancelReason}
                />
              )}
            </div>
          </div>

          {/* Admin Controls */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Admin Controls
            </h3>

            <div>
              <label className="text-xs font-medium text-slate-500 uppercase mb-2 block">
                Override Status
              </label>
              <div className="flex gap-2 flex-wrap">
                {statuses
                  .filter((s) => s !== "All")
                  .map((s) => (
                    <button
                      key={s}
                      onClick={() => onStatusChange(order.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        order.fulfillmentStatus === s
                          ? s === "Cancelled"
                            ? "bg-red-500 text-white border-red-500"
                            : s === "Delivered"
                              ? "bg-green-500 text-white border-green-500"
                              : s === "Shipped"
                                ? "bg-purple-500 text-white border-purple-500"
                                : s === "Processing"
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "bg-amber-500 text-white border-amber-500"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
              </div>
            </div>

            {order.paymentStatus === "Unpaid" && (
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <label className="text-xs font-medium text-slate-500 uppercase mb-2 block">
                  Manual Payment Confirmation
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualTrxId}
                    onChange={(e) => setManualTrxId(e.target.value)}
                    placeholder="Enter TrxID or Bank Ref..."
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() =>
                      onPaymentConfirm(
                        order.id,
                        manualTrxId || "MANUAL-" + Date.now(),
                      )
                    }
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}

            {order.fulfillmentStatus !== "Cancelled" &&
              order.fulfillmentStatus !== "Delivered" && (
                <button
                  onClick={onCancelOrder}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Cancel Order
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
}

function TimelineStep({ icon: Icon, color, title, time, active, subtitle }) {
  return (
    <div className={`flex items-start gap-3 ${active ? "" : "opacity-40"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          color === "green"
            ? "bg-green-100 text-green-600"
            : color === "blue"
              ? "bg-blue-100 text-blue-600"
              : color === "purple"
                ? "bg-purple-100 text-purple-600"
                : "bg-red-100 text-red-600"
        }`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="font-medium text-sm text-slate-900">{title}</p>
        {subtitle && <p className="text-xs text-red-600">{subtitle}</p>}
        <p className="text-xs text-slate-500">{time || "Pending..."}</p>
      </div>
    </div>
  );
}

function InvoiceModal({ order, onClose }) {
  if (!order) return null;
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const grandTotal = subtotal + (order.vat || 0) + (order.shippingFee || 0);

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-[70] h-full w-full max-w-2xl bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            Invoice - {order.id}
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 hover:bg-slate-100 rounded-lg"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-8" id="invoice-content">
          {/* Invoice Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">
                  GearBazar
                </span>
              </div>
              <p className="text-sm text-slate-600">
                Admin Office: 123, Kazi Nazrul Islam Avenue
              </p>
              <p className="text-sm text-slate-600">Dhaka-1215, Bangladesh</p>
              <p className="text-sm text-slate-600">support@gearbazar.com</p>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-bold text-slate-900">INVOICE</h3>
              <p className="text-sm text-slate-600 font-mono">{order.id}</p>
              <p className="text-sm text-slate-500">
                Date:{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </p>
            </div>
          </div>

          {/* Bill To / Ship From */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Bill To
              </h4>
              <p className="font-semibold text-slate-900">{order.buyerName}</p>
              <p className="text-sm text-slate-600">{order.buyerAddress}</p>
              <p className="text-sm text-slate-600">{order.buyerPhone}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Ship From
              </h4>
              <p className="font-semibold text-slate-900">{order.sellerName}</p>
              <p className="text-sm text-slate-600">{order.sellerAddress}</p>
              <p className="text-sm text-slate-600">
                Payment: {order.paymentMethod} ({order.paymentStatus})
              </p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                  Item
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                  SKU
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                  Qty
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                  Unit Price
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-slate-100 overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500 font-mono">
                    {item.sku}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 text-center">
                    x{item.qty}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900 text-right">
                    ৳{item.price.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-slate-900 text-right">
                    ৳{(item.price * item.qty).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              {order.vat > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">VAT/Tax</span>
                  <span>৳{order.vat.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping Fee</span>
                <span>৳{order.shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span>৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* QR Code & Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Thank you for your business!
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Questions? Contact support@gearbazar.com or call +880
                1234-567890
              </p>
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <QrCode className="w-10 h-10 text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CancelModal({
  order,
  reason,
  setReason,
  customReason,
  setCustomReason,
  onConfirm,
  onClose,
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" /> Cancel Order {order?.id}
        </h3>
        <div className="space-y-3">
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select cancellation reason...</option>
            <option value="Customer requested cancellation">
              Customer requested cancellation
            </option>
            <option value="Item out of stock">Item out of stock</option>
            <option value="Payment verification failed">
              Payment verification failed
            </option>
            <option value="Suspicious order">Suspicious order</option>
            <option value="Other">Other (specify below)</option>
          </select>
          {reason === "Other" && (
            <input
              type="text"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Enter reason..."
              className="w-full px-4 py-2.5 border border-red-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
            />
          )}
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onConfirm}
            disabled={!reason || (reason === "Other" && !customReason.trim())}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Confirm Cancellation
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
