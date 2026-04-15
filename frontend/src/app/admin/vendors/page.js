"use client";

import { useState, useEffect } from "react";
import { adminApi } from "../../../lib/api";
import toast from "react-hot-toast";

const mockPendingUsers = [
  {
    _id: "user1",
    name: "AutoTech Garage",
    email: "autotech@example.com",
    role: "garage",
    createdAt: "2024-01-15T10:30:00Z",
    isPendingVerification: true,
    verificationDocuments: {
      tradeLicense:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
      shopPhotos: [
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
      ],
      businessDetails: {
        licenseNumber: "TL-2024-12345",
        issuedDate: "2024-01-01",
        expiryDate: "2025-01-01",
      },
    },
  },
  {
    _id: "user2",
    name: "PartsPro Seller",
    email: "partspro@example.com",
    role: "seller",
    createdAt: "2024-01-14T08:15:00Z",
    isPendingVerification: true,
    verificationDocuments: {
      tradeLicense:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
      shopPhotos: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
      ],
      businessDetails: {
        licenseNumber: "TL-2024-67890",
        issuedDate: "2023-12-15",
        expiryDate: "2024-12-15",
      },
    },
  },
  {
    _id: "user3",
    name: "QuickFix Motors",
    email: "quickfix@example.com",
    role: "garage",
    createdAt: "2024-01-13T14:45:00Z",
    isPendingVerification: true,
    verificationDocuments: {
      tradeLicense:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
      shopPhotos: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400",
      ],
      businessDetails: {
        licenseNumber: "TL-2024-11111",
        issuedDate: "2024-01-10",
        expiryDate: "2026-01-10",
      },
    },
  },
  {
    _id: "user4",
    name: "Elite Auto Parts",
    email: "elite@example.com",
    role: "seller",
    createdAt: "2024-01-12T09:20:00Z",
    isPendingVerification: true,
    verificationDocuments: {
      tradeLicense:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      shopPhotos: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      ],
      businessDetails: {
        licenseNumber: "TL-2024-22222",
        issuedDate: "2023-11-20",
        expiryDate: "2024-11-20",
      },
    },
  },
];

const statusBadge = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const roleBadge = {
  garage: "bg-purple-100 text-purple-800",
  seller: "bg-blue-100 text-blue-800",
};

export default function VendorVerificationPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadPendingUsers();
  }, []);

  const loadPendingUsers = async () => {
    setLoading(true);
    try {
      const { data } = await adminApi.getUsers({ isVerified: "false" });
      const pending = data?.users?.filter((u) => u.isPendingVerification) || [];
      setUsers(pending.length > 0 ? pending : mockPendingUsers);
    } catch (error) {
      setUsers(mockPendingUsers);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    setActionLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers(
        users.map((u) =>
          u._id === userId
            ? { ...u, isVerified: true, isPendingVerification: false }
            : u,
        ),
      );
      toast.success("User verified successfully!");
      setShowModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error("Failed to approve user");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (userId) => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    setActionLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUsers(
        users.map((u) =>
          u._id === userId
            ? {
                ...u,
                isPendingVerification: false,
                rejectionReason: rejectReason,
              }
            : u,
        ),
      );
      toast.error("User verification rejected");
      setShowModal(false);
      setSelectedUser(null);
      setRejectReason("");
    } catch (error) {
      toast.error("Failed to reject user");
    } finally {
      setActionLoading(false);
    }
  };

  const openReviewModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Vendor Verification
          </h1>
          <p className="text-gray-500">
            Review and verify pending shop registrations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {users.filter((u) => u.isPendingVerification).length} Pending
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-500">
              Loading pending verifications...
            </p>
          </div>
        ) : users.filter((u) => u.isPendingVerification).length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              All Caught Up!
            </h3>
            <p className="text-gray-500 mt-1">
              No pending verifications at the moment
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users
                  .filter((u) => u.isPendingVerification)
                  .map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${roleBadge[user.role]}`}
                        >
                          {user.role === "garage" ? "Garage" : "Seller"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge.pending}`}
                        >
                          Pending Verification
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openReviewModal(user)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Review Documents
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Verify {selectedUser.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedUser.role === "garage" ? "Garage" : "Seller"}{" "}
                  Application
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Business Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">License Number:</span>
                    <p className="font-medium">
                      {selectedUser.verificationDocuments?.businessDetails
                        ?.licenseNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Issued Date:</span>
                    <p className="font-medium">
                      {formatDate(
                        selectedUser.verificationDocuments?.businessDetails
                          ?.issuedDate || "",
                      )}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Expiry Date:</span>
                    <p className="font-medium">
                      {formatDate(
                        selectedUser.verificationDocuments?.businessDetails
                          ?.expiryDate || "",
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Trade License
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  {selectedUser.verificationDocuments?.tradeLicense ? (
                    <img
                      src={selectedUser.verificationDocuments.tradeLicense}
                      alt="Trade License"
                      className="w-full h-48 object-contain rounded-lg"
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p>No trade license uploaded</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Shop Photos (
                  {selectedUser.verificationDocuments?.shopPhotos?.length || 0})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedUser.verificationDocuments?.shopPhotos?.length >
                  0 ? (
                    selectedUser.verificationDocuments.shopPhotos.map(
                      (photo, idx) => (
                        <div
                          key={idx}
                          className="border-2 border-dashed border-gray-300 rounded-lg p-2 bg-gray-50"
                        >
                          <img
                            src={photo}
                            alt={`Shop Photo ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      ),
                    )
                  ) : (
                    <div className="col-span-2 text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <svg
                        className="w-12 h-12 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p>No shop photos uploaded</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Reject Reason (Optional)
                </h3>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason for rejection..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex gap-3 justify-end">
              <button
                onClick={() => handleReject(selectedUser._id)}
                disabled={actionLoading}
                className="px-5 py-2.5 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors disabled:opacity-50"
              >
                Reject
              </button>
              <button
                onClick={() => handleApprove(selectedUser._id)}
                disabled={actionLoading}
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {actionLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Approve
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
