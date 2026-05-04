"use client";

import { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  Search,
  Eye,
  Truck,
  PackageCheck,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingBag,
  Store,
  ArrowRight,
  FileText,
  Loader2,
  Package2,
} from "lucide-react";
import { selectCurrentUser } from "@/features/auth/authSlice";

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-orange-100 text-orange-700",
    icon: Clock,
    filterGroup: "to_receive",
  },
  shipped: {
    label: "In Transit",
    color: "bg-blue-100 text-blue-700",
    icon: Truck,
    filterGroup: "to_receive",
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: PackageCheck,
    filterGroup: "completed",
  },
  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
    filterGroup: "completed",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
    filterGroup: "cancelled",
  },
};

const filterPills = [
  { value: "all", label: "All" },
  { value: "to_receive", label: "To Receive" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

function getStatusBadge(status) {
  return statusConfig[status] || statusConfig.pending;
}

export default function PurchasesTable() {
  const user = useSelector(selectCurrentUser);
  const vendorId = user?._id || user?.id;

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const demoPurchases = [
    {
      _id: "PO-001",
      orderNumber: "PO-001",
      orderStatus: "shipped",
      createdAt: new Date().toISOString(),
      totalPrice: 1250.0,
      vendor: { name: "AutoParts Pro", shopName: "AutoParts Pro" },
      items: [
        {
          product: { title: "Engine Oil Filter", images: [] },
          quantity: 10,
          price: 25.0,
        },
        {
          product: { title: "Brake Pads", images: [] },
          quantity: 4,
          price: 150.0,
        },
        {
          product: { title: "Spark Plugs", images: [] },
          quantity: 4,
          price: 100.0,
        },
      ],
    },
    {
      _id: "PO-002",
      orderNumber: "PO-002",
      orderStatus: "delivered",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      totalPrice: 899.99,
      vendor: { name: "GearHead Supplies", shopName: "GearHead Supplies" },
      items: [
        {
          product: { title: "Monroe Shock Absorber Set", images: [] },
          quantity: 2,
          price: 449.99,
        },
      ],
    },
    {
      _id: "PO-003",
      orderNumber: "PO-003",
      orderStatus: "pending",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      totalPrice: 349.99,
      vendor: { name: "FilterMax Inc", shopName: "FilterMax Inc" },
      items: [
        {
          product: { title: "K&N Air Filter", images: [] },
          quantity: 1,
          price: 349.99,
        },
        {
          product: { title: "Cabin Air Filter", images: [] },
          quantity: 2,
          price: 49.99,
        },
      ],
    },
    {
      _id: "PO-004",
      orderNumber: "PO-004",
      orderStatus: "cancelled",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      totalPrice: 599.0,
      vendor: { name: "Performance Auto", shopName: "Performance Auto" },
      items: [
        {
          product: { title: "Performance Exhaust System", images: [] },
          quantity: 1,
          price: 599.0,
        },
      ],
    },
    {
      _id: "PO-005",
      orderNumber: "PO-005",
      orderStatus: "delivered",
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      totalPrice: 189.5,
      vendor: { name: "SparkPlug World", shopName: "SparkPlug World" },
      items: [
        {
          product: { title: "Bosch Spark Plugs Set", images: [] },
          quantity: 4,
          price: 47.37,
        },
        {
          product: { title: "Ignition Coil", images: [] },
          quantity: 1,
          price: 89.0,
        },
      ],
    },
  ];

  const displayPurchases = demoPurchases;

  const filteredPurchases = displayPurchases.filter((purchase) => {
    const orderNumber = purchase.orderNumber || purchase._id || "";
    const vendorName = purchase.vendor?.shopName || purchase.vendor?.name || "";
    const matchesSearch =
      orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      vendorName.toLowerCase().includes(search.toLowerCase());

    const statusInfo = getStatusBadge(purchase.orderStatus);
    const matchesFilter =
      activeFilter === "all" || statusInfo.filterGroup === activeFilter;

    return matchesSearch && matchesFilter;
  });

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Purchases
            <span className="ml-2 text-base font-normal text-slate-500">
              ({filteredPurchases.length})
            </span>
          </h1>
          <p className="text-slate-500">Track your purchases and expenses</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID or Shop Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          {filterPills.map((pill) => (
            <button
              key={pill.value}
              onClick={() => setActiveFilter(pill.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeFilter === pill.value
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-slate-600 hover:bg-gray-200"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {filteredPurchases.length > 0 ? (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                    Order Info
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                    Vendor
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                    Product Snippet
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                    Total Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase">
                    Quick Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPurchases.map((purchase) => {
                  const statusInfo = getStatusBadge(purchase.orderStatus);
                  const StatusIcon = statusInfo.icon;
                  const primaryItem = purchase.items?.[0];
                  const remainingCount = (purchase.items?.length || 0) - 1;

                  return (
                    <tr key={purchase._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <p className="font-medium text-red-600">
                          {purchase.orderNumber || purchase._id}
                        </p>
                        <p className="text-sm text-slate-500">
                          {formatDate(purchase.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-slate-400" />
                          <span className="font-medium text-slate-900">
                            {purchase.vendor?.shopName ||
                              purchase.vendor?.name ||
                              "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {primaryItem?.product?.images?.[0] ? (
                              <Image
                                src={primaryItem.product.images[0]}
                                alt={primaryItem.product.title}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package2 className="w-5 h-5 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">
                              {primaryItem?.product?.title || "Product"}
                            </p>
                            {remainingCount > 0 && (
                              <p className="text-xs text-slate-500">
                                + {remainingCount} more item
                                {remainingCount > 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="font-medium text-slate-900">
                          {formatPrice(purchase.totalPrice)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="View Invoice"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Track Order"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredPurchases.map((purchase) => {
              const statusInfo = getStatusBadge(purchase.orderStatus);
              const StatusIcon = statusInfo.icon;
              const primaryItem = purchase.items?.[0];
              const remainingCount = (purchase.items?.length || 0) - 1;

              return (
                <div
                  key={purchase._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-600">
                        {purchase.orderNumber || purchase._id}
                      </p>
                      <p className="text-sm text-slate-500">
                        {formatDate(purchase.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      {purchase.vendor?.shopName ||
                        purchase.vendor?.name ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {primaryItem?.product?.images?.[0] ? (
                        <Image
                          src={primaryItem.product.images[0]}
                          alt={primaryItem.product.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package2 className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 text-sm">
                        {primaryItem?.product?.title || "Product"}
                      </p>
                      {remainingCount > 0 && (
                        <p className="text-xs text-slate-500">
                          + {remainingCount} more item
                          {remainingCount > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="font-semibold text-slate-900">
                      {formatPrice(purchase.totalPrice)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="View Invoice"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Track Order"
                      >
                        <Truck className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No purchases yet
          </h3>
          <p className="text-slate-500 mb-6">
            You haven't purchased any items from other vendors yet.
          </p>
          <button
            onClick={() => (window.location.href = "/marketplace")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
          >
            <Store className="w-5 h-5" />
            Go to Marketplace
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
