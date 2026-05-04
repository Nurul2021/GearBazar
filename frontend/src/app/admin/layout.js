"use client";

import AdminSidebar from "@/components/admin/sidebar";
import AdminNavbar from "@/components/admin/navbar";
import AdminFooter from "@/components/admin/footer";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar - fixed position with z-50 */}
      <div className="fixed top-0 left-0 z-50 h-screen">
        <AdminSidebar />
      </div>

      {/* Main content area - margin-left to account for fixed sidebar */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Navbar - sticky at top with z-40 */}
        <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
          <AdminNavbar />
        </header>

        {/* Scrollable main content with gray-50 background */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
