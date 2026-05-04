"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  User,
  Phone,
  Calendar,
  ShoppingBag,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Eye,
  Edit3,
  Key,
  Ban,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  Activity,
} from "lucide-react";
import CustomerDrawer from "@/components/admin/CustomerDrawer";

const mockCustomers = [
  {
    id: 1,
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+880 1712-345678",
    avatar: null,
    joinedDate: "2026-01-15",
    status: "Active",
    totalOrders: 12,
    totalSpend: 45600,
    lastLogin: "2 hours ago",
    address: "House 12, Road 5, Dhanmondi, Dhaka",
    orders: [
      { id: "ORD-001", date: "12 May 2026", amount: 4500, status: "Delivered" },
      {
        id: "ORD-002",
        date: "28 Apr 2026",
        amount: 12000,
        status: "Delivered",
      },
      {
        id: "ORD-003",
        date: "15 Apr 2026",
        amount: 3200,
        status: "Processing",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Khan",
    email: "sarah.k@example.com",
    phone: "+880 1819-876543",
    avatar: null,
    joinedDate: "2026-02-20",
    status: "Active",
    totalOrders: 8,
    totalSpend: 28900,
    lastLogin: "1 day ago",
    address: "Flat 4B, Plot 7, Gulshan 2, Dhaka",
    orders: [
      { id: "ORD-004", date: "10 May 2026", amount: 6700, status: "Shipped" },
      { id: "ORD-005", date: "03 May 2026", amount: 8900, status: "Delivered" },
    ],
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    email: "tanvir.h@example.com",
    phone: "+880 1912-111222",
    avatar: null,
    joinedDate: "2026-03-10",
    status: "Blocked",
    totalOrders: 3,
    totalSpend: 8500,
    lastLogin: "15 days ago",
    address: "123/A, Mirpur 10, Dhaka",
    orders: [
      { id: "ORD-006", date: "22 Apr 2026", amount: 5000, status: "Cancelled" },
    ],
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    email: "nusrat.j@example.com",
    phone: "+880 1611-333444",
    avatar: null,
    joinedDate: "2026-03-25",
    status: "Active",
    totalOrders: 15,
    totalSpend: 67800,
    lastLogin: "30 mins ago",
    address: "House 45, Road 12, Banani, Dhaka",
    orders: [
      { id: "ORD-007", date: "11 May 2026", amount: 2300, status: "Delivered" },
      {
        id: "ORD-008",
        date: "09 May 2026",
        amount: 15600,
        status: "Delivered",
      },
    ],
  },
  {
    id: 5,
    name: "Kamal Uddin",
    email: "kamal.u@example.com",
    phone: "+880 1515-555666",
    avatar: null,
    joinedDate: "2026-04-05",
    status: "Inactive",
    totalOrders: 1,
    totalSpend: 3400,
    lastLogin: "45 days ago",
    address: "Plot 34, Uttara Sector 7, Dhaka",
    orders: [
      { id: "ORD-009", date: "10 Apr 2026", amount: 3400, status: "Delivered" },
    ],
  },
  {
    id: 6,
    name: "Sabrina Ali",
    email: "sabrina.a@example.com",
    phone: "+880 1789-777888",
    avatar: null,
    joinedDate: "2026-04-18",
    status: "Active",
    totalOrders: 6,
    totalSpend: 19800,
    lastLogin: "5 hours ago",
    address: "House 78, Road 9, Bashundhara, Dhaka",
    orders: [
      {
        id: "ORD-010",
        date: "13 May 2026",
        amount: 7800,
        status: "Processing",
      },
    ],
  },
  {
    id: 7,
    name: "Arif Chowdhury",
    email: "arif.c@example.com",
    phone: "+880 1999-999000",
    avatar: null,
    joinedDate: "2026-04-28",
    status: "Active",
    totalOrders: 2,
    totalSpend: 9500,
    lastLogin: "Online now",
    address: "Flat 3A, Building C, Mohammadpur, Dhaka",
    orders: [
      { id: "ORD-011", date: "12 May 2026", amount: 5500, status: "Pending" },
    ],
  },
  {
    id: 8,
    name: "Farhana Rahman",
    email: "farhana.r@example.com",
    phone: "+880 1898-123456",
    avatar: null,
    joinedDate: "2026-05-01",
    status: "Active",
    totalOrders: 4,
    totalSpend: 12300,
    lastLogin: "10 mins ago",
    address: "House 23, Road 4, Dhanmondi, Dhaka",
    orders: [
      { id: "ORD-012", date: "13 May 2026", amount: 3100, status: "Delivered" },
    ],
  },
  {
    id: 9,
    name: "Imran Hossain",
    email: "imran.h@example.com",
    phone: "+880 1678-444555",
    avatar: null,
    joinedDate: "2026-05-02",
    status: "Active",
    totalOrders: 1,
    totalSpend: 5600,
    lastLogin: "1 hour ago",
    address: "Plot 12, Section 11, Mirpur, Dhaka",
    orders: [
      { id: "ORD-013", date: "13 May 2026", amount: 5600, status: "Shipped" },
    ],
  },
  {
    id: 10,
    name: "Tasnim Akter",
    email: "tasnim.a@example.com",
    phone: "+880 1555-666777",
    avatar: null,
    joinedDate: "2026-05-03",
    status: "Inactive",
    totalOrders: 0,
    totalSpend: 0,
    lastLogin: "Never",
    address: "",
    orders: [],
  },
  {
    id: 11,
    name: "Mahbub Alam",
    email: "mahbub.a@example.com",
    phone: "+880 1444-888999",
    avatar: null,
    joinedDate: "2026-05-04",
    status: "Active",
    totalOrders: 1,
    totalSpend: 4200,
    lastLogin: "Just now",
    address: "House 56, Road 8, Shyamoli, Dhaka",
    orders: [
      { id: "ORD-014", date: "13 May 2026", amount: 4200, status: "Pending" },
    ],
  },
  {
    id: 12,
    name: "Jannatul Ferdous",
    email: "jannat.f@example.com",
    phone: "+880 1333-222111",
    avatar: null,
    joinedDate: "2026-05-04",
    status: "Active",
    totalOrders: 0,
    totalSpend: 0,
    lastLogin: "5 mins ago",
    address: "Flat 5B, Plot 23, Uttara Sector 4, Dhaka",
    orders: [],
  },
];

const USERS_PER_PAGE = 10;

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [customers, setCustomers] = useState(mockCustomers);
  const [showActionMenu, setShowActionMenu] = useState(null);

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();
    const today = now.toDateString();

    return {
      total: customers.length,
      newThisMonth: customers.filter((c) => {
        const d = new Date(c.joinedDate);
        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
      }).length,
      activeToday: customers.filter(
        (c) =>
          c.status === "Active" &&
          (c.lastLogin === "Online now" ||
            c.lastLogin === "Just now" ||
            c.lastLogin === "5 mins ago" ||
            c.lastLogin === "30 mins ago" ||
            c.lastLogin === "1 hour ago" ||
            c.lastLogin === "2 hours ago"),
      ).length,
    };
  }, [customers]);

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q),
      );
    }

    if (selectedStatus !== "All") {
      result = result.filter((c) => c.status === selectedStatus);
    }

    result.sort((a, b) => {
      if (sortOrder === "Newest") {
        return new Date(b.joinedDate) - new Date(a.joinedDate);
      }
      return new Date(a.joinedDate) - new Date(b.joinedDate);
    });

    return result;
  }, [customers, searchQuery, selectedStatus, sortOrder]);

  const totalPages = Math.ceil(filteredCustomers.length / USERS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
    setShowActionMenu(null);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedCustomer(null), 300);
  };

  const handleBlock = (customerId, reason) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, status: "Blocked" } : c)),
    );
    setDrawerOpen(false);
  };

  const handleEdit = (customer) => {
    console.log("Edit customer:", customer);
    setShowActionMenu(null);
  };

  const handleResetPassword = (customer) => {
    console.log("Reset password for:", customer.email);
    setShowActionMenu(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">
            Customer Management
          </h1>
          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
            {customers.length} Users
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Customers"
          value={stats.total}
          icon={Users}
          color="indigo"
        />
        <StatCard
          title="New This Month"
          value={stats.newThisMonth}
          icon={TrendingUp}
          color="emerald"
        />
        <StatCard
          title="Active Today"
          value={stats.activeToday}
          icon={Activity}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, Email, or Phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Blocked">Blocked</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Joined Date
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Users className="w-12 h-12 text-slate-300" />
                      <p className="text-slate-500 font-medium">
                        No customers found
                      </p>
                      <p className="text-sm text-slate-400">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => handleViewCustomer(customer)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-indigo-600">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {customer.name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`tel:${customer.phone.replace(/\s/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {customer.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(customer.joinedDate).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-900">
                        <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
                        {customer.totalOrders}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td
                      className="px-6 py-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative inline-block">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowActionMenu(
                              showActionMenu === customer.id
                                ? null
                                : customer.id,
                            );
                          }}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                        </button>
                        {showActionMenu === customer.id && (
                          <>
                            <div
                              className="fixed inset-0 z-[55]"
                              onClick={() => setShowActionMenu(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 z-[60] w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1">
                              <button
                                onClick={() => handleViewCustomer(customer)}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View Profile
                              </button>
                              <button
                                onClick={() => handleEdit(customer)}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleResetPassword(customer)}
                                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <Key className="w-4 h-4" />
                                Reset Password
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {(currentPage - 1) * USERS_PER_PAGE + 1}-
              {Math.min(currentPage * USERS_PER_PAGE, filteredCustomers.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">
              {filteredCustomers.length}
            </span>{" "}
            customers
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      <CustomerDrawer
        customer={selectedCustomer}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
        onBlock={handleBlock}
        onEdit={handleEdit}
        onResetPassword={handleResetPassword}
      />
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    blue: "bg-blue-50 text-blue-600 border-blue-200",
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

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Inactive: "bg-slate-100 text-slate-700 border-slate-200",
    Blocked: "bg-red-100 text-red-700 border-red-200",
  };

  const icons = {
    Active: CheckCircle,
    Inactive: Clock,
    Blocked: XCircle,
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
