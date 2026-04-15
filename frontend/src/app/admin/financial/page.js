"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";
import toast from "react-hot-toast";

const mockFinanceData = {
  totalCommissionEarned: 45280.5,
  pendingPayouts: 12450.0,
  netProfit: 32830.5,
  commissionPercentage: 10,
  fixedShippingCharge: 9.99,
};

const mockPayoutRequests = [
  {
    _id: "pout1",
    vendor: {
      name: "AutoParts Pro",
      _id: "v1",
      email: "autoparts@example.com",
    },
    amount: 2500.0,
    status: "pending",
    requestDate: "2024-01-15T10:30:00Z",
    bankDetails: {
      accountName: "AutoParts Pro Ltd",
      accountNumber: "1234567890",
      bankName: "Bank Asia",
      routingNumber: "BA123456",
    },
  },
  {
    _id: "pout2",
    vendor: { name: "TurboTech", _id: "v2", email: "turbotech@example.com" },
    amount: 1850.0,
    status: "pending",
    requestDate: "2024-01-14T14:20:00Z",
    bankDetails: {
      accountName: "TurboTech Garage",
      accountNumber: "9876543210",
      bankName: "City Bank",
      routingNumber: "CB987654",
    },
  },
  {
    _id: "pout3",
    vendor: {
      name: "PartsPro Seller",
      _id: "v3",
      email: "partspro@example.com",
    },
    amount: 3200.0,
    status: "pending",
    requestDate: "2024-01-13T09:15:00Z",
    bankDetails: {
      accountName: "PartsPro LLC",
      accountNumber: "5432109876",
      bankName: "BRAC Bank",
      routingNumber: "BRAC5678",
    },
  },
  {
    _id: "pout4",
    vendor: { name: "Elite Auto Parts", _id: "v4", email: "elite@example.com" },
    amount: 4100.0,
    status: "paid",
    requestDate: "2024-01-10T16:45:00Z",
    paidDate: "2024-01-12T10:00:00Z",
    referenceNumber: "PAY-2024-001",
  },
  {
    _id: "pout5",
    vendor: {
      name: "QuickFix Motors",
      _id: "v5",
      email: "quickfix@example.com",
    },
    amount: 800.0,
    status: "paid",
    requestDate: "2024-01-08T11:30:00Z",
    paidDate: "2024-01-10T14:00:00Z",
    referenceNumber: "PAY-2024-002",
  },
];

const mockTransactions = [
  {
    id: 1,
    date: "2024-01-15",
    order: "ORD-2024-001",
    vendor: "AutoParts Pro",
    amount: 179.98,
    commission: 17.99,
  },
  {
    id: 2,
    date: "2024-01-15",
    order: "ORD-2024-002",
    vendor: "TurboTech",
    amount: 149.99,
    commission: 15.0,
  },
  {
    id: 3,
    date: "2024-01-14",
    order: "ORD-2024-003",
    vendor: "PartsPro Seller",
    amount: 163.94,
    commission: 16.39,
  },
  {
    id: 4,
    date: "2024-01-14",
    order: "ORD-2024-004",
    vendor: "Elite Auto Parts",
    amount: 599.98,
    commission: 60.0,
  },
  {
    id: 5,
    date: "2024-01-13",
    order: "ORD-2024-005",
    vendor: "QuickFix Motors",
    amount: 74.97,
    commission: 7.5,
  },
  {
    id: 6,
    date: "2024-01-12",
    order: "ORD-2024-006",
    vendor: "AutoParts Pro",
    amount: 120.0,
    commission: 12.0,
  },
];

