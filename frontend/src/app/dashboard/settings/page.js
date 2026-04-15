"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Shield,
  BadgeCheck,
  Building2,
  Mail,
  MapPin,
  Camera,
  FileText,
  Image as ImageIcon,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react";

const tabs = [
  { id: "profile", label: "Public Profile", icon: User },
  { id: "verification", label: "Business Verification", icon: Shield },
  { id: "security", label: "Account Security", icon: Lock },
];

const verificationStatus = {
  status: "verified",
  verifiedAt: "2026-03-15",
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    shopName: "Gear Bazar Auto Parts",
    email: "contact@gearbazar.com",
    address: "123 Motor Street, Dhaka 1200",
    logo: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    alert("Changes saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500">Manage your account and preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                    isActive
                      ? "text-emerald-600"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "profile" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Public Profile
                </h3>
                <p className="text-sm text-slate-500">
                  This information will be visible to customers
                </p>
              </div>

              <div className="flex items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center overflow-hidden">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Shop Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <Camera className="w-8 h-8 text-slate-400" />
                        <span className="text-xs text-slate-500 mt-1">
                          Upload Logo
                        </span>
                      </>
                    )}
                  </div>
                  <button className="w-full mt-2 py-2 text-sm text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition-colors">
                    Change Logo
                  </button>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Shop Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={formData.shopName}
                        onChange={(e) =>
                          setFormData({ ...formData, shopName: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Business Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <textarea
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        rows={3}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "verification" && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {verificationStatus.status === "verified" ? (
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <BadgeCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-amber-600" />
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {verificationStatus.status === "verified"
                        ? "Verified Seller"
                        : "Pending Verification"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {verificationStatus.status === "verified"
                        ? `Verified on ${verificationStatus.verifiedAt}`
                        : "Your documents are being reviewed"}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ${
                    verificationStatus.status === "verified"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {verificationStatus.status === "verified"
                    ? "Verified"
                    : "Pending"}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Trade License
                </h4>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-emerald-400 transition-colors cursor-pointer">
                  <FileText className="w-10 h-10 text-slate-400" />
                  <p className="mt-2 text-sm font-medium text-slate-700">
                    trade_license_2026.pdf
                  </p>
                  <p className="text-xs text-slate-500">Click to re-upload</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900">
                  Shop Photos
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-slate-100 rounded-xl flex flex-col items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <ImageIcon className="w-8 h-8 text-slate-400" />
                      <span className="text-xs text-slate-500 mt-1">
                        Photo {i}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Change Password
                </h3>
                <p className="text-sm text-slate-500">
                  Update your password to keep your account secure
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          currentPassword: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          current: !showPasswords.current,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords.current ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          new: !showPasswords.new,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords.new ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords({
                          ...showPasswords,
                          confirm: !showPasswords.confirm,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button className="mt-4 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Don&apos;t forget to save your changes
          </p>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
