"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Printer,
  Store,
  User,
  MapPin,
  MessageSquare,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Circle,
  ChevronRight,
  CreditCard,
  Wallet,
  Banknote,
  Star,
  AlertTriangle,
  Calendar,
  Hash,
  FileText,
} from "lucide-react";

const orderData = {
  orderId: "#PO-9921",
  orderDate: "2026-05-01",
  status: "Processing",
  vendor: {
    shopName: "AutoParts Pro Warehouse",
    contactPerson: "John Mitchell",
    location: "123 Industrial Blvd, Detroit, MI",
    phone: "+1 (555) 123-4567",
  },
  timeline: [
    { label: "Order Placed", date: "May 1, 2026 - 09:30 AM", completed: true },
    {
      label: "Payment Confirmed",
      date: "May 1, 2026 - 09:32 AM",
      completed: true,
    },
    { label: "Packed", date: "May 2, 2026 - 02:15 PM", completed: false },
    { label: "Out for Delivery", date: "", completed: false },
    { label: "Delivered", date: "", completed: false },
  ],
  items: [
    {
      id: 1,
      name: "Brake Pad Set - Ceramic",
      sku: "BP-9981-CER",
      price: 45.99,
      quantity: 4,
      image:
        "https://images.unsplash.com/photo-1600661653566-083882650f26?w=100",
    },
    {
      id: 2,
      name: "Oil Filter - High Performance",
      sku: "OF-4421-HP",
      price: 12.99,
      quantity: 10,
      image:
        "https://images.unsplash.com/photo-1607613009820-a29f7b558ae2?w=100",
    },
    {
      id: 3,
      name: "Spark Plugs - Iridium",
      sku: "SP-2210-IR",
      price: 8.99,
      quantity: 8,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100",
    },
  ],
  pricing: {
    subtotal: 419.78,
    platformFee: 12.59,
    shipping: 15.0,
    grandTotal: 447.37,
  },
  paymentMethod: "Wallet",
  shippingAddress: {
    garageName: "Mike's Garage & Auto Repair",
    address: "456 Mechanics Ave, Suite 12",
    city: "Detroit, MI 48201",
    estimatedDelivery: "May 5, 2026",
  },
};

const statusColors = {
  Processing: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Shipped: "bg-blue-100 text-blue-800 border-blue-300",
  Delivered: "bg-green-100 text-green-800 border-green-300",
  Cancelled: "bg-red-100 text-red-800 border-red-300",
};

const paymentIcons = {
  Wallet: Wallet,
  "Bank Transfer": Banknote,
  "Cash on Delivery": CreditCard,
};

export default function PurchaseOrderDetailsPage({ params }) {
  const [order] = useState(orderData);
  const PaymentIcon = paymentIcons[order.paymentMethod] || Wallet;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard/purchases"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Purchases
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-900">
                {order.orderId}
              </h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
                  statusColors[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Printer className="w-4 h-4" />
              Print Invoice
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Ordered on{" "}
            {new Date(order.orderDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Store className="w-5 h-5 text-slate-500" />
                Vendor Information
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <Store className="w-4 h-4 text-slate-400" />
                    {order.vendor.shopName}
                  </p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    {order.vendor.contactPerson}
                  </p>
                  <p className="text-sm text-slate-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {order.vendor.location}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800">
                  <MessageSquare className="w-4 h-4" />
                  Message Seller
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-500" />
                Order Tracking
              </h2>
              <div className="flex flex-col gap-0">
                {order.timeline.map((step, index) => (
                  <div
                    key={step.label}
                    className="relative flex items-start gap-4 pb-8 last:pb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                          step.completed
                            ? "bg-green-500 border-green-500 text-white"
                            : "bg-white border-slate-300 text-slate-400"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </div>
                      {index < order.timeline.length - 1 && (
                        <div
                          className={`absolute top-8 left-4 w-0.5 h-[calc(100%-16px)] ${
                            step.completed ? "bg-green-500" : "bg-slate-200"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p
                        className={`font-medium ${
                          step.completed ? "text-slate-900" : "text-slate-400"
                        }`}
                      >
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-sm text-slate-500 mt-0.5">
                          <Clock className="w-3.5 h-3.5 inline mr-1" />
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-6 pb-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-slate-500" />
                  Order Items
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-t border-b border-slate-200 bg-slate-50">
                      <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                        Product
                      </th>
                      <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                        SKU
                      </th>
                      <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                        Price
                      </th>
                      <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                        Qty
                      </th>
                      <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {order.items.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <span className="font-medium text-slate-900 text-sm">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          <Hash className="w-3.5 h-3.5 inline mr-1" />
                          {item.sku}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 text-right">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 text-right">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-slate-500" />
                Shipping Address
              </h2>
              <div className="space-y-1">
                <p className="font-medium text-slate-900">
                  {order.shippingAddress.garageName}
                </p>
                <p className="text-sm text-slate-600">
                  {order.shippingAddress.address}
                </p>
                <p className="text-sm text-slate-600">
                  {order.shippingAddress.city}
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Estimated Delivery:{" "}
                  <span className="font-medium text-slate-900">
                    {order.shippingAddress.estimatedDelivery}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-500" />
                Price Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ${order.pricing.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Platform Fee</span>
                  <span className="font-medium text-slate-900">
                    ${order.pricing.platformFee.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Shipping</span>
                  <span className="font-medium text-slate-900">
                    ${order.pricing.shipping.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between">
                  <span className="font-semibold text-slate-900">
                    Grand Total
                  </span>
                  <span className="font-bold text-lg text-slate-900">
                    ${order.pricing.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-slate-500" />
                Payment Details
              </h2>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <PaymentIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 text-sm">
                    {order.paymentMethod}
                  </p>
                  <p className="text-xs text-slate-500">Paid</p>
                </div>
              </div>
            </div>

            {order.status === "Delivered" && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">
                  Post-Purchase Actions
                </h2>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
                  <Star className="w-4 h-4" />
                  Rate this Transaction
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
                  <AlertTriangle className="w-4 h-4" />
                  Report an Issue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
