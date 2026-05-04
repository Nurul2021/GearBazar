"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Store,
  Clock,
  Ban,
  Filter,
  ChevronDown,
  Eye,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import VendorDrawer from "@/components/admin/VendorDrawer";

const mockVendors = [
  {
    id: 1,
    shopName: "AutoCare Garage",
    ownerName: "Mohammad Rahman",
    businessType: "Garage",
    contact: "+880 1712-345678",
    email: "autocare@example.com",
    registrationDate: "2026-01-15",
    paymentStatus: "Paid",
    accountStatus: "Verified",
  },
  {
    id: 2,
    shopName: "Prime Auto Parts",
    ownerName: "Fatima Khan",
    businessType: "Shop",
    contact: "+880 1819-876543",
    email: "primeauto@example.com",
    registrationDate: "2026-02-20",
    paymentStatus: "Paid",
    accountStatus: "Verified",
  },
  {
    id: 3,
    shopName: "Dhaka Car Service",
    ownerName: "Kamal Hossain",
    businessType: "Garage",
    contact: "+880 1912-111222",
    email: "dhakacar@example.com",
    registrationDate: "2026-03-10",
    paymentStatus: "Unpaid",
    accountStatus: "Pending",
  },
  {
    id: 4,
    shopName: "Speedy Spares",
    ownerName: "Nusrat Jahan",
    businessType: "Shop",
    contact: "+880 1611-333444",
    email: "speedy@example.com",
    registrationDate: "2026-03-25",
    paymentStatus: "Paid",
    accountStatus: "Pending",
  },
  {
    id: 5,
    shopName: "GearMax Workshop",
    ownerName: "Arif Ahmed",
    businessType: "Garage",
    contact: "+880 1515-555666",
    email: "gearmax@example.com",
    registrationDate: "2026-04-05",
    paymentStatus: "Unpaid",
    accountStatus: "Suspended",
  },
  {
    id: 6,
    shopName: "MotorHub Store",
    ownerName: "Sabrina Ali",
    businessType: "Shop",
    contact: "+880 1789-777888",
    email: "motorhub@example.com",
    registrationDate: "2026-04-18",
    paymentStatus: "Paid",
    accountStatus: "Verified",
  },
  {
    id: 7,
    shopName: "AutoZone BD",
    ownerName: "Tanvir Hasan",
    businessType: "Shop",
    contact: "+880 1999-999000",
    email: "autozone@example.com",
    registrationDate: "2026-04-28",
    paymentStatus: "Unpaid",
    accountStatus: "Pending",
  },
  {
    id: 8,
    shopName: "ProMechanic Garage",
    ownerName: "Rafiq Islam",
    businessType: "Garage",
    contact: "+880 1898-123456",
    email: "proauto@example.com",
    registrationDate: "2026-05-01",
    paymentStatus: "Paid",
    accountStatus: "Verified",
  },
];

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [vendors, setVendors] = useState(mockVendors);
  const [loading, setLoading] = useState({});

  const stats = useMemo(() => {
    return {
      total: vendors.length,
      pending: vendors.filter((v) => v.accountStatus === "Pending").length,
      inactive: vendors.filter(
        (v) => v.accountStatus === "Suspended" || v.paymentStatus === "Unpaid",
      ).length,
    };
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch =
        !searchQuery ||
        vendor.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.contact.includes(searchQuery);

      const matchesBusinessType =
        selectedBusinessType === "All" ||
        vendor.businessType === selectedBusinessType;

      const matchesStatus =
        selectedStatus === "All" || vendor.accountStatus === selectedStatus;

      return matchesSearch && matchesBusinessType && matchesStatus;
    });
  }, [vendors, searchQuery, selectedBusinessType, selectedStatus]);

  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedVendor(null), 300);
  };

  const handleApprove = (vendorId) => {
    setLoading((prev) => ({ ...prev, [vendorId]: "approve" }));
    setTimeout(() => {
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId ? { ...v, accountStatus: "Verified" } : v,
        ),
      );
      setLoading((prev) => {
        const next = { ...prev };
        delete next[vendorId];
        return next;
      });
      handleCloseDrawer();
    }, 1000);
  };

  const handleReject = (vendorId, reason) => {
    setLoading((prev) => ({ ...prev, [vendorId]: "reject" }));
    setTimeout(() => {
      setVendors((prev) =>
        prev.map((v) =>
          v.id === vendorId ? { ...v, accountStatus: "Suspended" } : v,
        ),
      );
      setLoading((prev) => {
        const next = { ...prev };
        delete next[vendorId];
        return next;
      });
      handleCloseDrawer();
    }, 1000);
  };

  const handleTogglePayment = (vendorId, newStatus) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, paymentStatus: newStatus } : v,
      ),
    );
  };

  const handleBlock = (vendorId) => {
    setVendors((prev) =>
      prev.map((v) =>
        v.id === vendorId ? { ...v, accountStatus: "Suspended" } : v,
      ),
    );
    handleCloseDrawer();
  };

  const resetFilters = () => {
    setSelectedBusinessType("All");
    setSelectedStatus("All");
    setShowFilterDropdown(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Vendor Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and monitor all registered vendors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Vendors"
          value={stats.total}
          icon={Store}
          color="indigo"
        />
        <StatCard
          title="Pending KYC Requests"
          value={stats.pending}
          icon={Clock}
          color="amber"
        />
        <StatCard
          title="Inactive/Blocked"
          value={stats.inactive}
          icon={Ban}
          color="red"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Shop Name, Owner, or Phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
              <ChevronDown className="w-4 h-4" />
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg z-50 p-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Business Type
                  </label>
                  <select
                    value={selectedBusinessType}
                    onChange={(e) => setSelectedBusinessType(e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All">All Types</option>
                    <option value="Garage">Garage</option>
                    <option value="Shop">Shop</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Verification Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="mt-1 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Verified">Verified</option>
                    <option value="Pending">Pending</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Shop Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Owner Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Business Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Account Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Store className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">
                        No vendors found
                      </p>
                      <p className="text-sm text-slate-400">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {vendor.shopName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {vendor.ownerName}
                    </td>
                    <td className="px-6 py-4">
                      <BusinessTypeBadge type={vendor.businessType} />
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {vendor.contact}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(vendor.registrationDate).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <PaymentBadge status={vendor.paymentStatus} />
                    </td>
                    <td className="px-6 py-4">
                      <AccountBadge status={vendor.accountStatus} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewVendor(vendor)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredVendors.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {vendors.length}
            </span>{" "}
            vendors
          </p>
        </div>
      </div>

      <VendorDrawer
        vendor={selectedVendor}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onApprove={handleApprove}
        onReject={handleReject}
        onTogglePayment={handleTogglePayment}
        onBlock={handleBlock}
      />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
    red: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl border ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function BusinessTypeBadge({ type }) {
  const isGarage = type === "Garage";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isGarage
          ? "bg-blue-100 text-blue-700 border-blue-200"
          : "bg-purple-100 text-purple-700 border-purple-200"
      }`}
    >
      {type}
    </span>
  );
}

function PaymentBadge({ status }) {
  const isPaid = status === "Paid";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        isPaid
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-red-100 text-red-700 border-red-200"
      }`}
    >
      {isPaid && <CheckCircle className="w-3 h-3" />}
      {!isPaid && <XCircle className="w-3 h-3" />}
      {status}
    </span>
  );
}

function AccountBadge({ status }) {
  const styles = {
    Verified: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Suspended: "bg-red-100 text-red-700 border-red-200",
  };

  const icons = {
    Verified: CheckCircle,
    Pending: Clock,
    Suspended: Ban,
  };

  const Icon = icons[status] || Clock;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}
