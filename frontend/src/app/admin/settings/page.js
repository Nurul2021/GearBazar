"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "",
    siteEmail: "",
    commissionRate: 10,
    platformFee: 5,
    taxRate: 8,
    currency: "USD",
    timezone: "Asia/Dhaka",
    maintenanceMode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getSettings();
      if (data) {
        setSettings((prev) => ({ ...prev, ...data }));
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      await adminApi.updateSettings(settings);
      setMessage({ type: "success", text: "Settings saved successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to save settings",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="max-w-2xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <p className="text-gray-500">Configure your platform settings</p>
      </div>

      {message && (
        <div
          className={`p-4 rounded mb-4 ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">General Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) => handleChange("siteEmail", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="BDT">BDT - Bangladeshi Taka</option>
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange("timezone", e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="Asia/Dhaka">Asia/Dhaka (GMT+6)</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">
                    America/New_York (UTC-5)
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Commission & Fees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.commissionRate}
                  onChange={(e) =>
                    handleChange("commissionRate", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Platform takes this % from each sale
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Platform Fee ($)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settings.platformFee}
                  onChange={(e) =>
                    handleChange("platformFee", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Fixed fee per transaction
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={settings.taxRate}
                  onChange={(e) =>
                    handleChange("taxRate", Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">System Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) =>
                    handleChange("maintenanceMode", e.target.checked)
                  }
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="maintenanceMode"
                  className="ml-2 text-sm text-gray-700"
                >
                  Maintenance Mode
                </label>
                <p className="text-sm text-gray-500 ml-2">
                  (Site will show maintenance page to users)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
