"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users2,
  CreditCard,
  UserSquare,
  Package,
  Tags,
  Warehouse,
  ShoppingCart,
  Star,
  Image,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  Store,
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const menuGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
      { label: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    ],
  },
  {
    label: "Users & Payouts",
    items: [
      { label: "Vendors", icon: Store, href: "/admin/vendors" },
      {
        label: "Vendor Payments",
        icon: CreditCard,
        href: "/admin/vendor-payments",
        badge: 5,
      },
      { label: "Users", icon: Users2, href: "/admin/users" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { label: "Products", icon: Package, href: "/admin/products" },
      { label: "Categories", icon: Tags, href: "/admin/categories" },
      { label: "Inventory", icon: Warehouse, href: "/admin/inventory" },
    ],
  },
  {
    label: "Sales",
    items: [
      { label: "Orders", icon: ShoppingCart, href: "/admin/orders", badge: 12 },
      { label: "Reviews", icon: Star, href: "/admin/reviews" },
    ],
  },
  {
    label: "Marketing & Content",
    items: [
      {
        label: "Homepage CMS",
        icon: LayoutDashboard,
        href: "/admin/homepage-cms",
      },
      { label: "Banners", icon: Image, href: "/admin/banners" },
      { label: "Notifications", icon: Bell, href: "/admin/notifications" },
    ],
  },
  {
    label: "System",
    items: [{ label: "Settings", icon: Settings, href: "/admin/settings" }],
  },
];

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleGroup = (groupLabel) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const sidebarWidth = isCollapsed ? "w-[70px]" : "w-[260px]";

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-screen ${sidebarWidth} bg-slate-900 border-r border-slate-800 overflow-y-auto`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            aside::-webkit-scrollbar {
              display: none;
            }
          `,
          }}
        />

        {/* Logo */}
        <div
          className={`h-16 flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4 border-b border-slate-800`}
        >
          {!isCollapsed ? (
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <Store className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-lg">GearBazar</span>
            </Link>
          ) : (
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="py-4 px-3 space-y-5">
          {menuGroups.map((group) => (
            <div key={group.label}>
              {!isCollapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`flex items-center justify-between w-full px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      collapsedGroups[group.label] ? "-rotate-90" : ""
                    }`}
                  />
                </button>
              )}
              {!collapsedGroups[group.label] && (
                <div
                  className={`space-y-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}
                >
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                      <div
                        key={item.label}
                        className={`relative ${isCollapsed ? "flex justify-center" : ""}`}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          title={isCollapsed ? item.label : ""}
                          className={`flex items-center ${isCollapsed ? "justify-center w-12 h-12 mx-auto" : "gap-3 px-3"} py-2.5 rounded-lg transition-all duration-200 ease-in-out text-sm font-medium ${
                            isActive
                              ? "bg-indigo-600/20 text-white border-l-4 border-indigo-600"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <Icon className="w-5 h-5 shrink-0" />
                          {!isCollapsed && (
                            <>
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                            </>
                          )}
                        </Link>
                        {/* Collapsed mode badges */}
                        {isCollapsed && item.badge && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5 animate-pulse">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Profile Footer */}
        <div
          className={`p-3 border-t border-slate-800 ${isCollapsed ? "flex justify-center" : ""}`}
        >
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-800 mb-2">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">SA</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Super Admin
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <p className="text-xs text-slate-400">Online</p>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white text-sm font-medium transition-colors">
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer"
                title="Super Admin"
              >
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <button
                className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden p-2 bg-slate-900 rounded-lg shadow-md border border-slate-800"
      >
        <Menu className="w-6 h-6 text-slate-300" />
      </button>
    </>
  );
}
