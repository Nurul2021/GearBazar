"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  Loader2,
  Package,
  CreditCard,
  Banknote,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { selectCurrentUser } from "@/features/auth/authSlice";
import api from "@/lib/axios";

const defaultSalesData = [
  { day: "Mon", earnings: 0 },
  { day: "Tue", earnings: 0 },
  { day: "Wed", earnings: 0 },
  { day: "Thu", earnings: 0 },
  { day: "Fri", earnings: 0 },
  { day: "Sat", earnings: 0 },
  { day: "Sun", earnings: 0 },
];

const defaultMonthlyData = [
  { month: "Jan", earnings: 0 },
  { month: "Feb", earnings: 0 },
  { month: "Mar", earnings: 0 },
  { month: "Apr", earnings: 0 },
  { month: "May", earnings: 0 },
  { month: "Jun", earnings: 0 },
];

const demoPayoutHistory = [
  {
    _id: "payout-1",
    amount: 1500.0,
    method: "Bank Transfer",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    _id: "payout-2",
    amount: 800.0,
    method: "bKash",
    status: "completed",
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
  },
  {
    _id: "payout-3",
    amount: 2000.0,
    method: "Nagad",
    status: "pending",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

const demoRecentSales = [
  { day: "Mon", earnings: 450 },
  { day: "Tue", earnings: 320 },
  { day: "Wed", earnings: 580 },
  { day: "Thu", earnings: 720 },
  { day: "Fri", earnings: 890 },
  { day: "Sat", earnings: 1100 },
  { day: "Sun", earnings: 640 },
];

const demoMonthlySales = [
  { month: "Jan", earnings: 4200 },
  { month: "Feb", earnings: 3800 },
  { month: "Mar", earnings: 5100 },
  { month: "Apr", earnings: 4600 },
  { month: "May", earnings: 5800 },
  { month: "Jun", earnings: 6200 },
];

export default function EarningsOverview() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const user = useSelector(selectCurrentUser);

  const [stats, setStats] = useState({
    totalSales: 15450,
    pendingBalance: 2340,
    withdrawn: 8500,
    totalOrders: 87,
  });

  const [weeklyData, setWeeklyData] = useState(demoRecentSales);
  const [monthlyData, setMonthlyData] = useState(demoMonthlySales);
  const [payoutHistory, setPayoutHistory] = useState(demoPayoutHistory);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState("this_week");

  useEffect(() => {
    const loadEarningsData = async () => {
      if (!user?._id && !user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get("/dashboard");
        const data = response.data.data;

        setStats({
          totalSales: data.totalSales || 15450,
          pendingBalance: data.pendingBalance || 2340,
          withdrawn: data.withdrawn || 8500,
          totalOrders: data.totalOrders || 87,
        });
      } catch (err) {
        console.error("Failed to load earnings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadEarningsData();
  }, [user, period]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!withdrawAmount || !paymentMethod) return;

    try {
      await api.post("/finance/vendor/withdraw", {
        amount: parseFloat(withdrawAmount),
        method: paymentMethod,
      });
      alert("Withdrawal request submitted!");
      setWithdrawAmount("");
      setPaymentMethod("");
      setWithdrawModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit withdrawal");
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getMethodIcon = (method) => {
    switch (method?.toLowerCase()) {
      case "bank transfer":
        return <Building2 className="w-5 h-5 text-slate-500" />;
      case "bkash":
        return <Smartphone className="w-5 h-5 text-pink-500" />;
      case "nagad":
        return <Smartphone className="w-5 h-5 text-orange-500" />;
      default:
        return <CreditCard className="w-5 h-5 text-slate-500" />;
    }
  };

  const formatCurrency = (value) => {
    return `৳${(value || 0).toLocaleString("en-US")}`;
  };

  const formatCurrencyShort = (value) => {
    if (value >= 100000) {
      return `৳${(value / 100000).toFixed(1)}L`;
    }
    if (value >= 1000) {
      return `৳${(value / 1000).toFixed(1)}K`;
    }
    return `৳${value}`;
  };

  const commission = stats.totalSales * 0.1;
  const netEarnings = stats.totalSales - commission;

  const financeCards = [
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalSales),
      subtext: "Gross Earnings",
      icon: DollarSign,
      color: "emerald",
    },
    {
      label: "Platform Commission",
      value: formatCurrency(commission),
      subtext: "10% Fee",
      icon: TrendingDown,
      color: "amber",
    },
    {
      label: "Net Earnings",
      value: formatCurrency(netEarnings),
      subtext: "After Commission",
      icon: TrendingUp,
      color: "emerald",
    },
  ];

  const balanceCards = [
    {
      label: "Available Balance",
      value: formatCurrency(
        stats.totalSales - stats.withdrawn - stats.pendingBalance,
      ),
      subtext: "Ready to withdraw",
      icon: Banknote,
      color: "emerald",
    },
    {
      label: "Pending Balance",
      value: formatCurrency(stats.pendingBalance),
      subtext: "Processing",
      icon: Clock,
      color: "amber",
    },
    {
      label: "Total Withdrawn",
      value: formatCurrency(stats.withdrawn),
      subtext: "Completed payouts",
      icon: ArrowUpRight,
      color: "blue",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <span className="ml-3 text-slate-500">Loading earnings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Earnings</h1>
          <p className="text-slate-500">
            Track your revenue and manage payouts
          </p>
        </div>
        <button
          onClick={() => setWithdrawModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
        >
          <Wallet className="w-5 h-5" />
          Withdraw Funds
        </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {balanceCards.map((card, index) => {
          const Icon = card.icon;
          const bgColor =
            card.color === "emerald"
              ? "bg-emerald-50"
              : card.color === "amber"
                ? "bg-amber-50"
                : "bg-blue-50";
          const textColor =
            card.color === "emerald"
              ? "text-emerald-600"
              : card.color === "amber"
                ? "text-amber-600"
                : "text-blue-600";
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${textColor}`}>
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{card.subtext}</p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${bgColor}`}
                >
                  <Icon className={`w-5 h-5 ${textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Weekly Earnings
              </h2>
              <p className="text-sm text-slate-500">Daily earnings this week</p>
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600"
            >
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
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
                  tickFormatter={(value) => `৳${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [formatCurrency(value), "Earnings"]}
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Monthly Overview
              </h2>
              <p className="text-sm text-slate-500">Earnings by month</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  tickFormatter={(value) => `৳${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value) => [formatCurrency(value), "Earnings"]}
                />
                <Bar dataKey="earnings" fill="#059669" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Withdrawal History
            </h2>
            <p className="text-sm text-slate-500">Recent payout requests</p>
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
              {payoutHistory.length > 0 ? (
                payoutHistory.map((payout) => (
                  <tr
                    key={payout._id || payout.id}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-4 text-sm text-slate-600">
                      {new Date(
                        payout.createdAt || payout.date,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(payout.amount)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getMethodIcon(payout.method)}
                        <span className="text-sm text-slate-600">
                          {payout.method}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadge(payout.status)}`}
                      >
                        {getStatusIcon(payout.status)}
                        {payout.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p>No withdrawal history yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setWithdrawModalOpen(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Withdraw Funds
                </h2>
                <p className="text-sm text-slate-500">
                  Available:{" "}
                  {formatCurrency(
                    stats.totalSales - stats.withdrawn - stats.pendingBalance,
                  )}
                </p>
              </div>
              <button
                onClick={() => setWithdrawModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    ৳
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
                  {[
                    { value: "Bank", label: "Bank Transfer", icon: Building2 },
                    { value: "bKash", label: "bKash", icon: Smartphone },
                    { value: "Nagad", label: "Nagad", icon: Smartphone },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === option.value
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={option.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <option.icon className="w-5 h-5 text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">
                        {option.label}
                      </span>
                    </label>
                  ))}
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
      )}
    </div>
  );
}
