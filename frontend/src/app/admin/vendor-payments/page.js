"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Store,
  Building2,
  Smartphone,
  Wallet,
  ChevronDown,
  Eye,
  Plus,
} from "lucide-react";
import PaymentVerificationModal from "@/components/admin/PaymentVerificationModal";

const mockPayments = [
  {
    id: 1,
    vendorName: "AutoCare Garage",
    shopType: "Garage",
    trxId: "BK9C2P8L4",
    amount: 12000,
    method: "bKash",
    paymentDate: "2026-05-01",
    expiryDate: "2027-05-01",
    status: "Verified",
  },
  {
    id: 2,
    vendorName: "Prime Auto Parts",
    shopType: "Shop",
    trxId: "BN7X3K9M2",
    amount: 8500,
    method: "Bank",
    paymentDate: "2026-05-02",
    expiryDate: "2027-05-02",
    status: "Verified",
  },
  {
    id: 3,
    vendorName: "Dhaka Car Service",
    shopType: "Garage",
    trxId: "BK4R8T1Q6",
    amount: 12000,
    method: "bKash",
    paymentDate: "2026-05-03",
    expiryDate: null,
    status: "Pending",
  },
  {
    id: 4,
    vendorName: "Speedy Spares",
    shopType: "Shop",
    trxId: "BN2L5W9P3",
    amount: 8500,
    method: "Bank",
    paymentDate: "2026-05-03",
    expiryDate: null,
    status: "Pending",
  },
  {
    id: 5,
    vendorName: "GearMax Workshop",
    shopType: "Garage",
    trxId: "CS8D4F1K7",
    amount: 12000,
    method: "Cash",
    paymentDate: "2025-11-15",
    expiryDate: "2026-05-15",
    status: "Verified",
  },
  {
    id: 6,
    vendorName: "MotorHub Store",
    shopType: "Shop",
    trxId: "BK3M7N2R9",
    amount: 8500,
    method: "bKash",
    paymentDate: "2026-04-20",
    expiryDate: "2027-04-20",
    status: "Verified",
  },
  {
    id: 7,
    vendorName: "AutoZone BD",
    shopType: "Shop",
    trxId: "INVALID123",
    amount: 8500,
    method: "bKash",
    paymentDate: "2026-05-04",
    expiryDate: null,
    status: "Rejected",
  },
  {
    id: 8,
    vendorName: "ProMechanic Garage",
    shopType: "Garage",
    trxId: "BN9K2P4L8",
    amount: 12000,
    method: "Bank",
    paymentDate: "2025-06-01",
    expiryDate: "2026-06-01",
    status: "Verified",
  },
];

const vendors = [
  {
    id: "v1",
    shopName: "AutoCare Garage",
    ownerName: "Mohammad Rahman",
    type: "Garage",
  },
  {
    id: "v2",
    shopName: "Prime Auto Parts",
    ownerName: "Fatima Khan",
    type: "Shop",
  },
  {
    id: "v3",
    shopName: "Dhaka Car Service",
    ownerName: "Kamal Hossain",
    type: "Garage",
  },
  {
    id: "v4",
    shopName: "Speedy Spares",
    ownerName: "Nusrat Jahan",
    type: "Shop",
  },
  {
    id: "v5",
    shopName: "GearMax Workshop",
    ownerName: "Arif Ahmed",
    type: "Garage",
  },
  {
    id: "v6",
    shopName: "MotorHub Store",
    ownerName: "Sabrina Ali",
    type: "Shop",
  },
  {
    id: "v7",
    shopName: "AutoZone BD",
    ownerName: "Tanvir Hasan",
    type: "Shop",
  },
  {
    id: "v8",
    shopName: "ProMechanic Garage",
    ownerName: "Rafiq Islam",
    type: "Garage",
  },
];

const paymentMethods = [
  { value: "All", label: "All Methods", icon: Wallet },
  { value: "bKash", label: "bKash", icon: Smartphone },
  { value: "Bank", label: "Bank Transfer", icon: Building2 },
  { value: "Cash", label: "Cash", icon: DollarSign },
];

