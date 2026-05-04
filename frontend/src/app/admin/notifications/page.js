"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  X,
  Save,
  Bell,
  Check,
  CheckCheck,
  Filter,
  Mail,
  MessageSquare,
  AlertTriangle,
  Info,
  ShoppingCart,
  UserPlus,
  Settings,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "Order",
    title: "New Order Received",
    message: "Order #ORD-1452 has been placed by Rahim Khan for ৳12,500",
    time: "2 min ago",
    read: false,
    priority: "High",
  },
  {
    id: 2,
    type: "User",
    title: "New Vendor Registration",
    message:
      "AutoMax Ltd. has registered as a vendor. KYC verification pending.",
    time: "15 min ago",
    read: false,
    priority: "Medium",
  },
  {
    id: 3,
    type: "Payment",
    title: "Payment Verified",
    message:
      "bKash payment of ৳5,000 verified for ProParts BD (TrxID: 8X9P2Q3R)",
    time: "32 min ago",
    read: true,
    priority: "Low",
  },
  {
    id: 4,
    type: "System",
    title: "Server Maintenance",
    message:
      "Scheduled maintenance on May 10, 2026 at 02:00 AM. Expected downtime: 30 minutes.",
    time: "1 hour ago",
    read: true,
    priority: "High",
  },
  {
    id: 5,
    type: "Product",
    title: "Product Approval Needed",
    message: "15 new products from GearHead Parts require admin approval.",
    time: "2 hours ago",
    read: false,
    priority: "Medium",
  },
  {
    id: 6,
    type: "Review",
    title: "Flagged Review",
    message:
      "Review by Jamal Uddin for Headlight Assembly has been flagged as inappropriate.",
    time: "3 hours ago",
    read: false,
    priority: "High",
  },
  {
    id: 7,
    type: "Order",
    title: "Order Shipped",
    message: "Order #ORD-1448 has been shipped to customer in Chittagong.",
    time: "4 hours ago",
    read: true,
    priority: "Low",
  },
  {
    id: 8,
    type: "User",
    title: "Customer Blocked",
    message: "Customer Imran Khan has been blocked due to suspicious activity.",
    time: "5 hours ago",
    read: true,
    priority: "Medium",
  },
  {
    id: 9,
    type: "Payment",
    title: "Payment Failed",
    message:
      "Payment of ৳3,500 for Order #ORD-1450 failed. Reason: Insufficient funds.",
    time: "6 hours ago",
    read: false,
    priority: "High",
  },
  {
    id: 10,
    type: "System",
    title: "Database Backup Complete",
    message: "Automated weekly backup completed successfully. Size: 2.4 GB",
    time: "8 hours ago",
    read: true,
    priority: "Low",
  },
];

const notificationTypes = [
  "All",
  "Order",
  "User",
  "Payment",
  "System",
  "Product",
  "Review",
];
const priorityColors = {
  High: "bg-red-50 text-red-700 border-red-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-blue-50 text-blue-700 border-blue-200",
};

const typeIcons = {
  Order: ShoppingCart,
  User: UserPlus,
  Payment: Settings,
  System: Settings,
  Product: Package,
  Review: MessageSquare,
};

function SendNotificationModal({ onClose, onSend }) {
  const [form, setForm] = useState({
    type: "System",
    title: "",
    message: "",
    priority: "Medium",
    sendTo: "all",
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Send Notification
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Notification Type
            </label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {notificationTypes
                .filter((t) => t !== "All")
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Notification title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Message *
            </label>
            <textarea
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Notification message..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, priority: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Send To
              </label>
              <select
                value={form.sendTo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, sendTo: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Users</option>
                <option value="vendors">Vendors Only</option>
                <option value="customers">Customers Only</option>
                <option value="admins">Admins Only</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSend(form);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Send className="w-4 h-4" /> Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const filteredNotifications = notifications.filter((n) => {
    if (typeFilter !== "All" && n.type !== typeFilter) return false;
    if (showUnreadOnly && n.read) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !n.title.toLowerCase().includes(q) &&
        !n.message.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSend = (formData) => {
    const newNotification = {
      id: Date.now(),
      type: formData.type,
      title: formData.title,
      message: formData.message,
      time: "Just now",
      read: false,
      priority: formData.priority,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage system notifications
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <CheckCheck className="w-4 h-4" /> Mark All Read
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" /> Send Notification
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: notifications.length,
            icon: Bell,
            color: "indigo",
          },
          { label: "Unread", value: unreadCount, icon: Mail, color: "red" },
          {
            label: "High Priority",
            value: notifications.filter((n) => n.priority === "High").length,
            icon: AlertTriangle,
            color: "amber",
          },
          {
            label: "Read",
            value: notifications.filter((n) => n.read).length,
            icon: Check,
            color: "emerald",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-${stat.color}-50 flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-3">
            {notificationTypes.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  typeFilter === type
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
            <button
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                showUnreadOnly
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Unread Only
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm divide-y divide-slate-200">
        {filteredNotifications.map((notification) => {
          const TypeIcon = typeIcons[notification.type] || Bell;
          return (
            <div
              key={notification.id}
              className={`p-5 hover:bg-slate-50 transition-colors ${!notification.read ? "bg-indigo-50/30" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    notification.priority === "High"
                      ? "bg-red-50"
                      : notification.priority === "Medium"
                        ? "bg-amber-50"
                        : "bg-blue-50"
                  }`}
                >
                  <TypeIcon
                    className={`w-5 h-5 ${
                      notification.priority === "High"
                        ? "text-red-600"
                        : notification.priority === "Medium"
                          ? "text-amber-600"
                          : "text-blue-600"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-slate-900">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-indigo-600" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-0.5">
                        {notification.message}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {notification.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${priorityColors[notification.priority]}`}
                    >
                      {notification.priority}
                    </span>
                    <span className="text-xs text-slate-500">
                      {notification.type}
                    </span>
                    <div className="flex items-center gap-2 ml-auto">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-slate-400 hover:text-indigo-600 rounded"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-slate-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No notifications found</p>
          </div>
        )}
      </div>

      {showModal && (
        <SendNotificationModal
          onClose={() => setShowModal(false)}
          onSend={handleSend}
        />
      )}
    </div>
  );
}
