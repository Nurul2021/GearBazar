"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import VendorSidebar from "@/components/VendorSidebar";

export default function DashboardLayout({ children }) {
  const user = useSelector(selectCurrentUser);
  const shopName = user?.shopName || user?.name || "My Shop";

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <VendorSidebar shopName={shopName} theme="dark" />
      <main className="flex-1 ml-0 lg:ml-[260px] transition-all duration-300">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