function AddPaymentModal({
  isOpen,
  onClose,
  form,
  setForm,
  vendors,
  onSubmit,
  errors,
}) {
  if (!isOpen) return null;
  const filteredVendors = vendors.filter((v) =>
    v.shopName.toLowerCase().includes(form.vendorSearch.toLowerCase()),
  );

  const handleVendorSelect = (vendor) => {
    setForm((prev) => ({
      ...prev,
      vendorId: vendor.id,
      vendorName: vendor.shopName,
      vendorType: vendor.type,
      vendorSearch: "",
    }));
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 right-0 z-[70] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              Add Manual Payment
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="p-6 space-y-5"
          >
            {/* Vendor Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Vendor <span className="text-red-500">*</span>
              </label>
              {form.vendorId ? (
                <div
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      vendorId: "",
                      vendorName: "",
                      vendorType: "",
                    }))
                  }
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl cursor-pointer flex items-center gap-3 hover:border-slate-300"
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${form.vendorType === "Garage" ? "bg-blue-100" : "bg-purple-100"}`}
                  >
                    <Store
                      className={`w-5 h-5 ${form.vendorType === "Garage" ? "text-blue-600" : "text-purple-600"}`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-900">
                      {form.vendorName}
                    </p>
                    <p className="text-sm text-slate-500">{form.vendorType}</p>
                  </div>
                  <span className="text-xs text-slate-400">
                    Click to change
                  </span>
                </div>
              ) : (
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={form.vendorSearch}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          vendorSearch: e.target.value,
                        }))
                      }
                      placeholder="Search vendors by name..."
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  {form.vendorSearch && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                      {filteredVendors.map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleVendorSelect(v)}
                          className="w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors flex items-center gap-3 border-b border-slate-50 last:border-0"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${v.type === "Garage" ? "bg-blue-100" : "bg-purple-100"}`}
                          >
                            <Store
                              className={`w-4 h-4 ${v.type === "Garage" ? "text-blue-600" : "text-purple-600"}`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-slate-900">
                              {v.shopName}
                            </p>
                            <p className="text-xs text-slate-500">
                              {v.ownerName}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {errors.vendor && (
                <p className="text-xs text-red-500 mt-1">{errors.vendor}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Amount (৳) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ৳
                </span>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  placeholder="0.00"
                  className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm ${errors.amount ? "border-red-300" : "border-slate-200"}`}
                />
              </div>
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Method
              </label>
              <div className="flex gap-2">
                {["bKash", "Bank", "Cash"].map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setForm((prev) => ({ ...prev, method: m }))}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                      form.method === m
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Transaction ID / Reference{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.trxId}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, trxId: e.target.value }))
                }
                placeholder="Enter transaction reference..."
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-mono ${errors.trxId ? "border-red-300" : "border-slate-200"}`}
              />
              {errors.trxId && (
                <p className="text-xs text-red-500 mt-1">{errors.trxId}</p>
              )}
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Date
              </label>
              <input
                type="date"
                value={form.paymentDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, paymentDate: e.target.value }))
                }
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Admin Notes
              </label>
              <textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="Internal remarks (optional)..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-white border border-slate-300 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Record Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function VendorPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [payments, setPayments] = useState(mockPayments);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [addPaymentForm, setAddPaymentForm] = useState({
    vendorId: "",
    vendorName: "",
    vendorType: "",
    amount: "",
    method: "bKash",
    trxId: "",
    paymentDate: new Date().toISOString().split("T")[0],
    notes: "",
    vendorSearch: "",
  });
  const [addErrors, setAddErrors] = useState({});

  const stats = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date(now);
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    return {
      totalRevenue: payments
        .filter((p) => p.status === "Verified")
        .reduce((sum, p) => sum + p.amount, 0),
      pending: payments.filter((p) => p.status === "Pending").length,
      expiringSoon: payments.filter((p) => {
        if (!p.expiryDate || p.status !== "Verified") return false;
        const exp = new Date(p.expiryDate);
        return exp <= thirtyDaysFromNow && exp >= now;
      }).length,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    let result = [...payments];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.vendorName.toLowerCase().includes(q) ||
          p.trxId.toLowerCase().includes(q),
      );
    }
    if (selectedMethod !== "All")
      result = result.filter((p) => p.method === selectedMethod);
    if (dateRange.start)
      result = result.filter((p) => p.paymentDate >= dateRange.start);
    if (dateRange.end)
      result = result.filter((p) => p.paymentDate <= dateRange.end);
    return result;
  }, [payments, searchQuery, selectedMethod, dateRange]);

  const handleVerify = (payment) => {
    setSelectedPayment(payment);
    setModalOpen(true);
  };

  const handleApprove = (paymentId, { confirmDate, expiryDate }) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? { ...p, status: "Verified", paymentDate: confirmDate, expiryDate }
          : p,
      ),
    );
    setModalOpen(false);
    setSelectedPayment(null);
  };

  const handleReject = (paymentId, reason) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: "Rejected" } : p)),
    );
    setModalOpen(false);
    setSelectedPayment(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedPayment(null), 300);
  };

  const handleAddPayment = () => {
    const errs = {};
    if (!addPaymentForm.vendorId) errs.vendor = "Please select a vendor";
    if (!addPaymentForm.amount || Number(addPaymentForm.amount) <= 0)
      errs.amount = "Valid amount is required";
    if (!addPaymentForm.trxId.trim()) errs.trxId = "Transaction ID is required";
    setAddErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const vendor = vendors.find((v) => v.id === addPaymentForm.vendorId);
    const newPayment = {
      id: Date.now(),
      vendorName: vendor.shopName,
      shopType: vendor.type,
      trxId: addPaymentForm.trxId,
      amount: Number(addPaymentForm.amount),
      method: addPaymentForm.method,
      paymentDate: addPaymentForm.paymentDate,
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      status: "Verified",
    };
    setPayments((prev) => [newPayment, ...prev]);
    setAddPaymentOpen(false);
    setAddPaymentForm({
      vendorId: "",
      vendorName: "",
      vendorType: "",
      amount: "",
      method: "bKash",
      trxId: "",
      paymentDate: new Date().toISOString().split("T")[0],
      notes: "",
      vendorSearch: "",
    });
    alert("Payment recorded successfully! Vendor status updated to Paid.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Vendor Payment Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and verify manual vendor subscription payments
          </p>
        </div>
        <button
          onClick={() => setAddPaymentOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Payment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Revenue Collected"
          value={`৳${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="emerald"
        />
        <StatCard
          title="Pending Verifications"
          value={stats.pending}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Expired / Renewal Due"
          value={stats.expiringSoon}
          icon={XCircle}
          color="red"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Vendor or TrxID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-400" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="text-slate-400">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg p-1">
              {paymentMethods.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSelectedMethod(value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedMethod === value
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 inline mr-1" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Vendor Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Shop Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Reference / TrxID
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Payment Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Approval
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Wallet className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">
                        No payments found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className={`hover:bg-slate-50 transition-colors ${payment.status === "Pending" ? "bg-amber-50/50" : payment.status === "Verified" ? "bg-emerald-50/50" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900 text-sm">
                        {payment.vendorName}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <ShopTypeBadge type={payment.shopType} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {payment.trxId}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900 text-sm">
                      ৳{payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(payment.paymentDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <MethodBadge method={payment.method} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={payment.status} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      {payment.status === "Pending" ? (
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleVerify(payment)}
                            className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleVerify(payment)}
                            className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${
                            payment.status === "Verified"
                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {payment.status === "Verified" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {payment.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredPayments.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {payments.length}
            </span>{" "}
            payments
          </p>
        </div>
      </div>

      <PaymentVerificationModal
        payment={selectedPayment}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      <AddPaymentModal
        isOpen={addPaymentOpen}
        onClose={() => {
          setAddPaymentOpen(false);
          setAddPaymentForm({
            vendorId: "",
            vendorName: "",
            vendorType: "",
            amount: "",
            method: "bKash",
            trxId: "",
            paymentDate: new Date().toISOString().split("T")[0],
            notes: "",
            vendorSearch: "",
          });
          setAddErrors({});
        }}
        form={addPaymentForm}
        setForm={setAddPaymentForm}
        vendors={vendors}
        onSubmit={handleAddPayment}
        errors={addErrors}
      />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    red: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl border ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function ShopTypeBadge({ type }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
        type === "Garage"
          ? "bg-blue-100 text-blue-700 border-blue-200"
          : "bg-purple-100 text-purple-700 border-purple-200"
      }`}
    >
      {type}
    </span>
  );
}

function MethodBadge({ method }) {
  const styles = {
    bKash: "bg-pink-50 text-pink-700 border-pink-200",
    Bank: "bg-slate-100 text-slate-700 border-slate-200",
    Cash: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[method]}`}
    >
      {method}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Verified: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };
  const icons = { Verified: CheckCircle, Pending: Clock, Rejected: XCircle };
  const Icon = icons[status] || Clock;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}