const statusBadge = {
  pending: "bg-yellow-100 text-yellow-800",
  paid: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function FinancialReportsPage() {
  const [financeData, setFinanceData] = useState(mockFinanceData);
  const [payoutRequests, setPayoutRequests] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [globalSettings, setGlobalSettings] = useState({
    commissionPercentage: 10,
    fixedShippingCharge: 9.99,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPayoutRequests(mockPayoutRequests);
      setTransactions(mockTransactions);
    } catch (error) {
      console.error("Failed to load finance data");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    if (!referenceNumber.trim()) {
      toast.error("Please enter a reference number");
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setPayoutRequests(
        payoutRequests.map((p) =>
          p._id === selectedPayout._id
            ? {
                ...p,
                status: "paid",
                paidDate: new Date().toISOString(),
                referenceNumber,
              }
            : p,
        ),
      );
      toast.success(`Payout marked as paid with reference ${referenceNumber}`);
      setShowPayoutModal(false);
      setSelectedPayout(null);
      setReferenceNumber("");
    } catch (error) {
      toast.error("Failed to process payout");
    }
  };

  const openPayoutModal = (payout) => {
    setSelectedPayout(payout);
    setShowPayoutModal(true);
  };

  const exportToCSV = () => {
    const headers = ["Date", "Order ID", "Vendor", "Amount", "Commission"];
    const rows = transactions.map((t) => [
      t.date,
      t.order,
      t.vendor,
      t.amount.toFixed(2),
      t.commission.toFixed(2),
    ]);
    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financial-report-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Financial report exported to CSV");
  };

  const saveGlobalSettings = () => {
    setFinanceData({ ...financeData, ...globalSettings });
    toast.success("Global settings updated");
  };

  const pendingPayouts = payoutRequests
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Finance & Commission
          </h1>
          <p className="text-gray-500">
            Manage platform finances and vendor payouts
          </p>
        </div>
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export to CSV
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        {["overview", "payouts", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "overview"
              ? "Overview"
              : tab === "payouts"
                ? "Payout Management"
                : "Global Settings"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <p className="text-green-100 text-sm font-medium">
                Total Platform Commission Earned
              </p>
              <p className="text-3xl font-bold mt-2">
                ${financeData.totalCommissionEarned.toLocaleString()}
              </p>
              <p className="text-green-200 text-sm mt-2">
                +12.5% from last month
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
              <p className="text-yellow-100 text-sm font-medium">
                Pending Payouts to Vendors
              </p>
              <p className="text-3xl font-bold mt-2">
                ${pendingPayouts.toLocaleString()}
              </p>
              <p className="text-yellow-200 text-sm mt-2">
                {payoutRequests.filter((p) => p.status === "pending").length}{" "}
                pending requests
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <p className="text-blue-100 text-sm font-medium">Net Profit</p>
              <p className="text-3xl font-bold mt-2">
                ${financeData.netProfit.toLocaleString()}
              </p>
              <p className="text-blue-200 text-sm mt-2">After vendor payouts</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Transactions
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                      Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {t.date}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {t.order}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {t.vendor}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        ${t.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-green-600 font-medium">
                        +${t.commission.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "payouts" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Vendor Payout Requests
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Request Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payoutRequests.map((payout) => (
                  <tr key={payout._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">
                        {payout.vendor.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {payout.vendor.email}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      ${payout.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(payout.requestDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[payout.status]}`}
                      >
                        {payout.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {payout.referenceNumber ||
                        (payout.paidDate
                          ? `Paid: ${new Date(payout.paidDate).toLocaleDateString()}`
                          : "-")}
                    </td>
                    <td className="px-6 py-4">
                      {payout.status === "pending" ? (
                        <button
                          onClick={() => openPayoutModal(payout)}
                          className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Global Settings
          </h2>
          <div className="max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Commission Percentage (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={globalSettings.commissionPercentage}
                onChange={(e) =>
                  setGlobalSettings({
                    ...globalSettings,
                    commissionPercentage: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Percentage charged on each transaction
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fixed Shipping Charges ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={globalSettings.fixedShippingCharge}
                onChange={(e) =>
                  setGlobalSettings({
                    ...globalSettings,
                    fixedShippingCharge: parseFloat(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Default shipping cost for orders
              </p>
            </div>
            <button
              onClick={saveGlobalSettings}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}

      {showPayoutModal && selectedPayout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPayoutModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Mark Payout as Paid
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Vendor</p>
                <p className="font-semibold">{selectedPayout.vendor.name}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold text-lg">
                  ${selectedPayout.amount.toFixed(2)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Bank Details</p>
                <p className="text-sm">{selectedPayout.bankDetails.bankName}</p>
                <p className="text-sm">
                  Account: {selectedPayout.bankDetails.accountNumber}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reference Number
                </label>
                <input
                  type="text"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  placeholder="e.g., PAY-2024-003"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setShowPayoutModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleMarkAsPaid}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
