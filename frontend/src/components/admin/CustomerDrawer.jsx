"use client";

import { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  DollarSign,
  Clock,
  Ban,
  Edit3,
  Key,
  ExternalLink,
  CheckCircle,
  XCircle,
  Truck,
  Package,
} from "lucide-react";

const orderStatusStyles = {
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Processing: "bg-blue-100 text-blue-700 border-blue-200",
  Shipped: "bg-purple-100 text-purple-700 border-purple-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
};

const orderStatusIcons = {
  Delivered: CheckCircle,
  Processing: Package,
  Shipped: Truck,
  Cancelled: XCircle,
  Pending: Clock,
};

export default function CustomerDrawer({
  customer,
  isOpen,
  onClose,
  onBlock,
  onEdit,
  onResetPassword,
}) {
  const [showBlockReason, setShowBlockReason] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (!isOpen || !customer) return null;

  const handleBlock = () => {
    const reason = blockReason === "Other" ? customReason : blockReason;
    if (reason.trim()) {
      onBlock?.(customer.id, reason);
      setShowBlockReason(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-[70] h-full w-full max-w-2xl bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Customer Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-indigo-600">
                {customer.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900">
                {customer.name}
              </h3>
              <p className="text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-4 h-4" />
                {customer.email}
              </p>
              <p className="text-slate-600 flex items-center gap-1.5 mt-0.5">
                <Phone className="w-4 h-4" />
                {customer.phone}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                customer.status === "Active"
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : customer.status === "Blocked"
                    ? "bg-red-100 text-red-700 border-red-200"
                    : "bg-slate-100 text-slate-700 border-slate-200"
              }`}
            >
              {customer.status === "Active" ? (
                <CheckCircle className="w-3 h-3" />
              ) : customer.status === "Blocked" ? (
                <XCircle className="w-3 h-3" />
              ) : (
                <Clock className="w-3 h-3" />
              )}
              {customer.status}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <MiniStat
              icon={<DollarSign className="w-4 h-4" />}
              label="Total Spend"
              value={`৳${customer.totalSpend?.toLocaleString() || 0}`}
              color="emerald"
            />
            <MiniStat
              icon={<Clock className="w-4 h-4" />}
              label="Last Login"
              value={customer.lastLogin || "N/A"}
              color="blue"
            />
            <MiniStat
              icon={<MapPin className="w-4 h-4" />}
              label="Address"
              value={customer.address || "Not set"}
              color="purple"
              isAddress
            />
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-slate-500" />
              Order History
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">
                      Order ID
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-semibold text-slate-500 uppercase">
                      Date
                    </th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500 uppercase">
                      Amount
                    </th>
                    <th className="text-right px-4 py-2 text-xs font-semibold text-slate-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(customer.orders || []).map((order) => {
                    const Icon = orderStatusIcons[order.status] || Clock;
                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-2.5">
                          <span className="font-mono text-xs font-medium text-indigo-600">
                            {order.id}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-slate-600">
                          {order.date}
                        </td>
                        <td className="px-4 py-2.5 text-right font-medium text-slate-900">
                          ৳{order.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${orderStatusStyles[order.status]}`}
                          >
                            <Icon className="w-3 h-3" />
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {(!customer.orders || customer.orders.length === 0) && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-slate-400 text-sm"
                      >
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => onEdit?.(customer)}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => onResetPassword?.(customer)}
              className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Key className="w-4 h-4" />
              Reset Password
            </button>
          </div>

          {showBlockReason ? (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200 space-y-3">
              <h4 className="font-semibold text-red-900 flex items-center gap-2">
                <Ban className="w-4 h-4" />
                Block Customer
              </h4>
              <select
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select reason...</option>
                <option value="Suspicious activity">Suspicious activity</option>
                <option value="Fake account">Fake account</option>
                <option value="Fraudulent orders">Fraudulent orders</option>
                <option value="Violated terms of service">
                  Violated terms of service
                </option>
                <option value="Other">Other (specify below)</option>
              </select>
              {(blockReason === "Other" || customReason) && (
                <input
                  type="text"
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  placeholder="Enter reason..."
                  className="w-full px-3 py-2.5 bg-white border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleBlock}
                  disabled={
                    !blockReason ||
                    (blockReason === "Other" && !customReason.trim())
                  }
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Confirm Block
                </button>
                <button
                  onClick={() => {
                    setShowBlockReason(false);
                    setBlockReason("");
                    setCustomReason("");
                  }}
                  className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowBlockReason(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <Ban className="w-4 h-4" />
              Block User
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function MiniStat({ icon, label, value, color, isAddress }) {
  const colors = {
    emerald: "text-emerald-600 bg-emerald-50",
    blue: "text-blue-600 bg-blue-50",
    purple: "text-purple-600 bg-purple-50",
  };

  return (
    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
      <div className="flex items-center gap-1.5 text-slate-500 mb-1">
        <span className={`${colors[color]} p-1 rounded`}>{icon}</span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p
        className={`text-sm font-semibold text-slate-900 ${isAddress ? "truncate" : ""}`}
        title={isAddress ? value : ""}
      >
        {value}
      </p>
    </div>
  );
}
