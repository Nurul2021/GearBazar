"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { adminApi } from "../../lib/api";

const mockData = {
  totalRevenue: 284750,
  totalActiveUsers: 1250,
  pendingVerifications: 18,
  totalOrdersToday: 47,
  salesData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(
      Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: Math.floor(Math.random() * 15000) + 5000,
    orders: Math.floor(Math.random() * 50) + 20,
  })),
  recentActivity: [
    {
      id: 1,
      type: "registration",
      message: "New seller registered: AutoParts Pro",
      time: "2 min ago",
      icon: "user",
    },
    {
      id: 2,
      type: "order",
      message: "Order #ORD-2847 completed - $1,250.00",
      time: "15 min ago",
      icon: "cart",
    },
    {
      id: 3,
      type: "verification",
      message: 'Garage "QuickFix Motors" submitted for verification',
      time: "32 min ago",
      icon: "check",
    },
    {
      id: 4,
      type: "registration",
      message: "New customer registered: john.doe@email.com",
      time: "1 hour ago",
      icon: "user",
    },
    {
      id: 5,
      type: "order",
      message: "Order #ORD-2846 completed - $890.00",
      time: "2 hours ago",
      icon: "cart",
    },
    {
      id: 6,
      type: "product",
      message: 'New product pending approval: "Brembo Brake Kit"',
      time: "3 hours ago",
      icon: "package",
    },
    {
      id: 7,
      type: "verification",
      message: 'Shop "TurboTech Garage" verified successfully',
      time: "4 hours ago",
      icon: "check",
    },
    {
      id: 8,
      type: "order",
      message: "Order #ORD-2845 completed - $2,100.00",
      time: "5 hours ago",
      icon: "cart",
    },
  ],
};

const activityIcons = {
  user: (
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
      <svg
        className="w-4 h-4 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
  ),
  cart: (
    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
      <svg
        className="w-4 h-4 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 8a2 2 0 100-4 2 2 0 000 4z"
        />
      </svg>
    </div>
  ),
  check: (
    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
      <svg
        className="w-4 h-4 text-purple-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  ),
  package: (
    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
      <svg
        className="w-4 h-4 text-orange-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    </div>
  ),
};

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1 text-gray-900">{value}</p>
        {trend && (
          <p
            className={`text-sm mt-2 ${trend > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {trend > 0 ? "+" : ""}
            {trend}% from last month
          </p>
        )}
      </div>
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
    </div>
  </div>
);

export default function AdminDashboardPage() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: response } = await adminApi.getAnalytics();
      if (response) {
        setData((prev) => ({
          ...prev,
          totalRevenue: response.totalRevenue || prev.totalRevenue,
          totalActiveUsers: response.totalUsers || prev.totalActiveUsers,
          totalOrdersToday: response.totalOrders || prev.totalOrdersToday,
        }));
      }
    } catch (error) {
      console.log("Using mock data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${data.totalRevenue.toLocaleString()}`}
          color="bg-green-100"
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={12.5}
        />
        <StatCard
          title="Total Active Users"
          value={data.totalActiveUsers.toLocaleString()}
          color="bg-blue-100"
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
          trend={8.2}
        />
        <StatCard
          title="Pending Verifications"
          value={data.pendingVerifications}
          color="bg-yellow-100"
          icon={
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <StatCard
          title="Total Orders Today"
          value={data.totalOrdersToday}
          color="bg-purple-100"
          icon={
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
          trend={15.3}
        />
      </div>

      {/* Sales Performance Graph */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Sales Performance
            </h2>
            <p className="text-sm text-gray-500">
              Platform growth over the last 30 days
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-600">Orders</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.salesData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [
                  name === "revenue" ? `$${value.toLocaleString()}` : value,
                  name === "revenue" ? "Revenue" : "Orders",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorOrders)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500">
              Latest registrations and orders
            </p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {data.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {activityIcons[activity.icon]}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
