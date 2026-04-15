"use client";

import { useState, useEffect } from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockData = {
  revenueData: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(
      Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: Math.floor(Math.random() * 15000) + 5000,
    orders: Math.floor(Math.random() * 50) + 20,
  })),
  categoryData: [
    { name: "Engine", value: 35 },
    { name: "Brakes", value: 25 },
    { name: "Electrical", value: 20 },
    { name: "Suspension", value: 15 },
    { name: "Other", value: 5 },
  ],
  topProducts: [
    { name: "Brembo Brake Pad Set", sales: 245, revenue: 22050 },
    { name: "NGK Spark Plugs", sales: 189, revenue: 4725 },
    { name: "Mobil 1 Oil 5W-30", sales: 156, revenue: 6708 },
    { name: "Bosch Air Filter", sales: 134, revenue: 6030 },
    { name: "Monroe Shocks", sales: 98, revenue: 14700 },
  ],
};

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function AnalyticsPage() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Platform performance and insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">$284,750</p>
          <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">1,247</p>
          <p className="text-sm text-green-600 mt-2">+8.2% from last month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">$228</p>
          <p className="text-sm text-green-600 mt-2">+5.1% from last month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
          <p className="text-2xl font-bold mt-1 text-gray-900">3.2%</p>
          <p className="text-sm text-red-600 mt-2">-0.8% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Revenue & Orders Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  stroke="#9CA3AF"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Sales by Category
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {data.categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Top Selling Products
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 12 }}
                stroke="#9CA3AF"
                width={150}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="sales" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
