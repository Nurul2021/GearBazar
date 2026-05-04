"use client";

import { useState } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Building2,
  Smartphone,
} from "lucide-react";

const paymentMethods = {
  bKash: { label: "bKash", number: "01712-345678", icon: "📱" },
  Bank: {
    label: "Bank Transfer",
    number: "A/C: 1234567890 (ABC Bank)",
    icon: "🏦",
  },
  Cash: { label: "Cash", number: "In-Person", icon: "💵" },
};

export default function PaymentVerificationModal({
  payment,
  isOpen,
  onClose,
  onApprove,
  onReject,
}) {
  const [confirmDate, setConfirmDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [expiryDate, setExpiryDate] = useState(
    new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0],
  );
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (!isOpen || !payment) return null;

  const method = paymentMethods[payment.method] || paymentMethods.bKash;

  const handleApprove = () => {
    onApprove?.(payment.id, { confirmDate, expiryDate });
  };

  const handleReject = () => {
    const reason = rejectReason === "Other" ? customReason : rejectReason;
    if (reason.trim()) {
      onReject?.(payment.id, reason);
      setShowReject(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-[70] w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-lg font-bold text-slate-900">Verify Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">
              Payment Details
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={<Building2 className="w-4 h-4" />}
                label="Vendor"
                value={payment.vendorName}
              />
              <InfoRow
                icon={<DollarSign className="w-4 h-4" />}
                label="Amount"
                value={`৳${payment.amount.toLocaleString()}`}
              />
              <InfoRow
                icon={<Smartphone className="w-4 h-4" />}
                label="Method"
                value={`${method.icon} ${method.label}`}
              />
              <InfoRow
                icon={<Calendar className="w-4 h-4" />}
                label="TrxID / Reference"
                value={payment.trxId}
                isMono
              />
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-1">Send To</p>
                <p className="text-sm font-medium text-slate-700">
                  {method.number}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Confirmation Date
              </label>
              <input
                type="date"
                value={confirmDate}
                onChange={(e) => setConfirmDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                Expiry Date
              </label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-xs text-slate-400 mt-1">
                Vendor access expires on this date
              </p>
            </div>
          </div>

          {showReject ? (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200 space-y-3">
              <h4 className="font-semibold text-red-900">Reject Payment</h4>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select reason...</option>
                <option value="Wrong TrxID">Wrong TrxID</option>
                <option value="Amount Mismatch">Amount Mismatch</option>
                <option value="Payment not received">
                  Payment not received
                </option>
                <option value="Invalid reference">Invalid reference</option>
                <option value="Duplicate payment">Duplicate payment</option>
                <option value="Other">Other (specify below)</option>
              </select>
              {(rejectReason === "Other" || customReason) && (
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
                  onClick={handleReject}
                  disabled={
                    !rejectReason ||
                    (rejectReason === "Other" && !customReason.trim())
                  }
                  className="px-4 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Rejection
                </button>
                <button
                  onClick={() => setShowReject(false)}
                  className="px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-5 h-5" />
                Approve & Activate
              </button>
              <button
                onClick={() => setShowReject(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, isMono }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-slate-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p
          className={`text-sm font-medium text-slate-900 ${isMono ? "font-mono" : ""}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
