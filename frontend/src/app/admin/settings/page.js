"use client";

import { useState } from "react";
import {
  Settings,
  Store,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Mail,
  Save,
  Upload,
  Check,
  X,
  Eye,
  EyeOff,
  Info,
  AlertTriangle,
} from "lucide-react";

const initialSettings = {
  siteName: "GearBazar",
  siteDescription: "Bangladesh's #1 Auto Parts Marketplace",
  contactEmail: "admin@gearbazar.com",
  supportPhone: "+880 1712-345678",
  currency: "BDT",
  timezone: "Asia/Dhaka",
  lowStockAlert: 20,
  autoApproveProducts: false,
  maintenanceMode: false,
  allowGuestCheckout: true,
  emailNotifications: true,
  smsNotifications: false,
  vendorCommission: 8,
  taxRate: 15,
  shippingFee: 120,
  freeShippingThreshold: 5000,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure platform settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
            saved
              ? "bg-emerald-600 text-white"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Settings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    General Settings
                  </h3>
                  <p className="text-sm text-slate-500">
                    Basic platform configuration
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleChange("siteName", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) =>
                        handleChange("contactEmail", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Support Phone
                    </label>
                    <input
                      type="text"
                      value={settings.supportPhone}
                      onChange={(e) =>
                        handleChange("supportPhone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleChange("currency", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="BDT">BDT (৳)</option>
                      <option value="USD">USD ($)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Site Description
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) =>
                        handleChange("siteDescription", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-4">
                  <h4 className="font-medium text-slate-900">
                    System Preferences
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Maintenance Mode
                      </p>
                      <p className="text-xs text-slate-500">
                        Put the site in maintenance mode
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleChange(
                          "maintenanceMode",
                          !settings.maintenanceMode,
                        )
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.maintenanceMode
                          ? "bg-indigo-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.maintenanceMode
                            ? "translate-x-5.5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Auto-Approve Products
                      </p>
                      <p className="text-xs text-slate-500">
                        Automatically approve new vendor products
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleChange(
                          "autoApproveProducts",
                          !settings.autoApproveProducts,
                        )
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.autoApproveProducts
                          ? "bg-indigo-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.autoApproveProducts
                            ? "translate-x-5.5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        Guest Checkout
                      </p>
                      <p className="text-xs text-slate-500">
                        Allow customers to checkout without an account
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleChange(
                          "allowGuestCheckout",
                          !settings.allowGuestCheckout,
                        )
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.allowGuestCheckout
                          ? "bg-indigo-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.allowGuestCheckout
                            ? "translate-x-5.5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Notification Settings
                  </h3>
                  <p className="text-sm text-slate-500">
                    Configure how notifications are sent
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Email Notifications
                      </p>
                      <p className="text-xs text-slate-500">
                        Send system notifications via email
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleChange(
                          "emailNotifications",
                          !settings.emailNotifications,
                        )
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.emailNotifications
                          ? "bg-indigo-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.emailNotifications
                            ? "translate-x-5.5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        SMS Notifications
                      </p>
                      <p className="text-xs text-slate-500">
                        Send critical alerts via SMS
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleChange(
                          "smsNotifications",
                          !settings.smsNotifications,
                        )
                      }
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        settings.smsNotifications
                          ? "bg-indigo-600"
                          : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          settings.smsNotifications
                            ? "translate-x-5.5"
                            : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">
                    Notification Templates
                  </h4>
                  <div className="space-y-3">
                    {[
                      "Order Confirmation",
                      "Payment Received",
                      "Order Shipped",
                      "Account Verification",
                    ].map((template, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2"
                      >
                        <span className="text-sm text-slate-700">
                          {template}
                        </span>
                        <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                          Edit Template
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payments Settings */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Payment Settings
                  </h3>
                  <p className="text-sm text-slate-500">
                    Configure payment gateways and fees
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Vendor Commission (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={settings.vendorCommission}
                        onChange={(e) =>
                          handleChange(
                            "vendorCommission",
                            Number(e.target.value),
                          )
                        }
                        className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={settings.taxRate}
                        onChange={(e) =>
                          handleChange("taxRate", Number(e.target.value))
                        }
                        className="w-full pl-3 pr-8 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                        %
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Shipping Fee (৳)
                    </label>
                    <input
                      type="number"
                      value={settings.shippingFee}
                      onChange={(e) =>
                        handleChange("shippingFee", Number(e.target.value))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Free Shipping Above (৳)
                    </label>
                    <input
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) =>
                        handleChange(
                          "freeShippingThreshold",
                          Number(e.target.value),
                        )
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h4 className="font-medium text-slate-900 mb-3">
                    Payment Gateways
                  </h4>
                  <div className="space-y-3">
                    {["bKash", "Nagad", "Rocket", "Bank Transfer"].map(
                      (gateway, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <span className="text-sm font-medium text-slate-700">
                            {gateway}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Active
                            </span>
                            <button className="text-xs text-slate-500 hover:text-slate-700">
                              Configure
                            </button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Security Settings
                  </h3>
                  <p className="text-sm text-slate-500">
                    Manage security and access controls
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-900">
                          Low Stock Alert Threshold
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Products below this quantity will trigger alerts
                        </p>
                        <input
                          type="number"
                          value={settings.lowStockAlert}
                          onChange={(e) =>
                            handleChange(
                              "lowStockAlert",
                              Number(e.target.value),
                            )
                          }
                          className="mt-2 w-24 px-3 py-1.5 border border-amber-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">
                      Admin Accounts
                    </h4>
                    <div className="space-y-3">
                      {[
                        {
                          name: "Super Admin",
                          email: "admin@gearbazar.com",
                          role: "Super Admin",
                          lastLogin: "2 min ago",
                        },
                        {
                          name: "Finance Admin",
                          email: "finance@gearbazar.com",
                          role: "Finance",
                          lastLogin: "1 hour ago",
                        },
                        {
                          name: "Support Admin",
                          email: "support@gearbazar.com",
                          role: "Support",
                          lastLogin: "3 hours ago",
                        },
                      ].map((admin, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {admin.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {admin.email}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full">
                              {admin.role}
                            </span>
                            <p className="text-xs text-slate-400 mt-0.5">
                              Last login: {admin.lastLogin}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      + Add New Admin Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
