"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Building2,
  Smartphone,
  Wallet,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { day: "Mon", earnings: 1200 },
  { day: "Tue", earnings: 1800 },
  { day: "Wed", earnings: 1400 },
  { day: "Thu", earnings: 2100 },
  { day: "Fri", earnings: 2800 },
  { day: "Sat", earnings: 3200 },
  { day: "Sun", earnings: 2400 },
];

const payoutHistory = [
  {
    id: 1,
    date: "2026-04-10",
    amount: 2500,
    method: "Bank",
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-04-08",
    amount: 1800,
    method: "bKash",
    status: "Completed",
  },
  {
    id: 3,
    date: "2026-04-05",
    amount: 5000,
    method: "Nagad",
    status: "Pending",
  },
  {
    id: 4,
    date: "2026-04-02",
    amount: 1200,
    method: "Bank",
    status: "Rejected",
  },
  {
    id: 5,
    date: "2026-03-28",
    amount: 3500,
    method: "Bank",
    status: "Completed",
  },
];

const financeCards = [
  {
    label: "Total Revenue",
    value: "$24,580",
    subtext: "Gross Earnings",
    icon: DollarSign,
    color: "emerald",
    type: "gross",
  },
  {
    label: "Platform Commission",
    value: "$2,458",
    subtext: "10% Fee",
    icon: TrendingDown,
    color: "amber",
    type: "commission",
  },
  {
    label: "Withdrawable Balance",
    value: "$22,122",
    subtext: "Net Balance",
    icon: ArrowUpRight,
    color: "emerald",
    type: "net",
  },
];

export default function OverviewSection() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();
    alert(`Withdrawal request: $${withdrawAmount} via ${paymentMethod}`);
    setWithdrawAmount("");
    setPaymentMethod("");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "Rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Manage your earnings and withdrawals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {financeCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-full -mr-10 -mt-10" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-500">
                    {card.label}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      card.color === "emerald" ? "bg-emerald-50" : "bg-amber-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        card.color === "emerald"
                          ? "text-emerald-600"
                          : "text-amber-600"
                      }`}
                    />
                  </div>
                </div>
                <p
                  className={`text-3xl font-bold ${
                    card.color === "emerald"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {card.value}
                </p>
                <p className="text-sm text-slate-500 mt-1">{card.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Earnings Trend
              </h2>
              <p className="text-sm text-slate-500">Daily earnings this week</p>
            </div>
            <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <defs>
                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Earnings",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#059669" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-1">
            Withdraw Funds
          </h2>
          <p className="text-sm text-slate-500 mb-6">Request a payout</p>

          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  $
                </span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                <label
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === "Bank"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value="Bank"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Building2 className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Bank Transfer
                  </span>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === "bKash"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value="bKash"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Smartphone className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    bKash
                  </span>
                </label>

                <label
                  className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === "Nagad"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value="Nagad"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <Smartphone className="w-5 h-5 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Nagad
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!withdrawAmount || !paymentMethod}
              className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Request Withdrawal
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Payout History
            </h2>
            <p className="text-sm text-slate-500">Recent withdrawal requests</p>
          </div>
          <Wallet className="w-5 h-5 text-slate-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-sm font-medium text-slate-500 pb-3">
                  Date
                </th>
                <th className="text-left text-sm font-medium text-slate-500 pb-3">
                  Amount
                </th>
                <th className="text-left text-sm font-medium text-slate-500 pb-3">
                  Method
                </th>
                <th className="text-left text-sm font-medium text-slate-500 pb-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((payout) => (
                <tr
                  key={payout.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="py-4 text-sm text-slate-600">{payout.date}</td>
                  <td className="py-4 text-sm font-semibold text-slate-900">
                    ${payout.amount.toLocaleString()}
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    {payout.method}
                  </td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                        payout.status,
                      )}`}
                    >
                      {getStatusIcon(payout.status)}
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
