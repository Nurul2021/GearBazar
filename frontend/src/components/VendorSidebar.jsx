"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  LayoutDashboard,
  Package,
  Warehouse,
  ShoppingCart,
  ShoppingBag,
  Wallet,
  Star,
  Settings,
  Menu,
  X,
  ChevronDown,
  Store,
  LogOut,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  selectCurrentUser,
  selectIsVerified,
  logoutUser,
} from "@/features/auth/authSlice";

const menuGroups = [
  {
    label: "Core",
    items: [{ label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" }],
  },
  {
    label: "Management",
    items: [
      {
        label: "Products",
        icon: Package,
        href: "/dashboard/products",
        children: [
          { label: "All Products", href: "/dashboard/products" },
          { label: "Add New", href: "/dashboard/products/add" },
        ],
      },
      { label: "Inventory", icon: Warehouse, href: "/dashboard/inventory" },
      { label: "Orders", icon: ShoppingCart, href: "/dashboard/orders" },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        label: "Purchases",
        icon: ShoppingBag,
        href: "/dashboard/purchases",
        children: [
          { label: "All Purchases", href: "/dashboard/purchases" },
          { label: "Add Purchase", href: "/dashboard/purchases/add" },
        ],
      },
      { label: "Earnings", icon: Wallet, href: "/dashboard/earnings" },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
      { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    ],
  },
];

export default function VendorSidebar({
  shopName = "My Shop",
  theme = "dark",
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
  const isVerified = useSelector(selectIsVerified);

  const userName = user?.name || "User";
  const userEmail = user?.email || "user@example.com";
  const userInitials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const userAvatar = user?.avatar || user?.profileImage;

  const isDark = theme === "dark";

  // Badge states (replace with actual API calls)
  const pendingOrdersCount = 3;
  const lowStockCount = 2;
  const earningsLast7Days = 500;

  const toggleGroup = (groupLabel) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const toggleItem = (itemLabel) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemLabel]: !prev[itemLabel],
    }));
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  const sidebarBg = isDark
    ? "bg-slate-900"
    : "bg-white border-r border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-500";
  const textHover = isDark
    ? "hover:bg-slate-800 hover:text-white"
    : "hover:bg-slate-50 hover:text-slate-900";
  const activeBg = isDark
    ? "bg-red-600/20 text-white border-l-4 border-red-500"
    : "bg-red-50 text-red-600 border-l-4 border-red-500";
  const activeHover = isDark ? "hover:bg-red-600/30" : "hover:bg-red-100";
  const borderColor = isDark ? "border-slate-700" : "border-slate-200";
  const groupLabelColor = isDark ? "text-slate-500" : "text-slate-400";

  const sidebarWidth = isCollapsed ? "w-[70px]" : "w-[260px]";
  const collapsedClass = isCollapsed ? "justify-center" : "justify-between";

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
        className={`fixed top-0 left-0 z-50 h-full ${sidebarWidth} ${sidebarBg} transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo & Shop Name */}
        <div
          className={`h-16 flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4 border-b ${borderColor}`}
        >
          {!isCollapsed && (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shrink-0">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span
                  className={`${textPrimary} font-bold text-lg leading-tight`}
                >
                  GearBazar
                </span>
                <span className={`${textSecondary} text-xs font-medium`}>
                  {shopName}
                </span>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden lg:flex ${textSecondary} hover:text-white p-1 rounded transition-colors`}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`lg:hidden ${textSecondary} hover:text-white`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {menuGroups.map((group) => (
            <div key={group.label}>
              {!isCollapsed && (
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`flex items-center justify-between w-full px-3 mb-2 text-xs font-semibold ${groupLabelColor} uppercase tracking-wider`}
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
                  className={`space-y-2 ${isCollapsed ? "flex flex-col items-center" : ""}`}
                >
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const hasChildren =
                      item.children && item.children.length > 0;
                    const isExpanded = expandedItems[item.label];

                    return (
                      <div
                        key={item.label}
                        className={`relative ${isCollapsed ? "flex justify-center" : ""}`}
                      >
                        <div className="relative">
                          {hasChildren ? (
                            <button
                              onClick={() => toggleItem(item.label)}
                              title={isCollapsed ? item.label : ""}
                              className={`w-full flex items-center ${isCollapsed ? "justify-center w-12 h-12 mx-auto" : "gap-3 px-3"} py-3 rounded-lg transition-all duration-200 ease-in-out text-sm font-medium ${
                                isActive || pathname.startsWith(item.href)
                                  ? `${activeBg} ${activeHover} shadow-lg shadow-red-500/10`
                                  : `${textSecondary} ${textHover} ${!isCollapsed ? "hover:pl-4" : ""}`
                              }`}
                            >
                              <Icon className="w-5 h-5 shrink-0" />
                              {!isCollapsed && (
                                <>
                                  <span className="flex-1 text-left">
                                    {item.label}
                                  </span>
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                  />
                                </>
                              )}
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => setSidebarOpen(false)}
                              title={isCollapsed ? item.label : ""}
                              className={`flex items-center ${isCollapsed ? "justify-center w-12 h-12 mx-auto" : "gap-3 px-3"} py-3 rounded-lg transition-all duration-200 ease-in-out text-sm font-medium ${
                                isActive
                                  ? `${activeBg} ${activeHover} shadow-lg shadow-red-500/10`
                                  : `${textSecondary} ${textHover} ${!isCollapsed ? "hover:pl-4" : ""}`
                              }`}
                            >
                              <Icon className="w-5 h-5 shrink-0" />
                              {!isCollapsed && (
                                <>
                                  <span className="flex-1">{item.label}</span>
                                  {/* Badges in expanded mode */}
                                  {item.label === "Orders" &&
                                    pendingOrdersCount > 0 && (
                                      <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                                        {pendingOrdersCount}
                                      </span>
                                    )}
                                  {item.label === "Inventory" &&
                                    lowStockCount > 0 && (
                                      <AlertTriangle className="w-4 h-4 text-yellow-500 ml-auto" />
                                    )}
                                </>
                              )}
                            </Link>
                          )}
                          {/* Collapsed mode badges */}
                          {isCollapsed && (
                            <>
                              {item.label === "Orders" &&
                                pendingOrdersCount > 0 && (
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
                                    {pendingOrdersCount}
                                  </span>
                                )}
                              {item.label === "Inventory" &&
                                lowStockCount > 0 && (
                                  <span className="absolute -top-1 -right-1">
                                    <AlertTriangle className="w-3 h-3 text-yellow-500" />
                                  </span>
                                )}
                            </>
                          )}
                        </div>
                        {/* Sub-menu */}
                        {!isCollapsed && hasChildren && isExpanded && (
                          <div
                            className={`ml-8 mr-2 mt-1 space-y-1 ${isDark ? "bg-slate-800/50" : "bg-slate-100"} rounded-lg p-2`}
                          >
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setSidebarOpen(false)}
                                  className={`block px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                                    isChildActive
                                      ? `${isDark ? "bg-red-600/20 text-white" : "bg-red-50 text-red-600"} font-medium`
                                      : `${textSecondary} ${textHover}`
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Earnings info */}
                  {!isCollapsed &&
                    group.label === "Finance" &&
                    earningsLast7Days > 0 && (
                      <p className="px-3 text-xs text-green-500 font-medium">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        Last 7 days: +${earningsLast7Days}
                      </p>
                    )}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Profile Card & Logout */}
        <div
          className={`p-3 border-t ${borderColor} ${isCollapsed ? "flex justify-center" : ""}`}
        >
          {!isCollapsed ? (
            <>
              <div
                className={`flex items-center gap-3 px-3 py-3 rounded-lg ${isDark ? "bg-slate-800" : "bg-slate-50"} mb-2`}
              >
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {userInitials}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p
                      className={`text-sm font-medium ${textPrimary} truncate`}
                    >
                      {userName}
                    </p>
                    {isVerified && (
                      <BadgeCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    )}
                  </div>
                  <p className={`text-xs ${textSecondary} truncate`}>
                    {userEmail}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg ${textSecondary} ${textHover} text-sm font-medium transition-colors`}
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer"
                title={userName}
              >
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt={userName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-sm">
                    {userInitials}
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className={`p-2 rounded-lg ${textSecondary} ${textHover} transition-colors`}
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
        className="fixed top-4 left-4 z-30 lg:hidden p-2 bg-white rounded-lg shadow-md border border-slate-200"
      >
        <Menu className="w-6 h-6 text-slate-600" />
      </button>
    </>
  );
}
