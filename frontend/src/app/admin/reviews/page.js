"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Star,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Flag,
  Trash2,
  Eye,
  X,
  ThumbsUp,
  ThumbsDown,
  AlertTriangle,
  Image as ImageIcon,
  ChevronDown,
  Calendar,
} from "lucide-react";

const initialReviews = [
  {
    id: 1,
    product: "Engine Oil 5W-30 Synthetic",
    sku: "EO-5W30-SYN",
    customer: "Rahim Khan",
    rating: 5,
    title: "Excellent quality oil",
    comment:
      "Used this oil for my Toyota Axio. Engine runs much smoother now. Highly recommended!",
    date: "2026-04-28",
    status: "Published",
    hasImages: true,
    helpful: 12,
    notHelpful: 2,
    vendor: "Rahim Auto Parts",
  },
  {
    id: 2,
    product: "Brake Pad Set - Front",
    sku: "BP-F-001",
    customer: "Karim Uddin",
    rating: 4,
    title: "Good product, fast delivery",
    comment:
      "Brake pads are working great. Slight noise in the beginning but settled after 2 days of use.",
    date: "2026-04-25",
    status: "Published",
    hasImages: false,
    helpful: 8,
    notHelpful: 1,
    vendor: "Karim Spare Center",
  },
  {
    id: 3,
    product: "Air Filter Element",
    sku: "AF-EL-002",
    customer: "Samir Ahmed",
    rating: 2,
    title: "Poor quality, don't buy",
    comment:
      "Product quality is very poor. Filter paper is too thin and already showing signs of damage after 1 week. Seller sent wrong size initially.",
    date: "2026-04-22",
    status: "Pending",
    hasImages: true,
    helpful: 3,
    notHelpful: 8,
    vendor: "AutoMax Ltd.",
  },
  {
    id: 4,
    product: "Spark Plug Iridium",
    sku: "SP-IR-004",
    customer: "Nasir Hossain",
    rating: 5,
    title: "Perfect fit for my car",
    comment:
      "Great spark plugs. Fuel efficiency improved noticeably. Will buy again!",
    date: "2026-04-20",
    status: "Published",
    hasImages: false,
    helpful: 15,
    notHelpful: 0,
    vendor: "ProParts BD",
  },
  {
    id: 5,
    product: "Headlight Assembly LED",
    sku: "HL-LED-003",
    customer: "Jamal Uddin",
    rating: 1,
    title: "Defective product received",
    comment:
      "Received a broken headlight. The LED doesn't work on one side. Very disappointed with the quality. Return process is also complicated.",
    date: "2026-04-18",
    status: "Flagged",
    hasImages: true,
    helpful: 1,
    notHelpful: 5,
    vendor: "GearHead Parts",
  },
  {
    id: 6,
    product: "Oil Filter",
    sku: "OF-001",
    customer: "Rafiq Islam",
    rating: 4,
    title: "Value for money",
    comment:
      "Decent oil filter at a good price. Installation was easy. Let's see how long it lasts.",
    date: "2026-04-15",
    status: "Published",
    hasImages: false,
    helpful: 6,
    notHelpful: 2,
    vendor: "Rahim Auto Parts",
  },
  {
    id: 7,
    product: "Shock Absorber",
    sku: "SA-002",
    customer: "Tariq Hasan",
    rating: 3,
    title: "Average product",
    comment:
      "Shock absorber is okay for the price. Ride quality improved but not as much as expected. Might need to replace sooner than expected.",
    date: "2026-04-12",
    status: "Pending",
    hasImages: false,
    helpful: 4,
    notHelpful: 3,
    vendor: "Karim Spare Center",
  },
  {
    id: 8,
    product: "Car Battery 12V",
    sku: "BAT-001",
    customer: "Imran Khan",
    rating: 5,
    title: "Excellent battery life",
    comment:
      "Battery is performing great for 6 months now. No issues with starting the car even in cold mornings.",
    date: "2026-04-10",
    status: "Published",
    hasImages: true,
    helpful: 20,
    notHelpful: 1,
    vendor: "AutoMax Ltd.",
  },
];

