"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  PackagePlus,
  Package,
  ShoppingCart,
  DollarSign,
  BadgeCheck,
  Settings,
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Search,
  AlertTriangle,
} from "lucide-react";
import { selectCurrentUser, selectIsVerified } from "@/features/auth/authSlice";
import Tooltip from "./ui/Tooltip";

const menuItems = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "Inventory / My Parts",
    icon: Package,
    href: "/dashboard/inventory",
  },
  { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
  { label: "Earnings", icon: DollarSign, href: "/dashboard/earnings" },
  { label: "Verification Status", icon: BadgeCheck, href: "/dashboard/verify" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

const AddProductButton = ({ isVerified }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const buttonContent = (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
        !isVerified
          ? "text-slate-500 cursor-not-allowed opacity-60"
          : "text-slate-300 hover:bg-slate-700 hover:text-white"
      }`}
    >
      <PackagePlus className="w-5 h-5" />
      <span className="font-medium">Add New Part</span>
    </div>
  );

  if (!isVerified) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {buttonContent}
        {showTooltip && (
          <div className="absolute left-0 bottom-full mb-2 z-50 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span>Complete your verification to start selling</span>
            </div>
            <div className="absolute left-4 -bottom-1 w-2 h-2 bg-slate-900 rotate-45"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href="/dashboard/add-part" className="block">
      {buttonContent}
    </Link>
  );
};

export default function ShopDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const user = useSelector(selectCurrentUser);
  const isVerified = useSelector(selectIsVerified);

  const shopName = user?.shopName || user?.name || "My Shop";
  const userName = user?.name || "User";
  const userEmail = user?.email || "user@example.com";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {}, [isVerified, user]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-800 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-lg">GearBazar</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Shop Info */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {userInitials}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{shopName}</p>
              <p className="text-slate-400 text-sm capitalize">
                {user?.role?.replace("_", " ") || "User"}
              </p>
            </div>
          </div>
          {!isVerified && (
            <div className="mt-3 px-3 py-2 bg-yellow-500/20 rounded-lg">
              <p className="text-yellow-400 text-xs font-medium">
                Verification pending
              </p>
            </div>
          )}
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = false;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          {/* Add Product - with verification check */}
          <AddProductButton isVerified={isVerified} />
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white rounded-xl transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search parts, orders..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl"
              >
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {userInitials}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-slate-700">
                  {userName}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-slate-900">{userName}</p>
                      <p className="text-sm text-slate-500">{userEmail}</p>
                    </div>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2 text-slate-600 hover:bg-gray-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <CreditCard className="w-4 h-4" />
                      Billing
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button className="flex items-center gap-3 w-full px-4 py-2 text-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
