"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  Image,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  GripVertical,
  Calendar,
  Link2,
} from "lucide-react";

const initialBanners = [
  {
    id: 1,
    title: "Summer Sale 2026",
    image: "/banners/summer-sale.jpg",
    link: "/offers/summer-sale",
    position: "Homepage Hero",
    status: "Active",
    startDate: "2026-05-01",
    endDate: "2026-05-31",
    impressions: "12.5k",
    clicks: "856",
    ctr: "6.8%",
  },
  {
    id: 2,
    title: "Engine Oil Discount",
    image: "/banners/oil-discount.jpg",
    link: "/category/engine-parts",
    position: "Category Top",
    status: "Active",
    startDate: "2026-04-15",
    endDate: "2026-05-15",
    impressions: "8.2k",
    clicks: "492",
    ctr: "6.0%",
  },
  {
    id: 3,
    title: "New Brake Parts Arrived",
    image: "/banners/brake-new.jpg",
    link: "/category/brake-system",
    position: "Homepage Middle",
    status: "Scheduled",
    startDate: "2026-05-10",
    endDate: "2026-06-10",
    impressions: "-",
    clicks: "-",
    ctr: "-",
  },
  {
    id: 4,
    title: "Free Delivery Offer",
    image: "/banners/free-delivery.jpg",
    link: "/offers/free-delivery",
    position: "Homepage Hero",
    status: "Inactive",
    startDate: "2026-03-01",
    endDate: "2026-03-31",
    impressions: "15.1k",
    clicks: "1,205",
    ctr: "8.0%",
  },
  {
    id: 5,
    title: "Battery Sale - 20% Off",
    image: "/banners/battery-sale.jpg",
    link: "/category/electrical-parts",
    position: "Sidebar",
    status: "Active",
    startDate: "2026-04-20",
    endDate: "2026-05-20",
    impressions: "5.8k",
    clicks: "348",
    ctr: "6.0%",
  },
  {
    id: 6,
    title: "Suspension Parts Collection",
    image: "/banners/suspension.jpg",
    link: "/category/suspension",
    position: "Category Top",
    status: "Active",
    startDate: "2026-04-01",
    endDate: "2026-05-01",
    impressions: "6.4k",
    clicks: "384",
    ctr: "6.0%",
  },
];

const positions = [
  "Homepage Hero",
  "Homepage Middle",
  "Category Top",
  "Sidebar",
  "Footer Banner",
];

function BannerModal({ banner, onClose, onSave }) {
  const [form, setForm] = useState(
    banner
      ? { ...banner }
      : {
          title: "",
          image: "",
          link: "",
          position: "Homepage Hero",
          status: "Active",
          startDate: "2026-05-01",
          endDate: "2026-06-01",
        },
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            {banner ? "Edit Banner" : "Add New Banner"}
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
              Banner Title *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. Summer Sale 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Banner Image *
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
              <Image className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG up to 2MB (Recommended: 1920x600px)
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Link URL *
            </label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={form.link}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, link: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="/category/engine-parts"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Position
              </label>
              <select
                value={form.position}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, position: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {positions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, startDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
              onSave(form);
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Save className="w-4 h-4" /> {banner ? "Update" : "Create"} Banner
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ banner, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Delete Banner
          </h3>
          <p className="text-sm text-slate-500">
            Are you sure you want to delete "{banner.title}"? This action cannot
            be undone.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BannersPage() {
  const [banners, setBanners] = useState(initialBanners);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [showModal, setShowModal] = useState(null);
  const [showDelete, setShowDelete] = useState(null);

  const filteredBanners = banners.filter((b) => {
    if (statusFilter !== "all" && b.status !== statusFilter) return false;
    if (positionFilter !== "all" && b.position !== positionFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !b.title.toLowerCase().includes(q) &&
        !b.position.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const handleSave = (formData) => {
    if (formData.id) {
      setBanners((prev) =>
        prev.map((b) => (b.id === formData.id ? formData : b)),
      );
    } else {
      setBanners((prev) => [
        ...prev,
        {
          ...formData,
          id: Date.now(),
          impressions: "-",
          clicks: "-",
          ctr: "-",
        },
      ]);
    }
    setShowModal(null);
  };

  const handleDelete = (banner) => {
    setBanners((prev) => prev.filter((b) => b.id !== banner.id));
    setShowDelete(null);
  };

  const toggleStatus = (id) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Active" ? "Inactive" : "Active" }
          : b,
      ),
    );
  };

  const statusBadge = (status) => {
    const styles = {
      Active: "bg-emerald-50 text-emerald-700",
      Inactive: "bg-slate-100 text-slate-600",
      Scheduled: "bg-amber-50 text-amber-700",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status === "Active" ? (
          <CheckCircle2 className="w-3 h-3" />
        ) : status === "Scheduled" ? (
          <Calendar className="w-3 h-3" />
        ) : (
          <EyeOff className="w-3 h-3" />
        )}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Banner Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage promotional banners across the site
          </p>
        </div>
        <button
          onClick={() => setShowModal({})}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Banners",
            value: banners.length,
            icon: Image,
            color: "indigo",
          },
          {
            label: "Active",
            value: banners.filter((b) => b.status === "Active").length,
            icon: CheckCircle2,
            color: "emerald",
          },
          {
            label: "Scheduled",
            value: banners.filter((b) => b.status === "Scheduled").length,
            icon: Calendar,
            color: "amber",
          },
          {
            label: "Inactive",
            value: banners.filter((b) => b.status === "Inactive").length,
            icon: EyeOff,
            color: "slate",
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
              placeholder="Search banners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Scheduled">Scheduled</option>
          </select>
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Positions</option>
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Banners Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase w-8"></th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Banner
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Position
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Duration
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  Impressions
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  CTR
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBanners.map((banner) => (
                <tr key={banner.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <GripVertical className="w-4 h-4 text-slate-300" />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-slate-100 rounded flex items-center justify-center">
                        <Image className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {banner.title}
                        </p>
                        <a
                          href={banner.link}
                          className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-0.5"
                        >
                          {banner.link} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-slate-700">
                      {banner.position}
                    </span>
                  </td>
                  <td className="px-5 py-3">{statusBadge(banner.status)}</td>
                  <td className="px-5 py-3">
                    <p className="text-xs text-slate-600">{banner.startDate}</p>
                    <p className="text-xs text-slate-400">
                      to {banner.endDate}
                    </p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {banner.impressions}
                    </p>
                    <p className="text-xs text-slate-500">
                      {banner.clicks} clicks
                    </p>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="text-sm font-medium text-indigo-600">
                      {banner.ctr}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(banner.id)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                      >
                        {banner.status === "Active" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => setShowModal(banner)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDelete(banner)}
                        className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBanners.length === 0 && (
          <div className="text-center py-12">
            <Image className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No banners found</p>
          </div>
        )}
      </div>

      {showModal && (
        <BannerModal
          banner={showModal.id ? showModal : null}
          onClose={() => setShowModal(null)}
          onSave={handleSave}
        />
      )}
      {showDelete && (
        <DeleteConfirmModal
          banner={showDelete}
          onClose={() => setShowDelete(null)}
          onConfirm={() => handleDelete(showDelete)}
        />
      )}
    </div>
  );
}