function ReviewDetailModal({ review, onClose, onAction }) {
  if (!review) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Review Details
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{review.product}</p>
              <p className="text-xs text-slate-500">
                {review.sku} • {review.vendor}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
                  />
                ))}
                <span className="text-sm text-slate-500 ml-2">
                  {review.rating}/5
                </span>
              </div>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <h4 className="text-sm font-medium text-slate-900 mb-1">
              {review.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {review.comment}
            </p>
          </div>

          {/* Review Meta */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Customer:</span>
              <p className="font-medium text-slate-900">{review.customer}</p>
            </div>
            <div>
              <span className="text-slate-500">Date:</span>
              <p className="font-medium text-slate-900">{review.date}</p>
            </div>
            <div>
              <span className="text-slate-500">Helpful:</span>
              <p className="font-medium text-slate-900">
                {review.helpful} 👍 {review.notHelpful} 👎
              </p>
            </div>
            <div>
              <span className="text-slate-500">Images:</span>
              <p className="font-medium text-slate-900">
                {review.hasImages ? "Yes (3 photos)" : "No"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            {review.status !== "Published" && (
              <button
                onClick={() => {
                  onAction(review.id, "approve");
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700"
              >
                <CheckCircle2 className="w-4 h-4" /> Approve
              </button>
            )}
            <button
              onClick={() => {
                onAction(review.id, "flag");
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600"
            >
              <Flag className="w-4 h-4" /> Flag
            </button>
            <button
              onClick={() => {
                onAction(review.id, "reject");
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
            >
              <XCircle className="w-4 h-4" /> Reject
            </button>
            <button
              onClick={() => {
                onAction(review.id, "delete");
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 ml-auto"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [showModal, setShowModal] = useState(null);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (ratingFilter !== "all" && r.rating !== Number(ratingFilter))
        return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !r.product.toLowerCase().includes(q) &&
          !r.customer.toLowerCase().includes(q) &&
          !r.comment.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [reviews, search, statusFilter, ratingFilter]);

  const handleAction = (id, action) => {
    if (action === "delete") {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else if (action === "approve") {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Published" } : r)),
      );
    } else if (action === "flag") {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Flagged" } : r)),
      );
    } else if (action === "reject") {
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)),
      );
    }
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );

  const statusBadge = (status) => {
    const styles = {
      Published: "bg-emerald-50 text-emerald-700",
      Pending: "bg-amber-50 text-amber-700",
      Flagged: "bg-red-50 text-red-700",
      Rejected: "bg-slate-100 text-slate-600",
    };
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status === "Published" ? (
          <CheckCircle2 className="w-3 h-3" />
        ) : status === "Pending" ? (
          <AlertTriangle className="w-3 h-3" />
        ) : status === "Flagged" ? (
          <Flag className="w-3 h-3" />
        ) : (
          <XCircle className="w-3 h-3" />
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
            Review Moderation
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and moderate customer reviews
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Pending:</span>
          <span className="font-medium text-amber-600">
            {reviews.filter((r) => r.status === "Pending").length}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Reviews",
            value: reviews.length,
            icon: MessageSquare,
            color: "indigo",
          },
          {
            label: "Published",
            value: reviews.filter((r) => r.status === "Published").length,
            icon: CheckCircle2,
            color: "emerald",
          },
          {
            label: "Pending",
            value: reviews.filter((r) => r.status === "Pending").length,
            icon: AlertTriangle,
            color: "amber",
          },
          {
            label: "Flagged",
            value: reviews.filter((r) => r.status === "Flagged").length,
            icon: Flag,
            color: "red",
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
              placeholder="Search reviews, products, customers..."
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
            <option value="Published">Published</option>
            <option value="Pending">Pending</option>
            <option value="Flagged">Flagged</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Product
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Customer
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Rating
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Review
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase">
                  Date
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-center">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-medium text-slate-500 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredReviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium text-slate-900">
                      {review.product}
                    </p>
                    <p className="text-xs text-slate-500">{review.sku}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-slate-700">{review.customer}</p>
                    <p className="text-xs text-slate-500">{review.vendor}</p>
                  </td>
                  <td className="px-5 py-3">{renderStars(review.rating)}</td>
                  <td className="px-5 py-3 max-w-[250px]">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {review.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {review.comment}
                    </p>
                    {review.hasImages && (
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-500 mt-1" />
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {review.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    {statusBadge(review.status)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setShowModal(review)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {review.status !== "Published" && (
                        <button
                          onClick={() => handleAction(review.id, "approve")}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 rounded"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleAction(review.id, "delete")}
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
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No reviews found</p>
          </div>
        )}
      </div>

      {showModal && (
        <ReviewDetailModal
          review={showModal}
          onClose={() => setShowModal(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}
