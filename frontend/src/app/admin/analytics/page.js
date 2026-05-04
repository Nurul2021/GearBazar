"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users2,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  Store,
  CreditCard,
  Star,
  Activity,
} from "lucide-react";

const kpiData = [
  {
    label: "Total Revenue",
    value: "৳12,45,800",
    change: "+18.2%",
    up: true,
    icon: DollarSign,
    color: "emerald",
  },
  {
    label: "Total Orders",
    value: "1,482",
    change: "+12.5%",
    up: true,
    icon: ShoppingCart,
    color: "indigo",
  },
  {
    label: "New Customers",
    value: "328",
    change: "+8.7%",
    up: true,
    icon: Users2,
    color: "blue",
  },
  {
    label: "Avg. Order Value",
    value: "৳840",
    change: "-2.3%",
    up: false,
    icon: TrendingUp,
    color: "amber",
  },
];

const salesData = [
  { month: "Jan", revenue: 85000, orders: 120 },
  { month: "Feb", revenue: 92000, orders: 135 },
  { month: "Mar", revenue: 78000, orders: 110 },
  { month: "Apr", revenue: 110000, orders: 158 },
  { month: "May", revenue: 105000, orders: 145 },
  { month: "Jun", revenue: 125000, orders: 172 },
  { month: "Jul", revenue: 118000, orders: 165 },
  { month: "Aug", revenue: 132000, orders: 180 },
  { month: "Sep", revenue: 145000, orders: 195 },
  { month: "Oct", revenue: 138000, orders: 188 },
  { month: "Nov", revenue: 155000, orders: 210 },
  { month: "Dec", revenue: 168000, orders: 225 },
];

const topProducts = [
  {
    name: "Engine Oil 5W-30 Synthetic",
    sku: "EO-5W30-SYN",
    sold: 842,
    revenue: "৳1,26,300",
    growth: "+22%",
  },
  {
    name: "Brake Pad Set - Front",
    sku: "BP-F-001",
    sold: 715,
    revenue: "৳2,14,500",
    growth: "+18%",
  },
  {
    name: "Air Filter Element",
    sku: "AF-EL-002",
    sold: 680,
    revenue: "৳54,400",
    growth: "+15%",
  },
  {
    name: "Spark Plug Iridium",
    sku: "SP-IR-004",
    sold: 590,
    revenue: "৳88,500",
    growth: "+10%",
  },
  {
    name: "Headlight Assembly LED",
    sku: "HL-LED-003",
    sold: 445,
    revenue: "৳3,56,000",
    growth: "+28%",
  },
];

const topVendors = [
  {
    name: "Rahim Auto Parts",
    shop: "Rahim Garage",
    orders: 342,
    revenue: "৳4,52,000",
    rating: 4.8,
  },
  {
    name: "Karim Spare Center",
    shop: "Karim Motors",
    orders: 298,
    revenue: "৳3,87,400",
    rating: 4.6,
  },
  {
    name: "AutoMax Ltd.",
    shop: "AutoMax Store",
    orders: 265,
    revenue: "৳3,45,600",
    rating: 4.7,
  },
  {
    name: "ProParts BD",
    shop: "ProParts Garage",
    orders: 210,
    revenue: "৳2,73,000",
    rating: 4.5,
  },
  {
    name: "GearHead Parts",
    shop: "GearHead Shop",
    orders: 198,
    revenue: "৳2,57,400",
    rating: 4.4,
  },
];

const categorySales = [
  { name: "Engine Parts", value: 32, color: "bg-indigo-500" },
  { name: "Brake System", value: 24, color: "bg-emerald-500" },
  { name: "Filters", value: 18, color: "bg-amber-500" },
  { name: "Electrical", value: 14, color: "bg-blue-500" },
  { name: "Suspension", value: 8, color: "bg-purple-500" },
  { name: "Others", value: 4, color: "bg-slate-400" },
];

const recentActivities = [
  {
    action: "New vendor registered",
    detail: "AutoMax Ltd. joined the platform",
    time: "2 min ago",
    icon: Store,
    color: "text-emerald-600",
  },
  {
    action: "Order #ORD-1452 completed",
    detail: "Delivered to customer in Dhaka",
    time: "15 min ago",
    icon: ShoppingCart,
    color: "text-indigo-600",
  },
  {
    action: "Payment verified",
    detail: "bKash TrxID: 8X9P2Q3R for ProParts BD",
    time: "32 min ago",
    icon: CreditCard,
    color: "text-blue-600",
  },
  {
    action: "Product approved",
    detail: "Headlight Assembly LED by GearHead Parts",
    time: "1 hour ago",
    icon: Package,
    color: "text-amber-600",
  },
  {
    action: "New review posted",
    detail: "5-star review for Brake Pad Set",
    time: "2 hours ago",
    icon: Star,
    color: "text-yellow-600",
  },
];

function SimpleBarChart({ data, height = 200 }) {
  const maxVal = Math.max(...data.map((d) => d.revenue));
  return (
    <div className="flex items-end gap-2 h-[200px] pt-4">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-xs text-slate-500 font-medium">
            ৳{(d.revenue / 1000).toFixed(0)}k
          </span>
          <div
            className="w-full bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition-all cursor-pointer"
            style={{ height: `${(d.revenue / maxVal) * height}px` }}
          />
          <span className="text-xs text-slate-500 mt-1">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function SimpleLineChart({ data, height = 200 }) {
  const maxOrders = Math.max(...data.map((d) => d.orders));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: 100 - (d.orders / maxOrders) * 100,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="relative h-[200px] pt-4">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pathD} L 100 100 L 0 100 Z`} fill="url(#lineGrad)" />
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          stroke="#6366f1"
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#6366f1" />
        ))}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
        {data.map((d, i) => (
          <span key={i} className="text-xs text-slate-500">
            {d.month}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("12m");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Analytics Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Platform performance overview and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
            {["7d", "30d", "3m", "6m", "12m"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-10 h-10 rounded-lg bg-${kpi.color}-50 flex items-center justify-center`}
              >
                <kpi.icon className={`w-5 h-5 text-${kpi.color}-600`} />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.up ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {kpi.up ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-3">
              {kpi.value}
            </p>
            <p className="text-sm text-slate-500 mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Revenue Trend</h3>
              <p className="text-sm text-slate-500">Monthly revenue overview</p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-400" />
          </div>
          <SimpleBarChart data={salesData} />
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Orders Trend</h3>
              <p className="text-sm text-slate-500">Monthly order volume</p>
            </div>
            <Activity className="w-5 h-5 text-slate-400" />
          </div>
          <SimpleLineChart data={salesData} />
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">
              Top Selling Products
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Product
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Sold
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Revenue
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Growth
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topProducts.map((p, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-slate-900">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-500">{p.sku}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700">
                      {p.sold}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">
                      {p.revenue}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-medium text-emerald-600">
                        {p.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Vendors */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">
              Top Performing Vendors
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Vendor
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Orders
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Revenue
                  </th>
                  <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {topVendors.map((v, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-5 py-3">
                      <p className="text-sm font-medium text-slate-900">
                        {v.name}
                      </p>
                      <p className="text-xs text-slate-500">{v.shop}</p>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-700">
                      {v.orders}
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-slate-900">
                      {v.revenue}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-slate-700">
                          {v.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-900 mb-4">
            Sales by Category
          </h3>
          <div className="space-y-3">
            {categorySales.map((cat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                <span className="text-sm text-slate-700 flex-1">
                  {cat.name}
                </span>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${cat.value}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-900 w-10 text-right">
                  {cat.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0`}
                >
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-slate-500">{activity.detail}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
