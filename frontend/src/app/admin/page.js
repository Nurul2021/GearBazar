"use client";

import {
  Store,
  Users2,
  Package,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

// KPI Data
const kpiData = [
  {
    title: "Total Vendors",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Store,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    shopCount: 156,
    garageCount: 92,
  },
  {
    title: "Pending KYCs",
    value: "23",
    change: "+5%",
    trend: "up",
    icon: Clock,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    highlight: true,
  },
  {
    title: "Active Inventory",
    value: "12,430",
    change: "+18%",
    trend: "up",
    icon: Package,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    title: "Platform Earnings",
    value: "$48,350",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
];

// Sales & Registrations Chart Data
const salesData = [
  { month: "Jan", sales: 12500, registrations: 45 },
  { month: "Feb", sales: 15200, registrations: 52 },
  { month: "Mar", sales: 18900, registrations: 61 },
  { month: "Apr", sales: 22400, registrations: 58 },
  { month: "May", sales: 26800, registrations: 72 },
  { month: "Jun", sales: 31200, registrations: 68 },
  { month: "Jul", sales: 29800, registrations: 75 },
  { month: "Aug", sales: 35400, registrations: 81 },
  { month: "Sep", sales: 38900, registrations: 79 },
  { month: "Oct", sales: 42300, registrations: 88 },
  { month: "Nov", sales: 45700, registrations: 92 },
  { month: "Dec", sales: 48300, registrations: 85 },
];

// Vendor Distribution Data
const vendorDistribution = [
  { name: "Parts Sellers", value: 156, color: "#3b82f6" },
  { name: "Garage Owners", value: 92, color: "#10b981" },
];

// Pending Approvals Data
const pendingApprovals = [
  {
    id: "#REQ-001",
    name: "AutoParts Pro",
    type: "Vendor",
    category: "Parts Seller",
    submitted: "2026-05-03",
    status: "pending",
  },
  {
    id: "#REQ-002",
    name: "SpeedZone Garage",
    type: "Vendor",
    category: "Garage Owner",
    submitted: "2026-05-03",
    status: "pending",
  },
  {
    id: "#REQ-003",
    name: "Brake Pads - Ceramic",
    type: "Product",
    category: "Brakes",
    submitted: "2026-05-02",
    status: "pending",
  },
  {
    id: "#REQ-004",
    name: "Elite Auto Care",
    type: "Vendor",
    category: "Garage Owner",
    submitted: "2026-05-02",
    status: "pending",
  },
  {
    id: "#REQ-005",
    name: "Oil Filter - Synthetic",
    type: "Product",
    category: "Filters",
    submitted: "2026-05-01",
    status: "pending",
  },
];

// Recent Transactions Data
const recentTransactions = [
  {
    id: "#TXN-001",
    vendor: "AutoParts Pro",
    amount: "$500",
    type: "Registration Fee",
    method: "Bank Transfer",
    date: "2026-05-03",
    status: "verified",
  },
  {
    id: "#TXN-002",
    vendor: "SpeedZone Garage",
    amount: "$750",
    type: "Registration Fee",
    method: "Credit Card",
    date: "2026-05-03",
    status: "pending",
  },
  {
    id: "#TXN-003",
    vendor: "Elite Auto Care",
    amount: "$750",
    type: "Registration Fee",
    method: "PayPal",
    date: "2026-05-02",
    status: "verified",
  },
  {
    id: "#TXN-004",
    vendor: "Turbo Tech",
    amount: "$500",
    type: "Registration Fee",
    method: "Bank Transfer",
    date: "2026-05-02",
    status: "pending",
  },
  {
    id: "#TXN-005",
    vendor: "Brake Masters",
    amount: "$750",
    type: "Registration Fee",
    method: "Credit Card",
    date: "2026-05-01",
    status: "verified",
  },
];

const getStatusBadge = (status) => {
  const styles = {
    verified: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-700",
  };
  return styles[status] || "bg-gray-100 text-gray-700";
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Welcome back, Super Admin
        </h1>
        <p className="text-slate-500">
          Here's what's happening with GearBazar today.
        </p>
      </div>

      {/* KPI Cards - Responsive: 4 cols on desktop, 1 col on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 border transition-all duration-200 hover:shadow-lg ${
              kpi.highlight
                ? "bg-amber-50 border-amber-300 shadow-md ring-2 ring-amber-200"
                : `${kpi.bgColor} ${kpi.borderColor} border shadow-sm`
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${kpi.bgColor}`}
              >
                <kpi.icon size={24} className={kpi.color} />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {kpi.trend === "up" ? (
                  <ArrowUpRight size={16} />
                ) : (
                  <ArrowDownRight size={16} />
                )}
                {kpi.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">
              {kpi.value}
            </h3>
            <p
              className={`text-sm font-medium ${kpi.highlight ? "text-amber-700" : "text-slate-600"}`}
            >
              {kpi.title}
            </p>
            {kpi.shopCount && (
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-slate-600">
                    {kpi.shopCount} Shops
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-slate-600">
                    {kpi.garageCount} Garages
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Section - 60/40 split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Sales & Registrations Line Chart - 60% */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Sales & Registrations
              </h2>
              <p className="text-sm text-slate-500">Monthly growth overview</p>
            </div>
            <select className="bg-white text-slate-700 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2 }}
                name="Sales ($)"
              />
              <Line
                type="monotone"
                dataKey="registrations"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", strokeWidth: 2 }}
                name="Registrations"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vendor Distribution Pie Chart - 40% */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Vendor Distribution
            </h2>
            <p className="text-sm text-slate-500">
              Parts sellers vs garage owners
            </p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={vendorDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {vendorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {vendorDistribution.map((item, index) => (
              <div
                key={index}
                className="text-center p-3 bg-slate-50 rounded-lg"
              >
                <p className="text-xl font-bold text-slate-900">{item.value}</p>
                <p className="text-xs text-slate-500">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actionable Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pending Approvals Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Pending Approvals
                </h2>
                <p className="text-sm text-slate-500">Latest 5 requests</p>
              </div>
              <Link
                href="/admin/pending-approvals"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View all <Eye size={16} />
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">
                    Request
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">
                    Type
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">
                    Date
                  </th>
                  <th className="text-center p-4 text-xs font-semibold text-slate-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingApprovals.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.id}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {item.type}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.category}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {item.submitted}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors">
                          <CheckCircle size={14} />
                          Approve
                        </button>
                        <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">
                          <XCircle size={14} />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Transactions
                </h2>
                <p className="text-sm text-slate-500">
                  Manual payment references
                </p>
              </div>
              <Link
                href="/admin/transactions"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View all <Eye size={16} />
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">
                    Transaction
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">
                    Vendor
                  </th>
                  <th className="text-left p-4 text-xs font-semibold text-slate-600 uppercase">
                    Amount
                  </th>
                  <th className="text-center p-4 text-xs font-semibold text-slate-600 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium text-blue-600">
                          {item.id}
                        </p>
                        <p className="text-xs text-slate-500">{item.type}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-slate-900">{item.vendor}</p>
                      <p className="text-xs text-slate-500">{item.method}</p>
                    </td>
                    <td className="p-4 text-sm font-semibold text-slate-900">
                      {item.amount}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
