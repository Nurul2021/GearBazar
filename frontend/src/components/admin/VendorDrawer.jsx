"use client";

import { useState } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  FileText,
  Camera,
  IdCard,
  Store,
  ToggleLeft,
  ToggleRight,
  Edit3,
  Ban,
  ZoomIn,
} from "lucide-react";
import ImageZoom from "@/components/ui/ImageZoom";

const documents = [
  { id: 1, name: "Trade License", type: "trade_license", icon: FileText },
  { id: 2, name: "NID Front", type: "nid_front", icon: IdCard },
  { id: 3, name: "NID Back", type: "nid_back", icon: IdCard },
  { id: 4, name: "Shop Photo", type: "shop_photo", icon: Camera },
];

const documentImages = {
  trade_license:
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
  nid_front:
    "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80",
  nid_back:
    "https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&q=80",
  shop_photo:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
};

export default function VendorDrawer({
  vendor,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onTogglePayment,
  onBlock,
}) {
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [paymentActive, setPaymentActive] = useState(
    vendor?.paymentStatus === "Paid",
  );
  const [zoomImage, setZoomImage] = useState(null);

  if (!isOpen || !vendor) return null;

  const handleApprove = () => {
    onApprove?.(vendor.id);
  };

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject?.(vendor.id, rejectReason);
      setShowRejectReason(false);
      setRejectReason("");
    }
  };

  const handleTogglePayment = () => {
    const newStatus = !paymentActive;
    setPaymentActive(newStatus);
    onTogglePayment?.(vendor.id, newStatus ? "Paid" : "Unpaid");
  };

  const handleBlock = () => {
    onBlock?.(vendor.id);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 z-[70] h-full w-full max-w-2xl bg-white shadow-2xl overflow-y-auto"
        style={{ zIndex: 70 }}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Vendor Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <Store className="w-8 h-8 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900">
                {vendor.shopName}
              </h3>
              <p className="text-slate-600">{vendor.ownerName}</p>
              <div className="flex items-center gap-2 mt-2">
                <StatusBadge status={vendor.businessType} type="business" />
                <StatusBadge status={vendor.accountStatus} type="account" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InfoCard label="Contact" value={vendor.contact} />
            <InfoCard label="Email" value={vendor.email} />
            <InfoCard
              label="Registration Date"
              value={vendor.registrationDate}
            />
            <InfoCard
              label="Payment Status"
              value={vendor.paymentStatus}
              isStatus
            />
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-900">
                Manual Payment Activation
              </h4>
              <button
                onClick={handleTogglePayment}
                className="flex items-center gap-2 text-sm font-medium"
              >
                {paymentActive ? (
                  <>
                    <ToggleRight className="w-8 h-8 text-green-500" />
                    <span className="text-green-600">Active</span>
                  </>
                ) : (
                  <>
                    <ToggleLeft className="w-8 h-8 text-slate-400" />
                    <span className="text-slate-500">Inactive</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Toggle after verifying offline payment (bKash/Bank Transfer)
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-3">
              Document Verification
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="relative group border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-colors"
                >
                  <div className="aspect-[4/3] bg-slate-100 relative">
                    <img
                      src={documentImages[doc.type]}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setZoomImage(documentImages[doc.type])}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ZoomIn className="w-8 h-8 text-white" />
                    </button>
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <doc.icon className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 truncate">
                      {doc.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showRejectReason ? (
            <div className="bg-red-50 rounded-xl p-4 border border-red-200 space-y-3">
              <h4 className="font-semibold text-red-900">Rejection Reason</h4>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select a reason...</option>
                <option value="Document blurry">Document blurry</option>
                <option value="License expired">License expired</option>
                <option value="Document incomplete">Document incomplete</option>
                <option value="Information mismatch">
                  Information mismatch
                </option>
                <option value="Document not readable">
                  Document not readable
                </option>
              </select>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Or type custom reason..."
                className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px] resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim()}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Rejection
                </button>
                <button
                  onClick={() => setShowRejectReason(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
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
                Approve Documents
              </button>
              <button
                onClick={() => setShowRejectReason(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Reject Documents
              </button>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Edit3 className="w-4 h-4" />
              Edit Vendor
            </button>
            <button
              onClick={handleBlock}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <Ban className="w-4 h-4" />
              Block / Suspend
            </button>
          </div>
        </div>
      </div>

      <ImageZoom
        src={zoomImage}
        alt="Document Preview"
        isOpen={!!zoomImage}
        onClose={() => setZoomImage(null)}
      />
    </>
  );
}

function InfoCard({ label, value, isStatus }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      {isStatus ? (
        <StatusBadge status={value} type="payment" />
      ) : (
        <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
      )}
    </div>
  );
}

function StatusBadge({ status, type }) {
  const styles = {
    business: {
      Garage: "bg-blue-100 text-blue-700 border-blue-200",
      Shop: "bg-purple-100 text-purple-700 border-purple-200",
    },
    account: {
      Verified: "bg-green-100 text-green-700 border-green-200",
      Pending: "bg-amber-100 text-amber-700 border-amber-200",
      Suspended: "bg-red-100 text-red-700 border-red-200",
    },
    payment: {
      Paid: "bg-green-100 text-green-700 border-green-200",
      Unpaid: "bg-red-100 text-red-700 border-red-200",
    },
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[type]?.[status] || "bg-slate-100 text-slate-700 border-slate-200"}`}
    >
      {status}
    </span>
  );
}
