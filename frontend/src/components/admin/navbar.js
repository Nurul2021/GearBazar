"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";

export default function AdminNavbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="h-16 px-6 flex items-center justify-between bg-slate-900 border-b border-slate-800">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">SA</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Super Admin</p>
              <p className="text-xs text-slate-400">admin@gearbazar.com</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
              <hr className="my-2 border-slate-700" />
              <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-700 transition-colors w-full">
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
